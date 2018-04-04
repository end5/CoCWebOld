import IObservableList from './IObservableList';
import IObserverList from './IObserverList';
import List from '../../Engine/Utilities/List';

export default class ObservableList<T> extends List<T> implements IObservableList<T> {
    private observerList: IObserverList<T>[] = [];
    public attach(observer: IObserverList<T>) {
        this.observerList.push(observer);
    }

    public detach(observer: IObserverList<T>) {
        this.observerList.splice(this.observerList.indexOf(observer), 1);
    }

    public notify(message: string) {
        for (const observer of this.observerList) {
            observer.update(message);
        }
    }

    public notifyAdd(item: T) {
        for (const observer of this.observerList) {
            observer.onAdd(item);
        }
    }

    public notifyRemove(index: number) {
        for (const observer of this.observerList) {
            observer.onRemove(index);
        }
    }

    public notifyClear() {
        for (const observer of this.observerList) {
            observer.onClear();
        }
    }

    public add(item: T) {
        super.add(item);
        this.notifyAdd(item);
    }

    public remove(index: number) {
        super.remove(index);
        this.notifyRemove(index);
    }

    public clear() {
        super.clear();
        this.notifyClear();
    }
}
