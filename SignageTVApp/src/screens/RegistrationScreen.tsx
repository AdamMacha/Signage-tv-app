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

interface RegistrationScreenProps {
    serverUrl: string;
    onRegisterSuccess: () => void;
}

export const RegistrationScreen: React.FC<RegistrationScreenProps> = ({
    serverUrl,
    onRegisterSuccess,
}) => {
    const [deviceName, setDeviceName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Registrace Nové TV</Text>
                <Text style={styles.subtitle}>
                    Zadejte název, pod kterým uvidíte tuto televizi v administraci.
                </Text>

                {/* Server URL info */}
                <View style={styles.serverInfo}>
                    <Text style={styles.serverLabel}>Server:</Text>
                    <Text style={styles.serverUrl}>{serverUrl}</Text>
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
        backgroundColor: "#111",
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 14,
        marginBottom: 24,
        gap: 8,
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
});
