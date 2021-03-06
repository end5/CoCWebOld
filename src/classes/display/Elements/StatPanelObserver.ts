import ScreenElement from './ScreenElement';
import { Utils } from '../../Utilities/Utils';

export default class StatPanelObserver extends ScreenElement {
    private statBarElement: HTMLElement;
    private statCurrentElement: HTMLElement;
    private statMaxElement: HTMLElement;
    private statMax: number;
    private statCurrent: number;

    public setHTMLElement(element: HTMLElement) {
        this.statBarElement = Utils.loadFromClassName("statsBar", this.htmlElement);
        this.statCurrentElement = Utils.loadFromClassName("statsCurrent", this.htmlElement);
        this.statMaxElement = Utils.loadFromClassName("statsMax", this.htmlElement);
        this.statCurrent = 0;
        this.statMax = 100;
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
