class Time {
    private date: Date;

    public get hour(): number {
        return this.date.getHours();
    }

    public set hour(value: number) {
        this.date.setHours(this.date.getHours() + value);
    }

    public get day(): number {
        return this.date.getDay();
    }

    public set day(value: number) {
        this.date.setDate(this.date.getDate() + value);
    }
}

const time = new Time();
export default time as Time;
