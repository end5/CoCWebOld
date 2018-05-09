import { Legs } from './Legs';
import { ISerializable } from '../../Engine/Utilities/ISerializable';

export enum HipRating {
    BOYISH, SLENDER, AVERAGE, AMPLE, CURVY, FERTILE, INHUMANLY_WIDE
}

export class Hips implements ISerializable<Hips> {
    public rating: HipRating = HipRating.BOYISH;
    public readonly legs: Legs = new Legs();

    public serialize(): string {
        return JSON.stringify({
            rating: this.rating,
            legs: this.legs.serialize()
        });
    }

    public deserialize(saveObject: Hips) {
        this.rating = saveObject.rating;
        this.legs.deserialize(saveObject.legs);
    }
}
