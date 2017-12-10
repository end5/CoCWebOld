import TextElement from './TextElement';

export default class TextAreaElement extends TextElement {
    protected create(): HTMLElement {
        return document.createElement('textarea');
    }

    public getText(): string {
        return (<HTMLTextAreaElement>this.htmlElement).value;
    }

    public select() {
        (<HTMLTextAreaElement>this.htmlElement).select();
    }
}