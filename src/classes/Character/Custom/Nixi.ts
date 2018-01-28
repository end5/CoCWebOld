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
import Player from '../../Player/Player';
import { Utils } from '../../Utilities/Utils';
export default function customNixi(player: Player): void {
    // -Perks
    // fertility AND messy orgasm (hope that's not pushing it)
    player.perks.set(PerkType.MessyOrgasms, PerkFactory.create(PerkType.MessyOrgasms, 1.25, 0, 0, 0));
    player.perks.set(PerkType.Fertile, PerkFactory.create(PerkType.Fertile, 1.5, 0, 0, 0));
    // fighting history
    player.perks.set(PerkType.HistoryFighter, PerkFactory.create(PerkType.HistoryFighter, 0, 0, 0, 0));
    // 3 starting perk points
    player.perkPoints = 3;
    // some starting gems (just go ahead and surprise me on the amount)
    player.inventory.gems = Utils.rand(800);
    // Specific Character
    // -Female... with a dog cock
    // 11"" long, 2"" wide, 2.4"" knot
    // no balls
    // virgin pussy, 0.2"" clit
    // wetness 2
    // fertility 30
    // virgin bum
    // anal wetness 1
    player.torso.butt.wetness = 2;
    player.gender = 3;
    player.torso.cocks.add(new Cock());
    player.torso.cocks.get(0).length = 11;
    player.torso.cocks.get(0).thickness = 2;
    player.torso.cocks.get(0).knotMultiplier = 1.2;
    player.torso.cocks.get(0).type = CockType.DOG;
    player.torso.balls.quantity = 0;
    player.torso.chest.add(new BreastRow());
    player.torso.vaginas.add(new Vagina());
    player.torso.vaginas.get(0).wetness = VaginaWetness.WET;
    // 1 pair DD's, 0.5"" nipples"
    player.torso.chest.get(0).rating = 5;
    player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].nipples.length = 0.5;
    player.torso.clit.length = .5;
    player.fertility = 30;
    player.torso.hips.rating = 6;
    player.torso.butt.rating = 6;
    player.stats.str = 15;
    player.stats.tou = 15;
    player.stats.spe = 18;
    player.stats.int = 17;
    player.stats.sens = 15;
    player.stats.lib = 15;
    player.stats.cor = 0;
    kGAMECLASS.notes = "No Notes Available.";
    player.stats.HP = kGAMECLASS.maxHP();

    player.femininity = 85;
    // 75 muscle tone
    player.tone = 75;
    // 25 thickness
    player.thickness = 25;
    player.skin.desc = "fur";
    player.skin.type = SkinType.FUR;
    player.skin.tone = "light";
    player.torso.neck.head.hair.color = "silver";
    player.torso.neck.head.hair.length = 10;
    // shoulder length silver hair

    player.torso.balls.quantity = 0;
    player.cumMultiplier = 1;
    player.torso.balls.size = 0;
    player.hoursSinceCum = 0;
    player.torso.clit.length = 0;
    player.torso.butt.looseness = 0;
    player.torso.butt.wetness = 0;
    player.torso.butt.fullness = 0;
    player.fertility = 5;
    player.stats.fatigue = 0;
    player.torso.neck.head.horns.amount = 0;
    player.tallness = 82;
    // 6' 10"" german-shepherd morph, face ears hands feet tail, the whole nine yards
    player.torso.neck.head.face.type = FaceType.DOG;
    player.torso.hips.legs.type = LegType.DOG;
    player.torso.tails.add(new Tail(TailType.DOG));
    player.torso.neck.head.ears.type = EarType.DOG;
    //// "	"I'm picturing a tall, feminine German-Shepherd morph, solid white and gorgeous. She has both sets of genitals, with no balls, and a large set of breasts. She wields a large claymore and is dressed in a full chain vest and pants.
    // large claymore (and the strength to use it)
    player.setWeapon(weapons.CLAYMOR);
    player.stats.str = 40;
    // full chain
    player.setArmor(armors.FULLCHN);
    DisplayText("As a German-Shepherd morph, the rest of the village never really knew what to do with you... until they sent you through the portal to face whatever's on the other side...");
}
