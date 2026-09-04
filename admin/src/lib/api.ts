// Typy a API klient pro komunikaci se Signage Serverem

export interface Device {
    id: string;
    name: string;
    lastSeen: string | null;
    pendingCommand: string | null;
    createdAt: string;
    _count: {
        playlist: number;
    };
}

export interface Video {
    id: string;
    name: string;
    filename: string;
    mimeType: string;
    size: number;
    createdAt: string;
    downloadUrl?: string;
}

export interface PlaylistItem {
    playlistItemId: string;
    order: number;
    video: {
        id: string;
        name: string;
        filename: string;
        mimeType: string;
        size: number;
        downloadUrl: string;
    };
}

export const DEFAULT_API_URL = "https://alionadvert.onrender.com";
export const STORAGE_KEY_API_URL = "signage_admin_api_url";

export const getApiUrl = (): string => {
    if (typeof window === "undefined") return DEFAULT_API_URL;
    return localStorage.getItem(STORAGE_KEY_API_URL) || DEFAULT_API_URL;
};

export const setApiUrl = (url: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY_API_URL, url.trim().replace(/\/$/, ""));
};

// ── Zařízení ───────────────────────────────────────────────────────────────

export const fetchDevices = async (): Promise<Device[]> => {
    const res = await fetch(`${getApiUrl()}/devices`);
    if (!res.ok) throw new Error(`Chyba při načítání zařízení (${res.status})`);
    return res.json();
};

export const createDevice = async (name: string): Promise<Device & { token: string }> => {
    const res = await fetch(`${getApiUrl()}/devices`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
    });
    if (!res.ok) throw new Error("Chyba při vytváření zařízení");
    return res.json();
};

export const deleteDevice = async (id: string): Promise<void> => {
    const res = await fetch(`${getApiUrl()}/devices/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Chyba při mazání zařízení");
};

export const sendDeviceCommand = async (
    id: string,
    action: "restart" | "reload_playlist"
): Promise<{ message: string }> => {
    const res = await fetch(`${getApiUrl()}/devices/${id}/command`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
    });
    if (!res.ok) throw new Error(`Chyba při odesílání příkazu: ${action}`);
    return res.json();
};

// ── Videa ──────────────────────────────────────────────────────────────────

export const fetchVideos = async (): Promise<Video[]> => {
    const res = await fetch(`${getApiUrl()}/videos`);
    if (!res.ok) throw new Error(`Chyba při načítání videí (${res.status})`);
    return res.json();
};

export const uploadVideo = async (
    file: File,
    customName?: string,
    onProgress?: (percentage: number) => void
): Promise<Video> => {
    const formData = new FormData();
    formData.append("video", file);
    if (customName) formData.append("name", customName);

    // Použijeme XMLHttpRequest pro sledování progressu
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `${getApiUrl()}/videos/upload`);

        if (xhr.upload && onProgress) {
            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    const percent = Math.round((event.loaded / event.total) * 100);
                    onProgress(percent);
                }
            };
        }

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const video = JSON.parse(xhr.responseText);
                    resolve(video);
                } catch {
                    reject(new Error("Neplatná odpověď serveru"));
                }
            } else {
                try {
                    const err = JSON.parse(xhr.responseText);
                    reject(new Error(err.error || `Chyba při nahrávání (${xhr.status})`));
                } catch {
                    reject(new Error(`Chyba serveru (${xhr.status})`));
                }
            }
        };

        xhr.onerror = () => reject(new Error("Chyba sítě při nahrávání videa"));
        xhr.send(formData);
    });
};

export const deleteVideo = async (id: string): Promise<void> => {
    const res = await fetch(`${getApiUrl()}/videos/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Chyba při mazání videa");
};

// ── Playlist ───────────────────────────────────────────────────────────────

export const fetchDevicePlaylist = async (deviceId: string): Promise<PlaylistItem[]> => {
    const res = await fetch(`${getApiUrl()}/devices/${deviceId}/playlist`);
    if (!res.ok) throw new Error(`Chyba při načítání playlistu (${res.status})`);
    return res.json();
};

export const addVideoToPlaylist = async (
    deviceId: string,
    videoId: string,
    order?: number
): Promise<unknown> => {
    const res = await fetch(`${getApiUrl()}/devices/${deviceId}/playlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId, order }),
    });
    if (!res.ok) throw new Error("Chyba při přidávání videa do playlistu");
    return res.json();
};

export const removeVideoFromPlaylist = async (
    deviceId: string,
    videoId: string
): Promise<void> => {
    const res = await fetch(`${getApiUrl()}/devices/${deviceId}/playlist/${videoId}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Chyba při odstraňování videa z playlistu");
};

export const reorderPlaylist = async (
    deviceId: string,
    order: Array<{ videoId: string; order: number }>
): Promise<void> => {
    const res = await fetch(`${getApiUrl()}/devices/${deviceId}/playlist/reorder`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order }),
    });
    if (!res.ok) throw new Error("Chyba při ukládání pořadí playlistu");
};
