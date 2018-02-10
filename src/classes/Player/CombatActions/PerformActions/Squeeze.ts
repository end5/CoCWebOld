import Character from '../../../Character/Character';
import CombatAction from '../../../Combat/Actions/CombatAction';
import { StatusAffectType } from '../../../Effects/StatusAffectType';

export default class Squeeze implements CombatAction {
    public name: string = "Squeeze";
    public reasonCannotUse: string = "";

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, monster: Character): boolean {
        return monster.statusAffects.has(StatusAffectType.Constricted);
    }

    public use(character: Character, monster: Character) {
        desert.nagaScene.naggaSqueeze();
    }
}
