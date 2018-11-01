import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Character } from '../../../Character';
import { ICombatAction } from '../../../../Combat/Actions/ICombatAction';
import { CombatAbilityFlag } from '../../../../Effects/CombatAbilityFlag';
import { inventoryMenu } from '../../../../Menus/InGame/PlayerInventoryMenu';

export class Items implements ICombatAction {
    public flags: CombatAbilityFlag = CombatAbilityFlag.Items;
    public name: string = "Items";
    public reasonCannotUse: string = "";
    public actions: ICombatAction[] = [];

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, target: Character): boolean {
        return true;
    }

    public use(character: Character, target: Character): NextScreenChoices {
        return inventoryMenu(character);
    }
}
