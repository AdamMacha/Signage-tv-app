import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import { getEndpoints } from "../config";
import { setDeviceData } from "../services/storage";
import { SettingsScreen } from "./SettingsScreen";

interface RegistrationScreenProps {
    serverUrl: string;
    onRegisterSuccess: () => void;
    onServerUrlChange: (newUrl: string) => void;
}

export const RegistrationScreen: React.FC<RegistrationScreenProps> = ({
    serverUrl,
    onRegisterSuccess,
    onServerUrlChange,
}) => {
    const [deviceName, setDeviceName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showSettings, setShowSettings] = useState(false);

    const handleRegister = async () => {
        if (!deviceName.trim()) {
            setError("Prosím zadejte název televize");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const endpoints = getEndpoints(serverUrl);
            const response = await fetch(endpoints.register, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: deviceName }),
            });

            if (!response.ok) {
                throw new Error("Chyba při registraci na serveru");
            }

            const data = await response.json();

            await setDeviceData({
                id: data.id,
                token: data.token,
                name: data.name,
            });

            onRegisterSuccess();
        } catch (err) {
            console.error(err);
            setError(
                `Nepodařilo se připojit k serveru (${serverUrl}).\nZkontrolujte URL v nastavení nebo zda server běží.`
            );
        } finally {
            setLoading(false);
        }
    };

    if (showSettings) {
        return (
            <View style={styles.fullPage}>
                <SettingsScreen
                    serverUrl={serverUrl}
                    onSave={(newUrl) => {
                        onServerUrlChange(newUrl);
                        setShowSettings(false);
                    }}
                    onBack={() => setShowSettings(false)}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Registrace Nové TV</Text>
                <Text style={styles.subtitle}>
                    Zadejte název, pod kterým uvidíte tuto televizi v administraci.
                </Text>

                {/* Server URL info */}
                <View style={styles.serverInfo}>
                    <View style={styles.serverInfoLeft}>
                        <Text style={styles.serverLabel}>Server:</Text>
                        <Text style={styles.serverUrl}>{serverUrl}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.editBtn}
                        onPress={() => setShowSettings(true)}
                    >
                        <Text style={styles.editBtnText}>✏️ Změnit</Text>
                    </TouchableOpacity>
                </View>

                <TextInput
                    style={styles.input}
                    placeholder="Např. Kavárna Hlavní Nádraží"
                    placeholderTextColor="#888"
                    value={deviceName}
                    onChangeText={setDeviceName}
                    autoCapitalize="words"
                />

                {error && <Text style={styles.error}>{error}</Text>}

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleRegister}
                    disabled={loading}
                    activeOpacity={0.7}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Registrovat zařízení</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        backgroundColor: "#1E1E1E",
        padding: 40,
        borderRadius: 16,
        width: 600,
        maxWidth: "80%",
        alignItems: "center",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: "#BBBBBB",
        marginBottom: 20,
        textAlign: "center",
    },
    serverInfo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#111",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 14,
        marginBottom: 24,
        width: "100%",
    },
    serverInfoLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    editBtn: {
        backgroundColor: "#333",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },
    editBtnText: {
        color: "#fff",
        fontSize: 14,
    },
    serverLabel: {
        color: "#666",
        fontSize: 15,
    },
    serverUrl: {
        color: "#60a5fa",
        fontSize: 15,
        fontWeight: "600",
    },
    input: {
        backgroundColor: "#2C2C2C",
        color: "#FFFFFF",
        width: "100%",
        padding: 15,
        borderRadius: 8,
        fontSize: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#444",
    },
    button: {
        backgroundColor: "#007BFF",
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        width: "100%",
        alignItems: "center",
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "bold",
    },
    error: {
        color: "#FF5252",
        marginBottom: 20,
        fontSize: 16,
        textAlign: "center",
    },
    fullPage: {
        flex: 1,
        width: "100%",
        backgroundColor: "#0f0f1a",
    }
});
