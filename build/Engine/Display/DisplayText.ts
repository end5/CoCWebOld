import ParagraphElement from './Elements/ParagraphElement';
import { loadFromId } from '../Utilities/Html';

const textElement: ParagraphElement = new ParagraphElement();
textElement.setHTMLElement(loadFromId("mainTextDisplay") as HTMLParagraphElement);

function parse(text: string): string {
    return text.replace("\n", "<br/>");
}

export default function DisplayText(text: string = ""): ParagraphElement {
    textElement.text(parse(text));
    return textElement;
}
