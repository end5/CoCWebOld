import CombatAction from './Actions/CombatAction';
import Character from '../Character/Character';

export default class CombatActionLib<ActionType extends CombatAction> {
    protected list: ActionType[] = [];
    public getPossibleActions(character: Character): ActionType[] {
        return this.list.filter((value: ActionType) => {
            return value.isPossible(character);
        });
    }
}
