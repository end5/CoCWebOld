import Perk from './Perk';
import PerkFactory from './PerkFactory';
import { PerkType } from './PerkType';
import Dictionary from '../../Engine/Utilities/Dictionary';

export default class PerkDict extends Dictionary<Perk> {
    public add(type: PerkType, value1: number = 0, value2: number = 0, value3: number = 0, value4: number = 0) {
        this.set(type, PerkFactory.create(type, value1, value2, value3, value4));
    }

    public get(type: PerkType): Perk {
        return super.get(type);
    }

    public set(type: PerkType, perk: Perk) {
        super.set(type, perk);
    }

    public remove(type: PerkType) {
        return super.remove(type);
    }

    public has(type: PerkType): boolean {
        return super.has(type);
    }

    public keys(): PerkType[] {
        return super.keys() as PerkType[];
    }

    public deserialize(saveObject: PerkDict) {
        const keys = Object.keys(saveObject);
        for (const key of keys) {
            const perk = keys[key];
            this.add(perk.type, perk.value1, perk.value1, perk.value1, perk.value4);
        }
    }
}
