import { CombatEffectType } from '../../../../Effects/CombatEffectType';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Character } from '../../../Character';
import { ICombatAction } from '../../../../Combat/Actions/ICombatAction';
import { CombatAbilityFlag } from '../../../../Effects/CombatAbilityFlag';

export class Climb implements ICombatAction {
    public flags: CombatAbilityFlag = CombatAbilityFlag.MainAction;
    public name: string = "Climb";
    public reasonCannotUse: string = "";
    public actions: ICombatAction[] = [];

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, target: Character): boolean {
        return !!target && target.combat.effects.has(CombatEffectType.Level);
    }

    public use(character: Character, target: Character): void | NextScreenChoices {
        // if (monster.combat.effects.has(CombatEffectType.Level)) {
        //     (monster as Sandtrap).sandTrapWait();
        // }
    }
}
