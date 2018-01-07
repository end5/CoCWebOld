export type SortOption<T> = (a: T, b: T) => number;
export type FilterOption<T> = (value: T, index: number, array: T[]) => boolean;
export type ReduceOption<T, U> = (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U;

export default class List<T> implements Iterable<T> {
    protected list: T[] = [];

    public add(item: T) {
        this.list.push(item);
    }

    public remove(index: number) {
        if (index >= 0 && index < this.list.length)
            this.list.splice(index, 1);
    }

    public get(index: number): T {
        if (index >= 0 && index < this.list.length)
            return this.list[index];
        console.error("Array index out of bounds");
        return null;
    }

    public indexOf(object: T): number {
        return this.list.indexOf(object);
    }

    public clear() {
        this.list = [];
    }

    public get count(): number {
        return this.list.length;
    }

    /**
     * Returns a sorted copy of the list using the provided sort option
     * @param option SortOption
     */
    public sort(option: SortOption<T>): T[] {
        return this.list.slice().sort(option);
    }

    /**
     * Returns a filtered copy of the list using the provided filter option
     * @param option SortOption
     */
    public filter(option: FilterOption<T>): T[] {
        return this.list.filter(option);
    }

    /**
     * Reduces the list using reduce option provided
     * @param option SortOption
     */
    public reduce<U>(option: ReduceOption<T, U>, initialValue: U): U {
        return this.list.reduce(option, initialValue);
    }

    public [Symbol.iterator](): Iterator<T> {
        let counter = 0;
        const list = this.list;

        return {
            next(): IteratorResult<T> {
                return {
                    done: counter === list.length,
                    value: list[counter++]
                };
            }
        };
    }
}
