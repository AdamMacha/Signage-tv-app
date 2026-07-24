import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { DeviceData } from "../services/storage";

interface StatusScreenProps {
    device: DeviceData;
    serverUrl: string;
    isOnline: boolean;
    lastHeartbeat: Date | null;
    currentVideoName: string | null;
    playlistCount: number;
    localFilesCount: number;
    localFilesSizeKb: number;
    onBack: () => void;
}

const formatDate = (date: Date | null): string => {
    if (!date) return "—";
    return date.toLocaleTimeString("cs-CZ", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
};

const formatSize = (kb: number): string => {
    if (kb < 1024) return `${kb} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
};

interface StatusRowProps {
    label: string;
    value: string;
    valueColor?: string;
}

const StatusRow: React.FC<StatusRowProps> = ({ label, value, valueColor }) => (
    <View style={rowStyles.row}>
        <Text style={rowStyles.label}>{label}</Text>
        <Text style={[rowStyles.value, valueColor ? { color: valueColor } : null]}>
            {value}
        </Text>
    </View>
);

const rowStyles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#1e1e3a",
    },
    label: {
        color: "#888",
        fontSize: 17,
        flex: 1,
    },
    value: {
        color: "#e0e0e0",
        fontSize: 17,
        fontWeight: "600",
        flex: 2,
        textAlign: "right",
    },
});

export const StatusScreen: React.FC<StatusScreenProps> = ({
    device,
    serverUrl,
    isOnline,
    lastHeartbeat,
    currentVideoName,
    playlistCount,
    localFilesCount,
    localFilesSizeKb,
    onBack,
}) => {
    const onlineColor = isOnline ? "#4ade80" : "#f87171";
    const onlineLabel = isOnline ? "🟢 Online" : "🔴 Offline";

    // Relativní čas od posledního heartbeatu
    const heartbeatAge = lastHeartbeat
        ? Math.floor((Date.now() - lastHeartbeat.getTime()) / 1000)
        : null;

    const heartbeatDisplay = lastHeartbeat
        ? `${formatDate(lastHeartbeat)} (před ${heartbeatAge}s)`
        : "Dosud žádný";

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
        >
            {/* Zpět */}
            <TouchableOpacity style={styles.backBtn} onPress={onBack}>
                <Text style={styles.backBtnText}>← Zpět</Text>
            </TouchableOpacity>

            <Text style={styles.title}>📊 Status zařízení</Text>

            {/* Online indikátor – velký */}
            <View style={[styles.onlineBadge, isOnline ? styles.onlineBadgeGreen : styles.onlineBadgeRed]}>
                <Text style={styles.onlineBadgeText}>{onlineLabel}</Text>
            </View>

            {/* Sekce: Zařízení */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Zařízení</Text>
                <StatusRow label="Název" value={device.name} />
                <StatusRow
                    label="ID"
                    value={device.id.slice(0, 16) + "…"}
                    valueColor="#666"
                />
            </View>

            {/* Sekce: Připojení */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Připojení</Text>
                <StatusRow label="Stav" value={onlineLabel} valueColor={onlineColor} />
                <StatusRow label="Server URL" value={serverUrl} valueColor="#60a5fa" />
                <StatusRow
                    label="Poslední heartbeat"
                    value={heartbeatDisplay}
                    valueColor={
                        heartbeatAge !== null && heartbeatAge > 60 ? "#f87171" : "#e0e0e0"
                    }
                />
            </View>

            {/* Sekce: Přehrávání */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Přehrávání</Text>
                <StatusRow
                    label="Přehrávané video"
                    value={currentVideoName ?? "—"}
                    valueColor="#c4b5fd"
                />
                <StatusRow
                    label="Videí v playlistu"
                    value={`${playlistCount}`}
                />
                <StatusRow
                    label="Stažené soubory"
                    value={`${localFilesCount} souborů`}
                />
                <StatusRow
                    label="Obsazené úložiště"
                    value={formatSize(localFilesSizeKb)}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0f0f1a",
    },
    content: {
        padding: 40,
        paddingBottom: 60,
    },
    backBtn: {
        alignSelf: "flex-start",
        marginBottom: 32,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#333",
    },
    backBtnText: {
        color: "#aaa",
        fontSize: 18,
    },
    title: {
        color: "#fff",
        fontSize: 36,
        fontWeight: "bold",
        marginBottom: 24,
    },
    onlineBadge: {
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 24,
        alignSelf: "flex-start",
        marginBottom: 36,
    },
    onlineBadgeGreen: {
        backgroundColor: "#052e16",
        borderWidth: 1,
        borderColor: "#166534",
    },
    onlineBadgeRed: {
        backgroundColor: "#2d0707",
        borderWidth: 1,
        borderColor: "#7f1d1d",
    },
    onlineBadgeText: {
        color: "#e0e0e0",
        fontSize: 20,
        fontWeight: "bold",
    },
    section: {
        marginBottom: 32,
        backgroundColor: "#13132a",
        borderRadius: 12,
        paddingHorizontal: 20,
        paddingTop: 4,
    },
    sectionTitle: {
        color: "#555",
        fontSize: 13,
        fontWeight: "600",
        letterSpacing: 1.2,
        textTransform: "uppercase",
        marginTop: 16,
        marginBottom: 4,
    },
});
