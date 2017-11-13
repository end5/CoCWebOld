import Perk from './Perk';
import PerkDesc from './PerkDesc';
import PerkDescLib from './PerkDescLib';
import ArousingAura from './Perks/ArousingAura';
import { PerkType } from './PerkType';
import ConstructorLibrary from '../Utilities/ConstructorLibrary';

interface PerkConstructor {
    new(perkType: PerkType, desc: PerkDesc, value1: number, value2: number, value3: number, value4: number): Perk;
}

class PerkLib extends ConstructorLibrary<PerkConstructor> {
    public constructor() {
        super();
        this.add(PerkType.ArousingAura, ArousingAura);
    }
}

export default class PerkFactory {
    private static perkLib: PerkLib;
    private static perkDescLib: PerkDescLib;

    public constructor() {
        if (!PerkFactory.perkLib)
            PerkFactory.perkLib = new PerkLib();
        if (!PerkFactory.perkDescLib)
            PerkFactory.perkDescLib = new PerkDescLib();
    }

    public static create(type: PerkType, value1: number, value2: number, value3: number, value4: number): Perk {
        const desc = PerkFactory.perkDescLib.get(type);
        if (PerkFactory.perkLib.has(type)) {
            return new (PerkFactory.perkLib.get(type))(type, desc, value1, value2, value3, value4);
        }
        return new Perk(type, desc, value1, value2, value3, value4);
    }

    public static copy(perk: Perk): Perk {
        return PerkFactory.create(perk.type, perk.value1, perk.value2, perk.value3, perk.value4);
    }
}