import { CombatAction } from '../../../../Combat/Actions/CombatAction';
import { CombatAbilityFlag } from '../../../../Effects/CombatAbilityFlag';
import { showActions } from '../../../../Menus/InGame/PlayerCombatMenu';
import { NextScreenChoices } from '../../../../SceneDisplay';
import { Character } from '../../../Character';
import { PhysicalActionLib } from '../ActionLibs/PhysicalActionLib';

export class PhysicalSpecials implements CombatAction {
    public name: string = "P. Special";
    public reasonCannotUse: string = "";

    public isPossible(character: Character): boolean {
        return character.combat.effects.combatAbilityFlag & CombatAbilityFlag.PhysSpec ? true : false;
    }

    public canUse(character: Character, target?: Character): boolean {
        return PhysicalActionLib.getPossibleActions(character).length > 0;
    }

    public use(character: Character, target: Character): NextScreenChoices {
        return showActions(character, PhysicalActionLib.getPossibleActions(character));
    }
}
