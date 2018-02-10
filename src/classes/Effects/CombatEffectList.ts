import { CombatAbilityFlag } from './CombatAbilityFlag';
import CombatEffect from './CombatEffect';
import CombatEffectFactory from './CombatEffectFactory';
import { CombatEffectType } from './CombatEffectType';
import Character from '../Character/Character';
import ISerializable from '../Utilities/ISerializable';
import SerializableDictionary from '../Utilities/SerializableDictionary';

export default class CombatEffectList extends SerializableDictionary<CombatEffect> {
    private character: Character;
    public constructor(character: Character) {
        super();
        this.character = character;
    }

    public add(type: CombatEffectType, value1: number = 0, value2: number = 0, value3: number = 0, value4: number = 0, inflictedBy?: Character) {
        const newEffect = CombatEffectFactory.create(type, value1, value2, value3, value4, inflictedBy);
        this.set(type, newEffect);
        newEffect.onAdd(this.character);
    }

    public get(type: CombatEffectType): CombatEffect {
        return super.get(type);
    }

    public set(type: CombatEffectType, effect: CombatEffect) {
        super.set(type, effect);
    }

    public remove(type: CombatEffectType) {
        if (this.has(type)) {
            this.get(type).onRemove(this.character);
        }
        super.remove(type);
    }

    public has(type: CombatEffectType): boolean {
        return super.has(type);
    }

    public keys(): CombatEffectType[] {
        return super.keys() as CombatEffectType[];
    }

    public clear() {
        for (const key of this.keys()) {
            this.remove(key);
        }
        super.clear();
    }

    public get combatAbilityFlag(): CombatAbilityFlag {
        let flag = CombatAbilityFlag.All;
        for (const key of this.keys()) {
            flag &= this.get(key).abilityFlag;
        }
        return flag;
    }

    public deserialize(saveObject: CombatEffectList) {
        const keys = Object.keys(saveObject);
        for (const key of keys) {
            const combatEffect = keys[key];
            this.add(combatEffect.type, combatEffect.value1, combatEffect.value1, combatEffect.value1, combatEffect.value4, combatEffect.inflictedBy);
        }
    }
}
