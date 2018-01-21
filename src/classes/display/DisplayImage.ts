import ImageElement from './Elements/ImageElement';
import { Utils } from '../Utilities/Utils';

const DisplayImage: ImageElement = new ImageElement();
DisplayImage.setHTMLElement(Utils.loadFromId("mainImageDisplay") as HTMLImageElement);
export default DisplayImage;
