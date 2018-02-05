import ListEntryElement from './ListItemElement';
import ScreenElement from './ScreenElement';

export default class UnorderedListElement extends ScreenElement {
    private list: ListEntryElement[];

    public constructor() {
        super();
        this.htmlElement = document.createElement('ul');
        this.list = [];
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
