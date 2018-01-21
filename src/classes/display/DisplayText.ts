import ParagraphElement from './Elements/ParagraphElement';
import { Utils } from '../Utilities/Utils';

const textElement: ParagraphElement = new ParagraphElement();
textElement.setHTMLElement(Utils.loadFromId("mainTextDisplay") as HTMLParagraphElement);

export default function DisplayText(text: string = ""): ParagraphElement {
    textElement.text(text);
    return textElement;
}
