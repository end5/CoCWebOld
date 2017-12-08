import ScreenElement from './ScreenElement';

export default class InputTextElement extends ScreenElement {
    protected create(): HTMLElement {
        const element = document.createElement("input");
        element.type = "text";
        return element;
    }
    
    public getText(): string {
        return (<HTMLInputElement>this.htmlElement).value;
    }
}