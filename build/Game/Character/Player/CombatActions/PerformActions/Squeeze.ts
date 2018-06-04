import { CombatAction } from '../../../../Combat/Actions/CombatAction';
import { StatusAffectType } from '../../../../Effects/StatusAffectType';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Character } from '../../../Character';

export class Squeeze implements CombatAction {
    public name: string = "Squeeze";
    public reasonCannotUse: string = "";

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, target?: Character): boolean {
        return !!target && target.statusAffects.has(StatusAffectType.Constricted);
    }

    public use(character: Character, target: Character): NextScreenChoices {
        // Scenes.desert.nagaScene.naggaSqueeze();
        return;
    }
}
