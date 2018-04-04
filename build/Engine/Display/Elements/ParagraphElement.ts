import TextElement from './TextElement';

export default class ParagraphElement extends TextElement {
    public constructor() {
        super();
        this.htmlElement = document.createElement('p');
    }
}
