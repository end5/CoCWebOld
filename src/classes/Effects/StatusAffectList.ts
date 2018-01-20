import StatusAffect from './StatusAffect';
import StatusAffectFactory from './StatusAffectFactory';
import { StatusAffectType } from './StatusAffectType';
import SerializableDictionary from '../Utilities/SerializableDictionary';

export default class StatusAffectList extends SerializableDictionary<StatusAffect> {
    public constructor() {
        super();
    }

    public deserialize(saveObject: StatusAffectList) {
        for (const key of Object.keys(saveObject)) {
            this.set(key, StatusAffectFactory.create(saveObject[key].type));
            this.get(key).deserialize(saveObject[key]);
        }
    }
}
