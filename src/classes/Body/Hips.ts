import Legs from './Legs';
import ISerializable from '../Utilities/ISerializable';

export enum HipRating {
    BOYISH, SLENDER, AVERAGE, AMPLE, CURVY, FERTILE, INHUMANLY_WIDE
}

export default class Hips implements ISerializable<Hips> {
    public rating: HipRating = HipRating.BOYISH;
    public readonly legs: Legs = new Legs();

    public serialize(): string {
        return JSON.stringify({
            rating: this.rating,
            legs: this.legs.serialize()
        });
    }

    public deserialize(saveObject: Hips): Hips {
        const newHips = new Hips();
        newHips.rating = saveObject.rating;
        newHips.legs.deserialize(saveObject.legs);
        return newHips;
    }
}
