export const STORAGE_KEYS = {
    //
} as const;

type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

function ensureBrowser() {
    if (typeof window === "undefined") {
        throw new Error("browserStorage can only be used in the browser.");
    }
}

export const setItem = (key: StorageKey, value: unknown) => {
    ensureBrowser();
    window.localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = <T = unknown>(key: StorageKey): T | null => {
    ensureBrowser();
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
};

export const removeItem = (key: StorageKey) => {
    ensureBrowser();
    window.localStorage.removeItem(key);
};

export const webStorage = { getItem, setItem, removeItem };
