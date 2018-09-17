import { Character } from "../../../Character/Character";
import { CharacterType } from "../../../Character/CharacterType";
import { CharacterDescription } from "../../../Character/CharacterDescription";
import { Cock } from "../../../Body/Cock";
import { BreastRow } from "../../../Body/BreastRow";
import { ButtLooseness, ButtWetness, ButtRating } from "../../../Body/Butt";
import { StatusAffectType } from "../../../Effects/StatusAffectType";
import { HipRating } from "../../../Body/Hips";
import { LegType } from "../../../Body/Legs";
import { randInt } from "../../../../Engine/Utilities/SMath";
import { Tail, TailType } from "../../../Body/Tail";
import { Armor } from "../../../Items/Armors/Armor";
import { ArmorName } from "../../../Items/Armors/ArmorName";
import { WeaponName } from "../../../Items/Weapons/WeaponName";
import { Weapon } from "../../../Items/Weapons/Weapon";

// public defeated(hpVictory: boolean) {
// 	game.swamp.maleSpiderMorphScene.defeatSpiderBoy();
// }

// public won(hpVictory: boolean, pcCameWorms: boolean) {
// 	if (pcCameWorms) {
// 		DisplayText("\n\nThe spider flashes a predatory grin while she waits it out...");
// 		return { next: game.endLustLoss };
// 	} else {
// 		game.swamp.maleSpiderMorphScene.loseToMaleSpiderMorph();
// 	}
// }

export class MaleSpiderMorph extends Character {
    public constructor() {
        super(CharacterType.MaleSpiderMorph);
        this.description = new CharacterDescription(this, "the ", "male spider-morph", "The male spider-morph is completely nude, save for his thigh-high stockings and forearm-length gloves, which upon closer inspection, appear to be actually be part of his body - his exoskeleton.  His exposed skin is pale as the full moon, save for the dusk of his nipples and a patch of jet-black that spreads out over his groin, glossing the male's foreskinned cock and dangling sack in glistening ebon.  His ass is small but well-rounded, with a weighty spider-abdomen hanging from just above.  The spider-man is currently eyeing you with a strange expression and his fangs bared.");
        this.torso.cocks.add(new Cock(6, 2));
        this.torso.balls.quantity = 2;
        this.torso.balls.size = 2;
        this.torso.chest.add(new BreastRow(0));
        this.torso.butt.looseness = ButtLooseness.TIGHT;
        this.torso.butt.wetness = ButtWetness.DRY;
        this.statusAffects.add(StatusAffectType.BonusACapacity, 40, 0, 0, 0);
        this.tallness = 7 * 12 + 6;
        this.torso.hips.rating = HipRating.CURVY + 2;
        this.torso.butt.rating = ButtRating.LARGE + 1;
        this.torso.hips.legs.type = LegType.CHITINOUS_SPIDER_LEGS;
        this.skin.tone = "dusky";
        this.torso.neck.head.hair.color = "red";
        this.torso.neck.head.hair.length = 13;
        this.baseStats.str = 60;
        this.baseStats.tou = 50;
        this.baseStats.spe = 99;
        this.baseStats.int = 99;
        this.baseStats.lib = 35;
        this.baseStats.sens = 35;
        this.baseStats.cor = 20;
        this.inventory.equipment.defaultArmorSlot.equip(new Armor("exoskeleton" as ArmorName, undefined, "exoskeleton", 14, 70));
        this.inventory.equipment.defaultWeaponSlot.equip(new Weapon("dagger" as WeaponName, undefined, "dagger", "stab", 15));
        this.baseStats.bonusHP = 200;
        this.baseStats.lust = 20;
        this.baseStats.lustVuln = .6;
        // this.temperment = TEMPERMENT_RANDOM_GRAPPLES;
        this.baseStats.level = 13;
        this.inventory.gems = randInt(10) + 10;
        // this.drop = new WeightedDrop().add(consumables.S_GOSSR, 5)
        //     .add(useables.T_SSILK, 1)
        //     .add(null, 4);
        this.torso.tails.add(new Tail(TailType.SPIDER_ABDOMEN));
    }
}
