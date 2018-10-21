import { Perk } from './Perk';
import { PerkType } from './PerkType';
import { Dictionary } from '../../Engine/Utilities/Dictionary';

export class PerkDict extends Dictionary<PerkType, Perk> {
    public add(type: PerkType, value1: number = 0, value2: number = 0, value3: number = 0, value4: number = 0) {
        this.set(type, new Perk(type, value1, value2, value3, value4));
    }
}
