import { displayCharInventory } from './InventoryDisplay';
import DisplaySprite from '../../../Engine/Display/DisplaySprite';
import DisplayText from '../../../Engine/display/DisplayText';
import { ClickFunction } from '../../../Engine/Display/Elements/ButtonElement';
import SpriteName from '../../../Engine/Display/Images/SpriteName';
import MainScreen from '../../../Engine/Display/MainScreen';
import Character from '../../Character/Character';
import WeaponName from '../../Items/Weapons/WeaponName';
import Menus from '../Menus';

export default function display(player: Character) {
    DisplaySprite(SpriteName.None);

    MainScreen.hideTopButtons();
    DisplayText().clear();
    DisplayText("<b><u>Equipment:</u></b>\n");
    DisplayText("<b>Weapon</b>: " + player.inventory.equipment.weapon.displayname + " (Attack - " + player.inventory.equipment.weapon.attack + ")\n");
    DisplayText("<b>Armor : </b>" + player.inventory.equipment.armor.displayName + " (Defense - " + player.inventory.equipment.armor.defense + ")\n");
    if (player.inventory.keyItems.keys().length > 0)
        DisplayText("<b><u>\nKey Items:</u></b>\n");
    for (const keyItem of player.inventory.keyItems.keys())
        DisplayText(keyItem + "\n");

    MainScreen.hideTopButtons();

    const fixedTextList: string[] = [];
    const fixedFuncList: ClickFunction[] = [];

    if (player.inventory.equipment.weapon.name !== WeaponName.Fists) {
        fixedTextList[0] = "Unequip";
        fixedFuncList[0] = player.inventory.equipment.weapon.unequip;
    }

    // if (!Game.inCombat && !Game.inDungeon && !Game.inRoomedDungeon) {
    //     if (Scenes.nieveHoliday() && Flags.list[FlagEnum.NIEVE_STAGE] > 0 && Flags.list[FlagEnum.NIEVE_STAGE] < 5) {
    //         if (Flags.list[FlagEnum.NIEVE_STAGE] === 1)
    //             DisplayText("\nThere's some odd snow here that you could do something with...\n");
    //         else DisplayText("\nYou have a snow" + Scenes.nieveMF("man", "woman") + " here that seems like it could use a little something...\n");
    //         fixedTextList[1] = "Snow";
    //         fixedFuncList[1] = Scenes.nieveBuilding;
    //     }
    //     if (Flags.list[FlagEnum.FUCK_FLOWER_KILLED] === 0 && Flags.list[FlagEnum.FUCK_FLOWER_LEVEL] >= 1) {
    //         if (Flags.list[FlagEnum.FUCK_FLOWER_LEVEL] === 4) DisplayText("\nHolli is in her tree at the edges of your camp.  You could go visit her if you want.\n");
    //         fixedTextList[2] = Flags.list[FlagEnum.FUCK_FLOWER_LEVEL] >= 3 ? "Tree" : "Plant";
    //         fixedFuncList[2] = Scenes.holliScene.treeMenu;
    //     }
    //     if (player.inventory.keyItems.has("Dragon Egg")) {
    //         Scenes.emberScene.emberCampDesc();
    //         fixedTextList[3] = "Egg";
    //         fixedFuncList[3] = Scenes.emberScene.emberEggInteraction;
    //     }
    // }
    /*if (!foundItem) {
        DisplayText("\nYou have no usable items.");
        MainScreen.doNext(Menus.Player.display);
    }*/
    // if (Game.inCombat && player.statusAffects.has(StatusAffectType.Sealed) && player.statusAffects.get(StatusAffectType.Sealed).value1 === 3) {
    //     DisplayText("\nYou reach for your items, but you just can't get your pouches open.  <b>Your ability to use items was sealed, and now you've wasted a chance to attack!</b>\n\n");
    // }

    DisplayText("\nWhich item will you use?");
    fixedTextList[4] = "Back";
    fixedFuncList[4] = /*Game.inCombat ? Menus.Combat.display :*/ Menus.Player;
    // Removes empty buttons for more inventory buttons
    while (fixedTextList[0] === undefined) {
        fixedTextList.shift();
        fixedFuncList.shift();
    }
    displayCharInventory(player, fixedTextList, fixedFuncList);
}
