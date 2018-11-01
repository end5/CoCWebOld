import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Character } from '../../../Character';
import { ICombatAction } from '../../../../Combat/Actions/ICombatAction';
import { CView } from '../../../../../Page/ContentView';
import { CombatAbilityFlag } from '../../../../Effects/CombatAbilityFlag';

export class Wait implements ICombatAction {
    public flags: CombatAbilityFlag = CombatAbilityFlag.Wait;
    public name: string = "Wait";
    public reasonCannotUse: string = "";
    public actions: ICombatAction[] = [];

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, target: Character): boolean {
        return true;
    }

    public use(character: Character, target: Character): void | NextScreenChoices {
        CView.clear();
        CView.text("You decide not to take any action this round.\n\n");
    }
}
