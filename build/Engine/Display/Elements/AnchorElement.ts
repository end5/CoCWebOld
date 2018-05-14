import { ScreenElement } from './ScreenElement';

export class AnchorElement extends ScreenElement {
    public constructor() {
        super();
        this.htmlElement = document.createElement('a');
    }

    public get href(): string {
        return (this.htmlElement as HTMLAnchorElement).href;
    }

    public set href(link: string) {
        (this.htmlElement as HTMLAnchorElement).href = link;
    }

    public get download(): string {
        return (this.htmlElement as HTMLAnchorElement).download;
    }

    public set download(name: string) {
        (this.htmlElement as HTMLAnchorElement).download = name;
    }

    public click() {
        this.htmlElement.click();
    }
}
