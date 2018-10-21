import { Effect } from './Effect';
import { EffectDescription } from './EffectDescription';
import { StatusEffectType } from './StatusEffectType';
import { StatusEffectDescLib } from './StatusEffectDescLib';

export class StatusEffect extends Effect<StatusEffectType, EffectDescription> {
    public constructor(type: StatusEffectType, value1?: number, value2?: number, value3?: number, value4?: number) {
        super(type, StatusEffectDescLib.get(type), value1, value2, value3, value4);
    }
}

export class StatusEffectDesc extends EffectDescription { }
