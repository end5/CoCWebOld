import Menu from './Menu';
import Menus from './Menus';
import Character from '../../Character/Character';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Flags, { FlagEnum } from '../../Game/Flags';
import Game from '../../Game/Game';
import Inventory from '../../Inventory/Inventory';
import Item from '../../Items/Item';
import WeaponName from '../../Items/Weapons/WeaponName';
import DisplaySprite from '../DisplaySprite';
import DisplayText from '../DisplayText';
import InventoryDisplay from '../InventoryDisplay';
import MainScreen from '../MainScreen';

export default class CharacterInventoryMenu implements Menu {
    public display(player: Character) {
        const inventory: Inventory<Item> = player.inventory.items;
        let foundItem: boolean = false;

        DisplaySprite.hide();

        MainScreen.hideTopButtons();
        DisplayText().clear();
        DisplayText("<b><u>Equipment:</u></b>\n");
        DisplayText("<b>Weapon</b>: " + player.inventory.equipment.weapon.displayname + " (Attack - " + player.inventory.equipment.weapon.attack + ")\n");
        DisplayText("<b>Armor : </b>" + player.inventory.equipment.armor.displayName + " (Defense - " + player.inventory.equipment.armor.defense + ")\n");
        if (player.inventory.keyItems.keys().length > 0)
            DisplayText("<b><u>\nKey Items:</u></b>\n");
        for (const keyItem of player.inventory.keyItems.keys())
            DisplayText(keyItem.objectKey + "\n");

        MainScreen.hideTopButtons();
        InventoryDisplay.displayCharactersInventory(player);

        if (player.inventory.equipment.weapon.name !== WeaponName.Fists) {
            MainScreen.getBottomButton(5).modify("Unequip", InventoryDisplay.unequipFunction(player));
        }

        if (!Game.inCombat && !Game.inDungeon && !Game.inRoomedDungeon) {
            if (Game.scenes.nieveHoliday() && Flags.list[FlagEnum.NIEVE_STAGE] > 0 && Flags.list[FlagEnum.NIEVE_STAGE] < 5) {
                if (Flags.list[FlagEnum.NIEVE_STAGE] === 1)
                    DisplayText("\nThere's some odd snow here that you could do something with...\n");
                else DisplayText("\nYou have a snow" + Game.scenes.nieveMF("man", "woman") + " here that seems like it could use a little something...\n");
                MainScreen.getBottomButton(6).modify("Snow", Game.scenes.nieveBuilding);
                foundItem = true;
            }
            if (Flags.list[FlagEnum.FUCK_FLOWER_KILLED] === 0 && Flags.list[FlagEnum.FUCK_FLOWER_LEVEL] >= 1) {
                if (Flags.list[FlagEnum.FUCK_FLOWER_LEVEL] === 4) DisplayText("\nHolli is in her tree at the edges of your camp.  You could go visit her if you want.\n");
                MainScreen.getBottomButton(7).modify((Flags.list[FlagEnum.FUCK_FLOWER_LEVEL] >= 3 ? "Tree" : "Plant"), Game.scenes.holliScene.treeMenu);
                foundItem = true;
            }
            if (player.hasKeyItem("Dragon Egg")) {
                Game.scenes.emberScene.emberCampDesc();
                MainScreen.getBottomButton(8).modify("Egg", Game.scenes.emberScene.emberEggInteraction);
                foundItem = true;
            }
        }
        if (!foundItem) {
            DisplayText("\nYou have no usable items.");
            MainScreen.doNext(Menus.Character.display);
            return;
        }
        if (Game.inCombat && player.statusAffects.has(StatusAffectType.Sealed) && player.statusAffects.get(StatusAffectType.Sealed).value1 === 3) {
            DisplayText("\nYou reach for your items, but you just can't get your pouches open.  <b>Your ability to use items was sealed, and now you've wasted a chance to attack!</b>\n\n");
            Game.enemyAI();
            return;
        }

        DisplayText("\nWhich item will you use?");

        if (!InventoryDisplay.isHoldingItem()) {
            if (Game.inCombat)
                MainScreen.addBackButton("Back", Menus.Combat.display);
            else
                MainScreen.addBackButton("Back", Menus.Character.display);
        }
    }
}
