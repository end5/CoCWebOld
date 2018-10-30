import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Character } from '../../../Character';
import { ICombatAction } from '../../../../Combat/Actions/ICombatAction';
import { CombatAbilityFlag } from '../../../../Effects/CombatAbilityFlag';

export class Struggle implements ICombatAction {
    public flags: CombatAbilityFlag = CombatAbilityFlag.MainAction;
    public name: string = "Struggle";
    public reasonCannotUse: string = "";
    public actions: ICombatAction[] = [];

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, target: Character): boolean {
        return false;
    }

    public use(character: Character, target: Character): void | NextScreenChoices {
        return;
    }
}
