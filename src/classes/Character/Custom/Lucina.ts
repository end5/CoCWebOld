import { EarType } from '../../Body/Ears';
import Vagina, { VaginaLooseness, VaginaWetness } from '../../Body/Vagina';
import DisplayText from '../../display/DisplayText';
import StatusAffectFactory from '../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Player from '../../Player/Player';

export default function customLucina(player: Player): void {
    // 428347355782040	Character Creation	Female,wetness=wet, Looseness=normal,not a virgin, Fertility high i guess i dont really care can be up to you.	for her face normal human, ears i want Elvin, no tails, just normal skin, body thickness i want to be slender, body tone kinda athletic but not too much, hair i want really long i think like a 30 on the codex number i think and her hair color light blonde, i want her to have normal D size breast with you can choose how you want them really though i dont think i really care, nipple size i dont care, her skin color a fair light light color but not too pale, for her starting equipment i want im not sure what i want her to wear but basically i want a Elvin archer with a bow. so maybe you can do something about the clothing. i just want a Elvin character in the game since theres goblins plus another archer besides kelt a female one add to that.	Lucina
    DisplayText("You're a blond, fair-skinned lass with a well-made bow and the skills to use it.  You have D-cup breasts and a very moist cunt that's seen a little action.  You're fit and trim, but not too thin, nor too well-muscled.  All in all, you're a good fit for championing your village's cause.");
    if (player.torso.vaginas.count <= 0) player.torso.vaginas.add(new Vagina());
    player.torso.vaginas.get(0).wetness = VaginaWetness.SLICK;
    player.torso.vaginas.get(0).looseness = VaginaLooseness.LOOSE;
    player.torso.vaginas.get(0).virgin = false;
    if (player.femininity < 80) player.femininity = 80;
    player.fertility = 40;
    player.torso.neck.head.ears.type = EarType.ELFIN;
    player.thickness = 25;
    player.tone = 60;
    player.torso.neck.head.hair.length = 30;
    player.torso.neck.head.hair.color = "light blonde";
    player.torso.chest.get(0).rating = 4;
    player.skin.tone = "light";
    // Bow skill 100 (Sorry Kelt, I can't hear your insults over my mad Robin Hood skillz)
    player.statusAffects.set(StatusAffectType.Kelt, StatusAffectFactory.create(StatusAffectType.Kelt, 100, 0, 0, 0)); )
    player.createKeyItem("Bow", 0, 0, 0, 0);
}
