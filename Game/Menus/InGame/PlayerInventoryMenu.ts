import { displayCharInventory } from './InventoryDisplay';
import { SpriteName } from '../../../Engine/Display/Images/SpriteName';
import { MainScreen } from '../../../Engine/Display/MainScreen';
import { Character } from '../../Character/Character';
import { CombatManager } from '../../Combat/CombatManager';
import { NextScreenChoices, ScreenChoice } from '../../ScreenDisplay';
import { CView } from '../../../Engine/Display/ContentView';
import { InGameMenus } from './InGameMenus';

export function inventoryMenu(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.None);

    MainScreen.hideTopButtons();
    CView.clear();
    CView.text("<b><u>Equipment:</u></b>\n");
    CView.text("<b>Weapon</b>: " + player.inventory.equipment.weapon.displayName + " (Attack - " + player.inventory.equipment.weapon.attack + ")\n");
    CView.text("<b>Armor : </b>" + player.inventory.equipment.armor.displayName + " (Defense - " + player.inventory.equipment.armor.defense + ")\n");
    if (player.inventory.keyItems.keys().length > 0)
        CView.text("<b><u>\nKey Items:</u></b>\n");
    for (const keyItem of player.inventory.keyItems.keys())
        CView.text(keyItem + "\n");

    MainScreen.hideTopButtons();

    const choices: ScreenChoice[] = [];

    if (player.inventory.equipment.equippedWeaponSlot.isEquipped()) {
        choices[0] = ["Unequip", () => player.inventory.items.add(player, player.inventory.equipment.equippedWeaponSlot.unequip()!, inventoryMenu)];
    }

    CView.text("\nWhich item will you use?");
    choices[4] = ["Back", CombatManager.inCombat ? InGameMenus.Combat : InGameMenus.Player];
    // Removes empty buttons for more inventory buttons
    while (!choices[0]) {
        choices.shift();
    }
    return displayCharInventory(player, choices);
}
