import { CombatAction } from '../../../../Combat/Actions/CombatAction';
import { CombatEffectType } from '../../../../Effects/CombatEffectType';
import { NextScreenChoices } from '../../../../SceneDisplay';
import { Character } from '../../../Character';

export class Release implements CombatAction {
    public name: string = "Release";
    public reasonCannotUse: string = "";

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, target?: Character): boolean {
        return target !== undefined && target.combat.effects.has(CombatEffectType.Constricted);
    }

    public use(character: Character, target: Character): NextScreenChoices {
        // Scenes.desert.nagaScene.nagaLeggoMyEggo();
        return;
    }
}
