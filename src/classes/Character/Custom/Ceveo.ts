import BreastRow from '../../Body/BreastRow';
import Cock from '../../Body/Cock';
import DisplayText from '../../display/DisplayText';
import PerkFactory from '../../Effects/PerkFactory';
import { PerkType } from '../../Effects/PerkType';
import StatusAffectFactory from '../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Piercing, { PiercingType } from '../../Items/Misc/Piercing';
import Player from '../../Player/Player';

export default function customCeveo(player: Player): void {
    // Male. 2 cock. 5.5 average thickness and 12 in with excessive thickness both pierced with silver rings. Balls, large, about the size of a billiard ball, four of them. All humanish, more details on the character.
    player.torso.cocks.add(new Cock());
    player.torso.cocks.add(new Cock());
    player.torso.balls.quantity = 4;
    player.torso.balls.size = 3;
    player.torso.cocks.get(0).thickness = 5.5;
    player.torso.cocks.get(1).thickness = 5.5;
    player.torso.cocks.get(0).length = 12;
    player.torso.cocks.get(1).length = 12;
    player.inventory.equipment.piercings.cocks.get(0).equip(new Piercing(PiercingType.Ring, "silver cock-ring", "Silver cock-ring"));
    player.inventory.equipment.piercings.cocks.get(1).equip(new Piercing(PiercingType.Ring, "silver cock-ring", "Silver cock-ring"));
    // "Androgynous face, large brown eyes, long black hair down to about ass level, full lips, pirced with one silver ring ass itself is round and thick, chest is flat, only two nipples, about nickle sized pierced with silver studs, skin of a pale ghostly transparent complexion, rest of the body is not notably muscular or chubby in any definite way, feet seem to taper off into full transparency. Full body housed in the lewd Inquisitor Armor, wielding a Wizard Staff. Starting at level 5 with tank, regeneration, healing, smarts, channeling, mage and incorperability perks, a full knowledge of
    player.gender = 1;
    player.tallness = 72;
    player.femininity = 50;
    player.torso.neck.head.hair.length = 35;
    player.torso.neck.head.hair.color = "black";
    player.inventory.equipment.piercings.lip.equip(new Piercing(PiercingType.Ring, "silver lip-ring", "Silver lip-ring"));
    player.torso.butt.rating = 8;
    player.torso.hips.rating = 8;
    player.torso.chest.add(new BreastRow());
    player.inventory.equipment.piercings.nipples.get(0).equip(new Piercing(PiercingType.Stud, "silver studs", "Silver studs"));

    player.skin.tone = "ghostly pale";
    player.perks.add(PerkType.Incorporeality, 0, 0, 0, 0);
    player.setArmor(armors.I_CORST);
    player.stats.level = 5;
    player.setWeapon(weapons.W_STAFF);

    player.perks.add(PerkType.Regeneration, 0, 0, 0, 0);
    player.perks.add(PerkType.Smart, 0, 0, 0, 0);
    player.perks.add(PerkType.Channeling, 0, 0, 0, 0);
    player.perks.add(PerkType.Mage, 0, 0, 0, 0);
    player.perks.add(PerkType.HistoryHealer, 0, 0, 0, 0);
    player.perks.add(PerkType.Tank, 0, 0, 0, 0);
    player.statusAffects.add(StatusAffectType.KnowsArouse, 0, 0, 0, 0); )
    player.statusAffects.add(StatusAffectType.KnowsHeal, 0, 0, 0, 0); )
    player.statusAffects.add(StatusAffectType.KnowsMight, 0, 0, 0, 0); )
    player.statusAffects.add(StatusAffectType.KnowsCharge, 0, 0, 0, 0); )
    player.statusAffects.add(StatusAffectType.KnowsBlind, 0, 0, 0, 0); )
    player.statusAffects.add(StatusAffectType.KnowsWhitefire, 0, 0, 0, 0); )
    // magic, 50 Int, 50 tough, Speed 15, Str 10, 30 corruption, 30 libido, 10 sensitivity.
    player.stats.int = 50;
    player.stats.tou = 50;
    player.stats.spe = 15;
    player.stats.str = 10;
    player.stats.cor = 30;
    player.stats.lib = 30;
    player.stats.sens = 10;
    DisplayText("As a wandering mage you had found your way into no small amount of trouble in the search for knowledge.  A strange tome here, a ritual there, most people found your pale form unsettling. They would be further troubled if they could see your feet!  Lets not even begin on the blood magic.  Yes, your interest in examining every aspect of magic has run you down a strange path, so when you wandered into Ingram and began to hear of the exile of the Champion, and the superstitions that surrounded it you were intrigued, as every little rumor and ritual often had a grain of truth.  You snuck into the cave prior to the ritual, where the old man supposedly led every Champion, and there you found a strange portal that emanated a certain degree of spacial transparency -  more than the portal's own.  Within it must have been a whole new world!  Throwing caution to the wind, your curiosities engulfing you, you dove in with nary a thought for the consequences.");
}
