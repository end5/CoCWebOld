import Perk from './Perk';
import PerkFactory from './PerkFactory';
import { PerkType } from './PerkType';
import ISerializable from '../Utilities/ISerializable';
import SerializableDictionary from '../Utilities/SerializableDictionary';

export default class PerkList implements ISerializable<PerkList> {
    private dictionary: SerializableDictionary<Perk>;
    public constructor() {
        this.dictionary = new SerializableDictionary();
    }

    public add(type: PerkType, value1: number = 0, value2: number = 0, value3: number = 0, value4: number = 0) {
        this.dictionary.set(type, PerkFactory.create(type, value1, value2, value3, value4));
    }

    public has(type: PerkType): boolean {
        return this.dictionary.has(type);
    }

    public get(type: PerkType): Perk {
        return this.dictionary.get(type);
    }

    public remove(type: PerkType) {
        return this.dictionary.remove(type);
    }

    public serialize(): string {
        return JSON.stringify({
            dictionary: this.dictionary.serialize()
        });
    }

    public deserialize(saveObject: PerkList) {
        const keys = Object.keys(saveObject);
        for (const key of keys) {
            const perk = keys[key];
            this.add(perk.type, perk.value1, perk.value1, perk.value1, perk.value4);
        }
    }
}
