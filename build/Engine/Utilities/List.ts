export type SortOption<T> = (a: T, b: T) => number;
export type FilterOption<T> = (value: T, index: number, array: T[]) => boolean;
export type ReduceOption<T, U> = (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U;
export type MapOption<T, U> = (value: T, index: number, array: T[]) => U;

export class List<Entry> implements Iterable<Entry> {
    protected list: Entry[] = [];
    private minLength: number = 0;

    public add(item: Entry) {
        this.list.push(item);
    }

    public remove(index: number) {
        if (index >= 0 && index < this.list.length && this.minLength <= this.list.length - 1)
            this.list.splice(index, 1);
    }

    public get(index: number): Entry {
        if (index >= 0 && index < this.list.length)
            return this.list[index];
        console.error("Array index out of bounds");
        return undefined;
    }

    public indexOf(object: Entry): number {
        return this.list.indexOf(object);
    }

    public clear() {
        this.list = [];
    }

    public get count(): number {
        return this.list.length;
    }

    public set minCount(min: number) {
        this.minLength = min;
    }

    /**
     * Returns a sorted copy of the list using the provided sort option
     * @param option SortOption
     */
    public sort(option: SortOption<Entry>): Entry[] {
        return this.list.slice().sort(option);
    }

    /**
     * Returns a filtered copy of the list using the provided filter option
     * @param option SortOption
     */
    public filter(option: FilterOption<Entry>): Entry[] {
        return this.list.filter(option);
    }

    /**
     * Reduces the list using reduce option provided
     * @param option SortOption
     */
    public reduce<U>(option: ReduceOption<Entry, U>, initialValue: U): U {
        return this.list.reduce(option, initialValue);
    }

    public map<U>(option: MapOption<Entry, U>, thisArg?: any): U[] {
        return this.list.map(option, thisArg);
    }

    public forEach(callbackfn: (value: Entry, index: number, array: Entry[]) => void, thisArg?: any): void {
        return this.list.forEach(callbackfn, thisArg);
    }

    public [Symbol.iterator](): Iterator<Entry> {
        let counter = 0;
        const storedList = this.list;

        return {
            next(): IteratorResult<Entry> {
                return {
                    done: counter === storedList.length,
                    value: storedList[counter++]
                };
            }
        };
    }
}
