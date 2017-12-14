export default abstract class ScreenElement {
    protected htmlElement: HTMLElement;
    
    public setHTMLElement(element: HTMLElement) {
        this.htmlElement = element;
    }

    public hide() {
        this.htmlElement.style.visibility = "hidden";
    }

    public show() {
        this.htmlElement.style.visibility = "visible";
    }

    public appendElement(element: ScreenElement) {
        element.htmlElement = this.htmlElement.appendChild(element.htmlElement);
    }

    public removeElement(element: ScreenElement) {
        this.htmlElement.removeChild(element.htmlElement);
    }

    public get style(): CSSStyleDeclaration {
        return this.htmlElement.style;
    }
}