export class TimeModel {
    private _days: number;
    private _hours: number;

    public get days(): number {
        return this._days;
    }

    public set days(value: number) {
        this._days = value;
    }

    public get hours(): number {
        return this._hours;
    }

    public set hours(value: number) {
        this._hours = value;
    }
    public get totalTime(): number {
        return (this._days * 24 + this._hours);
    }
}
