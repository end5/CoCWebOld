import CombatAction from '../../../../Combat/Actions/CombatAction';
import { CombatAbilityFlag } from '../../../../Effects/CombatAbilityFlag';
import Menus from '../../../../Menus/Menus';
import Character from '../../../Character';

export default class Items implements CombatAction {
    public name: string = "Items";
    public reasonCannotUse: string = "";

    public isPossible(character: Character): boolean {
        return character.combat.effects.combatAbilityFlag & CombatAbilityFlag.Items ? true : false;
    }

    public canUse(character: Character, monster: Character): boolean {
        return true;
    }

    public use(character: Character, monster: Character) {
        Menus.Inventory(character);
    }
}
