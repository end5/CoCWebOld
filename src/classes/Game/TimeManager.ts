import { TimeAwareInterface } from "../TimeAwareInterface";

export default class TimeManager {
    private timeAwareObjects: TimeAwareInterface[];
    private date: Date;
    private currentIndex: number;
    private timePaused: boolean;

    public constructor() {
        this.timeAwareObjects = [];
    }

    public add(timeAwareObject: TimeAwareInterface) {

    }

    public timeUpdate(amount: Date) {
        this.currentIndex = 0;
        while (!this.timePaused && this.currentIndex < this.timeAwareObjects.length) {
            this.timeAwareObjects[this.currentIndex].timeChange();
            this.currentIndex++;
        }
    }

    public pauseTime() {
        this.timePaused = true;
    }

    public unpauseTime() {
        this.timePaused = false;
    }

    public getTime(): Date {
        return this.date;
    }
}