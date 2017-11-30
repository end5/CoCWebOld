import CombatAction from './CombatAction';
import Character from '../../Character/Character';

export default class NoAction implements CombatAction {
    name: string = "NoAction";
    reasonCannotUse: string = "NoAction";
    isPossible(character: Character): boolean {
        return false;
    }
    canUse(character: Character, monster: Character): boolean {
        return false;
    }
    use(character: Character, monster: Character) {
    }
}