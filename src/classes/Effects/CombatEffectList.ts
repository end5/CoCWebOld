import { CombatAbilityFlag } from './CombatAbilityFlag';
import CombatEffect from './CombatEffect';
import CombatEffectFactory from './CombatEffectFactory';
import { CombatEffectType } from './CombatEffectType';
import Character from '../Character/Character';
import ComponentList from '../Utilities/ComponentList';

export default class CombatEffectList extends ComponentList<CombatEffect, CombatEffectType> {
    private character: Character;
    public constructor(character: Character) {
        super();
        this.character = character;
    }

    public add(combatEffect: CombatEffect) {
        super.add(combatEffect);
        combatEffect.onAdd(this.character);
    }

    public remove(type: CombatEffectType) {
        if (this.has(type)) {
            this.get(type).onRemove(this.character);
        }
        super.remove(type);
    }

    public get combatAbilityFlag(): CombatAbilityFlag {
        let flag = CombatAbilityFlag.All;
        for(let index = 0; index < this.count(); index++) {
            flag &= this.at(index).abilityFlag;
        }
        return flag;
    }
}