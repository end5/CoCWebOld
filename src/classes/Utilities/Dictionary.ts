export default class Dictionary<Entry> {
    protected dictionary: object;

    public constructor() {
        this.dictionary = {};
    }

    public get(key: string | number): Entry {
        return this.dictionary[key];
    }

    public add(key: string | number, entry: Entry) {
        this.dictionary[key] = entry;
    }

    public has(key: string | number): boolean {
        return this.dictionary[key] !== undefined ? true : false;
    }

    public clear() {
        this.dictionary = {};
    }
}