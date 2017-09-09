import KeyObject from "./KeyObject";

export class LibraryEntry extends KeyObject {

}

export default class Library<T extends LibraryEntry> {
    private _library: object;

    public get(key: string): T {
        return this._library[key];
    }

    protected add(entry: T) {
        this._library[entry.objectKey] = entry;
    }

    public has(objectKey: string) {
        return this._library[objectKey] != undefined ? true : false;
    }

    public constructor() {
        this._library = {};
    }
}