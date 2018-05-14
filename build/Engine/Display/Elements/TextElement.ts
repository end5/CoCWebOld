import { ScreenElement } from './ScreenElement';

export abstract class TextElement extends ScreenElement {
    private textBuffer: string = "";
    private bufferModified: boolean = false;

    private store(addToStart: string, addToEnd: string) {
        this.bufferModified = true;
        const innerHTML = this.htmlElement.innerHTML.slice(0, this.htmlElement.innerHTML.length - this.textBuffer.length);
        this.textBuffer = addToStart + this.textBuffer + addToEnd;
        this.htmlElement.innerHTML = innerHTML + this.textBuffer;
    }

    public getText(): string {
        return this.textBuffer;
    }

    public modified(): boolean {
        return this.bufferModified;
    }

    public text(text: string): TextElement {
        this.bufferModified = true;
        this.textBuffer = text + "";
        this.htmlElement.innerHTML += text;
        return this;
    }

    public newline(): TextElement {
        this.store("<br>", "");
        return this;
    }

    public endline(): TextElement {
        this.store("", "<br>");
        return this;
    }

    public newParagraph(): TextElement {
        this.store("<br><br>", "");
        return this;
    }

    public bold(): TextElement {
        this.store("<b>", "</b>");
        return this;
    }

    public italic(): TextElement {
        this.store("<i>", "</i>");
        return this;
    }

    public underscore(): TextElement {
        this.store("<u>", "</u>");
        return this;
    }

    public say(): TextElement {
        this.store("<b>", "</b>");
        return this;
    }

    public describe(): TextElement {
        this.store("<i>", "</i>");
        return this;
    }

    public link(link: string): TextElement {
        this.store("<a href='" + link + "'>", "</a>");
        return this;
    }

    public clear() {
        while (this.htmlElement.hasChildNodes()) {
            this.htmlElement.removeChild(this.htmlElement.lastChild);
        }
        this.textBuffer = "";
        this.htmlElement.innerHTML = "";
    }
}
