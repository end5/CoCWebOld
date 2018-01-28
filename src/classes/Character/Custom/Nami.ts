import BreastRow from '../../Body/BreastRow';
import { EarType } from '../../Body/Ears';
import { FaceType } from '../../Body/Face';
import { LegType } from '../../Body/Legs';
import { SkinType } from '../../Body/Skin';
import Tail, { TailType } from '../../Body/Tail';
import Vagina, { VaginaType, VaginaWetness } from '../../Body/Vagina';
import DisplayText from '../../display/DisplayText';
import PerkFactory from '../../Effects/PerkFactory';
import { PerkType } from '../../Effects/PerkType';
import StatusAffectFactory from '../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Player from '../../Player/Player';

export default function customNami(player: Player): void {
    // Female with the sand-trap black pussy
    // Non-Virgin
    // Fertility- Normal Starting Value
    // Wetness- Above Average
    // Looseness- Normal Starting Value
    // Clit-size- Normal Value"
    player.torso.vaginas.add(new Vagina());
    player.torso.vaginas.get(0).wetness = VaginaWetness.SLICK;
    player.torso.clit.length = 0.25;
    player.torso.vaginas.get(0).type = VaginaType.BLACK_SAND_TRAP;
    player.torso.vaginas.get(0).virgin = false;
    player.torso.butt.looseness = 1;
    // Face- Canine
    player.torso.neck.head.face.type = FaceType.DOG;
    // Ears- Canine
    player.torso.neck.head.ears.type = EarType.DOG;
    // Tail- Canine
    player.torso.tails.add(new Tail(TailType.DOG));
    // Lower body- Canine
    player.torso.hips.legs.type = LegType.DOG;
    // White Fur (if possible)
    player.skin.type = SkinType.FUR;
    player.torso.neck.head.hair.color = "white";
    player.skin.desc = "fur";
    // Body Thickness/breastsize/- As if I had selected the ""Average"" body type from the start.
    player.torso.chest.add(new BreastRow());
    player.torso.chest.get(0).rating = 3;
    // Muscle Tone- A bit above average enough to trigger a mention of it in the desc.
    player.tone = 55;
    // Nipples-  As above on size but the black sand trap nipples.
    player.statusAffects.set(StatusAffectType.BlackNipples, StatusAffectFactory.create(StatusAffectType.BlackNipples, 0, 0, 0, 0));
    // Hair Length- Long
    player.torso.neck.head.hair.length = 16;
    // Hair Color- Black
    // Skin Color- Light
    player.skin.tone = "light";
    // Starting Equipment: Wizard's Robe, Wizards Staff, and one White and one Black book in inventory.
    // equipArmor("inquisitor's corset",false);
    player.setArmor(armors.W_ROBES);

    player.setWeapon(weapons.W_STAFF);
    // Gift Perk- Smarts
    player.perks.set(PerkType.Smart, PerkFactory.create(PerkType.Smart, 0, 0, 0, 0));
    // History- Schooling
    player.perks.set(PerkType.HistoryScholar, PerkFactory.create(PerkType.HistoryScholar, 0, 0, 0, 0));
    player.itemSlot1.setItemAndQty(consumables.W__BOOK, 1);
    player.itemSlot2.setItemAndQty(consumables.B__BOOK, 1);

    player.gender = 2;
    player.tallness = 64;
    player.femininity = 75;
    player.torso.butt.rating = 7;
    player.torso.hips.rating = 7;
    player.stats.int = 40;
    player.stats.str = 20;
    player.stats.spe = 25;
    player.stats.tou = 15;

    DisplayText().clear();
    DisplayText("Your exotic appearance caused you some trouble growing up, but you buried your nose in books until it came time to go through the portal.");
}
