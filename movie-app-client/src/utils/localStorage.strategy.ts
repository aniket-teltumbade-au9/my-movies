export class LocalStorage {
    private key: string;

    constructor(key: string) {
        this.key = key
    }

    get = (): string | null => {
        if (typeof window !== 'undefined') {
            return window.localStorage.getItem(this.key);
        }
        return null;
    }

    set = (val: string): void => {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem(this.key, val);
        }
    }

    remove = (): void => {
        if (typeof window !== 'undefined') {
            window.localStorage.removeItem(this.key);
        }
    }
}