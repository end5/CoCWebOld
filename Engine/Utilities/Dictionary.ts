export class Dictionary<Entry> implements Iterable<Entry> {
    protected dictionary: { [x: string]: any };

    public constructor() {
        this.dictionary = {};
    }

    public get(key: string): Entry {
        return this.dictionary[key];
    }

    public set(key: string, entry: Entry) {
        this.dictionary[key] = entry;
    }

    public remove(key: string) {
        delete this.dictionary[key];
    }

    public has(key: string): boolean {
        return !!this.dictionary[key];
    }

    public keys(): string[] {
        return Object.keys(this.dictionary);
    }

    public clear() {
        this.dictionary = {};
    }

    public [Symbol.iterator](): Iterator<Entry> {
        let counter = 0;
        const list = this.dictionary;

        return {
            next(): IteratorResult<Entry> {
                return {
                    done: counter === Object.keys(list).length,
                    value: list[Object.keys(list)[counter++]]
                };
            }
        };
    }
}
