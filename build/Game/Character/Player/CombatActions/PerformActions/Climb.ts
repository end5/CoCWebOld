import { CombatAction } from '../../../../Combat/Actions/CombatAction';
import { CombatEffectType } from '../../../../Effects/CombatEffectType';
import { NextScreenChoices } from '../../../../SceneDisplay';
import { Character } from '../../../Character';

export class Climb implements CombatAction {
    public name: string = "Climb";
    public reasonCannotUse: string = "";

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, target?: Character): boolean {
        return target !== undefined && target.combat.effects.has(CombatEffectType.Level);
    }

    public use(character: Character, target: Character): NextScreenChoices {
        // if (monster.combat.effects.has(CombatEffectType.Level)) {
        //     (monster as Sandtrap).sandTrapWait();
        // }
        return;
    }
}
