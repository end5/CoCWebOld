import { Character } from "../../../Character/Character";
import { CharacterType } from "../../../Character/CharacterType";
import { CharacterDescription } from "../../../Character/CharacterDescription";
import { Vagina, VaginaWetness, VaginaLooseness } from "../../../Body/Vagina";
import { StatusAffectType } from "../../../Effects/StatusAffectType";
import { BreastRow, BreastCup } from "../../../Body/BreastRow";
import { ButtLooseness, ButtWetness, ButtRating } from "../../../Body/Butt";
import { HipRating } from "../../../Body/Hips";
import { LegType } from "../../../Body/Legs";
import { Weapon } from "../../../Items/Weapons/Weapon";
import { WeaponName } from "../../../Items/Weapons/WeaponName";
import { Armor } from "../../../Items/Armors/Armor";
import { ArmorName } from "../../../Items/Armors/ArmorName";
import { randInt } from "../../../../Engine/Utilities/SMath";

// //2a)  Ability -  Poison Bite - poisons player
// protected nagaPoisonBiteAttack() {
// 	//(Deals damage over 4-5 turns, invariably reducing
// 	//your speed. It wears off once combat is over.)
// 	DisplayText("The naga strikes with the speed of a cobra, sinking her fangs into your flesh!  ");
// 	if (!player.statusAffects.has(StatusAffectType.NagaVenom)) {
// 		DisplayText("The venom's effects are almost instantaneous; your vision begins to blur and it becomes increasingly harder to stand.");
// 		if (player.stats.spe > 4) {
// 			//stats(0,0,-3,0,0,0,0,0);
// 			player.stats.spe -= 3;
// 			showStatDown('spe');
// 			// speUp.visible = false;
// 			// speDown.visible = true;
// 			player.statusAffects.add(StatusAffectType.NagaVenom, 3, 0, 0, 0);
// 		}
// 		else {
// 			player.statusAffects.add(StatusAffectType.NagaVenom, 0, 0, 0, 0);
// 			player.takeDamage(5 + randInt(5));
// 		}
// 		player.takeDamage(5 + randInt(5));
// 	}
// 	else {
// 		DisplayText("The venom's effects intensify as your vision begins to blur and it becomes increasingly harder to stand.");
// 		if (player.stats.spe > 3) {
// 			//stats(0,0,-2,0,0,0,0,0);
// 			player.stats.spe -= 2;
// 			showStatDown('spe');
// 			// speUp.visible = false;
// 			// speDown.visible = true;
// 			player.addStatusValue(StatusAffects.NagaVenom, 1, 2);
// 		}
// 		else player.takeDamage(5 + randInt(5));
// 		player.takeDamage(5 + randInt(5));
// 	}
// 	combatRoundOver();
// }

// //2b)  Ability - Constrict - entangles player, raises lust
// //every turn until you break free
// protected nagaConstrict() {
// 	DisplayText("The naga draws close and suddenly wraps herself around you, binding you in place! You can't help but feel strangely aroused by the sensation of her scales rubbing against your body. All you can do is struggle as she begins to squeeze tighter!");
// 	player.statusAffects.add(StatusAffectType.NagaBind, 0, 0, 0, 0);
// 	player.takeDamage(2 + randInt(4));
// 	combatRoundOver();
// }

// //2c) Abiliy - Tail Whip - minus ??? HP
// //(base it on toughness?)
// protected nagaTailWhip() {
// 	DisplayText("The naga tenses and twists herself forcefully.  ");
// 	//[if evaded]
// 	if ((player.findPerk(PerkLib.Evade) && randInt(6) === 0)) {
// 		DisplayText("You see her tail whipping toward you and evade it at the last second. You quickly roll back onto your feet.");
// 	}
// 	else if (player.perks.has(PerkType.Misdirection) && randInt(100) < 10 && player.inventory.equipment.armor.displayName === "red, high-society bodysuit") {
// 		DisplayText("Using Raphael's teachings and the movement afforded by your bodysuit, you anticipate and sidestep " + a + short + "'s tail-whip.");
// 	}
// 	else if (player.stats.spe > randInt(300)) {
// 		DisplayText("You see her tail whipping toward you and jump out of the way at the last second. You quickly roll back onto your feet.");
// 	}
// 	else {
// 		DisplayText("Before you can even think, you feel a sharp pain at your side as the naga's tail slams into you and shoves you into the sands. You pick yourself up, wincing at the pain in your side.");
// 		let damage: number = 10;
// 		if (player.armorDef < 10) damage += 10 - player.armorDef;
// 		damage += randInt(3);
// 		damage = player.takeDamage(damage);
// 		DisplayText(" (" + damage + ")");
// 	}
// 	combatRoundOver();
// }

// public defeated(hpVictory: boolean) {
// 	game.desert.nagaScene.nagaRapeChoice();
// }

// public won(hpVictory: boolean, pcCameWorms: boolean) {
// 	if (pcCameWorms) {
// 		DisplayText("\n\nThe naga's eyes go wide and she turns to leave, no longer interested in you.");
// 		player.orgasm();
// 		return { next: game.Scenes.camp.returnToCampUseOneHour };
// 	} else {
// 		game.desert.nagaScene.nagaFUCKSJOOOOOO();
// 	}
// }

export class Naga extends Character {
    public constructor() {
        super(CharacterType.Naga);
        this.description = new CharacterDescription(this, "naga", "You are fighting a naga. She resembles a beautiful and slender woman from the waist up, with dark hair hanging down to her neck. Her upper body is deeply tanned, while her lower body is covered with shiny scales, striped in a pattern reminiscent of the dunes around you. Instead of bifurcating into legs, her hips elongate into a snake's body which stretches far out behind her, leaving a long and curving trail in the sand.  She's completely naked, with her round C-cup breasts showing in plain sight. In her mouth you can see a pair of sharp, poisonous fangs and a long forked tongue moving rapidly as she hisses at you.", false, "the ");
        this.torso.vaginas.add(new Vagina(VaginaWetness.SLAVERING, VaginaLooseness.NORMAL, false));
        this.statusAffects.add(StatusAffectType.BonusVCapacity, 40, 0, 0, 0);
        this.torso.chest.add(new BreastRow(BreastCup.C));
        this.torso.butt.looseness = ButtLooseness.TIGHT;
        this.torso.butt.wetness = ButtWetness.DRY;
        this.statusAffects.add(StatusAffectType.BonusACapacity, 10, 0, 0, 0);
        this.tallness = 5 * 12 + 10;
        this.torso.hips.rating = HipRating.AMPLE + 2;
        this.torso.butt.rating = ButtRating.LARGE;
        this.torso.hips.legs.type = LegType.NAGA;
        this.skin.tone = "mediterranean-toned";
        this.torso.neck.head.hair.color = "brown";
        this.torso.neck.head.hair.length = 16;
        this.baseStats.str = 28;
        this.baseStats.tou = 20;
        this.baseStats.spe = 35;
        this.baseStats.int = 42;
        this.baseStats.lib = 55;
        this.baseStats.sens = 55;
        this.baseStats.cor = 40;
        this.inventory.equipment.defaultWeaponSlot.equip(new Weapon("fist" as WeaponName, undefined, "fists", "punch", 3));
        this.inventory.equipment.defaultArmorSlot.equip(new Armor("scales" as ArmorName, undefined, "scales", 5));
        this.baseStats.lust = 30;
        // this.temperment = TEMPERMENT_RANDOM_GRAPPLES;
        this.baseStats.level = 2;
        this.inventory.gems = randInt(5) + 8;
        // this.drop = new WeightedDrop().
        //     add(null, 1).
        //     add(consumables.REPTLUM, 5).
        //     add(consumables.SNAKOIL, 4);
        // this.special1 = nagaPoisonBiteAttack;
        // this.special2 = nagaConstrict;
        // this.special3 = nagaTailWhip;
    }
}
