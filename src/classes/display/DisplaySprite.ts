import ImageElement from './Elements/ImageElement';
import SpriteLibrary from './Images/SpriteLibrary';
import SpriteName from './Images/SpriteName';
import { Utils } from '../Utilities/Utils';

const spriteElement: ImageElement = new ImageElement();
spriteElement.setHTMLElement(Utils.loadFromId("mainSpriteDisplay") as HTMLImageElement);
const spriteLib: SpriteLibrary = new SpriteLibrary();

export default function DisplaySprite(name: SpriteName) {
    spriteElement.load(spriteLib.get(name));
    spriteElement.show();
}
