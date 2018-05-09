import { Perk, PerkDesc } from './Perk';
import { PerkDescLib } from './PerkDescLib';
import { PerkType } from './PerkType';

interface PerkConstructor {
    new(perkType: PerkType, desc: PerkDesc, value1: number, value2: number, value3: number, value4: number): Perk;
}

const perkDescLib: PerkDescLib = new PerkDescLib();

class PerkFactory {
    public create(type: PerkType, value1: number = 0, value2: number = 0, value3: number = 0, value4: number = 0): Perk {
        const desc = perkDescLib.get(type);
        return new Perk(type, desc, value1, value2, value3, value4);
    }

    public copy(perk: Perk): Perk {
        return this.create(perk.type, perk.value1, perk.value2, perk.value3, perk.value4);
    }
}

const perkFactory = new PerkFactory();
export { perkFactory as PerkFactory };
