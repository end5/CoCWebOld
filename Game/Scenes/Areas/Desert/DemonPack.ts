import { Character } from "../../../Character/Character";
import { CharacterType } from "../../../Character/CharacterType";
import { CharacterDescription } from "../../../Character/CharacterDescription";
import { User } from "../../../User";
import { Cock, CockType } from "../../../Body/Cock";
import { VaginaWetness, VaginaLooseness, Vagina } from "../../../Body/Vagina";
import { ButtLooseness, ButtWetness, ButtRating } from "../../../Body/Butt";
import { HipRating } from "../../../Body/Hips";
import { randInt } from "../../../../Engine/Utilities/SMath";
import { BreastRow } from "../../../Body/BreastRow";
import { Weapon } from "../../../Items/Weapons/Weapon";
import { WeaponName } from "../../../Items/Weapons/WeaponName";
import { Armor } from "../../../Items/Armors/Armor";
import { ArmorName } from "../../../Items/Armors/ArmorName";
import { HornType } from "../../../Body/Horns";
import { Tail, TailType } from "../../../Body/Tail";
import { NextScreenChoices } from "../../../ScreenDisplay";
import { CView } from "../../../../Engine/Display/ContentView";
import { describeLegs } from "../../../Descriptors/LegDescriptor";
import { StatusEffectType } from "../../../Effects/StatusEffectType";
import { returnToCampUseOneHour } from "../../Camp";
import { describeCocksLight } from "../../../Descriptors/CockDescriptor";
import { describeVagina } from "../../../Descriptors/VaginaDescriptor";
import { consolePhylla } from "./AntsScene";

function performCombatAction(player: Character): NextScreenChoices {
    // Demon pack has different AI
    if (randInt(2) === 0)
        special1();
    else special2();
}

export function defeated(player: Character, hpVictory: boolean, monster: Character): NextScreenChoices {
    if (hpVictory) {
        CView.clear().text("You strike out and the last of the demons tumbles to the ground with a thud. You stand there for a second surrounded by dead or unconscious demons feeling like a god of battle. Then you realize that if a god of battle does exist he lives on a demonic plane like this, so to avoid insulting him you take your hands off your hips and your " + describeLegs(player) + " off the head of the demon leader before you start to search the bodies.");
        player.stats.lust += 1;

    } else {
        CView.text("The demons stop attacking, and reach out to touch your body. Some are already masturbating like it's the only thing in the world and you know that right now, if you wanted to, you could make each and every one of them fuck you.");
    }
    if (monster.effects.has(StatusEffectType.PhyllaFight)) {
        return { next: consolePhylla };
    } else if (hpVictory) {
        return { next: returnToCampUseOneHour };
    } else {
        CView.clear().text("  Do you rape them?");
        return { yes: rapeDemons, no: returnToCampUseOneHour };
    }
}

function rapeDemons(player: Character): NextScreenChoices {
    CView.clear().text("You open your arms and step into the throng of eager demons. They jump eagerly to touch you, becoming more and more lust-frenzied every second. You take the nearest demon and throw it to the ground and without a moment's thought the rest of the group leap to join you in a thoughtless madness of lust...");
    return { next: oasisSexing };
}

export function won(player: Character, hpVictory: boolean, pcCameWorms: boolean): NextScreenChoices {
    if (player.gender === 0) {
        if (hpVictory) {
            CView.clear().text("You collapse before the demons, who laugh at your utter lack of male or female endowments, beating you until you pass out.");
        } else {
            CView.clear().text("You offer yourself to the demons, who promptly begin laughing at your lack of endowments.  They fall on you as one, beating you into unconsciousness.");
        }
        return { next: returnToCampUseOneHour };
    } else if (hpVictory) {
        CView.clear().text("The demons finally beat you down and you collapse onto the sand of the oasis. Almost immediately you feel demonic hands pressing and probing your prone form. You hear the leader of the group say something in a strange tongue but you have a feeling you know what it means. The demons dive onto your inert body with intent and begin to press themselves against you...");
        return { next: oasisSexing };
    } else {
        CView.clear().text("You struggle to keep your mind on the fight and fail to do so. ");
        if (pcCameWorms) {
            CView.text("\n\nThe demons joke and smile, obviously unconcerned with your state.\n\n");
        }
        if (player.body.cocks.length > 0) {
            if (player.body.cocks.length > 1) CView.text("Each of y");
            else CView.text("Y");
            CView.text("our " + describeCocksLight(player) + " throbs ");
            if (player.body.vaginas.length > 0) CView.text(" and your ");
        }
        if (player.body.vaginas.length > 0) {
            if (player.body.cocks.length <= 0) CView.text("Your ");
            CView.text(describeVagina(player, player.body.vaginas.get(0)) + " burns ");
        }
        CView.text("with arousal.  You make a grab for the nearest demon and catch a handful of jiggly breast. You try desperately to use your other arm to pull her closer to slake your thirst but you both go tumbling to the ground. The demonic leader laughs out loud and the rest of the tribe falls on you, grabbing for anything it can find.");
        return { next: oasisSexing };
    }
}

export function teased(player: Character, lustDelta: number): NextScreenChoices {
    CView.text("\n");
    if (lustDelta === 0) CView.text("\n" + this.desc.a + this.desc.short + " seems unimpressed.");
    else if (lustDelta > 0 && lustDelta < 5) CView.text("The demons lessen somewhat in the intensity of their attack, and some even eye up your assets as they strike at you.");
    else if (lustDelta >= 5 && lustDelta < 10) CView.text("The demons are obviously steering clear from damaging anything you might use to fuck and they're starting to leave their hands on you just a little longer after each blow. Some are starting to cop quick feels with their other hands and you can smell the demonic lust of a dozen bodies on the air.");
    else if (lustDelta >= 10) CView.text("The demons are less and less willing to hit you and more and more willing to just stroke their hands sensuously over you. The smell of demonic lust is thick on the air and part of the group just stands there stroking themselves openly.");
    applyTease(lustDelta);
}

export class DemonPack extends Character {
    constructor() {
        super(CharacterType.DemonPack);
        this.description = new CharacterDescription(this, "the ", "demons", "The group is composed of roughly twenty tan-skinned demons, mostly humanoid in shape with many and varied corruptions across the mob. You see demonic high heels, twisting horns and swinging cocks of all shapes and sizes. There even seems to be a bull head in there somewhere. You also make out plenty of breasts ranging from tiny ones to a pair that requires a second person to carry them, and with those breasts a wide range of pussies, dripping and dry, sometimes nestled below some form of demonic dick.  The small tribe carries no weapons and what little clothing they wear is well-shredded, except for one hefty male wearing a cloak of what appears to be snakeskin across his broad shoulders." + (User.settings.silly() ? "  You spot an odd patch that reads, \"<i>41st Engineer Company: Vaginal Clearance</i>\" on his shoulder." : ""), true);
        this.body.cocks.add(new Cock(CockType.DEMON, 18, 2));
        this.body.cocks.add(new Cock(CockType.DEMON, 18, 2));
        this.body.balls.count = 2;
        this.body.balls.size = 1;
        this.body.cumMultiplier = 3;
        // this.hoursSinceCum = 0;
        this.body.vaginas.add(new Vagina(VaginaWetness.SLICK, VaginaLooseness.LOOSE, false));
        this.body.chest.add(new BreastRow(0));
        this.body.butt.looseness = ButtLooseness.STRETCHED;
        this.body.butt.wetness = ButtWetness.SLIME_DROOLING;
        this.body.tallness = randInt(8) + 70;
        this.body.hips.rating = HipRating.AMPLE + 2;
        this.body.butt.rating = ButtRating.LARGE;
        this.body.skin.tone = "red";
        this.body.hair.color = "black";
        this.body.hair.length = 15;
        this.baseStats.str = 80;
        this.baseStats.tou = 10;
        this.baseStats.spe = 10;
        this.baseStats.int = 5;
        this.baseStats.lib = 50;
        this.baseStats.sens = 60;
        this.baseStats.cor = 80;
        this.inventory.equipment.defaultWeaponSlot.equip(new Weapon("claws" as WeaponName, undefined, "claws", "claw", 0));
        this.inventory.equipment.defaultArmorSlot.equip(new Armor("demonic skin" as ArmorName, undefined, "demonic skin", 0));
        this.baseStats.bonusHP = 200;
        this.baseStats.lust = 30;
        // this.temperment = TEMPERMENT_LOVE_GRAPPLES;
        this.baseStats.level = 6;
        this.inventory.gems = randInt(25) + 10;
        // this.drop = new WeightedDrop().addMany(1,
        //     consumables.SUCMILK,
        //     consumables.INCUBID,
        //     consumables.OVIELIX,
        //     consumables.B__BOOK);
        // this.special1 = game.packAttack;
        // this.special2 = game.lustAttack;
        this.body.tails.add(new Tail(TailType.DEMONIC));
        this.body.neck.head.horns.type = HornType.DEMON;
        this.body.neck.head.horns.amount = 2;
    }
}
