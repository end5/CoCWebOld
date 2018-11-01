import { ScreenElement } from '../Engine/Display/Elements/ScreenElement';
import { loadFromClassName } from '../Engine/Utilities/Html';

export class StatPanel extends ScreenElement<HTMLElement> {
    private statBarElement: HTMLElement;
    private statCurrentElement: HTMLElement;
    // private statMaxElement: HTMLElement;
    private statValue: number;
    private statMin: number;
    private statMax: number;

    public constructor(element: HTMLElement) {
        super(element);
        this.statBarElement = loadFromClassName("statsBar", this.htmlElement);
        this.statCurrentElement = loadFromClassName("statsCurrent", this.htmlElement);
        // this.statMaxElement = loadFromClassName("statsMax", this.htmlElement);
        this.statValue = 0;
        this.statMin = 0;
        this.statMax = 100;
    }

    public setHTMLElement(element: HTMLElement) {
        super.setHTMLElement(element);
        this.setStats();
    }

    private setStats() {
        this.statBarElement = loadFromClassName("statsBar", this.htmlElement);
        this.statCurrentElement = loadFromClassName("statsCurrent", this.htmlElement);
        // this.statMaxElement = loadFromClassName("statsMax", this.htmlElement);
        this.statValue = 0;
        this.statMin = 0;
        this.statMax = 100;
    }

    public get value() {
        return this.statValue;
    }
    public set value(num: number) {
        this.statValue = num;
        this.update();
    }

    public get min() {
        return this.statMin;
    }
    public set min(num: number) {
        this.statMin = num;
        this.update();
    }

    public get max() {
        return this.statMax;
    }
    public set max(num: number) {
        this.statMax = num;
        this.update();
    }

    private update() {
        this.statCurrentElement.innerHTML = this.statValue.toString();
        if (this.statBarElement) {
            // if (this.statMax >= 0) {
            //     this.statMaxElement.innerHTML = this.statMax.toString();
            // }
            if (this.statMax <= 0 || this.statValue <= 0)
                this.statBarElement.style.width = "0%";
            else
                this.statBarElement.style.width = (this.statValue / this.statMax * 100).toString() + "%";
        }
    }
}
