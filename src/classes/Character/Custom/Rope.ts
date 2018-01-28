import { FaceType } from '../../Body/Face';
import DisplayText from '../../display/DisplayText';
import Player from '../../Player/Player';

export default function customRope(player: Player): void {
    // 529315025394020	Character Creation	Neuter (no genitals) "50-50 masculine-feminine ratio. Shark teeth."	Rope
    DisplayText("Despite outward appearances, you're actually something of a neuter, with shark-like teeth, an androgynous face, and a complete lack of genitalia.");
    if (player.torso.cocks.count > 0) player.torso.cocks.clear();
    if (player.torso.vaginas.count > 0) player.torso.vaginas.clear();
    player.gender = 0;
    player.femininity = 50;
    player.torso.neck.head.face.type = FaceType.SHARK_TEETH;
}
