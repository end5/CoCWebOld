import { Character } from '../../../Character';
import { ICombatAction } from '../../../../Combat/Actions/ICombatAction';
import { CombatActionFlags } from '../../../../Effects/CombatActionFlag';
import { inventoryMenu } from '../../../../Menus/InGame/PlayerInventoryMenu';

export class Items implements ICombatAction {
    public flag: CombatActionFlags = CombatActionFlags.Items;
    public name: string = "Items";
    public reasonCannotUse: string = "";
    public subActions: ICombatAction[] = [];

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, target: Character): boolean {
        return true;
    }

    public use(character: Character, target: Character): void {
        inventoryMenu(character);
    }
}
