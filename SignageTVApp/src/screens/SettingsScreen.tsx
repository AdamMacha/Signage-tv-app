import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { setServerUrl } from "../services/storage";

interface SettingsScreenProps {
    serverUrl: string;
    onSave: (newUrl: string) => void;
    onBack: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
    serverUrl,
    onSave,
    onBack,
}) => {
    const [urlInput, setUrlInput] = useState(serverUrl);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const validateUrl = (url: string): boolean => {
        return /^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(url);
    };

    const handleSave = async () => {
        const trimmed = urlInput.trim().replace(/\/$/, "");

        if (!validateUrl(trimmed)) {
            setError("Neplatná URL. Příklad: http://192.168.1.100:3000");
            return;
        }

        setSaving(true);
        setError(null);
        await setServerUrl(trimmed);
        onSave(trimmed);
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleTest = async () => {
        const trimmed = urlInput.trim().replace(/\/$/, "");
        if (!validateUrl(trimmed)) {
            setError("Neplatná URL.");
            return;
        }
        setSaving(true);
        setError(null);
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);
            const res = await fetch(`${trimmed}/`, { signal: controller.signal });
            clearTimeout(timeoutId);
            if (res.ok) {
                setError("✅ Server odpověděl – připojení OK");
            } else {
                setError(`⚠️ Server odpověděl kódem ${res.status}`);
            }
        } catch {
            setError("❌ Server nedosažitelný. Zkontrolujte IP a port.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
        >
            {/* Zpět */}
            <TouchableOpacity style={styles.backBtn} onPress={onBack}>
                <Text style={styles.backBtnText}>← Zpět</Text>
            </TouchableOpacity>

            <Text style={styles.title}>⚙ Nastavení</Text>

            {/* Server URL */}
            <View style={styles.section}>
                <Text style={styles.label}>URL serveru</Text>
                <Text style={styles.hint}>
                    Zadejte IP adresu nebo doménu serveru včetně portu.
                </Text>
                <TextInput
                    style={styles.input}
                    value={urlInput}
                    onChangeText={text => {
                        setUrlInput(text);
                        setSaved(false);
                        setError(null);
                    }}
                    placeholder="http://192.168.1.100:3000"
                    placeholderTextColor="#555"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="url"
                    selectTextOnFocus
                />

                {error && (
                    <Text
                        style={[
                            styles.errorText,
                            error.startsWith("✅") && styles.successText,
                        ]}
                    >
                        {error}
                    </Text>
                )}

                <View style={styles.btnRow}>
                    <TouchableOpacity
                        style={[styles.btn, styles.btnSecondary]}
                        onPress={handleTest}
                        disabled={saving}
                    >
                        {saving ? (
                            <ActivityIndicator color="#fff" size="small" />
                        ) : (
                            <Text style={styles.btnText}>🔌 Testovat připojení</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.btn, styles.btnPrimary, saved && styles.btnSaved]}
                        onPress={handleSave}
                        disabled={saving}
                    >
                        <Text style={styles.btnText}>
                            {saved ? "✓ Uloženo" : "💾 Uložit URL"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Info */}
            <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>💡 Tip</Text>
                <Text style={styles.infoText}>
                    Po uložení nové URL se aplikace okamžitě připojí na nový server.
                    Není nutné přeinstalovat aplikaci.
                </Text>
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
        marginBottom: 40,
    },
    section: {
        marginBottom: 32,
    },
    label: {
        color: "#e0e0e0",
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 6,
    },
    hint: {
        color: "#777",
        fontSize: 15,
        marginBottom: 14,
    },
    input: {
        backgroundColor: "#1a1a2e",
        color: "#fff",
        fontSize: 18,
        padding: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#2d2d4e",
        marginBottom: 12,
    },
    errorText: {
        color: "#f87171",
        fontSize: 15,
        marginBottom: 12,
    },
    successText: {
        color: "#4ade80",
    },
    btnRow: {
        flexDirection: "row",
        gap: 12,
    },
    btn: {
        flex: 1,
        paddingVertical: 16,
        borderRadius: 10,
        alignItems: "center",
    },
    btnPrimary: {
        backgroundColor: "#2563eb",
    },
    btnSecondary: {
        backgroundColor: "#374151",
    },
    btnSaved: {
        backgroundColor: "#16a34a",
    },
    btnText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "600",
    },
    infoBox: {
        backgroundColor: "#1a2a1a",
        borderRadius: 12,
        padding: 20,
        borderWidth: 1,
        borderColor: "#1e4d1e",
    },
    infoTitle: {
        color: "#4ade80",
        fontSize: 17,
        fontWeight: "bold",
        marginBottom: 6,
    },
    infoText: {
        color: "#86efac",
        fontSize: 15,
        lineHeight: 22,
    },
});
