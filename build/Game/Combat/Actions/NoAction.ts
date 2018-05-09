import { CombatAction } from './CombatAction';
import { Character } from '../../Character/Character';
import { ClickFunction, NextScreenChoices } from '../../ScreenDisplay';

class NoAction implements CombatAction {
    public name: string = "NoAction";
    public reasonCannotUse: string = "NoAction";

    public isPossible(character: Character): boolean {
        return false;
    }

    public canUse(character: Character, monster: Character): boolean {
        return false;
    }

    public use(character: Character, monster: Character): NextScreenChoices {
        return;
    }
}

const noAction = new NoAction();
export { noAction as NoAction };
