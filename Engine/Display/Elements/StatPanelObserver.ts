import { ScreenElement } from './ScreenElement';
import { loadFromClassName } from '../../Utilities/Html';

export class StatPanelObserver extends ScreenElement<HTMLElement> {
    private statBarElement: HTMLElement;
    private statCurrentElement: HTMLElement;
    private statMaxElement: HTMLElement;
    private statMax: number;
    private statCurrent: number;

    public constructor(element: HTMLElement) {
        super(element);
        this.statBarElement = loadFromClassName("statsBar", this.htmlElement);
        this.statCurrentElement = loadFromClassName("statsCurrent", this.htmlElement);
        this.statMaxElement = loadFromClassName("statsMax", this.htmlElement);
        this.statCurrent = 0;
        this.statMax = 100;
    }

    public setHTMLElement(element: HTMLElement) {
        super.setHTMLElement(element);
        this.setStats();
    }

    private setStats() {
        this.statBarElement = loadFromClassName("statsBar", this.htmlElement);
        this.statCurrentElement = loadFromClassName("statsCurrent", this.htmlElement);
        this.statMaxElement = loadFromClassName("statsMax", this.htmlElement);
        this.statCurrent = 0;
        this.statMax = 100;
    }

    public setStat(statCurrent: number, statMax: number = -1) {
        this.statCurrent = Math.floor(statCurrent);
        this.statCurrentElement.innerHTML = this.statCurrent.toString();
        if (this.statBarElement) {
            if (statMax >= 0) {
                this.statMax = Math.floor(statMax);
                this.statMaxElement.innerHTML = statMax.toString();
            }
            if (this.statMax <= 0 || this.statCurrent <= 0)
                this.statBarElement.style.width = "0%";
            else
                this.statBarElement.style.width = (this.statCurrent / this.statMax * 100).toString() + "%";
        }
    }
}
