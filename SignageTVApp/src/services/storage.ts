import AsyncStorage from "@react-native-async-storage/async-storage";

export interface DeviceData {
    id: string;
    token: string;
    name: string;
}

const DEVICE_STORAGE_KEY = "@device_data";
const SERVER_URL_KEY = "@server_url";

// Výchozí URL – slouží jako fallback, pokud uživatel nenastavil vlastní
export const DEFAULT_SERVER_URL = "http://192.168.0.249:3000";

// ── Device data ────────────────────────────────────────────────────────────

export const getDeviceData = async (): Promise<DeviceData | null> => {
    try {
        const jsonValue = await AsyncStorage.getItem(DEVICE_STORAGE_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error("Error reading device data", e);
        return null;
    }
};

export const setDeviceData = async (value: DeviceData) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(DEVICE_STORAGE_KEY, jsonValue);
    } catch (e) {
        console.error("Error saving device data", e);
    }
};

export const clearDeviceData = async () => {
    try {
        await AsyncStorage.removeItem(DEVICE_STORAGE_KEY);
    } catch (e) {
        console.error("Error clearing device data", e);
    }
};

// ── Server URL ─────────────────────────────────────────────────────────────

export const getServerUrl = async (): Promise<string> => {
    try {
        const stored = await AsyncStorage.getItem(SERVER_URL_KEY);
        return stored || DEFAULT_SERVER_URL;
    } catch (e) {
        console.error("Error reading server URL", e);
        return DEFAULT_SERVER_URL;
    }
};

export const setServerUrl = async (url: string): Promise<void> => {
    try {
        await AsyncStorage.setItem(SERVER_URL_KEY, url.trim().replace(/\/$/, ""));
    } catch (e) {
        console.error("Error saving server URL", e);
    }
};
