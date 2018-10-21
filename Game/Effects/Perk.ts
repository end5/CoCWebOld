import { Effect } from './Effect';
import { EffectDescription } from './EffectDescription';
import { PerkType } from './PerkType';
import { Character } from '../Character/Character';
import { PerkDescLib } from './PerkDescLib';

export class Perk extends Effect<PerkType, PerkDesc> {
    public constructor(type: PerkType, value1?: number, value2?: number, value3?: number, value4?: number) {
        super(type, PerkDescLib.get(type), value1, value2, value3, value4);
    }
 }

export class PerkDesc extends EffectDescription {
    constructor(key: string, name: string, desc: string, longDesc?: string) {
        super(key, name, desc, longDesc);
    }

    public description(_perk?: Perk, _character?: Character): string {
        return super.description();
    }
}
