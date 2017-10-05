import MainScreen from "./MainScreen";
import Game from "../Game/Game";
import Flags, { FlagEnum } from "../Game/Flags";
import Player from "../Player";
import Inventory from "../Inventory/Inventory";
import Item from "../Items/Item";
import PlayerMenu from "./PlayerMenu";
import CombatMenu from "./CombatMenu";
import InventoryDisplay from "./InventoryDisplay";

export default class PlayerInventoryMenu {
    public static display(player: Player) {
        let inventory: Inventory<Item> = player.inventory.items;
        let foundItem: Boolean = false;

        spriteSelect(-1);

        MainScreen.hideTopButtons();
        MainScreen.clearText();
        MainScreen.text("<b><u>Equipment:</u></b>\n");
        MainScreen.text("<b>Weapon</b>: " + player.inventory.weapon.displayname + " (Attack - " + player.inventory.weapon.attack + ")\n");
        MainScreen.text("<b>Armor : </b>" + player.inventory.armor.displayName + " (Defense - " + player.inventory.armor.defense + ")\n");
        if (player.keyItems.length > 0)
            MainScreen.text("<b><u>\nKey Items:</u></b>\n");
        for (let index = 0; index < player.keyItems.length; index++)
            MainScreen.text(player.keyItems[index].objectKey + "\n");

        MainScreen.hideTopButtons();
        InventoryDisplay.displayPlayersInventory(player);

        if (player.inventory.weapon != Game.libraries.weapons.get("Fists")) {
            MainScreen.addButton(5, "Unequip", InventoryDisplay.unequipFunction(player));
        }

        if (!Game.inCombat && inDungeon == false && inRoomedDungeon == false) {
            if (Game.sceneManager.nieveHoliday() && Flags.list[FlagEnum.NIEVE_STAGE] > 0 && Flags.list[FlagEnum.NIEVE_STAGE] < 5) {
                if (Flags.list[FlagEnum.NIEVE_STAGE] == 1)
                    MainScreen.text("\nThere's some odd snow here that you could do something with...\n");
                else MainScreen.text("\nYou have a snow" + Game.sceneManager.nieveMF("man", "woman") + " here that seems like it could use a little something...\n");
                MainScreen.addButton(6, "Snow", Game.sceneManager.nieveBuilding);
                foundItem = true;
            }
            if (Flags.list[FlagEnum.FUCK_FLOWER_KILLED] == 0 && Flags.list[FlagEnum.FUCK_FLOWER_LEVEL] >= 1) {
                if (Flags.list[FlagEnum.FUCK_FLOWER_LEVEL] == 4) MainScreen.text("\nHolli is in her tree at the edges of your camp.  You could go visit her if you want.\n");
                MainScreen.addButton(7, (Flags.list[FlagEnum.FUCK_FLOWER_LEVEL] >= 3 ? "Tree" : "Plant"), Game.sceneManager.holliScene.treeMenu);
                foundItem = true;
            }
            if (player.hasKeyItem("Dragon Egg")) {
               Game.sceneManager.emberScene.emberCampDesc();
               MainScreen.addButton(8, "Egg", Game.sceneManager.emberScene.emberEggInteraction);
                foundItem = true;
            }
        }
        if (!foundItem) {
            MainScreen.text("\nYou have no usable items.");
            MainScreen.doNext(PlayerMenu.display);
            return;
        }
        if (Game.inCombat && player.statusAffects.has("Sealed") && player.statusAffects.get("Sealed").value1 == 3) {
            MainScreen.text("\nYou reach for your items, but you just can't get your pouches open.  <b>Your ability to use items was sealed, and now you've wasted a chance to attack!</b>\n\n");
            Game.enemyAI();
            return;
        }

        MainScreen.text("\nWhich item will you use?");

        if (!InventoryDisplay.isHoldingItem()) {
            if (Game.inCombat)
                MainScreen.addBackButton("Back", CombatMenu.display);
            else
                MainScreen.addBackButton("Back", PlayerMenu.display);
        }
    }
}