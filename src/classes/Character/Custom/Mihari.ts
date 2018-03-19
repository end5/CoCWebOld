import BreastRow from '../../Body/BreastRow';
import { EarType } from '../../Body/Ears';
import { FaceType } from '../../Body/Face';
import { LegType } from '../../Body/Legs';
import { SkinType } from '../../Body/Skin';
import Tail, { TailType } from '../../Body/Tail';
import { TongueType } from '../../Body/Tongue';
import Vagina, { VaginaLooseness, VaginaWetness } from '../../Body/Vagina';
import DisplayText from '../../display/DisplayText';
import { PerkType } from '../../Effects/PerkType';
import Player from '../../Player/Player';

export default function customMihari(player: Player): void {
    // [Values will be listed as if taken from Minerva]
    // I'm kinda going under the assumption you are letting us go hog wild if not, take what's allowed and do what you wish out of what's below
    DisplayText("The portal is not something you fear, not with your imposing armor and inscribed spellblade.  You're much faster and stronger than every champion that came before you, but will it be enough?");
    // Core Stats:
    player.stats.str = 40;
    player.stats.tou = 20;
    player.stats.spe = 100;
    player.stats.int = 80;
    player.stats.lib = 25;
    player.stats.sens = 15;

    // Body Values:
    // breastRows
    player.torso.chest.add(new BreastRow());
    // -rating: 5
    // -breasts: 2
    // -nipplesPerBreast: 1
    player.torso.chest.get(0).rating = 5;
    player.torso.butt.rating = 2;
    player.torso.vaginas.add(new Vagina());
    player.torso.vaginas.get(0).looseness = VaginaLooseness.TIGHT;
    player.torso.vaginas.get(0).wetness = VaginaWetness.SLAVERING;
    player.torso.vaginas.get(0).virgin = true;
    player.torso.clit.length = 0.2;
    player.torso.neck.head.ears.type = EarType.CAT;
    player.torso.neck.head.face.type = FaceType.CAT;
    player.femininity = 100;
    player.fertility = 85;
    player.gender = 2;
    player.torso.neck.head.hair.color = "blonde";
    player.torso.neck.head.hair.length = 24;
    player.torso.hips.rating = 6;
    player.torso.hips.legs.type = LegType.CAT;
    player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].nipples.length = 0.5;
    // perks:
    player.perks.add(PerkType.Agility, 0, 0, 0, 0);
    player.perks.add(PerkType.Evade, 0, 0, 0, 0);
    player.perks.add(PerkType.Runner, 0, 0, 0, 0);
    player.perks.add(PerkType.Fast, 0.25, 0, 0, 0);
    player.perks.add(PerkType.Fertile, 1.5, 0, 0, 0);
    player.perks.add(PerkType.Flexibility, 0, 0, 0, 0);
    player.perks.add(PerkType.HistoryScholar, 0, 0, 0, 0);

    player.skin.desc = "fur";
    player.skin.tone = "ashen";
    player.skin.type = SkinType.FUR;
    player.torso.tails.add(new Tail(TailType.CAT));
    player.tallness = 55;
    player.teaseLevel = 4;
    player.thickness = 10;
    player.tone = 75;
    player.torso.neck.head.face.tongue.type = TongueType.HUMAN;

    // Posted everything above sorry if it wasn't supposed to go there.
    // starting equipment: black leather armor surrounded by voluminous robes
    // starting weapon: Spellblade if not gamebreaking otherwise spear is fine.
    player.setArmor(armors.LTHRROB);
    player.setWeapon(weapons.S_BLADE);
}
