﻿import { DisplayText } from '../../../../Engine/display/DisplayText';
import { Character } from '../../../Character/Character';
import { StatusAffectType } from '../../../Effects/StatusAffectType';
import { Scenes } from '../../Scenes';
import { NextScreenChoices } from '../../../ScreenDisplay';
import { ItemType } from '../../../Items/ItemType';
import { WeaponName } from '../../../Items/Weapons/WeaponName';

export function findSwordInStone(player: Character): NextScreenChoices {
    if (!player.statusAffects.has(StatusAffectType.FactoryOverload)) {
        // Encounter it!
        DisplayText().clear();
        DisplayText("While walking along the lake, the glint of metal catches your eye.  You drop into a combat stance, readying your " + player.inventory.equipment.weapon.displayname + " for another fight.   Your eyes dart about, searching for the source of the light. You feel rather foolish when you locate the source of the reflection.  It came from a sword lodged hilt-deep in the trunk of a tree.  You relax a bit, approaching the odd sight to get a better look.\n\n");

        // Describe it!
        DisplayText("The tree is thick enough to encapsulate the entire blade.  Nothing protrudes from the far side at all.  In another odd twist, there is not any sap leaking around the undamaged bark that surrounds the sword.  The hilt itself appears made of bronze, with gold inlays along the outside of the handguard.  Looking closer, you realize they portray a stylized figure battling a horde of demons.  The handle is wrapped tightly with rugged leather that still looks brand new in spite of how long this sword must have been here for the tree to grow so thoroughly around it.\n\n");

        DisplayText("You suppose you could try to pull it free, do you?");
        return { yes: tryToTakeSwordInStone, no: Scenes.camp.returnToCampUseOneHour };
    }
    else {
        DisplayText().clear();
        DisplayText("While walking along the lake, a massive tree catches your eye.  You carefully circle some bushes, wary of an ambush as you get closer.   As you close the distance, it becomes clear the tree is terribly corrupt.  It weeps black sap from gnashing mouths and clenching distorting twats.  The very center of the tree has a massive knot, as if it had sustained a massive injury there.  You decide to avoid it, given the hungry-looking nature of its mouths, but before you depart you spot the pieces of a broken sword scattered around the trunk, completely covered in rust.");

        player.statusAffects.add(StatusAffectType.BSwordBroken, 0, 0, 0, 0);
        return { next: Scenes.camp.returnToCampUseOneHour };
    }
}

function tryToTakeSwordInStone(player: Character) {
    DisplayText().clear();
    // if corrupted...
    if (player.stats.cor >= 25) {
        DisplayText("You grip the handle with both hands and ");

        if (player.stats.str > 70) DisplayText("pull mightily, making the tree strain and groan from the force, ");
        if (player.stats.str <= 70 && player.stats.str >= 40) DisplayText("pull hard, feeling your muscles tighten from the strain, ");
        if (player.stats.str < 40) DisplayText("pull as hard as you can, ");

        DisplayText("but the sword remains stubbornly lodged in its arboreal home.  Frustrated, you give up and resolve to try later.");

        return { next: Scenes.camp.returnToCampUseOneHour };
    }
    // If not corrupted...
    else {
        DisplayText("You grip the handle with both hands and ");

        if (player.stats.str > 70) DisplayText("pull so hard you fall on your ass when the sword slips free.  The tip buries itself a few inches from your head.  You count yourself lucky and stand up.  ");
        if (player.stats.str <= 70 && player.stats.str >= 40) DisplayText("give a mighty pull and nearly fall over as the sword easily slides free from the tree.  ");
        if (player.stats.str < 40) DisplayText("easily pull the sword free, surprising yourself with how easy it was to remove.  ");

        DisplayText("Remarkably the tree's trunk is entirely intact.  While marveling at this new development, a leaf brushes your shoulder.  You look up and watch as every single leaf turns from healthy green, to brilliant orange, and finally changes to brown.  The leaves rain down around you, covering the ground in dead plant-matter, leaving you alone with the withering skeleton of a dead tree.  The sight saddens you, though you cannot fathom why.\n\n");

        DisplayText("The blade itself is three and a half feet of the purest, shining steel you have ever seen.  It truly is a beautiful blade.\n\n");
        player.stats.lib += -(player.stats.lib / 3);
        player.stats.lust += -15;
        player.statusAffects.add(StatusAffectType.TookBlessedSword, 0, 0, 0, 0);
        return player.inventory.items.createAdd(player, ItemType.Weapon, WeaponName.BeautifulSword, Scenes.camp.returnToCampUseOneHour);
    }
}
