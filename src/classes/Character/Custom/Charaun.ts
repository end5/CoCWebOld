import BreastRow from '../../Body/BreastRow';
import Cock, { CockType } from '../../Body/Cock';
import { SkinType } from '../../Body/Skin';
import Tail, { TailType } from '../../Body/Tail';
import { TongueType } from '../../Body/Tongue';
import Vagina, { VaginaWetness } from '../../Body/Vagina';
import DisplayText from '../../display/DisplayText';
import PerkFactory from '../../Effects/PerkFactory';
import { PerkType } from '../../Effects/PerkType';
import Player from '../../Player/Player';

export default function customCharaun(player: Player): void {
    DisplayText("As a gifted fox with a juicy, thick knot, a wet cunt, and magical powers, you have no problems with being chosen as champion.");
    // Herm, Fox Cock: (27"l x 1.4"w, knot multiplier 3.6), No Balls, Cum Multiplier: 7,500, Vaginal Wetness: 5, Clit length: 0.5, Virgin, Fertility: 15	9-tailed "enlightened" kitsune( a pure-blooded kitsune with the "Enlightened Nine-tails" perk and magic specials)
    if (player.torso.cocks.count <= 0) player.torso.cocks.add(new Cock());
    if (player.torso.vaginas.count <= 0) player.torso.vaginas.add(new Vagina());
    player.gender = 3;
    player.torso.cocks.get(0).length = 27;
    player.torso.cocks.get(0).thickness = 1.4;
    player.torso.cocks.get(0).knotMultiplier = 3.6;
    player.torso.cocks.get(0).type = CockType.DOG;
    player.torso.balls.quantity = 0;
    player.torso.balls.size = 2;
    player.cumMultiplier = 7500;
    player.torso.vaginas.get(0).wetness = VaginaWetness.SLAVERING;
    player.torso.clit.length = 0.5;
    player.fertility = 15;
    for (let count = 0; count < 9; count++)
        player.torso.tails.add(new Tail(TailType.FOX));
    player.perks.set(PerkType.EnlightenedNinetails, PerkFactory.create(PerkType.EnlightenedNinetails, 0, 0, 0, 0));
    // if possible with fur, Hair color: "midnight black", Skin/Fur color: "ashen grayish-blue",  Height: 65", Tone: 100, Thickness: 0, Hip rating: 6, Butt rating: 3,Feminimity: 50,  ( 4 rows of breasts (Descending from the top ones: D,C,B,A), nipple length: 0.1", Fuckable, 1 nipple per breast, Tongue type: demon
    player.torso.neck.head.hair.color = "midnight black";
    player.skin.type = SkinType.FUR;
    player.skin.desc = "fur";
    player.skin.tone = "ashen grayish-blue";
    player.tallness = 65;
    player.tone = 100;
    player.thickness = 0;
    player.torso.hips.rating = 6;
    player.torso.butt.rating = 3;
    player.femininity = 50;
    player.torso.chest.add(new BreastRow());
    player.torso.chest.add(new BreastRow());
    player.torso.chest.add(new BreastRow());
    player.torso.chest.get(0).rating = 4;
    player.torso.chest.get(0).nipples.fuckable = true;
    player.torso.chest.get(1).rating = 3;
    player.torso.chest.get(1).nipples.fuckable = true;
    player.torso.chest.get(2).rating = 2;
    player.torso.chest.get(2).nipples.fuckable = true;
    player.torso.chest.get(3).rating = 1;
    player.torso.chest.get(3).nipples.fuckable = true;
    player.torso.neck.head.face.tongue.type = TongueType.DEMONIC;
    player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].nipples.length = 0.1;
    // Starting with an Inscribed Spellblade and Bondage Straps.	Charaun
    player.setArmor(armors.BONSTRP);
    player.setWeapon(weapons.S_BLADE);
}
