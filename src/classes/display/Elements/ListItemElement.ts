import ScreenElement from './ScreenElement';
import TextElement from './TextElement';

export default class ListEntryElement extends TextElement {
    public constructor() {
        super();
        this.htmlElement = document.createElement('li');
    }
}
