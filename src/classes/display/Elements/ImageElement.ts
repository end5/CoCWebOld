import ScreenElement from './ScreenElement';

export default class ImageElement extends ScreenElement {
    public constructor(element: HTMLImageElement) {
        super(element);
    }

    protected create(): HTMLElement {
        return document.createElement('img');
    }
}