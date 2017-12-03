import DisplayText from './DisplayText';
import BlankElement from './Elements/BlankElement';
import ImageElement from './Elements/ImageElement';
import TextElement from './Elements/TextElement';
import MainScreen from './MainScreen';
import HtmlUtils from '../Utilities/HtmlUtils';

export default class MainDisplay {
    public readonly mainDisplay: BlankElement;
    public readonly image: ImageElement;
    
    public constructor() {
        this.mainDisplay = new BlankElement(HtmlUtils.loadFromId("mainDisplay"));        
        this.image = new ImageElement(<HTMLImageElement>HtmlUtils.loadFromId("mainImageDisplay"));
    }
}