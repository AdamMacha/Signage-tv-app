// Správa přihlášení a administrátorského klíče v prohlížeči

export const DEFAULT_ADMIN_KEY = "alion-advert-secret-2026";
export const STORAGE_KEY_AUTH = "signage_admin_auth";
export const STORAGE_KEY_API_KEY = "signage_admin_api_key";

export const getExpectedAdminKey = (): string => {
    return process.env.NEXT_PUBLIC_ADMIN_KEY || DEFAULT_ADMIN_KEY;
};

export const getAdminKey = (): string => {
    if (typeof window === "undefined") {
        return getExpectedAdminKey();
    }
    return localStorage.getItem(STORAGE_KEY_API_KEY) || getExpectedAdminKey();
};

export const isAuthenticated = (): boolean => {
    if (typeof window === "undefined") return false;
    const isAuth = localStorage.getItem(STORAGE_KEY_AUTH) === "true";
    const key = localStorage.getItem(STORAGE_KEY_API_KEY);
    return Boolean(isAuth && key);
};

export const login = (password: string): boolean => {
    if (typeof window === "undefined") return false;
    const trimmed = password.trim();
    const expected = getExpectedAdminKey();

    if (trimmed === expected) {
        localStorage.setItem(STORAGE_KEY_AUTH, "true");
        localStorage.setItem(STORAGE_KEY_API_KEY, trimmed);
        return true;
    }
    return false;
};

export const logout = (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY_AUTH);
    localStorage.removeItem(STORAGE_KEY_API_KEY);
};
