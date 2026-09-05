// Správa přihlášení a administrátorského klíče v prohlížeči
import { getApiUrl } from "./api";

export const STORAGE_KEY_AUTH = "signage_admin_auth";
export const STORAGE_KEY_API_KEY = "signage_admin_api_key";

/**
 * Vrátí aktuální administrátorský API klíč uložený v prohlížeči po úspěšném přihlášení.
 */
export const getAdminKey = (): string => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem(STORAGE_KEY_API_KEY) || "";
};

/**
 * Ověří, zda je administrátor v prohlížeči přihlášen a má uložen platný klíč.
 */
export const isAuthenticated = (): boolean => {
    if (typeof window === "undefined") return false;
    const isAuth = localStorage.getItem(STORAGE_KEY_AUTH) === "true";
    const key = localStorage.getItem(STORAGE_KEY_API_KEY);
    return Boolean(isAuth && key && key.trim().length > 0);
};

export interface LoginResult {
    success: boolean;
    error?: string;
}

/**
 * Bezpečné přihlášení: Ověří heslo / API klíč přímo voláním backend serveru.
 * Žádný tajný klíč se neukládá do veřejného bundle Next.js a není potřeba NEXT_PUBLIC_ proměnná.
 */
export const login = async (password: string, customApiUrl?: string): Promise<LoginResult> => {
    if (typeof window === "undefined") {
        return { success: false, error: "Operace není dostupná mimo klientský prohlížeč." };
    }

    const trimmed = password.trim();
    if (!trimmed) {
        return { success: false, error: "Zadejte prosím administrátorské heslo." };
    }

    const apiUrl = customApiUrl || getApiUrl();

    try {
        const controller = new AbortController();
        // 12s timeout – Render servery se na free tieru mohou probouzet ze spánku
        const timeoutId = setTimeout(() => controller.abort(), 12000);

        const res = await fetch(`${apiUrl}/devices`, {
            method: "GET",
            headers: {
                "x-admin-key": trimmed,
                Authorization: `Bearer ${trimmed}`,
            },
            signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (res.status === 200) {
            localStorage.setItem(STORAGE_KEY_AUTH, "true");
            localStorage.setItem(STORAGE_KEY_API_KEY, trimmed);
            return { success: true };
        }

        if (res.status === 401 || res.status === 403) {
            return {
                success: false,
                error: "Nesprávné administrátorské heslo / klíč. Přístup byl odepřen.",
            };
        }

        return {
            success: false,
            error: `Server odpověděl nečekaným kódem (${res.status}). Zkontrolujte stav serveru.`,
        };
    } catch (err: any) {
        if (err.name === "AbortError") {
            return {
                success: false,
                error: "Časový limit vypršel. Backend server se možná probouzí ze spánku, zkuste to prosím za okamžik znovu.",
            };
        }
        return {
            success: false,
            error: `Nelze se spojit se serverem (${apiUrl}). Zkontrolujte připojení k internetu a stav backendu.`,
        };
    }
};

/**
 * Odhlásí administrátora a odstraní pověření z prohlížeče.
 */
export const logout = (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY_AUTH);
    localStorage.removeItem(STORAGE_KEY_API_KEY);
};
