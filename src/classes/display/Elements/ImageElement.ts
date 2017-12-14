import ScreenElement from './ScreenElement';

export default class ImageElement extends ScreenElement {
    public constructor() {
        super();
        this.htmlElement = document.createElement('img');
    }

    public load(location: string) {
        (<HTMLImageElement>this.htmlElement).src = location;
    }
}