import BreastRow from '../../Body/BreastRow';
import { EarType } from '../../Body/Ears';
import Vagina from '../../Body/Vagina';
import { WingType } from '../../Body/Wings';
import DisplayText from '../../display/DisplayText';
import Player from '../../Player/Player';

export default function customSiveen(player: Player): void {
    // Female
    // Virgin
    player.gender = 2;
    player.torso.vaginas.add(new Vagina());
    player.torso.clit.length = 0.25;
    // has a self-repairing hymen in her cunt"	"Angel
    // (means feathered wings on her back)
    player.torso.wings.type = WingType.HARPY;
    // Halo (Flaming)
    // D-cups
    player.torso.chest.add(new BreastRow());
    player.torso.chest.get(0).rating = 4;
    // human skin
    // heart-shaped ass
    player.torso.butt.rating = 9;
    player.torso.hips.rating = 6;
    // Ass-length white and black hair
    player.torso.neck.head.hair.length = 30;
    player.torso.neck.head.hair.color = "white and black";
    // heterochromia (one blue eye one red eye)
    // 7"" nips
    player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].nipples.length = 7;
    // waif thin body
    player.thickness = 0;
    // Fallen Angel gear (complete with flaming sword and light arrows)
    // dark skin tone
    player.skin.tone = "dark";
    player.setWeapon(weapons.S_BLADE);

    // Elfin ears
    player.torso.neck.head.ears.type = EarType.ELFIN;
    // tight asshole
    // human tongue
    // human face
    // no tail, fur, or scales"
    Flags.list[FlagEnum.HISTORY_PERK_SELECTED] = 0;
    player.stats.str = 25;
    player.stats.tou = 25;
    player.stats.int = 25;
    player.stats.spe = 25;
    DisplayText("You are a literal angel from beyond, and you take the place of a vilage's champion for your own reasons...");
}
