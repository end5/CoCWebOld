import ImageElement from './Elements/ImageElement';
import HtmlUtils from '../Utilities/HtmlUtils';

const DisplaySprite: ImageElement = new ImageElement(<HTMLImageElement>HtmlUtils.loadFromId("mainSpriteDisplay"));
export default DisplaySprite;