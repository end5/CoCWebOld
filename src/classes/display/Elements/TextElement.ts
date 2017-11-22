import ScreenElement from './ScreenElement';

export default class TextElement extends ScreenElement {
    public setText(text: string) {
        this.htmlElement.textContent = text;
    }
    
    public setHtml(html: string) {
        this.htmlElement.innerHTML = html;
    }
}
