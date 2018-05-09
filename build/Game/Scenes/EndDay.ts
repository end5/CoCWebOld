import { DisplayText } from '../../Engine/display/DisplayText';
import { BreastRow } from '../Body/BreastRow';
import { Desc } from '../Descriptors/Descriptors';
import { WeaponName } from '../Items/Weapons/WeaponName';
import { WeaponPerkType } from '../Items/Weapons/WeaponPerk';
import { Menus } from '../Menus/Menus';
import { NextScreenChoices } from '../SceneDisplay';
import { User } from '../User';
import { Time } from '../Utilities/Time';

// Argument is time passed.  Pass to event parser if nothing happens.
// The time argument is never actually used atm, everything is done with timeQ instead...
export function goNext(time: number, needNext: boolean): NextScreenChoices {
    while (time > 0) {
        time--;
        Time.hour++;
        // regeneration(false);
        // Inform all time aware classes that a new hour has arrived
        if (Time.hour > 23) {
            Time.hour = 0;
            Time.day++;
        }
        else if (Time.hour === 21) {
            DisplayText("\nThe sky darkens as a starless night falls.  The blood-red moon slowly rises up over the horizon.\n");
            needNext = true;
        }
        else if (Time.hour === 6) {
            DisplayText("\nThe sky begins to grow brighter as the moon descends over distant mountains, casting a few last ominous shadows before they burn away in the light.\n");
            needNext = true;
        }
    }

    const player = User.char;

    // Drop axe if too short!
    if (player.tallness < 78 && player.inventory.equipment.weapon.name === WeaponName.LargeAxe) {
        DisplayText("<b>\nThis axe is too large for someone of your stature to use, though you can keep it in your inventory until you are big enough.</b>\n");
        player.inventory.items.add(player, player.inventory.equipment.weapon.unequip(), Menus.Player);
    }
    if (player.inventory.equipment.weapon.name === WeaponName.LargeHammer && player.tallness < 60) {
        DisplayText("<b>\nYou've become too short to use this hammer anymore.  You can still keep it in your inventory, but you'll need to be taller to effectively wield it.</b>\n");
        player.inventory.items.add(player, player.inventory.equipment.weapon.unequip(), Menus.Player);
    }
    if (player.inventory.equipment.weapon.name === WeaponName.LargeClaymore && player.stats.str < 40) {
        DisplayText("\n<b>You aren't strong enough to handle the weight of your weapon any longer, and you're forced to stop using it.</b>\n");
        player.inventory.items.add(player, player.inventory.equipment.weapon.unequip(), Menus.Player);
    }
    if (player.inventory.equipment.weapon.name === WeaponName.HugeWarhammer && player.stats.str < 80) {
        DisplayText("\n<b>You aren't strong enough to handle the weight of your weapon any longer!</b>\n");
        player.inventory.items.add(player, player.inventory.equipment.weapon.unequip(), Menus.Player);
    }
    // Drop beautiful sword if corrupted!
    if (player.inventory.equipment.weapon.perks.has(WeaponPerkType.HolySword) && player.stats.cor >= 35) {
        DisplayText("<b>\nThe <u>" + player.inventory.equipment.weapon.displayname + "</u> grows hot in your hand, until you are forced to drop it.  Whatever power inhabits this blade appears to be unhappy with you.  Touching it gingerly, you realize it is no longer hot, but as soon as you go to grab the hilt, it nearly burns you.\n\nYou realize you won't be able to use it right now, but you could probably keep it in your inventory.</b>\n\n");
        player.inventory.items.add(player, player.inventory.equipment.weapon.unequip(), Menus.Player);
    }
    // Unequip Lusty maiden armor
    if (player.inventory.equipment.armor.displayName === "lusty maiden's armor") {
        // Removal due to no longer fitting:
        // Grew Cock or Balls
        if (player.torso.cocks.count > 0 || player.torso.balls.quantity > 0) {
            DisplayText("\nYou fidget uncomfortably in the g-string of your lewd bikini - there simply isn't enough room for your ");
            if (player.torso.cocks.count > 0) DisplayText("maleness");
            else DisplayText("bulgy balls");
            DisplayText(" within the imprisoning leather, and it actually hurts to wear it.  <b>You'll have to find some other form of protection!</b>\n\n");
            player.inventory.items.add(player, player.inventory.equipment.armor.unequip(), Menus.Player);
        }
        // Lost pussy
        else if (player.torso.vaginas.count <= 0) {
            DisplayText("\nYou fidget uncomfortably as the crease in the gusset of your lewd bikini digs into your sensitive, featureless loins.  There's simply no way you can continue to wear this outfit in comfort - it was expressly designed to press in on the female mons, and without a vagina, <b>you simply can't wear this exotic armor.</b>\n\n");
            player.inventory.items.add(player, player.inventory.equipment.armor.unequip(), Menus.Player);
        }
        // Tits gone or too small
        else if (player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating < 4) {
            DisplayText("\nThe fine chain that makes up your lewd bikini-top is dangling slack against your flattened chest.  Every movement and step sends it jangling noisily, slapping up against your [nipples], uncomfortably cold after being separated from your " + Desc.Skin.skinFurScales(player) + " for so long.  <b>There's no two ways about it - you'll need to find something else to wear.</b>\n\n");
            player.inventory.items.add(player, player.inventory.equipment.armor.unequip(), Menus.Player);
        }
    }
    if (needNext) {
        return { next: Menus.Player };
    }
    return Menus.Player(player);
}
