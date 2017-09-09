import Player from "../../Player";
import Utils from "../../Utilities/Utils";
import ButtDescriptor from "../../Descriptors/ButtDescriptor";
import LowerBodyDescriptor from "../../Descriptors/LowerBodyDescriptor";
import VaginaDescriptor from "../../Descriptors/VaginaDescriptor";
import BallsDescriptor from "../../Descriptors/BallsDescriptor";

//butt expansion
export function brownEgg(large: boolean, player: Player): void {
    outputText("You devour the egg, momentarily sating your hunger.\n\n", true);
    if (!large) {
        outputText("You feel a bit of additional weight on your backside as your " + ButtDescriptor.buttDescription(player) + " gains a bit more padding.", true);
        player.lowerBody.butt.buttRating++;
    }
    else {
        outputText("Your " + ButtDescriptor.buttDescription(player) + " wobbles, nearly throwing you off balance as it grows much bigger!", true);
        player.lowerBody.butt.buttRating += 2 + Utils.rand(3);
    }
    if (Utils.chance(33)) {
        if (large)
            outputText(player.modThickness(100, 8), false);
        else
            outputText(player.modThickness(95, 3), false);
    }
}

//hip expansion
export function purpleEgg(large: boolean, player: Player): void {
    outputText("You devour the egg, momentarily sating your hunger.\n\n", true);
    if (!large || player.lowerBody.hipRating > 20) {
        outputText("You stumble as you feel your " + LowerBodyDescriptor.hipDescription(player) + " widen, altering your gait slightly.", false);
        player.lowerBody.hipRating++;
    }
    else {
        outputText("You stagger wildly as your hips spread apart, widening by inches.  When the transformation finishes you feel as if you have to learn to walk all over again.", false);
        player.lowerBody.hipRating += 2 + Utils.rand(2);
    }
    if (Utils.chance(33)) {
        if (large)
            outputText(player.modThickness(80, 8), false);
        else
            outputText(player.modThickness(80, 3), false);
    }
}

//Femminess
export function pinkEgg(large: boolean, player: Player): void {
    outputText("You devour the egg, momentarily sating your hunger.\n\n", true);
    if (!large) {
        //Remove a dick
        if (player.lowerBody.cockSpot.hasCock()) {
            player.lowerBody.cockSpot.remove(player.lowerBody.cockSpot.list[0]);
            outputText("\n\n", false);
            player.updateGender();
        }
        //remove balls
        if (player.lowerBody.balls > 0) {
            if (player.lowerBody.ballSize > 15) {
                player.lowerBody.ballSize -= 8;
                outputText("Your scrotum slowly shrinks, settling down at a MUCH smaller size.  <b>Your " + BallsDescriptor.ballsDescription(true, true, player) + " are much smaller.</b>\n\n", false);
            }
            else {
                player.lowerBody.balls = 0;
                player.lowerBody.ballSize = 1;
                outputText("Your scrotum slowly shrinks, eventually disappearing entirely!  <b>You've lost your balls!</b>\n\n", false);
            }
        }
        //Fertility boost
        if (player.lowerBody.vaginaSpot.hasVagina() && player.fertility < 40) {
            outputText("You feel a tingle deep inside your body, just above your " + VaginaDescriptor.vaginaDescript(player, player.lowerBody.vaginaSpot.list[0]) + ", as if you were becoming more fertile.\n\n", false);
            player.fertility += 5;
        }
    }
    //LARGE
    else {
        //Remove a dick
        if (player.lowerBody.cockSpot.hasCock()) {
            player.killCocks(-1);
            outputText("\n\n", false);
            player.genderCheck();
        }
        if (player.lowerBody.balls > 0) {
            player.lowerBody.balls = 0;
            player.lowerBody.ballSize = 1;
            outputText("Your scrotum slowly shrinks, eventually disappearing entirely!  <b>You've lost your balls!</b>\n\n", false);
        }
        //Fertility boost
        if (player.lowerBody.vaginaSpot.count() > 0 && player.fertility < 70) {
            outputText("You feel a powerful tingle deep inside your body, just above your " + vaginaDescript(0) + ". Instinctively you know you have become more fertile.\n\n", false);
            player.fertility += 10;
        }
    }
    if (Utils.rand(3) == 0) {
        if (large) outputText(player.modFem(100, 8), false);
        else outputText(player.modFem(95, 3), false);
    }
}

//Maleness
export function blueEgg(large: boolean, player: Player): void {
    let temp2: number = 0;
    let temp3: number = 0;
    outputText("You devour the egg, momentarily sating your hunger.", true);
    if (!large) {
        //Kill pussies!
        if (player.lowerBody.vaginaSpot.count() > 0) {
            outputText("\n\nYour vagina clenches in pain, doubling you over.  You slip a hand down to check on it, only to feel the slit growing smaller and smaller until it disappears, taking your clit with it! <b> Your vagina is gone!</b>", false);
            player.removeVagina(0, 1);
            player.lowerBody.vaginaSpot.list[0].clitLength = .5;
            player.genderCheck();
        }
        //Dickz
        if (player.lowerBody.cockSpot.count() > 0) {
            //Multiz
            if (player.lowerBody.cockSpot.count() > 1) {
                outputText("\n\nYour " + multiCockDescript() + " fill to full-size... and begin growing obscenely.", false);
                temp = player.lowerBody.cockSpot.count();
                while (temp > 0) {
                    temp--;
                    temp2 = player.increaseCock(temp, Utils.rand(3) + 2);
                    temp3 = player.lowerBody.cockSpot.list[temp].thickenCock(1);
                }
                player.lengthChange(temp2, player.lowerBody.cockSpot.count());
                //Display the degree of thickness change.
                if (temp3 >= 1) {
                    if (player.lowerBody.cockSpot.count() == 1) outputText("\n\nYour " + multiCockDescriptLight() + " spreads rapidly, swelling an inch or more in girth, making it feel fat and floppy.", false);
                    else outputText("\n\nYour " + multiCockDescriptLight() + " spread rapidly, swelling as they grow an inch or more in girth, making them feel fat and floppy.", false);
                }
                if (temp3 <= .5) {
                    if (player.lowerBody.cockSpot.count() > 1) outputText("\n\nYour " + multiCockDescriptLight() + " feel swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. They are definitely thicker.", false);
                    else outputText("\n\nYour " + multiCockDescriptLight() + " feels swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. It is definitely thicker.", false);
                }
                if (temp3 > .5 && temp2 < 1) {
                    if (player.lowerBody.cockSpot.count() == 1) outputText("\n\nYour " + multiCockDescriptLight() + " seems to swell up, feeling heavier. You look down and watch it growing fatter as it thickens.", false);
                    if (player.lowerBody.cockSpot.count() > 1) outputText("\n\nYour " + multiCockDescriptLight() + " seem to swell up, feeling heavier. You look down and watch them growing fatter as they thicken.", false);
                }
                dynStats("lib", 1, "sen", 1, "lus", 20);
            }
            //SINGLEZ
            if (player.lowerBody.cockSpot.count() == 1) {
                outputText("\n\nYour " + multiCockDescriptLight() + " fills to its normal size... and begins growing... ", false);
                temp3 = player.lowerBody.cockSpot.list[0].thickenCock(1);
                temp2 = player.increaseCock(0, Utils.rand(3) + 2);
                player.lengthChange(temp2, 1);
                //Display the degree of thickness change.
                if (temp3 >= 1) {
                    if (player.lowerBody.cockSpot.count() == 1) outputText("  Your " + multiCockDescriptLight() + " spreads rapidly, swelling an inch or more in girth, making it feel fat and floppy.", false);
                    else outputText("  Your " + multiCockDescriptLight() + " spread rapidly, swelling as they grow an inch or more in girth, making them feel fat and floppy.", false);
                }
                if (temp3 <= .5) {
                    if (player.lowerBody.cockSpot.count() > 1) outputText("  Your " + multiCockDescriptLight() + " feel swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. They are definitely thicker.", false);
                    else outputText("  Your " + multiCockDescriptLight() + " feels swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. It is definitely thicker.", false);
                }
                if (temp3 > .5 && temp2 < 1) {
                    if (player.lowerBody.cockSpot.count() == 1) outputText("  Your " + multiCockDescriptLight() + " seems to swell up, feeling heavier. You look down and watch it growing fatter as it thickens.", false);
                    if (player.lowerBody.cockSpot.count() > 1) outputText("  Your " + multiCockDescriptLight() + " seem to swell up, feeling heavier. You look down and watch them growing fatter as they thicken.", false);
                }
                dynStats("lib", 1, "sen", 1, "lus", 20);
            }

        }
    }
    //LARGE
    else {
        //New lines if changes
        if (player.bRows() > 1 || player.lowerBody.butt.buttRating > 5 || player.lowerBody.hipRating > 5 || player.lowerBody.vaginaSpot.hasVagina()) outputText("\n\n", false);
        //Kill pussies!
        if (player.lowerBody.vaginaSpot.count() > 0) {
            outputText("Your vagina clenches in pain, doubling you over.  You slip a hand down to check on it, only to feel the slit growing smaller and smaller until it disappears, taking your clit with it!\n\n", false);
            if (player.bRows() > 1 || player.lowerBody.butt.buttRating > 5 || player.lowerBody.hipRating > 5) outputText("  ", false);
            player.removeVagina(0, 1);
            player.lowerBody.vaginaSpot.list[0].clitLength = .5;
            player.genderCheck();
        }
        //Kill extra boobages
        if (player.bRows() > 1) {
            outputText("Your back relaxes as extra weight vanishes from your chest.  <b>Your lowest " + breastDescript(player.bRows() - 1) + " have vanished.</b>", false);
            if (player.lowerBody.butt.buttRating > 5 || player.lowerBody.hipRating > 5) outputText("  ", false);
            //Remove lowest row.
            player.removeBreastRow((player.bRows() - 1), 1);
        }
        //Ass/hips shrinkage!
        if (player.lowerBody.butt.buttRating > 5) {
            outputText("Muscles firm and tone as you feel your " + buttDescript() + " become smaller and tighter.", false);
            if (player.lowerBody.hipRating > 5) outputText("  ", false);
            player.lowerBody.butt.buttRating -= 2;
        }
        if (player.lowerBody.hipRating > 5) {
            outputText("Feeling the sudden burning of lactic acid in your " + hipDescript() + ", you realize they have slimmed down and firmed up some.", false);
            player.lowerBody.hipRating -= 2;
        }
        //Shrink tits!
        if (player.upperBody.chest.BreastRatingLargest[0].breastRating > 0) {
            player.shrinkTits();
        }
        if (player.lowerBody.cockSpot.count() > 0) {
            //Multiz
            if (player.lowerBody.cockSpot.count() > 1) {
                outputText("\n\nYour " + multiCockDescript() + " fill to full-size... and begin growing obscenely.  ", false);
                temp = player.lowerBody.cockSpot.count();
                while (temp > 0) {
                    temp--;
                    temp2 = player.increaseCock(temp, Utils.rand(3) + 5);
                    temp3 = player.lowerBody.cockSpot.list[temp].thickenCock(1.5);
                }
                player.lengthChange(temp2, player.lowerBody.cockSpot.count());
                //Display the degree of thickness change.
                if (temp3 >= 1) {
                    if (player.lowerBody.cockSpot.count() == 1) outputText("\n\nYour " + multiCockDescriptLight() + " spreads rapidly, swelling an inch or more in girth, making it feel fat and floppy.", false);
                    else outputText("\n\nYour " + multiCockDescriptLight() + " spread rapidly, swelling as they grow an inch or more in girth, making them feel fat and floppy.", false);
                }
                if (temp3 <= .5) {
                    if (player.lowerBody.cockSpot.count() > 1) outputText("\n\nYour " + multiCockDescriptLight() + " feel swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. They are definitely thicker.", false);
                    else outputText("\n\nYour " + multiCockDescriptLight() + " feels swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. It is definitely thicker.", false);
                }
                if (temp3 > .5 && temp2 < 1) {
                    if (player.lowerBody.cockSpot.count() == 1) outputText("\n\nYour " + multiCockDescriptLight() + " seems to swell up, feeling heavier. You look down and watch it growing fatter as it thickens.", false);
                    if (player.lowerBody.cockSpot.count() > 1) outputText("\n\nYour " + multiCockDescriptLight() + " seem to swell up, feeling heavier. You look down and watch them growing fatter as they thicken.", false);
                }
                dynStats("lib", 1, "sen", 1, "lus", 20);
            }
            //SINGLEZ
            if (player.lowerBody.cockSpot.count() == 1) {
                outputText("\n\nYour " + multiCockDescriptLight() + " fills to its normal size... and begins growing...", false);
                temp3 = player.lowerBody.cockSpot.list[0].thickenCock(1.5);
                temp2 = player.increaseCock(0, Utils.rand(3) + 5);
                player.lengthChange(temp2, 1);
                //Display the degree of thickness change.
                if (temp3 >= 1) {
                    if (player.lowerBody.cockSpot.count() == 1) outputText("  Your " + multiCockDescriptLight() + " spreads rapidly, swelling an inch or more in girth, making it feel fat and floppy.", false);
                    else outputText("  Your " + multiCockDescriptLight() + " spread rapidly, swelling as they grow an inch or more in girth, making them feel fat and floppy.", false);
                }
                if (temp3 <= .5) {
                    if (player.lowerBody.cockSpot.count() > 1) outputText("  Your " + multiCockDescriptLight() + " feel swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. They are definitely thicker.", false);
                    else outputText("  Your " + multiCockDescriptLight() + " feels swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. It is definitely thicker.", false);
                }
                if (temp3 > .5 && temp2 < 1) {
                    if (player.lowerBody.cockSpot.count() == 1) outputText("  Your " + multiCockDescriptLight() + " seems to swell up, feeling heavier. You look down and watch it growing fatter as it thickens.", false);
                    if (player.lowerBody.cockSpot.count() > 1) outputText("  Your " + multiCockDescriptLight() + " seem to swell up, feeling heavier. You look down and watch them growing fatter as they thicken.", false);
                }
                dynStats("lib", 1, "sen", 1, "lus", 20);
            }

        }
    }
    if (Utils.rand(3) == 0) {
        if (large) outputText(player.modFem(0, 8), false);
        else outputText(player.modFem(5, 3), false);
    }
}

//Nipplezzzzz
export function whiteEgg(large: boolean, player: Player): void {
    let temp2: number = 0;
    outputText("You devour the egg, momentarily sating your hunger.", true);
    if (!large) {
        //Grow nipples
        if (player.upperBody.chest.BreastRatingLargest[0].nippleLength < 3 && player.upperBody.chest.BreastRatingLargest[0].breastRating > 0) {
            outputText("\n\nYour nipples engorge, prodding hard against the inside of your " + player.armorName + ".  Abruptly you realize they've gotten almost a quarter inch longer.", false);
            player.upperBody.chest.BreastRatingLargest[0].nippleLength += .2;
            dynStats("lus", 15);
        }
    }
    //LARGE
    else {
        //Grow nipples
        if (player.upperBody.chest.BreastRatingLargest[0].nippleLength < 3 && player.upperBody.chest.BreastRatingLargest[0].breastRating > 0) {
            outputText("\n\nYour nipples engorge, prodding hard against the inside of your " + player.armorName + ".  Abruptly you realize they've grown more than an additional quarter-inch.", false);
            player.upperBody.chest.BreastRatingLargest[0].nippleLength += (Utils.rand(2) + 3) / 10;
            dynStats("lus", 15);
        }
        //NIPPLECUNTZZZ
        temp = player.upperBody.chest.count();
        //Set nipplecunts on every row.
        while (temp > 0) {
            temp--;
            if (!player.upperBody.chest.list[temp].fuckable && player.upperBody.chest.BreastRatingLargest[0].nippleLength >= 2) {
                player.upperBody.chest.list[temp].fuckable = true;
                //Keep track of changes.
                temp2++;
            }
        }
        //Talk about if anything was changed.
        if (temp2 > 0) outputText("\n\nYour " + allBreastsDescript() + " tingle with warmth that slowly migrates to your nipples, filling them with warmth.  You pant and moan, rubbing them with your fingers.  A trickle of wetness suddenly coats your finger as it slips inside the nipple.  Shocked, you pull the finger free.  <b>You now have fuckable nipples!</b>", false);
    }
}

export function blackRubberEgg(large: boolean, player: Player): void {
    outputText("You devour the egg, momentarily sating your hunger.", true);
    //Small
    if (!large) {
        //Change skin to normal if not flawless!
        if ((player.skinAdj != "smooth" && player.skinAdj != "latex" && player.skinAdj != "rubber") || player.skinDesc != "skin") {
            outputText("\n\nYour " + player.skinDesc + " tingles delightfully as it ", false);
            if (player.skinType == SKIN.PLAIN) outputText(" loses its blemishes, becoming flawless smooth skin.", false);
            if (player.skinType == SKIN.FUR) outputText(" falls out in clumps, revealing smooth skin underneath.", false);
            if (player.skinType == SKIN.SCALES) outputText(" begins dropping to the ground in a pile around you, revealing smooth skin underneath.", false);
            if (player.skinType > SKIN.SCALES) outputText(" shifts and changes into flawless smooth skin.", false);
            player.skinDesc = "skin";
            player.skinAdj = "smooth";
            if (player.skinTone == "rough gray") player.skinTone = "gray";
            player.skinType = SKIN.PLAIN;
        }
        //chance of hair change
        else {
            //If hair isn't rubbery/latex yet
            if (player.hairColor.indexOf("rubbery") == -1 && player.hairColor.indexOf("latex-textured") && player.hairLength != 0) {
                //if skin is already one...
                if (player.skinDesc == "skin" && player.skinAdj == "rubber") {
                    outputText("\n\nYour scalp tingles and your " + hairDescript() + " thickens, the stUtils.rands merging into ", false);
                    outputText(" thick rubbery hair.", false);
                    player.hairColor = "rubbery " + player.hairColor;
                    dynStats("cor", 2);
                }
                if (player.skinDesc == "skin" && player.skinAdj == "latex") {
                    outputText("\n\nYour scalp tingles and your " + hairDescript() + " thickens, the stUtils.rands merging into ", false);
                    outputText(" shiny latex hair.", false);
                    player.hairColor = "latex-textured " + player.hairColor;
                    dynStats("cor", 2);
                }
            }
        }
    }
    //Large
    if (large) {
        //Change skin to latex if smooth.
        if (player.skinDesc == "skin" && player.skinAdj == "smooth") {
            outputText("\n\nYour already flawless smooth skin begins to tingle as it changes again.  It becomes shinier as its texture changes subtly.  You gasp as you touch yourself and realize your skin has become ", false);
            if (Utils.rand(2) == 0) {
                player.skinDesc = "skin";
                player.skinAdj = "latex";
                outputText("a layer of pure latex.  ", false);
            }
            else {
                player.skinDesc = "skin";
                player.skinAdj = "rubber";
                outputText("a layer of sensitive rubber.  ", false);
            }
            flags[FlagEnum.PC_KNOWS_ABOUT_BLACK_EGGS] = 1;
            if (player.stats.cor < 66) outputText("You feel like some kind of freak.", false);
            else outputText("You feel like some kind of sexy " + player.skinDesc + " love-doll.", false);
            dynStats("spe", -3, "sen", 8, "lus", 10, "cor", 2);
        }
        //Change skin to normal if not flawless!
        if ((player.skinAdj != "smooth" && player.skinAdj != "latex" && player.skinAdj != "rubber") || player.skinDesc != "skin") {
            outputText("\n\nYour " + player.skinDesc + " tingles delightfully as it ", false);
            if (player.skinType == SKIN.PLAIN) outputText(" loses its blemishes, becoming flawless smooth skin.", false);
            if (player.skinType == SKIN.FUR) outputText(" falls out in clumps, revealing smooth skin underneath.", false);
            if (player.skinType == SKIN.SCALES) outputText(" begins dropping to the ground in a pile around you, revealing smooth skin underneath.", false);
            if (player.skinType > SKIN.SCALES) outputText(" shifts and changes into flawless smooth skin.", false);
            player.skinDesc = "skin";
            player.skinAdj = "smooth";
            if (player.skinTone == "rough gray") player.skinTone = "gray";
            player.skinType = SKIN.PLAIN;
        }
        //chance of hair change
        else {
            //If hair isn't rubbery/latex yet
            if (player.hairColor.indexOf("rubbery") == -1 && player.hairColor.indexOf("latex-textured") && player.hairLength != 0) {
                //if skin is already one...
                if (player.skinAdj == "rubber" && player.skinDesc == "skin") {
                    outputText("\n\nYour scalp tingles and your " + hairDescript() + " thickens, the stUtils.rands merging into ", false);
                    outputText(" thick rubbery hair.", false);
                    player.hairColor = "rubbery " + player.hairColor;
                    dynStats("cor", 2);
                }
                if (player.skinAdj == "latex" && player.skinDesc == "skin") {
                    outputText("\n\nYour scalp tingles and your " + hairDescript() + " thickens, the stUtils.rands merging into ", false);
                    outputText(" shiny latex hair.", false);
                    player.hairColor = "latex-textured " + player.hairColor;
                    dynStats("cor", 2);
                }
            }
        }
    }
}
