import { ScreenElement } from './ScreenElement';

export class BlankElement extends ScreenElement {
    public constructor() {
        super();
        this.htmlElement = document.createElement('div');
    }
}
