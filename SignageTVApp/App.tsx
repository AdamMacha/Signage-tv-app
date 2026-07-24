import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, ActivityIndicator, View } from "react-native";
import { RegistrationScreen } from "./src/screens/RegistrationScreen";
import { PlayerScreen } from "./src/screens/PlayerScreen";
import {
    getDeviceData,
    DeviceData,
    getServerUrl,
    DEFAULT_SERVER_URL,
} from "./src/services/storage";

const App = () => {
    const [device, setDevice] = useState<DeviceData | null>(null);
    const [serverUrl, setServerUrl] = useState<string>(DEFAULT_SERVER_URL);
    const [loading, setLoading] = useState(true);

    const initialize = async () => {
        const [data, url] = await Promise.all([getDeviceData(), getServerUrl()]);
        setDevice(data);
        setServerUrl(url);
        setLoading(false);
    };

    useEffect(() => {
        initialize();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" }}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        );
    }

    const handleLogout = () => setDevice(null);

    const handleServerUrlChange = (newUrl: string) => setServerUrl(newUrl);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
            <StatusBar hidden />
            {device ? (
                <PlayerScreen
                    device={device}
                    serverUrl={serverUrl}
                    onLogout={handleLogout}
                    onServerUrlChange={handleServerUrlChange}
                />
            ) : (
                <RegistrationScreen
                    serverUrl={serverUrl}
                    onRegisterSuccess={initialize}
                    onServerUrlChange={handleServerUrlChange}
                />
            )}
        </SafeAreaView>
    );
};

export default App;
