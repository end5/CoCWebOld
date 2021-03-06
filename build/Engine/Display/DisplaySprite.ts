import { ImageElement } from './Elements/ImageElement';
import { SpriteLibrary } from './Images/SpriteLibrary';
import { SpriteName } from './Images/SpriteName';
import { loadFromId } from '../Utilities/Html';

const spriteElement: ImageElement = new ImageElement();
spriteElement.setHTMLElement(loadFromId("mainSpriteDisplay") as HTMLImageElement);
const spriteLib: SpriteLibrary = new SpriteLibrary();

export function DisplaySprite(name: SpriteName) {
    if (name === SpriteName.None)
        spriteElement.hide();
    else {
        spriteElement.load(spriteLib.get(name));
        spriteElement.show();
    }
}
