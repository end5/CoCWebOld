import Menu from './Menu';
import Menus from './Menus';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Flags, { FlagEnum } from '../../Game/Flags';
import Game from '../../Game/Game';
import Inventory from '../../Inventory/Inventory';
import Item from '../../Items/Item';
import Player from '../../Player/Player';
import DisplayText from '../DisplayText';
import InventoryDisplay from '../InventoryDisplay';
import MainScreen from '../MainScreen';

export default class PlayerInventoryMenu implements Menu {
    public display(player: Player) {
        let inventory: Inventory<Item> = player.inventory.items;
        let foundItem: Boolean = false;

        spriteSelect(-1);

        MainScreen.hideTopButtons();
        DisplayText.clear();
        DisplayText.text("<b><u>Equipment:</u></b>\n");
        DisplayText.text("<b>Weapon</b>: " + player.inventory.weaponSlot.equipment.displayname + " (Attack - " + player.inventory.weaponSlot.equipment.attack + ")\n");
        DisplayText.text("<b>Armor : </b>" + player.inventory.armorSlot.equipment.displayName + " (Defense - " + player.inventory.armorSlot.equipment.defense + ")\n");
        if (player.keyItems.length > 0)
            DisplayText.text("<b><u>\nKey Items:</u></b>\n");
        for (let index = 0; index < player.keyItems.length; index++)
            DisplayText.text(player.keyItems[index].objectKey + "\n");

        MainScreen.hideTopButtons();
        InventoryDisplay.displayPlayersInventory(player);

        if (player.inventory.weaponSlot.equipment != Game.libraries.weapons.get("Fists")) {
            MainScreen.getBottomButton(5).modify("Unequip", InventoryDisplay.unequipFunction(player));
        }

        if (!Game.inCombat && !Game.inDungeon && !Game.inRoomedDungeon) {
            if (Game.sceneManager.nieveHoliday() && Flags.list[FlagEnum.NIEVE_STAGE] > 0 && Flags.list[FlagEnum.NIEVE_STAGE] < 5) {
                if (Flags.list[FlagEnum.NIEVE_STAGE] == 1)
                    DisplayText.text("\nThere's some odd snow here that you could do something with...\n");
                else DisplayText.text("\nYou have a snow" + Game.sceneManager.nieveMF("man", "woman") + " here that seems like it could use a little something...\n");
                MainScreen.getBottomButton(6).modify("Snow", Game.sceneManager.nieveBuilding);
                foundItem = true;
            }
            if (Flags.list[FlagEnum.FUCK_FLOWER_KILLED] == 0 && Flags.list[FlagEnum.FUCK_FLOWER_LEVEL] >= 1) {
                if (Flags.list[FlagEnum.FUCK_FLOWER_LEVEL] == 4) DisplayText.text("\nHolli is in her tree at the edges of your camp.  You could go visit her if you want.\n");
                MainScreen.getBottomButton(7).modify((Flags.list[FlagEnum.FUCK_FLOWER_LEVEL] >= 3 ? "Tree" : "Plant"), Game.sceneManager.holliScene.treeMenu);
                foundItem = true;
            }
            if (player.hasKeyItem("Dragon Egg")) {
                Game.sceneManager.emberScene.emberCampDesc();
                MainScreen.getBottomButton(8).modify("Egg", Game.sceneManager.emberScene.emberEggInteraction);
                foundItem = true;
            }
        }
        if (!foundItem) {
            DisplayText.text("\nYou have no usable items.");
            MainScreen.doNext(Menus.Player.display);
            return;
        }
        if (Game.inCombat && player.statusAffects.has(StatusAffectType.Sealed) && player.statusAffects.get(StatusAffectType.Sealed).value1 == 3) {
            DisplayText.text("\nYou reach for your items, but you just can't get your pouches open.  <b>Your ability to use items was sealed, and now you've wasted a chance to attack!</b>\n\n");
            Game.enemyAI();
            return;
        }

        DisplayText.text("\nWhich item will you use?");

        if (!InventoryDisplay.isHoldingItem()) {
            if (Game.inCombat)
                MainScreen.addBackButton("Back", Menus.Combat.display);
            else
                MainScreen.addBackButton("Back", Menus.Player.display);
        }
    }
}