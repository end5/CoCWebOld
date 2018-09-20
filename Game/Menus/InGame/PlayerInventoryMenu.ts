import { displayCharInventory } from './InventoryDisplay';
import { DisplaySprite } from '../../../Engine/Display/DisplaySprite';
import { DisplayText } from '../../../Engine/display/DisplayText';
import { SpriteName } from '../../../Engine/Display/Images/SpriteName';
import { MainScreen } from '../../../Engine/Display/MainScreen';
import { Character } from '../../Character/Character';
import { CombatManager } from '../../Combat/CombatManager';
import { StatusEffectType } from '../../Effects/StatusEffectType';
import { WeaponName } from '../../Items/Weapons/WeaponName';
import { NextScreenChoices, ScreenChoice } from '../../ScreenDisplay';
import { combatMenu } from './PlayerCombatMenu';
import { campMenu } from './PlayerMenu';

export function inventoryMenu(player: Character): NextScreenChoices {
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

    const choices: ScreenChoice[] = [];

    if (player.inventory.equipment.weapon.name !== WeaponName.Fists) {
        choices[0] = ["Unequip", () => player.inventory.items.add(player, player.inventory.equipment.weapon.unequip(), inventoryMenu)];
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
        return { next: Player.display };
    }*/
    if (CombatManager.inCombat && player.effects.has(StatusEffectType.Sealed) && player.effects.get(StatusEffectType.Sealed).value1 === 3) {
        DisplayText("\nYou reach for your items, but you just can't get your pouches open.  <b>Your ability to use items was sealed, and now you've wasted a chance to attack!</b>\n\n");
    }

    DisplayText("\nWhich item will you use?");
    choices[4] = ["Back", CombatManager.inCombat ? combatMenu : campMenu];
    // Removes empty buttons for more inventory buttons
    while (!choices[0]) {
        choices.shift();
    }
    return displayCharInventory(player, choices);
}
