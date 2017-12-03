import ScreenElement from './ScreenElement';
import HtmlUtils from '../../Utilities/HtmlUtils';

export default class StatElement extends ScreenElement {
    private statBarElement: HTMLElement;
    private statCurrentElement: HTMLElement;
    private statMaxElement: HTMLElement;
    private statMax: number;
    private statCurrent: number;

    public constructor(element: HTMLElement) {
        super(element);
        this.statBarElement = HtmlUtils.loadFromClassName("statsBar", this.htmlElement);
        this.statCurrentElement = HtmlUtils.loadFromClassName("statsCurrent", this.htmlElement);
        this.statMaxElement = HtmlUtils.loadFromClassName("statsMax", this.htmlElement);
        this.statCurrent = 0;
        this.statMax = 100;
    }

    protected create(): HTMLElement {
        return null;
    }
    
    public setStat(statCurrent: number, statMax: number = -1) {
        this.statCurrent = statCurrent;
        this.statCurrentElement.innerHTML = statCurrent.toString();
        if (this.statBarElement) {
            if (statMax >= 0) {
                this.statMax = statMax;
                this.statMaxElement.innerHTML = statMax.toString();
            }
            if (this.statMax <= 0 || this.statCurrent <= 0)
                this.statBarElement.style.width = "0%";
            else
                this.statBarElement.style.width = (this.statCurrent / this.statMax * 100).toString() + "%";
        }
    }
}
