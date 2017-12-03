import ScreenElement from './ScreenElement';

export default class ListElement extends ScreenElement {
    private list: ListEntryElement[];
    
    public constructor(element?: HTMLUListElement) {
        super(element);
        this.list = [];
    }

    protected create(): HTMLElement {
        return document.createElement('ul');
    }

    public appendElement(element: ListEntryElement) {
        super.appendElement(element);
        this.list.push(element);
    }

    public get(index: number): ListEntryElement {
        return index < this.list.length ? this.list[index] : null;
    }

    public remove(index: number) {
        if (index > 0 && index < this.list.length) {
            this.removeElement(this.list.splice(index, 1)[0]);
        }
    }

    public count(): number {
        return this.list.length;
    }
}

export class ListEntryElement extends ScreenElement {
    public constructor(element?: HTMLLIElement) {
        super(element);
    }
    
    protected create(): HTMLElement {
        return document.createElement('li');
    }
}