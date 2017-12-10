import ImageElement from './Elements/ImageElement';
import HtmlUtils from '../Utilities/HtmlUtils';

const DisplayImage: ImageElement = new ImageElement(<HTMLImageElement>HtmlUtils.loadFromId("mainImageDisplay"));
export default DisplayImage;