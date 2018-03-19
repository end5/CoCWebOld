import Perk, { PerkDesc } from './Perk';
import PerkDescLib from './PerkDescLib';
import { PerkType } from './PerkType';

interface PerkConstructor {
    new(perkType: PerkType, desc: PerkDesc, value1: number, value2: number, value3: number, value4: number): Perk;
}

export default class PerkFactory {
    private static perkDescLib: PerkDescLib;

    public constructor() {
        if (!PerkFactory.perkDescLib)
            PerkFactory.perkDescLib = new PerkDescLib();
    }

    public static create(type: PerkType, value1: number = 0, value2: number = 0, value3: number = 0, value4: number = 0): Perk {
        const desc = PerkFactory.perkDescLib.get(type);
        return new Perk(type, desc, value1, value2, value3, value4);
    }

    public static copy(perk: Perk): Perk {
        return PerkFactory.create(perk.type, perk.value1, perk.value2, perk.value3, perk.value4);
    }
}
