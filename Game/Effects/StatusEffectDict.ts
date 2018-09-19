import { StatusEffect } from './StatusEffect';
import { StatusEffectFactory } from './StatusEffectFactory';
import { StatusEffectType } from './StatusEffectType';
import { Dictionary } from '../../Engine/Utilities/Dictionary';

export class StatusEffectDict extends Dictionary<StatusEffect> {
    public add(type: StatusEffectType, value1: number = 0, value2: number = 0, value3: number = 0, value4: number = 0) {
        super.set(type, StatusEffectFactory.create(type, value1, value2, value3, value4));
    }

    public get(type: StatusEffectType): StatusEffect {
        return super.get(type);
    }

    public set(type: StatusEffectType, statusAffect: StatusEffect) {
        super.set(type, statusAffect);
    }

    public remove(type: StatusEffectType) {
        return super.remove(type);
    }

    public has(type: StatusEffectType): boolean {
        return super.has(type);
    }

    public keys(): StatusEffectType[] {
        return super.keys() as StatusEffectType[];
    }

    public deserialize(saveObject: StatusEffectDict) {
        const keys = Object.keys(saveObject);
        for (const key of keys) {
            const statusAffect = keys[key];
            this.add(statusAffect.type, statusAffect.value1, statusAffect.value1, statusAffect.value1, statusAffect.value4);
        }
    }
}
