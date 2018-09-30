import { Character } from "../../../Character/Character";
import { CharacterType } from "../../../Character/CharacterType";
import { CharacterDescription } from "../../../Character/CharacterDescription";
import { Vagina, VaginaWetness, VaginaLooseness } from "../../../Body/Vagina";
import { StatusEffectType } from "../../../Effects/StatusEffectType";
import { BreastRow, BreastCup } from "../../../Body/BreastRow";
import { ButtLooseness, ButtWetness, ButtRating } from "../../../Body/Butt";
import { HipRating } from "../../../Body/Hips";
import { LegType } from "../../../Body/Legs";
import { Weapon } from "../../../Items/Weapons/Weapon";
import { WeaponName } from "../../../Items/Weapons/WeaponName";
import { Armor } from "../../../Items/Armors/Armor";
import { ArmorName } from "../../../Items/Armors/ArmorName";
import { randInt } from "../../../../Engine/Utilities/SMath";
import { NextScreenChoices } from "../../../ScreenDisplay";
import { CView } from "../../../../Engine/Display/ContentView";
import { StatusEffectType } from "../../../Effects/StatusEffectType";
import { PerkType } from "../../../Effects/PerkType";
import { returnToCampUseOneHour } from "../../Camp";

// 2a)  Ability -  Poison Bite - poisons player
function nagaPoisonBiteAttack(player: Character): NextScreenChoices {
    // (Deals damage over 4-5 turns, invariably reducing
    // your speed. It wears off once combat is over.)
    CView.text("The naga strikes with the speed of a cobra, sinking her fangs into your flesh!  ");
    if (!player.effects.has(StatusEffectType.NagaVenom)) {
        CView.text("The venom's effects are almost instantaneous; your vision begins to blur and it becomes increasingly harder to stand.");
        if (player.stats.spe > 4) {
            player.stats.spe -= 3;
            player.effects.add(StatusEffectType.NagaVenom, 3, 0, 0, 0);
        }
        else {
            player.effects.add(StatusEffectType.NagaVenom, 0, 0, 0, 0);
            player.takeDamage(5 + randInt(5));
        }
        player.takeDamage(5 + randInt(5));
    }
    else {
        CView.text("The venom's effects intensify as your vision begins to blur and it becomes increasingly harder to stand.");
        if (player.stats.spe > 3) {
            player.stats.spe -= 2;
            player.effects.get(StatusEffectType.NagaVenom).value1 += 2;
        }
        else player.takeDamage(5 + randInt(5));
        player.takeDamage(5 + randInt(5));
    }
    combatRoundOver();
}

// 2b)  Ability - Constrict - entangles player, raises lust
// every turn until you break free
function nagaConstrict(player: Character): NextScreenChoices {
    CView.text("The naga draws close and suddenly wraps herself around you, binding you in place! You can't help but feel strangely aroused by the sensation of her scales rubbing against your body. All you can do is struggle as she begins to squeeze tighter!");
    player.effects.add(StatusEffectType.NagaBind, 0, 0, 0, 0);
    player.takeDamage(2 + randInt(4));
    combatRoundOver();
}

// 2c) Abiliy - Tail Whip - minus ??? HP
// (base it on toughness?)
function nagaTailWhip(player: Character): NextScreenChoices {
    CView.text("The naga tenses and twists herself forcefully.  ");
    // [if evaded]
    if ((player.perks.has(PerkType.Evade) && randInt(6) === 0)) {
        CView.text("You see her tail whipping toward you and evade it at the last second. You quickly roll back onto your feet.");
    }
    else if (player.perks.has(PerkType.Misdirection) && randInt(100) < 10 && player.inventory.equipment.armor.displayName === "red, high-society bodysuit") {
        CView.text("Using Raphael's teachings and the movement afforded by your bodysuit, you anticipate and sidestep " + this.desc.a + this.desc.short + "'s tail-whip.");
    }
    else if (player.stats.spe > randInt(300)) {
        CView.text("You see her tail whipping toward you and jump out of the way at the last second. You quickly roll back onto your feet.");
    }
    else {
        CView.text("Before you can even think, you feel a sharp pain at your side as the naga's tail slams into you and shoves you into the sands. You pick yourself up, wincing at the pain in your side.");
        let damage: number = 10;
        if (player.combat.stats.defense() < 10) damage += 10 - player.combat.stats.defense();
        damage += randInt(3);
        damage = player.takeDamage(damage);
        CView.text(" (" + damage + ")");
    }
    combatRoundOver();
}

export function defeated(player: Character, hpVictory: boolean): NextScreenChoices {
    nagaRapeChoice();
}

export function won(player: Character, hpVictory: boolean, pcCameWorms: boolean): NextScreenChoices {
    if (pcCameWorms) {
        CView.text("\n\nThe naga's eyes go wide and she turns to leave, no longer interested in you.");
        player.orgasm();
        return { next: returnToCampUseOneHour };
    } else {
        nagaFUCKSJOOOOOO();
    }
}

export class Naga extends Character {
    public constructor() {
        super(CharacterType.Naga);
        this.description = new CharacterDescription(this, "the ", "naga", "You are fighting a naga. She resembles a beautiful and slender woman from the waist up, with dark hair hanging down to her neck. Her upper body is deeply tanned, while her lower body is covered with shiny scales, striped in a pattern reminiscent of the dunes around you. Instead of bifurcating into legs, her hips elongate into a snake's body which stretches far out behind her, leaving a long and curving trail in the sand.  She's completely naked, with her round C-cup breasts showing in plain sight. In her mouth you can see a pair of sharp, poisonous fangs and a long forked tongue moving rapidly as she hisses at you.");
        this.body.vaginas.add(new Vagina(VaginaWetness.SLAVERING, VaginaLooseness.NORMAL, false));
        this.effects.add(StatusEffectType.BonusVCapacity, 40, 0, 0, 0);
        this.body.chest.add(new BreastRow(BreastCup.C));
        this.body.butt.looseness = ButtLooseness.TIGHT;
        this.body.butt.wetness = ButtWetness.DRY;
        this.effects.add(StatusEffectType.BonusACapacity, 10, 0, 0, 0);
        this.body.tallness = 5 * 12 + 10;
        this.body.hips.rating = HipRating.AMPLE + 2;
        this.body.butt.rating = ButtRating.LARGE;
        this.body.legs.type = LegType.NAGA;
        this.body.skin.tone = "mediterranean-toned";
        this.body.hair.color = "brown";
        this.body.hair.length = 16;
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
