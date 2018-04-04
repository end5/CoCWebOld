import ScreenElement from './ScreenElement';

export default class BlankElement extends ScreenElement {
    public constructor() {
        super();
        this.htmlElement = document.createElement('div');
    }
}
