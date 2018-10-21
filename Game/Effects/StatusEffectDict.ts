import { StatusEffect } from './StatusEffect';
import { StatusEffectType } from './StatusEffectType';
import { Dictionary } from '../../Engine/Utilities/Dictionary';

export class StatusEffectDict extends Dictionary<StatusEffectType, StatusEffect> {
    public add(type: StatusEffectType, value1: number = 0, value2: number = 0, value3: number = 0, value4: number = 0) {
        this.set(type, new StatusEffect(type, value1, value2, value3, value4));
    }
}
