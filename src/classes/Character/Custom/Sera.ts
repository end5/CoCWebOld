import BreastRow from '../../Body/BreastRow';
import Cock from '../../Body/Cock';
import { EarType } from '../../Body/Ears';
import { WingType } from '../../Body/Wings';
import DisplayText from '../../display/DisplayText';
import PerkFactory from '../../Effects/PerkFactory';
import { PerkType } from '../../Effects/PerkType';
import Player from '../../Player/Player';
export default function customSera(player: Player): void {
    DisplayText("You're something of a shemale - three rows of C-cup breasts matched with three, plump, juicy cocks.  Some decent sized balls, bat wings, and cat-like ears round out the package.");
    player.gender = 1;
    player.stats.tou += 2;
    player.stats.str += 3;
    player.fertility = 5;
    player.torso.neck.head.hair.length = 26;
    player.torso.neck.head.hair.color = "white";
    player.skin.tone = "light";
    player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].nipples.length = 0.2;
    player.torso.chest.add(new BreastRow());
    player.torso.chest.add(new BreastRow());
    player.torso.chest.add(new BreastRow());
    player.torso.chest.get(0).rating = 3;
    player.torso.chest.get(1).rating = 3;
    player.torso.chest.get(2).rating = 3;
    player.torso.cocks.add(new Cock());
    player.torso.cocks.add(new Cock());
    player.torso.cocks.add(new Cock());
    player.torso.cocks.get(0).length = 8;
    player.torso.cocks.get(0).thickness = 1.6;
    player.torso.cocks.get(1).length = 8;
    player.torso.cocks.get(1).thickness = 1.6;
    player.torso.cocks.get(2).length = 8;
    player.torso.cocks.get(2).thickness = 1.6;
    player.torso.balls.quantity = 2;
    player.torso.balls.size = 3;
    player.tallness = 113;
    player.tone = 50;
    player.thickness = 50;
    player.femininity = 50;
    player.torso.hips.rating = 5;
    player.torso.butt.rating = 5;
    player.teaseLevel = 1;
    // Build: average
    // Complexion: light
    // 9 foot 5 inches tall
    // Hair: very long white
    // Gift: Lotz of Jizz
    // History: Schooling
    player.cumMultiplier = 5.5;

    player.perks.set(PerkType.MessyOrgasms, PerkFactory.create(PerkType.MessyOrgasms, 1.25, 0, 0, 0));
    player.perks.set(PerkType.HistoryScholar, PerkFactory.create(PerkType.HistoryScholar, 0, 0, 0, 0));
    // Apperance: Cat Ears, Large Bat Like Wings, 3 Rows of breasts (C cub, 0,2 nipples)
    player.torso.neck.head.ears.type = EarType.CAT;
    player.torso.wings.type = WingType.BAT_LIKE_LARGE;
    player.torso.wings.desc = "large, bat-like";
    // Items: Katana, Leather Armor
    player.setWeapon(weapons.KATANA);
    player.setArmor(armors.URTALTA);
    // Key Item: Deluxe Dildo
    player.createKeyItem("Deluxe Dildo", 0, 0, 0, 0);
}
