import { CombatAbilityFlag } from './CombatAbilityFlag';
import CombatEffect from './CombatEffect';
import CombatEffectFactory from './CombatEffectFactory';
import { CombatEffectType } from './CombatEffectType';
import Character from '../Character/Character';
import SerializableDictionary from '../Utilities/SerializableDictionary';

export default class CombatEffectList extends SerializableDictionary<CombatEffect> {
    private character: Character;
    public constructor(character: Character) {
        super();
        this.character = character;
    }

    public set(type: CombatEffectType, combatEffect: CombatEffect) {
        super.set(type, combatEffect);
        combatEffect.onAdd(this.character);
    }

    public remove(type: CombatEffectType) {
        if (this.has(type)) {
            this.get(type).onRemove(this.character);
        }
        super.remove(type);
    }

    public clear() {
        for (const key of Object.keys(this.dictionary)) {
            this.remove(key as CombatEffectType);
        }
        super.clear();
    }

    public get combatAbilityFlag(): CombatAbilityFlag {
        let flag = CombatAbilityFlag.All;
        for (const combatAbility of this) {
            flag &= combatAbility.abilityFlag;
        }
        return flag;
    }
}
