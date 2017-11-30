import CombatAction from './Actions/CombatAction';
import Character from '../Character/Character';

export default class CombatActionLib<ActionType extends CombatAction> {
    protected list: ActionType[];
    public getPossibleActions(character: Character): ActionType[] {
        let list = [];
        for (let index: number = 0; index < this.list.length; index++) {
            list.push(this.list[index].isPossible(character));
        }
        return list;
    }
}



