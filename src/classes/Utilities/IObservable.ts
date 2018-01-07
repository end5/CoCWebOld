import IObserver from './IObserver';

interface IObservable {
    attach(observer: IObserver): void;
    detach(observer: IObserver): void;
    notify(message: string): void;
}
export default IObservable;
