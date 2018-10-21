import { CombatAbilityFlag } from './CombatAbilityFlag';
import { CombatEffect } from './CombatEffect';
import { CombatEffectConstructorLib, AbilityFlagsLib } from './CombatEffectLib';
import { CombatEffectType } from './CombatEffectType';
import { Dictionary } from '../../Engine/Utilities/Dictionary';
import { Character } from '../Character/Character';

export class CombatEffectList extends Dictionary<CombatEffectType, CombatEffect> {
    private character: Character;
    public constructor(character: Character) {
        super();
        this.character = character;
    }

    public add(type: CombatEffectType, inflictedBy: Character, value1: number = 0, value2: number = 0, value3: number = 0, value4: number = 0) {
        let newEffect;
        const abilityFlag = AbilityFlagsLib.has(type) ? CombatAbilityFlag.All : AbilityFlagsLib.get(type);
        const effectConstr = CombatEffectConstructorLib.get(type);
        if (abilityFlag && effectConstr) {
            newEffect = new effectConstr(type, value1, value2, value3, value4, abilityFlag, inflictedBy);
        }
        newEffect = new CombatEffect(type, value1, value2, value3, value4, abilityFlag, inflictedBy);
        this.set(type, newEffect);
        newEffect.onAdd(this.character);
    }

    public remove(type: CombatEffectType) {
        const effect = this.get(type);
        if (effect) {
            effect.onRemove(this.character);
        }
        super.remove(type);
    }

    public clear() {
        for (const key of this.keys()) {
            this.remove(key);
        }
        super.clear();
    }

    public get combatAbilityFlag(): CombatAbilityFlag {
        let flag = CombatAbilityFlag.All;
        let effect;
        for (const key of this.keys()) {
            effect = this.get(key);
            if (effect)
                flag &= effect.abilityFlag;
        }
        return flag;
    }
}
