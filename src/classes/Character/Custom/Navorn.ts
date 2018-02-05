import BreastRow from '../../Body/BreastRow';
import Cock, { CockType } from '../../Body/Cock';
import { EarType } from '../../Body/Ears';
import { FaceType } from '../../Body/Face';
import { LegType } from '../../Body/Legs';
import { SkinType } from '../../Body/Skin';
import Tail, { TailType } from '../../Body/Tail';
import { TongueType } from '../../Body/Tongue';
import Vagina, { VaginaWetness } from '../../Body/Vagina';
import { WingType } from '../../Body/Wings';
import DisplayText from '../../display/DisplayText';
import PerkFactory from '../../Effects/PerkFactory';
import { PerkType } from '../../Effects/PerkType';
import StatusAffectFactory from '../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Player from '../../Player/Player';

export default function customNavorn(player: Player): void {
    DisplayText("There's been something special about you since day one, whether it's your numerous sexual endowments or your supernatural abilities.  You're a natural pick for champion.");
    // Character Creation	"Herm same number and types of cocks from email sent earlier.
    // Special abilities: Fire breath, fox fire?
    player.perks.add(PerkType.Dragonfire, 0, 0, 0, 0);
    // equipment: Large claymore, and platemail
    // -Chainmail armor
    player.setArmor(armors.FULLPLT);
    // -Large Claymore (i understand 40 Strength is need so if he could start with that would be great if not hit the gyms)"
    player.setWeapon(weapons.CLAYMOR);

    player.stats.str = 41;
    // femininity: 95
    player.femininity = 95;
    // (0 lust cum production: 10000)
    player.cumMultiplier += 500;
    // (base fertility 20 if possible?)
    player.fertility = 20;
    // Appearence: 7ft 9in tall covered in thick shining silver fur, has a vulpine head and ears, eight breast all the same size at DD, dragon like wings, tail, and legs. With a large mare like pussy, 6 dicks, two equine, two dragon, two vulpine, all 15in long and 3 in wide, and four nuts 5 in across
    player.tallness = 93;
    player.skin.tone = "black";
    player.skin.type = SkinType.FUR;
    player.skin.desc = "fur";
    player.torso.neck.head.hair.color = "silver";
    player.torso.neck.head.face.type = FaceType.FOX;
    player.torso.neck.head.ears.type = EarType.FOX;
    player.torso.chest.add(new BreastRow());
    player.torso.chest.add(new BreastRow());
    player.torso.chest.add(new BreastRow());
    player.torso.chest.get(0).rating = 5;
    player.torso.chest.get(0).nipples.count = 4;
    player.torso.chest.get(0).nipples.fuckable = true;
    player.torso.chest.get(1).rating = 5;
    player.torso.chest.get(1).nipples.count = 4;
    player.torso.chest.get(1).nipples.fuckable = true;
    player.torso.chest.get(2).rating = 5;
    player.torso.chest.get(2).nipples.count = 4;
    player.torso.chest.get(2).nipples.fuckable = true;
    player.torso.chest.get(3).rating = 5;
    player.torso.chest.get(3).nipples.count = 4;
    player.torso.chest.get(3).nipples.fuckable = true;
    player.torso.cocks.add(new Cock());
    player.torso.cocks.add(new Cock());
    player.torso.cocks.add(new Cock());
    player.torso.cocks.add(new Cock());
    player.torso.cocks.add(new Cock());
    player.torso.cocks.add(new Cock());
    player.torso.cocks.get(0).type = CockType.HORSE;
    player.torso.cocks.get(0).length = 15;
    player.torso.cocks.get(0).thickness = 3;
    player.torso.cocks.get(1).type = CockType.HORSE;
    player.torso.cocks.get(1).length = 15;
    player.torso.cocks.get(1).thickness = 3;
    player.torso.cocks.get(2).type = CockType.DOG;
    player.torso.cocks.get(2).length = 15;
    player.torso.cocks.get(2).thickness = 3;
    player.torso.cocks.get(2).knotMultiplier = 2;
    player.torso.cocks.get(3).type = CockType.DOG;
    player.torso.cocks.get(3).length = 15;
    player.torso.cocks.get(3).thickness = 3;
    player.torso.cocks.get(3).knotMultiplier = 2;
    player.torso.cocks.get(4).type = CockType.DRAGON;
    player.torso.cocks.get(4).length = 15;
    player.torso.cocks.get(4).thickness = 3;
    player.torso.cocks.get(5).type = CockType.DRAGON;
    player.torso.cocks.get(5).length = 15;
    player.torso.cocks.get(5).thickness = 3;
    player.torso.balls.quantity = 4;
    player.torso.balls.size = 5;
    // hair length: 15 in
    player.torso.neck.head.hair.length = 15;
    // hip size: 15/20
    player.torso.hips.rating = 15;
    // butt size: 15/20
    player.torso.butt.rating = 15;
    // body thickness: 50/100
    player.thickness = 50;
    // Muscle: 75/100"
    player.tone = 75;
    // for wetness a squirter, looseness a 2 and capacity at 140.
    if (player.torso.vaginas.count <= 0) player.torso.vaginas.add(new Vagina());
    player.torso.vaginas.get(0).wetness = VaginaWetness.SLAVERING;
    player.statusAffects.add(StatusAffectType.BonusVCapacity, 132, 0, 0, 0);
    // Virgin, high fertility like in the email I sent before.  dragon wings, nine fox tails,  dragon legs, eight DD breasts with four fuckable nipples each, dragon tongue, waist length hair, large dragon wings.
    player.torso.wings.type = WingType.DRACONIC_LARGE;
    player.torso.wings.desc = "large, draconic";
    for (let count = 0; count < 9; count++)
        player.torso.tails.add(new Tail(TailType.FOX));
    player.torso.hips.legs.type = LegType.DRAGON;
    player.torso.neck.head.face.tongue.type = TongueType.DRACONIC;
    player.torso.neck.head.hair.length = 45;
    player.perks.add(PerkType.EnlightenedNinetails, 0, 0, 0, 0);
    player.gender = 3;
}
