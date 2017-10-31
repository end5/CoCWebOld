import KeyObject from './KeyObject';

export class LibraryKey extends KeyObject {

}

export default class Library<T extends LibraryKey> {
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