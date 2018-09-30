import { Character } from "../../../Character/Character";
import { randInt } from "../../../../Engine/Utilities/SMath";
import { StatusEffectType } from "../../../Effects/StatusEffectType";
import { CharacterDescription } from "../../../Character/CharacterDescription";
import { User } from "../../../User";
import { Cock, CockType } from "../../../Body/Cock";
import { BreastRow } from "../../../Body/BreastRow";
import { ButtLooseness, ButtWetness, ButtRating } from "../../../Body/Butt";
import { HipRating } from "../../../Body/Hips";
import { Weapon } from "../../../Items/Weapons/Weapon";
import { WeaponName } from "../../../Items/Weapons/WeaponName";
import { Armor } from "../../../Items/Armors/Armor";
import { ArmorName } from "../../../Items/Armors/ArmorName";
import { Tail, TailType } from "../../../Body/Tail";
import { NextScreenChoices } from "../../../ScreenDisplay";
import { CView } from "../../../../Engine/Display/ContentView";
import { SpriteName } from "../../../../Engine/Display/Images/SpriteName";
import { combatEvade, combatFlexibility } from "../../../Combat/CombatUtils";
import { MonsterToPlayerTease } from "../../../Character/Player/CombatActions/MonsterToPlayerTease";

export function sandTrapWait(player: Character): NextScreenChoices {
    CView.clear();
    CView.sprite(SpriteName.SandTrap); // 97;
    if (!monster.effects.has(StatusEffectType.Climbed))
        monster.effects.add(StatusEffectType.Climbed, 0, 0, 0, 0);
    CView.text("Instead of attacking, you turn away from the monster and doggedly attempt to climb back up the pit, digging all of your limbs into the soft powder as you climb against the sandslide.");
    if (trapLevel() === 4) {
        CView.text("\n\nYou eye the ground above you.  The edge of the pit is too sheer, the ground too unstable... although it looks like you can fight against the currents carrying you further down, it seems impossible to gain freedom with the sand under the monster's spell.");
    }
    else {
        // Strength check success: [Player goes up one level, does not go down a level this turn]
        if (player.stats.str / 10 + randInt(20) > 10) {
            CView.text("\n\nSweat beads your forehead - trying to clamber out of this pit is like running against the softest treadmill imaginable.  Nonetheless, through considerable effort you see you've managed to pull further clear of the sandtrap's grasp.  \"<i>Watching you squirm around like that gets me so hot,</i>\" it calls up to you.  Turning around you see that the creature is rubbing its hands all over its lean body whilst watching you struggle.  \"<i>Such an energetic little mating dance, just for me... mmm, prey who do that are always the best!</i>\"");
            trapLevel(2);
        }
        else {
            // Strength check fail:  [Player goes down as normal]
            CView.text("\n\nSweat beads your forehead - trying to clamber out of this pit is like running against the softest treadmill imaginable.  You feel like you're going to burst and you eventually give up, noting wearily that you've managed to get nowhere. \"<i>Watching you squirm around like that gets me so hot,</i>\" the sandtrap calls to you.  Turning around you see that the creature is rubbing its hands all over its lean body whilst watching you struggle.  \"<i>Such an energetic little mating dance, just for me... mmm, prey who do that are always the best!</i>\"");
            trapLevel(1);
        }
    }
    CView.text("\n\n");
    doAI();
    // combatRoundOver();
}

export function trapLevel(adjustment: number = 0): number {
    if (findStatusAffect(StatusEffectType.Level) < 0) createStatusAffect(StatusEffectType.Level, 4, 0, 0, 0);
    if (adjustment !== 0) {
        addStatusValue(StatusEffectType.Level, 1, adjustment);
        // Keep in bounds ya lummox
        if (statusAffectv1(StatusEffectType.Level) < 1) changeStatusValue(StatusEffectType.Level, 1, 1);
        if (statusAffectv1(StatusEffectType.Level) > 4) changeStatusValue(StatusEffectType.Level, 1, 4);
    }
    return statusAffectv1(StatusEffectType.Level);
}

// sandtrap pheromone attack:
function sandTrapPheremones(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.SandTrap); // 97;
    CView.text("The sandtrap puckers its lips.  For one crazed moment you think it's going to blow you a kiss... but instead it spits clear fluid at you!   You desperately try to avoid it, even as your lower half is mired in sand.");
    if (player.stats.spe / 10 + randInt(20) > 10 || combatEvade() || combatFlexibility()) {
        CView.text("  Moving artfully with the flow rather than against it, you are able to avoid the trap's fluids, which splash harmlessly into the dune.");
    }
    else {
        let damage: number = (10 + player.stats.lib / 10);
        CView.text("  Despite ducking away from the jet of fluid as best you can, you cannot avoid some of the stuff splashing upon your arms and face.  The substance feels oddly warm and oily, and though you quickly try to wipe it off it sticks resolutely to your skin and the smell hits your nose.  Your heart begins to beat faster as warmth radiates out from it; you feel languid, light-headed and sensual, eager to be touched and led by the hand to a sandy bed...  Shaking your head, you try to stifle what the foreign pheromones are making you feel.");
        player.stats.lust += damage;

        damage = Math.round(damage * lustPercent() / 10) / 10;
        CView.text(" (" + damage + " lust)");
    }
}

// sandtrap quicksand attack:
function nestleQuikSandAttack(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.SandTrap); // 97;
    CView.text("The sandtrap smiles at you winningly as it thrusts its hands into the sifting granules.  The sand beneath you suddenly seems to lose even more of its density; you're sinking up to your thighs!");
    // Quicksand attack fail:
    if (player.stats.spe / 10 + randInt(20) > 10 || combatEvade() || combatFlexibility()) {
        CView.text("  Acting with alacrity, you manage to haul yourself free of the area affected by the sandtrap's spell, and set yourself anew.");
    }
    // Quicksand attack success: (Speed and Strength loss, ability to fly free lost)
    else {
        CView.text("  You can't get free in time and in a panic you realize you are now practically wading in sand.  Attempting to climb free now is going to be very difficult.");
        if (player.canFly()) CView.text("  You try to wrench yourself free by flapping your wings, but it is hopeless.  You are well and truly snared.");
        trapLevel(-1);
        if (findStatusAffect(StatusEffectType.Climbed) < 0) createStatusAffect(StatusEffectType.Climbed, 0, 0, 0, 0);
    }
}

function performCombatAction(player: Character): NextScreenChoices {
    if (findStatusAffect(StatusEffectType.Level) >= 0) {
        if (trapLevel() === 4 && findStatusAffect(StatusEffectType.Climbed) < 0) return nestleQuikSandAttack(player);
        else return sandTrapPheremones(player);
        // PC sinks a level (end of any turn in which player didn't successfully \"<i>Wait</i>\"):
        if (findStatusAffect(StatusEffectType.Climbed) < 0) {
            CView.text("\n\nRivulets of sand run past you as you continue to sink deeper into both the pit and the sand itself.");
            trapLevel(-1);
        }
        else removeStatusAffect(StatusEffectType.Climbed);
        combatRoundOver();
    } else super.performCombatAction(player);
}

export function defeated(player: Character, hpVictory: boolean): NextScreenChoices {
    desert.sandTrapScene.pcBeatsATrap();
}

export function won(player: Character, hpVictory: boolean, pcCameWorms: boolean): NextScreenChoices {
    if (pcCameWorms) {
        CView.text("\n\nThe sand trap seems bemused by the insects your body houses...");
        return { next: endLustLoss };
    } else {
        desert.sandTrapScene.sandtrapmentLoss(true);
    }
}

export class SandTrap extends Character {
    public SandTrap() {
        // 1/3 have fertilized eggs!
        if (randInt(3) === 0) this.effects.add(StatusEffectType.Fertilized, 0, 0, 0, 0);
        this.description = new CharacterDescription(this, "the ", User.settings.silly() ? "sand tarp" : "sandtrap", "You are fighting the sandtrap.  It sits half buried at the bottom of its huge conical pit, only its lean human anatomy on show, leering at you from beneath its shoulder length black hair with its six equally sable eyes.  You cannot say whether its long, soft face with its pointed chin is very pretty or very handsome - every time the creature's face moves, its gender seems to shift.  Its lithe, brown flat-chested body supports four arms, long fingers playing with the rivulets of powder sand surrounding it.  Beneath its belly you occasionally catch glimpses of its insect half: a massive sand-coloured abdomen which anchors it to the desert, with who knows what kind of anatomy.");
        this.body.cocks.add(new Cock(10, 2));
        this.body.balls.count = 2;
        this.body.balls.size = 4;
        this.body.cumMultiplier = 3;
        // this.hoursSinceCum = 0;
        this.body.chest.add(new BreastRow(0));
        this.body.butt.looseness = ButtLooseness.NORMAL;
        this.body.butt.wetness = ButtWetness.DRY;
        this.body.tallness = randInt(8) + 150;
        this.body.hips.rating = HipRating.AMPLE + 2;
        this.body.butt.rating = ButtRating.LARGE;
        this.body.skin.tone = "fair";
        this.body.hair.color = "black";
        this.body.hair.length = 15;
        this.baseStats.str = 55;
        this.baseStats.tou = 10;
        this.baseStats.spe = 45;
        this.baseStats.int = 55;
        this.baseStats.lib = 60;
        this.baseStats.sens = 45;
        this.baseStats.cor = 50;
        this.inventory.equipment.defaultWeaponSlot.equip(new Weapon("claws" as WeaponName, undefined, "claws", "claw", 10));
        this.inventory.equipment.defaultArmorSlot.equip(new Armor("chitin" as ArmorName, undefined, "chitin", 20));
        this.baseStats.bonusHP = 100;
        this.baseStats.lust = 20;
        this.baseStats.lustVuln = .55;
        // this.temperment = TEMPERMENT_LOVE_GRAPPLES;
        this.baseStats.level = 4;
        this.inventory.gems = 2 + randInt(5);
        // this.drop = new ChainedDrop(consumables.TRAPOIL).add(consumables.OVIELIX, 1 / 3);
        this.body.tails.add(new Tail(TailType.DEMONIC));
        this.effects.add(StatusEffectType.Level, 4, 0, 0, 0);
    }
}
