﻿import BreastRow, { BreastCup } from '../Body/BreastRow';
import Cock, { CockType } from '../Body/Cock';
import Character from '../Character/Character';
import BallsDescriptor from '../Descriptors/BallsDescriptor';
import CockDescriptor from '../Descriptors/CockDescriptor';
import DisplayText from '../display/DisplayText';
import { PerkType } from '../Effects/PerkType';
import { StatusAffectType } from '../Effects/StatusAffectType';
import Flags, { FlagEnum } from '../Game/Flags';
import CockSockName from '../Items/Misc/CockSockName';
import { Utils } from '../Utilities/Utils';

export default class CockModifier {
    public static growEachCock(character: Character, lengthDelta: number): number {
        let totalGrowth: number = 0;

        for (const cock of character.torso.cocks) {
            totalGrowth += CockModifier.growCock(character, cock, lengthDelta);
        }

        return totalGrowth;
    }

    /**
     * Increases size of cock. Returns growth length.
     * @param cock
     * @param lengthDelta
     * @param bigCock
     */
    public static growCock(character: Character, cock: Cock, lengthDelta: number): number {
        let bigCock: boolean = false;

        if (character.perks.has(PerkType.BigCock))
            bigCock = true;

        if (lengthDelta === 0) {
            return lengthDelta;
        }

        let threshhold: number = 0;
        const hasCockSock = character.inventory.equipment.cockSocks.get(character.torso.cocks.indexOf(cock)).isEquipped();
        const cockSock = character.inventory.equipment.cockSocks.get(character.torso.cocks.indexOf(cock)).item;

        if (lengthDelta > 0) { // growing
            threshhold = 24;
            // BigCock Perk increases incoming change by 50% and adds 12 to the length before diminishing returns set in
            if (bigCock) {
                lengthDelta *= 1.5;
                threshhold += 12;
            }
            // Not a human cock? Multiple the length before dimishing returns set in by 3
            if (cock.type !== CockType.HUMAN)
                threshhold *= 2;
            // Modify growth for cock socks
            if (hasCockSock && cockSock.name === CockSockName.Scarlet) {
                lengthDelta *= 1.5;
            }
            else if (hasCockSock && cockSock.name === CockSockName.Cobalt) {
                lengthDelta *= .5;
            }
            // Do diminishing returns
            if (cock.length > threshhold)
                lengthDelta /= 4;
            else if (cock.length > threshhold / 2)
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
            if (cock.type !== CockType.HUMAN)
                threshhold += 12;
            // Modify growth for cock socks
            if (hasCockSock && cockSock.name === CockSockName.Scarlet) {
                lengthDelta *= 0.5;
            }
            else if (hasCockSock && cockSock.name === CockSockName.Cobalt) {
                lengthDelta *= 1.5;
            }
            // Do diminishing returns
            if (cock.length > threshhold)
                lengthDelta /= 3;
            else if (cock.length > threshhold / 2)
                lengthDelta /= 2;
        }

        cock.length += lengthDelta;

        if (cock.length < 1)
            cock.length = 1;

        if (cock.thickness > cock.length * .33)
            cock.thickness = cock.length * .33;

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
                // Cut thickness growth for huge dicked
                if (cock.thickness > 1 && cock.length < 12) {
                    thickened /= 4;
                }
                if (cock.thickness > 1.5 && cock.length < 18)
                    thickened /= 5;
                if (cock.thickness > 2 && cock.length < 24)
                    thickened /= 5;
                if (cock.thickness > 3 && cock.length < 30)
                    thickened /= 5;
                // proportional thickness diminishing returns.
                if (cock.thickness > cock.length * .15)
                    thickened /= 3;
                if (cock.thickness > cock.length * .20)
                    thickened /= 3;
                if (cock.thickness > cock.length * .30)
                    thickened /= 5;
                // massive thickness limiters
                if (cock.thickness > 4)
                    thickened /= 2;
                if (cock.thickness > 5)
                    thickened /= 2;
                if (cock.thickness > 6)
                    thickened /= 2;
                if (cock.thickness > 7)
                    thickened /= 2;
                // Start adding up bonus length
                amountGrown += thickened;
                cock.thickness += thickened;
                thickened = 0;
                increase--;
            }
            increase = 0;
        }
        else if (increase < 0) {
            while (increase < 0) {
                thickened = -1;
                // Cut length growth for huge dicked
                if (cock.thickness <= 1)
                    thickened /= 2;
                if (cock.thickness < 2 && cock.length < 10)
                    thickened /= 2;
                // Cut again for massively dicked
                if (cock.thickness < 3 && cock.length < 18)
                    thickened /= 2;
                if (cock.thickness < 4 && cock.length < 24)
                    thickened /= 2;
                // MINIMUM Thickness of OF .5!
                if (cock.thickness <= .5)
                    thickened = 0;
                // Start adding up bonus length
                amountGrown += thickened;
                cock.thickness += thickened;
                thickened = 0;
                increase++;
            }
        }
        return amountGrown;
    }

    public static displayKillCocks(character: Character, numOfCocksToRemove: number): number {
        const cocks = character.torso.cocks;
        // Count removal for text bits
        let removed: number = 0;
        // Less than 0 = PURGE ALL
        if (numOfCocksToRemove < 0) {
            numOfCocksToRemove = cocks.count;
        }
        const smallestCocks = cocks.sort(Cock.SmallestCockArea);
        while (numOfCocksToRemove > 0 && cocks.count > 0) {
            // Find shortest cock and prune it
            cocks.remove(cocks.indexOf(smallestCocks[removed]));
            removed++;
            numOfCocksToRemove--;
        }
        if (cocks.count === 0 && character.torso.balls.quantity > 0) {
            character.torso.balls.quantity = 0;
            character.torso.balls.size = 1;
        }
        // Texts
        if (removed === 1) {
            if (cocks.count === 0) {
                DisplayText("<b>Your manhood shrinks into your body, disappearing completely.</b>");
                if (character.statusAffects.has(StatusAffectType.Infested)) DisplayText("  Like rats fleeing a sinking ship, a stream of worms squirts free from your withering member, slithering away.");
            }
            if (cocks.count === 1) {
                DisplayText("<b>Your smallest penis disappears, shrinking into your body and leaving you with just one " + CockDescriptor.describeCock(character, character.torso.cocks.get(0)) + ".</b>");
            }
            if (cocks.count > 1) {
                DisplayText("<b>Your smallest penis disappears forever, leaving you with just your " + CockDescriptor.describeMultiCockShort(character) + ".</b>");
            }
        }
        if (removed > 1) {
            if (cocks.count === 0) {
                DisplayText("<b>All your male endowments shrink smaller and smaller, disappearing one at a time.</b>");
                if (character.statusAffects.has(StatusAffectType.Infested)) DisplayText("  Like rats fleeing a sinking ship, a stream of worms squirts free from your withering member, slithering away.");
            }
            if (cocks.count === 1) {
                DisplayText("<b>You feel " + Utils.numToCardinalText(removed) + " cocks disappear into your groin, leaving you with just your " + CockDescriptor.describeCock(character, character.torso.cocks.get(0)) + ".");
            }
            if (cocks.count > 1) {
                DisplayText("<b>You feel " + Utils.numToCardinalText(removed) + " cocks disappear into your groin, leaving you with " + CockDescriptor.describeMultiCockShort(character) + ".");
            }
        }
        // remove infestation if cockless
        if (cocks.count === 0 && character.statusAffects.has(StatusAffectType.Infested))
            character.statusAffects.remove(StatusAffectType.Infested);
        if (cocks.count === 0 && character.torso.balls.quantity > 0) {
            DisplayText("  <b>Your " + BallsDescriptor.describeSack(character) + " and " + BallsDescriptor.describeBallsShort(character) + " shrink and disappear, vanishing into your groin.</b>");
            character.torso.balls.quantity = 0;
            character.torso.balls.size = 1;
        }
        return removed;
    }

    public static displayLengthChange(character: Character, lengthChange: number, ncocks: number): void {

        if (lengthChange < 0 && Flags.list[FlagEnum.HYPER_HAPPY]) {  // Early return for hyper-happy cheat if the call was *supposed* to shrink a cock.
            return;
        }

        const cocks = character.torso.cocks;
        const firstCock = cocks.get(0);

        // DIsplay the degree of length change.
        if (lengthChange <= 1 && lengthChange > 0) {
            if (cocks.count === 1)
                DisplayText("Your " + CockDescriptor.describeCock(character, firstCock) + " has grown slightly longer.");
            if (cocks.count > 1) {
                if (ncocks === 1)
                    DisplayText("One of your " + CockDescriptor.describeMultiCockShort(character) + " grows slightly longer.");
                if (ncocks > 1 && ncocks < cocks.count)
                    DisplayText("Some of your " + CockDescriptor.describeMultiCockShort(character) + " grow slightly longer.");
                if (ncocks === cocks.count)
                    DisplayText("Your " + CockDescriptor.describeMultiCockShort(character) + " seem to fill up... growing a little bit larger.");
            }
        }
        if (lengthChange > 1 && lengthChange < 3) {
            if (cocks.count === 1)
                DisplayText("A very pleasurable feeling spreads from your groin as your " + CockDescriptor.describeCock(character, firstCock) + " grows permanently longer - at least an inch - and leaks pre-cum from the pleasure of the change.");
            if (cocks.count > 1) {
                if (ncocks === cocks.count)
                    DisplayText("A very pleasurable feeling spreads from your groin as your " + CockDescriptor.describeMultiCockShort(character) + " grow permanently longer - at least an inch - and leak plenty of pre-cum from the pleasure of the change.");
                if (ncocks === 1)
                    DisplayText("A very pleasurable feeling spreads from your groin as one of your " + CockDescriptor.describeMultiCockShort(character) + " grows permanently longer, by at least an inch, and leaks plenty of pre-cum from the pleasure of the change.");
                if (ncocks > 1 && ncocks < cocks.count)
                    DisplayText("A very pleasurable feeling spreads from your groin as " + Utils.numToCardinalText(ncocks) + " of your " + CockDescriptor.describeMultiCockShort(character) + " grow permanently longer, by at least an inch, and leak plenty of pre-cum from the pleasure of the change.");
            }
        }
        if (lengthChange >= 3) {
            if (cocks.count === 1)
                DisplayText("Your " + CockDescriptor.describeCock(character, firstCock) + " feels incredibly tight as a few more inches of length seem to pour out from your crotch.");
            if (cocks.count > 1) {
                if (ncocks === 1)
                    DisplayText("Your " + CockDescriptor.describeMultiCockShort(character) + " feel incredibly tight as one of their number begins to grow inch after inch of length.");
                if (ncocks > 1 && ncocks < cocks.count)
                    DisplayText("Your " + CockDescriptor.describeMultiCockShort(character) + " feel incredibly number as " + Utils.numToCardinalText(ncocks) + " of them begin to grow inch after inch of added length.");
                if (ncocks === cocks.count)
                    DisplayText("Your " + CockDescriptor.describeMultiCockShort(character) + " feel incredibly tight as inch after inch of length pour out from your groin.");
            }
        }
        // Display LengthChange
        if (lengthChange > 0) {
            if (firstCock.length >= 8 && firstCock.length - lengthChange < 8) {
                if (cocks.count === 1)
                    DisplayText("  <b>Most men would be overly proud to have a tool as long as yours.</b>");
                if (cocks.count > 1)
                    DisplayText("  <b>Most men would be overly proud to have one cock as long as yours, let alone " + CockDescriptor.describeMultiCock(character) + ".</b>");
            }
            if (firstCock.length >= 12 && firstCock.length - lengthChange < 12) {
                if (cocks.count === 1)
                    DisplayText("  <b>Your " + CockDescriptor.describeCock(character, firstCock) + " is so long it nearly swings to your knee at its full length.</b>");
                if (cocks.count > 1)
                    DisplayText("  <b>Your " + CockDescriptor.describeMultiCockShort(character) + " are so long they nearly reach your knees when at full length.</b>");
            }
            if (firstCock.length >= 16 && firstCock.length - lengthChange < 16) {
                if (cocks.count === 1)
                    DisplayText("  <b>Your " + CockDescriptor.describeCock(character, firstCock) + " would look more at home on a large horse than you.</b>");
                if (cocks.count > 1)
                    DisplayText("  <b>Your " + CockDescriptor.describeMultiCockShort(character) + " would look more at home on a large horse than on your body.</b>");
                if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= BreastCup.C) {
                    if (cocks.count === 1)
                        DisplayText("  You could easily stuff your " + CockDescriptor.describeCock(character, firstCock) + " between your breasts and give yourself the titty-fuck of a lifetime.");
                    if (cocks.count > 1)
                        DisplayText("  They reach so far up your chest it would be easy to stuff a few cocks between your breasts and give yourself the titty-fuck of a lifetime.");
                }
                else {
                    if (cocks.count === 1)
                        DisplayText("  Your " + CockDescriptor.describeCock(character, firstCock) + " is so long it easily reaches your chest.  The possibility of autofellatio is now a foregone conclusion.");
                    if (cocks.count > 1)
                        DisplayText("  Your " + CockDescriptor.describeMultiCockShort(character) + " are so long they easily reach your chest.  Autofellatio would be about as hard as looking down.");
                }
            }
            if (firstCock.length >= 20 && firstCock.length - lengthChange < 20) {
                if (cocks.count === 1)
                    DisplayText("  <b>As if the pulsing heat of your " + CockDescriptor.describeCock(character, firstCock) + " wasn't enough, the tip of your " + CockDescriptor.describeCock(character, firstCock) + " keeps poking its way into your view every time you get hard.</b>");
                if (cocks.count > 1)
                    DisplayText("  <b>As if the pulsing heat of your " + CockDescriptor.describeMultiCockShort(character) + " wasn't bad enough, every time you get hard, the tips of your " + CockDescriptor.describeMultiCockShort(character) + " wave before you, obscuring the lower portions of your vision.</b>");
                if (character.stats.cor > 40 && character.stats.cor <= 60) {
                    if (cocks.count > 1)
                        DisplayText("  You wonder if there is a demon or beast out there that could take the full length of one of your " + CockDescriptor.describeMultiCockShort(character) + "?");
                    if (cocks.count === 1)
                        DisplayText("  You wonder if there is a demon or beast out there that could handle your full length.");
                }
                if (character.stats.cor > 60 && character.stats.cor <= 80) {
                    if (cocks.count > 1)
                        DisplayText("  You daydream about being attacked by a massive tentacle beast, its tentacles engulfing your " + CockDescriptor.describeMultiCockShort(character) + " to their hilts, milking you dry.\n\nYou smile at the pleasant thought.");
                    if (cocks.count === 1)
                        DisplayText("  You daydream about being attacked by a massive tentacle beast, its tentacles engulfing your " + CockDescriptor.describeCock(character, firstCock) + " to the hilt, milking it of all your cum.\n\nYou smile at the pleasant thought.");
                }
                if (character.stats.cor > 80) {
                    if (cocks.count > 1)
                        DisplayText("  You find yourself fantasizing about impaling nubile young champions on your " + CockDescriptor.describeMultiCockShort(character) + " in a year's time.");
                }
            }
        }
        // Display the degree of length loss.
        if (lengthChange < 0 && lengthChange >= -1) {
            if (cocks.count === 1)
                DisplayText("Your " + CockDescriptor.describeMultiCockShort(character) + " has shrunk to a slightly shorter length.");
            if (cocks.count > 1) {
                if (ncocks === cocks.count)
                    DisplayText("Your " + CockDescriptor.describeMultiCockShort(character) + " have shrunk to a slightly shorter length.");
                if (ncocks > 1 && ncocks < cocks.count)
                    DisplayText("You feel " + Utils.numToCardinalText(ncocks) + " of your " + CockDescriptor.describeMultiCockShort(character) + " have shrunk to a slightly shorter length.");
                if (ncocks === 1)
                    DisplayText("You feel " + Utils.numToCardinalText(ncocks) + " of your " + CockDescriptor.describeMultiCockShort(character) + " has shrunk to a slightly shorter length.");
            }
        }
        if (lengthChange < -1 && lengthChange > -3) {
            if (cocks.count === 1)
                DisplayText("Your " + CockDescriptor.describeMultiCockShort(character) + " shrinks smaller, flesh vanishing into your groin.");
            if (cocks.count > 1) {
                if (ncocks === cocks.count)
                    DisplayText("Your " + CockDescriptor.describeMultiCockShort(character) + " shrink smaller, the flesh vanishing into your groin.");
                if (ncocks === 1)
                    DisplayText("You feel " + Utils.numToCardinalText(ncocks) + " of your " + CockDescriptor.describeMultiCockShort(character) + " shrink smaller, the flesh vanishing into your groin.");
                if (ncocks > 1 && ncocks < cocks.count)
                    DisplayText("You feel " + Utils.numToCardinalText(ncocks) + " of your " + CockDescriptor.describeMultiCockShort(character) + " shrink smaller, the flesh vanishing into your groin.");
            }
        }
        if (lengthChange <= -3) {
            if (cocks.count === 1)
                DisplayText("A large portion of your " + CockDescriptor.describeMultiCockShort(character) + "'s length shrinks and vanishes.");
            if (cocks.count > 1) {
                if (ncocks === cocks.count)
                    DisplayText("A large portion of your " + CockDescriptor.describeMultiCockShort(character) + " receeds towards your groin, receding rapidly in length.");
                if (ncocks === 1)
                    DisplayText("A single member of your " + CockDescriptor.describeMultiCockShort(character) + " vanishes into your groin, receding rapidly in length.");
                if (ncocks > 1 && cocks.count > ncocks)
                    DisplayText("Your " + CockDescriptor.describeMultiCockShort(character) + " tingles as " + Utils.numToCardinalText(ncocks) + " of your members vanish into your groin, receding rapidly in length.");
            }
        }
    }
}
