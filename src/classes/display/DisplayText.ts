import ParagraphElement from './Elements/ParagraphElement';
import HtmlUtils from '../Utilities/HtmlUtils';

const DisplayText: ParagraphElement = new ParagraphElement(<HTMLParagraphElement>HtmlUtils.loadFromId("mainTextDisplay"));
export default DisplayText;