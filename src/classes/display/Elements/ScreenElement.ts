import HtmlUtils from '../../Utilities/HtmlUtils';

export default class ScreenElement {
    protected htmlElement: HTMLElement;
    
    public constructor(element: HTMLElement) {
        this.htmlElement = element;
    }

    public hide() {
        this.htmlElement.style.visibility = "hidden";
    }

    public show() {
        this.htmlElement.style.visibility = "visible";
    }
}