// Dynamické endpointy – URL serveru se načítá z AsyncStorage, ne z kódu
export const getEndpoints = (serverUrl: string) => ({
    register:  `${serverUrl}/devices`,
    playlist:  (deviceId: string) => `${serverUrl}/devices/${deviceId}/playlist`,
    heartbeat: (deviceId: string) => `${serverUrl}/devices/${deviceId}/heartbeat`,
});
