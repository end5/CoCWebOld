import TextElement from './TextElement';

export enum DisplayTextFlag {
    None = 0,
    Bold = 1 << 0,
    Italic = 1 << 1
}

export default class DisplayText {
    private static bufferOut: string = "";
    private static bufferModified: boolean = false;
    private static displayElement: TextElement;
    public static register(element: TextElement) {
        DisplayText.displayElement = element;
    }

    public static display() {
        if (DisplayText.displayElement) {
            DisplayText.displayElement.setHtml(DisplayText.bufferOut);
        }
        else {
            console.warn("Display element not registered");
        }
    }

    private static buffer(html: string) {
        DisplayText.bufferOut += html;
        DisplayText.bufferModified = true;
    }

    public static wasChanged(): boolean {
        return DisplayText.bufferModified;
    }


    public static newline(amount: number = 1) {
        while (amount > 0) {
            amount--;
            DisplayText.buffer("\n");
        }
    }

    public static newParagraph() {
        DisplayText.buffer("\n");
        DisplayText.buffer("\n");
    }

    public static text(text: string, flags?: DisplayTextFlag) {
        DisplayText.buffer(DisplayText.processFlags(text, flags));
    }

    private static processFlags(text: string, flags: DisplayTextFlag): string {
        if (flags & DisplayTextFlag.Bold)
            text = text.bold();
        if (flags & DisplayTextFlag.Italic)
            text = text.italics();
        return text;
    }

    public static textBold(text: string) {
        DisplayText.buffer(DisplayText.processFlags(text, DisplayTextFlag.Bold));
    }

    public static textItalic(text: string) {
        DisplayText.buffer(DisplayText.processFlags(text, DisplayTextFlag.Italic));
    }

    public static parseText(text: string) {
        text = this.parser.recursiveParser(text, parseAsMarkdown);

        DisplayText.text(text);
    }

    public static html(text: string) {
        DisplayText.buffer(text);
    }

    public static clear() {
        if (DisplayText.displayElement) {
            DisplayText.displayElement.setHtml("");
        }
        else {
            console.warn("Display element not registered");
        }
    }
}