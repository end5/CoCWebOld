export default class LibraryEntry {
    private _uniqueKey: string;

    public constructor(key: string) {
        this._uniqueKey = key;
    }

    public get uniqueKey(): string {
        return this._uniqueKey;
    }
}
