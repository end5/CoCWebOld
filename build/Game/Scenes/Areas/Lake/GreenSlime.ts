import { Character } from "../../../Character/Character";
import { CharacterType } from "../../../Character/CharacterType";
import { CharacterDescription } from "../../../Character/CharacterDescription";
import { Cock, CockType } from "../../../Body/Cock";
import { Gender } from "../../../Body/GenderIdentity";
import { BreastRow } from "../../../Body/BreastRow";
import { ButtLooseness, ButtWetness, ButtRating } from "../../../Body/Butt";
import { randInt } from "../../../../Engine/Utilities/SMath";
import { HipRating } from "../../../Body/Hips";
import { LegType } from "../../../Body/Legs";
import { Armor } from "../../../Items/Armors/Armor";
import { ArmorName } from "../../../Items/Armors/ArmorName";
import { WeaponName } from "../../../Items/Weapons/WeaponName";
import { Weapon } from "../../../Items/Weapons/Weapon";

// public defeated(hpVictory: boolean) {
// 	DisplayText("You smile in satisfaction as the " + short + " collapses, unable to continue fighting.", true);
// 	//Boobfeed.
// 	if (player.statusAffects.has(StatusAffectType.Feeder)) {
// 		//Eligable to rape
// 		if (player.stats.lust >= 33 && player.gender > 0) {
// 			DisplayText("\n\nYou're horny enough to try and rape it, though you'd rather see how much milk you can squirt into it.  What do you do?");
// 			game.simpleChoices("B.Feed", game.lake.greenSlimeScene.rapeOozeWithMilk, "Rape", game.lake.greenSlimeScene.slimeVictoryRape, "", null, "", null, "Leave", game.Scenes.camp.returnToCampUseOneHour);
// 		}
// 		//Rapes not on the table.
// 		else {
// 			DisplayText("\n\nYour nipples ache with the desire to forcibly breastfeed the gelatinous beast.  Do you?");
// 			game.doYesNo(game.lake.greenSlimeScene.rapeOozeWithMilk, game.Scenes.camp.returnToCampUseOneHour);
// 		}
// 	}
// 	//Not a breastfeeder
// 	else if (player.stats.lust >= 33 && player.gender > 0) {
// 		DisplayText("  Sadly you realize your own needs have not been met.  Of course, you could always play with the poor thing... Do you rape it?");
// 		game.doYesNo(game.lake.greenSlimeScene.slimeVictoryRape, game.Scenes.camp.returnToCampUseOneHour);
// 	}
// 	else game.return { next: Scenes.camp.returnToCampUseOneHour };
// }

// public won(hpVictory: boolean, pcCameWorms: boolean) {
// 	if (pcCameWorms) {
// 		DisplayText("\n\nThe slime doesn't even seem to notice.\n\n");
// 	}
// 	return { next: game.lake.greenSlimeScene.slimeLoss };
// }

// private lustAttack() {
// 	DisplayText("The creature surges forward slowly with a swing that you easily manage to avoid.  You notice traces of green liquid spurt from the creature as it does, forming a thin mist that makes your skin tingle with excitement when you inhale it.");
// 	game.dynStats("lus", player.stats.lib / 10 + 8);
// 	return { next: game.playerMenu };
// }

// private lustReduction() {
// 	DisplayText("The creature collapses backwards as its cohesion begins to give out, and the faint outline of eyes and a mouth form on its face.  Its chest heaves as if it were gasping, and the bolt upright erection it sports visibly quivers and pulses before relaxing slightly.");
// 	lust -= 13;
// 	return { next: game.playerMenu };
// }

export class GreenSlime extends Character {
    public constructor() {
        super(CharacterType.GreenSlime);
        this.description = new CharacterDescription(this, "a ", "green slime", "The green slime has a normally featureless face that sits on top of wide shoulders that sprout into thick, strong arms.  Its torso fades into an indistinct column that melds into the lump of ooze on the ground that serves as a makeshift form of locomotion.");
        this.torso.cocks.add(new Cock(18, 2, CockType.HUMAN));
        this.cumMultiplier = 3;
        this.hoursSinceCum = 20;
        this.gender = Gender.NONE; // Force to it pronouns
        this.torso.chest.add(new BreastRow(0));
        this.torso.butt.looseness = ButtLooseness.STRETCHED;
        this.torso.butt.wetness = ButtWetness.SLIME_DROOLING;
        this.tallness = randInt(8) + 80;
        this.torso.hips.rating = HipRating.AMPLE;
        this.torso.butt.rating = ButtRating.LARGE;
        this.torso.hips.legs.type = LegType.GOO;
        this.skin.tone = "green";
        this.baseStats.str = 25;
        this.baseStats.tou = 20;
        this.baseStats.spe = 10;
        this.baseStats.int = 5;
        this.baseStats.lib = 50;
        this.baseStats.sens = 60;
        this.baseStats.cor = 20;
        this.inventory.equipment.defaultArmorSlot.equip(new Armor("gelatinous skin" as ArmorName, undefined, "gelatinous skin", 0));
        this.inventory.equipment.defaultWeaponSlot.equip(new Weapon("hands" as WeaponName, undefined, "hands", "slap", 0));
        this.baseStats.bonusHP = 30;
        this.baseStats.lust = 30;
        // this.temperment = TEMPERMENT_LOVE_GRAPPLES;
        this.baseStats.level = 2;
        this.inventory.gems = randInt(5) + 1;
        // this.drop = new ChainedDrop().add(weapons.PIPE, 1 / 10)
        //     .add(consumables.WETCLTH, 1 / 2)
        //     .elseDrop(useables.GREENGL);
        // this.special1 = lustReduction;
        // this.special2 = lustAttack;
        // this.special3 = lustAttack;
    }
}
