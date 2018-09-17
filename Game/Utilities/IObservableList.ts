import { IObservable } from './IObservable';

export interface IObservableList<T> extends IObservable {
    notifyAdd(item: T): void;
    notifyRemove(index: number): void;
    notifyClear(): void;
}
