import ScreenElement from './ScreenElement';

export default class InputFileElement extends ScreenElement {
    protected create(): HTMLElement {
        const element = document.createElement("input");
        element.type = "file";
        return element;
    }
    
    public getFile(): string {
        return (<HTMLInputElement>this.htmlElement).value;
    }
    
    public select() {
        (<HTMLInputElement>this.htmlElement).select();
    }
}