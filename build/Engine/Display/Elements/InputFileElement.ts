import ScreenElement from './ScreenElement';

export default class InputFileElement extends ScreenElement {
    public constructor() {
        super();
        this.htmlElement = document.createElement('input');
        (this.htmlElement as HTMLInputElement).type = "file";
    }

    public getFile(): string {
        return (this.htmlElement as HTMLInputElement).value;
    }

    public select() {
        (this.htmlElement as HTMLInputElement).select();
    }
}
