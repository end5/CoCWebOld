import TextElement from './TextElement';

export default class ParagraphElement extends TextElement {
    public constructor(element?: HTMLParagraphElement) {
        super(element);
    }

    protected create(): HTMLElement {
        return document.createElement('p');
    }
}