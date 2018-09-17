import { PlaceName } from './PlaceName';
import { ISerializable } from '../../Engine/Utilities/ISerializable';

export class Place implements ISerializable<Place> {
    private locName: PlaceName;
    private visitCount: number;
    public locationKnown: boolean;
    public constructor(name?: PlaceName) {
        this.locName = name;
        this.visitCount = 0;
        this.locationKnown = false;
    }

    public get name(): PlaceName {
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

    public serialize(): object | undefined {
        return {
            name: this.locName,
            visitCount: this.visitCount,
            locationKnown: this.locationKnown
        };
    }

    public deserialize(saveObject: Place): void {
        this.locName = saveObject.locName;
        this.visitCount = saveObject.visitCount;
        this.locationKnown = saveObject.locationKnown;
    }
}
