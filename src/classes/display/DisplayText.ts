import TextElement from './Elements/TextElement';
import HtmlUtils from '../Utilities/HtmlUtils';

const DisplayText: TextElement = new TextElement(<HTMLParagraphElement>HtmlUtils.loadFromId("mainTextDisplay"));
export default DisplayText;