import { CombatAction } from '../../../../Combat/Actions/CombatAction';
import { CombatAbilityFlag } from '../../../../Effects/CombatAbilityFlag';
import { Menus } from '../../../../Menus/Menus';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Character } from '../../../Character';

export class Items implements CombatAction {
    public name: string = "Items";
    public reasonCannotUse: string = "";

    public isPossible(character: Character): boolean {
        return character.combat.effects.combatAbilityFlag & CombatAbilityFlag.Items ? true : false;
    }

    public canUse(character: Character, target?: Character): boolean {
        return true;
    }

    public use(character: Character, target: Character): NextScreenChoices {
        return Menus.Inventory(character);
    }
}
