import CombatAction from './CombatAction';
import Character from '../../Character/Character';

export default class NoAction implements CombatAction {
    public name: string = "NoAction";
    public reasonCannotUse: string = "NoAction";

    public isPossible(character: Character): boolean {
        return false;
    }

    public canUse(character: Character, monster: Character): boolean {
        return false;
    }

    public use(character: Character, monster: Character) { }
}
