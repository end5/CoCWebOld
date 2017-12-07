import { EarType } from '../../../Body/Head';
import { TailType } from '../../../Body/LowerBody';
import Character from '../../../Character/Character';
import CombatAction from '../../../Combat/Actions/CombatAction';
import BallsDescriptor from '../../../Descriptors/BallsDescriptor';
import BreastDescriptor from '../../../Descriptors/BreastDescriptor';
import ButtDescriptor from '../../../Descriptors/ButtDescriptor';
import LowerBodyDescriptor from '../../../Descriptors/LowerBodyDescriptor';
import DisplayText from '../../../display/DisplayText';
import { CombatEffectType } from '../../../Effects/CombatEffectType';
import { PerkType } from '../../../Effects/PerkType';
import Game from '../../../Game/Game';
import Utils from '../../../Utilities/Utils';

export default class Run implements CombatAction {
    public name: string = "Run";
    public reasonCannotUse: string = "";

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, monster: Character): boolean {
        return true;
    }

    public use(character: Character, monster: Character) {
        DisplayText.clear();
        if (character.combat.effects.has(CombatEffectType.Sealed) && character.combat.effects.get(CombatEffectType.Sealed).value2 == 4) {
            DisplayText.text("You try to run, but you just can't seem to escape.  <b>Your ability to run was sealed, and now you've wasted a chance to attack!</b>\n\n");
            return;
        }
        //Rut doesnt let you run from dicks.
        if (character.inRut && monster.lowerBody.cockSpot.count() > 0) {
            DisplayText.text("The thought of another male in your area competing for all the pussy infuriates you!  No way will you run!");
            return;
        }/*
        if(monster.combat.effects.has(CombatEffectType.Level) && character.canFly()) {
            DisplayText.clear();
            DisplayText.text("You flex the muscles in your back and, shaking clear of the sand, burst into the air!  Wasting no time you fly free of the sandtrap and its treacherous pit.  \"One day your wings will fall off, little ant,\" the snarling voice of the thwarted androgyne carries up to you as you make your escape.  \"And I will be waiting for you when they do!\"");
            Game.inCombat = false;
            clearStatuses(false);
            doNext(camp.returnToCampUseOneHour);
            return;
        }*/
        if (monster.combat.effects.has(CombatEffectType.GenericRunDisabled) || urtaQuest.isUrta()) {
            DisplayText.text("You can't escape from this fight!");
            return;
        }
        if (monster.combat.effects.has(CombatEffectType.Level) && monster.combat.effects.get(CombatEffectType.Level).value1 < 4) {
            DisplayText.text("You're too deeply mired to escape!  You'll have to <b>climb</b> some first!");
            return;
        }
        if (monster.combat.effects.has(CombatEffectType.RunDisabled)) {
            DisplayText.text("You'd like to run, but you can't scale the walls of the pit with so many demonic hands pulling you down!");
            return;
        }/*
        if(flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00329] == 1 && (monster.short == "minotaur gang" || monster.short == "minotaur tribe")) {
            flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00329] = 0;
            //(Free run away) 
            DisplayText.text("You slink away while the pack of brutes is arguing.  Once they finish that argument, they'll be sorely disappointed!", true);
            inCombat = false;
            clearStatuses(false);
            doNext(camp.returnToCampUseOneHour);
            return;
        }*/
        else if (monster.desc.short == "minotaur tribe" && monster.combat.stats.HPRatio() >= 0.75) {
            DisplayText.text("There's too many of them surrounding you to run!");
            return;
        }
        if (inDungeon || inRoomedDungeon) {
            DisplayText.text("You're trapped in your foe's home turf - there is nowhere to run!\n\n");
            return;
        }
        //Attempt texts!
        if (monster.desc.short == "Ember") {
            DisplayText.text("You take off");
            if (!character.canFly())
                DisplayText.text(" running");
            else
                DisplayText.text(", flapping as hard as you can");
            DisplayText.text(", and Ember, caught up in the moment, gives chase.  ");
        }
        else if (character.canFly()) DisplayText.text("Gritting your teeth with effort, you beat your wings quickly and lift off!  ");
        //Nonflying PCs
        else {
            //Stuck!
            if (character.combat.effects.has(CombatEffectType.NoFlee)) {
                if (monster.desc.short == "goblin")
                    DisplayText.text("You try to flee but get stuck in the sticky white goop surrounding you.\n\n");
                else
                    DisplayText.text("You put all your skills at running to work and make a supreme effort to escape, but are unable to get away!\n\n");
                return;
            }
            //Nonstuck!
            else DisplayText.text("You turn tail and attempt to flee!  ");
        }

        //Calculations
        let escapeMod: number = 20 + monster.stats.level * 3;
        //if(debug) escapeMod -= 300;
        if (character.canFly()) escapeMod -= 20;
        if (character.lowerBody.tailType == TailType.RACCOON && character.upperBody.head.earType == EarType.RACCOON && character.perks.has(PerkType.Runner))
            escapeMod -= 25;

        //Big tits doesn't matter as much if ya can fly!
        else {
            const largestBreastSize: number = character.upperBody.chest.BreastRatingLargest[0].breastRating;
            if (largestBreastSize >= 35) escapeMod += 5;
            if (largestBreastSize >= 66) escapeMod += 10;
            if (character.lowerBody.hipRating >= 20) escapeMod += 5;
            if (character.lowerBody.butt.buttRating >= 20) escapeMod += 5;
            if (character.lowerBody.balls > 0) {
                if (character.lowerBody.ballSize >= 24) escapeMod += 5;
                if (character.lowerBody.ballSize >= 48) escapeMod += 10;
                if (character.lowerBody.ballSize >= 120) escapeMod += 10;
            }
        }

        //ANEMONE OVERRULES NORMAL RUN
        if (monster.desc.short == "anemone") {
            //Autosuccess - less than 60 lust
            if (character.stats.lust < 60) {
                DisplayText.text("Marshalling your thoughts, you frown at the strange girl and turn to march up the beach.  After twenty paces inshore you turn back to look at her again.  The anemone is clearly crestfallen by your departure, pouting heavily as she sinks beneath the water's surface.");
                return;
            }
            //Speed dependent
            else {
                //Success
                if (character.stats.spe > Utils.rand(monster.stats.spe + escapeMod)) {
                    DisplayText.text("Marshalling your thoughts, you frown at the strange girl and turn to march up the beach.  After twenty paces inshore you turn back to look at her again.  The anemone is clearly crestfallen by your departure, pouting heavily as she sinks beneath the water's surface.");
                    return;
                }
                //Run failed:
                else {
                    DisplayText.text("You try to shake off the fog and run but the anemone slinks over to you and her tentacles wrap around your waist.  <i>\"Stay?\"</i> she asks, pressing her small breasts into you as a tentacle slides inside your " + character.inventory.armorSlot.equipment.displayName + " and down to your nethers.  The combined stimulation of the rubbing and the tingling venom causes your knees to buckle, hampering your resolve and ending your escape attempt.");
                    //(gain lust, temp lose spd/str)
                    <Anemone>monster.applyVenom((4 + character.stats.sens / 20));
                    return;
                }
            }
        }
        //Ember is SPUCIAL
        if (monster.desc.short == "Ember") {
            //GET AWAY
            if (character.stats.spe > Utils.rand(monster.stats.spe + escapeMod) || (character.perks.has(PerkType.Runner) && Utils.rand(100) < 50)) {
                if (character.perks.has(PerkType.Runner))
                    DisplayText.text("Using your skill at running, y");
                else
                    DisplayText.text("Y");
                DisplayText.text("ou easily outpace the dragon, who begins hurling imprecations at you.  \"What the hell, [name], you weenie; are you so scared that you can't even stick out your punishment?\"");
                DisplayText.text("\n\nNot to be outdone, you call back, \"Sucks to you!  If even the mighty Last Ember of Hope can't catch me, why do I need to train?  Later, little bird!\"");
            }
            //Fail: 
            else {
                DisplayText.text("Despite some impressive jinking, " + emberScene.emberMF("he", "she") + " catches you, tackling you to the ground.\n\n");
            }
            return;
        }
        //SUCCESSFUL FLEE
        if (character.stats.spe > Utils.rand(monster.stats.spe + escapeMod)) {
            //Fliers flee!
            if (character.canFly())
                DisplayText.text(monster.desc.capitalA + monster.desc.short + " can't catch you.");
            //sekrit benefit: if you have coon ears, coon tail, and Runner perk, change normal Runner escape to flight-type escape
            else if (character.lowerBody.tailType == TailType.RACCOON && character.upperBody.head.earType == EarType.RACCOON && character.perks.has(PerkType.Runner)) {
                DisplayText.text("Using your running skill, you build up a head of steam and jump, then spread your arms and flail your tail wildly; your opponent dogs you as best " + monster.desc.subjectivePronoun + " can, but stops and stares dumbly as your spastic tail slowly propels you several meters into the air!  You leave " + monster.desc.objectivePronoun + " behind with your clumsy, jerky, short-range flight.");
            }
            //Non-fliers flee
            else
                DisplayText.text(monster.desc.capitalA + monster.desc.short + " rapidly disappears into the shifting landscape behind you.");
            if (monster.desc.short == "Izma") {
                DisplayText.text("\n\nAs you leave the tigershark behind, her taunting voice rings out after you.  \"<i>Oooh, look at that fine backside!  Are you running or trying to entice me?  Haha, looks like we know who's the superior specimen now!  Remember: next time we meet, you owe me that ass!</i>\"  Your cheek tingles in shame at her catcalls.");
            }
            return;
        }
        //Runner perk chance
        else if (character.perks.has(PerkType.Runner) && Utils.rand(100) < 50) {
            DisplayText.text("Thanks to your talent for running, you manage to escape.");
            if (monster.desc.short == "Izma") {
                DisplayText.text("\n\nAs you leave the tigershark behind, her taunting voice rings out after you.  \"<i>Oooh, look at that fine backside!  Are you running or trying to entice me?  Haha, looks like we know who's the superior specimen now!  Remember: next time we meet, you owe me that ass!</i>\"  Your cheek tingles in shame at her catcalls.");
            }
            return;
        }
        //FAIL FLEE
        else {
            if (monster.desc.short == "Holli") {
                <Holli>monster.escapeFailWithHolli();
                return;
            }
            //Flyers get special failure message.
            if (character.canFly()) {
                if (monster.desc.plural)
                    DisplayText.text(monster.desc.capitalA + monster.desc.short + " manage to grab your " + LowerBodyDescriptor.describeLegs(character) + " and drag you back to the ground before you can fly away!");
                else
                    DisplayText.text(monster.desc.capitalA + monster.desc.short + " manages to grab your " + LowerBodyDescriptor.describeLegs(character) + " and drag you back to the ground before you can fly away!");
            }
            //fail
            else if (character.lowerBody.tailType == TailType.RACCOON && character.upperBody.head.earType == EarType.RACCOON && character.perks.has(PerkType.Runner))
                DisplayText.text("Using your running skill, you build up a head of steam and jump, but before you can clear the ground more than a foot, your opponent latches onto you and drags you back down with a thud!");
            //Nonflyer messages
            else {
                //Huge balls messages
                if (character.lowerBody.balls > 0 && character.lowerBody.ballSize >= 24) {
                    if (character.lowerBody.ballSize < 48)
                        DisplayText.text("With your " + BallsDescriptor.describeBalls(true, true, character) + " swinging ponderously beneath you, getting away is far harder than it should be.  ");
                    else
                        DisplayText.text("With your " + BallsDescriptor.describeBalls(true, true, character) + " dragging along the ground, getting away is far harder than it should be.  ");
                }
                //FATASS BODY MESSAGES
                const largestBreastRating: number = character.upperBody.chest.BreastRatingLargest[0].breastRating;
                if (largestBreastRating >= 35 || character.lowerBody.butt.buttRating >= 20 || character.lowerBody.hipRating >= 20) {
                    //FOR PLAYERS WITH GIANT BREASTS
                    if (largestBreastRating >= 35 && largestBreastRating < 66) {
                        if (character.lowerBody.hipRating >= 20) {
                            DisplayText.text("Your " + LowerBodyDescriptor.describeHips(character) + " forces your gait to lurch slightly side to side, which causes the fat of your " + character.skinTone + " ");
                            if (character.lowerBody.butt.buttRating >= 20)
                                DisplayText.text(ButtDescriptor.describeButt(character) + " and ");
                            DisplayText.text(BreastDescriptor.describeChest(character) + " to wobble immensely, throwing you off balance and preventing you from moving quick enough to escape.");
                        }
                        else if (character.lowerBody.butt.buttRating >= 20)
                            DisplayText.text("Your " + character.skinTone + ButtDescriptor.describeButt(character) + " and " + BreastDescriptor.describeChest(character) + " wobble and bounce heavily, throwing you off balance and preventing you from moving quick enough to escape.");
                        else
                            DisplayText.text("Your " + BreastDescriptor.describeChest(character) + " jiggle and wobble side to side like the " + character.skinTone + " sacks of milky fat they are, with such force as to constantly throw you off balance, preventing you from moving quick enough to escape.");
                    }
                    //FOR PLAYERS WITH MASSIVE BREASTS
                    else if (largestBreastRating >= 66) {
                        if (character.lowerBody.hipRating >= 20) {
                            DisplayText.text("Your " + BreastDescriptor.describeChest(character) + " nearly drag along the ground while your " + LowerBodyDescriptor.describeHips(character) + " swing side to side ");
                            if (character.lowerBody.butt.buttRating >= 20)
                                DisplayText.text("causing the fat of your " + character.skinTone + ButtDescriptor.describeButt(character) + " to wobble heavily, ");
                            DisplayText.text("forcing your body off balance and preventing you from moving quick enough to get escape.");
                        }
                        else if (character.lowerBody.butt.buttRating >= 20)
                            DisplayText.text("Your " + BreastDescriptor.describeChest(character) + " nearly drag along the ground while the fat of your " + character.skinTone + ButtDescriptor.describeButt(character) + " wobbles heavily from side to side, forcing your body off balance and preventing you from moving quick enough to escape.");
                        else
                            DisplayText.text("Your " + BreastDescriptor.describeChest(character) + " nearly drag along the ground, preventing you from moving quick enough to get escape.");
                    }
                    //FOR PLAYERS WITH EITHER GIANT HIPS OR BUTT BUT NOT THE BREASTS
                    else if (character.lowerBody.hipRating >= 20) {
                        DisplayText.text("Your " + LowerBodyDescriptor.describeHips(character) + " swing heavily from side to side ");
                        if (character.lowerBody.butt.buttRating >= 20)
                            DisplayText.text("causing your " + character.skinTone + ButtDescriptor.describeButt(character) + " to wobble obscenely ");
                        DisplayText.text("and forcing your body into an awkward gait that slows you down, preventing you from escaping.");
                    }
                    //JUST DA BOOTAH
                    else if (character.lowerBody.butt.buttRating >= 20)
                        DisplayText.text("Your " + character.skinTone + ButtDescriptor.describeButt(character) + " wobbles so heavily that you're unable to move quick enough to escape.");
                }
                //NORMAL RUN FAIL MESSAGES
                else if (monster.desc.plural)
                    DisplayText.text(monster.desc.capitalA + monster.desc.short + " stay hot on your heels, denying you a chance at escape!");
                else
                    DisplayText.text(monster.desc.capitalA + monster.desc.short + " stays hot on your heels, denying you a chance at escape!");
            }
        }
    }
}