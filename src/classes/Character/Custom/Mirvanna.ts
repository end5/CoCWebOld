import BreastRow from '../../Body/BreastRow';
import Cock, { CockType } from '../../Body/Cock';
import { EarType } from '../../Body/Ears';
import { FaceType } from '../../Body/Face';
import { HornType } from '../../Body/Horns';
import { LegType } from '../../Body/Legs';
import { SkinType } from '../../Body/Skin';
import Tail, { TailType } from '../../Body/Tail';
import Vagina, { VaginaLooseness, VaginaWetness } from '../../Body/Vagina';
import { WingType } from '../../Body/Wings';
import DisplayText from '../../display/DisplayText';
import PerkFactory from '../../Effects/PerkFactory';
import { PerkType } from '../../Effects/PerkType';
import Player from '../../Player/Player';

export default function customMirvanna(player: Player): void {
    // Any equine or dragonny attributes accompanying it a big plus! As I'm a dragon-unicorn furry (Qilin~). Bonus points if you add a horn type for unicorn horn.
    DisplayText("You're an equine dragon-herm with a rather well-proportioned body.  Ingnam is certainly going to miss having you whoring yourself out around town.  You don't think they'll miss cleaning up all the messy sex, though.");
    player.gender = 3;
    player.stats.spe += 3;
    player.stats.int += 2;
    player.stats.str += 3;
    player.torso.clit.length = .5;
    player.fertility = 20;
    player.torso.neck.head.hair.length = 15;
    player.torso.chest.add(new BreastRow());
    player.torso.vaginas.add(new Vagina());
    player.torso.cocks.add(new Cock());
    player.tallness = 73;
    player.torso.chest.get(0).rating = 5;
    player.torso.vaginas.get(0).wetness = VaginaWetness.SLICK;
    player.torso.vaginas.get(0).looseness = VaginaLooseness.LOOSE;
    player.torso.vaginas.get(0).virgin = false;
    player.tone = 20;
    player.torso.hips.rating = 8;
    player.torso.butt.rating = 8;
    player.femininity = 75;
    player.thickness = 33;
    player.torso.neck.head.hair.color = "platinum blonde";
    player.teaseLevel = 1;
    // Mirvanna;
    // Gender = Herm
    // Ears = Horse
    player.torso.neck.head.ears.type = EarType.HORSE;
    // Horns = Dragon
    player.torso.neck.head.horns.type = HornType.DRACONIC_X4_12_INCH_LONG;
    player.torso.neck.head.horns.amount = 12;
    // Face = Horse
    player.torso.neck.head.face.type = FaceType.HORSE;
    // Skin type = Black Fur
    player.skin.tone = "brown";
    player.skin.type = SkinType.FUR;
    player.torso.neck.head.hair.color = "black";
    player.skin.desc = "fur";
    // Legs/Feet = Digigrade hooved
    player.torso.hips.legs.type = LegType.HOOFED;
    // Wing type = Dragon
    player.torso.wings.type = WingType.DRACONIC_LARGE;
    player.torso.wings.desc = "large, draconic";
    // Tail type = Dragon
    player.torso.tails.add(new Tail(TailType.DRACONIC));
    // Cock type = Equine
    player.torso.cocks.get(0).type = CockType.HORSE;
    player.torso.cocks.get(0).length = 14;
    player.torso.cocks.get(0).thickness = 2.5;
    // Vulva Type = Equine

    // Beautiful Sword & Wizard Robe
    player.setWeapon(weapons.B_SWORD);
    player.setArmor(armors.W_ROBES);
    // Herm, lots of jizz.
    player.femininity -= 2;
    player.cumMultiplier = 5.5;
    player.perks.add(PerkType.MessyOrgasms, 1.25, 0, 0, 0);
    player.perks.add(PerkType.HistoryWhore, 0, 0, 0, 0);
}
