import { Character } from "../../../Character/Character";
import { CharacterDescription } from "../../../Character/CharacterDescription";
import { Cock, CockType } from "../../../Body/Cock";
import { Vagina, VaginaLooseness, VaginaWetness, VaginaType } from "../../../Body/Vagina";
import { BreastRow, BreastCup } from "../../../Body/BreastRow";
import { ButtLooseness, ButtWetness, ButtRating } from "../../../Body/Butt";
import { randInt } from "../../../../Engine/Utilities/SMath";
import { HipRating } from "../../../Body/Hips";
import { Weapon } from "../../../Items/Weapons/Weapon";
import { WeaponName } from "../../../Items/Weapons/WeaponName";
import { ArmorName } from "../../../Items/Armors/ArmorName";
import { Armor } from "../../../Items/Armors/Armor";
import { CharacterType } from "../../../Character/CharacterType";
import { StatusEffectType } from "../../../Effects/StatusEffectType";

function performCombatAction() {
    cumWitchAI();
}

function defeated(hpVictory: boolean) {
    cumWitchDefeated();
}

function won(hpVictory: boolean, pcCameWorms: boolean) {
    defeatedByCumWitch();
}

export class CumWitch extends Character {
    public constructor() {
        super(CharacterType.CumWitch);
        this.description = new CharacterDescription(this, "the ", "Cum Witch", "The Cum Witch is a moderately tall woman, almost six feet in height.  Her dark ebony skin is nearly as black as pitch, though it glitters with sweat from her recent sexual activities and the fight.  She has plump lips and long, smooth blonde hair, though much of it is hidden behind a pointed, wide-brimmed hat.  Her robes are even blacker than she is, but she wields an alabaster staff that fairly sizzles with magical might.  Of course, her garments don't do much to conceal her gigantic breasts.  Though there are only two, they're large enough to dwarf the four tits most sand witches are packing.");
        this.body.cocks.add(new Cock(12, 2, CockType.HUMAN));
        this.body.balls.count = 0;
        this.body.balls.size = 0;
        this.body.cumMultiplier = 3;
        this.hoursSinceCum = 20;
        this.body.vaginas.add(new Vagina(VaginaWetness.WET, VaginaLooseness.LOOSE, false));
        this.effects.add(StatusEffectType.BonusVCapacity, 20, 0, 0, 0);
        this.body.chest.add(new BreastRow(BreastCup.E));
        this.body.butt.looseness = ButtLooseness.TIGHT;
        this.body.butt.wetness = ButtWetness.NORMAL;
        this.body.tallness = randInt(12) + 55;
        this.body.hips.rating = HipRating.CURVY;
        this.body.butt.rating = ButtRating.LARGE;
        this.body.skin.tone = "black";
        this.body.hair.color = "sandy-blonde";
        this.body.hair.length = 15;
        this.baseStats.str.value = 35;
        this.baseStats.tou.value = 35;
        this.baseStats.spe.value = 35;
        this.baseStats.int.value = 85;
        this.baseStats.lib.value = 55;
        this.baseStats.sens.value = 40;
        this.baseStats.cor.value = 30;
        this.inventory.equipment.defaultWeaponSlot.equip(new Weapon("fists" as WeaponName, undefined, "", "punches", 0));
        this.inventory.equipment.defaultArmorSlot.equip(new Armor("robes" as ArmorName, undefined, "robes", 0));
        this.baseStats.bonusHP = 100;
        this.baseStats.lust.value = 30;
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
