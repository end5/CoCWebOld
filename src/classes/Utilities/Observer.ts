import IObserver from './IObserver';

export default class Observer implements IObserver {
    public readonly update: (message: string) => void;
    public constructor(update: (message: string) => void) {
        this.update = update;
    }
}
