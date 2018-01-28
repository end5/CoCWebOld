import Vagina from '../../Body/Vagina';
import DisplayText from '../../display/DisplayText';
import PerkFactory from '../../Effects/PerkFactory';
import { PerkType } from '../../Effects/PerkType';
import StatusAffectFactory from '../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Player from '../../Player/Player';
export default function customGalatea(player: Player): void {
    // "(Dangit Fenoxo!  Stop adding sexy must-have things to the game!  If it's not too late to update it I've added in that sexy new armor.  Thanks!)
    // Other:
    if (player.torso.vaginas.count <= 0) {
        player.torso.vaginas.add(new Vagina());
        if (player.torso.clit.length === 0) player.torso.clit.length = 0.25;
    }
    player.updateGender();
    // Hair length: Very long
    player.torso.neck.head.hair.length = 22;
    // Breast size: HH
    player.torso.chest.get(0).rating = 21;
    // Femininity/Beauty: Very high
    player.femininity = 90;
    // Height: 5'4
    player.tallness = 64;

    // Perks: Feeder, Strong Back, Strong Back 2
    player.statusAffects.set(StatusAffectType.Feeder, StatusAffectFactory.create(StatusAffectType.Feeder, 0, 0, 0, 0)); )
    player.perks.set(PerkType.Feeder, PerkFactory.create(PerkType.Feeder, 0, 0, 0, 0));

    player.perks.set(PerkType.StrongBack, PerkFactory.create(PerkType.StrongBack, 0, 0, 0, 0));
    player.perks.set(PerkType.StrongBack2, PerkFactory.create(PerkType.StrongBack2, 0, 0, 0, 0));

    // Equipment:
    // Weapon: Warhammer
    player.setWeapon(weapons.WARHAMR);
    // Armor: Lusty shit
    player.setArmor(armors.LMARMOR);
    // player.perks.set(PerkType.SluttySeduction, PerkFactory.create(PerkType.SluttySeduction, 10 + Flags.list[FlagEnum.BIKINI_ARMOR_BONUS], 0, 0, 0));

    // Stats: (if possible)
    // Strength: 90
    player.stats.str = 90;
    // Fertility: 100
    player.fertility = 100;
    player.stats.cor = 25;
    // Inventory: Lactaid, GroPlus, BimboLq
    player.inventory.items.get(0).item = consumables.LACTAID;
    player.inventory.items.get(0).quantity = 5;
    player.inventory.items.get(1).item = consumables.GROPLUS;
    player.inventory.items.get(1).quantity = 5;
    player.inventory.items.get(2).item = consumables.BIMBOLQ;
    player.inventory.items.get(2).quantity = 1;
    player.inventory.items.unlock();
    player.inventory.items.unlock();
    player.inventory.items.get(3).item = consumables.BIMBOSK;
    player.inventory.items.get(3).quantity = 1;
    DisplayText("You've got large breasts prone to lactation.  You aren't sure WHY you got chosen as a champion, but with your considerable strength, you're sure you'll do a good job protecting Ingnam.");
}
