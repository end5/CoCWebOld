export type SortOption<T> = (a: T, b: T) => number;
export type FilterOption<T> = (value: T, index: number, array: T[]) => any;

export default class List<T> {
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
        console.log("Array index out of bounds");
        return null;
    }

    public clear() {
        this.list = [];
    }

    public get length(): number {
        return this.list.length;
    }

    public sort(option: SortOption<T>): T[] {
        return this.list.slice().sort(option);
    }

    public filter(option: FilterOption<T>): T[] {
        return this.list.filter(option);
    }
}
