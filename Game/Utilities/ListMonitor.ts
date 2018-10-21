import { IObserverList } from './IObserverList';
import { List } from '../../Engine/Utilities/List';

/**
 * An IObserverList that reflects event changes from the observed List to the provided List.
 */
export class ListMonitor implements IObserverList<any> {
    private list: List<any>;
    private objectConstructor: new (...args: any) => any;
    private args: any[];
    public constructor(list: List<any>, objectConstructor: new (...args: any) => any, ...args: any[]) {
        this.list = list;
        this.objectConstructor = objectConstructor;
        this.args = args;
    }

    public onAdd(_item: any): void {
        this.list.add(new this.objectConstructor(this.args));
    }

    public onRemove(index: number): void {
        this.list.remove(index);
    }

    public onClear(): void {
        this.list.clear();
    }

    public update(_message: string): void { }
}
