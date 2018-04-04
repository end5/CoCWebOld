export default abstract class ScreenElement {
    protected htmlElement: HTMLElement;

    public setHTMLElement(element: HTMLElement) {
        this.htmlElement = element;
    }

    public hide() {
        if (this.htmlElement)
            this.htmlElement.style.visibility = "hidden";
    }

    public show() {
        if (this.htmlElement)
            this.htmlElement.style.visibility = "visible";
    }

    public appendElement(element: ScreenElement) {
        if (this.htmlElement)
            element.htmlElement = this.htmlElement.appendChild(element.htmlElement);
    }

    public removeElement(element: ScreenElement) {
        if (this.htmlElement)
            this.htmlElement.removeChild(element.htmlElement);
    }

    public get style(): CSSStyleDeclaration {
        if (this.htmlElement)
            return this.htmlElement.style;
        else
            return undefined;
    }

    public get computedStyle(): CSSStyleDeclaration {
        if (this.htmlElement)
            return window.getComputedStyle(this.htmlElement);
        else
            return undefined;
    }
}
