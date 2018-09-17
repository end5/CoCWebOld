import { Character } from "../../../Character/Character";
import { CharacterType } from "../../../Character/CharacterType";
import { randInt, randomChoice } from "../../../../Engine/Utilities/SMath";
import { CharacterDescription } from "../../../Character/CharacterDescription";
import { CockType, Cock } from "../../../Body/Cock";
import { Desc } from "../../../Descriptors/Descriptors";
import { BreastRow } from "../../../Body/BreastRow";
import { ButtLooseness, ButtWetness, ButtRating } from "../../../Body/Butt";
import { StatusAffectType } from "../../../Effects/StatusAffectType";
import { HipRating } from "../../../Body/Hips";
import { LegType } from "../../../Body/Legs";
import { SkinType } from "../../../Body/Skin";
import { FaceType } from "../../../Body/Face";
import { Armor } from "../../../Items/Armors/Armor";
import { ArmorName } from "../../../Items/Armors/ArmorName";
import { Weapon } from "../../../Items/Weapons/Weapon";
import { WeaponName } from "../../../Items/Weapons/WeaponName";
import { TailType, Tail } from "../../../Body/Tail";

/**
 * ...
 * @author Fake-Name
 */

// public defeated(hpVictory: boolean) {
// 	if (statusAffects.has(StatusAffectType.PhyllaFight)) {
// 		statusAffects.remove("PhyllaFight");
// 		DisplayText("You defeat a minotaur!  ", true);
// 		game.desert.antsScene.phyllaBeatAMino();
// 	} else {
// 		game.mountain.minotaurScene.minoVictoryRapeChoices();
// 	}
// }

// public won(hpVictory: boolean, pcCameWorms: boolean) {
// 	if (statusAffects.has(StatusAffectType.PhyllaFight)) {
// 		statusAffects.remove("PhyllaFight");
// 		game.desert.antsScene.phyllaPCLostToMino();
// 	} else if (pcCameWorms) {
// 		DisplayText("\n\nThe minotaur picks you up and forcibly tosses you from his cave, grunting in displeasure.");
// 		game.return { next: Scenes.camp.returnToCampUseOneHour };
// 	} else
// 		game.mountain.minotaurScene.getRapedByMinotaur();
// }

class MinotaurDescription extends CharacterDescription {
    public get long(): string {
        return "An angry-looking minotaur looms over you.  Covered in shaggy " + this.character.torso.neck.head.hair.color + " fur, the beast is an imposing sight.  Wearing little but an obviously distended loincloth, he is clearly already plotting his method of punishment.  Like most minotaurs he has hooves, a cow-like tail and face, prominent horns, and impressive musculature. " +
            (this.character.torso.balls.size > 4 ? ("  Barely visible below the tattered shreds of loincloth are " + Desc.Balls.describeBalls(true, true, this.character) + ", swollen with the minotaur's long pent-up need.") : "") +
            ((this.character as Minotaur).hasAxe ? "<b>This minotaur seems to have found a deadly looking axe somewhere!</b>" : "");
    }
}

export class Minotaur extends Character {
    public hasAxe: boolean;
    public constructor(axe: boolean = false) {
        super(CharacterType.Minotaur);
        // Most times they dont have an axe
        this.hasAxe = axe || randInt(3) === 0;
        const furColor: string = randomChoice("black", "brown");
        this.description = new MinotaurDescription(this, "the ", "minotaur", "");
        // this.plural = false;
        this.torso.cocks.add(new Cock(randInt(13) + 24, 2 + randInt(3), CockType.HORSE));
        this.torso.balls.quantity = 2;
        this.torso.balls.size = 2 + randInt(13);
        this.cumMultiplier = 1.5;
        this.hoursSinceCum = this.torso.balls.size * 10;
        this.torso.chest.add(new BreastRow(0));
        this.torso.butt.looseness = ButtLooseness.STRETCHED;
        this.torso.butt.wetness = ButtWetness.NORMAL;
        this.statusAffects.add(StatusAffectType.BonusACapacity, 30, 0, 0, 0);
        this.tallness = randInt(37) + 84;
        this.torso.hips.rating = HipRating.AVERAGE;
        this.torso.butt.rating = ButtRating.AVERAGE;
        this.torso.hips.legs.type = LegType.HOOFED;
        this.skin.tone = furColor;
        this.skin.type = SkinType.FUR;
        this.skin.desc = "shaggy fur";
        this.torso.neck.head.hair.color = furColor;
        this.torso.neck.head.hair.length = 3;
        this.baseStats.str = this.hasAxe ? 75 : 50;
        this.baseStats.tou = 60;
        this.baseStats.spe = 30;
        this.baseStats.int = 20;
        this.baseStats.lib = 40 + this.torso.balls.size * 2;
        this.baseStats.sens = 15 + this.torso.balls.size * 2;
        this.baseStats.cor = 35;
        this.torso.neck.head.face.type = FaceType.COW_MINOTAUR;
        this.inventory.equipment.defaultArmorSlot.equip(new Armor("thick fur" as ArmorName, undefined, "thick fur", 0));
        this.inventory.equipment.defaultWeaponSlot.equip(new Weapon("fist" as WeaponName, undefined, "fist", "punch", 0));
        if (this.hasAxe)
            this.inventory.equipment.equippedWeaponSlot.equip(new Weapon("axe" as WeaponName, undefined, "axe", "cleave", 0));
        this.baseStats.bonusHP = 20 + randInt(this.torso.balls.size * 2);
        this.baseStats.lust = this.torso.balls.size * 3;
        this.baseStats.lustVuln = this.hasAxe ? 0.84 : 0.87;
        // this.temperment = TEMPERMENT_LUSTY_GRAPPLES;
        this.baseStats.level = this.hasAxe ? 6 : 5;
        this.inventory.gems = randInt(5) + 5;
        // if (hasAxe) {
        //     this.drop = new WeightedDrop(consumables.MINOBLO, 1);
        // } else {
        //     this.drop = new ChainedDrop().add(consumables.MINOCUM, 1 / 5)
        //         .add(consumables.MINOBLO, 1 / 2)
        //         .elseDrop(null);
        // }
        // this.special1 = game.mountain.minotaurScene.minoPheromones;
        this.torso.tails.add(new Tail(TailType.COW));
    }
}
