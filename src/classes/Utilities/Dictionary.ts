export default class Dictionary<Object> {
    private dictionary: object;

    public get(key: string): Object {
        return this.dictionary[key];
    }

    public add(key: string, entry: Object) {
        this.dictionary[key] = entry;
    }

    public has(key: string): boolean {
        return this.dictionary[key] !== undefined ? true : false;
    }

    public constructor() {
        this.dictionary = {};
    }
}