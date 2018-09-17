import { ScreenElement } from './ScreenElement';

export class ImageElement extends ScreenElement {
    public constructor() {
        super();
        this.htmlElement = document.createElement('img');
    }

    public load(location: string) {
        (this.htmlElement as HTMLImageElement).src = location;
    }
}
