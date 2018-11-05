import { Character } from '../../../Character';
import { ICombatAction } from '../../../../Combat/Actions/ICombatAction';
import { CombatActionFlags } from '../../../../Effects/CombatActionFlag';
import { CView } from '../../../../../Page/ContentView';

export class Struggle implements ICombatAction {
    public flag: CombatActionFlags = CombatActionFlags.Attack;
    public name: string = "Struggle";
    public reasonCannotUse: string = "";
    public subActions: ICombatAction[] = [];

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, target: Character): boolean {
        return false;
    }

    public use(character: Character, target: Character): void {
        CView.text("You struggle.");
    }
}
