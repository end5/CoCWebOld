import { TimeAwareInterface } from '../TimeAwareInterface';
import UpdateInterface from '../UpdateInterface';

export default class TimeManager implements UpdateInterface {
    private timeAwareObjects: TimeAwareInterface[];
    private date: Date;
    private currentIndex: number;
    private timePaused: boolean;

    public constructor() {
        this.timeAwareObjects = [];
    }

    public add(timeAwareObject: TimeAwareInterface) {
        this.timeAwareObjects.push(timeAwareObject);
    }

    public update(hours: number) {
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

    public get hour(): number {
        return this.date.getHours();
    }

    public get day(): number {
        return this.date.getDay();
    }
}