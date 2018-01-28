import BreastRow from '../../Body/BreastRow';
import { EarType } from '../../Body/Ears';
import Tail, { TailType } from '../../Body/Tail';
import Vagina from '../../Body/Vagina';
import DisplayText from '../../display/DisplayText';
import Player from '../../Player/Player';

export default function customKatti(player: Player): void {
    DisplayText("You have big breasts with big, fuckable nipples on them, and no matter what, your vagina always seems to be there to keep you company.");
    // Gender: Female
    if (player.torso.vaginas.count <= 0) {
        player.torso.vaginas.add(new Vagina());
        player.updateGender();
    }
    // "Ears: Bunny
    player.torso.neck.head.ears.type = EarType.BUNNY;
    // Tail: Bunny
    player.torso.tails.add(new Tail(TailType.BUNNY));
    // Face: Human
    // Breasts: H-cup with 4.5 inch fuckable nipples"
    player.torso.chest.get(0).rating = 19;
    player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].nipples.length = 4.5;
    player.torso.chest.get(0).nipples.fuckable = true;
}
