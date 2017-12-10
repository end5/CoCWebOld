import ScreenElement from './ScreenElement';

export enum TextFlag {
    None = 0,
    Bold = 1 << 0,
    Italic = 1 << 1,
    Underscore = 1 << 2
}

export default abstract class TextElement extends ScreenElement {
    private textBuffer: string = "";
    private bufferModified: boolean = false;
    private flags: TextFlag = TextFlag.None;

    private store(text: string) {
        this.textBuffer += text;
        this.bufferModified = true;
        this.htmlElement.innerHTML = this.textBuffer;
    }

    public getText(): string {
        return this.textBuffer;
    }

    public modified(): boolean {
        return this.bufferModified;
    }

    public newline(amount: number = 1) {
        while (amount > 0) {
            amount--;
            this.store("\n");
        }
    }

    public newParagraph() {
        this.store("\n");
        this.store("\n");
    }

    private processFlags(text: string, flags: TextFlag): string {
        if (flags & TextFlag.Bold)
            text = text.bold();
        if (flags & TextFlag.Italic)
            text = text.italics();
        return text;
    }

    public bold(text: string) {
        this.store(this.processFlags(text, TextFlag.Bold));
    }

    public italic(text: string) {
        this.store(this.processFlags(text, TextFlag.Italic));
    }

    public underscore(text: string) {
        this.store(this.processFlags(text, TextFlag.Underscore));
    }

    public text(text: string, flags?: TextFlag) {
        this.store(this.processFlags(text, flags));
    }

    public say(text: string, flags?: TextFlag) {
        this.store(this.processFlags(text, flags & TextFlag.Bold));
    }

    public describe(text: string, flags?: TextFlag) {
        this.store(this.processFlags(text, flags & TextFlag.Italic));
    }

    public link(text: string, link: string) {
        this.store("<a href='" + link + "'>" + this.processFlags(text, TextFlag.None) + text + "</a>");
    }

    public html(text: string) {
        this.store(text);
    }

    public clear() {
        while (this.htmlElement.hasChildNodes()) {
            this.htmlElement.removeChild(this.htmlElement.lastChild);
        }
        this.textBuffer = "";
        this.store("");
    }
}
