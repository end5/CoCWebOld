import { CombatAbilityFlag } from './CombatAbilityFlag';
import CombatEffect from './CombatEffect';
import CombatEffectFactory from './CombatEffectFactory';
import { CombatEffectType } from './CombatEffectType';
import Character from '../Character/Character';
import ISerializable from '../Utilities/ISerializable';
import SerializableDictionary from '../Utilities/SerializableDictionary';

export default class CombatEffectList implements ISerializable<CombatEffectList> {
    private dictionary: SerializableDictionary<CombatEffect>;
    private character: Character;
    public constructor(character: Character) {
        this.dictionary = new SerializableDictionary();
        this.character = character;
    }

    public add(type: CombatEffectType, value1: number = 0, value2: number = 0, value3: number = 0, value4: number = 0, inflictedBy?: Character) {
        const newEffect = CombatEffectFactory.create(type, value1, value2, value3, value4, inflictedBy);
        this.dictionary.set(type, newEffect);
        newEffect.onAdd(this.character);
    }

    public get(type: CombatEffectType): CombatEffect {
        return this.dictionary.get(type);
    }

    public remove(type: CombatEffectType) {
        if (this.dictionary.has(type)) {
            this.dictionary.get(type).onRemove(this.character);
        }
        this.dictionary.remove(type);
    }

    public clear() {
        for (const key of this.dictionary.keys()) {
            this.dictionary.remove(key);
        }
        this.dictionary.clear();
    }

    public get combatAbilityFlag(): CombatAbilityFlag {
        let flag = CombatAbilityFlag.All;
        for (const key of this.dictionary.keys()) {
            flag &= this.dictionary.get(key).abilityFlag;
        }
        return flag;
    }

    public serialize(): string {
        return JSON.stringify({
            dictionary: this.dictionary.serialize()
        });
    }

    public deserialize(saveObject: CombatEffectList) {
        const keys = Object.keys(saveObject);
        for (const key of keys) {
            const combatEffect = keys[key];
            this.add(combatEffect.type, combatEffect.value1, combatEffect.value1, combatEffect.value1, combatEffect.value4, combatEffect.inflictedBy);
        }
    }
}
