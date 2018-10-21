export class Dictionary<U extends string, T> implements Iterable<T> {
    protected dictionary: { [x: string]: any };

    public constructor() {
        this.dictionary = {};
    }

    public get(key: U): T | undefined {
        return this.dictionary[key];
    }

    public set(key: U, entry: T) {
        this.dictionary[key] = entry;
    }

    public remove(key: U) {
        delete this.dictionary[key];
    }

    public has(key: U): boolean {
        return !!this.dictionary[key];
    }

    public keys(): U[] {
        return Object.keys(this.dictionary) as U[];
    }

    public clear() {
        this.dictionary = {};
    }

    public [Symbol.iterator](): Iterator<T> {
        let counter = 0;
        const list = this.dictionary;

        return {
            next(): IteratorResult<T> {
                return {
                    done: counter === Object.keys(list).length,
                    value: list[Object.keys(list)[counter++]]
                };
            }
        };
    }
}
