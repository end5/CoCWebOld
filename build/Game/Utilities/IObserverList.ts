import { IObserver } from './IObserver';

/**
 * All notification take place after the event has happened.
 */
export interface IObserverList<EntryType> extends IObserver {
    onAdd(item: EntryType): void;
    onRemove(index: number): void;
    onClear(): void;
}
