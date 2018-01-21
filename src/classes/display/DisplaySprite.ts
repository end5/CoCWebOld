import ImageElement from './Elements/ImageElement';
import { Utils } from '../Utilities/Utils';

const DisplaySprite: ImageElement = new ImageElement();
DisplaySprite.setHTMLElement(Utils.loadFromId("mainSpriteDisplay") as HTMLImageElement);
export default DisplaySprite;
