import Cock, { CockType } from '../../Body/Cock';
import Vagina from '../../Body/Vagina';
import DisplayText from '../../display/DisplayText';
import Player from '../../Player/Player';

export default function customHikari(player: Player): void {
    // Character Creation	If possible I would like a herm with a cat cock that is 10 inches by 4 inches. Anything else is up to you.	I would like a herm catmorph with two large d breasts and shoulder length hair. Also if possible I would like to start with some gel armor. Everything else is fair game.	Hikari
    DisplayText("As a herm with a super-thick cat-cock, D-cup breasts, and out-of-this-world armor, you're a natural pick for champion.");
    if (player.torso.cocks.count <= 0) player.torso.cocks.add(new Cock());
    player.torso.cocks.get(0).type = CockType.CAT;
    player.torso.cocks.get(0).length = 10;
    player.torso.cocks.get(0).thickness = 4;
    if (player.torso.vaginas.count <= 0) player.torso.vaginas.add(new Vagina());
    player.torso.chest.get(0).rating = 4;
    player.torso.neck.head.hair.length = 10;
    player.setArmor(armors.GELARMR);
    player.gender = 3;
}
