import ScreenElement from './ScreenElement';
import TextElement from './TextElement';

export default class ListEntryElement extends TextElement {
    public constructor(element?: HTMLLIElement) {
        super(element);
    }
    
    protected create(): HTMLElement {
        return document.createElement('li');
    }
}