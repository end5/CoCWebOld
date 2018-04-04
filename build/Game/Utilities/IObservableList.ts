import IObservable from './IObservable';

export default interface IObservableList<T> extends IObservable {
    notifyAdd(item: T): void;
    notifyRemove(index: number): void;
    notifyClear(): void;
}
