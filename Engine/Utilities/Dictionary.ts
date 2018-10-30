export class Dictionary<T extends string, U> implements Iterable<U> {
    protected dictionary: { [x: string]: any };

    public constructor() {
        this.dictionary = {};
    }

    public get(key: T): U | undefined {
        return this.dictionary[key];
    }

    public set(key: T, entry: U) {
        this.dictionary[key] = entry;
    }

    public remove(key: T) {
        delete this.dictionary[key];
    }

    public has(key: T): boolean {
        return !!this.dictionary[key];
    }

    public keys(): T[] {
        return Object.keys(this.dictionary) as T[];
    }

    public entries(): [T, U][] {
        return Object.keys(this.dictionary).map((key) => [key as T, this.dictionary[key] as U]) as [T, U][];
    }

    public clear() {
        this.dictionary = {};
    }

    public [Symbol.iterator](): Iterator<U> {
        let counter = 0;
        const list = this.dictionary;

        return {
            next(): IteratorResult<U> {
                return {
                    done: counter === Object.keys(list).length,
                    value: list[Object.keys(list)[counter++]]
                };
            }
        };
    }
}
