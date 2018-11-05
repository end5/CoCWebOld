import { CombatEffectType } from '../../../../Effects/CombatEffectType';
import { Character } from '../../../Character';
import { ICombatAction } from '../../../../Combat/Actions/ICombatAction';
import { CombatActionFlags } from '../../../../Effects/CombatActionFlag';

export class Climb implements ICombatAction {
    public flag: CombatActionFlags = CombatActionFlags.Attack;
    public name: string = "Climb";
    public reasonCannotUse: string = "";
    public subActions: ICombatAction[] = [];

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, target: Character): boolean {
        return !!target && target.combat.effects.has(CombatEffectType.Level);
    }

    public use(character: Character, target: Character): void {
        // if (monster.combat.effects.has(CombatEffectType.Level)) {
        //     (monster as Sandtrap).sandTrapWait();
        // }
    }
}
