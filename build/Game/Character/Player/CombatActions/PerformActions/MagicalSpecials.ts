import { CombatAction } from '../../../../Combat/Actions/CombatAction';
import { CombatAbilityFlag } from '../../../../Effects/CombatAbilityFlag';
import { showActions } from '../../../../Menus/InGame/PlayerCombatMenu';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Character } from '../../../Character';
import { MagicalActionLib } from '../ActionLibs/MagicalActionLib';

export class MagicalSpecials implements CombatAction {
    public name: string = "M. Specials";
    public reasonCannotUse: string = "";

    public isPossible(character: Character): boolean {
        return character.combat.effects.combatAbilityFlag & CombatAbilityFlag.PhysSpec ? true : false;
    }

    public canUse(character: Character, target?: Character): boolean {
        return MagicalActionLib.getPossibleActions(character).length > 0;
    }

    public use(character: Character, target: Character): NextScreenChoices {
        return showActions(character, MagicalActionLib.getPossibleActions(character));
    }
}
