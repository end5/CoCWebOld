export default class CockChangeDescriptor {
    public static lengthChange(creature: Creature, lengthChange: number, numOfCocks: number): void {
        let cocks = creature.lowerBody.cockSpot;
        if (lengthChange < 0 && Flags.has(FlagEnum.HYPER_HAPPY))  // Early return for hyper-happy cheat if the call was *supposed* to shrink a cock.
            return;

        //DIsplay the degree of length change.
        if (lengthChange <= 1 && lengthChange > 0) {
            if (cocks.count() == 1) MainScreen.text("Your " + CockDescriptor.CockDescriptor.describeCock(player, creature, cocks.list[0]) + " has grown slightly longer.", false);
            if (cocks.count() > 1) {
                if (numOfCocks == 1) MainScreen.text("One of your " + CockDescriptor.multiCockDescriptionShort(creature, cocks) + " grows slightly longer.", false);
                if (numOfCocks > 1 && numOfCocks < cocks.count()) MainScreen.text("Some of your " + CockDescriptor.multiCockDescriptionShort(creature, cocks) + " grow slightly longer.", false);
                if (numOfCocks == cocks.count()) MainScreen.text("Your " + CockDescriptor.multiCockDescriptionShort(creature, cocks) + " seem to fill up... growing a little bit larger.", false);
            }
        }
        if (lengthChange > 1 && lengthChange < 3) {
            if (cocks.count() == 1) MainScreen.text("A very pleasurable feeling spreads from your groin as your " + CockDescriptor.CockDescriptor.describeCock(player, creature, cocks.list[0]) + " grows permanently longer - at least an inch - and leaks pre-cum from the pleasure of the change.", false);
            if (cocks.count() > 1) {
                if (numOfCocks == cocks.count()) MainScreen.text("A very pleasurable feeling spreads from your groin as your " + CockDescriptor.multiCockDescriptionShort(creature, cocks) + " grow permanently longer - at least an inch - and leak plenty of pre-cum from the pleasure of the change.", false);
                if (numOfCocks == 1) MainScreen.text("A very pleasurable feeling spreads from your groin as one of your " + CockDescriptor.multiCockDescriptionShort(creature, cocks) + " grows permanently longer, by at least an inch, and leaks plenty of pre-cum from the pleasure of the change.", false);
                if (numOfCocks > 1 && numOfCocks < cocks.count()) MainScreen.text("A very pleasurable feeling spreads from your groin as " + Utils.numToCardinalText(numOfCocks) + " of your " + CockDescriptor.multiCockDescriptionShort(creature, cocks) + " grow permanently longer, by at least an inch, and leak plenty of pre-cum from the pleasure of the change.", false);
            }
        }
        if (lengthChange >= 3) {
            if (cocks.count() == 1) MainScreen.text("Your " + CockDescriptor.CockDescriptor.describeCock(player, creature, cocks.list[0]) + " feels incredibly tight as a few more inches of length seem to pour out from your crotch.", false);
            if (cocks.count() > 1) {
                if (numOfCocks == 1) MainScreen.text("Your " + CockDescriptor.multiCockDescriptionShort(creature, cocks) + " feel incredibly tight as one of their number begins to grow inch after inch of length.", false);
                if (numOfCocks > 1 && numOfCocks < cocks.count()) MainScreen.text("Your " + CockDescriptor.multiCockDescriptionShort(creature, cocks) + " feel incredibly number as " + Utils.numToCardinalText(numOfCocks) + " of them begin to grow inch after inch of added length.", false);
                if (numOfCocks == cocks.count()) MainScreen.text("Your " + CockDescriptor.multiCockDescriptionShort(creature, cocks) + " feel incredibly tight as inch after inch of length pour out from your groin.", false);
            }
        }
        //Display LengthChange
        if (lengthChange > 0) {
            if (cocks[0].cockLength >= 8 && cocks[0].cockLength - lengthChange < 8) {
                if (cocks.count() == 1) MainScreen.text("  <b>Most men would be overly proud to have a tool as long as yours.</b>", false);
                if (cocks.count() > 1) MainScreen.text("  <b>Most men would be overly proud to have one cock as long as yours, let alone " + CockDescriptor.multiCockDescription(creature, cocks) + ".</b>", false);
            }
            if (cocks[0].cockLength >= 12 && cocks[0].cockLength - lengthChange < 12) {
                if (cocks.count() == 1) MainScreen.text("  <b>Your " + CockDescriptor.CockDescriptor.describeCock(player, creature, cocks.list[0]) + " is so long it nearly swings to your knee at its full length.</b>", false);
                if (cocks.count() > 1) MainScreen.text("  <b>Your " + CockDescriptor.multiCockDescriptionShort(creature, cocks) + " are so long they nearly reach your knees when at full length.</b>", false);
            }
            if (cocks[0].cockLength >= 16 && cocks[0].cockLength - lengthChange < 16) {
                if (cocks.count() == 1) MainScreen.text("  <b>Your " + CockDescriptor.CockDescriptor.describeCock(player, creature, cocks.list[0]) + " would look more at home on a large horse than you.</b>", false);
                if (cocks.count() > 1) MainScreen.text("  <b>Your " + CockDescriptor.multiCockDescriptionShort(creature, cocks) + " would look more at home on a large horse than on your body.</b>", false);
                if (creature.upperBody.chest.BreastRatingLargest[0].breastRating >= BreastCup.C) {
                    if (cocks.count() == 1) MainScreen.text("  You could easily stuff your " + CockDescriptor.CockDescriptor.describeCock(player, creature, cocks.list[0]) + " between your breasts and give yourself the titty-fuck of a lifetime.", false);
                    if (cocks.count() > 1) MainScreen.text("  They reach so far up your chest it would be easy to stuff a few cocks between your breasts and give yourself the titty-fuck of a lifetime.", false);
                }
                else {
                    if (cocks.count() == 1) MainScreen.text("  Your " + CockDescriptor.CockDescriptor.describeCock(player, creature, cocks.list[0]) + " is so long it easily reaches your chest.  The possibility of autofellatio is now a foregone conclusion.", false);
                    if (cocks.count() > 1) MainScreen.text("  Your " + CockDescriptor.multiCockDescriptionShort(creature, cocks) + " are so long they easily reach your chest.  Autofellatio would be about as hard as looking down.", false);
                }
            }
            if (cocks[0].cockLength >= 20 && cocks[0].cockLength - lengthChange < 20) {
                if (cocks.count() == 1) MainScreen.text("  <b>As if the pulsing heat of your " + CockDescriptor.CockDescriptor.describeCock(player, creature, cocks.list[0]) + " wasn't enough, the tip of your " + CockDescriptor.CockDescriptor.describeCock(player, creature, cocks.list[0]) + " keeps poking its way into your view every time you get hard.</b>", false);
                if (cocks.count() > 1) MainScreen.text("  <b>As if the pulsing heat of your " + CockDescriptor.multiCockDescriptionShort(creature, cocks) + " wasn't bad enough, every time you get hard, the tips of your " + CockDescriptor.multiCockDescriptionShort(creature, cocks) + " wave before you, obscuring the lower portions of your vision.</b>", false);
                if (creature.stats.cor > 40 && creature.stats.cor <= 60) {
                    if (cocks.count() > 1) MainScreen.text("  You wonder if there is a demon or beast out there that could take the full length of one of your " + CockDescriptor.multiCockDescriptionShort(creature, cocks) + "?", false);
                    if (cocks.count() == 1) MainScreen.text("  You wonder if there is a demon or beast out there that could handle your full length.", false);
                }
                if (creature.stats.cor > 60 && creature.stats.cor <= 80) {
                    if (cocks.count() > 1) MainScreen.text("  You daydream about being attacked by a massive tentacle beast, its tentacles engulfing your " + CockDescriptor.multiCockDescriptionShort(creature, cocks) + " to their hilts, milking you dry.\n\nYou smile at the pleasant thought.", false);
                    if (cocks.count() == 1) MainScreen.text("  You daydream about being attacked by a massive tentacle beast, its tentacles engulfing your " + CockDescriptor.CockDescriptor.describeCock(player, creature, cocks.list[0]) + " to the hilt, milking it of all your cum.\n\nYou smile at the pleasant thought.", false);
                }
                if (creature.stats.cor > 80) {
                    if (cocks.count() > 1) MainScreen.text("  You find yourself fantasizing about impaling nubile young champions on your " + CockDescriptor.multiCockDescriptionShort(creature, cocks) + " in a year's time.", false);
                }
            }
        }
        //Display the degree of length loss.
        if (lengthChange < 0 && lengthChange >= -1) {
            if (cocks.count() == 1) MainScreen.text("Your " + CockDescriptor.multiCockDescriptionShort(creature, cocks) + " has shrunk to a slightly shorter length.", false);
            if (cocks.count() > 1) {
                if (numOfCocks == cocks.count()) MainScreen.text("Your " + CockDescriptor.multiCockDescriptionShort(creature, cocks) + " have shrunk to a slightly shorter length.", false);
                if (numOfCocks > 1 && numOfCocks < cocks.count()) MainScreen.text("You feel " + Utils.numToCardinalText(numOfCocks) + " of your " + CockDescriptor.multiCockDescriptionShort(creature, cocks) + " have shrunk to a slightly shorter length.", false);
                if (numOfCocks == 1) MainScreen.text("You feel " + Utils.numToCardinalText(numOfCocks) + " of your " + CockDescriptor.multiCockDescriptionShort(creature, cocks) + " has shrunk to a slightly shorter length.", false);
            }
        }
        if (lengthChange < -1 && lengthChange > -3) {
            if (cocks.count() == 1) MainScreen.text("Your " + CockDescriptor.multiCockDescriptionShort(creature, cocks) + " shrinks smaller, flesh vanishing into your groin.", false);
            if (cocks.count() > 1) {
                if (numOfCocks == cocks.count()) MainScreen.text("Your " + CockDescriptor.multiCockDescriptionShort(creature, cocks) + " shrink smaller, the flesh vanishing into your groin.", false);
                if (numOfCocks == 1) MainScreen.text("You feel " + Utils.numToCardinalText(numOfCocks) + " of your " + CockDescriptor.multiCockDescriptionShort(creature, cocks) + " shrink smaller, the flesh vanishing into your groin.", false);
                if (numOfCocks > 1 && numOfCocks < cocks.count()) MainScreen.text("You feel " + Utils.numToCardinalText(numOfCocks) + " of your " + CockDescriptor.multiCockDescriptionShort(creature, cocks) + " shrink smaller, the flesh vanishing into your groin.", false);
            }
        }
        if (lengthChange <= -3) {
            if (cocks.count() == 1) MainScreen.text("A large portion of your " + CockDescriptor.multiCockDescriptionShort(creature, cocks) + "'s length shrinks and vanishes.", false);
            if (cocks.count() > 1) {
                if (numOfCocks == cocks.count()) MainScreen.text("A large portion of your " + CockDescriptor.multiCockDescriptionShort(creature, cocks) + " receeds towards your groin, receding rapidly in length.", false);
                if (numOfCocks == 1) MainScreen.text("A single member of your " + CockDescriptor.multiCockDescriptionShort(creature, cocks) + " vanishes into your groin, receding rapidly in length.", false);
                if (numOfCocks > 1 && cocks.count() > numOfCocks) MainScreen.text("Your " + CockDescriptor.multiCockDescriptionShort(creature, cocks) + " tingles as " + Utils.numToCardinalText(numOfCocks) + " of your members vanish into your groin, receding rapidly in length.", false);
            }
        }
    }

    public removeCocksDescriptor(creature: Creature, removed: number) {
        let cocks = creature.lowerBody.cockSpot;
        //Texts
        if (removed == 1) {
            if (cocks.count() == 0) {
                MainScreen.text("<b>Your manhood shrinks into your body, disappearing completely.</b>", false);
                if (creature.statusAffects.has("Infested")) MainScreen.text("  Like rats fleeing a sinking ship, a stream of worms squirts free from your withering member, slithering away.", false);
            }
            if (cocks.count() == 1) {
                MainScreen.text("<b>Your smallest penis disappears, shrinking into your body and leaving you with just one " + CockDescriptor.describeCock(player, player.lowerBody.cockSpot.get(0)) + ".</b>", false);
            }
            if (cocks.count() > 1) {
                MainScreen.text("<b>Your smallest penis disappears forever, leaving you with just your " + CockDescriptor.describeMultiCockShort(player) + ".</b>", false);
            }
        }
        if (removed > 1) {
            if (cocks.count() == 0) {
                MainScreen.text("<b>All your male endowments shrink smaller and smaller, disappearing one at a time.</b>", false);
                if (creature.statusAffects.has("Infested")) MainScreen.text("  Like rats fleeing a sinking ship, a stream of worms squirts free from your withering member, slithering away.", false);
            }
            if (cocks.count() == 1) {
                MainScreen.text("<b>You feel " + num2Text(removed) + " cocks disappear into your groin, leaving you with just your " + CockDescriptor.describeCock(player, player.lowerBody.cockSpot.get(0)) + ".", false);
            }
            if (cocks.count() > 1) {
                MainScreen.text("<b>You feel " + num2Text(removed) + " cocks disappear into your groin, leaving you with " + CockDescriptor.describeMultiCockShort(player) + ".", false);
            }
        }
        //remove infestation if cockless
        if (cocks.count() == 0) this.statusAffects.remove("Infested");
        if (cocks.count() == 0 && creature.lowerBody.balls > 0) {
            MainScreen.text("  <b>Your " + BallsDescriptor.describeSack(player) + " and " +  BallsDescriptor.describeBallsShort(player) + " shrink and disappear, vanishing into your groin.</b>", false);
            balls = 0;
            ballSize = 1;
        }
    }

}