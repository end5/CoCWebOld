import IObservable from './IObservable';
import IObserver from './IObserver';
import List from './list';

export default class ObservableList<T> extends List<T> implements IObservable {
    private observerList: IObserver[] = [];
    public attach(observer: IObserver) {
        this.observerList.push(observer);
    }

    public detach(observer: IObserver) {
        this.observerList.splice(this.observerList.indexOf(observer), 1);
    }

    public notify(message: string) {
        for (const observer of this.observerList) {
            observer.update(message);
        }
    }

    public add(item: T) {
        super.add(item);
        this.notify("add");
    }

    public remove(index: number) {
        super.remove(index);
        this.notify("remove " + index);
    }

    public clear() {
        super.clear();
        this.notify("clear");
    }
}
