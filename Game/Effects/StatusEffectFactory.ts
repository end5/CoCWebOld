import { StatusEffect } from './StatusEffect';
import { StatusEffectDescLib } from './StatusEffectDescLib';
import { StatusEffectType } from './StatusEffectType';

class StatusEffectFactory {
    private statusAffectDescLib: StatusEffectDescLib;

    public constructor() {
        if (!this.statusAffectDescLib)
            this.statusAffectDescLib = new StatusEffectDescLib();
    }

    public create(type: StatusEffectType, value1: number = 0, value2: number = 0, value3: number = 0, value4: number = 0): StatusEffect {
        const desc = this.statusAffectDescLib.get(type);
        return new StatusEffect(type, desc, value1, value2, value3, value4);
    }

    public copy(statusAffect: StatusEffect): StatusEffect {
        return this.create(statusAffect.type, statusAffect.value1, statusAffect.value2, statusAffect.value3, statusAffect.value4);
    }
}

const statusEffectFactory = new StatusEffectFactory();
export { statusEffectFactory as StatusEffectFactory };
