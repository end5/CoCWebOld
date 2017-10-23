import { BreastCup } from '../Body/BreastRow';
import Cock, { CockType } from '../Body/Cock';
import CockSpot from '../Body/CockSpot';
import Creature from '../Body/Creature';
import BallsDescriptor from '../Descriptors/BallsDescriptor';
import CockDescriptor from '../Descriptors/CockDescriptor';
import MainScreen from '../display/MainScreen';
import Flags, { FlagEnum } from '../Game/Flags';
import Utils from '../Utilities/Utils';

export default class CockModifier {
    public static growEachCock(body: Creature, lengthDelta: number): number {
        let totalGrowth: number = 0;

        for (let index: number = 0; index < body.lowerBody.cockSpot.count(); index++) {
            totalGrowth += CockModifier.growCock(body, body.lowerBody.cockSpot.get(index), lengthDelta);
        }

        return totalGrowth;
    }

    /**
     * Increases size of cock. Returns growth length.
     * @param cock
     * @param lengthDelta
     * @param bigCock
     */
    public static growCock(body: Creature, cock: Cock, lengthDelta: number): number {
        let bigCock: boolean = false;

        if (body.perks.has("BigCock"))
            bigCock = true;

        if (lengthDelta == 0) {
            return lengthDelta;
        }

        let threshhold: number = 0;

        if (lengthDelta > 0) { // growing
            threshhold = 24;
            // BigCock Perk increases incoming change by 50% and adds 12 to the length before diminishing returns set in
            if (bigCock) {
                lengthDelta *= 1.5;
                threshhold += 12;
            }
            // Not a human cock? Multiple the length before dimishing returns set in by 3
            if (cock.cockType != CockType.HUMAN)
                threshhold *= 2;
            // Modify growth for cock socks
            if (cock.sock == "scarlet") {
                lengthDelta *= 1.5;
            }
            else if (cock.sock == "cobalt") {
                lengthDelta *= .5;
            }
            // Do diminishing returns
            if (cock.cockLength > threshhold)
                lengthDelta /= 4;
            else if (cock.cockLength > threshhold / 2)
                lengthDelta /= 2;
        }
        else {

            threshhold = 0;
            // BigCock Perk doubles the incoming change value and adds 12 to the length before diminishing returns set in
            if (bigCock) {
                lengthDelta *= 0.5;
                threshhold += 12;
            }
            // Not a human cock? Add 12 to the length before dimishing returns set in
            if (cock.cockType != CockType.HUMAN)
                threshhold += 12;
            // Modify growth for cock socks
            if (cock.sock == "scarlet") {
                lengthDelta *= 0.5;
            }
            else if (cock.sock == "cobalt") {
                lengthDelta *= 1.5;
            }
            // Do diminishing returns
            if (cock.cockLength > threshhold)
                lengthDelta /= 3;
            else if (cock.cockLength > threshhold / 2)
                lengthDelta /= 2;
        }

        cock.cockLength += lengthDelta;

        if (cock.cockLength < 1)
            cock.cockLength = 1;

        if (cock.cockThickness > cock.cockLength * .33)
            cock.cockThickness = cock.cockLength * .33;

        return lengthDelta;
    }

    public static thickenCock(cock: Cock, increase: number): number {
        let amountGrown: number = 0;
        let thickened: number = 0;
        if (increase > 0) {
            while (increase > 0) {
                if (increase < 1)
                    thickened = increase;
                else
                    thickened = 1;
                //Cut thickness growth for huge dicked
                if (cock.cockThickness > 1 && cock.cockLength < 12) {
                    thickened /= 4;
                }
                if (cock.cockThickness > 1.5 && cock.cockLength < 18)
                    thickened /= 5;
                if (cock.cockThickness > 2 && cock.cockLength < 24)
                    thickened /= 5;
                if (cock.cockThickness > 3 && cock.cockLength < 30)
                    thickened /= 5;
                //proportional thickness diminishing returns.
                if (cock.cockThickness > cock.cockLength * .15)
                    thickened /= 3;
                if (cock.cockThickness > cock.cockLength * .20)
                    thickened /= 3;
                if (cock.cockThickness > cock.cockLength * .30)
                    thickened /= 5;
                //massive thickness limiters
                if (cock.cockThickness > 4)
                    thickened /= 2;
                if (cock.cockThickness > 5)
                    thickened /= 2;
                if (cock.cockThickness > 6)
                    thickened /= 2;
                if (cock.cockThickness > 7)
                    thickened /= 2;
                //Start adding up bonus length
                amountGrown += thickened;
                cock.cockThickness += thickened;
                thickened = 0;
                increase--;
            }
            increase = 0;
        }
        else if (increase < 0) {
            while (increase < 0) {
                thickened = -1;
                //Cut length growth for huge dicked
                if (cock.cockThickness <= 1)
                    thickened /= 2;
                if (cock.cockThickness < 2 && cock.cockLength < 10)
                    thickened /= 2;
                //Cut again for massively dicked
                if (cock.cockThickness < 3 && cock.cockLength < 18)
                    thickened /= 2;
                if (cock.cockThickness < 4 && cock.cockLength < 24)
                    thickened /= 2;
                //MINIMUM Thickness of OF .5!
                if (cock.cockThickness <= .5)
                    thickened = 0;
                //Start adding up bonus length
                amountGrown += thickened;
                cock.cockThickness += thickened;
                thickened = 0;
                increase++;
            }
        }
        return amountGrown;
    }

    public static displayKillCocks(creature: Creature, deadCock: number): number {
        let cocks: CockSpot = creature.lowerBody.cockSpot;
        //Count removal for text bits
        let removed: number = 0;
        //Holds cock index
        let storedCock: number = 0;
        //Less than 0 = PURGE ALL
        if (deadCock < 0) {
            deadCock = cocks.count();
        }
        //Double loop - outermost counts down cocks to remove, innermost counts down
        while (deadCock > 0 && cocks.count() > 0) {
            //Find shortest cock and prune it
            cocks.remove(creature, cocks.listSmallestCockArea[0]);
            removed++;
            deadCock--;
        }
        if (cocks.count() == 0 && creature.lowerBody.balls > 0) {
            creature.lowerBody.balls = 0;
            creature.lowerBody.ballSize = 1;
        }
        //Texts
        if (removed == 1) {
            if (cocks.count() == 0) {
                MainScreen.text("<b>Your manhood shrinks into your body, disappearing completely.</b>", false);
                if (creature.statusAffects.has("Infested")) MainScreen.text("  Like rats fleeing a sinking ship, a stream of worms squirts free from your withering member, slithering away.", false);
            }
            if (cocks.count() == 1) {
                MainScreen.text("<b>Your smallest penis disappears, shrinking into your body and leaving you with just one " + CockDescriptor.describeCock(creature, creature.lowerBody.cockSpot.get(0)) + ".</b>", false);
            }
            if (cocks.count() > 1) {
                MainScreen.text("<b>Your smallest penis disappears forever, leaving you with just your " + CockDescriptor.describeMultiCockShort(creature) + ".</b>", false);
            }
        }
        if (removed > 1) {
            if (cocks.count() == 0) {
                MainScreen.text("<b>All your male endowments shrink smaller and smaller, disappearing one at a time.</b>", false);
                if (creature.statusAffects.has("Infested")) MainScreen.text("  Like rats fleeing a sinking ship, a stream of worms squirts free from your withering member, slithering away.", false);
            }
            if (cocks.count() == 1) {
                MainScreen.text("<b>You feel " + Utils.numToCardinalText(removed) + " cocks disappear into your groin, leaving you with just your " + CockDescriptor.describeCock(creature, creature.lowerBody.cockSpot.get(0)) + ".", false);
            }
            if (cocks.count() > 1) {
                MainScreen.text("<b>You feel " + Utils.numToCardinalText(removed) + " cocks disappear into your groin, leaving you with " + CockDescriptor.describeMultiCockShort(creature) + ".", false);
            }
        }
        //remove infestation if cockless
        if (cocks.count() == 0 && creature.statusAffects.has("Infested"))
            creature.statusAffects.remove("Infested");
        if (cocks.count() == 0 && creature.lowerBody.balls > 0) {
            MainScreen.text("  <b>Your " + BallsDescriptor.describeSack(creature) + " and " + BallsDescriptor.describeBallsShort(creature) + " shrink and disappear, vanishing into your groin.</b>", false);
            creature.lowerBody.balls = 0;
            creature.lowerBody.ballSize = 1;
        }
        return removed;
    }
    
    public static displayLengthChange(body: Creature, lengthChange: number, ncocks: number): void {

        if (lengthChange < 0 && Flags.list[FlagEnum.HYPER_HAPPY]) {  // Early return for hyper-happy cheat if the call was *supposed* to shrink a cock.
            return;
        }

        const cocks: CockSpot = body.lowerBody.cockSpot;
        const firstCock: Cock = cocks.get(0);

        //DIsplay the degree of length change.
        if (lengthChange <= 1 && lengthChange > 0) {
            if (cocks.count() == 1)
                MainScreen.text("Your " + CockDescriptor.describeCock(body, firstCock) + " has grown slightly longer.", false);
            if (cocks.count() > 1) {
                if (ncocks == 1)
                    MainScreen.text("One of your " + CockDescriptor.describeMultiCockShort(body) + " grows slightly longer.", false);
                if (ncocks > 1 && ncocks < cocks.count())
                    MainScreen.text("Some of your " + CockDescriptor.describeMultiCockShort(body) + " grow slightly longer.", false);
                if (ncocks == cocks.count())
                    MainScreen.text("Your " + CockDescriptor.describeMultiCockShort(body) + " seem to fill up... growing a little bit larger.", false);
            }
        }
        if (lengthChange > 1 && lengthChange < 3) {
            if (cocks.count() == 1)
                MainScreen.text("A very pleasurable feeling spreads from your groin as your " + CockDescriptor.describeCock(body, firstCock) + " grows permanently longer - at least an inch - and leaks pre-cum from the pleasure of the change.", false);
            if (cocks.count() > 1) {
                if (ncocks == cocks.count())
                    MainScreen.text("A very pleasurable feeling spreads from your groin as your " + CockDescriptor.describeMultiCockShort(body) + " grow permanently longer - at least an inch - and leak plenty of pre-cum from the pleasure of the change.", false);
                if (ncocks == 1)
                    MainScreen.text("A very pleasurable feeling spreads from your groin as one of your " + CockDescriptor.describeMultiCockShort(body) + " grows permanently longer, by at least an inch, and leaks plenty of pre-cum from the pleasure of the change.", false);
                if (ncocks > 1 && ncocks < cocks.count())
                    MainScreen.text("A very pleasurable feeling spreads from your groin as " + Utils.numToCardinalText(ncocks) + " of your " + CockDescriptor.describeMultiCockShort(body) + " grow permanently longer, by at least an inch, and leak plenty of pre-cum from the pleasure of the change.", false);
            }
        }
        if (lengthChange >= 3) {
            if (cocks.count() == 1)
                MainScreen.text("Your " + CockDescriptor.describeCock(body, firstCock) + " feels incredibly tight as a few more inches of length seem to pour out from your crotch.", false);
            if (cocks.count() > 1) {
                if (ncocks == 1)
                    MainScreen.text("Your " + CockDescriptor.describeMultiCockShort(body) + " feel incredibly tight as one of their number begins to grow inch after inch of length.", false);
                if (ncocks > 1 && ncocks < cocks.count())
                    MainScreen.text("Your " + CockDescriptor.describeMultiCockShort(body) + " feel incredibly number as " + Utils.numToCardinalText(ncocks) + " of them begin to grow inch after inch of added length.", false);
                if (ncocks == cocks.count())
                    MainScreen.text("Your " + CockDescriptor.describeMultiCockShort(body) + " feel incredibly tight as inch after inch of length pour out from your groin.", false);
            }
        }
        //Display LengthChange
        if (lengthChange > 0) {
            if (firstCock.cockLength >= 8 && firstCock.cockLength - lengthChange < 8) {
                if (cocks.count() == 1)
                    MainScreen.text("  <b>Most men would be overly proud to have a tool as long as yours.</b>", false);
                if (cocks.count() > 1)
                    MainScreen.text("  <b>Most men would be overly proud to have one cock as long as yours, let alone " + CockDescriptor.describeMultiCock(body) + ".</b>", false);
            }
            if (firstCock.cockLength >= 12 && firstCock.cockLength - lengthChange < 12) {
                if (cocks.count() == 1)
                    MainScreen.text("  <b>Your " + CockDescriptor.describeCock(body, firstCock) + " is so long it nearly swings to your knee at its full length.</b>", false);
                if (cocks.count() > 1)
                    MainScreen.text("  <b>Your " + CockDescriptor.describeMultiCockShort(body) + " are so long they nearly reach your knees when at full length.</b>", false);
            }
            if (firstCock.cockLength >= 16 && firstCock.cockLength - lengthChange < 16) {
                if (cocks.count() == 1)
                    MainScreen.text("  <b>Your " + CockDescriptor.describeCock(body, firstCock) + " would look more at home on a large horse than you.</b>", false);
                if (cocks.count() > 1)
                    MainScreen.text("  <b>Your " + CockDescriptor.describeMultiCockShort(body) + " would look more at home on a large horse than on your body.</b>", false);
                if (body.upperBody.chest.BreastRatingLargest[0].breastRating >= BreastCup.C) {
                    if (cocks.count() == 1)
                        MainScreen.text("  You could easily stuff your " + CockDescriptor.describeCock(body, firstCock) + " between your breasts and give yourself the titty-fuck of a lifetime.", false);
                    if (cocks.count() > 1)
                        MainScreen.text("  They reach so far up your chest it would be easy to stuff a few cocks between your breasts and give yourself the titty-fuck of a lifetime.", false);
                }
                else {
                    if (cocks.count() == 1)
                        MainScreen.text("  Your " + CockDescriptor.describeCock(body, firstCock) + " is so long it easily reaches your chest.  The possibility of autofellatio is now a foregone conclusion.", false);
                    if (cocks.count() > 1)
                        MainScreen.text("  Your " + CockDescriptor.describeMultiCockShort(body) + " are so long they easily reach your chest.  Autofellatio would be about as hard as looking down.", false);
                }
            }
            if (firstCock.cockLength >= 20 && firstCock.cockLength - lengthChange < 20) {
                if (cocks.count() == 1)
                    MainScreen.text("  <b>As if the pulsing heat of your " + CockDescriptor.describeCock(body, firstCock) + " wasn't enough, the tip of your " + CockDescriptor.describeCock(body, firstCock) + " keeps poking its way into your view every time you get hard.</b>", false);
                if (cocks.count() > 1)
                    MainScreen.text("  <b>As if the pulsing heat of your " + CockDescriptor.describeMultiCockShort(body) + " wasn't bad enough, every time you get hard, the tips of your " + CockDescriptor.describeMultiCockShort(body) + " wave before you, obscuring the lower portions of your vision.</b>", false);
                if (body.stats.cor > 40 && body.stats.cor <= 60) {
                    if (cocks.count() > 1)
                        MainScreen.text("  You wonder if there is a demon or beast out there that could take the full length of one of your " + CockDescriptor.describeMultiCockShort(body) + "?", false);
                    if (cocks.count() == 1)
                        MainScreen.text("  You wonder if there is a demon or beast out there that could handle your full length.", false);
                }
                if (body.stats.cor > 60 && body.stats.cor <= 80) {
                    if (cocks.count() > 1)
                        MainScreen.text("  You daydream about being attacked by a massive tentacle beast, its tentacles engulfing your " + CockDescriptor.describeMultiCockShort(body) + " to their hilts, milking you dry.\n\nYou smile at the pleasant thought.", false);
                    if (cocks.count() == 1)
                        MainScreen.text("  You daydream about being attacked by a massive tentacle beast, its tentacles engulfing your " + CockDescriptor.describeCock(body, firstCock) + " to the hilt, milking it of all your cum.\n\nYou smile at the pleasant thought.", false);
                }
                if (body.stats.cor > 80) {
                    if (cocks.count() > 1)
                        MainScreen.text("  You find yourself fantasizing about impaling nubile young champions on your " + CockDescriptor.describeMultiCockShort(body) + " in a year's time.", false);
                }
            }
        }
        //Display the degree of length loss.
        if (lengthChange < 0 && lengthChange >= -1) {
            if (cocks.count() == 1)
                MainScreen.text("Your " + CockDescriptor.describeMultiCockShort(body) + " has shrunk to a slightly shorter length.", false);
            if (cocks.count() > 1) {
                if (ncocks == cocks.count())
                    MainScreen.text("Your " + CockDescriptor.describeMultiCockShort(body) + " have shrunk to a slightly shorter length.", false);
                if (ncocks > 1 && ncocks < cocks.count())
                    MainScreen.text("You feel " + Utils.numToCardinalText(ncocks) + " of your " + CockDescriptor.describeMultiCockShort(body) + " have shrunk to a slightly shorter length.", false);
                if (ncocks == 1)
                    MainScreen.text("You feel " + Utils.numToCardinalText(ncocks) + " of your " + CockDescriptor.describeMultiCockShort(body) + " has shrunk to a slightly shorter length.", false);
            }
        }
        if (lengthChange < -1 && lengthChange > -3) {
            if (cocks.count() == 1)
                MainScreen.text("Your " + CockDescriptor.describeMultiCockShort(body) + " shrinks smaller, flesh vanishing into your groin.", false);
            if (cocks.count() > 1) {
                if (ncocks == cocks.count())
                    MainScreen.text("Your " + CockDescriptor.describeMultiCockShort(body) + " shrink smaller, the flesh vanishing into your groin.", false);
                if (ncocks == 1)
                    MainScreen.text("You feel " + Utils.numToCardinalText(ncocks) + " of your " + CockDescriptor.describeMultiCockShort(body) + " shrink smaller, the flesh vanishing into your groin.", false);
                if (ncocks > 1 && ncocks < cocks.count())
                    MainScreen.text("You feel " + Utils.numToCardinalText(ncocks) + " of your " + CockDescriptor.describeMultiCockShort(body) + " shrink smaller, the flesh vanishing into your groin.", false);
            }
        }
        if (lengthChange <= -3) {
            if (cocks.count() == 1)
                MainScreen.text("A large portion of your " + CockDescriptor.describeMultiCockShort(body) + "'s length shrinks and vanishes.", false);
            if (cocks.count() > 1) {
                if (ncocks == cocks.count())
                    MainScreen.text("A large portion of your " + CockDescriptor.describeMultiCockShort(body) + " receeds towards your groin, receding rapidly in length.", false);
                if (ncocks == 1)
                    MainScreen.text("A single member of your " + CockDescriptor.describeMultiCockShort(body) + " vanishes into your groin, receding rapidly in length.", false);
                if (ncocks > 1 && cocks.count() > ncocks)
                    MainScreen.text("Your " + CockDescriptor.describeMultiCockShort(body) + " tingles as " + Utils.numToCardinalText(ncocks) + " of your members vanish into your groin, receding rapidly in length.", false);
            }
        }
    }


}