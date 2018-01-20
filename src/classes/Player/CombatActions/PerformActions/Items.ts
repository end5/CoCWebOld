import Character from '../../../Character/Character';
import CombatAction from '../../../Combat/Actions/CombatAction';
import PlayerInventoryMenu from '../../../display/Menus/PlayerInventoryMenu';
import { CombatAbilityFlag } from '../../../Effects/CombatAbilityFlag';

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
        PlayerInventoryMenu.display(character);
    }
}
