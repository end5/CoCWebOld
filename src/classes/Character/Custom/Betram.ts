import BreastRow from '../../Body/BreastRow';
import Cock, { CockType } from '../../Body/Cock';
import { EarType } from '../../Body/Ears';
import Tail, { TailType } from '../../Body/Tail';
import Vagina, { VaginaWetness } from '../../Body/Vagina';
import DisplayText from '../../display/DisplayText';
import Player from '../../Player/Player';

export default function customBetram(player: Player): void {
    // Character Creation
    // herm, canine cock - 8", virgin, tight, wet
    // fox ears, tails, A cup breasts with normal nipples	Betram
    player.torso.neck.head.ears.type = EarType.FOX;
    player.torso.tails.add(new Tail(TailType.FOX));
    if (player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 1) player.torso.chest.get(0).rating = 1;
    if (player.torso.cocks.count <= 0) {
        player.torso.cocks.add(new Cock());
        player.torso.cocks.get(0).type = CockType.DOG;
        player.torso.cocks.get(0).length = 8;
        player.torso.cocks.get(0).thickness = 1;
        player.torso.cocks.get(0).knotMultiplier = 1.4;
    }
    if (player.torso.vaginas.count <= 0) {
        player.torso.vaginas.add(new Vagina());
        player.torso.vaginas.get(0).wetness = VaginaWetness.WET;
        player.torso.clit.length = 0.25;
    }
    player.gender = 3;
    DisplayText("You're quite the foxy herm, and as different as you were compared to the rest of Ingnam, it's no suprise you were sent through first.");
}
