import Cock, { CockType } from './Cock';
import SerializableList from '../Utilities/SerializableList';

export default class CockList extends SerializableList<Cock> {
    public constructor() {
        super(Cock);
    }

    // Note: DogCocks/FoxCocks are functionally identical. They actually change back and forth depending on some
    // of the PC's attributes, and this is recaluculated every hour spent at camp.
    // As such, delineating between the two is kind of silly.
    public filterType(type: CockType): Cock[] {
        return this.filter((cock: Cock) => {
            return cock.type === type && (cock.type === CockType.DOG || cock.type === CockType.FOX);
        });
    }
}
