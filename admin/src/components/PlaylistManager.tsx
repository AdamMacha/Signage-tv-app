"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
    ListMusic,
    Tv,
    Plus,
    Trash2,
    ArrowUp,
    ArrowDown,
    Send,
    Film,
    HardDrive,
    AlertCircle,
    CheckCircle2,
} from "lucide-react";
import {
    Device,
    Video,
    PlaylistItem,
    fetchDevicePlaylist,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    reorderPlaylist,
    sendDeviceCommand,
} from "../lib/api";

interface PlaylistManagerProps {
    devices: Device[];
    videos: Video[];
    selectedDeviceId?: string;
    onRefreshDevices: () => void;
}

export const PlaylistManager: React.FC<PlaylistManagerProps> = ({
    devices,
    videos,
    selectedDeviceId,
    onRefreshDevices,
}) => {
    const [selectedLocalId, setSelectedLocalId] = useState<string>("");
    const currentDeviceId = selectedDeviceId || selectedLocalId || devices[0]?.id || "";
    const setCurrentDeviceId = (id: string) => setSelectedLocalId(id);
    const [playlist, setPlaylist] = useState<PlaylistItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(null);

    // Načtení playlistu
    const loadPlaylist = useCallback(async () => {
        if (!currentDeviceId) return;
        setLoading(true);
        try {
            const data = await fetchDevicePlaylist(currentDeviceId);
            setPlaylist(data);
        } catch (err: unknown) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [currentDeviceId]);

    useEffect(() => {
        let cancelled = false;
        if (!currentDeviceId) return;

        fetchDevicePlaylist(currentDeviceId)
            .then((data) => {
                if (!cancelled) setPlaylist(data);
            })
            .catch((err: unknown) => {
                console.error(err);
            });

        return () => {
            cancelled = true;
        };
    }, [currentDeviceId]);

    const showNotify = (text: string, ok = true) => {
        setMessage({ text, ok });
        setTimeout(() => setMessage(null), 3000);
    };

    // Přidání videa do playlistu
    const handleAddVideo = async (videoId: string) => {
        if (!currentDeviceId) return;
        setActionLoading(true);
        try {
            await addVideoToPlaylist(currentDeviceId, videoId);
            showNotify("Video přidáno do playlistu!");
            await loadPlaylist();
            onRefreshDevices();
        } catch (err: unknown) {
            showNotify(err instanceof Error ? err.message : "Chyba při přidávání videa", false);
        } finally {
            setActionLoading(false);
        }
    };

    // Odebrání videa z playlistu
    const handleRemoveVideo = async (videoId: string) => {
        if (!currentDeviceId) return;
        setActionLoading(true);
        try {
            await removeVideoFromPlaylist(currentDeviceId, videoId);
            showNotify("Video odebráno z playlistu");
            await loadPlaylist();
            onRefreshDevices();
        } catch (err: unknown) {
            showNotify(err instanceof Error ? err.message : "Chyba při odebírání videa", false);
        } finally {
            setActionLoading(false);
        }
    };

    // Posun nahoru / dolů
    const handleMove = async (index: number, direction: "up" | "down") => {
        const targetIndex = direction === "up" ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= playlist.length) return;

        const newItems = [...playlist];
        const temp = newItems[index];
        newItems[index] = newItems[targetIndex];
        newItems[targetIndex] = temp;

        // Aktualizujeme order
        const reordered = newItems.map((item, idx) => ({
            ...item,
            order: idx + 1,
        }));
        setPlaylist(reordered);

        // Uložíme na server
        try {
            await reorderPlaylist(
                currentDeviceId,
                reordered.map((item) => ({ videoId: item.video.id, order: item.order }))
            );
            showNotify("Pořadí playlistu aktualizováno");
        } catch {
            showNotify("Chyba při ukládání pořadí", false);
            await loadPlaylist();
        }
    };

    // Odeslání příkazu reload do TV
    const handleSendReload = async () => {
        if (!currentDeviceId) return;
        setActionLoading(true);
        try {
            await sendDeviceCommand(currentDeviceId, "reload_playlist");
            showNotify("✓ Příkaz odeslán: Televize si playlist ihned stáhne!");
        } catch (err: unknown) {
            showNotify(err instanceof Error ? err.message : "Chyba při odesílání příkazu", false);
        } finally {
            setActionLoading(false);
        }
    };

    const currentDevice = devices.find((d) => d.id === currentDeviceId);
    const existingVideoIds = new Set(playlist.map((p) => p.video.id));
    const availableVideos = videos.filter((v) => !existingVideoIds.has(v.id));

    return (
        <div className="space-y-6">
            {/* Header / Selector */}
            <div className="glass-panel p-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                        <Tv className="w-5 h-5" />
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                            Vyberte televizi pro úpravu playlistu:
                        </label>
                        <select
                            value={currentDeviceId}
                            onChange={(e) => setCurrentDeviceId(e.target.value)}
                            className="mt-1 bg-slate-900 border border-white/10 text-white text-sm font-semibold rounded-lg px-3 py-1.5 focus:outline-none focus:border-indigo-500 cursor-pointer"
                        >
                            {devices.map((d) => (
                                <option key={d.id} value={d.id}>
                                    {d.name} ({d._count.playlist} videí)
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Send reload button */}
                <div className="flex items-center gap-3">
                    {message && (
                        <div className={`text-xs font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${
                            message.ok ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                        }`}>
                            {message.ok ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                            <span>{message.text}</span>
                        </div>
                    )}

                    <button
                        onClick={handleSendReload}
                        disabled={actionLoading || !currentDeviceId}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white shadow-lg shadow-emerald-600/25 transition cursor-pointer disabled:opacity-50"
                    >
                        <Send className="w-3.5 h-3.5" />
                        Odeslat aktualizaci do TV
                    </button>
                </div>
            </div>

            {/* Main 2-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column: Aktuální playlist */}
                <div className="lg:col-span-7 glass-panel p-6 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <div className="flex items-center gap-2">
                            <ListMusic className="w-5 h-5 text-indigo-400" />
                            <h3 className="font-bold text-white text-base">
                                Playlist televize: <span className="text-indigo-400">{currentDevice?.name || "—"}</span>
                            </h3>
                        </div>
                        <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-mono">
                            {playlist.length} položek
                        </span>
                    </div>

                    {loading ? (
                        <div className="py-12 text-center text-slate-500 text-sm">
                            Načítání playlistu...
                        </div>
                    ) : playlist.length === 0 ? (
                        <div className="py-12 text-center text-slate-500">
                            <ListMusic className="w-10 h-10 mx-auto mb-2 opacity-40" />
                            <p className="text-sm font-medium text-slate-300">Tato televize nemá žádná videa</p>
                            <p className="text-xs text-slate-500 mt-1">
                                Vyberte videa z pravého sloupce pro jejich přidání do smyčky.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-2.5">
                            {playlist.map((item, index) => (
                                <div
                                    key={item.playlistItemId}
                                    className="glass-card p-3.5 flex items-center justify-between gap-3 group"
                                >
                                    {/* Pořadové číslo a název */}
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-mono font-bold text-xs flex-shrink-0">
                                            #{item.order}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold text-white truncate" title={item.video.name}>
                                                {item.video.name}
                                            </p>
                                            <p className="text-[11px] font-mono text-slate-500 truncate">
                                                {item.video.filename} • {(item.video.size / (1024 * 1024)).toFixed(1)} MB
                                            </p>
                                        </div>
                                    </div>

                                    {/* Ovládání pořadí a odebrání */}
                                    <div className="flex items-center gap-1.5 flex-shrink-0">
                                        <button
                                            onClick={() => handleMove(index, "up")}
                                            disabled={index === 0 || actionLoading}
                                            title="Posunout nahoru"
                                            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-30 transition cursor-pointer"
                                        >
                                            <ArrowUp className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            onClick={() => handleMove(index, "down")}
                                            disabled={index === playlist.length - 1 || actionLoading}
                                            title="Posunout dolů"
                                            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-30 transition cursor-pointer"
                                        >
                                            <ArrowDown className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            onClick={() => handleRemoveVideo(item.video.id)}
                                            disabled={actionLoading}
                                            title="Odebrat z playlistu"
                                            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer ml-1"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Column: Knihovna videí pro přidání */}
                <div className="lg:col-span-5 glass-panel p-6 space-y-4">
                    <div className="border-b border-white/10 pb-4">
                        <h3 className="font-bold text-white text-base flex items-center gap-2">
                            <Film className="w-5 h-5 text-cyan-400" />
                            Dostupná videa k přidání
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">
                            Klikněte na tlačítko <strong>+ Přidat</strong> pro zařazení do vysílání.
                        </p>
                    </div>

                    {availableVideos.length === 0 ? (
                        <div className="py-12 text-center text-slate-500 text-xs">
                            {videos.length === 0
                                ? "V knihovně zatím nemáte žádná videa. Nahrajte je v záložce Knihovna médií."
                                : "Všechna nahraná videa již v playlistu této TV jsou."}
                        </div>
                    ) : (
                        <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                            {availableVideos.map((video) => (
                                <div
                                    key={video.id}
                                    className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between gap-3 hover:border-white/10 transition"
                                >
                                    <div className="min-w-0">
                                        <p className="text-xs font-semibold text-white truncate" title={video.name}>
                                            {video.name}
                                        </p>
                                        <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                                            <HardDrive className="w-3 h-3" />
                                            {(video.size / (1024 * 1024)).toFixed(1)} MB
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => handleAddVideo(video.id)}
                                        disabled={actionLoading}
                                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition shadow cursor-pointer disabled:opacity-50 flex-shrink-0"
                                    >
                                        <Plus className="w-3.5 h-3.5" />
                                        Přidat
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
