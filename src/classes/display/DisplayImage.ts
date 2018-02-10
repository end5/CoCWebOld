import ImageElement from './Elements/ImageElement';
import ImageLibrary from './Images/ImageLibrary';
import ImageName from './Images/ImageName';
import { Utils } from '../Utilities/Utils';

const imageElement: ImageElement = new ImageElement();
imageElement.setHTMLElement(Utils.loadFromId("mainImageDisplay") as HTMLImageElement);
const imageLib: ImageLibrary = new ImageLibrary();

export default function DisplayImage(name: ImageName) {
    imageElement.load(imageLib.get(name));
    imageElement.show();
}
