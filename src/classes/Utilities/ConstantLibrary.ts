export default class ConstantLibrary<Entry> {
    private _library: object;
    
    public constructor() {
        this._library = {};
    }

    public get(key: string): Entry {
        return this._library[key];
    }

    protected add(key: string | number, value: Entry) {
        this._library[key] = value;
    }

    public has(key: string | number) {
        return this._library[key] != undefined ? true : false;
    }
}