import LibraryEntry from './LibraryEntry';

export default class ConstantLibrary<T extends LibraryEntry> {
    private _library: object;

    public get(key: string): T {
        return this._library[key];
    }

    protected add(entry: T) {
        this._library[entry.uniqueKey] = entry;
    }

    public has(uniqueKey: string) {
        return this._library[uniqueKey] != undefined ? true : false;
    }

    public constructor() {
        this._library = {};
    }
}