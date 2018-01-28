import BreastRow from '../../Body/BreastRow';
import Cock, { CockType } from '../../Body/Cock';
import { EarType } from '../../Body/Ears';
import { FaceType } from '../../Body/Face';
import { SkinType } from '../../Body/Skin';
import Tail, { TailType } from '../../Body/Tail';
import { TongueType } from '../../Body/Tongue';
import { WingType } from '../../Body/Wings';
import PerkFactory from '../../Effects/PerkFactory';
import { PerkType } from '../../Effects/PerkType';
import Player from '../../Player/Player';

export default function customLukaz(player: Player): void {
    // Specific Character
    // Male. 11.5 inch dog dick, 4 balls, 2 inches in diameter.
    player.torso.cocks.add(new Cock());
    player.torso.cocks.get(0).length = 11.5;
    player.torso.cocks.get(0).thickness = 2;
    player.torso.cocks.get(0).type = CockType.DOG;
    player.torso.cocks.get(0).knotMultiplier = 1.5;
    player.torso.chest.add(new BreastRow());
    player.torso.chest.get(0).rating = 0;
    player.gender = 1;
    player.tallness = 71;
    player.torso.hips.rating = 4;
    player.torso.butt.rating = 4;
    player.femininity = 30;
    player.torso.cocks.add(new Cock());
    player.torso.balls.quantity = 4;
    player.cumMultiplier = 4;
    player.torso.balls.size = 2;
    player.stats.str = 18;
    player.stats.tou = 17;
    player.stats.spe = 15;
    player.stats.int = 15;
    player.stats.sens = 15;
    player.stats.lib = 15;
    player.stats.cor = 0;
    kGAMECLASS.notes = "No Notes Available.";
    player.stats.HP = kGAMECLASS.maxHP();
    player.torso.neck.head.hair.length = 1;
    player.skin.type = SkinType.PLAIN;
    player.skin.tone = "light";
    player.torso.neck.head.hair.color = "brown";
    player.torso.neck.head.face.type = FaceType.HUMAN;
    player.torso.neck.head.face.tongue.type = TongueType.HUMAN;
    player.femininity = 50;
    player.thickness = 50;
    player.skin.desc = "skin";
    player.hoursSinceCum = 0;
    player.torso.clit.length = 0;
    player.torso.butt.looseness = 0;
    player.torso.butt.wetness = 0;
    player.torso.butt.fullness = 0;
    player.fertility = 5;
    player.stats.fatigue = 0;
    player.torso.neck.head.horns.amount = 0;
    player.torso.wings.type = WingType.NONE;
    player.torso.wings.desc = "non-existant";
    // "dog face, dog ears, draconic tail, blue fur.
    player.torso.neck.head.face.type = FaceType.DOG;
    player.torso.neck.head.ears.type = EarType.DOG;
    player.torso.tails.add(new Tail(TailType.DRACONIC));
    player.skin.type = SkinType.FUR;
    player.torso.neck.head.hair.color = "blue";
    player.skin.desc = "fur";
    player.tone = 88;
    player.torso.neck.head.face.tongue.type = TongueType.DRACONIC;
    // gel plate armor, warhammer, 88 body tone, 1 breast row, flat manly breasts, 0.2 inch nipples, 1 on each breast, draconic tongue, short hair-blue, light skin."	Lukaz
    player.perks.set(PerkType.HistoryFighter, PerkFactory.create(PerkType.HistoryFighter, 0, 0, 0, 0));
    player.perks.set(PerkType.MessyOrgasms, PerkFactory.create(PerkType.MessyOrgasms, 1.25, 0, 0, 0));
}
