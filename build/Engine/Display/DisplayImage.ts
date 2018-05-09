import { ImageElement } from './Elements/ImageElement';
import { getImage, loadImages } from './Images/ImageLibrary';
import { ImageName } from './Images/ImageName';
import { loadFromId } from '../Utilities/Html';

const imageElement: ImageElement = new ImageElement();
imageElement.setHTMLElement(loadFromId("mainImageDisplay") as HTMLImageElement);
// loadImages();

export function DisplayImage(name: ImageName) {
    if (name === ImageName.None)
        imageElement.hide();
    else {
        imageElement.load(getImage(name));
        imageElement.show();
    }
}
