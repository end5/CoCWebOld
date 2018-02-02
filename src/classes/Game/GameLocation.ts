import LocationName from './LocationName';

export default class GameLocation {
    public readonly name: LocationName;
    private visitCount: number;
    public locationKnown: boolean;
    public constructor(name: LocationName) {
        this.name = name;
        this.visitCount = 0;
        this.locationKnown = false;
    }

    public get visited(): boolean {
        return this.timesVisited > 0;
    }

    public get timesVisited(): number {
        return this.visitCount;
    }

    public set timesVisited(count: number) {
        this.visitCount += count;
    }
}
