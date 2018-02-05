import BreastRow from '../../Body/BreastRow';
import { EarType } from '../../Body/Ears';
import { LegType } from '../../Body/Legs';
import Tail, { TailType } from '../../Body/Tail';
import { TongueType } from '../../Body/Tongue';
import Vagina, { VaginaLooseness, VaginaWetness } from '../../Body/Vagina';
import DisplayText from '../../display/DisplayText';
import PerkFactory from '../../Effects/PerkFactory';
import { PerkType } from '../../Effects/PerkType';
import Player from '../../Player/Player';

export default function customTyriana(player: Player): void {
    DisplayText("Your many, posh tits, incredible fertility, and well-used cunt made you more popular than the village bicycle.  With your cat-like ears, paws, and tail, you certainly had a feline appeal.  It's time to see how you fare in the next chapter of your life.");
    // "Gender: Female
    player.gender = 2;
    // Vagina: Ridiculously loose, 3 inch clitoris, dripping constantly, fertile like a bunny on steroids and non-virgin
    player.torso.vaginas.add(new Vagina());
    player.torso.clit.length = 3;
    player.torso.vaginas.get(0).wetness = VaginaWetness.DROOLING;
    player.torso.vaginas.get(0).looseness = VaginaLooseness.LEVEL_CLOWN_CAR;
    player.torso.vaginas.get(0).virgin = false;
    player.fertility = 50;
    // Butt: Just as loose
    player.torso.butt.looseness = 5;
    // "Skin: Tanned
    player.skin.tone = "tan";
    // Hair: Ridiculously long red
    player.torso.neck.head.hair.length = 80;
    player.torso.neck.head.hair.color = "red";
    // Face: Gorgeous Feminine, long demonic tongue, cat ears
    player.femininity = 100;
    player.torso.neck.head.face.tongue.type = TongueType.DEMONIC;
    player.torso.neck.head.ears.type = EarType.CAT;
    // Body: Very muscular, average weight, plump ass, above average thighs, cat tail and cat paws
    player.tone = 80;
    player.thickness = 50;
    player.torso.butt.rating = 12;
    player.torso.hips.rating = 10;
    player.torso.tails.add(new Tail(TailType.CAT));
    player.torso.hips.legs.type = LegType.CAT;
    // Breasts: 2 E-cups on top, 2 DD-cups mid, 2 D-cups bottom, 3.5 inch nipples
    player.torso.chest.add(new BreastRow());
    player.torso.chest.add(new BreastRow());
    player.torso.chest.add(new BreastRow());
    player.tallness = 67;
    player.torso.chest.get(0).rating = 7;
    player.torso.chest.get(1).rating = 5;
    player.torso.chest.get(2).rating = 4;
    player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].nipples.length = 3.5;
    // Perks: Slut and Fertile"

    player.stats.spe += 3;
    player.stats.int += 2;

    player.perks.add(PerkType.HistorySlut, 0, 0, 0, 0);
    player.perks.add(PerkType.Fertile, 1.5, 0, 0, 0);
    player.teaseLevel = 3;
}
