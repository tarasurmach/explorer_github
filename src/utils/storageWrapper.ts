export class StorageWrapper {
    private  readonly storage: Storage;
    constructor() {
        try {
            this.storage = window.localStorage ;
        } catch (e) {
            console.error(e);
        }
    }
    getItem<T extends any>(key: string):T|undefined {
        if (!this.storage) return;
        try {
            const item = this.storage.getItem(key);
            if (!item) return;
            return JSON.parse(item);
        } catch (e) {
            console.error(e);
        }
    }
    get length() {
        return this.storage?.length;
    }
    set(key: string, val: unknown) {
        if (!this.storage) return;
        try {
            this.storage.setItem(key, JSON.stringify(val));
        } catch (e) {
            console.error(e);
        }
    }
    remove(key: string) {
        this.storage?.removeItem(key);
    }
    clearStorage() {
        this.storage?.clear();
    }

}
export const localStorageWrapper = new StorageWrapper();