import StatusAffect from './StatusAffect';
import StatusAffectFactory from './StatusAffectFactory';
import { StatusAffectType } from './StatusAffectType';
import ISerializable from '../Utilities/ISerializable';
import SerializableDictionary from '../Utilities/SerializableDictionary';

export default class StatusAffectList extends SerializableDictionary<StatusAffect> {
    public add(type: StatusAffectType, value1: number = 0, value2: number = 0, value3: number = 0, value4: number = 0) {
        super.set(type, StatusAffectFactory.create(type, value1, value2, value3, value4));
    }

    public get(type: StatusAffectType): StatusAffect {
        return super.get(type);
    }

    public set(type: StatusAffectType, statusAffect: StatusAffect) {
        return super.get(type);
    }

    public remove(type: StatusAffectType) {
        return super.remove(type);
    }

    public has(type: StatusAffectType): boolean {
        return super.has(type);
    }

    public keys(): StatusAffectType[] {
        return super.keys() as StatusAffectType[];
    }

    public deserialize(saveObject: StatusAffectList) {
        const keys = Object.keys(saveObject);
        for (const key of keys) {
            const statusAffect = keys[key];
            this.add(statusAffect.type, statusAffect.value1, statusAffect.value1, statusAffect.value1, statusAffect.value4);
        }
    }
}
