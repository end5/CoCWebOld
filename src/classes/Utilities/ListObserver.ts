import IObserver from './IObserver';

export default abstract class ListObserver implements IObserver {
    public abstract onAdd(): void;
    public abstract onRemove(index: number): void;
    public abstract onClear(): void;

    public update(message: string): void {
        if (message === "add") {
            if (this.onAdd)
                this.onAdd();
        }
        else if (message.startsWith("remove")) {
            const parsedMessage = message.split(" ");
            if (parsedMessage.length > 1) {
                const index: number = +(parsedMessage[1]);
                if (this.onRemove)
                    this.onRemove(index);
            }
        }
        else if (message === "clear") {
            if (this.onClear)
                this.onClear();
        }
    }
}
