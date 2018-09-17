import { DisplayText } from '../../../../../Engine/display/DisplayText';
import { randInt } from '../../../../../Engine/Utilities/SMath';
import { BreastRow } from '../../../../Body/BreastRow';
import { EarType } from '../../../../Body/Ears';
import { Tail, TailType } from '../../../../Body/Tail';
import { CombatAction } from '../../../../Combat/Actions/CombatAction';
import { Desc } from '../../../../Descriptors/Descriptors';
import { CombatEffectType } from '../../../../Effects/CombatEffectType';
import { PerkType } from '../../../../Effects/PerkType';
import { StatusAffectType } from '../../../../Effects/StatusAffectType';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Character } from '../../../Character';

export class Run implements CombatAction {
    public name: string = "Run";
    public reasonCannotUse: string = "";

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, target?: Character): boolean {
        return true;
    }

    public use(character: Character, target: Character): NextScreenChoices {
        DisplayText().clear();
        if (character.combat.effects.has(CombatEffectType.Sealed) && character.combat.effects.get(CombatEffectType.Sealed).value2 === 4) {
            DisplayText("You try to run, but you just can't seem to escape.  <b>Your ability to run was sealed, and now you've wasted a chance to attack!</b>\n\n");
            return;
        }
        // Rut doesnt let you run from dicks.
        if (character.statusAffects.has(StatusAffectType.Rut) && target.torso.cocks.count > 0) {
            DisplayText("The thought of another male in your area competing for all the pussy infuriates you!  No way will you run!");
            return;
        }/*
        if(monster.combat.effects.has(CombatEffectType.Level) && character.canFly()) {
            DisplayText().clear();
            DisplayText("You flex the muscles in your back and, shaking clear of the sand, burst into the air!  Wasting no time you fly free of the sandtrap and its treacherous pit.  \"One day your wings will fall off, little ant,\" the snarling voice of the thwarted androgyne carries up to you as you make your escape.  \"And I will be waiting for you when they do!\"");
            Game.inCombat = false;
            clearStatuses(false);
            return { next: Game.camp.returnToCampUseOneHour };
            return;
        }*/
        // if (monster.combat.effects.has(CombatEffectType.GenericRunDisabled) || urtaQuest.isUrta()) {
        //     DisplayText("You can't escape from this fight!");
        //     return;
        // }
        if (target.combat.effects.has(CombatEffectType.Level) && target.combat.effects.get(CombatEffectType.Level).value1 < 4) {
            DisplayText("You're too deeply mired to escape!  You'll have to <b>climb</b> some first!");
            return;
        }
        if (target.combat.effects.has(CombatEffectType.RunDisabled)) {
            DisplayText("You'd like to run, but you can't scale the walls of the pit with so many demonic hands pulling you down!");
            return;
        }/*
        if(flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00329] === 1 && (monster.short === "minotaur gang" || monster.short === "minotaur tribe")) {
            flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00329] = 0;
            //(Free run away)
            DisplayText("You slink away while the pack of brutes is arguing.  Once they finish that argument, they'll be sorely disappointed!", true);
            inCombat = false;
            clearStatuses(false);
            return { next: Game.camp.returnToCampUseOneHour };
            return;
        }*/
        else if (target.desc.short === "minotaur tribe" && target.combat.stats.HPRatio() >= 0.75) {
            DisplayText("There's too many of them surrounding you to run!");
            return;
        }
        // if (inDungeon || inRoomedDungeon) {
        //     DisplayText("You're trapped in your foe's home turf - there is nowhere to run!\n\n");
        //     return;
        // }
        // Attempt texts!
        if (target.desc.short === "Ember") {
            DisplayText("You take off");
            if (!character.canFly())
                DisplayText(" running");
            else
                DisplayText(", flapping as hard as you can");
            DisplayText(", and Ember, caught up in the moment, gives chase.  ");
        }
        else if (character.canFly()) DisplayText("Gritting your teeth with effort, you beat your wings quickly and lift off!  ");
        // Nonflying PCs
        else {
            // Stuck!
            if (character.combat.effects.has(CombatEffectType.NoFlee)) {
                if (target.desc.short === "goblin")
                    DisplayText("You try to flee but get stuck in the sticky white goop surrounding you.\n\n");
                else
                    DisplayText("You put all your skills at running to work and make a supreme effort to escape, but are unable to get away!\n\n");
                return;
            }
            // Nonstuck!
            else DisplayText("You turn tail and attempt to flee!  ");
        }

        // Calculations
        let escapeMod: number = 20 + target.stats.level * 3;
        // if(debug) escapeMod -= 300;
        if (character.canFly()) escapeMod -= 20;
        if (
            character.torso.tails.reduce(Tail.HasType(TailType.RACCOON), false) &&
            character.torso.neck.head.ears.type === EarType.RACCOON &&
            character.perks.has(PerkType.Runner)
        )
            escapeMod -= 25;

        // Big tits doesn't matter as much if ya can fly!
        else {
            if (character.torso.chest.count > 0) {
                const largestBreastSize: number = character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating;
                if (largestBreastSize >= 35) escapeMod += 5;
                if (largestBreastSize >= 66) escapeMod += 10;
            }
            if (character.torso.hips.rating >= 20) escapeMod += 5;
            if (character.torso.butt.rating >= 20) escapeMod += 5;
            if (character.torso.balls.quantity > 0) {
                if (character.torso.balls.size >= 24) escapeMod += 5;
                if (character.torso.balls.size >= 48) escapeMod += 10;
                if (character.torso.balls.size >= 120) escapeMod += 10;
            }
        }

        // ANEMONE OVERRULES NORMAL RUN
        // if (monster.desc.short === "anemone") {
        //     // Autosuccess - less than 60 lust
        //     if (character.stats.lust < 60) {
        //         DisplayText("Marshalling your thoughts, you frown at the strange girl and turn to march up the beach.  After twenty paces inshore you turn back to look at her again.  The anemone is clearly crestfallen by your departure, pouting heavily as she sinks beneath the water's surface.");
        //         return;
        //     }
        //     // Speed dependent
        //     else {
        //         // Success
        //         if (character.stats.spe > randInt(monster.stats.spe + escapeMod)) {
        //             DisplayText("Marshalling your thoughts, you frown at the strange girl and turn to march up the beach.  After twenty paces inshore you turn back to look at her again.  The anemone is clearly crestfallen by your departure, pouting heavily as she sinks beneath the water's surface.");
        //             return;
        //         }
        //         // Run failed:
        //         else {
        //             DisplayText("You try to shake off the fog and run but the anemone slinks over to you and her tentacles wrap around your waist.  <i>\"Stay?\"</i> she asks, pressing her small breasts into you as a tentacle slides inside your " + character.inventory.equipment.armor.displayName + " and down to your nethers.  The combined stimulation of the rubbing and the tingling venom causes your knees to buckle, hampering your resolve and ending your escape attempt.");
        //             // (gain lust, temp lose spd/str)
        //             (monster as Anemone).applyVenom((4 + character.stats.sens / 20));
        //             return;
        //         }
        //     }
        // }
        // Ember is SPUCIAL
        if (target.desc.short === "Ember") {
            // GET AWAY
            if (character.stats.spe > randInt(target.stats.spe + escapeMod) || (character.perks.has(PerkType.Runner) && randInt(100) < 50)) {
                if (character.perks.has(PerkType.Runner))
                    DisplayText("Using your skill at running, y");
                else
                    DisplayText("Y");
                DisplayText("ou easily outpace the dragon, who begins hurling imprecations at you.  \"What the hell, [name], you weenie; are you so scared that you can't even stick out your punishment?\"");
                DisplayText("\n\nNot to be outdone, you call back, \"Sucks to you!  If even the mighty Last Ember of Hope can't catch me, why do I need to train?  Later, little bird!\"");
            }
            // Fail:
            else {
                DisplayText("Despite some impressive jinking, " + target.desc.subjectivePronoun + " catches you, tackling you to the ground.\n\n");
            }
            return;
        }
        // SUCCESSFUL FLEE
        if (character.stats.spe > randInt(target.stats.spe + escapeMod)) {
            // Fliers flee!
            if (character.canFly())
                DisplayText(target.desc.capitalA + target.desc.short + " can't catch you.");
            // sekrit benefit: if you have coon ears, coon tail, and Runner perk, change normal Runner escape to flight-type escape
            else if (character.torso.tails.reduce(Tail.HasType(TailType.RACCOON), false) && character.torso.neck.head.ears.type === EarType.RACCOON && character.perks.has(PerkType.Runner)) {
                DisplayText("Using your running skill, you build up a head of steam and jump, then spread your arms and flail your tail wildly; your opponent dogs you as best " + target.desc.subjectivePronoun + " can, but stops and stares dumbly as your spastic tail slowly propels you several meters into the air!  You leave " + target.desc.objectivePronoun + " behind with your clumsy, jerky, short-range flight.");
            }
            // Non-fliers flee
            else
                DisplayText(target.desc.capitalA + target.desc.short + " rapidly disappears into the shifting landscape behind you.");
            if (target.desc.short === "Izma") {
                DisplayText("\n\nAs you leave the tigershark behind, her taunting voice rings out after you.  \"<i>Oooh, look at that fine backside!  Are you running or trying to entice me?  Haha, looks like we know who's the superior specimen now!  Remember: next time we meet, you owe me that ass!</i>\"  Your cheek tingles in shame at her catcalls.");
            }
            return;
        }
        // Runner perk chance
        else if (character.perks.has(PerkType.Runner) && randInt(100) < 50) {
            DisplayText("Thanks to your talent for running, you manage to escape.");
            if (target.desc.short === "Izma") {
                DisplayText("\n\nAs you leave the tigershark behind, her taunting voice rings out after you.  \"<i>Oooh, look at that fine backside!  Are you running or trying to entice me?  Haha, looks like we know who's the superior specimen now!  Remember: next time we meet, you owe me that ass!</i>\"  Your cheek tingles in shame at her catcalls.");
            }
            return;
        }
        // FAIL FLEE
        else {
            // if (monster.desc.short === "Holli") {
            //     (monster as Holli).escapeFailWithHolli();
            //     return;
            // }
            // Flyers get special failure message.
            if (character.canFly()) {
                if (target.desc.plural)
                    DisplayText(target.desc.capitalA + target.desc.short + " manage to grab your " + Desc.Leg.describeLegs(character) + " and drag you back to the ground before you can fly away!");
                else
                    DisplayText(target.desc.capitalA + target.desc.short + " manages to grab your " + Desc.Leg.describeLegs(character) + " and drag you back to the ground before you can fly away!");
            }
            // fail
            else if (character.torso.tails.reduce(Tail.HasType(TailType.RACCOON), false) && character.torso.neck.head.ears.type === EarType.RACCOON && character.perks.has(PerkType.Runner))
                DisplayText("Using your running skill, you build up a head of steam and jump, but before you can clear the ground more than a foot, your opponent latches onto you and drags you back down with a thud!");
            // Nonflyer messages
            else {
                // Huge balls messages
                if (character.torso.balls.quantity > 0 && character.torso.balls.size >= 24) {
                    if (character.torso.balls.size < 48)
                        DisplayText("With your " + Desc.Balls.describeBalls(true, true, character) + " swinging ponderously beneath you, getting away is far harder than it should be.  ");
                    else
                        DisplayText("With your " + Desc.Balls.describeBalls(true, true, character) + " dragging along the ground, getting away is far harder than it should be.  ");
                }
                // FATASS BODY MESSAGES
                const largestBreastRating: number = character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating;
                if (largestBreastRating >= 35 || character.torso.butt.rating >= 20 || character.torso.hips.rating >= 20) {
                    // FOR PLAYERS WITH GIANT BREASTS
                    if (largestBreastRating >= 35 && largestBreastRating < 66) {
                        if (character.torso.hips.rating >= 20) {
                            DisplayText("Your " + Desc.Hip.describeHips(character) + " forces your gait to lurch slightly side to side, which causes the fat of your " + character.skin.tone + " ");
                            if (character.torso.butt.rating >= 20)
                                DisplayText(Desc.Butt.describeButt(character) + " and ");
                            DisplayText(Desc.Breast.describeChest(character) + " to wobble immensely, throwing you off balance and preventing you from moving quick enough to escape.");
                        }
                        else if (character.torso.butt.rating >= 20)
                            DisplayText("Your " + character.skin.tone + Desc.Butt.describeButt(character) + " and " + Desc.Breast.describeChest(character) + " wobble and bounce heavily, throwing you off balance and preventing you from moving quick enough to escape.");
                        else
                            DisplayText("Your " + Desc.Breast.describeChest(character) + " jiggle and wobble side to side like the " + character.skin.tone + " sacks of milky fat they are, with such force as to constantly throw you off balance, preventing you from moving quick enough to escape.");
                    }
                    // FOR PLAYERS WITH MASSIVE BREASTS
                    else if (largestBreastRating >= 66) {
                        if (character.torso.hips.rating >= 20) {
                            DisplayText("Your " + Desc.Breast.describeChest(character) + " nearly drag along the ground while your " + Desc.Hip.describeHips(character) + " swing side to side ");
                            if (character.torso.butt.rating >= 20)
                                DisplayText("causing the fat of your " + character.skin.tone + Desc.Butt.describeButt(character) + " to wobble heavily, ");
                            DisplayText("forcing your body off balance and preventing you from moving quick enough to get escape.");
                        }
                        else if (character.torso.butt.rating >= 20)
                            DisplayText("Your " + Desc.Breast.describeChest(character) + " nearly drag along the ground while the fat of your " + character.skin.tone + Desc.Butt.describeButt(character) + " wobbles heavily from side to side, forcing your body off balance and preventing you from moving quick enough to escape.");
                        else
                            DisplayText("Your " + Desc.Breast.describeChest(character) + " nearly drag along the ground, preventing you from moving quick enough to get escape.");
                    }
                    // FOR PLAYERS WITH EITHER GIANT HIPS OR BUTT BUT NOT THE BREASTS
                    else if (character.torso.hips.rating >= 20) {
                        DisplayText("Your " + Desc.Hip.describeHips(character) + " swing heavily from side to side ");
                        if (character.torso.butt.rating >= 20)
                            DisplayText("causing your " + character.skin.tone + Desc.Butt.describeButt(character) + " to wobble obscenely ");
                        DisplayText("and forcing your body into an awkward gait that slows you down, preventing you from escaping.");
                    }
                    // JUST DA BOOTAH
                    else if (character.torso.butt.rating >= 20)
                        DisplayText("Your " + character.skin.tone + Desc.Butt.describeButt(character) + " wobbles so heavily that you're unable to move quick enough to escape.");
                }
                // NORMAL RUN FAIL MESSAGES
                else if (target.desc.plural)
                    DisplayText(target.desc.capitalA + target.desc.short + " stay hot on your heels, denying you a chance at escape!");
                else
                    DisplayText(target.desc.capitalA + target.desc.short + " stays hot on your heels, denying you a chance at escape!");
            }
        }
    }
}
