import { Character } from "../../../Character/Character";
import { CharacterDescription } from "../../../Character/CharacterDescription";
import { Cock, CockType } from "../../../Body/Cock";
import { Vagina, VaginaLooseness, VaginaWetness, VaginaType } from "../../../Body/Vagina";
import { StatusAffectType } from "../../../Effects/StatusAffectType";
import { BreastRow, BreastCup } from "../../../Body/BreastRow";
import { ButtLooseness, ButtWetness, ButtRating } from "../../../Body/Butt";
import { randInt } from "../../../../Engine/Utilities/SMath";
import { HipRating } from "../../../Body/Hips";
import { Weapon } from "../../../Items/Weapons/Weapon";
import { WeaponName } from "../../../Items/Weapons/WeaponName";
import { ArmorName } from "../../../Items/Armors/ArmorName";
import { Armor } from "../../../Items/Armors/Armor";
import { CharacterType } from "../../../Character/CharacterType";

// override protected performCombatAction() {
//     game.cumWitchAI();
// }

// public defeated(hpVictory: boolean) {
//     game.cumWitchDefeated();
// }

// public won(hpVictory: boolean, pcCameWorms: boolean) {
//     game.defeatedByCumWitch();
// }

export class CumWitch extends Character {
    public constructor() {
        super(CharacterType.CumWitch);
        this.description = new CharacterDescription(this, "the ", "Cum Witch", "The Cum Witch is a moderately tall woman, almost six feet in height.  Her dark ebony skin is nearly as black as pitch, though it glitters with sweat from her recent sexual activities and the fight.  She has plump lips and long, smooth blonde hair, though much of it is hidden behind a pointed, wide-brimmed hat.  Her robes are even blacker than she is, but she wields an alabaster staff that fairly sizzles with magical might.  Of course, her garments don't do much to conceal her gigantic breasts.  Though there are only two, they're large enough to dwarf the four tits most sand witches are packing.");
        this.torso.cocks.add(new Cock(12, 2, CockType.HUMAN));
        this.torso.balls.quantity = 0;
        this.torso.balls.size = 0;
        this.cumMultiplier = 3;
        this.hoursSinceCum = 20;
        this.torso.vaginas.add(new Vagina(VaginaWetness.WET, VaginaLooseness.LOOSE, false));
        this.statusAffects.add(StatusAffectType.BonusVCapacity, 20, 0, 0, 0);
        this.torso.chest.add(new BreastRow(BreastCup.E));
        this.torso.butt.looseness = ButtLooseness.TIGHT;
        this.torso.butt.wetness = ButtWetness.NORMAL;
        this.tallness = randInt(12) + 55;
        this.torso.hips.rating = HipRating.CURVY;
        this.torso.butt.rating = ButtRating.LARGE;
        this.skin.tone = "black";
        this.torso.neck.head.hair.color = "sandy-blonde";
        this.torso.neck.head.hair.length = 15;
        this.baseStats.str = 35;
        this.baseStats.tou = 35;
        this.baseStats.spe = 35;
        this.baseStats.int = 85;
        this.baseStats.lib = 55;
        this.baseStats.sens = 40;
        this.baseStats.cor = 30;
        this.inventory.equipment.defaultWeaponSlot.equip(new Weapon("fists" as WeaponName, undefined, "", "punches", 0));
        this.inventory.equipment.defaultArmorSlot.equip(new Armor("robes" as ArmorName, undefined, "robes", 0));
        this.baseStats.bonusHP = 100;
        this.baseStats.lust = 30;
        this.baseStats.lustVuln = .8;
        // this.temperment = TEMPERMENT_RANDOM_GRAPPLES;
        this.baseStats.level = 6;
        this.inventory.gems = randInt(15) + 5;
        // this.drop = new WeightedDrop().addMany(1,
        //     consumables.TSCROLL,
        //     consumables.OVIELIX,
        //     consumables.LACTAID,
        //     consumables.LABOVA_,
        //     consumables.W__BOOK,
        //     consumables.B__BOOK,
        //     null);
    }
}
