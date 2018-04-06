import CombatAction from '../../../../Combat/Actions/CombatAction';
import { StatusAffectType } from '../../../../Effects/StatusAffectType';
import Character from '../../../Character';

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
        // Scenes.desert.nagaScene.naggaSqueeze();
    }
}
