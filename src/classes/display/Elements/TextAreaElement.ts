import TextElement from './TextElement';

export default class TextAreaElement extends TextElement {
    public constructor() {
        super();
        this.htmlElement = document.createElement('textarea');
    }

    public select() {
        (<HTMLTextAreaElement>this.htmlElement).select();
    }
}