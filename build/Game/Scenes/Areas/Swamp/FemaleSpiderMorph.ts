import { Character } from "../../../Character/Character";
import { CharacterType } from "../../../Character/CharacterType";
import { CharacterDescription } from "../../../Character/CharacterDescription";
import { VaginaWetness, VaginaLooseness, Vagina } from "../../../Body/Vagina";
import { StatusAffectType } from "../../../Effects/StatusAffectType";
import { BreastCup, BreastRow } from "../../../Body/BreastRow";
import { ButtLooseness, ButtWetness, ButtRating } from "../../../Body/Butt";
import { HipRating } from "../../../Body/Hips";
import { LegType } from "../../../Body/Legs";
import { Armor } from "../../../Items/Armors/Armor";
import { Weapon } from "../../../Items/Weapons/Weapon";
import { ArmorName } from "../../../Items/Armors/ArmorName";
import { WeaponName } from "../../../Items/Weapons/WeaponName";
import { randInt } from "../../../../Engine/Utilities/SMath";
import { Tail, TailType } from "../../../Body/Tail";

/**
 * ...
 * @author ...
 */
// public defeated(hpVictory: boolean) {
// 	game.swamp.femaleSpiderMorphScene.defeatASpiderBitch();
// }

// public won(hpVictory: boolean, pcCameWorms: boolean) {
// 	if (pcCameWorms) {
// 		DisplayText("\n\nThe spider flashes a predatory grin while she waits it out...");
// 		return { next: game.endLustLoss };
// 	} else {
// 		game.swamp.femaleSpiderMorphScene.loseToFemaleSpiderMorph();
// 	}
// }
export class FemaleSpiderMorph extends Character {
    public constructor() {
        super(CharacterType.FemaleSpiderMorph);
        this.description = new CharacterDescription(this, "the ", "female spider-morph", "The female spider-morph is completely nude, save for her thigh-high stockings and forearm-length gloves, which upon closer inspection, appear to be actually be part of her body - her exoskeleton.  Her exposed skin is pale as the full moon, save for the dusky skin of her nipples and the black-skinned delta of her sex.  Her breasts and ass are both full and well-rounded, and just above her ass-cheeks there's a bulbous spider-abdomen.  The spider-girl is currently eyeing you with a strange expression and her fangs bared.");
        this.torso.vaginas.add(new Vagina(VaginaWetness.DROOLING, VaginaLooseness.LOOSE, false));
        this.statusAffects.add(StatusAffectType.BonusVCapacity, 40, 0, 0, 0);
        this.torso.chest.add(new BreastRow(BreastCup.E_BIG));
        this.torso.butt.looseness = ButtLooseness.VIRGIN;
        this.torso.butt.wetness = ButtWetness.DRY;
        this.statusAffects.add(StatusAffectType.BonusACapacity, 30, 0, 0, 0);
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
        this.inventory.equipment.defaultArmorSlot.equip(new Armor("exoskeleton" as ArmorName, undefined, "exoskeleton", 14, 50));
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
