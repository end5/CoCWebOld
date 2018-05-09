import { LocationName } from './LocationName';
import { ISerializable } from '../../Engine/Utilities/ISerializable';

export class Location implements ISerializable<Location> {
    private locName: LocationName;
    private visitCount: number;
    public locationKnown: boolean;
    public constructor(name?: LocationName) {
        this.locName = name;
        this.visitCount = 0;
        this.locationKnown = false;
    }

    public get name(): LocationName {
        return this.locName;
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

    public serialize(): string {
        return JSON.stringify({
            name: this.locName,
            visitCount: this.visitCount,
            locationKnown: this.locationKnown
        });
    }

    public deserialize(saveObject: Location): void {
        this.locName = saveObject.locName;
        this.visitCount = saveObject.visitCount;
        this.locationKnown = saveObject.locationKnown;
    }
}
