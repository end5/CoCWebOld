import { SpriteLib } from "./Images/SpriteLibrary";
import { ImageElement } from "./Elements/ImageElement";
import { ParagraphElement } from "./Elements/ParagraphElement";
import { loadFromId } from "../Utilities/Html";
import { SpriteName } from "./Images/SpriteName";
import { getImage } from "./Images/ImageLibrary";

// function parse(text: string): string {
//     return text.replace("\n", "<br/>");
// }

class ContentView {
    public readonly imageElement: ImageElement = new ImageElement();
    public readonly textElement: ParagraphElement = new ParagraphElement();
    public readonly spriteElement: ImageElement = new ImageElement();

    public constructor() {
        this.imageElement.setHTMLElement(loadFromId("mainImageDisplay") as HTMLImageElement);
        this.textElement.setHTMLElement(loadFromId("mainTextDisplay") as HTMLParagraphElement);
        this.spriteElement.setHTMLElement(loadFromId("mainSpriteDisplay") as HTMLImageElement);
    }

    public text(content: string): ContentView {
        this.textElement.text(content);
        return this;
    }

    public image(imageName: string): ContentView {
        if (imageName) {
            this.imageElement.load(getImage(imageName));
            this.imageElement.show();
        }
        else
            this.imageElement.hide();
        return this;
    }

    public sprite(spriteName: SpriteName): ContentView {
        if (spriteName === SpriteName.None)
            this.spriteElement.hide();
        else if (SpriteLib.get(spriteName) === undefined)
            console.error('Unknown sprite');
        else {
            this.spriteElement.load(SpriteLib.get(spriteName)!);
            this.spriteElement.show();
        }
        return this;
    }

    public clear(): ContentView {
        this.textElement.clear();
        this.imageElement.hide();
        this.spriteElement.hide();
        return this;
    }
}

export const CView = new ContentView();
