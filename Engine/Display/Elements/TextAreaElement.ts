import { TextElement } from './TextElement';

export class TextAreaElement extends TextElement {
    public constructor() {
        super();
        this.htmlElement = document.createElement('textarea');
    }

    public select() {
        (this.htmlElement as HTMLTextAreaElement).select();
    }
}
