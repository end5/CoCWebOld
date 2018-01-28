import BreastRow from '../../Body/BreastRow';
import { SkinType } from '../../Body/Skin';
import Vagina from '../../Body/Vagina';
import DisplayText from '../../display/DisplayText';
import Player from '../../Player/Player';

export default function customRannRayla(player: Player): void {
    // Specific Character	Virgin female.	Max femininity. Thin with a little muscle. Size C breasts. Long red hair. Light colored skin. 5'5" tall. 	Rann Rayla
    DisplayText("You're a young, fiery redhead who\'s utterly feminine.  You've got C-cup breasts and long red hair.  Being a champion can\'t be that bad, right?");
    player.torso.vaginas.add(new Vagina());
    player.torso.clit.length = 0.25;
    player.torso.chest.add(new BreastRow());
    player.torso.chest.get(0).rating = 3;
    player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].nipples.length = 0.5;
    player.torso.neck.head.hair.length = 22;
    player.torso.neck.head.hair.color = "red";
    player.skin.tone = "light";
    player.skin.desc = "skin";
    player.skin.type = SkinType.PLAIN;
    player.femininity = 100;
    player.thickness = 25;
    player.tone = 65;
    player.tallness = 65;
}
