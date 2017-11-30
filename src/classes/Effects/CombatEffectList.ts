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

    public matchAbilityFlag(flag: CombatAbilityFlag): boolean {
        this.iterate((item: CombatEffect) => {
            flag &= item.abilityFlag;
        });
        return flag ? true : false;
    }
}