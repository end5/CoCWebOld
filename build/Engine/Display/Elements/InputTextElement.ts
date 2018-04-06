import ScreenElement from './ScreenElement';

export default class InputTextElement extends ScreenElement {
    public constructor() {
        super();
        this.htmlElement = document.createElement('input');
        (this.htmlElement as HTMLInputElement).type = "text";
    }

    public get text(): string {
        return (this.htmlElement as HTMLInputElement).value;
    }

    public set text(text: string) {
        (this.htmlElement as HTMLInputElement).value = text;
    }

    public select() {
        (this.htmlElement as HTMLInputElement).select();
    }
}
