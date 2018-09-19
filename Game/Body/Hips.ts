import { ISerializable } from '../../Engine/Utilities/ISerializable';

export enum HipRating {
    BOYISH, SLENDER, AVERAGE, AMPLE, CURVY, FERTILE, INHUMANLY_WIDE
}

export class Hips implements ISerializable<Hips> {
    public rating: HipRating = HipRating.BOYISH;

    public serialize(): object | undefined {
        return {
            rating: this.rating,
        };
    }

    public deserialize(saveObject: Hips) {
        this.rating = saveObject.rating;
    }
}
