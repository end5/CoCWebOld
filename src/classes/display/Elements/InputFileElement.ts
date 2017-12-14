import ScreenElement from './ScreenElement';

export default class InputFileElement extends ScreenElement {
    public constructor() {
        super();
        this.htmlElement = document.createElement('input');
        (<HTMLInputElement>this.htmlElement).type = "file";
    }
    
    public getFile(): string {
        return (<HTMLInputElement>this.htmlElement).value;
    }
    
    public select() {
        (<HTMLInputElement>this.htmlElement).select();
    }
}