import { Effect } from './Effect';
import { PerkType } from './PerkType';
import { PerkDescLib } from './PerkDescLib';
import { IEffectValues } from './EffectValues';

export class Perk extends Effect<PerkType> {
    public constructor(type: PerkType, values?: IEffectValues) {
        super(type, PerkDescLib.get(type)!, values);
    }
}
