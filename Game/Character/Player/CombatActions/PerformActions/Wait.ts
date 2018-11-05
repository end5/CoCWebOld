import { Character } from '../../../Character';
import { ICombatAction } from '../../../../Combat/Actions/ICombatAction';
import { CView } from '../../../../../Page/ContentView';
import { CombatActionFlags } from '../../../../Effects/CombatActionFlag';

export class Wait implements ICombatAction {
    public flag: CombatActionFlags = CombatActionFlags.Wait;
    public name: string = "Wait";
    public reasonCannotUse: string = "";
    public subActions: ICombatAction[] = [];

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, target: Character): boolean {
        return true;
    }

    public use(character: Character, target: Character): void {
        CView.clear();
        CView.text("You decide not to take any action this round.\n\n");
    }
}
