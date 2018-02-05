import StatusAffect from './StatusAffect';
import StatusAffectFactory from './StatusAffectFactory';
import { StatusAffectType } from './StatusAffectType';
import ISerializable from '../Utilities/ISerializable';
import SerializableDictionary from '../Utilities/SerializableDictionary';

export default class StatusAffectList implements ISerializable<StatusAffectList> {
    private dictionary: SerializableDictionary<StatusAffect>;
    public constructor() {
        this.dictionary = new SerializableDictionary();
    }

    public add(type: StatusAffectType, value1: number = 0, value2: number = 0, value3: number = 0, value4: number = 0) {
        this.dictionary.set(type, StatusAffectFactory.create(type, value1, value2, value3, value4));
    }

    public has(type: StatusAffectType): boolean {
        return this.dictionary.has(type);
    }

    public get(type: StatusAffectType): StatusAffect {
        return this.dictionary.get(type);
    }

    public remove(type: StatusAffectType) {
        return this.dictionary.remove(type);
    }

    public serialize(): string {
        return JSON.stringify({
            dictionary: this.dictionary.serialize()
        });
    }

    public deserialize(saveObject: StatusAffectList) {
        const keys = Object.keys(saveObject);
        for (const key of keys) {
            const statusAffect = keys[key];
            this.add(statusAffect.type, statusAffect.value1, statusAffect.value1, statusAffect.value1, statusAffect.value4);
        }
    }
}
