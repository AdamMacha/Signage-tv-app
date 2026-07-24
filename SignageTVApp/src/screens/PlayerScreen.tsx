import React, { useEffect, useState, useRef, useCallback } from "react";
import {
    View,
    StyleSheet,
    ActivityIndicator,
    Text,
    BackHandler,
    TouchableOpacity,
    Modal,
} from "react-native";
import Video from "react-native-video";
import RNFS from "react-native-fs";
import { getEndpoints } from "../config";
import { DeviceData, clearDeviceData } from "../services/storage";
import { SettingsScreen } from "./SettingsScreen";
import { StatusScreen } from "./StatusScreen";

// ── Typy ──────────────────────────────────────────────────────────────────

interface PlayerScreenProps {
    device: DeviceData;
    serverUrl: string;
    onLogout: () => void;
    onServerUrlChange: (newUrl: string) => void;
}

interface PlaylistItem {
    playlistItemId: string;
    order: number;
    video: {
        id: string;
        name: string;
        filename: string;
        downloadUrl: string;
        size: number;
    };
}

type MenuView = "main" | "status" | "settings";

// ── Komponenta ─────────────────────────────────────────────────────────────

export const PlayerScreen: React.FC<PlayerScreenProps> = ({
    device,
    serverUrl,
    onLogout,
    onServerUrlChange,
}) => {
    const [playlist, setPlaylist] = useState<PlaylistItem[]>([]);
    const [localFiles, setLocalFiles] = useState<string[]>([]);
    const [localFilesSizeKb, setLocalFilesSizeKb] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [downloading, setDownloading] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [menuView, setMenuView] = useState<MenuView>("main");
    const [isOnline, setIsOnline] = useState(false);
    const [lastHeartbeat, setLastHeartbeat] = useState<Date | null>(null);

    // Refs pro přístup v intervalech (oprava stale closure)
    const playlistRef = useRef<PlaylistItem[]>([]);
    const currentIndexRef = useRef(0);
    const localFilesRef = useRef<string[]>([]);
    const serverUrlRef = useRef(serverUrl);

    useEffect(() => { playlistRef.current = playlist; }, [playlist]);
    useEffect(() => { currentIndexRef.current = currentIndex; }, [currentIndex]);
    useEffect(() => { localFilesRef.current = localFiles; }, [localFiles]);
    useEffect(() => { serverUrlRef.current = serverUrl; }, [serverUrl]);

    // ── Načítání playlistu ─────────────────────────────────────────────────

    const fetchPlaylist = useCallback(async () => {
        const endpoints = getEndpoints(serverUrlRef.current);
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000);
            const res = await fetch(endpoints.playlist(device.id), {
                headers: { Authorization: `Bearer ${device.token}` },
                signal: controller.signal,
            });
            clearTimeout(timeoutId);
            if (res.ok) {
                const data: PlaylistItem[] = await res.json();
                setPlaylist(data);
                syncFiles(data);
            }
        } catch (e) {
            console.error("Fetch playlist failed", e);
        }
    }, [device.id, device.token]);

    // ── Heartbeat ─────────────────────────────────────────────────────────

    const sendHeartbeat = useCallback(async () => {
        const endpoints = getEndpoints(serverUrlRef.current);
        const pl = playlistRef.current;
        const idx = currentIndexRef.current;
        const lf = localFilesRef.current;
        const currentVideo =
            pl.length > 0 && lf.length > 0 ? pl[idx]?.video.filename : undefined;

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000);
            const res = await fetch(endpoints.heartbeat(device.id), {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${device.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ currentVideo }),
                signal: controller.signal,
            });
            clearTimeout(timeoutId);

            const data = await res.json();
            setIsOnline(true);
            setLastHeartbeat(new Date());

            if (data.command === "restart" || data.command === "reload_playlist") {
                fetchPlaylist();
            }
        } catch (e) {
            console.error("Heartbeat failed", e);
            setIsOnline(false);
        }
    }, [device.id, device.token, fetchPlaylist]);

    // ── Sync souborů ───────────────────────────────────────────────────────

    const syncFiles = async (remotePlaylist: PlaylistItem[]) => {
        try {
            const dirFiles = await RNFS.readDir(RNFS.DocumentDirectoryPath);
            const downloadedFilenames = dirFiles.map(f => f.name);
            const totalSizeKb = Math.round(
                dirFiles.reduce((sum, f) => sum + Number(f.size), 0) / 1024
            );
            setLocalFiles(downloadedFilenames);
            setLocalFilesSizeKb(totalSizeKb);
            localFilesRef.current = downloadedFilenames;

            let isDownloading = false;

            for (const item of remotePlaylist) {
                if (!downloadedFilenames.includes(item.video.filename)) {
                    isDownloading = true;
                    setDownloading(true);
                    const toPath = `${RNFS.DocumentDirectoryPath}/${item.video.filename}`;
                    try {
                        const result = await RNFS.downloadFile({
                            fromUrl: item.video.downloadUrl,
                            toFile: toPath,
                        }).promise;
                        if (result.statusCode === 200) {
                            setLocalFiles(prev => {
                                const updated = [...prev, item.video.filename];
                                localFilesRef.current = updated;
                                return updated;
                            });
                        }
                    } catch (err) {
                        console.error("Download error:", err);
                    }
                }
            }

            // Smazání souborů navíc
            const remoteFilenames = remotePlaylist.map(p => p.video.filename);
            for (const file of dirFiles) {
                if (!remoteFilenames.includes(file.name)) {
                    await RNFS.unlink(file.path);
                    setLocalFiles(prev => {
                        const updated = prev.filter(f => f !== file.name);
                        localFilesRef.current = updated;
                        return updated;
                    });
                }
            }

            if (isDownloading) setDownloading(false);
        } catch (e) {
            console.error("Sync error", e);
        }
    };

    // ── Inicializace + intervaly ───────────────────────────────────────────

    useEffect(() => {
        fetchPlaylist();
        sendHeartbeat();
        const playlistInterval = setInterval(fetchPlaylist, 60_000);
        const heartbeatInterval = setInterval(sendHeartbeat, 30_000);
        return () => {
            clearInterval(playlistInterval);
            clearInterval(heartbeatInterval);
        };
    }, [fetchPlaylist, sendHeartbeat]);

    // ── BackHandler ────────────────────────────────────────────────────────

    useEffect(() => {
        const sub = BackHandler.addEventListener("hardwareBackPress", () => {
            if (showMenu && menuView !== "main") {
                setMenuView("main"); // uvnitř menu: zpět na hlavní menu
            } else {
                setShowMenu(prev => !prev); // mimo menu: otevřít/zavřít
            }
            return true;
        });
        return () => sub.remove();
    }, [showMenu, menuView]);

    // ── Odregistrování ────────────────────────────────────────────────────

    const handleLogout = async () => {
        await clearDeviceData();
        setShowMenu(false);
        onLogout();
    };

    // ── URL nastavení ─────────────────────────────────────────────────────

    const handleServerUrlSave = (newUrl: string) => {
        onServerUrlChange(newUrl);
        // Okamžitě načteme playlist z nového serveru
        fetchPlaylist();
        sendHeartbeat();
    };

    // ── Přehrávač ─────────────────────────────────────────────────────────

    const isSingleVideo = playlist.length === 1;
    const canPlayCurrent =
        playlist.length > 0 &&
        localFiles.includes(playlist[currentIndex]?.video.filename ?? "");

    const onVideoEnd = () => {
        if (playlist.length > 1) {
            setCurrentIndex(prev => (prev + 1) % playlist.length);
        }
    };

    const currentItem = playlist[currentIndex];
    const videoSource = currentItem
        ? `${RNFS.DocumentDirectoryPath}/${currentItem.video.filename}`
        : null;

    // ── Render ─────────────────────────────────────────────────────────────

    return (
        <View style={styles.container}>

            {/* ── Přehrávač ── */}
            {playlist.length === 0 ? (
                <View style={styles.center}>
                    <Text style={styles.text}>Žádná videa v playlistu.</Text>
                    <Text style={styles.subtext}>Čekání na server...</Text>
                </View>
            ) : canPlayCurrent && videoSource ? (
                <Video
                    source={{ uri: videoSource }}
                    style={styles.video}
                    resizeMode="contain"
                    repeat={isSingleVideo}
                    onEnd={onVideoEnd}
                    onError={e => {
                        console.error("Video error", e);
                        onVideoEnd();
                    }}
                />
            ) : (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color="#ffffff" />
                    <Text style={styles.text}>Připravuji média...</Text>
                </View>
            )}

            {/* ── Offline indikátor ── */}
            <View style={styles.statusDot}>
                <View style={[styles.dot, isOnline ? styles.dotOnline : styles.dotOffline]} />
                <Text style={[styles.dotLabel, isOnline ? styles.dotLabelOnline : styles.dotLabelOffline]}>
                    {isOnline ? "Online" : "Offline"}
                </Text>
            </View>

            {/* ── Download overlay ── */}
            {downloading && (
                <View style={styles.downloadOverlay}>
                    <ActivityIndicator size="small" color="#ffffff" />
                    <Text style={styles.overlayText}>Stahování aktualizací...</Text>
                </View>
            )}

            {/* ── Nápověda Back ── */}
            {!showMenu && (
                <View style={styles.hint}>
                    <Text style={styles.hintText}>⬅ Back = menu</Text>
                </View>
            )}

            {/* ── Menu Modal ── */}
            <Modal
                visible={showMenu}
                transparent
                animationType="fade"
                onRequestClose={() => {
                    if (menuView !== "main") setMenuView("main");
                    else setShowMenu(false);
                }}
            >
                <View style={styles.menuBackdrop}>
                    {menuView === "main" && (
                        <View style={styles.menuCard}>
                            <Text style={styles.menuTitle}>⚙ Menu</Text>
                            <Text style={styles.menuDeviceName}>{device.name}</Text>

                            {/* Online badge v menu */}
                            <View style={[styles.menuOnlineBadge,
                                isOnline ? styles.menuOnlineGreen : styles.menuOnlineRed]}>
                                <Text style={styles.menuOnlineText}>
                                    {isOnline ? "🟢 Online" : "🔴 Offline"}
                                </Text>
                            </View>

                            <TouchableOpacity
                                style={[styles.menuBtn, styles.menuBtnPrimary]}
                                onPress={() => setShowMenu(false)}
                            >
                                <Text style={styles.menuBtnText}>▶ Pokračovat v přehrávání</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.menuBtn, styles.menuBtnNeutral]}
                                onPress={() => setMenuView("status")}
                            >
                                <Text style={styles.menuBtnText}>📊 Status zařízení</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.menuBtn, styles.menuBtnNeutral]}
                                onPress={() => setMenuView("settings")}
                            >
                                <Text style={styles.menuBtnText}>⚙ Nastavení serveru</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.menuBtn, styles.menuBtnDanger]}
                                onPress={handleLogout}
                            >
                                <Text style={styles.menuBtnText}>✕ Odregistrovat zařízení</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {menuView === "status" && (
                        <View style={styles.fullPage}>
                            <StatusScreen
                                device={device}
                                serverUrl={serverUrl}
                                isOnline={isOnline}
                                lastHeartbeat={lastHeartbeat}
                                currentVideoName={currentItem?.video.name ?? null}
                                playlistCount={playlist.length}
                                localFilesCount={localFiles.length}
                                localFilesSizeKb={localFilesSizeKb}
                                onBack={() => setMenuView("main")}
                            />
                        </View>
                    )}

                    {menuView === "settings" && (
                        <View style={styles.fullPage}>
                            <SettingsScreen
                                serverUrl={serverUrl}
                                onSave={handleServerUrlSave}
                                onBack={() => setMenuView("main")}
                            />
                        </View>
                    )}
                </View>
            </Modal>
        </View>
    );
};

// ── Styly ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    video: {
        position: "absolute",
        top: 0, left: 0, bottom: 0, right: 0,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
    },
    text: { color: "#fff", fontSize: 24, marginTop: 20 },
    subtext: { color: "#aaa", fontSize: 18, marginTop: 10 },

    // ── Offline dot ──
    statusDot: {
        position: "absolute",
        top: 18,
        right: 20,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.55)",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 6,
    },
    dotOnline: { backgroundColor: "#4ade80" },
    dotOffline: { backgroundColor: "#f87171" },
    dotLabel: { fontSize: 13, fontWeight: "600" },
    dotLabelOnline: { color: "#4ade80" },
    dotLabelOffline: { color: "#f87171" },

    // ── Overlaye ──
    downloadOverlay: {
        position: "absolute",
        bottom: 30,
        right: 30,
        backgroundColor: "rgba(0,0,0,0.75)",
        padding: 15,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    overlayText: { color: "#fff", marginLeft: 10, fontSize: 16 },
    hint: {
        position: "absolute",
        top: 20,
        left: 20,
        backgroundColor: "rgba(0,0,0,0.4)",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },
    hintText: { color: "rgba(255,255,255,0.35)", fontSize: 14 },

    // ── Menu ──
    menuBackdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.85)",
        justifyContent: "center",
        alignItems: "center",
    },
    menuCard: {
        backgroundColor: "#1a1a2e",
        borderRadius: 20,
        padding: 48,
        width: 540,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#2d2d4e",
    },
    menuTitle: {
        color: "#fff",
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 4,
    },
    menuDeviceName: {
        color: "#666",
        fontSize: 18,
        marginBottom: 16,
    },
    menuOnlineBadge: {
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 6,
        marginBottom: 28,
    },
    menuOnlineGreen: { backgroundColor: "#052e16" },
    menuOnlineRed: { backgroundColor: "#2d0707" },
    menuOnlineText: { color: "#e0e0e0", fontSize: 16 },
    menuBtn: {
        width: "100%",
        paddingVertical: 18,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 12,
    },
    menuBtnPrimary: { backgroundColor: "#2563eb" },
    menuBtnNeutral: { backgroundColor: "#374151" },
    menuBtnDanger: { backgroundColor: "#991b1b" },
    menuBtnText: { color: "#fff", fontSize: 19, fontWeight: "600" },

    fullPage: {
        flex: 1,
        width: "100%",
        backgroundColor: "#0f0f1a",
    },
});
