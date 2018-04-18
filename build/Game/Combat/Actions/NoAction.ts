import CombatAction from './CombatAction';
import { ClickFunction } from '../../../Engine/Display/MainScreen';
import Character from '../../Character/Character';

class NoAction implements CombatAction {
    public name: string = "NoAction";
    public reasonCannotUse: string = "NoAction";

    public isPossible(character: Character): boolean {
        return false;
    }

    public canUse(character: Character, monster: Character): boolean {
        return false;
    }

    public use(character: Character, monster: Character): ClickFunction {
        return;
    }
}

const noAction = new NoAction();
export default noAction as NoAction;
