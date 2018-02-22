import IObserverList from './IObserverList';
import List from './list';

/**
 * An IObserverList that reflects event changes from the observed List to the provided List.
 */
export default class ListMonitor implements IObserverList<any> {
    private list: List<any>;
    private objectConstructor: new (...args) => any;
    private args: any[];
    public constructor(list: List<any>, objectConstructor: new (...args) => any, ...args: any[]) {
        this.list = list;
        this.objectConstructor = objectConstructor;
        this.args = args;
    }

    public onAdd(item: any): void {
        this.list.add(new this.objectConstructor(this.args));
    }

    public onRemove(index: number): void {
        this.list.remove(index);
    }

    public onClear(): void {
        this.list.clear();
    }

    public update(message: string): void { }
}
