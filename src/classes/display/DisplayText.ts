export enum DisplayTextFlag {
    None = 0,
    Bold = 1 << 0,
    Italic = 1 << 1
}

export default class DisplayText {
    private static displayElement: HTMLElement;
    public static register(element: HTMLElement) {
        DisplayText.displayElement = element;
    }

    private static display(html: string) {
        if (DisplayText.displayElement) {
            DisplayText.displayElement.innerHTML += html;
        }
        else {
            console.warn("Display element not registered");
        }
    }


    public static newline(amount: number = 1) {
        while (amount > 0) {
            amount--;
            DisplayText.display("\n");
        }
    }

    public static newParagraph() {
        DisplayText.display("\n");
        DisplayText.display("\n");
    }

    public static text(text: string, flags?: DisplayTextFlag) {
        DisplayText.display(DisplayText.processFlags(text, flags));
    }

    private static processFlags(text: string, flags: DisplayTextFlag): string {
        if (flags & DisplayTextFlag.Bold)
            text = text.bold();
        if (flags & DisplayTextFlag.Italic)
            text = text.italics();
        return text;
    }

    public static textBold(text: string) {
        DisplayText.display(DisplayText.processFlags(text, DisplayTextFlag.Bold));
    }

    public static textItalic(text: string) {
        DisplayText.display(DisplayText.processFlags(text, DisplayTextFlag.Italic));
    }

    public static parseText(text: string) {
        text = this.parser.recursiveParser(text, parseAsMarkdown);

        DisplayText.text(text);
    }

    public static html(text: string) {
        DisplayText.display(text);
    }

    public static clear() {
        if (DisplayText.displayElement) {
            DisplayText.displayElement.innerHTML = "";
        }
        else {
            console.warn("Display element not registered");
        }
    }
}