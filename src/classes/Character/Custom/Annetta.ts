import BreastRow from '../../Body/BreastRow';
import Cock from '../../Body/Cock';
import { EarType } from '../../Body/Ears';
import { HornType } from '../../Body/Horns';
import { LegType } from '../../Body/Legs';
import Tail, { TailType } from '../../Body/Tail';
import Vagina from '../../Body/Vagina';
import DisplayText from '../../display/DisplayText';
import PerkFactory from '../../Effects/PerkFactory';
import { PerkType } from '../../Effects/PerkType';
import Player from '../../Player/Player';

export default function Annetta(player: Player) {
    DisplayText("You're a rather well-endowed hermaphrodite that sports a thick, dog-knotted cock, an unused pussy, and a nice, stretchy butt-hole.  You've also got horns and demonic high-heels on your feet.  It makes you wonder why you would ever get chosen to be champion!");
    // Specific Character	"Gender: Herm
    // Penis: 13 inch long 3 inch wide penis, dog shaped, 6.5 inch knot
    // Balls: Four 5 inch wide
    // Vagina: Tight, virgin, 0.5 inch clitoris
    player.torso.vaginas.add(new Vagina());
    player.torso.cocks.add(new Cock());
    player.torso.chest.add(new BreastRow());
    player.torso.clit.length = 0.5;
    player.tallness = 67;
    player.femininity = 90;
    player.torso.balls.quantity = 2;
    player.torso.balls.size = 5;
    player.torso.cocks.get(0).length = 13;
    player.torso.cocks.get(0).thickness = 3;
    player.torso.cocks.get(0).knotMultiplier = 2.2;
    // Butt: Loose"	"Skin: Purple
    player.torso.butt.looseness = 3;
    player.skin.tone = "purple";
    // Hair: Back length orange
    player.torso.neck.head.hair.length = 30;
    player.torso.neck.head.hair.color = "orange";
    // Face: Elf ears, 4x demonic horns
    player.torso.neck.head.ears.type = EarType.ELFIN;
    player.torso.neck.head.horns.amount = 4;
    player.torso.neck.head.horns.type = HornType.DEMON;
    // Body: Plump, no muscle tone, wide thighs, badonkulous ass, demon tail, demonic high heels
    player.thickness = 75;
    player.tone = 0;
    player.torso.hips.rating = 17;
    player.torso.butt.rating = 17;
    player.torso.tails.add(new Tail(TailType.DEMONIC));
    player.torso.hips.legs.type = LegType.DEMONIC_HIGH_HEELS;
    // Breasts: J-cups with 5 inch fuckable nipples, leaking milk
    player.torso.chest.get(0).rating = 28;
    player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].nipples.length = 5;
    player.torso.chest.get(0).lactationMultiplier += 20;

    // Equipment: Starts with spiked fist
    player.setWeapon(weapons.S_GAUNT);
    // Perks: Fighter and Lotsa Jizz"	Annetta
    player.perks.set(PerkType.HistoryFighter, PerkFactory.create(PerkType.HistoryFighter, 0, 0, 0, 0));
    player.perks.set(PerkType.MessyOrgasms, PerkFactory.create(PerkType.MessyOrgasms, 1.25, 0, 0, 0));
    player.cumMultiplier = 20;
    player.gender = 3;
}
