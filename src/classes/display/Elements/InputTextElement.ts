import ScreenElement from './ScreenElement';

export default class InputTextElement extends ScreenElement {
    public constructor() {
        super();
        this.htmlElement = document.createElement('input');
        (<HTMLInputElement>this.htmlElement).type = "text";
    }
    
    public getText(): string {
        return (<HTMLInputElement>this.htmlElement).value;
    }

    public select() {
        (<HTMLInputElement>this.htmlElement).select();
    }
}