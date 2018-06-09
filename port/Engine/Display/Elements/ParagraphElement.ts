import { TextElement } from './TextElement';

export class ParagraphElement extends TextElement {
    public constructor() {
        super();
        this.htmlElement = document.createElement('p');
    }
}
