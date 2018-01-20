import Perk from './Perk';
import PerkFactory from './PerkFactory';
import SerializableDictionary from '../Utilities/SerializableDictionary';

export default class PerkList extends SerializableDictionary<Perk> {
    public constructor() {
        super();
    }

    public deserialize(saveObject: PerkList) {
        for (const key of Object.keys(saveObject)) {
            this.set(key, PerkFactory.create(saveObject[key].type));
            this.get(key).deserialize(saveObject[key]);
        }
    }
}
