import Legs from './Legs';
import SerializeInterface from '../SerializeInterface';

export enum HipRating {
    BOYISH, SLENDER, AVERAGE, AMPLE, CURVY, FERTILE, INHUMANLY_WIDE
}

export default class Hips implements SerializeInterface {
    public rating: HipRating = HipRating.BOYISH;
    public readonly legs: Legs = new ();

    public serialize(): string {
        return JSON.stringify({
            rating: this.rating,
            legs: this.legs
        })
    }
    
    public deserialize(saveObject: Hips) {
        this.rating = saveObject.rating;
        this.legs.deserialize(saveObject.legs);
    }
}