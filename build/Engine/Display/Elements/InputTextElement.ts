import ScreenElement from './ScreenElement';

export default class InputTextElement extends ScreenElement {
    public constructor() {
        super();
        this.htmlElement = document.createElement('input');
        (this.htmlElement as HTMLInputElement).type = "text";
    }

    public getText(): string {
        return (this.htmlElement as HTMLInputElement).value;
    }

    public select() {
        (this.htmlElement as HTMLInputElement).select();
    }
}
