﻿import Player from "../Player";
import StatusAffect from "../StatusAffect";
import Utils from "../Utilities/Utils";
import Flags, { FlagEnum } from "../GlobalFlags/Flags"
import { Gender } from "../Creature";

export default class Mutations {
    //Cerulean P.
    public ceruleanPotion(player: Player): void {
        player.slimeFeed();
        //Repeat genderless encounters
        if (player.gender == Gender.NONE && Flags.get(FlagEnum.CERULEAN_POTION_NEUTER_ATTEMPTED) > 0) {
            MainScreen.text("You take another sip of the Cerulean Potion.  You find it soothing and become very excited about the possibility of another visit from the succubus.", true);
        }
        else if (player.gender == Gender.HERM && Flags.get(FlagEnum.CERULEAN_POTION_HERM_USED) > 0) {
            MainScreen.text("With anticipation, you chug down another bottle of the Cerulean Potion. A warm sensation radiates out from your stomach as you feel the potion course through your body.", true);
        }
        //All else
        else {
            MainScreen.text("The liquid tastes rather bland and goes down easily. ", true);
            //Special repeat texts
            if (player.statusAffects.has("RepeatSuccubi"))
                MainScreen.text("You look forwards to tonight's encounter.", false);
            //First timer huh?
            else MainScreen.text("You do not notice any real effects.  Did the merchant con you?", false);
        }
        if (player.statusAffects.has("SuccubiNight"))
            if (player.statusAffects.get("SuccubiNight").value1 < 3)
                player.statusAffects.get("SuccubiNight").value1 = 1;
            else
                player.statusAffects.add(new StatusAffect("SuccubiNight", 1, 0, 0, 0));
    }

    //Vitality Tincture
    public vitalityTincture(player: Player): void {
        player.slimeFeed();
        MainScreen.text("You down the contents of the bottle. The liquid is thick and tastes remarkably like cherries. Within moments, you feel much more fit and healthy.", true);
        //str change
        let temp: number = Utils.rand(3);
        player.stats.str = temp;
        //Garunteed toughness if no str
        if (temp == 0) {
            temp = Utils.rand(3);
            if (temp == 0) temp = 1;
        }
        else
            temp = Utils.rand(3);
        //tou change
        player.stats.tou = temp;
        //Chance of fitness change
        if (HPChange(50, false))
            MainScreen.text("  Any aches, pains and bruises you have suffered no longer hurt and you feel much better.", false);
        if (Utils.chance(33))
            MainScreen.text(player.modTone(95, 3), false);
    }

    //Scholar's Tea
    public scholarsTea(player: Player): void {
        player.slimeFeed();
        MainScreen.text("Following the merchant's instructions, you steep and drink the tea. Its sharp taste fires up your palate and in moments, you find yourself more alert and insightful. As your mind wanders, a creative, if somewhat sordid, story comes to mind. It is a shame that you do not have writing implements as you feel you could make a coin or two off what you have conceived. The strange seller was not lying about the power of the tea.", true);
        if (Utils.rand(3) == 0)
            MainScreen.text(player.modTone(15, 1), false);
        player.stats.int = 2.5 + Utils.rand(5);
    }

    /* ITEMZZZZZ S GO HERE */
    public incubiDraft(tainted: boolean, player: Player): void {
        player.slimeFeed();
        let temp2: number = 0;
        let temp3: number = 0;
        let rando: number = Utils.rand(100);
        if (player.perks.has("HistoryAlchemist"))
            rando += 10;
        MainScreen.text("The draft is slick and sticky, ", true);
        if (player.stats.cor <= 33)
            MainScreen.text("just swallowing it makes you feel unclean.", false);
        if (player.stats.cor > 33 && player.stats.cor <= 66)
            MainScreen.text("reminding you of something you just can't place.", false);
        if (player.stats.cor > 66)
            MainScreen.text("deliciously sinful in all the right ways.", false);
        if (player.stats.cor >= 90)
            MainScreen.text("  You're sure it must be distilled from the cum of an incubus.", false);
        //Lowlevel changes
        if (rando < 50) {
            if (player.lowerBody.cockSpot.count() == 1) {
                if (player.lowerBody.cockSpot.list[0].cockType != CockType.DEMON) MainScreen.text("\n\nYour " + cockDescript(0) + " becomes shockingly hard.  It turns a shiny inhuman purple and spasms, dribbling hot demon-like cum as it begins to grow.", false);
                else MainScreen.text("\n\nYour " + cockDescript(0) + " becomes shockingly hard.  It dribbles hot demon-like cum as it begins to grow.", false);
                if (Utils.rand(4) == 0) temp = player.increaseCock(0, 3);
                else temp = player.increaseCock(0, 1);
                dynStats("int", 1, "lib", 2, "sen", 1, "lust", 5 + temp * 3, "cor", tainted ? 1 : 0);
                if (temp < .5) MainScreen.text("  It stops almost as soon as it starts, growing only a tiny bit longer.", false);
                if (temp >= .5 && temp < 1) MainScreen.text("  It grows slowly, stopping after roughly half an inch of growth.", false);
                if (temp >= 1 && temp <= 2) MainScreen.text("  The sensation is incredible as more than an inch of lengthened dick-flesh grows in.", false);
                if (temp > 2) MainScreen.text("  You smile and idly stroke your lengthening " + cockDescript(0) + " as a few more inches sprout.", false);
                if (tainted) dynStats("int", 1, "lib", 2, "sen", 1, "lus", 5 + temp * 3, "cor", 1);
                else dynStats("int", 1, "lib", 2, "sen", 1, "lus", 5 + temp * 3);
                if (player.lowerBody.cockSpot.list[0].cockType != CockType.DEMON) MainScreen.text("  With the transformation complete, your " + cockDescript(0) + " returns to its normal coloration.", false);
                else MainScreen.text("  With the transformation complete, your " + cockDescript(0) + " throbs in an almost happy way as it goes flaccid once more.", false);
            }
            if (player.lowerBody.cockSpot.count() > 1) {
                temp = player.lowerBody.cockSpot.count();
                temp2 = 0;
                //Find shortest cock
                while (temp > 0) {
                    temp--;
                    if (player.lowerBody.cockSpot.list[temp].cockLength <= player.lowerBody.cockSpot.list[temp2].cockLength) {
                        temp2 = temp;
                    }
                }
                if (int(Math.Utils.random() * 4) == 0) temp3 = player.increaseCock(temp2, 3);
                else temp3 = player.increaseCock(temp2, 1);
                if (tainted) dynStats("int", 1, "lib", 2, "sen", 1, "lus", 5 + temp * 3, "cor", 1);
                else dynStats("int", 1, "lib", 2, "sen", 1, "lus", 5 + temp * 3);
                //Grammar police for 2 cocks
                if (player.lowerBody.cockSpot.count() == 2) MainScreen.text("\n\nBoth of your " + multiCockDescriptLight() + " become shockingly hard, swollen and twitching as they turn a shiny inhuman purple in color.  They spasm, dripping thick ropes of hot demon-like pre-cum along their lengths as your shortest " + cockDescript(temp2) + " begins to grow.", false);
                //For more than 2
                else MainScreen.text("\n\nAll of your " + multiCockDescriptLight() + " become shockingly hard, swollen and twitching as they turn a shiny inhuman purple in color.  They spasm, dripping thick ropes of hot demon-like pre-cum along their lengths as your shortest " + cockDescript(temp2) + " begins to grow.", false);

                if (temp3 < .5) MainScreen.text("  It stops almost as soon as it starts, growing only a tiny bit longer.", false);
                if (temp3 >= .5 && temp3 < 1) MainScreen.text("  It grows slowly, stopping after roughly half an inch of growth.", false);
                if (temp3 >= 1 && temp3 <= 2) MainScreen.text("  The sensation is incredible as more than an inch of lengthened dick-flesh grows in.", false);
                if (temp3 > 2) MainScreen.text("  You smile and idly stroke your lengthening " + cockDescript(temp2) + " as a few more inches sprout.", false);
                MainScreen.text("  With the transformation complete, your " + multiCockDescriptLight() + " return to their normal coloration.", false);
            }
            //NO CAWKS?
            if (player.lowerBody.cockSpot.count() == 0) {
                player.lowerBody.cockSpot.add(new Cock());
                player.lowerBody.cockSpot.list[0].cockLength = Utils.rand(3) + 4;
                player.lowerBody.cockSpot.list[0].cockThickness = 1;
                MainScreen.text("\n\nYou shudder as a pressure builds in your crotch, peaking painfully as a large bulge begins to push out from your body.  ", false);
                MainScreen.text("The skin seems to fold back as a fully formed demon-cock bursts forth from your loins, drizzling hot cum everywhere as it orgasms.  Eventually the orgasm ends as your " + cockDescript(0) + " fades to a more normal " + player.skinTone + " tone.", false);
                if (tainted) dynStats("lib", 3, "sen", 5, "lus", 10, "cor", 5);
                else dynStats("lib", 3, "sen", 5, "lus", 10);
            }
            //TIT CHANGE 25% chance of shrinkage
            if (Utils.rand(4) == 0) {
                if (!flags[FlagEnum.HYPER_HAPPY]) {
                    player.shrinkTits();
                }
            }
        }
        //Mid-level changes
        if (Utils.rando >= 50 && Utils.rando < 93) {
            if (player.lowerBody.cockSpot.count() > 1) {
                MainScreen.text("\n\nYour cocks fill to full-size... and begin growing obscenely.  ", false);
                temp = player.lowerBody.cockSpot.count();
                while (temp > 0) {
                    temp--;
                    temp2 = player.increaseCock(temp, Utils.rand(3) + 2);
                    temp3 = player.lowerBody.cockSpot.list[temp].thickenCock(1);
                    if (temp3 < .1) player.lowerBody.cockSpot.list[temp].cockThickness += .05;
                }
                player.lengthChange(temp2, player.lowerBody.cockSpot.count());
                //Display the degree of thickness change.
                if (temp3 >= 1) {
                    if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("\n\nYour cock spreads rapidly, swelling an inch or more in girth, making it feel fat and floppy.", false);
                    else MainScreen.text("\n\nYour cocks spread rapidly, swelling as they grow an inch or more in girth, making them feel fat and floppy.", false);
                }
                if (temp3 <= .5) {
                    if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("\n\nYour cocks feel swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. They are definitely thicker.", false);
                    else MainScreen.text("\n\nYour cock feels swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. It is definitely thicker.", false);
                }
                if (temp3 > .5 && temp2 < 1) {
                    if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("\n\nYour cock seems to swell up, feeling heavier. You look down and watch it growing fatter as it thickens.", false);
                    if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("\n\nYour cocks seem to swell up, feeling heavier. You look down and watch them growing fatter as they thicken.", false);
                }
                if (tainted) dynStats("lib", 3, "sen", 5, "lus", 10, "cor", 3);
                else dynStats("lib", 3, "sen", 5, "lus", 10);
            }
            if (player.lowerBody.cockSpot.count() == 1) {
                MainScreen.text("\n\nYour cock fills to its normal size and begins growing... ", false);
                temp3 = player.lowerBody.cockSpot.list[0].thickenCock(1);
                temp2 = player.increaseCock(0, Utils.rand(3) + 2);
                player.lengthChange(temp2, 1);
                //Display the degree of thickness change.
                if (temp3 >= 1) {
                    if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("  Your cock spreads rapidly, swelling an inch or more in girth, making it feel fat and floppy.", false);
                    else MainScreen.text("  Your cocks spread rapidly, swelling as they grow an inch or more in girth, making them feel fat and floppy.", false);
                }
                if (temp3 <= .5) {
                    if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("  Your cocks feel swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. They are definitely thicker.", false);
                    else MainScreen.text("  Your cock feels swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. It is definitely thicker.", false);
                }
                if (temp3 > .5 && temp2 < 1) {
                    if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("  Your cock seems to swell up, feeling heavier. You look down and watch it growing fatter as it thickens.", false);
                    if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("  Your cocks seem to swell up, feeling heavier. You look down and watch them growing fatter as they thicken.", false);
                }
                if (tainted) dynStats("lib", 3, "sen", 5, "lus", 10, "cor", 3);
                else dynStats("lib", 3, "sen", 5, "lus", 10);
            }
            if (player.lowerBody.cockSpot.count() == 0) {
                player.lowerBody.cockSpot.add(new Cock());
                player.lowerBody.cockSpot.list[0].cockLength = Utils.rand(3) + 4;
                player.lowerBody.cockSpot.list[0].cockThickness = 1;
                MainScreen.text("\n\nYou shudder as a pressure builds in your crotch, peaking painfully as a large bulge begins to push out from your body.  ", false);
                MainScreen.text("The skin seems to fold back as a fully formed demon-cock bursts forth from your loins, drizzling hot cum everywhere as it orgasms.  Eventually the orgasm ends as your " + cockDescript(0) + " fades to a more normal " + player.skinTone + " tone.", false);
                if (tainted) dynStats("lib", 3, "sen", 5, "lus", 10, "cor", 3);
                else dynStats("lib", 3, "sen", 5, "lus", 10);
            }
            //Shrink breasts a more
            //TIT CHANGE 50% chance of shrinkage
            if (Utils.rand(2) == 0) {
                if (!flags[FlagEnum.HYPER_HAPPY]) {
                    player.shrinkTits();
                }
            }
        }
        //High level change
        if (Utils.rando >= 93) {
            if (player.lowerBody.cockSpot.count() < 10) {
                if (int(Math.Utils.random() * 10) < int(player.stats.cor / 25)) {
                    MainScreen.text("\n\n", false);
                    growDemonCock(Utils.rand(2) + 2);
                    if (tainted) dynStats("lib", 3, "sen", 5, "lus", 10, "cor", 5);
                    else dynStats("lib", 3, "sen", 5, "lus", 10);
                }
                else {
                    growDemonCock(1);
                }
            }
            if (!flags[FlagEnum.HYPER_HAPPY]) {
                player.shrinkTits();
                player.shrinkTits();
            }
        }
        //Demonic changes - higher chance with higher corruption.
        if (Utils.rand(40) + player.stats.cor / 3 > 35 && tainted) demonChanges(player);
        player.genderCheck();
        if (Utils.rand(4) == 0 && tainted) MainScreen.text(player.modFem(5, 2), false);
        if (Utils.rand(4) == 0 && tainted) MainScreen.text(player.modThickness(30, 2), false);
    }

    public growDemonCock(growCocks: number): void {
        temp = 0;
        while (growCocks > 0) {
            player.lowerBody.cockSpot.add(new Cock());
            trace("COCK LENGTH: " + player.lowerBody.cockSpot.list[length - 1].cockLength);
            player.lowerBody.cockSpot.list[player.lowerBody.cockSpot.count() - 1].cockLength = Utils.rand(3) + 4;
            player.lowerBody.cockSpot.list[player.lowerBody.cockSpot.count() - 1].cockThickness = .75;
            trace("COCK LENGTH: " + player.lowerBody.cockSpot.list[length - 1].cockLength);
            growCocks--;
            temp++;
        }
        MainScreen.text("\n\nYou shudder as a pressure builds in your crotch, peaking painfully as a large bulge begins to push out from your body.  ", false);
        if (temp == 1) {
            MainScreen.text("The skin seems to fold back as a fully formed demon-cock bursts forth from your loins, drizzling hot cum everywhere as it orgasms.  In time it fades to a more normal coloration and human-like texture.  ", false);
        }
        else {
            MainScreen.text("The skin bulges obscenely, darkening and splitting around " + num2Text(temp) + " of your new dicks.  For an instant they turn a demonic purple and dribble in thick spasms of scalding demon-cum.  After, they return to a more humanoid coloration.  ", false);
        }
        if (temp > 4) MainScreen.text("Your tender bundle of new cocks feels deliciously sensitive, and you cannot stop yourself from wrapping your hands around the slick demonic bundle and pleasuring them.\n\nNearly an hour later, you finally pull your slick body away from the puddle you left on the ground.  When you look back, you notice it has already been devoured by the hungry earth.", false);
        player.orgasm();
    }

    public tatteredScroll(player: Player): void {
        MainScreen.text("Your wobbly " + player.legs() + " give out underneath you as your body's willpower seems to evaporate, your mouth reading the words on the scroll with a backwards sounding sing-song voice.\n\n", true);
        if (player.hairColor == "sandy blonde") {
            MainScreen.text("Your mouth forms a smile of its own volition, reading, \"<i>Tresed eht retaw llahs klim ruoy.</i>\"\n\n", false);
            if (player.upperBody.chest.count() == 0 || player.upperBody.chest.BreastRatingLargest[0].breastRating == 0) {
                MainScreen.text("You grow a perfectly rounded pair of C-cup breasts!  ", false);
                if (player.upperBody.chest.count() == 0) player.createBreastRow();
                player.upperBody.chest.list[0].breasts = 2;
                player.upperBody.chest.list[0].breastRating = 3;
                if (player.upperBody.chest.list[0].nipplesPerBreast < 1) player.upperBody.chest.list[0].nipplesPerBreast = 1;
                dynStats("sen", 2, "lus", 1);
            }
            if (player.upperBody.chest.BreastRatingLargest[0].breastRating > 0 && player.upperBody.chest.BreastRatingLargest[0].breastRating < 3) {
                MainScreen.text("Your breasts suddenly balloon outwards, stopping as they reach a perfectly rounded C-cup.  ", false);
                player.upperBody.chest.list[0].breastRating = 3;
                dynStats("sen", 1, "lus", 1);
            }
            if (player.averageNipplesPerBreast() < 1) {
                MainScreen.text("A dark spot appears on each breast, rapidly forming into a sensitive nipple.  ", false);
                temp = player.upperBody.chest.count();
                while (temp > 0) {
                    temp--;
                    //If that breast didnt have nipples reset length
                    if (player.upperBody.chest.list[0].nipplesPerBreast < 1) player.upperBody.chest.list[0].nippleLength = .2;
                    player.upperBody.chest.list[0].nipplesPerBreast = 1;
                }
                dynStats("sen", 2, "lus", 1);
            }
            if (player.biggestLactation() > 0) {
                MainScreen.text("A strong pressure builds in your chest, painful in its intensity.  You yank down your top as ", false);
                if (player.biggestLactation() < 2) MainScreen.text("powerful jets of milk spray from your nipples, spraying thick streams over the ground.  You moan at the sensation and squeeze your tits, hosing down the tainted earth with an offering of your milk.  You blush as the milk ends, quite embarassed with your increased milk production.  ", false);
                if (player.biggestLactation() >= 2 && player.biggestLactation() <= 2.6) MainScreen.text("eruptions of milk squirt from your nipples, hosing thick streams everywhere.  The feeling of the constant gush of fluids is very erotic, and you feel yourself getting more and more turned on.  You start squeezing your breasts as the flow diminishes, anxious to continue the pleasure, but eventually all good things come to an end.  ", false);
                if (player.biggestLactation() > 2.6 && player.biggestLactation() < 3) MainScreen.text("thick hoses of milk erupt from your aching nipples, forming puddles on the ground.  You smile at how well you're feeding the earth, your milk coating the ground faster than it can be absorbed.  The constant lactation is pleasurable... in a highly erotic way, and you find yourself moaning and pulling on your nipples, your hands completely out of control.  In time you realize the milk has stopped, and even had time to soak into the dirt.  You wonder at your strange thoughts and pull your hands from your sensitive nipples.  ", false);

                if (player.biggestLactation() >= 3) MainScreen.text("you drop to your knees and grab your nipples.  With a very sexual moan you begin milking yourself, hosing out huge quantities of milk.  You pant and grunt, offering as much of your milk as you can.  It cascades down a hill in a small stream, and you can't help but blush with pride... and lust.  The erotic pleasures build as you do your best to feed the ground all of your milk.  You ride the edge of orgasm for an eternity, milk everywhere.  When you come to, you realize you're kneeling there, tugging your dry nipples.  Embarrassed, you stop, but your arousal remains.  ", false);
                if (player.biggestLactation() < 3) {
                    player.boostLactation(.7);
                    MainScreen.text("Your breasts feel fuller... riper... like your next milking could be even bigger.  ", false);
                }
                dynStats("lib", 1, "sen", 4, "lus", 15);
            }
            if (player.biggestLactation() == 0) {
                MainScreen.text("A pleasurable release suddenly erupts from your nipples!  Twin streams of milk are spraying from your breasts, soaking into the ground immediately.  It stops all too soon, though a voice in your head assures you that you can lactate quite often now.  ", false);
                player.boostLactation(1);
                dynStats("lib", .5, "sen", 1, "lus", 10);
            }
            MainScreen.text("\n\nYour mouth curls into a sick smile and, with a voice that isn't your own, speaks, \"<i>I ALWAYS get what I want, dear...</i>\"", false);
            doNext(camp.returnToCampUseOneHour);
        }
        else {
            MainScreen.text("Your mouth forms a smile of its own volition, reading, \"<i>nuf erutuf rof riah ydnas, nus tresed eht sa ydnas.</i>\"\n\nYou feel a tingling in your scalp, and realize your hair has become a sandy blonde!", false);
            player.hairColor = "sandy blonde";
            MainScreen.text("\n\nYour mouth curls with a sick smile, speaking with a voice that isn't your own, \"<i>I ALWAYS get what I want, dear...</i>\"", false);
            doNext(camp.returnToCampUseOneHour);
        }
        if (!kGAMECLASS.inCombat) {
            //RAEP
            spriteSelect(50);
            MainScreen.text("\n\nYou hear the soft impact of clothes hitting the ground behind you, and turn to see that the sand witch has found you! You cannot resist a peek at your uninvited guest, beholding a curvy dark-skinned beauty, her form dominated by a quartet of lactating breasts.  Somewhere in your lust-fogged mind you register the top two as something close to double-Ds, and her lower pair to be about Cs.  She smiles and leans over you, pushing you to the ground violently.\n\nShe turns around and drops, planting her slick honey-pot firmly against your mouth.  Her scent is strong, overpowering in its intensity.  Your tongue darts out for a taste and finds a treasure trove of sticky sweetness.  Instinctively you tongue-fuck her, greedily devouring her cunny-juice, shoving your tongue in as far as possible while suckling her clit.  Dimly you feel the milk spattering over you, splashing off you and into the cracked earth.  Everywhere the milk touches feels silky smooth and sensitive, and your hands begin stroking your body, rubbing it in as the witch sprays more and more of it.  You lose track of time, orgasming many times, slick and sticky with sexual fluids.", false);
            player.orgasm();
            dynStats("lib", 1, "sen", 5);
            player.slimeFeed();
        }
    }

    public minotaurCum(player: Player): void {
        player.slimeFeed();
        //Minotaur cum addiction
        player.minoCumAddiction(7);
        MainScreen.text("", true);
        MainScreen.text("As soon as you crack the seal on the bottled white fluid, a ", false);
        if (flags[FlagEnum.MINOTAUR_CUM_ADDICTION_STATE] == 0) MainScreen.text("potent musk washes over you.", false);
        else MainScreen.text("heavenly scent fills your nostrils.", false);
        if (flags[FlagEnum.MINOTAUR_CUM_ADDICTION_TRACKER] < 50) MainScreen.text("  It makes you feel dizzy, ditzy, and placid.", false);
        else MainScreen.text("  It makes you feel euphoric, happy, and willing to do ANYTHING to keep feeling this way.", false);
        MainScreen.text("  Unbidden, your hand brings the bottle to your lips, and the heady taste fills your mouth as you convulsively swallow the entire bottle.", false);
        //-Raises lust by 10.
        //-Raises sensitivity
        dynStats("sen", 1, "lus", 10);
        //-Raises corruption by 1 to 50, then by .5 to 75, then by .25 to 100.
        if (player.stats.cor < 50) dynStats("cor", 1);
        else if (player.stats.cor < 75) dynStats("cor", .5);
        else dynStats("cor", .25);
        MainScreen.text("\n\nIntermittent waves of numbness wash through your body, turning into a warm tingling that makes you feel sensitive all over.  The warmth flows through you, converging in your loins and bubbling up into lust.", false);
        if (player.lowerBody.cockSpot.count() > 0) {
            MainScreen.text("  ", false);
            if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("Y", false);
            else MainScreen.text("Each of y", false);
            MainScreen.text("our " + multiCockDescriptLight() + " aches, flooding with blood until it's bloating and trembling.", false);
        }
        if (player.lowerBody.vaginaSpot.hasVagina()) {
            MainScreen.text("  Your " + clitDescript() + " engorges, ", false);
            if (player.lowerBody.vaginaSpot.list[0].clitLength < 3) MainScreen.text("parting your lips.", false);
            else MainScreen.text("bursting free of your lips and bobbing under its own weight.", false);
            if (player.vaginas[0].vaginalWetness <= VAGINA_WETNESS.NORMAL) MainScreen.text("  Wetness builds inside you as your " + vaginaDescript(0) + " tingles and aches to be filled.", false);
            else if (player.vaginas[0].vaginalWetness <= VAGINA_WETNESS.SLICK) MainScreen.text("  A trickle of wetness escapes your " + vaginaDescript(0) + " as your body reacts to the desire burning inside you.", false);
            else if (player.vaginas[0].vaginalWetness <= VAGINA_WETNESS.DROOLING) MainScreen.text("  Wet fluids leak down your thighs as your body reacts to this new stimulus.", false);
            else MainScreen.text("  Slick fluids soak your thighs as your body reacts to this new stimulus.", false);
        }
        //(Minotaur fantasy)
        if (!kGAMECLASS.inCombat && Utils.rand(10) == 1) {
            MainScreen.text("\n\nYour eyes flutter closed for a second as a fantasy violates your mind.  You're on your knees, prostrate before a minotaur.  Its narcotic scent fills the air around you, and you're swaying back and forth with your belly already sloshing and full of spunk.  Its equine-like member is rubbing over your face, and you submit to the beast, stretching your jaw wide to take its sweaty, glistening girth inside you.  Your tongue quivers happily as you begin sucking and slurping, swallowing each drop of pre-cum you entice from the beastly erection.  Gurgling happily, you give yourself to your inhuman master for a chance to swallow into unthinking bliss.", false);
            dynStats("lib", 1, "lus", Utils.rand(5) + player.stats.cor / 20 + flags[FlagEnum.MINOTAUR_CUM_ADDICTION_TRACKER] / 5);
        }
        //(Healing – if hurt and uber-addicted (hasperk))
        if (player.HP < player.maxHP() && player.perks.has("MinotaurCumAddict")) {
            MainScreen.text("\n\nThe fire of your arousal consumes your body, leaving vitality in its wake.  You feel much better!", false);
            HPChange(int(player.maxHP() / 4), false);
        }
        //Uber-addicted status!
        if (player.perks.has("MinotaurCumAddict") && flags[FlagEnum.MINOTAUR_CUM_REALLY_ADDICTED_STATE] <= 0) {
            flags[FlagEnum.MINOTAUR_CUM_REALLY_ADDICTED_STATE] = 3 + Utils.rand(2);
            MainScreen.text("\n\n<b>Your body feels so amazing and sensitive.  Experimentally you pinch yourself and discover that even pain is turning you on!</b>", false);
        }
    }

    public minotaurBlood(player: Player): void {
        player.slimeFeed();
        //Changes done
        let changes: number = 0;
        //Change limit
        let changeLimit: number = 1;
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(3) == 0) changeLimit++;
        if (Utils.rand(3) == 0) changeLimit++;
        if (player.perks.has("HistoryAlchemist")) changeLimit++;
        if (changeLimit == 1) changeLimit = 2;
        //Temporary storage
        let temp: number = 0;
        let temp2: number = 0;
        let temp3: number = 0;
        //Set up output
        MainScreen.text("You drink the bubbling red fluid, tasting the tangy iron after-taste.", true);
        //STATS
        //Strength h
        if (Utils.rand(3) == 0 && changes < changeLimit) {
            //weaker characters gain more
            if (player.str <= 50) {
                MainScreen.text("\n\nPainful aches ripple through your body, flooding you with pain as your muscles flex and bulge, growing much stronger and more well-defined.", false);
                //very weak players gain more
                if (player.str <= 20) dynStats("str", 3);
                else dynStats("str", 2);
            }
            //stronger characters gain less
            else {
                //small growth if over 75
                if (player.str >= 75) dynStats("str", .5);
                //faster from 50-75
                else dynStats("str", 1);
                MainScreen.text("\n\nYour muscles grow tighter, bulging outwards powerfully as you get even stronger!", false);
            }
            //Chance of speed drop
            if (Utils.rand(2) == 0 && player.str > 50) {
                MainScreen.text("\n\nYou begin to feel that the size of your muscles is starting to slow you down.", false);
                dynStats("spe", -1);
            }
            changes++;
        }
        //Toughness (chance of - sensitivity)
        if (Utils.rand(3) == 0 && changes < changeLimit) {
            //weaker characters gain more
            if (player.tou <= 50) {
                MainScreen.text("\n\nYour hide... skin... whatever... you can feel it getting tougher as it thickens perceptibly.", false);
                //very weak players gain more
                if (player.tou <= 20) dynStats("tou", 3);
                else dynStats("tou", 2);
            }
            //stronger characters gain less
            else {
                //small growth if over 75
                if (player.tou >= 75) dynStats("tou", .5);
                //faster from 50-75
                else dynStats("tou", 1);
                MainScreen.text("\n\nYour tough hide grows slightly thicker.", false);
            }
            //chance of less sensitivity
            if (Utils.rand(2) == 0 && player.stats.sens > 10) {
                if (player.tou > 75) {
                    MainScreen.text("\n\nIt becomes much harder to feel anything through your leathery skin.", false);
                    dynStats("sen", -3);
                }
                if (player.tou <= 75 && player.tou > 50) {
                    MainScreen.text("\n\nThe level of sensation from your skin diminishes noticeably.", false);
                    dynStats("sen", -2);
                }
                if (player.tou <= 50) {
                    MainScreen.text("\n\nYour sense of touch diminishes due to your tougher hide.", false);
                    dynStats("sen", -3);
                }
            }
            changes++;
        }
        //SEXUAL
        //Boosts ball size MORE than equinum :D:D:D:D:D:D:
        if (changes < changeLimit && Utils.rand(2) == 0 && player.lowerBody.ballSize <= 5 && player.horseCocks() > 0) {
            //Chance of ball growth if not 3" yet
            if (player.lowerBody.balls == 0) {
                player.lowerBody.balls = 2;
                player.lowerBody.ballSize = 1;
                MainScreen.text("\n\nA nauseating pressure forms just under the base of your maleness.  With agonizing pain the flesh bulges and distends, pushing out a rounded lump of flesh that you recognize as a testicle!  A moment later relief overwhelms you as the second drops into your newly formed sack.", false);
                dynStats("lib", 2, "lus", 5);
            }
            else {
                player.lowerBody.ballSize++;
                if (player.lowerBody.ballSize <= 2) MainScreen.text("\n\nA flash of warmth passes through you and a sudden weight develops in your groin.  You pause to examine the changes and your roving fingers discover your " + simpleBallsDescript() + " have grown larger than a human's.", false);
                if (player.lowerBody.ballSize > 2) MainScreen.text("\n\nA sudden onset of heat envelops your groin, focusing on your " + sackDescript() + ".  Walking becomes difficult as you discover your " + simpleBallsDescript() + " have enlarged again.", false);
                dynStats("lib", 1, "lus", 3);
            }
            changes++;
        }
        //-Remove feather-arms (copy this for goblin ale, mino blood, equinum, canine pepps, demon items)
        if (changes < changeLimit && player.armType == ARM.HARPY && Utils.rand(4) == 0) {
            MainScreen.text("\n\nYou scratch at your biceps absentmindedly, but no matter how much you scratch, it isn't getting rid of the itch.  Glancing down in irritation, you discover that your feathery arms are shedding their feathery coating.  The wing-like shape your arms once had is gone in a matter of moments, leaving " + player.skinDesc + " behind.", false);
            player.armType = ARM.HUMAN;
            changes++;
        }
        //-Remove chitin-arms (copy this for goblin ale, mino blood, equinum, canine pepps, demon items)
        if (changes < changeLimit && player.armType == ARM.SPIDER && Utils.rand(4) == 0) {
            MainScreen.text("\n\nYou scratch at your biceps absentmindedly, but no matter how much you scratch, it isn't getting rid of the itch.  Glancing down in irritation, you discover that your arms' chitinous covering is flaking away.  The glossy black coating is soon gone, leaving " + player.skinDesc + " behind.", false);
            player.armType = ARM.HUMAN;
            changes++;
        }
        //+hooves
        if (player.lowerBody != LOWER_BODY.HOOFED && player.lowerBody != LOWER_BODY.CENTAUR) {
            if (changes < changeLimit && Utils.rand(3) == 0) {
                changes++;
                if (player.lowerBody == LOWER_BODY.HUMAN) MainScreen.text("\n\nYou stagger as your feet change, curling up into painful angry lumps of flesh.  They get tighter and tighter, harder and harder, until at last they solidify into hooves!", false);
                if (player.lowerBody == LOWER_BODY.DOG) MainScreen.text("\n\nYou stagger as your paws change, curling up into painful angry lumps of flesh.  They get tighter and tighter, harder and harder, until at last they solidify into hooves!", false);
                if (player.lowerBody == LOWER_BODY.NAGA) MainScreen.text("\n\nYou collapse as your sinuous snake-tail tears in half, shifting into legs.  The pain is immense, particularly in your new feet as they curl inward and transform into hooves!", false);
                //Catch-all
                if (player.lowerBody > LOWER_BODY.NAGA) MainScreen.text("\n\nYou stagger as your " + player.feet() + " change, curling up into painful angry lumps of flesh.  They get tighter and tighter, harder and harder, until at last they solidify into hooves!", false);
                if (player.skinType != SKIN.FUR) MainScreen.text("  A fine coat of fur grows out below your waist, itching briefly as it fills in.");
                MainScreen.text("<b>  You now have hooves in place of your feet!</b>", false);
                player.lowerBody = LOWER_BODY.HOOFED;
                dynStats("spe", 1);
                changes++;
            }
        }
        if (!flags[FlagEnum.HYPER_HAPPY]) {
            //Kills vagina size (and eventually the whole vagina)
            if (player.lowerBody.vaginaSpot.count() > 0) {
                if (player.vaginas[0].vaginalLooseness > VAGINA_LOOSENESS.TIGHT) {
                    //tighten that bitch up!
                    MainScreen.text("\n\nYour " + vaginaDescript(0) + " clenches up painfully as it tightens up, becoming smaller and tighter.", false);
                    player.vaginas[0].vaginalLooseness--;
                }
                else {
                    MainScreen.text("\n\nA tightness in your groin is the only warning you get before your <b>" + vaginaDescript(0) + " disappears forever</b>!", false);
                    //Goodbye womanhood!
                    player.removeVagina(0, 1);
                    if (player.lowerBody.cockSpot.count() == 0) {
                        MainScreen.text("  Strangely, your clit seems to have resisted the change, and is growing larger by the moment... shifting into the shape of a small ribbed minotaur-like penis!  <b>You now have a horse-cock!</b>", false);
                        player.lowerBody.cockSpot.add(new Cock());
                        player.lowerBody.cockSpot.list[0].cockLength = player.lowerBody.vaginaSpot.list[0].clitLength + 2;
                        player.lowerBody.cockSpot.list[0].cockThickness = 1;
                        player.lowerBody.cockSpot.list[0].cockType = CockType.HORSE;
                        player.lowerBody.vaginaSpot.list[0].clitLength = .25;
                    }
                    player.genderCheck();
                }
                changes++;
            }
            //-Remove extra breast rows
            if (changes < changeLimit && player.bRows() > 1 && Utils.rand(3) == 0) {
                changes++;
                MainScreen.text("\n\nYou stumble back when your center of balance shifts, and though you adjust before you can fall over, you're left to watch in awe as your bottom-most " + breastDescript(player.upperBody.chest.count() - 1) + " shrink down, disappearing completely into your ", false);
                if (player.bRows() >= 3) MainScreen.text("abdomen", false);
                else MainScreen.text("chest", false);
                MainScreen.text(". The " + nippleDescript(player.upperBody.chest.count() - 1) + "s even fade until nothing but ", false);
                if (player.skinType == SKIN.FUR) MainScreen.text(player.hairColor + " " + player.skinDesc, false);
                else MainScreen.text(player.skinTone + " " + player.skinDesc, false);
                MainScreen.text(" remains. <b>You've lost a row of breasts!</b>", false);
                dynStats("sen", -5);
                player.removeBreastRow(player.upperBody.chest.count() - 1, 1);
            }
            //Shrink boobages till they are normal
            else if (Utils.rand(2) == 0 && changes < changeLimit && player.upperBody.chest.count() > 0) {
                //Single row
                if (player.upperBody.chest.count() == 1) {
                    //Shrink if bigger than B cups
                    if (player.upperBody.chest.list[0].breastRating >= 1) {
                        temp = 1;
                        player.upperBody.chest.list[0].breastRating--;
                        //Shrink again if huuuuge
                        if (player.upperBody.chest.list[0].breastRating > 8) {
                            temp++;
                            player.upperBody.chest.list[0].breastRating--;
                        }
                        //Talk about shrinkage
                        if (temp == 1) MainScreen.text("\n\nYou feel a weight lifted from you, and realize your " + breastDescript(0) + " have shrunk to " + player.breastCup(0) + "s.", false);
                        if (temp == 2) MainScreen.text("\n\nYou feel significantly lighter.  Looking down, you realize your breasts are MUCH smaller, down to " + player.breastCup(0) + "s.", false);
                        changes++;
                    }

                }
                //multiple
                else {
                    //temp2 = amount changed
                    //temp3 = counter
                    temp = 0;
                    temp2 = 0;
                    temp3 = 0;
                    if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 1) MainScreen.text("\n", false);
                    while (temp3 < player.upperBody.chest.count()) {
                        if (player.upperBody.chest.list[temp3].breastRating >= 1) {
                            player.upperBody.chest.list[temp3].breastRating--;
                            temp2++;
                            MainScreen.text("\n", false);
                            //If this isn't the first change...
                            if (temp2 > 1) MainScreen.text("...and y", false);
                            else MainScreen.text("Y", false);
                            MainScreen.text("our " + breastDescript(temp3) + " shrink, dropping to " + player.breastCup(temp3) + "s.", false);
                        }
                        temp3++;
                    }
                    if (temp2 == 2) MainScreen.text("\nYou feel so much lighter after the change.", false);
                    if (temp2 == 3) MainScreen.text("\nWithout the extra weight you feel particularly limber.", false);
                    if (temp2 >= 4) MainScreen.text("\nIt feels as if the weight of the world has been lifted from your shoulders, or in this case, your chest.", false);
                    if (temp2 > 0) changes++;
                }
            }
        }
        //Boosts cock size up to 36"x5".
        if (changes < changeLimit && Utils.rand(2) == 0 && player.lowerBody.cockSpot.count() > 0) {
            let selectedCock: number = -1;
            for (let i: number = 0; i < player.lowerBody.cockSpot.count(); i++) {
                if (player.lowerBody.cockSpot.list[i].cockType == CockType.HORSE && (player.lowerBody.cockSpot.list[i].cockLength < 36 || player.lowerBody.cockSpot.list[i].cockThickness < 5)) {
                    selectedCock = i;
                    break;
                }
            }

            //Length first
            if (selectedCock != -1) {
                //Thickness too if small enough
                if (player.lowerBody.cockSpot.list[selectedCock].cockThickness < 5) {
                    //Increase by 2 + Utils.rand(8), and store the actual amount in temp
                    temp = player.increaseCock(selectedCock, 2 + Utils.rand(8));
                    temp += player.lowerBody.cockSpot.list[selectedCock].thickenCock(1);
                    //Comment on length changes
                    if (temp > 6) MainScreen.text("\n\nGasping in sudden pleasure, your " + cockDescript(selectedCock) + " surges free of its sheath, emerging with over half a foot of new dick-flesh.", false);
                    if (temp <= 6 && temp >= 3) MainScreen.text("\n\nYou pant in delight as a few inches of " + cockDescript(selectedCock) + " pop free from your sheath, the thick new horse-flesh still slick and sensitive.", false);
                    if (temp < 3) MainScreen.text("\n\nGroaning softly, you feel a pleasurable change in your groin.  Looking down, you see [oneCock] grow slightly longer.", false);
                    //Add a blurb about thickness...
                    MainScreen.text("  To your delight and surprise, you discover it has grown slightly thicker as well!", false);
                }
                //Just length...
                else {
                    //Increase by 2 + Utils.rand(8), and store the actual amount in temp
                    temp = player.increaseCock(selectedCock, 2 + Utils.rand(8));
                    //Comment on length changes
                    if (temp > 6) MainScreen.text("\n\nGasping in sudden pleasure, your " + cockDescript(selectedCock) + " surges free of its sheath, emerging with over half a foot of new dick-flesh.", false);
                    if (temp <= 6 && temp >= 3) MainScreen.text("\n\nYou pant in delight as a few inches of " + cockDescript(selectedCock) + " pop free from your sheath, the thick new horse-flesh still slick and sensitive.", false);
                    if (temp < 3) MainScreen.text("\n\nGroaning softly, you feel a pleasurable change in your groin.  Looking down, you see [oneCock] grow slightly longer.", false);
                }
                changes++;
            }
        }
        //Morph dick to horsediiiiick
        if (player.lowerBody.cockSpot.count() > 0 && Utils.rand(2) == 0 && changes < changeLimit) {
            let selectedCockValue: number = -1; //Changed as selectedCock and i caused duplicate let warnings
            for (let indexI: number = 0; indexI < player.lowerBody.cockSpot.count(); indexI++) {
                if (player.lowerBody.cockSpot.list[indexI].cockType != CockType.HORSE) {
                    selectedCockValue = indexI;
                    break;
                }
            }

            if (selectedCockValue != -1) {
                //Text for humandicks or others
                if (player.lowerBody.cockSpot.list[selectedCockValue].cockType == CockType.HUMAN || player.lowerBody.cockSpot.list[selectedCockValue].cockType.Index > 2) MainScreen.text("\n\nYour " + cockDescript(selectedCockValue) + " begins to feel strange... you pull down your pants to take a look and see it darkening as you feel a tightness near the base where your skin seems to be bunching up.  A sheath begins forming around your cock's base, tightening and pulling your cock inside its depths.  A hot feeling envelops your member as it suddenly grows into a horse penis, dwarfing its old size.  The skin is mottled brown and black and feels more sensitive than normal.  Your hands are irresistibly drawn to it, and you jerk yourself off, splattering cum with intense force.", false);
                //Text for dogdicks
                if (player.lowerBody.cockSpot.list[selectedCockValue].cockType == CockType.DOG) MainScreen.text("\n\nYour " + Appearance.cockNoun(CockType.DOG) + " begins to feel odd...  You pull down your clothes to take a look and see it darkening.  You feel a growing tightness in the tip of your " + Appearance.cockNoun(CockType.DOG) + " as it flattens, flaring outwards.  Your cock pushes out of your sheath, inch after inch of animal-flesh growing beyond its traditional size.  You notice your knot vanishing, the extra flesh pushing more fresh horsecock out from your sheath.  <b>Your hands are drawn to the strange new " + Appearance.cockNoun(CockType.HORSE) + "</b>, and you jerk yourself off, splattering thick ropes of cum with intense force.", false);
                player.lowerBody.cockSpot.list[selectedCockValue].cockType = CockType.HORSE;
                player.increaseCock(selectedCockValue, 4);
                dynStats("lib", 5, "sen", 4, "lus", 35);
                MainScreen.text("<b>  You now have a");
                if (player.horseCocks() > 1) MainScreen.text("nother")
                MainScreen.text(" horse-penis.</b>", false);
                changes++;
            }
        }

        //Males go into rut
        if (Utils.rand(4) == 0) {
            player.goIntoRut(true);
        }

        //Anti-masturbation status
        if (Utils.rand(4) == 0 && changes < changeLimit && player.findStatusAffect(StatusAffects.Dys) < 0) {
            if (player.lowerBody.cockSpot.count() > 0) MainScreen.text("\n\nYour " + cockDescript(0) + " tingles abruptly, then stops.  Worried, you reach down to check it, only to discover that it feels... numb.  It will be very hard to masturbate like this.", false);
            else if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text("\n\nYour " + vaginaDescript(0) + " tingles abruptly, then stops.  Worried, you reach down to check it, only to discover that it feels... numb.  It will be very hard to masturbate like this.", false);
            if (player.lowerBody.cockSpot.count() > 0 || player.lowerBody.vaginaSpot.hasVagina()) {
                player.statusAffects.add(new StatusAffect("Dys", 96, 0, 0, 0)));
                changes++;
            }
        }
        //Appearance shit:
        //Tail, Ears, Hooves, Horns, Height (no prereq), Face
        //+height up to 9 foot
        if (changes < changeLimit && Utils.rand(1.7) == 0 && player.tallness < 108) {
            temp = Utils.rand(5) + 3;
            //Slow rate of growth near ceiling
            if (player.tallness > 90) temp = Math.floor(temp / 2);
            //Never 0
            if (temp == 0) temp = 1;
            //Flavor texts.  Flavored like 1950's cigarettes. Yum.
            if (temp < 5) MainScreen.text("\n\nYou shift uncomfortably as you realize you feel off balance.  Gazing down, you realize you have grown SLIGHTLY taller.", false);
            if (temp >= 5 && temp < 7) MainScreen.text("\n\nYou feel dizzy and slightly off, but quickly realize it's due to a sudden increase in height.", false);
            if (temp == 7) MainScreen.text("\n\nStaggering forwards, you clutch at your head dizzily.  You spend a moment getting your balance, and stand up, feeling noticeably taller.", false);
            player.tallness += temp;
            changes++;
        }
        //Face change, requires Ears + Height + Hooves
        if (player.upperBody.head.earType == EARS.COW && player.lowerBody == LOWER_BODY.HOOFED && player.tallness >= 90
            && changes < changeLimit && Utils.rand(3) == 0) {
            if (player.faceType != FACE.COW_MINOTAUR) {
                MainScreen.text("\n\nBones shift and twist painfully as your visage twists and morphs to resemble that of the beast whose blood you now drink.  <b>You now have a minotaur-like face.</b>", false);
                changes++;
                player.faceType = FACE.COW_MINOTAUR;
            }
        }
        //+mino horns require ears/tail
        if (changes < changeLimit && Utils.rand(3) == 0 && player.upperBody.head.earType == EARS.COW && player.tailType == TAIL.COW) {
            temp = 1;
            //New horns or expanding mino horns
            if (player.hornType == HORNS.COW_MINOTAUR || player.hornType == HORNS.NONE) {
                //Get bigger if player has horns
                if (player.hornType == HORNS.COW_MINOTAUR) {
                    //Fems horns don't get bigger.
                    if (player.lowerBody.vaginaSpot.count() > 0) {
                        if (player.horns > 4) {
                            MainScreen.text("\n\nYou feel a pressure in your head around your horns, but they don't grow any larger.  ", false);
                            MainScreen.text("Your headache clears as lust washes through you unnaturally.  You feel as if you haven't cum in months.", false);
                            player.hoursSinceCum += 200;
                            dynStats("lus", 20);
                        }
                        else {
                            MainScreen.text("\n\nYour small horns get a bit bigger, stopping as medium sized nubs.", false);
                            player.horns += 3;
                        }
                        changes++;
                    }
                    //Males horns get 'uge.
                    else {
                        temp = 1 + Utils.rand(3);
                        player.horns += temp;
                        if (temp == 0) changes--;
                        if (temp == 1) MainScreen.text("\n\nAn aching pressure builds in your temples as you feel your horns push another inch of length from your skull.  ", false);
                        if (temp == 2) MainScreen.text("\n\nA powerful headache momentarily doubles you over.  With painful slowness, you feel your horns push another two inches of length out from your brow, gradually thickening as they grow.  ", false);
                        if (temp == 3) MainScreen.text("\n\nAgony overwhelms you as a headache of terrifying intensity sweeps through your skull.  You squeeze your eyes shut from the pain, but it does little to help.  The torture intensifies before finally diminishing as you feel an inch or two of new horn force its way out of your forehead.  The headache remains despite this, and desperate for relief, you grab hold of your horns and tug, pulling another inch of new horn free.  At last the pain fades, leaving you with significantly enhanced head-spikes.  ", false);
                        if (player.horns < 3) MainScreen.text("They are the size of tiny nubs.", false);
                        if (player.horns >= 3 && player.horns < 6) MainScreen.text("They are similar to what you would see on a young bull.", false);
                        if (player.horns >= 6 && player.horns < 12) MainScreen.text("They look like the horns on a grown bull, big enough and dangerous enough to do some damage.", false);
                        if (player.horns >= 12 && player.horns < 20) MainScreen.text("They are large and wicked looking.", false);
                        if (player.horns >= 20) MainScreen.text("They are huge, heavy, and tipped with dangerous points.", false);
                        //boys get a cum refill sometimes
                        if (Utils.rand(2) == 0 && changes < changeLimit) {
                            MainScreen.text("  Your headache clears as lust washes through you unnaturally.  You feel as if you haven't cum in months.", false);
                            player.hoursSinceCum += 200;
                            dynStats("lus", 20);
                        }
                        changes++;
                    }
                }
                //If no horns yet..
                else {
                    MainScreen.text("\n\nWith painful pressure, the skin on your forehead splits around two tiny nub-like horns, similar to those you would see on the cattle back in your homeland.", false);
                    player.hornType = HORNS.COW_MINOTAUR;
                    player.horns = 2;
                    changes++;
                }
            }
            //Not mino horns, change to cow-horns
            if (player.hornType == HORNS.DEMON || player.hornType > HORNS.COW_MINOTAUR) {
                MainScreen.text("\n\nYour horns vibrate and shift as if made of clay, reforming into two horns with a bovine-like shape.", false);
                player.hornType = HORNS.COW_MINOTAUR;
                changes++;
            }
        }
        //+cow ears	- requires tail
        if (player.upperBody.head.earType != EARS.COW && changes < changeLimit && player.tailType == TAIL.COW && Utils.rand(2) == 0) {
            MainScreen.text("\n\nYou feel your ears tug on your scalp as they twist shape, becoming oblong and cow-like.  <b>You now have cow ears.</b>", false);
            player.upperBody.head.earType = EARS.COW;
            changes++;
        }
        //+cow tail
        if (changes < changeLimit && Utils.rand(2) == 0 && player.tailType != TAIL.COW) {
            if (player.tailType == TAIL.NONE) MainScreen.text("\n\nYou feel the flesh above your " + buttDescript() + " knotting and growing.  It twists and writhes around itself before flopping straight down, now shaped into a distinctly bovine form.  You have a <b>cow tail</b>.", false);
            else {
                if (player.tailType < TAIL.SPIDER_ADBOMEN || player.tailType > TAIL.BEE_ABDOMEN) {
                    MainScreen.text("\n\nYour tail bunches uncomfortably, twisting and writhing around itself before flopping straight down, now shaped into a distinctly bovine form.  You have a <b>cow tail</b>.", false);
                }
                //insect
                if (player.tailType == TAIL.SPIDER_ADBOMEN || player.tailType == TAIL.BEE_ABDOMEN) {
                    MainScreen.text("\n\nYour insect-like abdomen tingles pleasantly as it begins shrinking and softening, chitin morphing and reshaping until it looks exactly like a <b>cow tail</b>.", false);
                }
            }
            player.tailType = TAIL.COW;
            changes++;
        }
        if (Utils.rand(4) == 0 && player.upperBody.gills && changes < changeLimit) {
            MainScreen.text("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.", false);
            player.upperBody.gills = false;
            changes++;
        }
        if (changes < changeLimit && Utils.rand(4) == 0 && ((player.ass.analWetness > 0 && !player.perks.has("MaraesGiftButtslut")) || player.ass.analWetness > 1)) {
            MainScreen.text("\n\nYou feel a tightening up in your colon and your [asshole] sucks into itself.  You feel sharp pain at first but that thankfully fades.  Your ass seems to have dried and tightened up.");
            player.ass.analWetness--;
            if (player.ass.analLooseness > 1) player.ass.analLooseness--;
            changes++;
        }
        //Give you that mino build!
        if (Utils.rand(4) == 0) MainScreen.text(player.modFem(5, 10), false);
        if (Utils.rand(4) == 0) MainScreen.text(player.modTone(85, 3), false);
        if (Utils.rand(4) == 0) MainScreen.text(player.modThickness(70, 4), false);
        //Default
        if (changes == 0) {
            MainScreen.text("\n\nMinotaur-like vitality surges through your body, invigorating and arousing you!\n", false);
            if (player.lowerBody.balls > 0) {
                MainScreen.text("Your balls feel as if they've grown heavier with the weight of more sperm.\n", false);
                player.hoursSinceCum += 200;
            }
            HPChange(50, true);
            dynStats("lus", 50);
        }

    }

    public equinum(player: Player): void {
        player.slimeFeed();
        //Changes done
        let changes: number = 0;
        //Change limit
        let changeLimit: number = 1;
        //Temporary storage
        let temp: number = 0;
        let temp2: number = 0;
        let temp3: number = 0;
        //Store location of cock to be changed
        let old: number = 0;
        //Chancee to raise limit
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(3) == 0) changeLimit++;
        if (player.perks.has("HistoryAlchemist")) changeLimit++;
        //Used for Utils.random chances
        //Set up output
        MainScreen.text("You down the potion, grimacing at the strong taste.", true);
        //CHANCE OF BAD END - 20% if face/tail/skin/cock are appropriate.
        //If hooved bad end doesn't appear till centaured
        if (player.skinType == SKIN.FUR && player.faceType == FACE.HORSE && player.tailType == TAIL.HORSE && (player.lowerBody != LOWER_BODY.HOOFED)) {
            //WARNINGS
            //Repeat warnings
            if (player.statusAffects.has("HorseWarning") && Utils.rand(3) == 0) {
                if (player.statusAffects.get("HorseWarning").value1 == 0) MainScreen.text("<b>\n\nYou feel a creeping chill down your back as your entire body shivers, as if rejecting something foreign.  Maybe you ought to cut back on the horse potions.</b>", false);
                if (player.statusAffects.get("HorseWarning").value1 > 0) MainScreen.text("<b>\n\nYou wonder how many more of these you can drink before you become a horse...</b>", false);
                player.statusAffects.get("HorseWarning").value1 = 1;
            }
            //First warning
            if (player.findStatusAffect(StatusAffects.HorseWarning) < 0) {
                MainScreen.text("<b>\n\nWhile you drink the tasty potion, you realize how horse-like you already are, and wonder what else the potion could possibly change...</b>", false);
                player.statusAffects.add(new StatusAffect("HorseWarning", 0, 0, 0, 0)));
            }
            //Bad End
            if (Utils.rand(4) == 0 && player.statusAffects.has("HorseWarning")) {
                //Must have been warned first...
                if (player.statusAffects.get("HorseWarning").value1 > 0) {
                    //If player has dicks check for horsedicks
                    if (player.lowerBody.cockSpot.count() > 0) {
                        //If player has horsedicks
                        if (player.horseCocks() > 0) {
                            MainScreen.text("\n\nSoon after you drink the Equinum, a burning sensation fills your chest. You have consumed too much of the potion, and the overdose starts to provoke dramatic changes in your body.  You collapse suddenly, twitching in pain as all the bones and muscles in your body break and reform. Eventually, you pass out from the strain you are put through.\n\nYou wake up after a few minutes. Once you get up on your legs, doubt fills your mind. You rush to a nearby pond and look down, nearly jumping when the reflection of a ", false);
                            if (player.gender == 0 || player.gender == 3) MainScreen.text("horse ", false);
                            if (player.gender == 1) MainScreen.text("stallion ", false);
                            if (player.gender == 2) MainScreen.text("mare ", false);
                            MainScreen.text(" with beautiful " + player.hairColor + " " + player.skinDesc + " covering its body gazes back up at you.  That's you, and yet the doubt in your mind remains. Strange images fill your mind, and you feel as if you have not always been a horse, but some kind of funny fur-less creature standing on two legs. Your equine mind rapidly dismisses that doubt as a daydream however, and you trot away, oblivious to who you once were.\n\n", false);
                            MainScreen.text("<b>One year later...</b>\n\nAs you graze upon the small plants that coat the open plains of your home, you hear a noise on your right side. As you raise your head to check where the noise comes from, preparing to run from a potential predator, you see a strange creature. It stands on its two feet, its furless pink skin appearing beneath its clothes.  With a start, you realize you can identify the strange creatures gender.  ", false);
                            if (player.gender == 0 || player.gender == 1) MainScreen.text("He is clearly a male, but you are somewhat confused as you can see not one but three bulges where his manhood would be.\n\n", false);
                            if (player.gender == 2) MainScreen.text("She is clearly a female, as you can see her six breasts jiggle as she walks towards you, small stains appearing on her shirt where her nipples are.\n\n", false);
                            if (player.gender == 3) MainScreen.text("You are somewhat confused as you can see a bulge near her thighs but also huge boobs jiggling as she walks, and you can't say if she's a male or female.\n\n", false);
                            MainScreen.text("As soon as you lay eyes on the creature, a wave of nostalgia overtakes you. Somehow, looking at that creature makes you sad, as if you forgot something important.\n\n\"<i>How strange to see a horse here all alone,</i>\" the creature muses, \"<i>In any case, you're still the least bizarre creature I've met here.  Not to mention the only one that hasn't tried to rape me,</i>\" it says with a sigh.\n\nYou answer with an interrogative whinny.\n\n\"<i>Hey, I've got an idea. I'll take you back to the camp. I'll feed you and in return you can help me complete my quest. What do you say?</i>\"\n\nInstinctively, you utter a happy and approving whinny.\n\nYou failed in your quest, losing your focus and more importantly, losing yourself.  But, even so, you found a new meaning to your life, and have a new chance to succeed where you once failed.", false);
                            getGame().gameOver();
                            return;
                        }
                    }
                    //If player has no cocks
                    else {
                        MainScreen.text("\n\nSoon after you drink the Equinum, a burning sensation fills your chest. You have consumed too much of the drink, and the overdose starts to provoke dramatic changes in your body.  You collapse suddenly, twitching in pain as all the bones and all the muscles in your body break and reform. Eventually, you pass out from the strain you are put through.\n\nYou wake up after a few minutes. Once you get up on your legs, doubt fills your mind. You rush to a nearby pond and look down, nearly jumping when the reflection of a ", false);
                        if (player.gender == 0 || player.gender == 3) MainScreen.text("horse ", false);
                        if (player.gender == 1) MainScreen.text("stallion ", false);
                        if (player.gender == 2) MainScreen.text("mare ", false);
                        MainScreen.text("with beautiful " + player.hairColor + " " + player.skinDesc + " covering its body looks back at you.  That's you, and yet the doubt in your mind remains. Strange mental images fill your mind.  You feel as if you have not always been a horse, but some kind of funny fur-less creature standing on two legs. But your equine mind rapidly dismisses that doubt as a daydream, and you trot away, oblivious to who you once were.\n\n", false);
                        MainScreen.text("<b>One year after...</b>\n\nAs you graze small plants in the open plains that became your home, you hear a noise on your right side. As you raise your head to check where the noise comes from, preparing to run from a potential predator, you see a strange creature. It stands on two feet, its furless pink skin appearing beneath its clothes.  ", false);
                        if (player.gender == 0 || player.gender == 1) MainScreen.text("He is clearly a male, but you are somewhat confused as you can see not one but three bulges where his manhood would be.\n\n", false);
                        if (player.gender == 2) MainScreen.text("She is clearly a female, as you can see her six breasts jiggle as she walks towards you, small stains appearing on her shirt where her nipples are.\n\n", false);
                        if (player.gender == 3) MainScreen.text("You are somewhat confused as you can see a bulge near her thighs but also huge boobs jiggling as she walks, and you can't say if she's a male or female.\n\n", false);
                        MainScreen.text("As soon as you lay eyes on the creature, a wave of nostalgia overtakes you. Somehow, looking at that creature makes you sad, as if you forgot something important.\n\n\"<i>How strange to see a horse here all alone,</i>\" the creature muses, \"<i>In any case, you're still the least bizarre creature I've met here.  Not to mention the only one that hasn't tried to rape me,</i>\" it says with a sigh.\n\nYou answer with an interrogative whinny.\n\n\"<i>Hey, I've got an idea. I'll take you back to the camp. I'll feed you and in return you can help me to complete my quest. What do you say?</i>\"\n\nInstictively, you utter a happy and approving whinny.\n\nYou failed in your quest, losing you focus and more importantly, losing yourself.  But, even so, you found a new meaning to your life, and have a new chance to achieve what you once failed.", false);
                        getGame().gameOver();
                        return;
                    }
                }
            }

        }
        //Stat changes first
        //STRENGTH
        if (Utils.rand(2) == 0) {
            //Maxxed
            if (player.str >= 60) {
                MainScreen.text("\n\nYou feel strong enough to single-handedly pull a fully-loaded wagon.", false);
            }
            //NOT MAXXED
            else {
                dynStats("str", 1);
                MainScreen.text("\n\nYour muscles clench and surge, making you feel as strong as a horse.", false);
                changes++;
            }
        }
        //TOUGHNESS
        if (Utils.rand(2) == 0) {
            //MAXXED ALREADY
            if (player.tou >= 75) {
                MainScreen.text("\n\nYour body is as tough and solid as a ", false);
                if (player.gender == 1 || player.gender == 3) MainScreen.text("stallion's.", false);
                else MainScreen.text("mare's.", false);
            }
            //NOT MAXXED
            else {
                dynStats("tou", 1.25);
                MainScreen.text("\n\nYour body suddenly feels tougher and more resilient.", false);
                changes++;
            }
        }
        //INTELLECT
        if (Utils.rand(3) == 0) {
            if (player.stats.int <= 5) {
                MainScreen.text("\n\nYou let out a throaty \"Neiiiigh\" as your animalistic instincts take over.", false);
            }
            if (player.stats.int < 10 && player.stats.int > 5) {
                dynStats("int", -1);
                MainScreen.text("\n\nYou smile vacantly as you drink the potion, knowing you're just a big dumb animal who loves to fuck.", false);
                changes++;
            }
            if (player.stats.int <= 20 && player.stats.int >= 10) {
                dynStats("int", -2);
                MainScreen.text("\n\nYou find yourself looking down at the empty bottle in your hand and realize you haven't thought ANYTHING since your first sip.", false);
                changes++;
            }
            if (player.stats.int <= 30 && player.stats.int > 20) {
                dynStats("int", -3);
                MainScreen.text("\n\nYou smile broadly as your cares seem to melt away.  A small part of you worries that you're getting dumber.", false);
                changes++;
            }
            if (player.stats.int <= 50 && player.stats.int > 30) {
                dynStats("int", -4);
                MainScreen.text("\n\nIt becomes harder to keep your mind focused as your intellect diminishes.", false);
                changes++;
            }
            if (player.stats.int > 50) {
                dynStats("int", -5);
                MainScreen.text("\n\nYour usually intelligent mind feels much more sluggish.", false);
                changes++;
            }
        }
        //-Remove feather-arms (copy this for goblin ale, mino blood, equinum, canine pepps, demon items)
        if (changes < changeLimit && player.armType == ARM.HARPY && Utils.rand(4) == 0) {
            MainScreen.text("\n\nYou scratch at your biceps absentmindedly, but no matter how much you scratch, it isn't getting rid of the itch.  Glancing down in irritation, you discover that your feathery arms are shedding their feathery coating.  The wing-like shape your arms once had is gone in a matter of moments, leaving " + player.skinDesc + " behind.", false);
            player.armType = ARM.HUMAN;
            changes++;
        }
        //-Remove chitin-arms (copy this for goblin ale, mino blood, equinum, canine pepps, demon items)
        if (changes < changeLimit && player.armType == ARM.SPIDER && Utils.rand(4) == 0) {
            MainScreen.text("\n\nYou scratch at your biceps absentmindedly, but no matter how much you scratch, it isn't getting rid of the itch.  Glancing down in irritation, you discover that your arms' chitinous covering is flaking away.  The glossy black coating is soon gone, leaving " + player.skinDesc + " behind.", false);
            player.armType = ARM.HUMAN;
            changes++;
        }
        //-Remove feathery hair (copy for equinum, canine peppers, Labova)
        if (changes < changeLimit && player.upperBody.head.hairType == 1 && Utils.rand(4) == 0) {
            //(long):
            if (player.hairLength >= 6) MainScreen.text("\n\nA lock of your downy-soft feather-hair droops over your eye.  Before you can blow the offending down away, you realize the feather is collapsing in on itself.  It continues to curl inward until all that remains is a normal stUtils.rand of hair.  <b>Your hair is no longer feathery!</b>", false);
            //(short)
            else MainScreen.text("\n\nYou run your fingers through your downy-soft feather-hair while you await the effects of the item you just ingested.  While your hand is up there, it detects a change in the texture of your feathers.  They're completely disappearing, merging down into stUtils.rands of regular hair.  <b>Your hair is no longer feathery!</b>", false);
            changes++;
            player.upperBody.head.hairType = 0;
        }
        //
        //SEXUAL CHARACTERISTICS
        //
        //MALENESS.
        if ((player.gender == 1 || player.gender == 3) && Utils.rand(1.5) == 0 && changes < changeLimit) {
            //If cocks that aren't horsified!
            if ((player.horseCocks() + player.demonCocks()) < player.lowerBody.cockSpot.count()) {
                //Transform a cock and store it's index value to talk about it.
                //Single cock
                if (player.lowerBody.cockSpot.count() == 1) {
                    temp = 0;
                    //Use temp3 to track whether or not anything is changed.
                    temp3 = 0;
                    if (player.lowerBody.cockSpot.list[0].cockType == CockType.HUMAN) {
                        MainScreen.text("\n\nYour " + cockDescript(0) + " begins to feel strange... you pull down your pants to take a look and see it darkening as you feel a tightness near the base where your skin seems to be bunching up.  A sheath begins forming around your cock's base, tightening and pulling your cock inside its depths.  A hot feeling envelops your member as it suddenly grows into a horse penis, dwarfing its old size.  The skin is mottled brown and black and feels more sensitive than normal.  Your hands are irresistibly drawn to it, and you jerk yourself off, splattering cum with intense force.", false);
                        temp = player.addHorseCock();
                        temp2 = player.increaseCock(temp, Utils.rand(4) + 4);
                        temp3 = 1;
                        dynStats("lib", 5, "sen", 4, "lus", 35);
                    }
                    if (player.lowerBody.cockSpot.list[0].cockType == CockType.DOG) {
                        temp = player.addHorseCock();
                        MainScreen.text("\n\nYour " + Appearance.cockNoun(CockType.DOG) + " begins to feel odd... you pull down your clothes to take a look and see it darkening.  You feel a growing tightness in the tip of your " + Appearance.cockNoun(CockType.DOG) + " as it flattens, flaring outwards.  Your cock pushes out of your sheath, inch after inch of animal-flesh growing beyond it's traditional size.  You notice your knot vanishing, the extra flesh pushing more horsecock out from your sheath.  Your hands are drawn to the strange new " + Appearance.cockNoun(CockType.HORSE) + ", and you jerk yourself off, splattering thick ropes of cum with intense force.", false);
                        temp2 = player.increaseCock(temp, Utils.rand(4) + 4);
                        temp3 = 1;
                        dynStats("lib", 5, "sen", 4, "lus", 35);
                    }
                    if (player.lowerBody.cockSpot.list[0].cockType == CockType.TENTACLE) {
                        temp = player.addHorseCock();
                        MainScreen.text("\n\nYour " + cockDescript(0) + " begins to feel odd... you pull down your clothes to take a look and see it darkening.  You feel a growing tightness in the tip of your " + cockDescript(0) + " as it flattens, flaring outwards.  Your skin folds and bunches around the base, forming an animalistic sheath.  The slick inhuman texture you recently had fades, taking on a more leathery texture.  Your hands are drawn to the strange new " + Appearance.cockNoun(CockType.HORSE) + ", and you jerk yourself off, splattering thick ropes of cum with intense force.", false);
                        temp2 = player.increaseCock(temp, Utils.rand(4) + 4);
                        temp3 = 1;
                        dynStats("lib", 5, "sen", 4, "lus", 35);
                    }
                    if (player.lowerBody.cockSpot.list[0].cockType.Index > 4) {
                        MainScreen.text("\n\nYour " + cockDescript(0) + " begins to feel odd... you pull down your clothes to take a look and see it darkening.  You feel a growing tightness in the tip of your " + cockDescript(0) + " as it flattens, flaring outwards.  Your skin folds and bunches around the base, forming an animalistic sheath.  The slick inhuman texture you recently had fades, taking on a more leathery texture.  Your hands are drawn to the strange new " + Appearance.cockNoun(CockType.HORSE) + ", and you jerk yourself off, splattering thick ropes of cum with intense force.", false);
                        temp = player.addHorseCock();
                        temp2 = player.lowerBody.cockSpot.list[temp](Utils.rand(4) + 4);
                        temp3 = 1;
                        dynStats("lib", 5, "sen", 4, "lus", 35);
                    }
                    if (temp3 == 1) MainScreen.text("  <b>Your penis has transformed into a horse's!</b>", false);
                }
                //MULTICOCK
                else {
                    dynStats("lib", 5, "sen", 4, "lus", 35);
                    temp = player.addHorseCock();
                    MainScreen.text("\n\nOne of your penises begins to feel strange.  You pull down your clothes to take a look and see the skin of your " + cockDescript(temp) + " darkening to a mottled brown and black pattern.", false);
                    if (temp == -1) {
                        CoC_Settings.error("");
                        MainScreen.text("FUKKKK ERROR NO COCK XFORMED", true);
                    }
                    //Already have a sheath
                    if (player.horseCocks() > 1 || player.dogCocks() > 0) MainScreen.text("  Your sheath tingles and begins growing larger as the cock's base shifts to lie inside it.", false);
                    else MainScreen.text("  You feel a tightness near the base where your skin seems to be bunching up.  A sheath begins forming around your " + cockDescript(temp) + "'s root, tightening and pulling your " + cockDescript(temp) + " inside its depths.", false);
                    temp2 = player.increaseCock(temp, Utils.rand(4) + 4);
                    MainScreen.text("  The shaft suddenly explodes with movement, growing longer and developing a thick flared head leaking steady stream of animal-cum.", false);
                    MainScreen.text("  <b>You now have a horse-cock.</b>", false);
                }
                //Make cock thicker if not thick already!
                if (player.lowerBody.cockSpot.list[temp].cockThickness <= 2) player.lowerBody.cockSpot.list[temp].thickenCock(1);
                changes++;
            }
            //Players cocks are all horse-type - increase size!
            else {
                //single cock
                if (player.lowerBody.cockSpot.count() == 1) {
                    temp2 = player.increaseCock(0, Utils.rand(3) + 1);
                    temp = 0;
                    dynStats("sen", 1, "lus", 10);
                }
                //Multicock
                else {
                    //Find smallest cock
                    //Temp2 = smallness size
                    //temp = current smallest
                    temp3 = player.lowerBody.cockSpot.count();
                    temp = 0;
                    while (temp3 > 0) {
                        temp3--;
                        //If current cock is smaller than saved, switch values.
                        if (player.lowerBody.cockSpot.list[temp].cockLength > player.lowerBody.cockSpot.list[temp3].cockLength) {
                            temp2 = player.lowerBody.cockSpot.list[temp3].cockLength;
                            temp = temp3;
                        }
                    }
                    //Grow smallest cock!
                    //temp2 changes to growth amount
                    temp2 = player.increaseCock(temp, Utils.rand(4) + 1);
                    dynStats("sen", 1, "lus", 10);
                }
                MainScreen.text("\n\n", false);
                if (temp2 > 2) MainScreen.text("Your " + cockDescript(temp) + " tightens painfully, inches of taut horse-flesh pouring out from your sheath as it grows longer.  Thick animal-pre forms at the flared tip, drawn out from the pleasure of the change.", false);
                if (temp2 > 1 && temp2 <= 2) MainScreen.text("Aching pressure builds within your sheath, suddenly releasing as an inch or more of extra dick flesh spills out.  A dollop of pre beads on the head of your enlarged " + cockDescript(temp) + " from the pleasure of the growth.", false);
                if (temp2 <= 1) MainScreen.text("A slight pressure builds and releases as your " + cockDescript(temp) + " pushes a bit further out of your sheath.", false);
                changes++;
            }
            //Chance of thickness + daydream
            if (Utils.rand(2) == 0 && changes < changeLimit && player.horseCocks() > 0) {
                temp3 = 0;
                temp2 = player.lowerBody.cockSpot.count();
                while (temp2 > 0) {
                    temp2--;
                    if (player.lowerBody.cockSpot.list[temp2].cockThickness <= player.lowerBody.cockSpot.list[temp3].cockThickness) {
                        temp3 = temp2;
                    }
                }
                temp = temp3;
                player.lowerBody.cockSpot.list[temp].thickenCock(.5);
                MainScreen.text("\n\nYour " + Appearance.cockNoun(CockType.HORSE) + " thickens inside its sheath, growing larger and fatter as your veins thicken, becoming more noticeable.  It feels right", false);
                if (player.stats.cor + player.stats.lib < 50) MainScreen.text(" to have such a splendid tool.  You idly daydream about cunts and pussies, your " + Appearance.cockNoun(CockType.HORSE) + " plowing them relentlessly, stuffing them pregnant with cum", false);
                if (player.stats.cor + player.stats.lib >= 50 && player.stats.cor + player.stats.lib < 80) MainScreen.text(" to be this way... You breath the powerful animalistic scent and fantasize about fucking centaurs night and day until their bellies slosh with your cum", false);
                if (player.stats.cor + player.stats.lib >= 75 && player.stats.cor + player.stats.lib <= 125) MainScreen.text(" to be a rutting stud.  You ache to find a mare or centaur to breed with.  Longing to spend your evenings plunging a " + Appearance.cockNoun(CockType.HORSE) + " deep into their musky passages, dumping load after load of your thick animal-cum into them.  You'd be happy just fucking horsecunts morning, noon, and night.  Maybe somewhere there is a farm needing a breeder..", false);
                if (player.stats.cor + player.stats.lib > 125) MainScreen.text(" to whinny loudly like a rutting stallion.  Your " + Appearance.cockNoun(CockType.HORSE) + " is perfect for fucking centaurs and mares.  You imagine the feel of plowing an equine pussy deeply, bottoming out and unloading sticky jets of horse-jizz into its fertile womb.  Your hand strokes your horsecock of its own accord, musky pre dripping from the flared tip with each stroke.  Your mind wanders to the thought of you with a harem of pregnant centaurs.", false);
                MainScreen.text(".", false);
                if (player.stats.cor < 30) MainScreen.text("  You shudder in revulsion at the strange thoughts and vow to control yourself better.", false);
                if (player.stats.cor >= 30 && player.stats.cor < 60) MainScreen.text("  You wonder why you thought such odd things, but they have a certain appeal.", false);
                if (player.stats.cor >= 60 && player.stats.cor < 90) MainScreen.text("  You relish your twisted fantasies, hoping to dream of them again.", false);
                if (player.stats.cor >= 90) MainScreen.text("  You flush hotly and give a twisted smile, resolving to find a fitting subject to rape and relive your fantasies.", false);
                dynStats("lib", .5, "lus", 10);
            }
            //Chance of ball growth if not 3" yet
            if (Utils.rand(2) == 0 && changes < changeLimit && player.lowerBody.ballSize <= 3 && player.horseCocks() > 0) {
                if (player.lowerBody.balls == 0) {
                    player.lowerBody.balls = 2;
                    player.lowerBody.ballSize = 1;
                    MainScreen.text("\n\nA nauseating pressure forms just under the base of your maleness.  With agonizing pain the flesh bulges and distends, pushing out a rounded lump of flesh that you recognize as a testicle!  A moment later relief overwhelms you as the second drops into your newly formed sack.", false);
                    dynStats("lib", 2, "lus", 5);
                }
                else {
                    player.lowerBody.ballSize++;
                    if (player.lowerBody.ballSize <= 2) MainScreen.text("\n\nA flash of warmth passes through you and a sudden weight develops in your groin.  You pause to examine the changes and your roving fingers discover your " + simpleBallsDescript() + " have grown larger than a human's.", false);
                    if (player.lowerBody.ballSize > 2) MainScreen.text("\n\nA sudden onset of heat envelops your groin, focusing on your " + sackDescript() + ".  Walking becomes difficult as you discover your " + simpleBallsDescript() + " have enlarged again.", false);
                    dynStats("lib", 1, "lus", 3);
                }
                changes++;
            }
        }
        //FEMALE
        if (player.gender == 2 || player.gender == 3) {
            //Single vag
            if (player.lowerBody.vaginaSpot.count() == 1) {
                if (player.vaginas[0].vaginalLooseness <= VAGINA_LOOSENESS.GAPING && changes < changeLimit && Utils.rand(2) == 0) {
                    MainScreen.text("\n\nYou grip your gut in pain as you feel your organs shift slightly.  When the pressure passes, you realize your " + vaginaDescript(0) + " has grown larger, in depth AND size.", false);
                    player.vaginas[0].vaginalLooseness++;
                    changes++;
                }
                if (player.vaginas[0].vaginalWetness <= VAGINA_WETNESS.NORMAL && changes < changeLimit && Utils.rand(2) == 0) {
                    MainScreen.text("\n\nYour " + vaginaDescript(0) + " moistens perceptably, giving off an animalistic scent.", false);
                    player.vaginas[0].vaginalWetness++;
                    changes++;
                }
            }
            //Multicooch
            else {
                //determine least wet
                //temp - least wet
                //temp2 - saved wetness
                //temp3 - counter
                temp = 0;
                temp2 = player.vaginas[temp].vaginalWetness;
                temp3 = player.lowerBody.vaginaSpot.count();
                while (temp3 > 0) {
                    temp3--;
                    if (temp2 > player.vaginas[temp3].vaginalWetness) {
                        temp = temp3;
                        temp2 = player.vaginas[temp].vaginalWetness;
                    }
                }
                if (player.vaginas[temp].vaginalWetness <= VAGINA_WETNESS.NORMAL && changes < changeLimit && Utils.rand(2) == 0) {
                    MainScreen.text("\n\nOne of your " + vaginaDescript(temp) + " moistens perceptably, giving off an animalistic scent.", false);
                    player.vaginas[temp].vaginalWetness++;
                    changes++;
                }
                //determine smallest
                //temp - least big
                //temp2 - saved looseness
                //temp3 - counter
                temp = 0;
                temp2 = player.vaginas[temp].vaginalLooseness;
                temp3 = player.lowerBody.vaginaSpot.count();
                while (temp3 > 0) {
                    temp3--;
                    if (temp2 > player.vaginas[temp3].vaginalLooseness) {
                        temp = temp3;
                        temp2 = player.vaginas[temp].vaginalLooseness;
                    }
                }
                if (player.vaginas[0].vaginalLooseness <= VAGINA_LOOSENESS.GAPING && changes < changeLimit && Utils.rand(2) == 0) {
                    MainScreen.text("\n\nYou grip your gut in pain as you feel your organs shift slightly.  When the pressure passes, you realize one of your " + vaginaDescript(temp) + " has grown larger, in depth AND size.", false);
                    player.vaginas[temp].vaginalLooseness++;
                    changes++;
                }
            }
            if (player.statusAffects.get("Heat").value2 < 30 && Utils.rand(2) == 0 && changes < changeLimit) {
                if (player.goIntoHeat(true)) {
                    changes++;
                }
            }

            if (!flags[FlagEnum.HYPER_HAPPY]) {
                if (Utils.rand(2) == 0 && changes < changeLimit) {
                    //Shrink B's!
                    //Single row
                    if (player.upperBody.chest.count() == 1) {
                        //Shrink if bigger than B cups
                        if (player.upperBody.chest.list[0].breastRating > 3) {
                            temp = 1;
                            player.upperBody.chest.list[0].breastRating--;
                            //Shrink again if huuuuge
                            if (player.upperBody.chest.list[0].breastRating > 8) {
                                temp++;
                                player.upperBody.chest.list[0].breastRating--;
                            }
                            //Talk about shrinkage
                            if (temp == 1) MainScreen.text("\n\nYou feel a weight lifted from you, and realize your " + breastDescript(0) + " have shrunk to a " + player.breastCup(0) + ".", false);
                            if (temp == 2) MainScreen.text("\n\nYou feel significantly lighter.  Looking down, you realize your breasts are MUCH smaller, down to " + player.breastCup(0) + "s.", false);
                            changes++;
                        }

                    }
                    //multiple
                    else {
                        //temp2 = amount changed
                        //temp3 = counter
                        temp2 = 0;
                        temp3 = player.upperBody.chest.count();
                        if (player.upperBody.chest.BreastRatingLargest[0].breastRating > 3) MainScreen.text("\n", false);
                        while (temp3 > 0) {
                            temp3--;
                            if (player.upperBody.chest.list[temp3].breastRating > 3) {
                                player.upperBody.chest.list[temp3].breastRating--;
                                temp2++;
                                MainScreen.text("\n", false);
                                if (temp3 < player.upperBody.chest.count() - 1) MainScreen.text("...and y", false);
                                else MainScreen.text("Y", false);
                                MainScreen.text("our " + breastDescript(temp3) + " shrink, dropping to " + player.breastCup(temp3) + "s.", false);
                            }
                        }
                        if (temp2 == 2) MainScreen.text("\nYou feel so much lighter after the change.", false);
                        if (temp2 == 3) MainScreen.text("\nWithout the extra weight you feel particularly limber.", false);
                        if (temp2 >= 4) MainScreen.text("\nIt feels as if the weight of the world has been lifted from your shoulders, or in this case, your chest.", false);
                        if (temp2 > 0) changes++;
                    }
                }
            }
        }
        //NON - GENDER SPECIFIC CHANGES
        //Tail -> Ears -> Fur -> Face
        //Centaur if hooved
        if (changes < changeLimit && Utils.rand(6) == 0 && player.lowerBody == LOWER_BODY.HOOFED) {
            changes++;
            MainScreen.text("\n\nImmense pain overtakes you as you feel your backbone snap.  The agony doesn't stop, blacking you out as your spine lengthens, growing with new flesh from your backside as the bones of your legs flex and twist.  Muscle groups shift and rearrange themselves as the change completes, the pain dying away as your consciousness returns.  <b>You now have the lower body of a centaur</b>.", false);
            if (player.gender > 0) {
                MainScreen.text("  After taking a moment to get used to your new body, you notice that your genitals now reside between the back legs on your centaur body.", false);
            }
            dynStats("spe", 3);
            player.lowerBody = LOWER_BODY.CENTAUR;
        }
        //Remove odd eyes
        if (changes < changeLimit && Utils.rand(5) == 0 && player.eyeType > EYES.HUMAN) {
            if (player.eyeType == EYES.BLACK_EYES_SAND_TRAP) {
                MainScreen.text("\n\nYou feel a twinge in your eyes and you blink.  It feels like black cataracts have just fallen away from you, and you know without needing to see your reflection that your eyes have gone back to looking human.");
            }
            else {
                MainScreen.text("\n\nYou blink and stumble, a wave of vertigo threatening to pull your " + player.feet() + " from under you.  As you steady and open your eyes, you realize something seems different.  Your vision is changed somehow.", false);
                if (player.eyeType == EYES.FOUR_SPIDER_EYES) MainScreen.text("  Your multiple, arachnid eyes are gone!</b>", false);
                MainScreen.text("  <b>You have normal, humanoid eyes again.</b>", false);
            }
            player.eyeType = EYES.HUMAN;
            changes++;
        }
        //HorseFace - Req's Fur && Ears
        if (player.faceType != FACE.HORSE && player.skinType == SKIN.FUR && changes < changeLimit &&
            Utils.rand(5) == 0 && player.upperBody.head.earType == EARS.HORSE) {
            if (player.faceType == FACE.DOG) MainScreen.text("\n\nMind-numbing pain shatters through you as you feel your facial bones rearranging.  You clutch at your face in agony as your skin crawls and shifts, your visage reshaping to replace your dog-like characteristics with those of a horse.  <b>You now have a horse's face.</b>", false);
            else MainScreen.text("\n\nMind-numbing pain shatters through you as you feel your facial bones breaking and shifting.  You clutch at yourself in agony as you feel your skin crawl and elongate under your fingers.  Eventually the pain subsides, leaving you with a face that seamlessly blends human and equine features.  <b>You have a very equine-looking face.</b>", false);
            changes++;
            player.faceType = FACE.HORSE;
        }
        //Fur - if has horsetail && ears and not at changelimit
        if (player.skinType != SKIN.FUR && changes < changeLimit &&
            Utils.rand(4) == 0 && player.tailType == TAIL.HORSE) {
            if (player.skinType == SKIN.PLAIN) MainScreen.text("\n\nAn itchy feeling springs up over every inch of your skin.  As you scratch yourself madly, you feel fur grow out of your skin until <b>you have a fine coat of " + player.hairColor + "-colored fur.</b>", false);
            if (player.skinType == SKIN.SCALES) {
                player.skinDesc = "fur";
                MainScreen.text("\n\nYour " + player.skinTone + " scales begin to itch insufferably.  You reflexively scratch yourself, setting off an avalanche of discarded scales.  The itching intensifies as you madly scratch and tear at yourself, revealing a coat of " + player.hairColor + " " + player.skinDesc + ".  At last the itching stops as <b>you brush a few more loose scales from your new coat of fur.</b>", false);
            }
            changes++;
            player.skinType = SKIN.FUR;
            player.skinDesc = "fur";
        }
        //Ears - requires tail
        if (player.upperBody.head.earType != EARS.HORSE && player.tailType == TAIL.HORSE && changes < changeLimit &&
            Utils.rand(3) == 0) {
            if (player.upperBody.head.earType == -1) MainScreen.text("\n\nTwo painful lumps sprout on the top of your head, forming into tear-drop shaped ears, covered with short fur.  ", false);
            if (player.upperBody.head.earType == EARS.HUMAN) MainScreen.text("\n\nYour ears tug painfully on your face as they begin shifting, moving upwards to the top of your head and transforming into a upright animalistic ears.  ", false);
            if (player.upperBody.head.earType == EARS.DOG) MainScreen.text("\n\nYour ears change shape, morphing into from their doglike shape into equine-like ears!  ", false);
            if (player.upperBody.head.earType > EARS.DOG) MainScreen.text("\n\nYour ears change shape, morphing into teardrop-shaped horse ears!  ", false);
            player.upperBody.head.earType = EARS.HORSE;
            player.earValue = 0;
            MainScreen.text("<b>You now have horse ears.</b>", false);
            changes++;
        }
        //Tail - no-prereq
        if (player.tailType != TAIL.HORSE && Utils.rand(2) == 0 && changes < changeLimit) {
            //no tail
            if (player.tailType == 0) {
                MainScreen.text("\n\nThere is a sudden tickling on your ass, and you notice you have sprouted a long shiny horsetail of the same " + player.hairColor + " color as your hair.", false);
            }
            //if other animal tail
            if (player.tailType > TAIL.HORSE && player.tailType <= TAIL.COW) {
                MainScreen.text("\n\nPain lances up your " + assholeDescript() + " as your tail shifts and morphs disgustingly.  With one last wave of pain, it splits into hundreds of tiny filaments, transforming into a horsetail.", false);
            }
            //if bee/spider-butt.
            if ((player.tailType > TAIL.COW && player.tailType < TAIL.SHARK)) {
                MainScreen.text("\n\nYour insect-like abdomen bunches up as it begins shrinking, exoskeleton flaking off like a snake sheds its skin.  It bunches up until it is as small as a tennis ball, then explodes outwards, growing into an animalistic tail shape.  Moments later, it explodes into filaments of pain, dividing into hundreds of stUtils.rands and turning into a shiny horsetail.", false);
            }
            if (player.tailType >= TAIL.SHARK) {
                MainScreen.text("\n\nPain lances up your " + assholeDescript() + " as your tail shifts and morphs disgustingly.  With one last wave of pain, it splits into hundreds of tiny filaments, transforming into a horsetail.", false);
            }
            MainScreen.text("  <b>You now have a horse-tail.</b>", false);
            player.tailType = TAIL.HORSE;
            player.lowerBody.tailVenom = 0;
            player.lowerBody.tailRecharge = 0;
            changes++;
        }
        if (Utils.rand(4) == 0 && player.upperBody.gills && changes < changeLimit) {
            MainScreen.text("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.", false);
            player.upperBody.gills = false;
            changes++;
        }
        if (Utils.rand(3) == 0) MainScreen.text(player.modTone(60, 1), false);
        //FAILSAFE CHANGE
        if (changes == 0) {
            MainScreen.text("\n\nInhuman vitality spreads through your body, invigorating you!\n", false);
            HPChange(20, true);
            dynStats("lus", 3);
        }

    }

    public succubiMilk(tainted: boolean, player: Player): void {
        player.slimeFeed();
        let temp2: number = 0;
        let temp3: number = 0;
        let Utils.rando: number = Math.Utils.random() * 100;
        if (player.perks.has("HistoryAlchemist")) Utils.rando += 10;
        if (Utils.rando >= 90 && !tainted) Utils.rando -= 10;
        if (player.stats.cor < 35) MainScreen.text("You wonder why in the gods' names you would drink such a thing, but you have to admit, it is the best thing you have ever tasted.", true);
        if (player.stats.cor >= 35 && player.stats.cor < 70) {
            MainScreen.text("You savor the incredible flavor as you greedily gulp it down.", true);
            if (player.gender == 2 || player.gender == 3) {
                MainScreen.text("  The taste alone makes your " + vaginaDescript(0) + " feel ", false);
                if (player.vaginas[0].vaginalWetness == VAGINA_WETNESS.DRY) MainScreen.text("tingly.", false);
                if (player.vaginas[0].vaginalWetness == VAGINA_WETNESS.NORMAL) MainScreen.text("wet.", false);
                if (player.vaginas[0].vaginalWetness == VAGINA_WETNESS.WET) MainScreen.text("sloppy and wet.", false);
                if (player.vaginas[0].vaginalWetness == VAGINA_WETNESS.SLICK) MainScreen.text("sopping and juicy.", false);
                if (player.vaginas[0].vaginalWetness >= VAGINA_WETNESS.DROOLING) MainScreen.text("dripping wet.", false);
            }
            else if (player.lowerBody.cockSpot.hasCock()) MainScreen.text("  You feel a building arousal, but it doesn't affect your cock.", false);
        }
        if (player.stats.cor >= 70) {
            MainScreen.text("You pour the milk down your throat, chugging the stuff as fast as you can.  You want more.", true);
            if (player.gender == 2 || player.gender == 3) {
                MainScreen.text("  Your " + vaginaDescript(0), false);
                if (player.lowerBody.vaginaSpot.count() > 1) MainScreen.text(" quiver in orgasm, ", false);
                if (player.lowerBody.vaginaSpot.count() == 1) MainScreen.text(" quivers in orgasm, ", false);
                if (player.vaginas[0].vaginalWetness == VAGINA_WETNESS.DRY) MainScreen.text("becoming slightly sticky.", false);
                if (player.vaginas[0].vaginalWetness == VAGINA_WETNESS.NORMAL) MainScreen.text("leaving your undergarments sticky.", false);
                if (player.vaginas[0].vaginalWetness == VAGINA_WETNESS.WET) MainScreen.text("wet with girlcum.", false);
                if (player.vaginas[0].vaginalWetness == VAGINA_WETNESS.SLICK) MainScreen.text("staining your undergarments with cum.", false);
                if (player.vaginas[0].vaginalWetness == VAGINA_WETNESS.DROOLING) MainScreen.text("leaving cunt-juice trickling down your leg.", false);
                if (player.vaginas[0].vaginalWetness >= VAGINA_WETNESS.SLAVERING) MainScreen.text("spraying your undergarments liberally with slick girl-cum.", false);
                player.orgasm();
            }
            else if (player.gender != 0) {
                if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("  You feel a strange sexual pleasure, but your " + multiCockDescript() + " remains unaffected.", false);
                else MainScreen.text("  You feel a strange sexual pleasure, but your " + multiCockDescript() + " remain unaffected.", false);
            }
        }
        if (tainted) dynStats("spe", 1, "lus", 3, "cor", 1);
        else dynStats("spe", 1, "lus", 3);
        //Breast growth (maybe cock reduction!)
        if (Utils.rando <= 75) {
            //Temp stores the level of growth...
            temp = 1 + Utils.rand(3);
            if (player.upperBody.chest.count() > 0) {
                if (player.upperBody.chest.list[0].breastRating < 2 && Utils.rand(3) == 0) temp++;
                if (player.upperBody.chest.list[0].breastRating < 5 && Utils.rand(4) == 0) temp++;
                if (player.upperBody.chest.list[0].breastRating < 6 && Utils.rand(5) == 0) temp++;
            }
            MainScreen.text("\n\n", false);
            player.growTits(temp, player.upperBody.chest.count(), true, 3);
            if (player.upperBody.chest.count() == 0) {
                MainScreen.text("A perfect pair of B cup breasts, complete with tiny nipples, form on your chest.", false);
                player.createBreastRow();
                player.upperBody.chest.list[0].breasts = 2;
                player.upperBody.chest.list[0].breastsPerRow = 2;
                player.upperBody.chest.list[0].nipplesPerBreast = 1;
                player.upperBody.chest.list[0].breastRating = 2;
                MainScreen.text("\n", false);
            }
            if (!flags[FlagEnum.HYPER_HAPPY]) {
                // Shrink cocks if you have them.
                if (player.lowerBody.cockSpot.count() > 0) {
                    temp = 0;
                    temp2 = player.lowerBody.cockSpot.count();
                    temp3 = 0;
                    //Find biggest cock
                    while (temp2 > 0) {
                        temp2--;
                        if (player.lowerBody.cockSpot.list[temp].cockLength <= player.lowerBody.cockSpot.list[temp2].cockLength) temp = temp2;
                    }
                    //Shrink said cock
                    if (player.lowerBody.cockSpot.list[temp].cockLength < 6 && player.lowerBody.cockSpot.list[temp].cockLength >= 2.9) {
                        player.lowerBody.cockSpot.list[temp].cockLength -= .5;
                        temp3 -= .5;
                        if (player.lowerBody.cockSpot.list[temp].cockThickness * 6 > player.lowerBody.cockSpot.list[temp].cockLength) player.lowerBody.cockSpot.list[temp].cockThickness -= .2;
                        if (player.lowerBody.cockSpot.list[temp].cockThickness * 8 > player.lowerBody.cockSpot.list[temp].cockLength) player.lowerBody.cockSpot.list[temp].cockThickness -= .2;
                        if (player.lowerBody.cockSpot.list[temp].cockThickness < .5) player.lowerBody.cockSpot.list[temp].cockThickness = .5;
                    }
                    temp3 += player.increaseCock(temp, (Utils.rand(3) + 1) * -1);
                    MainScreen.text("\n\n", false);
                    player.lengthChange(temp3, 1);
                    if (player.lowerBody.cockSpot.list[temp].cockLength < 2) {
                        MainScreen.text("  ", false);
                        player.killCocks(1);
                    }
                }
            }
        }
        if (player.lowerBody.vaginaSpot.count() == 0 && (Utils.rand(3) == 0 || (Utils.rando > 75 && Utils.rando < 90))) {
            player.createVagina();
            player.vaginas[0].vaginalLooseness = VAGINA_LOOSENESS.TIGHT;
            player.vaginas[0].vaginalWetness = VAGINA_WETNESS.NORMAL;
            player.vaginas[0].virgin = true;
            player.lowerBody.vaginaSpot.list[0].clitLength = .25;
            if (player.fertility <= 5) player.fertility = 6;
            MainScreen.text("\n\nAn itching starts in your crotch and spreads vertically.  You reach down and discover an opening.  You have grown a <b>new " + vaginaDescript(0) + "</b>!", false);
        }
        //Increase pussy wetness or grow one!!
        else if (Utils.rando > 75 && Utils.rando < 90) {
            //Shrink cawk
            if (player.lowerBody.cockSpot.count() > 0 && !flags[FlagEnum.HYPER_HAPPY]) {
                MainScreen.text("\n\n", false);
                temp = 0;
                temp2 = player.lowerBody.cockSpot.count();
                //Find biggest cock
                while (temp2 > 0) {
                    temp2--;
                    if (player.lowerBody.cockSpot.list[temp].cockLength <= player.lowerBody.cockSpot.list[temp2].cockLength) temp = temp2;
                }
                //Shrink said cock
                if (player.lowerBody.cockSpot.list[temp].cockLength < 6 && player.lowerBody.cockSpot.list[temp].cockLength >= 2.9) {
                    player.lowerBody.cockSpot.list[temp].cockLength -= .5;
                }
                temp3 = player.increaseCock(temp, -1 * (Utils.rand(3) + 1));
                player.lengthChange(temp3, 1);
                if (player.lowerBody.cockSpot.list[temp].cockLength < 3) {
                    MainScreen.text("  ", false);
                    player.killCocks(1);
                }
            }
            if (player.lowerBody.vaginaSpot.count() > 0) {
                MainScreen.text("\n\n", false);
                //0 = dry, 1 = wet, 2 = extra wet, 3 = always slick, 4 = drools constantly, 5 = female ejaculator
                if (player.vaginas[0].vaginalWetness == VAGINA_WETNESS.SLAVERING) {
                    if (player.lowerBody.vaginaSpot.count() == 1) MainScreen.text("Your " + vaginaDescript(0) + " gushes fluids down your leg as you spontaneously orgasm.", false);
                    else MainScreen.text("Your " + vaginaDescript(0) + "s gush fluids down your legs as you spontaneously orgasm, leaving a thick puddle of pussy-juice on the ground.  It is rapidly absorbed by the earth.", false);
                    player.orgasm();
                    if (tainted) dynStats("cor", 1);
                }
                if (player.vaginas[0].vaginalWetness == VAGINA_WETNESS.DROOLING) {
                    if (player.lowerBody.vaginaSpot.count() == 1) MainScreen.text("Your pussy feels hot and juicy, aroused and tender.  You cannot resist as your hands dive into your " + vaginaDescript(0) + ".  You quickly orgasm, squirting fluids everywhere.  <b>You are now a squirter</b>.", false);
                    if (player.lowerBody.vaginaSpot.count() > 1) MainScreen.text("Your pussies feel hot and juicy, aroused and tender.  You cannot resist plunging your hands inside your " + vaginaDescript(0) + "s.  You quiver around your fingers, squirting copious fluids over yourself and the ground.  The fluids quickly disappear into the dirt.", false);
                    player.orgasm();
                    if (tainted) dynStats("cor", 1);
                }
                if (player.vaginas[0].vaginalWetness == VAGINA_WETNESS.SLICK) {
                    if (player.lowerBody.vaginaSpot.count() == 1) MainScreen.text("You feel a sudden trickle of fluid down your leg.  You smell it and realize it's your pussy-juice.  Your " + vaginaDescript(0) + " now drools lubricant constantly down your leg.", false);
                    if (player.lowerBody.vaginaSpot.count() > 1) MainScreen.text("You feel sudden trickles of fluids down your leg.  You smell the stuff and realize it's your pussies-juices.  They seem to drool lubricant constantly down your legs.", false);
                }
                if (player.vaginas[0].vaginalWetness == VAGINA_WETNESS.WET) {
                    MainScreen.text("You flush in sexual arousal as you realize how moist your cunt-lips have become.  Once you've calmed down a bit you realize they're still slick and ready to fuck, and always will be.", false);
                }
                if (player.vaginas[0].vaginalWetness == VAGINA_WETNESS.NORMAL) {
                    if (player.lowerBody.vaginaSpot.count() == 1) MainScreen.text("A feeling of intense arousal passes through you, causing you to masturbate furiously.  You realize afterwards that your " + vaginaDescript(0) + " felt much wetter than normal.", false);
                    else MainScreen.text("A feeling of intense arousal passes through you, causing you to masturbate furiously.  You realize afterwards that your " + vaginaDescript(0) + " were much wetter than normal.", false);
                }
                if (player.vaginas[0].vaginalWetness == VAGINA_WETNESS.DRY) {
                    MainScreen.text("You feel a tingling in your crotch, but cannot identify it.", false);
                }
                temp = player.lowerBody.vaginaSpot.count();
                while (temp > 0) {
                    temp--;
                    if (player.vaginas[0].vaginalWetness < VAGINA_WETNESS.SLAVERING) player.vaginas[temp].vaginalWetness++;
                }
            }
        }
        if (Utils.rando >= 90) {
            if (player.skinTone == "blue" || player.skinTone == "purple" || player.skinTone == "indigo" || player.skinTone == "shiny black") {
                if (player.lowerBody.vaginaSpot.count() > 0) {
                    MainScreen.text("\n\nYour heart begins beating harder and harder as heat floods to your groin.  You feel your clit peeking out from under its hood, growing larger and longer as it takes in more and more blood.", false);
                    if (player.lowerBody.vaginaSpot.list[0].clitLength > 3 && !player.perks.has("BigClit")) MainScreen.text("  After some time it shrinks, returning to its normal aroused size.  You guess it can't get any bigger.", false);
                    if (player.lowerBody.vaginaSpot.list[0].clitLength > 5 && player.perks.has("BigClit")) MainScreen.text("  Eventually it shrinks back down to its normal (but still HUGE) size.  You guess it can't get any bigger.", false);
                    if (((player.perks.has("BigClit")) && player.lowerBody.vaginaSpot.list[0].clitLength < 6)
                        || player.lowerBody.vaginaSpot.list[0].clitLength < 3) {
                        temp += 2;
                        player.lowerBody.vaginaSpot.list[0].clitLength += (Utils.rand(4) + 2) / 10;
                    }
                    dynStats("sen", 3, "lus", 8);
                }
                else {
                    player.createVagina();
                    player.vaginas[0].vaginalLooseness = VAGINA_LOOSENESS.TIGHT;
                    player.vaginas[0].vaginalWetness = VAGINA_WETNESS.NORMAL;
                    player.vaginas[0].virgin = true;
                    player.lowerBody.vaginaSpot.list[0].clitLength = .25;
                    MainScreen.text("\n\nAn itching starts in your crotch and spreads vertically.  You reach down and discover an opening.  You have grown a <b>new " + vaginaDescript(0) + "</b>!", false);
                }
            }
            else {
                temp = Utils.rand(10);
                if (temp == 0) player.skinTone = "shiny black";
                if (temp == 1 || temp == 2) player.skinTone = "indigo";
                if (temp == 3 || temp == 4 || temp == 5) player.skinTone = "purple";
                if (temp > 5) player.skinTone = "blue";
                MainScreen.text("\n\nA tingling sensation runs across your skin in waves, growing stronger as <b>your skin's tone slowly shifts, darkening to become " + player.skinTone + " in color.</b>", false);
                if (tainted) dynStats("cor", 1);
                else dynStats("cor", 0);
            }
        }
        //Demonic changes - higher chance with higher corruption.
        if (Utils.rand(40) + player.stats.cor / 3 > 35 && tainted) demonChanges(player);
        if (tainted) {
            MainScreen.text(player.modFem(100, 2), false);
            if (Utils.rand(3) == 0) MainScreen.text(player.modTone(15, 2), false);
        }
        else {
            MainScreen.text(player.modFem(90, 1), false);
            if (Utils.rand(3) == 0) MainScreen.text(player.modTone(20, 2), false);
        }
        player.genderCheck();
    }

    //1-Oversized Pepper (+size, thickness)
    //2-Double Pepper (+grows second cock or changes two cocks to dogcocks)
    //3-Black Pepper (Dark Fur, +corruption/libido)
    //4-Knotty Pepper (+Knot + Cum Multiplier)
    //5-Bulbous Pepper (+ball size or fresh balls)
    public caninePepper(type: number, player: Player): void {
        let temp2: number = 0;
        let temp3: number = 0;
        let crit: number = 1;
        //Set up changes and changeLimit
        let changes: number = 0;
        let changeLimit: number = 1;
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(2) == 0) changeLimit++;
        if (player.perks.has("HistoryAlchemist")) changeLimit++;
        //Initial outputs & crit level
        MainScreen.text("", true);
        if (type == 0) {
            if (Utils.rand(100) < 15) {
                crit = int(Math.Utils.random() * 20) / 10 + 2;
                MainScreen.text("The pepper tastes particularly potent, searingly hot and spicy.", false);
            }
            else MainScreen.text("The pepper is strangely spicy but very tasty.", false);
        }
        //Oversized pepper
        if (type == 1) {
            crit = int(Math.Utils.random() * 20) / 10 + 2;
            MainScreen.text("The pepper is so large and thick that you have to eat it in several large bites.  It is not as spicy as the normal ones, but is delicious and flavorful.", false);
        }
        //Double Pepper
        if (type == 2) {
            crit = int(Math.Utils.random() * 20) / 10 + 2;
            MainScreen.text("The double-pepper is strange, looking like it was formed when two peppers grew together near their bases.", false);
        }
        //Black Pepper
        if (type == 3) {
            crit = int(Math.Utils.random() * 20) / 10 + 2;
            MainScreen.text("This black pepper tastes sweet, but has a bit of a tangy aftertaste.", false);
        }
        //Knotty Pepper
        if (type == 4) {
            crit = int(Math.Utils.random() * 20) / 10 + 2;
            MainScreen.text("The pepper is a bit tough to eat due to the swollen bulge near the base, but you manage to cram it down and munch on it.  It's extra spicy!", false);
        }
        //Bulbous Pepper
        if (type == 5) {
            crit = int(Math.Utils.random() * 20) / 10 + 2;
            MainScreen.text("You eat the pepper, even the two orb-like growths that have grown out from the base.  It's delicious!", false);
        }
        //OVERDOSE Bad End!
        if (type <= 0 && crit > 1 && player.skinType == SKIN.FUR && player.faceType == FACE.DOG && player.upperBody.head.earType == EARS.DOG && player.lowerBody == LOWER_BODY.DOG && player.tailType == TAIL.DOG && Utils.rand(2) == 0 && player.statusAffects.has("DogWarning")) {
            temp = Utils.rand(2);
            if (temp == 0) {
                MainScreen.text("\n\nAs you swallow the pepper, you note that the spicy hotness on your tongue seems to be spreading. Your entire body seems to tingle and burn, making you feel far warmer than normal, feverish even. Unable to stand it any longer you tear away your clothes, hoping to cool down a little. Sadly, this does nothing to aid you with your problem. On the bright side, the sudden feeling of vertigo you've developed is more than enough to take your mind off your temperature issues. You fall forward onto your hands and knees, well not really hands and knees to be honest. More like paws and knees. That can't be good, you think for a moment, before the sensation of your bones shifting into a quadrupedal configuration robs you of your concentration. After that, it is only a short time before your form is remade completely into that of a large dog, or perhaps a wolf. The distinction would mean little to you now, even if you were capable of comprehending it. ", false);
                if (player.perks.has("MarblesMilk")) MainScreen.text("All you know is that there is a scent on the wind, it is time to hunt, and at the end of the day you need to come home for your milk.", false);
                else MainScreen.text("All you know is that there is a scent on the wind, and it is time to hunt.", false);
            }
            if (temp == 1) MainScreen.text("\n\nYou devour the sweet pepper, carefully licking your fingers for all the succulent juices of the fruit, and are about to go on your way when suddenly a tightness begins to build in your chest and stomach, horrid cramps working their way first through your chest, then slowly flowing out to your extremities, the feeling soon joined by horrible, blood-curdling cracks as your bones begin to reform, twisting and shifting, your mind exploding with pain. You fall to the ground, reaching one hand forward. No... A paw, you realize in horror, as you try to push yourself back up. You watch in horror, looking down your foreleg as thicker fur erupts from your skin, a " + player.hairColor + " coat slowly creeping from your bare flesh to cover your body. Suddenly, you feel yourself slipping away, as if into a dream, your mind warping and twisting, your body finally settling into its new form. With one last crack of bone you let out a yelp, kicking free of the cloth that binds you, wresting yourself from its grasp and fleeing into the now setting sun, eager to find prey to dine on tonight.", false);
            getGame().gameOver();
            return;
        }
        //WARNING, overdose VERY close!
        if (type <= 0 && player.skinType == SKIN.FUR && player.faceType == FACE.DOG && player.tailType == TAIL.DOG && player.upperBody.head.earType == EARS.DOG && player.lowerBody == LOWER_BODY.DOG && player.statusAffects.has("DogWarning") && Utils.rand(3) == 0) {
            MainScreen.text("<b>\n\nEating the pepper, you realize how dog-like you've become, and you wonder what else the peppers could change...</b>", false);
        }
        //WARNING, overdose is close!
        if (type <= 0 && player.skinType == SKIN.FUR && player.faceType == FACE.DOG && player.tailType == TAIL.DOG && player.upperBody.head.earType == EARS.DOG && player.lowerBody == LOWER_BODY.DOG && player.findStatusAffect(StatusAffects.DogWarning) < 0) {
            player.statusAffects.add(new StatusAffect("DogWarning", 0, 0, 0, 0)));
            MainScreen.text("<b>\n\nEating the pepper, you realize how dog-like you've become, and you wonder what else the peppers could change...</b>", false);
        }
        if (type == 3) {
            dynStats("lib", 2 + Utils.rand(4), "lus", 5 + Utils.rand(5), "cor", 2 + Utils.rand(4));
            MainScreen.text("\n\nYou feel yourself relaxing as gentle warmth spreads through your body.  Honestly you don't think you'd mind running into a demon or monster right now, they'd make for good entertainment.", false);
            if (player.stats.cor < 50) MainScreen.text("  You shake your head, blushing hotly.  Where did that thought come from?", false);
        }
        if (player.str < 50 && Utils.rand(3) == 0) {
            dynStats("str", (crit));
            if (crit > 1) MainScreen.text("\n\nYour muscles ripple and grow, bulging outwards.", false);
            else MainScreen.text("\n\nYour muscles feel more toned.", false);
            changes++;
        }
        if (player.stats.spe < 30 && Utils.rand(3) == 0 && changes < changeLimit) {
            dynStats("spe", (crit));
            if (crit > 1) MainScreen.text("\n\nYou find your muscles responding quicker, faster, and you feel an odd desire to go for a walk.", false);
            else MainScreen.text("\n\nYou feel quicker.", false);
            changes++;
        }
        if (player.stats.int > 30 && Utils.rand(3) == 0 && changes < changeLimit && type != 3) {
            dynStats("int", (-1 * crit));
            MainScreen.text("\n\nYou feel ", false);
            if (crit > 1) MainScreen.text("MUCH ", false);
            MainScreen.text("dumber.", false);
            changes++;
        }
        //-Remove feather-arms (copy this for goblin ale, mino blood, equinum, canine pepps, demon items)
        if (changes < changeLimit && player.armType == ARM.HARPY && Utils.rand(4) == 0) {
            MainScreen.text("\n\nYou scratch at your biceps absentmindedly, but no matter how much you scratch, it isn't getting rid of the itch.  Glancing down in irritation, you discover that your feathery arms are shedding their feathery coating.  The wing-like shape your arms once had is gone in a matter of moments, leaving " + player.skinDesc + " behind.", false);
            player.armType = ARM.HUMAN;
            changes++;
        }
        //-Remove chitin-arms (copy this for goblin ale, mino blood, equinum, canine pepps, demon items)
        if (changes < changeLimit && player.armType == ARM.SPIDER && Utils.rand(4) == 0) {
            MainScreen.text("\n\nYou scratch at your biceps absentmindedly, but no matter how much you scratch, it isn't getting rid of the itch.  Glancing down in irritation, you discover that your arms' chitinous covering is flaking away.  The glossy black coating is soon gone, leaving " + player.skinDesc + " behind.", false);
            player.armType = ARM.HUMAN;
            changes++;
        }
        //-Remove feathery hair (copy for equinum, canine peppers, Labova)
        if (changes < changeLimit && player.upperBody.head.hairType == 1 && Utils.rand(4) == 0) {
            //(long):
            if (player.hairLength >= 6) MainScreen.text("\n\nA lock of your downy-soft feather-hair droops over your eye.  Before you can blow the offending down away, you realize the feather is collapsing in on itself.  It continues to curl inward until all that remains is a normal stUtils.rand of hair.  <b>Your hair is no longer feathery!</b>", false);
            //(short)
            else MainScreen.text("\n\nYou run your fingers through your downy-soft feather-hair while you await the effects of the item you just ingested.  While your hand is up there, it detects a change in the texture of your feathers.  They're completely disappearing, merging down into stUtils.rands of regular hair.  <b>Your hair is no longer feathery!</b>", false);
            changes++;
            player.upperBody.head.hairType = 0;
        }
        //if(type != 2 && type != 4 && type != 5) MainScreen.text("\n", false);
        //Double Pepper!
        //Xforms/grows dicks to make you have two dogcocks
        if (type == 2) {
            //If already doubled up, GROWTH
            if (player.dogCocks() >= 2) {
                type = 1;
            }
            //If player doesnt have 2 dogdicks
            else {
                //If player has NO dogdicks
                if (player.dogCocks() == 0) {
                    //Dickless - grow two dogpeckers
                    if (player.lowerBody.cockSpot.count() == 0) {
                        player.createCock(7 + Utils.rand(7), 1.5 + Utils.rand(10) / 10);
                        player.createCock(7 + Utils.rand(7), 1.5 + Utils.rand(10) / 10);
                        MainScreen.text("\n\nA painful lump forms on your groin, nearly doubling you over as it presses against your " + player.armorName + ".  You rip open your gear and watch, horrified as the discolored skin splits apart, revealing a pair of red-tipped points.  A feeling of relief, and surprising lust grows as they push forward, glistening red and thickening.  The skin bunches up into an animal-like sheath, while a pair of fat bulges pop free.  You now have two nice thick dog-cocks, with decent sized knots.  Both pulse and dribble animal-pre, arousing you in spite of your attempts at self-control.", false);
                        player.lowerBody.cockSpot.list[0].knotMultiplier = 1.7;
                        player.lowerBody.cockSpot.list[0].cockType = CockType.DOG;
                        player.lowerBody.cockSpot.list[1].knotMultiplier = 1.7;
                        player.lowerBody.cockSpot.list[1].cockType = CockType.DOG;
                        dynStats("lus", 50);
                    }
                    //1 dick - grow 1 and convert 1
                    else if (player.lowerBody.cockSpot.count() == 1) {
                        MainScreen.text("\n\nYour " + cockDescript(0) + " vibrates, the veins clearly visible as it reddens and distorts.  The head narrows into a pointed tip while a gradually widening bulge forms around the base.  Where it meets your crotch, the skin bunches up around it, forming a canine-like sheath.  ", false);
                        player.lowerBody.cockSpot.list[0].cockType = CockType.DOG;
                        player.lowerBody.cockSpot.list[0].knotMultiplier = 1.5;
                        MainScreen.text("You feel something slippery wiggling inside the new sheath, and another red point peeks out.  In spite of yourself, you start getting turned on by the change, and the new dick slowly slides free, eventually stopping once the thick knot pops free.  The pair of dog-dicks hang there, leaking pre-cum and arousing you far beyond normal.", false);
                        player.createCock(7 + Utils.rand(7), 1.5 + Utils.rand(10) / 10);
                        player.lowerBody.cockSpot.list[1].knotMultiplier = 1.7;
                        player.lowerBody.cockSpot.list[1].cockType = CockType.DOG;
                        dynStats("lib", 2, "lus", 50);
                    }
                    //2 dicks+ - convert first 2 to doggie-dom
                    else {
                        MainScreen.text("\n\nYour crotch twitches, and you pull open your " + player.armorName + " to get a better look.  You watch in horror and arousal as your " + cockDescript(0) + " and " + cockDescript(1) + " both warp and twist, becoming red and pointed, growing thick bulges near the base.  When it stops you have two dog-cocks and an animal-like sheath.  The whole episode turns you on far more than it should, leaving you dripping animal pre and ready to breed.", false);
                        player.lowerBody.cockSpot.list[0].cockType = CockType.DOG;
                        player.lowerBody.cockSpot.list[1].cockType = CockType.DOG;
                        player.lowerBody.cockSpot.list[0].knotMultiplier = 1.4;
                        player.lowerBody.cockSpot.list[0].knotMultiplier = 1.4;
                        dynStats("lib", 2, "lus", 50);
                    }
                }
                //If player has 1 dogdicks
                else {
                    //if player has 1 total
                    if (player.lowerBody.cockSpot.count() == 1) {
                        MainScreen.text("\n\nYou feel something slippery wiggling inside your sheath, and another red point peeks out.  In spite of yourself, you start getting turned on by the change, and the new dick slowly slides free, eventually stopping once the thick knot pops free.  The pair of dog-dicks hang there, leaking pre-cum and arousing you far beyond normal.", false);
                        player.createCock(7 + Utils.rand(7), 1.5 + Utils.rand(10) / 10);
                        player.lowerBody.cockSpot.list[1].cockType = CockType.DOG;
                        player.lowerBody.cockSpot.list[1].knotMultiplier = 1.4;
                        dynStats("lib", 2, "lus", 50);
                    }
                    //if player has more
                    if (player.lowerBody.cockSpot.count() >= 1) {
                        //if first dick is already doggi'ed
                        if (player.lowerBody.cockSpot.list[0].cockType == CockType.DOG) {
                            MainScreen.text("\n\nYour crotch twitches, and you pull open your " + player.armorName + " to get a better look.  You watch in horror and arousal as your " + cockDescript(1) + " warps and twists, becoming red and pointed, just like other dog-dick, growing thick bulges near the base.  When it stops you have two dog-cocks and an animal-like sheath.  The whole episode turns you on far more than it should, leaving you dripping animal pre and ready to breed.", false);
                            player.lowerBody.cockSpot.list[1].cockType = CockType.DOG;
                            player.lowerBody.cockSpot.list[1].knotMultiplier = 1.4;
                        }
                        //first dick is not dog
                        else {
                            MainScreen.text("\n\nYour crotch twitches, and you pull open your " + player.armorName + " to get a better look.  You watch in horror and arousal as your " + cockDescript(0) + " warps and twists, becoming red and pointed, just like other dog-dick, growing thick bulges near the base.  When it stops you have two dog-cocks and an animal-like sheath.  The whole episode turns you on far more than it should, leaving you dripping animal pre and ready to breed.", false);
                            player.lowerBody.cockSpot.list[0].cockType = CockType.DOG;
                            player.lowerBody.cockSpot.list[0].knotMultiplier = 1.4;
                        }
                        dynStats("lib", 2, "lus", 50);
                    }
                }
            }
            player.genderCheck();
        }
        //Knotty knot pepper!
        if (type == 4) {
            //Cocks only!
            if (player.lowerBody.cockSpot.count() > 0) {
                //biggify knots
                if (player.dogCocks() > 0) {
                    temp = 0;
                    //set temp2 to first dogdick for initialization
                    while (temp < player.lowerBody.cockSpot.count()) {
                        if (player.lowerBody.cockSpot.list[temp].cockType == CockType.DOG) {
                            temp2 = temp;
                            break;
                        }
                        else temp++;
                    }
                    //Reset temp for nex tcheck
                    temp = player.lowerBody.cockSpot.count();
                    //Find smallest knot
                    while (temp > 0) {
                        temp--;
                        if (player.lowerBody.cockSpot.list[temp].cockType == CockType.DOG && player.lowerBody.cockSpot.list[temp].knotMultiplier < player.lowerBody.cockSpot.list[temp2].knotMultiplier) temp2 = temp;
                    }
                    //Have smallest knotted cock selected.
                    temp3 = (Utils.rand(2) + 5) / 20 * crit;
                    if (player.lowerBody.cockSpot.list[temp2].knotMultiplier >= 1.5) temp3 /= 2;
                    if (player.lowerBody.cockSpot.list[temp2].knotMultiplier >= 1.75) temp3 /= 2;
                    if (player.lowerBody.cockSpot.list[temp2].knotMultiplier >= 2) temp3 /= 5;
                    player.lowerBody.cockSpot.list[temp2].knotMultiplier += (temp3);
                    MainScreen.text("\n\n", false);
                    if (temp3 < .06) MainScreen.text("Your " + Appearance.cockNoun(CockType.DOG) + " feels unusually tight in your sheath as your knot grows.", false);
                    if (temp3 >= .06 && temp3 <= .12) MainScreen.text("Your " + Appearance.cockNoun(CockType.DOG) + " pops free of your sheath, thickening nicely into a bigger knot.", false);
                    if (temp3 > .12) MainScreen.text("Your " + Appearance.cockNoun(CockType.DOG) + " surges free of your sheath, swelling thicker with each passing second.  Your knot bulges out at the base, growing far beyond normal.", false);
                    dynStats("sen", .5, "lus", 5 * crit);
                }
                //Grow dogdick with big knot
                else {
                    MainScreen.text("\n\nYour " + cockDescript(0) + " twitches, reshaping itself.  The crown tapers down to a point while the base begins swelling.  It isn't painful in the slightest, actually kind of pleasant.  Your dog-like knot slowly fills up like a balloon, eventually stopping when it's nearly twice as thick as the rest.  You touch and shiver with pleasure, oozing pre-cum.", false);
                    player.lowerBody.cockSpot.list[0].cockType = CockType.DOG;
                    player.lowerBody.cockSpot.list[0].knotMultiplier = 2.1;
                }
            }
            //You wasted knot pepper!
            else MainScreen.text("\n\nA slight wave of nausea passes through you.  It seems this pepper does not quite agree with your body.", false);
        }
        //GROW BALLS
        if (type == 5) {
            if (player.lowerBody.balls <= 1) {
                MainScreen.text("\n\nA spike of pain doubles you up, nearly making you vomit.  You stay like that, nearly crying, as a palpable sense of relief suddenly washes over you.  You look down and realize you now have a small sack, complete with two relatively small balls.", false);
                player.lowerBody.balls = 2;
                player.lowerBody.ballSize = 1;
                dynStats("lib", 2, "lus", -10);
            }
            else {
                //Makes your balls biggah!
                player.lowerBody.ballSize++;
                //They grow slower as they get bigger...
                if (player.lowerBody.ballSize > 10) player.lowerBody.ballSize -= .5;
                //Texts
                if (player.lowerBody.ballSize <= 2) MainScreen.text("\n\nA flash of warmth passes through you and a sudden weight develops in your groin.  You pause to examine the changes and your roving fingers discover your " + simpleBallsDescript() + " have grown larger than a human's.", false);
                if (player.lowerBody.ballSize > 2) MainScreen.text("\n\nA sudden onset of heat envelops your groin, focusing on your " + sackDescript() + ".  Walking becomes difficult as you discover your " + simpleBallsDescript() + " have enlarged again.", false);
                dynStats("lib", 1, "lus", 3);
            }
        }
        //Sexual Stuff Now
        //------------------
        //Man-Parts
        //3 Changes,
        //1. Cock Xform
        //2. Knot Size++
        //3. cumMultiplier++ (to max of 1.5)
        if (player.lowerBody.cockSpot.count() > 0) {
            //Grow knot on smallest knotted dog cock
            if (type != 4 && player.dogCocks() > 0 && ((changes < changeLimit && Utils.rand(1.4) == 0) || type == 1)) {
                temp = 0;
                //set temp2 to first dogdick for initialization
                while (temp < player.lowerBody.cockSpot.count()) {
                    if (player.lowerBody.cockSpot.list[temp].cockType == CockType.DOG) {
                        temp2 = temp;
                        break;
                    }
                    else temp++;
                }
                //Reset temp for nex tcheck
                temp = player.lowerBody.cockSpot.count();
                //Find smallest knot
                while (temp > 0) {
                    temp--;
                    if (player.lowerBody.cockSpot.list[temp].cockType == CockType.DOG && player.lowerBody.cockSpot.list[temp].knotMultiplier < player.lowerBody.cockSpot.list[temp2].knotMultiplier) temp2 = temp;
                }
                //Have smallest knotted cock selected.
                temp3 = (Utils.rand(2) + 1) / 20 * crit;
                if (player.lowerBody.cockSpot.list[temp2].knotMultiplier >= 1.5) temp3 /= 2;
                if (player.lowerBody.cockSpot.list[temp2].knotMultiplier >= 1.75) temp3 /= 2;
                if (player.lowerBody.cockSpot.list[temp2].knotMultiplier >= 2) temp3 /= 5;
                player.lowerBody.cockSpot.list[temp2].knotMultiplier += (temp3);
                if (temp3 < .06) MainScreen.text("\n\nYour " + cockDescript(temp2) + " feels unusually tight in your sheath as your knot grows.", false);
                if (temp3 >= .06 && temp3 <= .12) MainScreen.text("\n\nYour " + cockDescript(temp2) + " pops free of your sheath, thickening nicely into a bigger knot.", false);
                if (temp3 > .12) MainScreen.text("\n\nYour " + cockDescript(temp2) + " surges free of your sheath, swelling thicker with each passing second.  Your knot bulges out at the base, growing far beyond normal.", false);
                dynStats("sen", .5, "lus", 5 * crit);
                changes++;
            }
            //Cock Xform if player has free cocks.
            if (player.dogCocks() < player.lowerBody.cockSpot.count() && ((changes < changeLimit && Utils.rand(1.6)) || type == 1) == 0) {
                //Select first human cock
                temp = player.lowerBody.cockSpot.count();
                temp2 = 0;
                while (temp > 0 && temp2 == 0) {
                    temp--;
                    //Store cock index if not a dogCock and exit loop.
                    if (player.lowerBody.cockSpot.list[temp].cockType != CockType.DOG) {
                        temp3 = temp;
                        //kicking out of tah loop!
                        temp2 = 1000;
                    }
                }
                //Talk about it
                //Hooooman
                if (player.lowerBody.cockSpot.list[temp3].cockType == CockType.HUMAN) {
                    MainScreen.text("\n\nYour " + cockDescript(temp3) + " clenches painfully, becoming achingly, throbbingly erect.  A tightness seems to squeeze around the base, and you wince as you see your skin and flesh shifting forwards into a canine-looking sheath.  You shudder as the crown of your " + cockDescript(temp3) + " reshapes into a point, the sensations nearly too much for you.  You throw back your head as the transformation completes, your " + Appearance.cockNoun(CockType.DOG) + " much thicker than it ever was before.  <b>You now have a dog-cock.</b>", false);
                    dynStats("sen", 10, "lus", 5 * crit);
                }
                //Horse
                if (player.lowerBody.cockSpot.list[temp3].cockType == CockType.HORSE) {
                    MainScreen.text("\n\nYour " + Appearance.cockNoun(CockType.HORSE) + " shrinks, the extra equine length seeming to shift into girth.  The flared tip vanishes into a more pointed form, a thick knotted bulge forming just above your sheath.  <b>You now have a dog-cock.</b>", false);
                    //Tweak length/thickness.
                    if (player.lowerBody.cockSpot.list[temp3].cockLength > 6) player.lowerBody.cockSpot.list[temp3].cockLength -= 2;
                    else player.lowerBody.cockSpot.list[temp3].cockLength -= .5;
                    player.lowerBody.cockSpot.list[temp3].cockThickness += .5;

                    dynStats("sen", 4, "lus", 5 * crit);
                }
                //Tentacular Tuesday!
                if (player.lowerBody.cockSpot.list[temp3].cockType == CockType.TENTACLE) {
                    MainScreen.text("\n\nYour " + cockDescript(temp3) + " coils in on itself, reshaping and losing its plant-like coloration as it thickens near the base, bulging out in a very canine-looking knot.  Your skin bunches painfully around the base, forming into a sheath.  <b>You now have a dog-cock.</b>", false);
                    dynStats("sen", 4, "lus", 5 * crit);
                }
                //Misc
                if (player.lowerBody.cockSpot.list[temp3].cockType.Index > 4) {
                    MainScreen.text("\n\nYour " + cockDescript(temp3) + " trembles, reshaping itself into a shiny red doggie-dick with a fat knot at the base.  <b>You now have a dog-cock.</b>", false);
                    dynStats("sen", 4, "lus", 5 * crit);
                }
                temp = 0;
                //Demon
                if (player.lowerBody.cockSpot.list[temp3].cockType == CockType.DEMON) {
                    MainScreen.text("\n\nYour " + cockDescript(temp3) + " color shifts red for a moment and begins to swell at the base, but within moments it smooths out, retaining its distinctive demonic shape, only perhaps a bit thicker.", false);
                    dynStats("sen", 1, "lus", 2 * crit);
                    temp = 1;
                }
                //Xform it!
                player.lowerBody.cockSpot.list[temp3].cockType = CockType.DOG;
                player.lowerBody.cockSpot.list[temp3].knotMultiplier = 1.1;
                player.lowerBody.cockSpot.list[temp3].thickenCock(2);
                if (temp == 1) {
                    player.lowerBody.cockSpot.list[temp3].cockType = CockType.DEMON;
                }
                changes++;

            }
            //Cum Multiplier Xform
            if (player.cumMultiplier < 2 && Utils.rand(2) == 0 && changes < changeLimit) {
                temp = 1.5;
                //Lots of cum raises cum multiplier cap to 2 instead of 1.5
                if (player.perks.has("MessyOrgasms")) temp = 2;
                if (temp < player.cumMultiplier + .05 * crit) {
                    changes--;
                }
                else {
                    player.cumMultiplier += .05 * crit;
                    //Flavor text
                    if (player.lowerBody.balls == 0) MainScreen.text("\n\nYou feel a churning inside your gut as something inside you changes.", false);
                    if (player.lowerBody.balls > 0) MainScreen.text("\n\nYou feel a churning in your " + ballsDescriptLight() + ".  It quickly settles, leaving them feeling somewhat more dense.", false);
                    if (crit > 1) MainScreen.text("  A bit of milky pre dribbles from your " + multiCockDescriptLight() + ", pushed out by the change.", false);
                }
                changes++;
            }
            //Oversized pepper
            if (type == 1) {
                //GET LONGER
                //single cock
                if (player.lowerBody.cockSpot.count() == 1) {
                    temp2 = player.increaseCock(0, Utils.rand(4) + 3);
                    temp = 0;
                    dynStats("sen", 1, "lus", 10);
                }
                //Multicock
                else {
                    //Find smallest cock
                    //Temp2 = smallness size
                    //temp = current smallest
                    temp3 = player.lowerBody.cockSpot.count();
                    temp = 0;
                    while (temp3 > 0) {
                        temp3--;
                        //If current cock is smaller than saved, switch values.
                        if (player.lowerBody.cockSpot.list[temp].cockLength > player.lowerBody.cockSpot.list[temp3].cockLength) {
                            temp2 = player.lowerBody.cockSpot.list[temp3].cockLength;
                            temp = temp3;
                        }
                    }
                    //Grow smallest cock!
                    //temp2 changes to growth amount
                    temp2 = player.increaseCock(temp, Utils.rand(4) + 3);
                    dynStats("sen", 1, "lus", 10);
                    if (player.lowerBody.cockSpot.list[temp].cockThickness <= 2) player.lowerBody.cockSpot.list[temp].thickenCock(1);
                }
                if (temp2 > 2) MainScreen.text("\n\nYour " + cockDescript(temp) + " tightens painfully, inches of bulging dick-flesh pouring out from your crotch as it grows longer.  Thick pre forms at the pointed tip, drawn out from the pleasure of the change.", false);
                if (temp2 > 1 && temp2 <= 2) MainScreen.text("\n\nAching pressure builds within your crotch, suddenly releasing as an inch or more of extra dick-flesh spills out.  A dollop of pre beads on the head of your enlarged " + cockDescript(temp) + " from the pleasure of the growth.", false);
                if (temp2 <= 1) MainScreen.text("\n\nA slight pressure builds and releases as your " + cockDescript(temp) + " pushes a bit further out of your crotch.", false);
            }
        }
        //Female Stuff
        //Multiboobages
        if (player.upperBody.chest.count() > 0) {
            //if bigger than A cup
            if (player.upperBody.chest.list[0].breastRating > 0 && player.lowerBody.vaginaSpot.count() > 0) {
                //Doggies only get 3 rows of tits! FENOXO HAS SPOKEN
                if (player.upperBody.chest.count() < 3 && Utils.rand(2) == 0 && changes < changeLimit) {
                    player.createBreastRow();
                    //Store temp to the index of the newest row
                    temp = player.upperBody.chest.count() - 1;
                    //Breasts are too small to grow a new row, so they get bigger first
                    //But ONLY if player has a vagina (dont want dudes weirded out)
                    if (player.lowerBody.vaginaSpot.count() > 0 && player.upperBody.chest.list[0].breastRating <= player.upperBody.chest.count()) {
                        MainScreen.text("\n\nYour " + breastDescript(0) + " feel constrained and painful against your top as they grow larger by the moment, finally stopping as they reach ", false);
                        player.upperBody.chest.list[0].breastRating += 2;
                        MainScreen.text(player.breastCup(0) + " size.  But it doesn't stop there, you feel a tightness beginning lower on your torso...", false);
                        changes++;
                    }
                    //Had 1 row to start
                    if (player.upperBody.chest.count() == 2) {
                        //1 size below primary breast row!
                        player.upperBody.chest.list[temp].breastRating = player.upperBody.chest.list[0].breastRating - 1;
                        if (player.upperBody.chest.list[0].breastRating - 1 == 0) MainScreen.text("\n\nA second set of breasts forms under your current pair, stopping while they are still fairly flat and masculine looking.", false);
                        else MainScreen.text("\n\nA second set of breasts bulges forth under your current pair, stopping as they reach " + player.breastCup(temp) + "s.", false);
                        MainScreen.text("  A sensitive nub grows on the summit of each new tit, becoming a new nipple.", false);
                        dynStats("sen", 6, "lus", 5);
                        changes++;
                    }
                    //Many breast Rows - requires larger primary tits...
                    if (player.upperBody.chest.count() > 2 && player.upperBody.chest.list[0].breastRating > player.upperBody.chest.count()) {
                        dynStats("sen", 6, "lus", 5);
                        //New row's size = the size of the row above -1
                        player.upperBody.chest.list[temp].breastRating = player.upperBody.chest.list[temp - 1].breastRating - 1;
                        //If second row are super small but primary row is huge it could go negative.
                        //This corrects that problem.
                        if (player.upperBody.chest.list[temp].breastRating < 0) player.upperBody.chest.list[temp].breastRating = 0;
                        if (player.upperBody.chest.list[temp - 1].breastRating < 0) player.upperBody.chest.list[temp - 1].breastRating = 0;
                        if (player.upperBody.chest.list[temp].breastRating == 0) MainScreen.text("\n\nYour abdomen tingles and twitches as a new row of breasts sprouts below the others.  Your new breasts stay flat and masculine, not growing any larger.", false);
                        else MainScreen.text("\n\nYour abdomen tingles and twitches as a new row of " + player.breastCup(temp) + " " + breastDescript(temp) + " sprouts below your others.", false);
                        MainScreen.text("  A sensitive nub grows on the summit of each new tit, becoming a new nipple.", false);
                        changes++;
                    }
                    //Extra sensitive if crit
                    if (crit > 1) {
                        if (crit > 2) {
                            MainScreen.text("  You heft your new chest experimentally, exploring the new flesh with tender touches.  Your eyes nearly roll back in your head from the intense feelings.", false);
                            dynStats("sen", 6, "lus", 15, "cor", 0)
                        }
                        else {
                            MainScreen.text("  You touch your new nipples with a mixture of awe and desire, the experience arousing beyond measure.  You squeal in delight, nearly orgasming, but in time finding the willpower to stop yourself.", false);
                            dynStats("sen", 3, "lus", 10);
                        }
                    }

                }
                //If already has max doggie breasts!
                else if (Utils.rand(2) == 0) {
                    //Check for size mismatches, and move closer to spec!
                    temp = player.upperBody.chest.count();
                    temp2 = 0;
                    let evened: boolean = false;
                    //Check each row, and if the row above or below it is
                    while (temp > 1 && temp2 == 0) {
                        temp--;
                        //Gimme a sec
                        if (player.upperBody.chest.list[temp].breastRating + 1 < player.upperBody.chest.list[temp - 1].breastRating) {
                            if (!evened) {
                                evened = true;
                                MainScreen.text("\n", false);
                            }
                            MainScreen.text("\nYour ", false);
                            if (temp == 0) MainScreen.text("first ", false);
                            if (temp == 1) MainScreen.text("second ", false);
                            if (temp == 2) MainScreen.text("third ", false);
                            if (temp == 3) MainScreen.text("fourth ", false);
                            if (temp == 4) MainScreen.text("fifth ", false);
                            if (temp > 4) MainScreen.text("", false);
                            MainScreen.text("row of " + breastDescript(temp) + " grows larger, as if jealous of the jiggling flesh above.", false);
                            temp2 = (player.upperBody.chest.list[temp - 1].breastRating) - player.upperBody.chest.list[temp].breastRating - 1;
                            if (temp2 > 5) temp2 = 5;
                            if (temp2 < 1) temp2 = 1;
                            player.upperBody.chest.list[temp].breastRating += temp2;
                        }
                    }
                }
            }
        }
        //Grow tits if have NO breasts/nipples AT ALL
        else if (Utils.rand(2) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYour chest tingles uncomfortably as your center of balance shifts.  <b>You now have a pair of B-cup breasts.</b>", false);
            MainScreen.text("  A sensitive nub grows on the summit of each tit, becoming a new nipple.", false);
            player.createBreastRow();
            player.upperBody.chest.list[0].breastRating = 2;
            player.upperBody.chest.list[0].breasts = 2;
            dynStats("sen", 4, "lus", 6);
            changes++;
        }
        //Go into heat
        if (Utils.rand(2) == 0 && changes < changeLimit) {
            if (player.goIntoHeat(true)) {
                changes++;
            }
        }
        if (changes < changeLimit && player.dogScore() >= 3 && Utils.rand(4) == 0) {
            changes++;
            MainScreen.text("\n\n", false);
            MainScreen.text("Images and thoughts come unbidden to your mind, overwhelming your control as you rapidly lose yourself in them, daydreaming of... ", false);
            //cawk fantasies
            if (player.gender <= 1 || (player.gender == 3 && Utils.rand(2) == 0)) {
                MainScreen.text("bounding through the woods, hunting with your master.  Feeling the wind in your fur and the thrill of the hunt coursing through your veins intoxicates you.  You have your nose to the ground, tracking your quarry as you run, until a heavenly scent stops you in your tracks.", false);
                dynStats("lus", 5 + player.stats.lib / 20);
                //break1
                if (player.stats.cor < 33 || !player.lowerBody.cockSpot.hasCock()) MainScreen.text("\nYou shake your head to clear the unwanted fantasy from your mind, repulsed by it.", false);
                else {
                    MainScreen.text("  Heart pounding, your shaft pops free of its sheath on instinct, as you take off after the new scent.  Caught firmly in the grip of a female's heat, you ignore your master's cry as you disappear into the wild, " + Appearance.cockNoun(CockType.DOG) + " growing harder as you near your quarry.  You burst through a bush, spotting a white-furred female.  She drops, exposing her dripping fem-sex to you, the musky scent of her sex channeling straight through your nose and sliding into your " + Appearance.cockNoun(CockType.DOG) + ".", false);
                    dynStats("lus", 5 + player.stats.lib / 20);
                    //Break 2
                    if (player.stats.cor < 66) MainScreen.text("\nYou blink a few times, the fantasy fading as you master yourself.  That daydream was so strange, yet so hot.", false);
                    else {
                        MainScreen.text("  Unable to wait any longer, you mount her, pressing your bulging knot against her vulva as she yips in pleasure. The heat of her sex is unreal, the tight passage gripping you like a vice as you jackhammer against her, biting her neck gently in spite of the violent pounding.", false);
                        dynStats("lus", 5 + player.stats.lib / 20);
                        //break3
                        if (player.stats.cor < 80) {
                            if (player.lowerBody.vaginaSpot.count() > 0) MainScreen.text("\nYou reluctantly pry your hand from your aching " + vaginaDescript(0) + " as you drag yourself out of your fantasy.", false);
                            else MainScreen.text("\nYou reluctantly pry your hand from your aching " + cockDescript(0) + " as you drag yourself out of your fantasy.", false);
                        }
                        else {
                            MainScreen.text("  At last your knot pops into her juicy snatch, splattering her groin with a smattering of her arousal.  The scents of your mating reach a peak as the velvet vice around your " + Appearance.cockNoun(CockType.DOG) + " quivers in the most indescribably pleasant way.  You clamp down on her hide as your whole body tenses, unleashing a torrent of cum into her sex.  Each blast is accompanied by a squeeze of her hot passage, milking you of the last of your spooge.  Your " + player.legs() + " give out as your fantasy nearly brings you to orgasm, the sudden impact with the ground jarring you from your daydream.", false);
                            dynStats("lus", 5 + player.stats.lib / 20);
                        }
                    }
                }
            }
            //Pure female fantasies
            else if (player.lowerBody.vaginaSpot.hasVagina()) {
                MainScreen.text("wagging your dripping " + vaginaDescript(0) + " before a pack of horny wolves, watching their shiny red doggie-pricks practically jump out of their sheaths at your fertile scent.", false);
                dynStats("lus", 5 + player.stats.lib / 20);
                //BREAK 1
                if (player.stats.cor < 33) {
                    MainScreen.text("\nYou shake your head to clear the unwanted fantasy from your mind, repulsed by it.", false);
                }
                else {
                    MainScreen.text("  In moments they begin their advance, plunging their pointed beast-dicks into you, one after another.  You yip and howl with pleasure as each one takes his turn knotting you.", false);
                    dynStats("lus", 5 + player.stats.lib / 20);
                    //BREAK 2
                    if (player.stats.cor <= 66) {
                        MainScreen.text("\nYou blink a few times, the fantasy fading as you master yourself.  That daydream was so strange, yet so hot.", false);
                    }
                    else {
                        MainScreen.text("  The feeling of all that hot wolf-spooge spilling from your overfilled snatch and running down your thighs is heavenly, nearly making you orgasm on the spot.  You see the alpha of the pack is hard again, and his impressive member is throbbing with the need to breed you.", false);
                        dynStats("lus", 5 + player.stats.lib / 20);
                        //break3
                        if (player.stats.cor < 80) {
                            MainScreen.text("\nYou reluctantly pry your hand from your aching " + vaginaDescript(0) + " as you drag yourself out of your fantasy.", false);
                        }
                        else {
                            MainScreen.text("  You growl with discomfort as he pushes into your abused wetness, stretching you tightly, every beat of his heart vibrating through your nethers.  With exquisite force, he buries his knot in you and begins filling you with his potent seed, impregnating you for sure. Your knees give out as your fantasy nearly brings you to orgasm, the sudden impact with the ground jarring you from your daydream.", false);
                            dynStats("lus", 5 + player.stats.lib / 20);
                        }
                    }
                }
            }
            else {
                MainScreen.text("wagging your [asshole] before a pack of horny wolves, watching their shiny red doggie-pricks practically jump out of their sheaths at you after going so long without a female in the pack.");
                dynStats("lus", 5 + player.stats.lib / 20);
                //BREAK 1
                if (player.stats.cor < 33) {
                    MainScreen.text("\nYou shake your head to clear the unwanted fantasy from your mind, repulsed by it.", false);
                }
                else {
                    MainScreen.text("  In moments they begin their advance, plunging their pointed beast-dicks into you, one after another.  You yip and howl with pleasure as each one takes his turn knotting you.", false);
                    dynStats("lus", 5 + player.stats.lib / 20);
                    //BREAK 2
                    if (player.stats.cor <= 66) {
                        MainScreen.text("\nYou blink a few times, the fantasy fading as you master yourself.  That daydream was so strange, yet so hot.", false);
                    }
                    else {
                        MainScreen.text("  The feeling of all that hot wolf-spooge spilling from your overfilled ass and running down your thighs is heavenly, nearly making you orgasm on the spot.  You see the alpha of the pack is hard again, and his impressive member is throbbing with the need to spend his lust on you.", false);
                        dynStats("lus", 5 + player.stats.lib / 20);
                        //break3
                        if (player.stats.cor < 80) {
                            MainScreen.text("\nYou reluctantly pry your hand from your aching asshole as you drag yourself out of your fantasy.", false);
                        }
                        else {
                            MainScreen.text("  You growl with discomfort as he pushes into your abused, wet hole, stretching you tightly, every beat of his heart vibrating through your hindquarters.  With exquisite force, he buries his knot in you and begins filling you with his potent seed, impregnating you for sure. Your knees give out as your fantasy nearly brings you to orgasm, the sudden impact with the ground jarring you from your daydream.", false);
                            dynStats("lus", 5 + player.stats.lib / 20);
                        }
                    }
                }
            }
        }
        //Remove odd eyes
        if (changes < changeLimit && Utils.rand(5) == 0 && player.eyeType > EYES.HUMAN) {
            if (player.eyeType == EYES.BLACK_EYES_SAND_TRAP) {
                MainScreen.text("\n\nYou feel a twinge in your eyes and you blink.  It feels like black cataracts have just fallen away from you, and you know without needing to see your reflection that your eyes have gone back to looking human.");
            }
            else {
                MainScreen.text("\n\nYou blink and stumble, a wave of vertigo threatening to pull your " + player.feet() + " from under you.  As you steady and open your eyes, you realize something seems different.  Your vision is changed somehow.", false);
                if (player.eyeType == EYES.FOUR_SPIDER_EYES) MainScreen.text("  Your multiple, arachnid eyes are gone!</b>", false);
                MainScreen.text("  <b>You have normal, humanoid eyes again.</b>", false);
            }
            player.eyeType = EYES.HUMAN;
            changes++;
        }
        //Master Furry Appearance Order:
        //Tail -> Ears -> Paws -> Fur -> Face
        //Dog-face requires fur & paws  Should be last morph to take place
        if (Utils.rand(5) == 0 && changes < changeLimit &&
            player.faceType != FACE.DOG && player.skinType == SKIN.FUR &&
            player.lowerBody == LOWER_BODY.DOG) {
            if (player.faceType == FACE.HORSE) MainScreen.text("\n\nYour face is wracked with pain.  You throw back your head and scream in agony as you feel your cheekbones breaking and shifting, reforming into something else.  <b>Your horse-like features rearrange to take on many canine aspects.</b>", false);
            else MainScreen.text("\n\nYour face is wracked with pain.  You throw back your head and scream in agony as you feel your cheekbones breaking and shifting, reforming into something... different.  You find a puddle to view your reflection...<b>your face is now a cross between human and canine features.</b>", false);
            player.faceType = FACE.DOG;
            changes++;
        }
        if (type == 3 && player.hairColor != "midnight black") {
            if (player.skinType == SKIN.FUR) MainScreen.text("<b>\n\nYour fur and hair tingles, growing in thicker than ever as darkness begins to spread from the roots, turning it midnight black.</b>", false);
            else MainScreen.text("<b>\n\nYour " + player.skinDesc + " itches like crazy as fur grows out from it, coating your body.  It's incredibly dense and black as the middle of a moonless night.</b>", false);
            player.skinType = SKIN.FUR;
            player.skinAdj = "thick";
            player.skinDesc = "fur";
            player.hairColor = "midnight black";
        }
        //Become furred - requires paws and tail
        if (Utils.rand(4) == 0 && changes < changeLimit &&
            player.lowerBody == LOWER_BODY.DOG && player.tailType == TAIL.DOG &&
            player.skinType != SKIN.FUR) {
            if (player.skinType == SKIN.PLAIN) MainScreen.text("\n\nYour skin itches intensely.  You gaze down as more and more hairs break forth from your skin, quickly transforming into a soft coat of fur.  <b>You are now covered in " + player.hairColor + " fur from head to toe.</b>", false);
            if (player.skinType == SKIN.SCALES) MainScreen.text("\n\nYour scales itch incessantly.  You scratch, feeling them flake off to reveal a coat of " + player.hairColor + " fur growing out from below!  <b>You are now covered in " + player.hairColor + " fur from head to toe.</b>", false);
            player.skinType = SKIN.FUR;
            player.skinDesc = "fur";
            changes++;
        }
        //Change to paws - requires tail and ears
        if (Utils.rand(3) == 0 && player.lowerBody != LOWER_BODY.DOG && player.tailType == TAIL.DOG && player.upperBody.head.earType == EARS.DOG && changes < changeLimit) {
            //Feet -> paws
            if (player.lowerBody == LOWER_BODY.HUMAN) MainScreen.text("\n\nYou scream in agony as you feel the bones in your feet break and begin to rearrange. <b>You now have paws</b>.", false);
            //Hooves -> Paws
            else if (player.lowerBody == LOWER_BODY.HOOFED) MainScreen.text("\n\nYou feel your hooves suddenly splinter, growing into five unique digits.  Their flesh softens as your hooves reshape into furred paws.", false);
            else MainScreen.text("\n\nYour lower body is wracked by pain!  Once it passes, you discover that you're standing on fur-covered paws!  <b>You now have paws</b>.", false);
            player.lowerBody = LOWER_BODY.DOG;
            changes++;
        }
        //Change to dog-ears!  Requires dog-tail
        if (Utils.rand(2) == 0 && player.upperBody.head.earType != EARS.DOG && player.tailType == TAIL.DOG && changes < changeLimit) {
            if (player.upperBody.head.earType == -1) MainScreen.text("\n\nTwo painful nubs begin sprouting from your head, growing and opening into canine ears.  ", false);
            if (player.upperBody.head.earType == EARS.HUMAN) MainScreen.text("\n\nThe skin on the sides of your face stretches painfully as your ears migrate upwards, towards the top of your head.  They shift and elongate, becoming canine in nature.  ", false);
            if (player.upperBody.head.earType == EARS.HORSE) MainScreen.text("\n\nYour equine ears twist as they transform into canine versions.  ", false);
            if (player.upperBody.head.earType > EARS.DOG) MainScreen.text("\n\nYour ears transform, becoming more canine in appearance.  ", false);
            player.upperBody.head.earType = EARS.DOG;
            player.earValue = 2;
            MainScreen.text("<b>You now have dog ears.</b>", false);
            changes++;
        }
        //Grow tail if not dog-tailed
        if (Utils.rand(3) == 0 && changes < changeLimit && player.tailType != TAIL.DOG) {
            if (player.tailType == TAIL.NONE) MainScreen.text("\n\nA pressure builds on your backside.  You feel under your clothes and discover an odd bump that seems to be growing larger by the moment.  In seconds it passes between your fingers, bursts out the back of your clothes, and grows most of the way to the ground.  A thick coat of fur springs up to cover your new tail.  ", false);
            if (player.tailType == TAIL.HORSE) MainScreen.text("\n\nYou feel a tightness in your rump, matched by the tightness with which the stUtils.rands of your tail clump together.  In seconds they fuse into a single tail, rapidly sprouting thick fur.  ", false);
            if (player.tailType == TAIL.DEMONIC) MainScreen.text("\n\nThe tip of your tail feels strange.  As you pull it around to check on it, the spaded tip disappears, quickly replaced by a thick coat of fur over the entire surface of your tail.  ", false);
            //Generic message for now
            if (player.tailType >= TAIL.COW) MainScreen.text("\n\nYou feel your backside shift and change, flesh molding and displacing into a long puffy tail!  ", false);
            changes++;
            player.tailType = TAIL.DOG;
            MainScreen.text("<b>You now have a dog-tail.</b>", false);
        }
        if (Utils.rand(4) == 0 && player.upperBody.gills && changes < changeLimit) {
            MainScreen.text("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.", false);
            player.upperBody.gills = false;
            changes++;
        }
        if (player.skinType == SKIN.FUR && changes < changeLimit && Utils.rand(3) == 0) {
            MainScreen.text("\n\nYou become more... solid.  Sinewy.  A memory comes unbidden from your youth of a grizzled wolf you encountered while hunting, covered in scars, yet still moving with an easy grace.  You imagine that must have felt something like this.", false);
            dynStats("tou", 4, "sen", -3);
            changes++;
        }
        //If no changes yay
        if (changes == 0) {
            MainScreen.text("\n\nInhuman vitality spreads through your body, invigorating you!\n", false);
            HPChange(20, true);
            dynStats("lus", 3);
        }

    }

    public impFood(player: Player): void {
        MainScreen.text("", true);
        if (player.lowerBody.cockSpot.count() > 0) {
            MainScreen.text("The food tastes strange and corrupt - you can't really think of a better word for it, but it's unclean.", false);
            if (player.lowerBody.cockSpot.list[0].cockLength < 12) {
                temp = player.increaseCock(0, Utils.rand(2) + 2);
                MainScreen.text("\n\n", false);
                player.lengthChange(temp, 1);
            }
            MainScreen.text("\n\nInhuman vitality spreads through your body, invigorating you!\n", false);
            HPChange(30 + player.tou / 3, true);
            dynStats("lus", 3, "cor", 1);
            //Shrinkage!
            if (Utils.rand(2) == 0 && player.tallness > 42) {
                MainScreen.text("\n\nYour skin crawls, making you close your eyes and shiver.  When you open them again the world seems... different.  After a bit of investigation, you realize you've become shorter!\n", false);
                player.tallness -= 1 + Utils.rand(3);
            }
            //Red skin!
            if (Utils.rand(30) == 0 && player.skinTone != "red") {
                if (player.skinType == SKIN.FUR) MainScreen.text("\n\nUnderneath your fur, your skin ", false);
                else MainScreen.text("\n\nYour " + player.skinDesc + " ", false);
                if (Utils.rand(2) == 0) player.skinTone = "red";
                else player.skinTone = "orange";
                MainScreen.text("begins to lose its color, fading until you're as white as an albino.  Then, starting at the crown of your head, a reddish hue rolls down your body in a wave, turning you completely " + player.skinTone + ".", false);
            }
            return;
        }
        else {
            MainScreen.text("The food tastes... corrupt, for lack of a better word.\n", false);
            HPChange(20 + player.tou / 3, true);
            dynStats("lus", 3, "cor", 1);
        }
        //Red skin!
        if (Utils.rand(30) == 0 && player.skinTone != "red") {
            if (player.skinType == SKIN.FUR) MainScreen.text("\n\nUnderneath your fur, your skin ", false);
            else MainScreen.text("\n\nYour " + player.skinDesc + " ", false);
            if (Utils.rand(2) == 0) player.skinTone = "red";
            else player.skinTone = "orange";
            MainScreen.text("begins to lose its color, fading until you're as white as an albino.  Then, starting at the crown of your head, a reddish hue rolls down your body in a wave, turning you completely " + player.skinTone + ".", false);
        }

        //Shrinkage!
        if (Utils.rand(2) == 0 && player.tallness > 42) {
            MainScreen.text("\n\nYour skin crawls, making you close your eyes and shiver.  When you open them again the world seems... different.  After a bit of investigation, you realize you've become shorter!", false);
            player.tallness -= 1 + Utils.rand(3);
        }
    }

    //pureHoney moved to BeeHoney.as

    public succubisDelight(tainted: boolean, player: Player): void {
        player.slimeFeed();
        let changes: number = 0;
        let crit: number = 1;
        //Determine crit multiplier (x2 or x3)
        if (Utils.rand(4) == 0) crit += Utils.rand(2) + 1;
        let changeLimit: number = 1;
        //Chances to up the max number of changes
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(2) == 0) changeLimit++;
        if (player.perks.has("HistoryAlchemist")) changeLimit++;
        //Generic drinking text
        MainScreen.text("You uncork the bottle and drink down the strange substance, struggling to down the thick liquid.", true);
        //low corruption thoughts
        if (player.stats.cor < 33) MainScreen.text("  This stuff is gross, why are you drinking it?", false);
        //high corruption
        if (player.stats.cor >= 66) MainScreen.text("  You lick your lips, marvelling at how thick and sticky it is.", false);
        //Corruption increase
        if (player.stats.cor < 50 || Utils.rand(2)) {
            MainScreen.text("\n\nThe drink makes you feel... dirty.", false);
            temp = 1;
            //Corrupts the uncorrupted faster
            if (player.stats.cor < 50) temp++;
            if (player.stats.cor < 40) temp++;
            if (player.stats.cor < 30) temp++;
            //Corrupts the very corrupt slower
            if (player.stats.cor >= 90) temp = .5;
            if (tainted) dynStats("cor", temp);
            else dynStats("cor", 0);
            changes++;
        }
        //Makes your balls biggah! (Or cummultiplier higher if futa!)
        if (Utils.rand(1.5) == 0 && changes < changeLimit && player.lowerBody.balls > 0) {
            player.lowerBody.ballSize++;
            //They grow slower as they get bigger...
            if (player.lowerBody.ballSize > 10) player.lowerBody.ballSize -= .5;
            //Texts
            if (player.lowerBody.ballSize <= 2) MainScreen.text("\n\nA flash of warmth passes through you and a sudden weight develops in your groin.  You pause to examine the changes and your roving fingers discover your " + simpleBallsDescript() + " have grown larger than a human's.", false);
            if (player.lowerBody.ballSize > 2) MainScreen.text("\n\nA sudden onset of heat envelops your groin, focusing on your " + sackDescript() + ".  Walking becomes difficult as you discover your " + simpleBallsDescript() + " have enlarged again.", false);
            dynStats("lib", 1, "lus", 3);
        }
        //Boost cum multiplier
        if (changes < changeLimit && Utils.rand(2) == 0 && player.lowerBody.cockSpot.count() > 0) {
            if (player.cumMultiplier < 6 && Utils.rand(2) == 0 && changes < changeLimit) {
                //Temp is the max it can be raised to
                temp = 3;
                //Lots of cum raises cum multiplier cap to 6 instead of 3
                if (player.perks.has("MessyOrgasms")) temp = 6;
                if (temp < player.cumMultiplier + .4 * crit) {
                    changes--;
                }
                else {
                    player.cumMultiplier += .4 * crit;
                    //Flavor text
                    if (player.lowerBody.balls == 0) MainScreen.text("\n\nYou feel a churning inside your body as something inside you changes.", false);
                    if (player.lowerBody.balls > 0) MainScreen.text("\n\nYou feel a churning in your " + ballsDescriptLight() + ".  It quickly settles, leaving them feeling somewhat more dense.", false);
                    if (crit > 1) MainScreen.text("  A bit of milky pre dribbles from your " + multiCockDescriptLight() + ", pushed out by the change.", false);
                    dynStats("lib", 1);
                }
                changes++;
            }
        }
        //Fail-safe
        if (changes == 0) {
            MainScreen.text("\n\nYour groin tingles, making it feel as if you haven't cum in a long time.", false);
            player.hoursSinceCum += 100;
            changes++;
        }
        if (player.lowerBody.balls > 0 && Utils.rand(3) == 0) {
            MainScreen.text(player.modFem(12, 3), false);
        }
    }

    public succubisDream(player: Player): void {
        player.slimeFeed();
        let changes: number = 0;
        let crit: number = 1;
        //Determine crit multiplier (x2 or x3)
        crit += Utils.rand(2) + 1;
        let changeLimit: number = 1;
        //Chances to up the max number of changes
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(2) == 0) changeLimit++;
        if (player.perks.has("HistoryAlchemist")) changeLimit++;
        //Generic drinking text
        MainScreen.text("You uncork the bottle and drink down the strange substance, struggling to down the thick liquid.", true);
        //low corruption thoughts
        if (player.stats.cor < 33) MainScreen.text("  This stuff is gross, why are you drinking it?", false);
        //high corruption
        if (player.stats.cor >= 66) MainScreen.text("  You lick your lips, marvelling at how thick and sticky it is.", false);
        //Corruption increase
        if (player.stats.cor < 50 || Utils.rand(2)) {
            MainScreen.text("\n\nThe drink makes you feel... dirty.", false);
            temp = 1;
            //Corrupts the uncorrupted faster
            if (player.stats.cor < 50) temp++;
            if (player.stats.cor < 40) temp++;
            if (player.stats.cor < 30) temp++;
            //Corrupts the very corrupt slower
            if (player.stats.cor >= 90) temp = .5;
            dynStats("cor", temp + 2);
            changes++;
        }
        //NEW BALLZ
        if (player.lowerBody.balls < 4) {
            if (player.lowerBody.balls > 0) {
                player.lowerBody.balls = 4;
                MainScreen.text("\n\nIncredible pain scythes through your crotch, doubling you over.  You stagger around, struggling to pull open your " + player.armorName + ".  In shock, you barely register the sight before your eyes: <b>You have four balls.</b>", false);
            }
            if (player.lowerBody.balls == 0) {
                player.lowerBody.balls = 2;
                MainScreen.text("\n\nIncredible pain scythes through your crotch, doubling you over.  You stagger around, struggling to pull open your " + player.armorName + ".  In shock, you barely register the sight before your eyes: <b>You have balls!</b>", false);
                player.lowerBody.ballSize = 1;
            }
            changes++;
        }
        //Makes your balls biggah! (Or cummultiplier higher if futa!)
        if (Utils.rand(1.5) == 0 && changes < changeLimit && player.lowerBody.balls > 0 && player.lowerBody.cockSpot.count() > 0) {
            player.lowerBody.ballSize++;
            //They grow slower as they get bigger...
            if (player.lowerBody.ballSize > 10) player.lowerBody.ballSize -= .5;
            //Texts
            if (player.lowerBody.ballSize <= 2) MainScreen.text("\n\nA flash of warmth passes through you and a sudden weight develops in your groin.  You pause to examine the changes and your roving fingers discover your " + simpleBallsDescript() + " have grown larger than a human's.", false);
            if (player.lowerBody.ballSize > 2) MainScreen.text("\n\nA sudden onset of heat envelops your groin, focusing on your " + sackDescript() + ".  Walking becomes difficult as you discover your " + simpleBallsDescript() + " have enlarged again.", false);
            dynStats("lib", 1, "lus", 3);
        }
        //Boost cum multiplier
        if (changes < changeLimit && Utils.rand(2) == 0 && player.lowerBody.cockSpot.count() > 0) {
            if (player.cumMultiplier < 6 && Utils.rand(2) == 0 && changes < changeLimit) {
                //Temp is the max it can be raised to
                temp = 3;
                //Lots of cum raises cum multiplier cap to 6 instead of 3
                if (player.perks.has("MessyOrgasms")) temp = 6;
                if (temp < player.cumMultiplier + .4 * crit) {
                    changes--;
                }
                else {
                    player.cumMultiplier += .4 * crit;
                    //Flavor text
                    if (player.lowerBody.balls == 0) MainScreen.text("\n\nYou feel a churning inside your body as something inside you changes.", false);
                    if (player.lowerBody.balls > 0) MainScreen.text("\n\nYou feel a churning in your " + ballsDescriptLight() + ".  It quickly settles, leaving them feeling somewhat more dense.", false);
                    if (crit > 1) MainScreen.text("  A bit of milky pre dribbles from your " + multiCockDescriptLight() + ", pushed out by the change.", false);
                    dynStats("lib", 1);
                }
                changes++;
            }
        }
        //Fail-safe
        if (changes == 0) {
            MainScreen.text("\n\nYour groin tingles, making it feel as if you haven't cum in a long time.", false);
            player.hoursSinceCum += 100;
            changes++;
        }
        if (player.lowerBody.balls > 0 && Utils.rand(3) == 0) {
            MainScreen.text(player.modFem(12, 5), false);
        }
    }



    public hairDye(color: string, player: Player): void {
        if (player.hairColor.indexOf("rubbery") != -1 || player.hairColor.indexOf("latex-textured") != -1) {
            MainScreen.text("You massage the dye into your " + hairDescript() + " but the dye cannot penetrate the impermeable material your hair is composed of.", true);
            return;
        }
        if (player.hairLength == 0) {
            MainScreen.text("You rub the dye into your bald head, but it has no effect.", true);
            return;
        }
        MainScreen.text("You rub the dye into your " + hairDescript() + ", then use a bucket of cool lakewater to rinse clean a few minutes later.  ", true);
        player.hairColor = color;
        MainScreen.text("You now have " + hairDescript() + ".", false);
        if (player.lust > 50) {
            MainScreen.text("\n\nThe cool water calms your urges somewhat, letting you think more clearly.", false);
            dynStats("lus", -15);
        }
    }

    public purePearl(player: Player): void {
        MainScreen.text("You cram the pearl in your mouth and swallow it like a giant pill with some difficulty.  Surprisingly there is no discomfort, only a cool calming sensation that springs up from your core.", true);
        dynStats("lib", -5, "lus", -25, "cor", -10);
        if (!player.perks.has("PurityBlessing")) player.createPerk(PerkLib.PurityBlessing, 0, 0, 0, 0);
    }

    public lactaid(player: Player): void {
        player.slimeFeed();
        let i: number = 0;
        MainScreen.text("You gulp down the bottle of lactaid, easily swallowing the creamy liquid.", true);
        //Bump up size!
        if (player.averageBreastSize() < 8) {
            MainScreen.text("\n\n", false);
            if (player.upperBody.chest.count() == 1) player.growTits((1 + Utils.rand(5)), 1, true, 1);
            else player.growTits(1 + Utils.rand(2), player.upperBody.chest.count(), true, 1);
        }
        //Player doesn't lactate
        if (player.biggestLactation() < 1) {
            MainScreen.text("\n\n", false);
            MainScreen.text("You feel your " + nippleDescript(0) + "s become tight and engorged.  A single droplet of milk escapes each, rolling down the curves of your breasts.  <b>You are now lactating!</b>", false);
            for (i = 0; i < player.upperBody.chest.count(); i++) {
                player.upperBody.chest.list[i].lactationMultiplier += 2;
            }
        }
        //Boost lactation
        else {
            MainScreen.text("\n\n", false);
            MainScreen.text("Milk leaks from your " + nippleDescript(0) + "s in thick streams.  You're lactating even more!", false);
            for (i = 0; i < player.upperBody.chest.count(); i++) {
                player.upperBody.chest.list[i].lactationMultiplier += 1 + Utils.rand(10) / 10;
            }
        }
        dynStats("lus", 10);
        if (Utils.rand(3) == 0) {
            MainScreen.text(player.modFem(95, 1), false);
        }
    }

    public useMarbleMilk(player: Player): void {
        player.slimeFeed();
        //Bottle of Marble's milk - item
        //Description: "A clear bottle of milk from Marble's breasts.  It smells delicious.  "
        MainScreen.text("", true);
        //Text for when the player uses the bottle:
        //[before the player is addicted, Addiction < 30]
        if (player.statusAffects.get("Marble").value2 < 30 && player.statusAffects.get("$1").value3 == 0) MainScreen.text("You gulp down the bottle's contents; Marble makes some good tasting milk.\n\n", false);
        //[before the player is addicted, Addiction < 50]
        else if (player.statusAffects.get("$1").value3 <= 0) MainScreen.text("You gulp down the bottle's contents; Marble makes some really good tasting milk.\n\n", false);
        else if (player.statusAffects.get("$1").value3 > 0) {
            //[player is completely addicted]
            if (player.perks.has("MarblesMilk")) MainScreen.text("You gulp down the bottle's contents; it's no substitute for the real thing, but it's a nice pick me up.\n\n", false);
            else {
                //[player is no longer addicted]
                if (player.perks.has("MarbleResistant")) MainScreen.text("You gulp down the bottle's contents; you're careful not to get too attached to the taste.\n\n", false);
                //[player is addicted]
                else MainScreen.text("You gulp down the bottle's contents; you really needed that.\n\n", false);
            }
        }
        //Increases addiction by 5, up to a max of 50 before the player becomes addicted, no max after the player is addicted.
        kGAMECLASS.marbleScene.marbleStatusChange(0, 5);
        //Does not apply the 'Marble's Milk' effect
        //Purge withdrawl
        if (player.statusAffects.has("MarbleWithdrawl")) {
            player.statusAffects.remove("MarbleWithdrawl");
            dynStats("tou", 5, "int", 5);
            MainScreen.text("You no longer feel the symptoms of withdrawal.\n\n", false);
        }
        //Heals the player 70-100 health
        HPChange(70 + Utils.rand(31), true);
        //Restores a portion of fatigue (once implemented)
        kGAMECLASS.changeFatigue(-25);
        //If the player is addicted, this item negates the withdrawal effects for a few hours (suggest 6), there will need to be a check here to make sure the withdrawal effect doesn't reactivate while the player is under the effect of 'Marble's Milk'.
        if (player.statusAffects.has("BottledMilk")) {
            player.statusAffects.get("BottledMilk").value1 = (6 + Utils.rand(6));
        }
        else player.statusAffects.add(new StatusAffect("BottledMilk", 12, 0, 0, 0)));
    }

    /*Purified LaBova:
     This will be one of the items that the player will have to give Marble to purify her, but there is a limit on how much she can be purified in this way.
     Effects on the player:
     Mostly the same, but without animal transforms, corruption, and lower limits on body changes
     Hips and ass cap at half the value for LaBova
     Nipple growth caps at 1 inch
     Breasts cap at E or DD cup
     Raises lactation to a relatively low level, reduces high levels: \"Your breasts suddenly feel less full, it seems you aren't lactating at quite the level you where.\"  OR  \"The insides of your breasts suddenly feel bloated.  There is a spray of milk from them, and they settle closer to a more natural level of lactation.\"
     Does not apply the addictive quality
     If the player has the addictive quality, this item can remove that effect

     Enhanced LaBova:
     Something that the player can either make or find later; put it in whenever you want, or make your own item.  This is just a possible suggestion.  If it is given to Marble, she only gains the quad nipples.
     Effects on the player
     Mostly the same, but some of the effects can be more pronounced.  Ie, more str gain from one dose, or more breast growth.
     If the player's nipples are larger than 1 inch in length, this item is guaranteed to give them quad nipples.  This applies to all their breasts; seems like it ould be a good compromise on whether or not cowgirls should have 4 breasts.
     Very small chance to increase fertility (normally this increase would only happen when the player forces a creature to drink their milk).
     */
    public laBova(tainted: boolean, enhanced: boolean, player: Player): void {
        player.slimeFeed();
        //Changes done
        let changes: number = 0;
        //Change limit
        let changeLimit: number = 1;
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(3) == 0) changeLimit++;
        if (Utils.rand(3) == 0) changeLimit++;
        if (player.perks.has("HistoryAlchemist")) changeLimit++;
        if (enhanced) changeLimit += 2;
        //Temporary storage
        let temp: number = 0;
        let temp2: number = 0;
        let temp3: number = 0;
        //LaBova:
        //ItemDesc: "A bottle containing a misty fluid with a grainy texture, it has a long neck and a ball-like base.  The label has a stylized picture of a well endowed cowgirl nursing two guys while they jerk themselves off.  "
        //ItemUseText:
        MainScreen.text("You drink the ", true);
        if (enhanced) MainScreen.text("Pro Bova", false);
        else MainScreen.text("La Bova", false);
        MainScreen.text(".  The drink has an odd texture, but is very sweet.  It has a slight aftertaste of milk.", false);
        //Possible Item Effects:
        //STATS
        //Increase player str:
        if (changes < changeLimit && Utils.rand(3) == 0) {
            temp = 60 - player.str;
            if (temp <= 0) temp = 0;
            else {
                if (Utils.rand(2) == 0) MainScreen.text("\n\nThere is a slight pain as you feel your muscles shift somewhat.  Their appearance does not change much, but you feel much stronger.", false);
                else MainScreen.text("\n\nYou feel your muscles tighten and clench as they become slightly more pronounced.", false);
                dynStats("str", temp / 10);
                changes++;
            }
        }
        //Increase player tou:
        if (changes < changeLimit && Utils.rand(3) == 0) {
            temp = 60 - player.tou;
            if (temp <= 0) temp = 0;
            else {
                if (Utils.rand(2) == 0) MainScreen.text("\n\nYou feel your insides toughening up; it feels like you could stand up to almost any blow.", false);
                else MainScreen.text("\n\nYour bones and joints feel sore for a moment, and before long you realize they've gotten more durable.", false);
                dynStats("tou", temp / 10);
                changes++;

            }
        }
        //Decrease player spd if it is over 30:
        if (changes < changeLimit && Utils.rand(3) == 0) {
            if (player.stats.spe > 30) {
                MainScreen.text("\n\nThe body mass you've gained is making your movements more sluggish.", false);
                changes++;
                temp = (player.stats.spe - 30) / 10;
                dynStats("spe", -temp);
            }
        }
        //Increase Corr, up to a max of 50.
        if (tainted) {
            temp = 50 - player.stats.cor;
            if (temp < 0) temp = 0;
            dynStats("cor", temp / 10);
        }
        //Sex bits - Duderiffic
        if (player.lowerBody.cockSpot.count() > 0 && Utils.rand(2) == 0 && !flags[FlagEnum.HYPER_HAPPY]) {
            //If the player has at least one dick, decrease the size of each slightly,
            MainScreen.text("\n\n", false);
            temp = 0;
            temp2 = player.lowerBody.cockSpot.count();
            temp3 = 0;
            //Find biggest cock
            while (temp2 > 0) {
                temp2--;
                if (player.lowerBody.cockSpot.list[temp].cockLength <= player.lowerBody.cockSpot.list[temp2].cockLength) temp = temp2;
            }
            //Shrink said cock
            if (player.lowerBody.cockSpot.list[temp].cockLength < 6 && player.lowerBody.cockSpot.list[temp].cockLength >= 2.9) {
                player.lowerBody.cockSpot.list[temp].cockLength -= .5;
                temp3 -= .5;
            }
            temp3 += player.increaseCock(temp, (Utils.rand(3) + 1) * -1);
            player.lengthChange(temp3, 1);
            if (player.lowerBody.cockSpot.list[temp].cockLength < 2) {
                MainScreen.text("  ", false);
                if (player.lowerBody.cockSpot.count() == 1 && !player.lowerBody.vaginaSpot.hasVagina()) {
                    MainScreen.text("Your " + cockDescript(0) + " suddenly starts tingling.  It's a familiar feeling, similar to an orgasm.  However, this one seems to start from the top down, instead of gushing up from your loins.  You spend a few seconds frozen to the odd sensation, when it suddenly feels as though your own body starts sucking on the base of your shaft.  Almost instantly, your cock sinks into your crotch with a wet slurp.  The tip gets stuck on the front of your body on the way down, but your glans soon loses all volume to turn into a shiny new clit.", false);
                    if (player.lowerBody.balls > 0) MainScreen.text("  At the same time, your " + ballsDescriptLight() + " fall victim to the same sensation; eagerly swallowed whole by your crotch.", false);
                    MainScreen.text("  Curious, you touch around down there, to find you don't have any exterior organs left.  All of it got swallowed into the gash you now have running between two fleshy folds, like sensitive lips.  It suddenly occurs to you; <b>you now have a vagina!</b>", false);
                    player.lowerBody.balls = 0;
                    player.lowerBody.ballSize = 1;
                    player.createVagina();
                    player.lowerBody.vaginaSpot.list[0].clitLength = .25;
                    player.lowerBody.cockSpot.remove(0, 1);
                }
                else {
                    player.killCocks(1);
                    player.genderCheck();
                }
            }
            //if the last of the player's dicks are eliminated this way, they gain a virgin vagina;
            if (player.lowerBody.cockSpot.count() == 0 && !player.lowerBody.vaginaSpot.hasVagina()) {
                player.createVagina();
                player.vaginas[0].vaginalLooseness = VAGINA_LOOSENESS.TIGHT;
                player.vaginas[0].vaginalWetness = VAGINA_WETNESS.NORMAL;
                player.vaginas[0].virgin = true;
                player.lowerBody.vaginaSpot.list[0].clitLength = .25;
                MainScreen.text("\n\nAn itching starts in your crotch and spreads vertically.  You reach down and discover an opening.  You have grown a <b>new " + vaginaDescript(0) + "</b>!", false);

                changes++;
                player.genderCheck();
                dynStats("lus", 10);
            }
        }
        //Sex bits - girly
        let boobsGrew: boolean = false;
        //Increase player's breast size, if they are HH or bigger
        //do not increase size, but do the other actions:
        if (((tainted && player.upperBody.chest.BreastRatingLargest[0].breastRating <= 11) || (!tainted && player.upperBody.chest.BreastRatingLargest[0].breastRating <= 5)) && changes < changeLimit && (Utils.rand(3) == 0 || enhanced)) {
            if (Utils.rand(2) == 0) MainScreen.text("\n\nYour " + breastDescript(0) + " tingle for a moment before becoming larger.", false);
            else MainScreen.text("\n\nYou feel a little weight added to your chest as your " + breastDescript(0) + " seem to inflate and settle in a larger size.", false);
            player.growTits(1 + Utils.rand(3), 1, false, 3);
            changes++;
            dynStats("sen", .5);
            boobsGrew = true;
        }
        //-Remove feathery hair (copy for equinum, canine peppers, Labova)
        if (changes < changeLimit && player.upperBody.head.hairType == 1 && Utils.rand(4) == 0) {
            //(long):
            if (player.hairLength >= 6) MainScreen.text("\n\nA lock of your downy-soft feather-hair droops over your eye.  Before you can blow the offending down away, you realize the feather is collapsing in on itself.  It continues to curl inward until all that remains is a normal stUtils.rand of hair.  <b>Your hair is no longer feathery!</b>", false);
            //(short)
            else MainScreen.text("\n\nYou run your fingers through your downy-soft feather-hair while you await the effects of the item you just ingested.  While your hand is up there, it detects a change in the texture of your feathers.  They're completely disappearing, merging down into stUtils.rands of regular hair.  <b>Your hair is no longer feathery!</b>", false);
            changes++;
            player.upperBody.head.hairType = 0;
        }
        //If breasts are D or bigger and are not lactating, they also start lactating:
        if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 4 && player.upperBody.chest.list[0].lactationMultiplier < 1 && changes < changeLimit && (Utils.rand(3) == 0 || boobsGrew || enhanced)) {
            MainScreen.text("\n\nYou gasp as your " + breastDescript(0) + " feel like they are filling up with something.  Within moments, a drop of milk leaks from your " + breastDescript(0) + "; <b> you are now lactating</b>.", false);
            player.upperBody.chest.list[0].lactationMultiplier = 1.25;
            changes++;
            dynStats("sen", .5);
        }
        //Quad nipples and other 'special enhanced things.
        if (enhanced) {
            //QUAD DAMAGE!
            if (player.upperBody.chest.list[0].nipplesPerBreast == 1) {
                changes++;
                player.upperBody.chest.list[0].nipplesPerBreast = 4;
                MainScreen.text("\n\nYour " + nippleDescript(0) + "s tingle and itch.  You pull back your " + player.armorName + " and watch in shock as they split into four distinct nipples!  <b>You now have four nipples on each side of your chest!</b>", false);
                if (player.upperBody.chest.count() >= 2 && player.upperBody.chest.list[1].nipplesPerBreast == 1) {
                    MainScreen.text("A moment later your second row of " + breastDescript(1) + " does the same.  <b>You have sixteen nipples now!</b>", false);
                    player.upperBody.chest.list[1].nipplesPerBreast = 4;
                }
                if (player.upperBody.chest.count() >= 3 && player.upperBody.chest.list[2].nipplesPerBreast == 1) {
                    MainScreen.text("Finally, your ");
                    if (player.bRows() == 3) MainScreen.text("third row of " + breastDescript(2) + " mutates along with its sisters, sprouting into a wonderland of nipples.", false);
                    else if (player.bRows() >= 4) {
                        MainScreen.text("everything from the third row down mutates, sprouting into a wonderland of nipples.", false);
                        player.upperBody.chest.list[3].nipplesPerBreast = 4;
                        if (player.bRows() >= 5) player.upperBody.chest.list[4].nipplesPerBreast = 4;
                        if (player.bRows() >= 6) player.upperBody.chest.list[5].nipplesPerBreast = 4;
                        if (player.bRows() >= 7) player.upperBody.chest.list[6].nipplesPerBreast = 4;
                        if (player.bRows() >= 8) player.upperBody.chest.list[7].nipplesPerBreast = 4;
                        if (player.bRows() >= 9) player.upperBody.chest.list[8].nipplesPerBreast = 4;
                    }
                    player.upperBody.chest.list[2].nipplesPerBreast = 4;
                    MainScreen.text("  <b>You have a total of " + num2Text(player.upperBody.chest.countNipples()) + " nipples.</b>");
                }
            }
            //QUAD DAMAGE IF WEIRD SHIT BROKE BEFORE
            else if (player.upperBody.chest.count() > 1 && player.upperBody.chest.list[1].nipplesPerBreast == 1) {
                if (player.upperBody.chest.list[1].nipplesPerBreast == 1) {
                    MainScreen.text("\n\nYour second row of " + breastDescript(1) + " tingle and itch.  You pull back your " + player.armorName + " and watch in shock as your " + nippleDescript(1) + " split into four distinct nipples!  <b>You now have four nipples on each breast in your second row of breasts</b>.", false);
                    player.upperBody.chest.list[1].nipplesPerBreast = 4;
                }
            }
            else if (player.upperBody.chest.count() > 2 && player.upperBody.chest.list[2].nipplesPerBreast == 1) {
                if (player.upperBody.chest.list[2].nipplesPerBreast == 1) {
                    MainScreen.text("\n\nYour third row of " + breastDescript(2) + " tingle and itch.  You pull back your " + player.armorName + " and watch in shock as your " + nippleDescript(2) + " split into four distinct nipples!  <b>You now have four nipples on each breast in your third row of breasts</b>.", false);
                    player.upperBody.chest.list[2].nipplesPerBreast = 4;
                }
            }
            else if (player.upperBody.chest.count() > 3 && player.upperBody.chest.list[3].nipplesPerBreast == 1) {
                if (player.upperBody.chest.list[3].nipplesPerBreast == 1) {
                    MainScreen.text("\n\nYour fourth row of " + breastDescript(3) + " tingle and itch.  You pull back your " + player.armorName + " and watch in shock as your " + nippleDescript(3) + " split into four distinct nipples!  <b>You now have four nipples on each breast in your fourth row of breasts</b>.", false);
                    player.upperBody.chest.list[3].nipplesPerBreast = 4;
                }
            }
            else if (player.biggestLactation() > 1) {
                if (Utils.rand(2) == 0) MainScreen.text("\n\nA wave of pleasure passes through your chest as your " + breastDescript(0) + " start leaking milk from a massive jump in production.", false);
                else MainScreen.text("\n\nSomething shifts inside your " + breastDescript(0) + " and they feel MUCH fuller and riper.  You know that you've started producing much more milk.", false);
                player.boostLactation(2.5);
                if ((player.upperBody.chest.BreastRatingLargest[0].nippleLength < 1.5 && tainted) || (!tainted && player.upperBody.chest.BreastRatingLargest[0].nippleLength < 1)) {
                    MainScreen.text("  Your " + nippleDescript(0) + "s swell up, growing larger to accommodate your increased milk flow.", false);
                    player.upperBody.chest.BreastRatingLargest[0].nippleLength += .25;
                    dynStats("sen", .5);
                }
                changes++;
            }
        }
        //If breasts are already lactating and the player is not lactating beyond a reasonable level, they start lactating more:
        else {
            if (tainted && player.upperBody.chest.list[0].lactationMultiplier > 1 && player.upperBody.chest.list[0].lactationMultiplier < 5 && changes < changeLimit && (Utils.rand(3) == 0 || enhanced)) {
                if (Utils.rand(2) == 0) MainScreen.text("\n\nA wave of pleasure passes through your chest as your " + breastDescript(0) + " start producing more milk.", false);
                else MainScreen.text("\n\nSomething shifts inside your " + breastDescript(0) + " and they feel fuller and riper.  You know that you've started producing more milk.", false);
                player.boostLactation(0.75);
                if ((player.upperBody.chest.BreastRatingLargest[0].nippleLength < 1.5 && tainted) || (!tainted && player.upperBody.chest.BreastRatingLargest[0].nippleLength < 1)) {
                    MainScreen.text("  Your " + nippleDescript(0) + "s swell up, growing larger to accommodate your increased milk flow.", false);
                    player.upperBody.chest.BreastRatingLargest[0].nippleLength += .25;
                    dynStats("sen", .5);
                }
                changes++;
            }
            if (!tainted) {
                if (player.upperBody.chest.list[0].lactationMultiplier > 1 && player.upperBody.chest.list[0].lactationMultiplier < 3.2 && changes < changeLimit && Utils.rand(3) == 0) {
                    if (Utils.rand(2) == 0) MainScreen.text("\n\nA wave of pleasure passes through your chest as your " + breastDescript(0) + " start producing more milk.", false);
                    else MainScreen.text("\n\nSomething shifts inside your " + breastDescript(0) + " and they feel fuller and riper.  You know that you've started producing more milk.", false);
                    player.boostLactation(0.75);
                    if ((player.upperBody.chest.BreastRatingLargest[0].nippleLength < 1.5 && tainted) || (!tainted && player.upperBody.chest.BreastRatingLargest[0].nippleLength < 1)) {
                        MainScreen.text("  Your " + nippleDescript(0) + "s swell up, growing larger to accommodate your increased milk flow.", false);
                        player.upperBody.chest.BreastRatingLargest[0].nippleLength += .25;
                        dynStats("sen", .5);
                    }
                    changes++;
                }
                if ((player.upperBody.chest.list[0].lactationMultiplier > 2 && player.statusAffects.has("Feeder")) || player.upperBody.chest.list[0].lactationMultiplier > 5) {
                    if (Utils.rand(2) == 0) MainScreen.text("\n\nYour breasts suddenly feel less full, it seems you aren't lactating at quite the level you were.", false);
                    else MainScreen.text("\n\nThe insides of your breasts suddenly feel bloated.  There is a spray of milk from them, and they settle closer to a more natural level of lactation.", false);
                    changes++;
                    dynStats("sen", .5);
                    player.boostLactation(-1);
                }
            }
        }
        //If breasts are lactating at a fair level
        //and the player has not received this status,
        //apply an effect where the player really wants
        //to give their milk to other creatures
        //(capable of getting them addicted):
        if (player.findStatusAffect(StatusAffects.Feeder) < 0 && player.biggestLactation() >= 3 && Utils.rand(2) == 0 && player.upperBody.chest.BreastRatingLargest[0].breastRating >= 5 && player.stats.cor >= 35) {
            MainScreen.text("\n\nYou start to feel a strange desire to give your milk to other creatures.  For some reason, you know it will be very satisfying.\n\n<b>(You have gained the 'Feeder' perk!)</b>", false);
            player.statusAffects.add(new StatusAffect("Feeder", 0, 0, 0, 0)));
            player.createPerk(PerkLib.Feeder, 0, 0, 0, 0);
            changes++;
        }
        //UNFINISHED
        //If player has addictive quality and drinks pure version, removes addictive quality.
        //if the player has a vagina and it is tight, it loosens.
        if (player.lowerBody.vaginaSpot.hasVagina()) {
            if (player.vaginas[0].vaginalLooseness < VAGINA_LOOSENESS.LOOSE && changes < changeLimit && Utils.rand(2) == 0) {
                MainScreen.text("\n\nYou feel a relaxing sensation in your groin.  On further inspection you discover your " + vaginaDescript(0) + " has somehow relaxed, permanently loosening.", false);
                player.vaginas[0].vaginalLooseness++;
                //Cunt Stretched used to determine how long since last enlargement
                if (player.findStatusAffect(StatusAffects.CuntStretched) < 0) player.statusAffects.add(new StatusAffect("CuntStretched", 0, 0, 0, 0)));
                //Reset the timer on it to 0 when restretched.
                else player.changeStatusValue(StatusAffects.CuntStretched, 1, 0);
                player.vaginas[0].vaginalLooseness++;
                changes++;
                dynStats("lus", 10);
            }
        }
        //General Appearance (Tail -> Ears -> Paws(fur stripper) -> Face -> Horns
        //Give the player a bovine tail, same as the minotaur
        if (tainted && player.tailType != TAIL.COW && changes < changeLimit && Utils.rand(3) == 0) {
            if (player.tailType == TAIL.NONE) MainScreen.text("\n\nYou feel the flesh above your " + buttDescript() + " knotting and growing.  It twists and writhes around itself before flopping straight down, now shaped into a distinctly bovine form.  You have a <b>cow tail</b>.", false);
            else {
                if (player.tailType < TAIL.SPIDER_ADBOMEN || player.tailType > TAIL.BEE_ABDOMEN) {
                    MainScreen.text("\n\nYour tail bunches uncomfortably, twisting and writhing around itself before flopping straight down, now shaped into a distinctly bovine form.  You have a <b>cow tail</b>.", false);
                }
                //insect
                if (player.tailType == TAIL.SPIDER_ADBOMEN || player.tailType == TAIL.BEE_ABDOMEN) {
                    MainScreen.text("\n\nYour insect-like abdomen tingles pleasantly as it begins shrinking and softening, chitin morphing and reshaping until it looks exactly like a <b>cow tail</b>.", false);
                }
            }
            player.tailType = TAIL.COW;
            changes++;
        }
        //Give the player bovine ears, same as the minotaur
        if (tainted && player.upperBody.head.earType != EARS.COW && changes < changeLimit && Utils.rand(4) == 0 && player.tailType == TAIL.COW) {
            MainScreen.text("\n\nYou feel your ears tug on your scalp as they twist shape, becoming oblong and cow-like.  <b>You now have cow ears.</b>", false);
            player.upperBody.head.earType = EARS.COW;
            changes++;
        }
        //If the player is under 7 feet in height, increase their height, similar to the minotaur
        if (((enhanced && player.tallness < 96) || player.tallness < 84) && changes < changeLimit && Utils.rand(2) == 0) {
            temp = Utils.rand(5) + 3;
            //Slow rate of growth near ceiling
            if (player.tallness > 74) temp = Math.floor(temp / 2);
            //Never 0
            if (temp == 0) temp = 1;
            //Flavor texts.  Flavored like 1950's cigarettes. Yum.
            if (temp < 5) MainScreen.text("\n\nYou shift uncomfortably as you realize you feel off balance.  Gazing down, you realize you have grown SLIGHTLY taller.", false);
            if (temp >= 5 && temp < 7) MainScreen.text("\n\nYou feel dizzy and slightly off, but quickly realize it's due to a sudden increase in height.", false);
            if (temp == 7) MainScreen.text("\n\nStaggering forwards, you clutch at your head dizzily.  You spend a moment getting your balance, and stand up, feeling noticeably taller.", false);
            player.tallness += temp;
            changes++;
        }
        //Give the player hoofs, if the player already has hoofs STRIP FUR
        if (tainted && player.lowerBody != LOWER_BODY.HOOFED && player.upperBody.head.earType == EARS.COW) {
            if (changes < changeLimit && Utils.rand(3) == 0) {
                changes++;
                if (player.lowerBody == LOWER_BODY.HUMAN) MainScreen.text("\n\nYou stagger as your feet change, curling up into painful angry lumps of flesh.  They get tighter and tighter, harder and harder, until at last they solidify into hooves!", false);
                if (player.lowerBody == LOWER_BODY.DOG) MainScreen.text("\n\nYou stagger as your paws change, curling up into painful angry lumps of flesh.  They get tighter and tighter, harder and harder, until at last they solidify into hooves!", false);
                if (player.lowerBody == LOWER_BODY.NAGA) MainScreen.text("\n\nYou collapse as your sinuous snake-tail tears in half, shifting into legs.  The pain is immense, particularly in your new feet as they curl inward and transform into hooves!", false);
                //Catch-all
                if (player.lowerBody > LOWER_BODY.NAGA) MainScreen.text("\n\nYou stagger as your " + player.feet() + " change, curling up into painful angry lumps of flesh.  They get tighter and tighter, harder and harder, until at last they solidify into hooves!", false);
                MainScreen.text("  A coat of beastial fur springs up below your waist, itching as it fills in.<b>  You now have hooves in place of your feet!</b>", false);
                player.lowerBody = LOWER_BODY.HOOFED;
                dynStats("cor", 0);
                changes++;
            }
        }
        //If the player's face is non-human, they gain a human face
        if (!enhanced && player.lowerBody == LOWER_BODY.HOOFED && player.faceType != FACE.HUMAN && changes < changeLimit && Utils.rand(4) == 0) {
            //Remove face before fur!
            MainScreen.text("\n\nYour visage twists painfully, returning to a normal human shape.  <b>Your face is human again!</b>", false);
            player.faceType = FACE.HUMAN;
            changes++;
        }
        //enhanced get shitty fur
        if (enhanced && (player.skinDesc != "fur" || player.hairColor != "black and white spotted")) {
            if (player.skinDesc != "fur") MainScreen.text("\n\nYour " + player.skinDesc + " itches intensely.  You scratch and scratch, but it doesn't bring any relief.  Fur erupts between your fingers, and you watch open-mouthed as it fills in over your whole body.  The fur is patterned in black and white, like that of a cow.  The color of it even spreads to your hair!  <b>You have cow fur!</b>", false);
            else MainScreen.text("\n\nA ripple spreads through your fur as some patches darken and others lighten.  After a few moments you're left with a black and white spotted pattern that goes the whole way up to the hair on your head!  <b>You've got cow fur!</b>", false);
            player.skinDesc = "fur";
            player.skinAdj = "";
            player.skinType = SKIN.FUR;
            player.hairColor = "black and white spotted";

        }
        //if enhanced to probova give a shitty cow face
        else if (enhanced && player.faceType != FACE.COW_MINOTAUR) {
            MainScreen.text("\n\nYour visage twists painfully, warping and crackling as your bones are molded into a new shape.  Once it finishes, you reach up to touch it, and you discover that <b>your face is like that of a cow!</b>", false);
            player.faceType = FACE.COW_MINOTAUR;
            changes++;
        }
        //Give the player bovine horns, or increase their size, same as the minotaur
        //New horns or expanding mino horns
        if (tainted && changes < changeLimit && Utils.rand(3) == 0 && player.faceType == FACE.HUMAN) {
            //Get bigger or change horns
            if (player.hornType == HORNS.COW_MINOTAUR || player.hornType == HORNS.NONE) {
                //Get bigger if player has horns
                if (player.hornType == HORNS.COW_MINOTAUR) {
                    if (player.horns < 5) {
                        //Fems horns don't get bigger.
                        MainScreen.text("\n\nYour small horns get a bit bigger, stopping as medium sized nubs.", false);
                        player.horns += 1 + Utils.rand(2);
                        changes++;
                    }
                }
                //If no horns yet..
                if (player.hornType == HORNS.NONE || player.horns == 0) {
                    MainScreen.text("\n\nWith painful pressure, the skin on your forehead splits around two tiny nub-like horns, similar to those you would see on the cattle back in your homeland.", false);
                    player.hornType = HORNS.COW_MINOTAUR;
                    player.horns = 1;
                    changes++;
                }
                //TF other horns
                if (player.hornType != HORNS.NONE && player.hornType != HORNS.COW_MINOTAUR && player.horns > 0) {
                    MainScreen.text("\n\nYour horns twist, filling your skull with agonizing pain for a moment as they transform into cow-horns.", false);
                    player.hornType = HORNS.COW_MINOTAUR;
                }
            }
            //Not mino horns, change to cow-horns
            if (player.hornType == HORNS.DEMON || player.hornType > HORNS.COW_MINOTAUR) {
                MainScreen.text("\n\nYour horns vibrate and shift as if made of clay, reforming into two small bovine nubs.", false);
                player.hornType = HORNS.COW_MINOTAUR;
                player.horns = 2;
                changes++;
            }
        }
        //Increase the size of the player's hips, if they are not already childbearing or larger
        if (Utils.rand(2) == 0 && player.lowerBody.hipRating < 15 && changes < changeLimit) {
            if (!tainted && player.lowerBody.hipRating < 8 || tainted) {
                MainScreen.text("\n\nYou stumble as you feel the bones in your hips grinding, expanding your hips noticeably.", false);
                player.lowerBody.hipRating += 1 + Utils.rand(4);
                changes++;
            }
        }
        if (Utils.rand(4) == 0 && player.upperBody.gills && changes < changeLimit) {
            MainScreen.text("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.", false);
            player.upperBody.gills = false;
            changes++;
        }
        //Increase the size of the player's ass (less likely then hips), if it is not already somewhat big
        if (Utils.rand(2) == 0 && player.lowerBody.butt.buttRating < 13 && changes < changeLimit) {
            if (!tainted && player.lowerBody.butt.buttRating < 8 || tainted) {
                MainScreen.text("\n\nA sensation of being unbalanced makes it difficult to walk.  You pause, paying careful attention to your new center of gravity before understanding dawns on you - your ass has grown!", false);
                player.lowerBody.butt.buttRating += 1 + Utils.rand(2);
                changes++;
            }
        }
        //Nipples Turn Back:
        if (player.statusAffects.has("BlackNipples") && changes < changeLimit && Utils.rand(3) == 0) {
            MainScreen.text("\n\nSomething invisible brushes against your " + nippleDescript(0) + ", making you twitch.  Undoing your clothes, you take a look at your chest and find that your nipples have turned back to their natural flesh colour.");
            changes++;
            player.statusAffects.remove("BlackNipples");
        }
        //Debugcunt
        if (changes < changeLimit && Utils.rand(3) == 0 && player.vaginaType() == 5 && player.lowerBody.vaginaSpot.hasVagina()) {
            MainScreen.text("\n\nSomething invisible brushes against your sex, making you twinge.  Undoing your clothes, you take a look at your vagina and find that it has turned back to its natural flesh colour.");
            player.vaginaType(0);
            changes++;
        }
        if (Utils.rand(3) == 0) MainScreen.text(player.modFem(79, 3), false);
        if (Utils.rand(3) == 0) MainScreen.text(player.modThickness(70, 4), false);
        if (Utils.rand(5) == 0) MainScreen.text(player.modTone(10, 5), false);
    }


    public blackSpellbook(player: Player): void {
        MainScreen.text("You open the small black book, and discover it to be an instructional book on the use of black magic.  Most of it is filled with generic information about black magic - how it is drawn from emotions (typically lust), and how it has the power to affect bodies and emotions.  It also warns against using it on oneself, as it is difficult to draw on your emotions while meddling with your own body.  In no time at all you've read the whole thing, but it disappears into thin air before you can put it away.", true);
        if (player.stats.int < 30) {
            MainScreen.text("\n\nYou feel greatly enlightened by your time spent reading.", false);
            dynStats("int", 4);
        }
        else if (player.stats.int < 60) {
            MainScreen.text("\n\nSpending some time reading was probably good for you, and you definitely feel smarter for it.", false);
            dynStats("int", 2);
        }
        else if (player.stats.int < 80) {
            MainScreen.text("\n\nAfter reading the small tome your already quick mind feels invigorated.", false);
            dynStats("int", 1);
        }
        else {
            MainScreen.text("\n\nThe contents of the book did little for your already considerable intellect.", false);
            dynStats("int", .6);
        }
        //Smart enough for arouse and doesnt have it
        if (player.stats.int >= 25 && player.findStatusAffect(StatusAffects.KnowsArouse) < 0) {
            MainScreen.text("\n\nYou blink in surprise, assaulted by the knowledge of a <b>new spell: Arouse.</b>", false);
            player.statusAffects.add(new StatusAffect("KnowsArouse", 0, 0, 0, 0)));
            return;
        }
        //Smart enough for arouse and doesnt have it
        if (player.stats.int >= 30 && player.findStatusAffect(StatusAffects.KnowsHeal) < 0) {
            MainScreen.text("\n\nYou blink in surprise, assaulted by the knowledge of a <b>new spell: Heal.</b>", false);
            player.statusAffects.add(new StatusAffect("KnowsHeal", 0, 0, 0, 0)));
            return;
        }
        //Smart enough for arouse and doesnt have it
        if (player.stats.int >= 40 && player.findStatusAffect(StatusAffects.KnowsMight) < 0) {
            MainScreen.text("\n\nYou blink in surprise, assaulted by the knowledge of a <b>new spell: Might.</b>", false);
            player.statusAffects.add(new StatusAffect("KnowsMight", 0, 0, 0, 0)));
        }
    }

    public whiteSpellbook(player: Player): void {
        MainScreen.text("You open the white tome, and discover it to be an instructional book on the use of white magic.  Most of it is filled with generic information about white magic - how it is drawn for mental focus, is difficult to use when tired or aroused, and can be used to create and control energy.  In no time at all you've read the whole thing, but it disappears into thin air before you can put it away.", true);
        if (player.stats.int < 30) {
            MainScreen.text("\n\nYou feel greatly enlightened by your time spent reading.", false);
            dynStats("int", 4);
        }
        else if (player.stats.int < 60) {
            MainScreen.text("\n\nSpending some time reading was probably good for you, and you definitely feel smarter for it.", false);
            dynStats("int", 2);
        }
        else if (player.stats.int < 80) {
            MainScreen.text("\n\nAfter reading the small tome your already quick mind feels invigorated.", false);
            dynStats("int", 1);
        }
        else {
            MainScreen.text("\n\nThe contents of the book did little for your already considerable intellect.", false);
            dynStats("int", .6);
        }
        //Smart enough for arouse and doesnt have it
        if (player.stats.int >= 25 && player.findStatusAffect(StatusAffects.KnowsCharge) < 0) {
            MainScreen.text("\n\nYou blink in surprise, assaulted by the knowledge of a <b>new spell: Charge Weapon.</b>", false);
            player.statusAffects.add(new StatusAffect("KnowsCharge", 0, 0, 0, 0)));
            return;
        }
        //Smart enough for arouse and doesnt have it
        if (player.stats.int >= 30 && player.findStatusAffect(StatusAffects.KnowsBlind) < 0) {
            MainScreen.text("\n\nYou blink in surprise, assaulted by the knowledge of a <b>new spell: Blind.</b>", false);
            player.statusAffects.add(new StatusAffect("KnowsBlind", 0, 0, 0, 0)));
            return;
        }
        //Smart enough for arouse and doesnt have it
        if (player.stats.int >= 40 && player.findStatusAffect(StatusAffects.KnowsWhitefire) < 0) {
            MainScreen.text("\n\nYou blink in surprise, assaulted by the knowledge of a <b>new spell: Whitefire.</b>", false);
            player.statusAffects.add(new StatusAffect("KnowsWhitefire", 0, 0, 0, 0)));
        }
    }

    public lustDraft(fuck: boolean, player: Player): void {
        player.slimeFeed();
        MainScreen.text("You drink the ", true);
        if (fuck) MainScreen.text("red", false);
        else MainScreen.text("pink", false);
        MainScreen.text(" potion, and its unnatural warmth immediately flows to your groin.", false);
        dynStats("lus", (30 + Utils.rand(player.stats.lib / 10)), "resisted", false);

        //Heat/Rut for those that can have them if "fuck draft"
        if (fuck) {
            //Try to go into intense heat.
            player.goIntoHeat(true, 2);
            //Males go into rut
            player.goIntoRut(true);
        }
        //ORGAZMO
        if (player.lust >= 100 && !kGAMECLASS.inCombat) {
            MainScreen.text("\n\nThe arousal from the potion overwhelms your senses and causes you to spontaneously orgasm.  You rip off your " + player.armorName + " and look down as your ", false);
            if (player.lowerBody.cockSpot.count() > 0) {
                MainScreen.text(multiCockDescriptLight() + " erupts in front of you, liberally spraying the ground around you.  ", false);
            }
            if (player.lowerBody.cockSpot.count() > 0 && player.lowerBody.vaginaSpot.count() > 0) {
                MainScreen.text("At the same time your ", false);
            }
            if (player.lowerBody.vaginaSpot.count() > 0) {
                MainScreen.text(vaginaDescript(0) + " soaks your thighs.  ", false);
            }
            if (player.gender == 0) MainScreen.text("body begins to quiver with orgasmic bliss.  ", false);
            MainScreen.text("Once you've had a chance to calm down, you notice that the explosion of pleasure you just experienced has rocked you to your core.  You are a little hornier than you were before.", false);
            //increase player libido, and maybe sensitivity too?
            player.orgasm();
            dynStats("lib", 2, "sen", 1);
        }
        if (player.lust > 100) player.lust = 100;
        MainScreen.text("\n\n", false);
    }

    public goblinAle(player: Player): void {
        player.slimeFeed();
        let changes: number = 0;
        let changeLimit: number = 1;
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(3) == 0) changeLimit++;
        if (Utils.rand(4) == 0) changeLimit++;
        if (Utils.rand(5) == 0) changeLimit++;
        if (player.perks.has("HistoryAlchemist")) changeLimit++;
        MainScreen.text("You drink the ale, finding it to have a remarkably smooth yet potent taste.  You lick your lips and sneeze, feeling slightly tipsy.", true);
        dynStats("lus", 15);
        //Stronger
        if (player.str > 50) {
            dynStats("str", -1);
            if (player.str > 70) dynStats("str", -1);
            if (player.str > 90) dynStats("str", -2);
            MainScreen.text("\n\nYou feel a little weaker, but maybe it's just the alcohol.", false);
        }
        ///Less tough
        if (player.tou > 50) {
            MainScreen.text("\n\nGiggling, you poke yourself, which only makes you giggle harder when you realize how much softer you feel.", false);
            dynStats("tou", -1);
            if (player.tou > 70) dynStats("tou", -1);
            if (player.tou > 90) dynStats("tou", -2);
        }
        //antianemone corollary:
        if (changes < changeLimit && player.upperBody.head.hairType == 4 && Utils.rand(2) == 0) {
            //-insert anemone hair removal into them under whatever criteria you like, though hair removal should precede abdomen growth; here's some sample text:
            MainScreen.text("\n\nAs you down the potent ale, your head begins to feel heavier - and not just from the alcohol!  Reaching up, you notice your tentacles becoming soft and somewhat fibrous.  Pulling one down reveals that it feels smooth, silky, and fibrous; you watch as it dissolves into many thin, hair-like stUtils.rands.  <b>Your hair is now back to normal!</b>", false);
            player.upperBody.head.hairType = 0;
            changes++;
        }
        //Shrink
        if (Utils.rand(2) == 0 && player.tallness > 48) {
            changes++;
            MainScreen.text("\n\nThe world spins, and not just from the strength of the drink!  Your viewpoint is closer to the ground.  How fun!", false);
            player.tallness -= (1 + Utils.rand(5));
        }
        //Speed boost
        if (Utils.rand(3) == 0 && player.stats.spe < 50 && changes < changeLimit) {
            dynStats("spe", 1 + Utils.rand(2));
            MainScreen.text("\n\nYou feel like dancing, and stumble as your legs react more quickly than you'd think.  Is the alcohol slowing you down or are you really faster?  You take a step and nearly faceplant as you go off balance.  It's definitely both.", false);
            changes++;
        }
        //-Remove feather-arms (copy this for goblin ale, mino blood, equinum, canine pepps, demon items)
        if (changes < changeLimit && player.armType == ARM.HARPY && Utils.rand(4) == 0) {
            MainScreen.text("\n\nYou scratch at your biceps absentmindedly, but no matter how much you scratch, it isn't getting rid of the itch.  Glancing down in irritation, you discover that your feathery arms are shedding their feathery coating.  The wing-like shape your arms once had is gone in a matter of moments, leaving " + player.skinDesc + " behind.", false);
            player.armType = ARM.HUMAN;
            changes++;
        }
        //-Remove chitin-arms (copy this for goblin ale, mino blood, equinum, canine pepps, demon items)
        if (changes < changeLimit && player.armType == ARM.SPIDER && Utils.rand(4) == 0) {
            MainScreen.text("\n\nYou scratch at your biceps absentmindedly, but no matter how much you scratch, it isn't getting rid of the itch.  Glancing down in irritation, you discover that your arms' chitinous covering is flaking away.  The glossy black coating is soon gone, leaving " + player.skinDesc + " behind.", false);
            player.armType = ARM.HUMAN;
            changes++;
        }
        //SEXYTIEMS
        //Multidick killa!
        if (player.lowerBody.cockSpot.count() > 1 && Utils.rand(3) == 0 && changes < changeLimit) {
            MainScreen.text("\n\n", false);
            player.killCocks(1);
            changes++;
        }
        //Boost vaginal capacity without gaping
        if (changes < changeLimit && Utils.rand(3) == 0 && player.lowerBody.vaginaSpot.hasVagina() && player.statusAffects.get("BonusVCapacity").value1 < 40) {
            if (player.findStatusAffect(StatusAffects.BonusVCapacity) < 0) player.statusAffects.add(new StatusAffect("BonusVCapacity", 0, 0, 0, 0)));
            player.statusAffects.get("BonusVCapacity").value1 = 5;
            MainScreen.text("\n\nThere is a sudden... emptiness within your " + vaginaDescript(0) + ".  Somehow you know you could accommodate even larger... insertions.", false);
            changes++;
        }
        //Boost fertility
        if (changes < changeLimit && Utils.rand(4) == 0 && player.fertility < 40 && player.lowerBody.vaginaSpot.hasVagina()) {
            player.fertility += 2 + Utils.rand(5);
            changes++;
            MainScreen.text("\n\nYou feel strange.  Fertile... somehow.  You don't know how else to think of it, but you're ready to be a mother.", false);
        }
        //Shrink primary dick to no longer than 12 inches
        else if (player.lowerBody.cockSpot.count() == 1 && Utils.rand(2) == 0 && changes < changeLimit && !flags[FlagEnum.HYPER_HAPPY]) {
            if (player.lowerBody.cockSpot.list[0].cockLength > 12) {
                changes++;
                let temp3: number = 0;
                MainScreen.text("\n\n", false);
                //Shrink said cock
                if (player.lowerBody.cockSpot.list[0].cockLength < 6 && player.lowerBody.cockSpot.list[0].cockLength >= 2.9) {
                    player.lowerBody.cockSpot.list[0].cockLength -= .5;
                    temp3 -= .5;
                }
                temp3 += player.increaseCock(0, (Utils.rand(3) + 1) * -1);
                player.lengthChange(temp3, 1);
            }
        }
        //GENERAL APPEARANCE STUFF BELOW
        //REMOVAL STUFF
        //Removes wings and antennaes!
        if ((player.upperBody.wingType == WING.BEE_LIKE_SMALL || player.upperBody.wingType == WING.BEE_LIKE_LARGE || player.upperBody.wingType >= WING.HARPY) && changes < changeLimit && Utils.rand(4) == 0) {
            if (player.upperBody.wingType == WING.SHARK_FIN) MainScreen.text("\n\nYour back tingles, feeling lighter.  Something lands behind you with a 'thump', and when you turn to look, you see your fin has fallen off.  This might be the best (and worst) booze you've ever had!  <b>You no longer have a fin!</b>", false);
            else MainScreen.text("\n\nYour shoulders tingle, feeling lighter.  Something lands behind you with a 'thump', and when you turn to look you see your wings have fallen off.  This might be the best (and worst) booze you've ever had!  <b>You no longer have wings!</b>", false);
            player.upperBody.wingType = WING.NONE;
            changes++;
        }
        //Removes wings and antennaes!
        if (player.antennae > ANTENNAE.NONE && changes < changeLimit && Utils.rand(3) == 0) {
            MainScreen.text("\n\nYour " + hairDescript() + " itches so you give it a scratch, only to have your antennae fall to the ground.  What a relief.  <b>You've lost your antennae!</b>", false);
            changes++;
            player.antennae = ANTENNAE.NONE;
        }
        //Remove odd eyes
        if (changes < changeLimit && Utils.rand(5) == 0 && player.eyeType > EYES.HUMAN) {
            if (player.eyeType == EYES.BLACK_EYES_SAND_TRAP) {
                MainScreen.text("\n\nYou feel a twinge in your eyes and you blink.  It feels like black cataracts have just fallen away from you, and you know without needing to see your reflection that your eyes have gone back to looking human.");
            }
            else {
                MainScreen.text("\n\nYou blink and stumble, a wave of vertigo threatening to pull your " + player.feet() + " from under you.  As you steady and open your eyes, you realize something seems different.  Your vision is changed somehow.", false);
                if (player.eyeType == EYES.FOUR_SPIDER_EYES) MainScreen.text("  Your multiple, arachnid eyes are gone!</b>", false);
                MainScreen.text("  <b>You have normal, humanoid eyes again.</b>", false);
            }
            player.eyeType = EYES.HUMAN;
            changes++;
        }
        //-Remove extra breast rows
        if (changes < changeLimit && player.bRows() > 1 && Utils.rand(3) == 0) {
            changes++;
            MainScreen.text("\n\nYou stumble back when your center of balance shifts, and though you adjust before you can fall over, you're left to watch in awe as your bottom-most " + breastDescript(player.upperBody.chest.count() - 1) + " shrink down, disappearing completely into your ", false);
            if (player.bRows() >= 3) MainScreen.text("abdomen", false);
            else MainScreen.text("chest", false);
            MainScreen.text(". The " + nippleDescript(player.upperBody.chest.count() - 1) + "s even fade until nothing but ", false);
            if (player.skinType == SKIN.FUR) MainScreen.text(player.hairColor + " " + player.skinDesc, false);
            else MainScreen.text(player.skinTone + " " + player.skinDesc, false);
            MainScreen.text(" remains. <b>You've lost a row of breasts!</b>", false);
            dynStats("sen", -5);
            player.removeBreastRow(player.upperBody.chest.count() - 1, 1);
        }
        //Skin/fur
        if (player.skinType != SKIN.PLAIN && changes < changeLimit && Utils.rand(4) == 0 && player.faceType == FACE.HUMAN) {
            if (player.skinType == SKIN.FUR) MainScreen.text("\n\nYour fur itches incessantly, so you start scratching it.  It starts coming off in big clumps before the whole mess begins sloughing off your body.  In seconds, your skin is nude.  <b>You've lost your fur!</b>", false);
            if (player.skinType == SKIN.SCALES) MainScreen.text("\n\nYour scales itch incessantly, so you scratch at them.  They start falling off wholesale, leaving you standing in a pile of scales after only a few moments.  <b>You've lost your scales!</b>", false);
            if (player.skinType > SKIN.SCALES) MainScreen.text("\n\nYour " + player.skinDesc + " itches incessantly, and as you scratch it shifts and changes, becoming normal human-like skin.  <b>Your skin is once again normal!</b>", false);
            player.skinAdj = "";
            player.skinDesc = "skin";
            player.skinType = SKIN.PLAIN;
            changes++;
        }
        //skinTone
        if (player.skinTone != "green" && player.skinTone != "grayish-blue" && player.skinTone != "dark green" && player.skinTone != "pale yellow" && changes < changeLimit && Utils.rand(2) == 0) {
            if (Utils.rand(10) != 0) player.skinTone = "dark green";
            else {
                if (Utils.rand(2) == 0) player.skinTone = "pale yellow";
                else player.skinTone = "grayish-blue";
            }
            changes++;
            MainScreen.text("\n\nWhoah, that was weird.  You just hallucinated that your ", false);
            if (player.skinType == SKIN.FUR) MainScreen.text("skin", false);
            else MainScreen.text(player.skinDesc, false);
            MainScreen.text(" turned " + player.skinTone + ".  No way!  It's staying, it really changed color!", false);
        }
        //Face!
        if (player.faceType != FACE.HUMAN && changes < changeLimit && Utils.rand(4) == 0 && player.upperBody.head.earType == EARS.ELFIN) {
            changes++;
            player.faceType = FACE.HUMAN;
            MainScreen.text("\n\nAnother violent sneeze escapes you.  It hurt!  You feel your nose and discover your face has changed back into a more normal look.  <b>You have a human looking face again!</b>", false);
        }
        //Ears!
        if (player.upperBody.head.earType != EARS.ELFIN && changes < changeLimit && Utils.rand(3) == 0) {
            MainScreen.text("\n\nA weird tingling runs through your scalp as your " + hairDescript() + " shifts slightly.  You reach up to touch and bump <b>your new pointed elfin ears</b>.  You bet they look cute!", false);
            changes++;
            player.upperBody.head.earType = EARS.ELFIN;
        }
        if (Utils.rand(4) == 0 && player.upperBody.gills && changes < changeLimit) {
            MainScreen.text("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.", false);
            player.upperBody.gills = false;
            changes++;
        }
        //Nipples Turn Back:
        if (player.statusAffects.has("BlackNipples") && changes < changeLimit && Utils.rand(3) == 0) {
            MainScreen.text("\n\nSomething invisible brushes against your " + nippleDescript(0) + ", making you twitch.  Undoing your clothes, you take a look at your chest and find that your nipples have turned back to their natural flesh colour.");
            changes++;
            player.statusAffects.remove("BlackNipples");
        }
        //Debugcunt
        if (changes < changeLimit && Utils.rand(3) == 0 && player.vaginaType() == 5 && player.lowerBody.vaginaSpot.hasVagina()) {
            MainScreen.text("\n\nSomething invisible brushes against your sex, making you twinge.  Undoing your clothes, you take a look at your vagina and find that it has turned back to its natural flesh colour.");
            player.vaginaType(0);
            changes++;
        }
        if (changes < changeLimit && Utils.rand(4) == 0 && ((player.ass.analWetness > 0 && !player.perks.has("MaraesGiftButtslut")) || player.ass.analWetness > 1)) {
            MainScreen.text("\n\nYou feel a tightening up in your colon and your [asshole] sucks into itself.  You feel sharp pain at first but that thankfully fades.  Your ass seems to have dried and tightened up.");
            player.ass.analWetness--;
            if (player.ass.analLooseness > 1) player.ass.analLooseness--;
            changes++;
        }
        if (changes < changeLimit && Utils.rand(3) == 0) {
            if (Utils.rand(2) == 0) player.modFem(85, 3);
            if (Utils.rand(2) == 0) player.modThickness(20, 3);
            if (Utils.rand(2) == 0) player.modTone(15, 5);
        }
    }

    public gooGasmic(player: Player): void {
        MainScreen.text("You take the wet cloth in hand and rub it over your body, smearing the strange slime over your " + player.skinDesc + " slowly.", true);
        //Stat changes
        //libido up to 80
        if (player.stats.lib < 80) {
            dynStats("lib", (.5 + (90 - player.stats.lib) / 10), "lus", player.stats.lib / 2);
            MainScreen.text("\n\nBlushing and feeling horny, you make sure to rub it over your chest and erect nipples, letting the strange slimy fluid soak into you.", false);
        }
        //sensitivity moves towards 50
        if (player.stats.sens < 50) {
            MainScreen.text("\n\nThe slippery slime soaks into your " + player.skinDesc + ", making it tingle with warmth, sensitive to every touch.", false);
            dynStats("sen", 1);
        }
        else if (player.stats.sens > 50) {
            MainScreen.text("\n\nThe slippery slime numbs your " + player.skinDesc + " slightly, leaving behind only gentle warmth.", false);
            dynStats("sen", -1);
        }
        /*Calculate goopiness
         let goopiness:number = 0;
         if(player.skinType == SKIN.GOO) goopiness+=2;
         if(player.hair.indexOf("gooey") != -1) goopiness++;
         if(player.lowerBody.vaginaSpot.hasVagina()) {
         if(player.vaginalCapacity() >= 9000) goopiness++;
         }*/
        //Cosmetic changes based on 'goopyness'
        //Remove wings
        if (player.upperBody.wingType > WING.NONE) {
            if (player.upperBody.wingType == WING.SHARK_FIN) MainScreen.text("\n\nYou sigh, feeling a hot wet tingling down your back.  It tickles slightly as you feel your fin slowly turn to sludge, dripping to the ground as your body becomes more goo-like.", false);
            else MainScreen.text("\n\nYou sigh, feeling a hot wet tingling down your back.  It tickles slightly as you feel your wings slowly turn to sludge, dripping to the ground as your body becomes more goo-like.", false);
            player.upperBody.wingType = WING.NONE;
            return;
        }
        //Goopy hair
        if (player.upperBody.head.hairType != 3) {
            player.upperBody.head.hairType = 3;
            //if bald
            if (player.hairLength <= 0) {
                MainScreen.text("\n\nYour head buzzes pleasantly, feeling suddenly hot and wet.  You instinctively reach up to feel the source of your wetness, and discover you've grown some kind of gooey hair.  From time to time it drips, running down your back to the crack of your " + buttDescript() + ".", false);
                player.hairLength = 5;
            }
            else {
                //if hair isnt rubbery or latexy
                if (player.hairColor.indexOf("rubbery") == -1 && player.hairColor.indexOf("latex-textured") == -1) {
                    MainScreen.text("\n\nYour head buzzes pleasantly, feeling suddenly hot and wet.  You instinctively reach up to feel the source of your wetness, and discover your hair has become a slippery, gooey mess.  From time to time it drips, running down your back to the crack of your " + buttDescript() + ".", false);
                }
                //Latexy stuff
                else {
                    MainScreen.text("\n\nYour oddly inorganic hair shifts, becoming partly molten as rivulets of liquid material roll down your back.  How strange.", false);
                }
            }
            if (player.hairColor != "green" && player.hairColor != "purple" && player.hairColor != "blue" && player.hairColor != "cerulean" && player.hairColor != "emerald") {
                MainScreen.text("  Stranger still, the hue of your semi-liquid hair changes to ");
                let blah: number = Utils.rand(10);
                if (blah <= 2) player.hairColor = "green";
                else if (blah <= 4) player.hairColor = "purple";
                else if (blah <= 6) player.hairColor = "blue";
                else if (blah <= 8) player.hairColor = "cerulean";
                else player.hairColor = "emerald";
                MainScreen.text(player.hairColor + ".");
            }
            dynStats("lus", 10);
            return;
        }
        //1.Goopy skin
        if (player.upperBody.head.hairType == 3 && (player.skinDesc != "skin" || player.skinAdj != "slimy")) {
            if (player.skinType == SKIN.PLAIN) MainScreen.text("\n\nYou sigh, feeling your " + player.armorName + " sink into you as your skin becomes less solid, gooey even.  You realize your entire body has become semi-solid and partly liquid!", false);
            else if (player.skinType == SKIN.FUR) MainScreen.text("\n\nYou sigh, suddenly feeling your fur become hot and wet.  You look down as your " + player.armorName + " sinks partway into you.  With a start you realize your fur has melted away, melding into the slime-like coating that now serves as your skin.  You've become partly liquid and incredibly gooey!", false);
            else if (player.skinType == SKIN.SCALES) MainScreen.text("\n\nYou sigh, feeling slippery wetness over your scales.  You reach to scratch it and come away with a slippery wet coating.  Your scales have transformed into a slimy goop!  Looking closer, you realize your entire body has become far more liquid in nature, and is semi-solid.  Your " + player.armorName + " has even sunk partway into you.", false);
            else if (player.skinType > SKIN.GOO) MainScreen.text("\n\nYou sigh, feeling your " + player.armorName + " sink into you as your " + player.skinDesc + " becomes less solid, gooey even.  You realize your entire body has become semi-solid and partly liquid!", false);
            player.skinType = SKIN.GOO;
            player.skinDesc = "skin";
            player.skinAdj = "slimy";
            if (player.skinTone != "green" && player.skinTone != "purple" && player.skinTone != "blue" && player.skinTone != "cerulean" && player.skinTone != "emerald") {
                MainScreen.text("  Stranger still, your skintone changes to ");
                let blaht: number = Utils.rand(10);
                if (blaht <= 2) player.skinTone = "green";
                else if (blaht <= 4) player.skinTone = "purple";
                else if (blaht <= 6) player.skinTone = "blue";
                else if (blaht <= 8) player.skinTone = "cerulean";
                else player.skinTone = "emerald";
                MainScreen.text(player.skinTone + "!");
            }
            return;
        }
        ////1a.Make alterations to dick/vaginal/nippular descriptors to match
        //DONE EXCEPT FOR TITS & MULTIDICKS (UNFINISHED KINDA)
        //2.Goo legs
        if (player.skinAdj == "slimy" && player.skinDesc == "skin" && player.lowerBody != LOWER_BODY.GOO) {
            MainScreen.text("\n\nYour viewpoint rapidly drops as everything below your " + buttDescript() + " and groin melts together into an amorphous blob.  Thankfully, you discover you can still roll about on your new slimey undercarriage, but it's still a whole new level of strange.", false);
            player.tallness -= 3 + Utils.rand(2);
            if (player.tallness < 36) {
                player.tallness = 36;
                MainScreen.text("  The goo firms up and you return to your previous height.  It would truly be hard to get any shorter than you already are!", false);
            }
            player.lowerBody = LOWER_BODY.GOO;
            return;
        }
        //3a. Grow vagina if none
        if (!player.lowerBody.vaginaSpot.hasVagina()) {
            MainScreen.text("\n\nA wet warmth spreads through your slimey groin as a narrow gash appears on the surface of your groin.  <b>You have grown a vagina.</b>", false);
            player.createVagina();
            player.vaginas[0].vaginalWetness = VAGINA_WETNESS.DROOLING;
            player.vaginas[0].vaginalLooseness = VAGINA_LOOSENESS.GAPING;
            player.lowerBody.vaginaSpot.list[0].clitLength = .4;
            player.genderCheck();
            return;

        }
        //3b.Infinite Vagina
        if (player.vaginalCapacity() < 9000) {
            if (player.findStatusAffect(StatusAffects.BonusVCapacity) < 0) player.statusAffects.add(new StatusAffect("BonusVCapacity", 9000, 0, 0, 0)));
            else player.statusAffects.get("BonusVCapacity").value1 = 9000;
            MainScreen.text("\n\nYour " + vaginaDescript(0) + "'s internal walls feel a tingly wave of strange tightness.  Experimentally, you slip a few fingers, then your hand, then most of your forearm inside yourself.  <b>It seems you're now able to accommodate just about ANYTHING inside your sex.</b>", false);
            return;
        }
        else if (player.tallness < 100 && Utils.rand(3) <= 1) {
            MainScreen.text("\n\nYour gel-like body swells up from the intake of additional slime.  If you had to guess, you'd bet you were about two inches taller.", false);
            player.tallness += 2;
            dynStats("str", 1, "tou", 1);
        }
        //Big slime girl
        else {
            if (player.findStatusAffect(StatusAffects.SlimeCraving) < 0) {
                MainScreen.text("\n\nYou feel a growing gnawing in your gut.  You feel... hungry, but not for food.  No, you need something wet and goopy pumped into you.  You NEED it.  You can feel it in your bones.  <b>If you don't feed that need... you'll get weaker and maybe die.</b>", false);
                player.statusAffects.add(new StatusAffect("SlimeCraving", 0, 0, 0, 1))); //Value four indicates this tracks strength and speed separately
            }
            else {
                MainScreen.text("\n\nYou feel full for a moment, but you know it's just a temporary respite from your constant need to be 'injected' with fluid.", false);
                player.changeStatusValue(StatusAffects.SlimeCraving, 1, 0);
            }
        }
        if (Utils.rand(2) == 0) MainScreen.text(player.modFem(85, 3), false);
        if (Utils.rand(2) == 0) MainScreen.text(player.modThickness(20, 3), false);
        if (Utils.rand(2) == 0) MainScreen.text(player.modTone(15, 5), false);
    }


    public sharkTooth(type: number, player: Player): void {
        let changes: number = 0;
        let changeLimit: number = 2;
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(2) == 0) changeLimit++;
        if (player.perks.has("HistoryAlchemist")) changeLimit++;
        if (type == 0) MainScreen.text("You have no idea why, but you decide to eat the pointed tooth. To your surprise, it's actually quite brittle, turning into a fishy-tasting dust. You figure it must just be a tablet made to look like a shark's tooth.", true);
        else if (type == 1) MainScreen.text("You have no idea why, but you decide to eat the pointed, glowing tooth. To your surprise, it's actually quite brittle, crumbling into a fishy-tasting dust. Maybe it's just a tablet made to look like a shark's tooth.", true);
        //STATS
        //Increase strength 1-2 points (Up to 50) (60 for tiger)
        if (((player.str < 60 && type == 1) || player.str < 50) && Utils.rand(3) == 0) {
            dynStats("str", 1 + Utils.rand(2));
            MainScreen.text("\n\nA painful ripple passes through the muscles of your body.  It takes you a few moments, but you quickly realize you're a little bit stronger now.", false);
            changes++;
        }
        //Increase Speed 1-3 points (Up to 75) (100 for tigers)
        if (((player.stats.spe < 100 && type == 1) || player.stats.spe < 75) && Utils.rand(3) == 0) {
            dynStats("spe", 1 + Utils.rand(3));
            changes++;
            MainScreen.text("\n\nShivering without warning, you nearly trip over yourself as you walk.  A few tries later you realize your muscles have become faster.", false);
        }
        //Reduce sensitivity 1-3 Points (Down to 25 points)
        if (player.stats.sens > 25 && Utils.rand(1.5) == 0 && changes < changeLimit) {
            dynStats("sen", (-1 - Utils.rand(3)));
            changes++;
            MainScreen.text("\n\nIt takes a while, but you eventually realize your body has become less sensitive.", false);
        }
        //Increase Libido 2-4 points (Up to 75 points) (100 for tigers)
        if (((player.stats.lib < 100 && type == 1) || player.stats.lib < 75) && Utils.rand(3) == 0 && changes < changeLimit) {
            dynStats("lib", (1 + Utils.rand(3)));
            changes++;
            MainScreen.text("\n\nA blush of red works its way across your skin as your sex drive kicks up a notch.", false);
        }
        //Decrease intellect 1-3 points (Down to 40 points)
        if (player.stats.int > 40 && Utils.rand(3) == 0 && changes < changeLimit) {
            dynStats("int", -(1 + Utils.rand(3)));
            changes++;
            MainScreen.text("\n\nYou shake your head and struggle to gather your thoughts, feeling a bit slow.", false);
        }
        //Smexual stuff!
        //-TIGGERSHARK ONLY: Grow a cunt (guaranteed if no gender)
        if (type == 1 && (player.gender == 0 || (!player.lowerBody.vaginaSpot.hasVagina() && changes < changeLimit && Utils.rand(3) == 0))) {
            changes++;
            //(balls)
            if (player.lowerBody.balls > 0) MainScreen.text("\n\nAn itch starts behind your " + ballsDescriptLight() + ", but before you can reach under to scratch it, the discomfort fades. A moment later a warm, wet feeling brushes your " + sackDescript() + ", and curious about the sensation, <b>you lift up your balls to reveal your new vagina.</b>", false);
            //(dick)
            else if (player.lowerBody.cockSpot.hasCock()) MainScreen.text("\n\nAn itch starts on your groin, just below your " + multiCockDescriptLight() + ". You pull the manhood aside to give you a better view, and you're able to watch as <b>your skin splits to give you a new vagina, complete with a tiny clit.</b>", false);
            //(neither)
            else MainScreen.text("\n\nAn itch starts on your groin and fades before you can take action. Curious about the intermittent sensation, <b>you peek under your " + player.armorName + " to discover your bUtils.rand new vagina, complete with pussy lips and a tiny clit.</b>", false);
            player.createVagina();
            player.lowerBody.vaginaSpot.list[0].clitLength = .25;
            dynStats("sen", 10);
            player.genderCheck();
        }
        //WANG GROWTH - TIGGERSHARK ONLY
        if (type == 1 && (!player.lowerBody.cockSpot.hasCock()) && changes < changeLimit && Utils.rand(3) == 0) {
            //Genderless:
            if (!player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text("\n\nYou feel a sudden stabbing pain in your featureless crotch and bend over, moaning in agony. Your hands clasp protectively over the surface - which is swelling in an alarming fashion under your fingers! Stripping off your clothes, you are presented with the shocking site of once-smooth flesh swelling and flowing like self-animate clay, resculpting itself into the form of male genitalia! When the pain dies down, you are the proud owner of a new human-shaped penis", false);
            //Female:
            else MainScreen.text("\n\nYou feel a sudden stabbing pain just above your " + vaginaDescript() + " and bend over, moaning in agony. Your hands clasp protectively over the surface - which is swelling in an alarming fashion under your fingers! Stripping off your clothes, you are presented with the shocking site of once-smooth flesh swelling and flowing like self-animate clay, resculpting itself into the form of male genitalia! When the pain dies down, you are the proud owner of not only a " + vaginaDescript() + ", but a new human-shaped penis", false);
            if (player.lowerBody.balls == 0) {
                MainScreen.text(" and a pair of balls", false);
                player.lowerBody.balls = 2;
                player.lowerBody.ballSize = 2;
            }
            MainScreen.text("!", false);
            player.createCock(7, 1.4);
            dynStats("lib", 4, "sen", 5, "lus", 20);
            player.genderCheck();
            changes++;
        }
        //(Requires the player having two testicles)
        if (type == 1 && (player.lowerBody.balls == 0 || player.lowerBody.balls == 2) && player.lowerBody.cockSpot.hasCock() && changes < changeLimit && Utils.rand(3) == 0) {
            if (player.lowerBody.balls == 2) {
                MainScreen.text("\n\nYou gasp in shock as a sudden pain racks your abdomen. Within seconds, two more testes drop down into your " + sackDescript() + ", your skin stretching out to accommodate them. Once the pain clears, you examine <b>your new quartet of testes.</b>", false);
                player.lowerBody.balls = 4;
            }
            else if (player.lowerBody.balls == 0) {
                MainScreen.text("\n\nYou gasp in shock as a sudden pain racks your abdomen. Within seconds, two balls drop down into a new sack, your skin stretching out to accommodate them. Once the pain clears, you examine <b>your new pair of testes.</b>", false);
                player.lowerBody.balls = 2;
                player.lowerBody.ballSize = 2;
            }
            dynStats("lib", 2, "sen", 3, "lus", 10);
            changes++;
        }
        //Transformations:
        //Mouth TF
        if (player.faceType != FACE.SHARK_TEETH && Utils.rand(3) == 0 && changes < changeLimit) {
            MainScreen.text("\n\n", false);
            if (player.faceType > FACE.HUMAN && player.faceType < FACE.SHARK_TEETH) MainScreen.text("Your " + player.face() + " explodes with agony, reshaping into a more human-like visage.  ", false);
            player.faceType = FACE.SHARK_TEETH;
            MainScreen.text("You firmly grasp your mouth, an intense pain racking your oral cavity. Your gums shift around and the bones in your jaw reset. You blink a few times wondering what just happened. You move over to a puddle to catch sight of your reflection, and you are thoroughly surprised by what you see. A set of retractable shark fangs have grown in front of your normal teeth, and your face has elongated slightly to accommodate them!  They even scare you a little.\n(Gain: 'Bite' special attack)", false);
            changes++;
        }
        //Remove odd eyes
        if (changes < changeLimit && Utils.rand(5) == 0 && player.eyeType > EYES.HUMAN) {
            if (player.eyeType == EYES.BLACK_EYES_SAND_TRAP) {
                MainScreen.text("\n\nYou feel a twinge in your eyes and you blink.  It feels like black cataracts have just fallen away from you, and you know without needing to see your reflection that your eyes have gone back to looking human.");
            }
            else {
                MainScreen.text("\n\nYou blink and stumble, a wave of vertigo threatening to pull your " + player.feet() + " from under you.  As you steady and open your eyes, you realize something seems different.  Your vision is changed somehow.", false);
                if (player.eyeType == EYES.FOUR_SPIDER_EYES) MainScreen.text("  Your multiple, arachnid eyes are gone!</b>", false);
                MainScreen.text("  <b>You have normal, humanoid eyes again.</b>", false);
            }
            player.eyeType = EYES.HUMAN;
            changes++;
        }
        //Tail TF
        if (player.tailType != TAIL.SHARK && Utils.rand(3) == 0 && changes < changeLimit) {
            changes++;
            if (player.tailType == TAIL.NONE) MainScreen.text("\n\nJets of pain shoot down your spine, causing you to gasp in surprise and fall to your hands and knees. Feeling a bulging at the end of your back, you lower your " + player.armorName + " down just in time for a fully formed shark tail to burst through. You swish it around a few times, surprised by how flexible it is. After some modifications to your clothing, you're ready to go with your bUtils.rand new shark tail.", false);
            else MainScreen.text("\n\nJets of pain shoot down your spine into your tail.  You feel the tail bulging out until it explodes into a large and flexible shark-tail.  You swish it about experimentally, and find it quite easy to control.", false);
            player.tailType = TAIL.SHARK;
        }
        //Hair
        if (player.hairColor != "silver" && Utils.rand(4) == 0 && changes < changeLimit) {
            changes++;
            MainScreen.text("\n\nYou feel a tingling in your scalp and reach up to your head to investigate. To your surprise, your hair color has changed into a silvery color, just like that of a shark girl!", false);
            player.hairColor = "silver";
        }
        //Skin
        if (((player.skinTone != "rough gray" && player.skinTone != "orange and black striped") || player.skinType != SKIN.PLAIN) && Utils.rand(7) == 0 && changes < changeLimit) {
            MainScreen.text("\n\n", false);
            if (player.skinType == SKIN.FUR || player.skinType == SKIN.SCALES) MainScreen.text("Your " + player.skinDesc + " falls out, collecting on the floor and exposing your supple skin underneath.  ", false);
            else if (player.skinType == SKIN.GOO) MainScreen.text("Your gooey skin solidifies, thickening up as your body starts to solidy into a more normal form. ", false);
            else if (type == 0) MainScreen.text("Your skin itches and tingles becoming slightly rougher and turning gray.  ", false);
            if (type == 0) {
                MainScreen.text("You abruptly stop moving and gasp sharply as a shudder goes up your entire frame. Your skin begins to shift and morph, growing slightly thicker and changing into a shiny grey color. Your skin now feels oddly rough too, comparable to that of a marine mammal. You smile and run your hands across your new shark skin.", false);
                player.skinType = SKIN.PLAIN;
                player.skinDesc = "skin";
                player.skinTone = "rough gray";
                changes++;
            }
            else {
                MainScreen.text("Your skin begins to tingle and itch, before rapidly shifting to a shiny orange color, marked by Utils.random black stripes. You take a quick look in a nearby pool of water, to see your skin has morphed in appearance and texture to become more like a tigershark!", false);
                player.skinType = SKIN.PLAIN;
                player.skinDesc = "skin";
                player.skinTone = "orange and black striped";
                changes++;
            }
        }
        //FINZ R WINGS
        if (player.upperBody.wingType != WING.SHARK_FIN && changes < changeLimit && Utils.rand(3) == 0) {
            MainScreen.text("\n\n", false);
            if (player.upperBody.wingType > WING.NONE) MainScreen.text("Your wings fold into themselves, merging together with your back.  ", false);
            MainScreen.text("You groan and slump down in pain, almost instantly regretting eating the tooth. You start sweating profusely and panting loudly, feeling the space between your shoulder blades shifting about. You hastily remove your " + player.armorName + " just in time before a strange fin-like structure bursts from in-between your shoulders. You examine it carefully and make a few modifications to your " + player.armorName + " to accommodate your new fin.", false);
            player.upperBody.wingType = WING.SHARK_FIN;
            player.upperBody.wingDesc = "";
            changes++;
        }
        if (changes == 0) {
            MainScreen.text("\n\nNothing happened.  Weird.", false);
        }
    }


    //9)  Transformation Item - Snake Oil (S. Oil)
    /*Effects:
      Boosts Speed stat
      Ass reduction
      Testicles return inside your body (could be reverted by the use of succubi delight)
      Can change penis into reptilian form  (since there's a lot of commentary here not knowing where to go, let me lay it out.)
     the change will select one cock (Utils.randomly if you have multiple)
     said cock will become two reptilian cocks
     these can then be affected separately, so if someone wants to go through the effort of removing one and leaving themselves with one reptile penis, they have the ability to do that
     This also means that someone who's already reached the maximum numbers of dicks cannot get a reptilian penis unless they remove one first
     "Your reptilian penis is X.X inches long and X.X inches thick.  The sheath extends halfway up the shaft, thick and veiny, while the smooth shaft extends out of the sheath coming to a pointed tip at the head. "
      Grow poisonous fangs (grants Poison Bite ability to player, incompatible with the sting ability, as it uses the same poison-meter)
      Causes your tongue to fork
      Legs fuse together and dissolve into snake tail  (grants Constrict ability to player, said tail can only be covered in scales, independently from the rest of the body)
      If snake tail exists:
        Make it longer, possibly larger (tail length is considered independently of your height, so it doesn't enable you to use the axe, for instance.
        Change tail's color according to location
          [Smooth] Beige and Tan (Desert), [Rough] Brown and Rust (Mountains), [Lush]  Forest Green and Yellow (Forest), [Cold] Blue and White (ice land?), [Fresh] Meadow Green [#57D53B - #7FFF00] and Dark Teal [#008080] (lake) , [Menacing] Black and Red (Demon realm, outside encounters), [Distinguished] Ivory (#FFFFF0) and Royal Purple/Amethyst (#702963) (Factory), [Mossy] Emerald and Chestnut (Swamp), [Arid] Orange and Olive pattern (Tel' Adre)

     9a) Item Description
     "A vial the size of your fist made of dark brown glass. It contains what appears to be an oily, yellowish liquid. The odor is abominable."
     */

    public snakeOil(player: Player): void {
        player.slimeFeed();
        MainScreen.text("", true);
        let changes: number = 0;
        let changeLimit: number = 1;
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(2) == 0) changeLimit++;
        if (player.perks.has("HistoryAlchemist")) changeLimit++;
        //b) Description while used
        MainScreen.text("Pinching your nose, you quickly uncork the vial and bring it to your mouth, determined to see what effects it might have on your body. Pouring in as much as you can take, you painfully swallow before going for another shot, emptying the bottle.", false);
        //(if outside combat)
        if (!kGAMECLASS.inCombat) MainScreen.text("  Minutes pass as you start wishing you had water with you, to get rid of the aftertaste.", false);
        //+ speed to 70!
        if (player.stats.spe < 70 && Utils.rand(2) == 0) {
            dynStats("spe", (2 - (player.stats.spe / 10 / 5)));
            MainScreen.text("\n\nYour muscles quiver, feeling ready to strike as fast as a snake!", false);
            if (player.stats.spe < 40) MainScreen.text("  Of course, you're nowhere near as fast as that.", false);
            changes++;
        }
        //Removes wings
        if (player.upperBody.wingType > WING.NONE && Utils.rand(3) == 0 && changes < changeLimit) {
            if (player.upperBody.wingType == WING.SHARK_FIN) MainScreen.text("\n\nA wave of tightness spreads through your back, and it feels as if someone is stabbing a dagger into your spine.  After a moment the pain passes, though your fin is gone!", false);
            else MainScreen.text("\n\nA wave of tightness spreads through your back, and it feels as if someone is stabbing a dagger into each of your shoulder-blades.  After a moment the pain passes, though your wings are gone!", false);
            player.upperBody.wingType = WING.NONE;
            changes++;
        }
        //Removes antennae
        if (player.antennae > ANTENNAE.NONE && Utils.rand(3) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nThe muscles in your brow clench tightly, and you feel a tremendous pressure on your upper forehead.  When it passes, you touch yourself and discover your antennae have vanished!", false);
            player.antennae = ANTENNAE.NONE;
            changes++;
        }
        //9c) II The tongue (sensitivity bonus, stored as a perk?)
        if (changes == 0 && player.tongueType != TONUGE.SNAKE && Utils.rand(3) == 0 && changes < changeLimit) {
            if (player.tongueType == TONUGE.HUMAN) MainScreen.text("\n\nYour taste-buds start aching as they swell to an uncomfortably large size. Trying to understand what in the world could have provoked such a reaction, you bring your hands up to your mouth, your tongue feeling like it's trying to push its way past your lips. The soreness stops and you stick out your tongue to try and see what would have made it feel the way it did. As soon as you stick your tongue out you realize that it sticks out much further than it did before, and now appears to have split at the end, creating a forked tip. The scents in the air are much more noticeable to you with your snake-like tongue.", false);
            else MainScreen.text("\n\nYour inhuman tongue shortens, pulling tight in the very back of your throat.  After a moment the bunched-up tongue-flesh begins to flatten out, then extend forwards.  By the time the transformation has finished, your tongue has changed into a long, forked snake-tongue.", false);
            player.tongueType = TONUGE.SNAKE;
            dynStats("sen", 5);
            changes++;
        }
        //9c) III The fangs
        if (changes == 0 && player.tongueType == TONUGE.SNAKE && player.faceType != FACE.SNAKE_FANGS && Utils.rand(3) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nWithout warning, you feel your canine teeth jump almost an inch in size, clashing on your gums, cutting yourself quite badly. As you attempt to find a new way to close your mouth without dislocating your jaw, you notice that they are dripping with a bitter, khaki liquid.  Watch out, and <b>try not to bite your tongue with your poisonous fangs!</b>", false);
            if (player.faceType != FACE.HUMAN && player.faceType != FACE.SHARK_TEETH && player.faceType != FACE.BUNNY && player.faceType != FACE.SPIDER_FANGS) {
                MainScreen.text("  As the change progresses, your " + player.face() + " reshapes.  The sensation is far more pleasant than teeth cutting into gums, and as the tingling transformation completes, <b>you've gained with a normal-looking, human visage.</b>");
            }
            player.faceType = FACE.SNAKE_FANGS;
            changes++;
        }
        //9c) I The tail ( http://tvtropes.org/pmwiki/pmwiki.php/Main/TransformationIsAFreeAction ) (Shouldn't we try to avert this? -Ace)
        //Should the enemy "kill" you during the transformation, it skips the scene and immediately goes to tthe rape scene. (Now that I'm thinking about it, we should add some sort of appendix where the player realizes how much he's/she's changed. -Ace)
        if (changes == 0 && player.faceType == FACE.SNAKE_FANGS && player.lowerBody != LOWER_BODY.NAGA && Utils.rand(4) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYou find it increasingly harder to keep standing as your legs start feeling weak.  You swiftly collapse, unable to maintain your own weight.", false);
            //(If used in combat, you lose a turn here. Half-corrupted Jojo and the Naga won't attack you during that period, but other monsters will)
            //FUCK NO
            MainScreen.text("\n\nTrying to get back up, you realize that the skin on the inner sides of your thighs is merging together like it was being sewn by an invisible needle.", false);
            MainScreen.text("  The process continues through the length of your " + player.legs() + ", eventually reaching your " + player.feet() + ".  Just when you think that the transformation is over, you find yourself pinned to the ground by an overwhelming sensation of pain. You hear the horrible sound of your bones snapping, fusing together and changing into something else while you contort in unthinkable agony.  Sometime later you feel the pain begin to ease and you lay on the ground, spent by the terrible experience. Once you feel you've recovered, you try to stand, but to your amazement you discover that you no longer have " + player.legs() + ": the bottom half of your body is like that of a snake's.", false);
            MainScreen.text("\n\nWondering what happened to your sex, you pass your hand down the front of your body until you find a large, horizontal slit around your pelvic area, which contains all of your sexual organs.", false);
            if (player.lowerBody.balls > 0 && player.lowerBody.ballSize > 10) MainScreen.text("  You're happy not to have to drag those testicles around with you anymore.", false);
            MainScreen.text("  But then, scales start to form on the surface of your skin, slowly becoming visible, recoloring all of your body from the waist down in a snake-like pattern. The feeling is... not that bad actually, kind of like callous, except on your whole lower body. The transformation complete, you get up, standing on your newly formed snake tail. You can't help feeling proud of this majestic new body of yours.", false);
            player.lowerBody = LOWER_BODY.NAGA;
            changes++;
        }
        if (Utils.rand(4) == 0 && player.upperBody.gills && changes < changeLimit) {
            MainScreen.text("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.", false);
            player.upperBody.gills = false;
            changes++;
        }

        //9e) Penis
        /*
         if(player.lowerBody.cockSpot.count() > 0) {
         //(If multiple penis, insert "one of your")
         MainScreen.text("\n\nAs the liquid takes effect, ", false);
         //(if multicock)
         if(player.lowerBody.cockSpot.count() > 1) MainScreen.text("one of ", false);
         MainScreen.text("your " + multiCockDescriptLight() + " starts to throb painfully and swell to its full size.  With a horrifying ripping sensation, your cock splits down the middle, the pain causing you to black out momentarily.", false);
         MainScreen.text("When you awaken, you quickly look down to see that where ", false);
         //(if multicock)
         if(player.lowerBody.cockSpot.count() > 1) MainScreen.text("one of ", false);
         MainScreen.text("your " + multiCockDescriptLight() + " was, you now have two pointed reptilian cocks, still stiff and pulsing.", false);
         }*/
        //Default change - blah
        if (changes == 0) MainScreen.text("\n\nRemakarbly, the snake-oil has no effect.  Should you really be surprised at snake-oil NOT doing anything?", false);
    }

    /*
            public  extensionSerum(player:Player):void
            {
                MainScreen.text("", true);
                if (flags[FlagEnum.INCREASED_HAIR.GROWTH_SERUM_TIMES_APPLIED] > 2) {
                    MainScreen.text("<b>No way!</b>  Your head itches like mad from using the rest of these, and you will NOT use another.\n", false);
                    if (!debug) {
                        inventory.takeItem(consumables.EXTSERM);
                    }
                    return;
                }
                MainScreen.text("You open the bottle of hair extension serum and follow the directions carefully, massaging it into your scalp and being careful to keep it from getting on any other skin.  You wash off your hands with lakewater just to be sure.", false);
                if (flags[FlagEnum.INCREASED_HAIR.GROWTH_TIME_REMAINING] <= 0) {
                    MainScreen.text("\n\nThe tingling on your head lets you know that it's working!", false);
                    flags[FlagEnum.INCREASED_HAIR.GROWTH_TIME_REMAINING] = 7;
                    flags[FlagEnum.INCREASED_HAIR.GROWTH_SERUM_TIMES_APPLIED] = 1;
                }
                else if (flags[FlagEnum.INCREASED_HAIR.GROWTH_SERUM_TIMES_APPLIED] == 1) {
                    MainScreen.text("\n\nThe tingling intensifies, nearly making you feel like tiny invisible faeries are massaging your scalp.", false);
                    flags[FlagEnum.INCREASED_HAIR.GROWTH_SERUM_TIMES_APPLIED]++;
                }
                else if (flags[FlagEnum.INCREASED_HAIR.GROWTH_SERUM_TIMES_APPLIED] == 2) {
                    MainScreen.text("\n\nThe tingling on your scalp is intolerable!  It's like your head is a swarm of angry ants, though you could swear your hair is growing so fast that you can feel it weighing you down more and more!", false);
                    flags[FlagEnum.INCREASED_HAIR.GROWTH_SERUM_TIMES_APPLIED]++;
                }
                if (flags[FlagEnum.HAIR.GROWTH_STOPPED_BECAUSE_LIZARD] > 0 && player.upperBody.head.hairType != 4) {
                    flags[FlagEnum.HAIR.GROWTH_STOPPED_BECAUSE_LIZARD] = 0;
                    MainScreen.text("\n\n<b>Somehow you know that your " + hairDescript() + " is growing again.</b>", false);
                }
                if (flags[FlagEnum.INCREASED_HAIR.GROWTH_TIME_REMAINING] < 7) flags[FlagEnum.INCREASED_HAIR.GROWTH_TIME_REMAINING] = 7;
            }
    */

    public Hummus(player: Player): void {
        MainScreen.text("", true);
        if (debug) {
            MainScreen.text("You're about to eat the humus when you see it has bugs in it. Not wanting to eat bugged humus or try to debug it you throw it into the portal and find something else to eat.", false);
            player.destroyItems(consumables.HUMMUS_, 1);
            return;
        }
        MainScreen.text("You shovel the stuff into your face, not sure WHY you're eating it, but once you start, you just can't stop.  It tastes incredibly bland, and with a slight hint of cheese.", false);
        player.str = 30;
        player.stats.spe = 30;
        player.tou = 30;
        player.stats.int = 30;
        player.stats.sens = 20;
        player.stats.lib = 25;
        player.stats.cor = 5;
        player.lust = 10;
        player.upperBody.head.hairType = 0;
        if (player.humanScore() > 4) {
            MainScreen.text("\n\nYou blink and the world twists around you.  You feel more like yourself than you have in a while, but exactly how isn't immediately apparent.  Maybe you should take a look at yourself?", false);
        }
        else {
            MainScreen.text("\n\nYou cry out as the world spins around you.  You're aware of your entire body sliding and slipping, changing and morphing, but in the sea of sensation you have no idea exactly what's changing.  You nearly black out, and then it's over.  Maybe you had best have a look at yourself and see what changed?", false);
        }
        player.armType = ARM.HUMAN;
        player.eyeType = EYES.HUMAN;
        player.antennae = ANTENNAE.NONE;
        player.faceType = FACE.HUMAN;
        player.lowerBody = LOWER_BODY.HUMAN;
        player.upperBody.wingType = WING.NONE;
        player.upperBody.wingDesc = "non-existant";
        player.tailType = TAIL.NONE;
        player.tongueType = TONUGE.HUMAN;
        player.lowerBody.tailRecharge = 0;
        player.horns = 0;
        player.hornType = HORNS.NONE;
        player.upperBody.head.earType = EARS.HUMAN;
        player.skinType = SKIN.PLAIN;
        player.skinDesc = "skin";
        player.skinAdj = "";
        player.armType = ARM.HUMAN;
        player.tongueType = TONUGE.HUMAN;
        player.eyeType = EYES.HUMAN;
        if (player.fertility > 15) player.fertility = 15;
        if (player.cumMultiplier > 50) player.cumMultiplier = 50;
        let virgin: boolean = false;
        //Clear cocks
        while (player.lowerBody.cockSpot.count() > 0) {
            player.lowerBody.cockSpot.remove(0, 1);
            trace("1 cock purged.");
        }
        //Reset dongs!
        if (player.gender == 1 || player.gender == 3) {
            player.lowerBody.cockSpot.add(new Cock());
            player.lowerBody.cockSpot.list[0].cockLength = 6;
            player.lowerBody.cockSpot.list[0].cockThickness = 1;
            player.lowerBody.ballSize = 2;
            if (player.lowerBody.balls > 2) player.lowerBody.balls = 2;
        }
        //Non duders lose any nuts
        else {
            player.lowerBody.balls = 0;
            player.lowerBody.ballSize = 2;
        }
        //Clear vaginas
        while (player.lowerBody.vaginaSpot.count() > 0) {
            virgin = player.vaginas[0].virgin;
            player.removeVagina(0, 1);
            trace("1 vagina purged.");
        }
        //Reset vaginal virginity to correct state
        if (player.gender >= 2) {
            player.createVagina();
            player.vaginas[0].virgin = virgin;
        }
        player.lowerBody.vaginaSpot.list[0].clitLength = .25;
        //Tighten butt!
        player.lowerBody.butt.buttRating = 2;
        player.lowerBody.hipRating = 2;
        if (player.ass.analLooseness > 1) player.ass.analLooseness = 1;
        if (player.ass.analWetness > 1) player.ass.analWetness = 1;
        //Clear breasts
        player.breastRows = [];
        player.createBreastRow();
        player.upperBody.chest.BreastRatingLargest[0].nippleLength = .25;
        //Girls and herms get bewbs back
        if (player.gender > 2) {

            player.upperBody.chest.list[0].breastRating = 2;
        }
        else player.upperBody.chest.list[0].breastRating = 0;
        player.upperBody.gills = false;
        player.statusAffects.remove("Uniball");
        player.statusAffects.remove("BlackNipples");
        player.vaginaType(0);
    }


    public coal(player: Player): void {
        let changes: number = 0;
        MainScreen.text("", true);
        MainScreen.text("You handle the coal rocks experimentally and they crumble to dust in your hands!  You cough as you breathe in the cloud, sputtering and wheezing.  After a minute of terrible coughing, you recover and realize there's no remaining trace of the rocks, not even a sooty stain on your hands!", false);
        //Try to go into intense heat
        if (player.goIntoHeat(true, 2)) {
            changes++;
        }
        //Males go into rut
        else if (player.goIntoRut(true)) {
            changes++;
        }
        else {
            //Boost anal capacity without gaping
            if (player.statusAffects.get("BonusACapacity").value1 < 80) {
                if (player.findStatusAffect(StatusAffects.BonusACapacity) < 0) player.statusAffects.add(new StatusAffect("BonusACapacity", 0, 0, 0, 0)));
                player.statusAffects.get("BonusACapacity").value1 = 5;
                MainScreen.text("\n\nYou feel... more accommodating somehow.  Your " + assholeDescript() + " is tingling a bit, and though it doesn't seem to have loosened, it has grown more elastic.", false);
                changes++;
            }
            else {
                MainScreen.text("\n\nYour whole body tingles for a moment but it passes.  It doesn't look like the coal can do anything to you at this point.", false);
            }
        }
    }

    public catTransformation(player: Player): void {
        let changes: number = 0;
        let changeLimit: number = 1;
        let temp2: number = 0;
        let temp3: number = 0;
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(3) == 0) changeLimit++;
        if (player.perks.has("HistoryAlchemist")) changeLimit++;
        //Text go!
        MainScreen.text("", true);
        MainScreen.text("You take a bite of the fruit and gulp it down. It's thick and juicy and has an almost overpowering sweetness. Nevertheless, it is delicious and you certainly could use a meal.  You devour the fruit, stopping only when the hard, nubby pit is left; which you toss aside.", false);
        //Speed raises up to 75
        if (player.stats.spe < 75 && Utils.rand(3) == 0 && changes < changeLimit) {
            //low speed
            if (player.stats.spe <= 30) {
                MainScreen.text("\n\nYou feel... more balanced, sure of step. You're certain that you've become just a little bit faster.", false);
                dynStats("spe", 2);
            }
            //medium speed
            else if (player.stats.spe <= 60) {
                MainScreen.text("\n\nYou stumble as you shift position, surprised by how quickly you move. After a moment or two of disorientation, you adjust. You're certain that you can run faster now.", false);
                dynStats("spe", 1);
            }
            //high speed
            else {
                MainScreen.text("\n\nYou pause mid-step and crouch. Your leg muscles have cramped up like crazy. After a few moments, the pain passes and you feel like you could chase anything down.", false);
                dynStats("spe", .5);
            }
            changes++;
        }
        //Strength raises to 40
        if (player.str < 40 && Utils.rand(3) == 0 && changes < changeLimit) {
            if (Utils.rand(2) == 0) MainScreen.text("\n\nYour muscles feel taut, like a coiled spring, and a bit more on edge.", false);
            else MainScreen.text("\n\nYou arch your back as your muscles clench painfully.  The cramp passes swiftly, leaving you feeling like you've gotten a bit stronger.", false);
            dynStats("str", 1);
            changes++;
        }
        //Strength ALWAYS drops if over 60
        //Does not add to change total
        else if (player.str > 60 && Utils.rand(2) == 0) {
            MainScreen.text("\n\nShivers run from your head to your toes, leaving you feeling weak.  Looking yourself over, your muscles seemed to have lost some bulk.", false);
            dynStats("str", -2);
        }
        //Toughness drops if over 50
        //Does not add to change total
        if (player.tou > 50 && Utils.rand(2) == 0) {
            MainScreen.text("\n\nYour body seems to compress momentarily, becoming leaner and noticeably less tough.", false);
            dynStats("tou", -2);
        }
        //Intelliloss
        if (Utils.rand(4) == 0 && changes < changeLimit) {
            //low intelligence
            if (player.stats.int < 15) MainScreen.text("\n\nYou feel like something is slipping away from you but can't figure out exactly what's happening.  You scrunch up your " + player.face() + ", trying to understand the situation.  Before you can reach any kind of conclusion, something glitters in the distance, distracting your feeble mind long enough for you to forget the problem entirely.", false);
            //medium intelligence
            else if (player.stats.int < 50) {
                MainScreen.text("\n\nYour mind feels somewhat sluggish, and you wonder if you should just lie down ", false);
                if (Utils.rand(2) == 0) {
                    MainScreen.text("somewhere and ", false);
                    temp = Utils.rand(3);
                    if (temp == 0) MainScreen.text("toss a ball around or something", false);
                    else if (temp == 1) MainScreen.text("play with some yarn", false);
                    else if (temp == 2) MainScreen.text("take a nap and stop worrying", false);
                }
                else MainScreen.text("in the sun and let your troubles slip away", false);
                MainScreen.text(".", false);
            }
            //High intelligence
            else MainScreen.text("\n\nYou start to feel a bit dizzy, but the sensation quickly passes.  Thinking hard on it, you mentally brush away the fuzziness that seems to permeate your brain and determine that this fruit may have actually made you dumber.  It would be best not to eat too much of it.", false);
            dynStats("int", -1);
            changes++;
        }
        //Libido gain
        if (player.stats.lib < 80 && changes < changeLimit && Utils.rand(4) == 0) {
            //Cat dicked folks
            if (player.catCocks() > 0) {
                temp = player.findFirstCockType(CockType.CAT);
                MainScreen.text("\n\nYou feel your " + cockDescript(temp) + " growing hard, the barbs becoming more sensitive. You gently run your hands down them and imagine the feeling of raking the insides of a cunt as you pull.  The fantasy continues, and after ejaculating and hearing the female yowl with pleasure, you shake your head and try to drive off the image.  ", false);
                if (player.stats.cor < 33) MainScreen.text("You need to control yourself better.", false);
                else if (player.stats.cor < 66) MainScreen.text("You're not sure how you feel about the fantasy.", false);
                else MainScreen.text("You hope to find a willing partner to make this a reality.", false);
            }
            //Else –
            else {
                MainScreen.text("\n\nA rush of tingling warmth spreads through your body as it digests the fruit.  You can feel your blood pumping through your extremities, making them feel sensitive and surprisingly sensual.  It's going to be hard to resist getting ", false);
                if (player.lust > 60) MainScreen.text("even more ", false);
                MainScreen.text("turned on.", false);
            }
            dynStats("lib", 1, "sen", .25);
            changes++;
        }

        //Sexual changes would go here if I wasn't a tard.
        //Heat
        if (Utils.rand(4) == 0 && changes < changeLimit) {
            let intensified: boolean = player.inHeat;

            if (player.goIntoHeat(false)) {
                if (intensified) {
                    if (Utils.rand(2) == 0) MainScreen.text("\n\nThe itch inside your " + vaginaDescript(0) + " is growing stronger, and you desperately want to find a nice cock to massage the inside.", false);
                    else MainScreen.text("\n\nThe need inside your " + vaginaDescript(0) + " grows even stronger.  You desperately need to find a mate to 'scratch your itch' and fill your womb with kittens.  It's difficult NOT to think about a cock slipping inside your moist fuck-tunnel, and at this point you'll have a hard time resisting ANY male who approaches.", false);
                }
                else {
                    MainScreen.text("\n\nThe interior of your " + vaginaDescript(0) + " clenches tightly, squeezing with reflexive, aching need.  Your skin flushes hot ", false);
                    if (player.skinType == SKIN.FUR) MainScreen.text("underneath your fur ", false);
                    MainScreen.text("as images and fantasies ", false);
                    if (player.stats.cor < 50) MainScreen.text("assault ", false);
                    else MainScreen.text("fill ", false);
                    MainScreen.text(" your mind.  Lithe cat-boys with their perfect, spine-covered cocks line up behind you, and you bend over to present your needy pussy to them.  You tremble with the desire to feel the exotic texture of their soft barbs rubbing your inner walls, smearing your " + vaginaDescript(0) + " with their cum as you're impregnated.  Shivering, you recover from the fantasy and pull your fingers from your aroused sex.  <b>It would seem you've gone into heat!</b>", false);
                }
                changes++;
            }
        }

        //Shrink the boobalies down to A for men or C for girls.
        if (changes < changeLimit && Utils.rand(4) == 0 && !flags[FlagEnum.HYPER_HAPPY]) {
            temp2 = 0;
            temp3 = 0;
            //Determine if shrinkage is required
            //and set temp2 to threshold
            if (!player.lowerBody.vaginaSpot.hasVagina() && player.upperBody.chest.BreastRatingLargest[0].breastRating > 2) temp2 = 2;
            else if (player.upperBody.chest.BreastRatingLargest[0].breastRating > 4) temp2 = 4;
            //IT IS!
            if (temp2 > 0) {
                //temp3 stores how many rows are changed
                temp3 = 0;
                for (let k: number = 0; k < player.upperBody.chest.count(); k++) {
                    //If this row is over threshhold
                    if (player.upperBody.chest.list[k].breastRating > temp2) {
                        //Big change
                        if (player.upperBody.chest.list[k].breastRating > 10) {
                            player.upperBody.chest.list[k].breastRating -= 2 + Utils.rand(3);
                            if (temp3 == 0) MainScreen.text("\n\nThe " + breastDescript(0) + " on your chest wobble for a second, then tighten up, losing several cup-sizes in the process!", false);
                            else MainScreen.text("  The change moves down to your " + num2Text2(k + 1) + " row of " + breastDescript(0) + ". They shrink greatly, losing a couple cup-sizes.", false);
                        }
                        //Small change
                        else {
                            player.upperBody.chest.list[k].breastRating -= 1;
                            if (temp3 == 0) MainScreen.text("\n\nAll at once, your sense of gravity shifts.  Your back feels a sense of relief, and it takes you a moment to realize your " + breastDescript(k) + " have shrunk!", false);
                            else MainScreen.text("  Your " + num2Text2(k + 1) + " row of " + breastDescript(k) + " gives a tiny jiggle as it shrinks, losing some off its mass.", false);
                        }
                        //Increment changed rows
                        temp3++;
                    }
                }
            }
            //Count that tits were shrunk
            if (temp3 > 0) changes++;
        }
        //Cat dangly-doo.
        if (player.lowerBody.cockSpot.count() > 0 && player.catCocks() < player.lowerBody.cockSpot.count() &&
            changes < changeLimit && Utils.rand(4) == 0) {
            //loop through and find a non-cat wang.
            for (let i: number = 0; i < (player.lowerBody.cockSpot.count()) && player.lowerBody.cockSpot.list[i].cockType == CockType.CAT; i++) { }
            MainScreen.text("\n\nYour " + cockDescript(i) + " swells up with near-painful arousal and begins to transform.  It turns pink and begins to narrow until the tip is barely wide enough to accommodate your urethra.  Barbs begin to sprout from its flesh, if you can call the small, fleshy nubs barbs. They start out thick around the base of your " + Appearance.cockNoun(CockType.HUMAN) + " and shrink towards the tip. The smallest are barely visible. <b>Your new feline dong throbs powerfully</b> and spurts a few droplets of cum.  ", false);
            if (!player.lowerBody.cockSpot.hasSheath()) {
                MainScreen.text("Then, it begins to shrink and sucks itself inside your body.  Within a few moments, a fleshy sheath is formed.", false);
                if (player.lowerBody.balls > 0) MainScreen.text("  Thankfully, your balls appear untouched.", false);
            }
            else MainScreen.text("Then, it disappears back into your sheath.", false);
            player.lowerBody.cockSpot.list[i].cockType = CockType.CAT;
            player.lowerBody.cockSpot.list[i].knotMultiplier = 1;
            changes++;
        }
        //Cat penorz shrink
        if (player.catCocks() > 0 && Utils.rand(3) == 0 && changes < changeLimit && !flags[FlagEnum.HYPER_HAPPY]) {
            //loop through and find a cat wang.
            temp = 0;
            for (let j: number = 0; j < (player.lowerBody.cockSpot.count()); j++) {
                if (player.lowerBody.cockSpot.list[j].cockType == CockType.CAT && player.lowerBody.cockSpot.list[j].cockLength > 6) {
                    temp = 1;
                    break;
                }
            }
            if (temp == 1) {
                //lose 33% size until under 10, then lose 2" at a time
                if (player.lowerBody.cockSpot.list[j].cockLength > 16) {
                    MainScreen.text("\n\nYour " + cockDescript(j) + " tingles, making your sheath feel a little less tight.  It dwindles in size, losing a full third of its length and a bit of girth before the change finally stops.", false);
                    player.lowerBody.cockSpot.list[j].cockLength *= .66;
                }
                else if (player.lowerBody.cockSpot.list[j].cockLength > 6) {
                    MainScreen.text("\n\nYour " + cockDescript(j) + " tingles and withdraws further into your sheath.  If you had to guess, you'd say you've lost about two inches of total length and perhaps some girth.", false);
                    player.lowerBody.cockSpot.list[j].cockLength -= 2;
                }
                if (player.lowerBody.cockSpot.list[j].cockLength / 5 < player.lowerBody.cockSpot.list[j].cockThickness && player.lowerBody.cockSpot.list[j].cockThickness > 1.25) player.lowerBody.cockSpot.list[j].cockThickness = player.lowerBody.cockSpot.list[j].cockLength / 6;
                //Check for any more!
                temp2 = 0;
                j++;
                for (j; j < player.lowerBody.cockSpot.count(); j++) {
                    //Found another cat wang!
                    if (player.lowerBody.cockSpot.list[j].cockType == CockType.CAT) {
                        //Long enough - change it
                        if (player.lowerBody.cockSpot.list[j].cockLength > 6) {
                            if (player.lowerBody.cockSpot.list[j].cockLength > 16)
                                player.lowerBody.cockSpot.list[j].cockLength *= .66;
                            else if (player.lowerBody.cockSpot.list[j].cockLength > 6)
                                player.lowerBody.cockSpot.list[j].cockLength -= 2;
                            //Thickness adjustments
                            if (player.lowerBody.cockSpot.list[j].cockLength / 5 < player.lowerBody.cockSpot.list[j].cockThickness && player.lowerBody.cockSpot.list[j].cockThickness > 1.25) player.lowerBody.cockSpot.list[j].cockThickness = player.lowerBody.cockSpot.list[j].cockLength / 6;
                            temp2 = 1;
                        }
                    }
                }
                //(big sensitivity boost)
                MainScreen.text("  Although the package is smaller, it feels even more sensitive – as if it retained all sensation of its larger size in its smaller form.", false);
                dynStats("sen", 5);
                //Make note of other dicks changing
                if (temp2 == 1) MainScreen.text("  Upon further inspection, all your " + Appearance.cockNoun(CockType.CAT) + "s have shrunk!", false);
                changes++;
            }
        }
        //Body type changes.  Teh rarest of the rare.
        //DA EARZ
        if (player.upperBody.head.earType != EARS.CAT && Utils.rand(5) == 0 && changes < changeLimit) {
            //human to cat:
            if (player.upperBody.head.earType == EARS.HUMAN) {
                if (Utils.rand(2) == 0) MainScreen.text("\n\nThe skin on the sides of your face stretches painfully as your ears migrate upwards, towards the top of your head. They shift and elongate a little, fur growing on them as they become feline in nature. <b>You now have cat ears.</b>", false);
                else MainScreen.text("\n\nYour ears begin to tingle. You reach up with one hand and gently rub them. They appear to be growing fur. Within a few moments, they've migrated up to the top of your head and increased in size. The tingling stops and you find yourself hearing noises in a whole new way. <b>You now have cat ears.</b>", false);
            }
            //non human to cat:
            else {
                if (Utils.rand(2) == 0) MainScreen.text("\n\nYour ears change shape, morphing into pointed, feline ears!  They swivel about reflexively as you adjust to them.  <b>You now have cat ears.</b>", false);
                else MainScreen.text("\n\nYour ears tingle and begin to change shape. Within a few moments, they've become long and feline.  Thanks to the new fuzzy organs, you find yourself able to hear things that eluded your notice up until now. <b>You now have cat ears.</b>", false);
            }
            player.upperBody.head.earType = EARS.CAT;
            changes++;
        }
        //DA TAIL (IF ALREADY HAZ URZ)
        if (player.tailType != TAIL.CAT && player.upperBody.head.earType == EARS.CAT && Utils.rand(5) == 0 && changes < changeLimit) {
            if (player.tailType == TAIL.NONE) {
                temp = Utils.rand(3);
                if (temp == 0) MainScreen.text("\n\nA pressure builds in your backside. You feel under your " + player.armorName + " and discover an odd bump that seems to be growing larger by the moment. In seconds it passes between your fingers, bursts out the back of your clothes and grows most of the way to the ground. A thick coat of fur springs up to cover your new tail. You instinctively keep adjusting it to improve your balance. <b>You now have a cat-tail.</b>", false);
                if (temp == 1) MainScreen.text("\n\nYou feel your backside shift and change, flesh molding and displacing into a long, flexible tail! <b>You now have a cat tail.</b>", false);
                if (temp == 2) MainScreen.text("\n\nYou feel an odd tingling in your spine and your tail bone starts to throb and then swell. Within a few moments it begins to grow, adding new bones to your spine. Before you know it, you have a tail. Just before you think it's over, the tail begins to sprout soft, glossy " + player.hairColor + " fur. <b>You now have a cat tail.</b>", false);
            }
            else MainScreen.text("\n\nYou pause and tilt your head... something feels different.  Ah, that's what it is; you turn around and look down at your tail as it starts to change shape, narrowing and sprouting glossy fur. <b>You now have a cat tail.</b>", false);
            player.tailType = TAIL.CAT;
            changes++;
        }
        //Da paws (if already haz ears & tail)
        if (player.tailType == TAIL.CAT && player.upperBody.head.earType == EARS.CAT &&
            Utils.rand(5) == 0 && changes < changeLimit &&
            player.lowerBody != LOWER_BODY.CAT) {
            //hoof to cat:
            if (player.lowerBody == LOWER_BODY.HOOFED || player.lowerBody == LOWER_BODY.CENTAUR) {
                MainScreen.text("\n\nYou feel your hooves suddenly splinter, growing into five unique digits. Their flesh softens as your hooves reshape into furred cat paws. <b>You now have cat paws.</b>", false);
                if (player.lowerBody == LOWER_BODY.CENTAUR) MainScreen.text("  You feel woozy and collapse on your side.  When you wake, you're no longer a centaur and your body has returned to a humanoid shape.", false);
            }
            //Goo to cat
            else if (player.lowerBody == LOWER_BODY.GOO) {
                MainScreen.text("\n\nYour lower body rushes inward, molding into two leg-like shapes that gradually stiffen up.  In moments they solidify into digitigrade legs, complete with soft, padded cat-paws.  <b>You now have cat-paws!</b>", false);
            }
            //non hoof to cat:
            else MainScreen.text("\n\nYou scream in agony as you feel the bones in your " + player.feet() + " break and begin to rearrange. When the pain fades, you feel surprisingly well-balanced. <b>You now have cat paws.</b>", false);
            player.lowerBody = LOWER_BODY.CAT;
            changes++;
        }
        //TURN INTO A FURRAH!  OH SHIT
        if (player.tailType == TAIL.CAT && player.upperBody.head.earType == EARS.CAT &&
            Utils.rand(5) == 0 && changes < changeLimit &&
            player.lowerBody == LOWER_BODY.CAT && player.skinType != SKIN.FUR) {
            MainScreen.text("\n\nYour " + player.skinDesc + " begins to tingle, then itch. You reach down to scratch your arm absent-mindedly and pull your fingers away to find stUtils.rands of " + player.hairColor + " fur. Wait, fur?  What just happened?! You spend a moment examining yourself and discover that <b>you are now covered in glossy, soft fur.</b>\n\n", false);
            player.skinType = SKIN.FUR;
            player.skinDesc = "fur";
            changes++;
        }
        //CAT-FACE!  FULL ON FURRY!  RAGE AWAY NEKOZ
        if (player.tailType == TAIL.CAT && player.upperBody.head.earType == EARS.CAT &&
            Utils.rand(5) == 0 && changes < changeLimit &&
            player.lowerBody == LOWER_BODY.CAT && player.skinType == SKIN.FUR &&
            player.faceType != FACE.CAT) {
            //Gain cat face, replace old face
            temp = Utils.rand(3);
            if (temp == 0) MainScreen.text("\n\nYour face is wracked with pain. You throw back your head and scream in agony as you feel your cheekbones breaking and shifting, reforming into something... different. You find a puddle to view your reflection and discover <b>your face is now a cross between human and feline features.</b>", false);
            else if (temp == 1) MainScreen.text("\n\nMind-numbing pain courses through you as you feel your facial bones rearranging.  You clutch at your face in agony as your skin crawls and shifts, your visage reshaping to replace your facial characteristics with those of a feline. <b>You now have an anthropomorphic cat-face.</b>", false);
            else MainScreen.text("\n\nYour face is wracked with pain. You throw back your head and scream in agony as you feel your cheekbones breaking and shifting, reforming into something else. <b>Your facial features rearrange to take on many feline aspects.</b>", false);
            player.faceType = FACE.CAT;
            changes++;
        }
        if (Utils.rand(4) == 0 && player.upperBody.gills && changes < changeLimit) {
            MainScreen.text("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.", false);
            player.upperBody.gills = false;
            changes++;
        }
        //FAILSAFE CHANGE
        if (changes == 0) {
            MainScreen.text("\n\nInhuman vitality spreads through your body, invigorating you!\n", false);
            HPChange(50, true);
            dynStats("lus", 3);
        }
        if (changes < changeLimit) {
            if (Utils.rand(2) == 0) MainScreen.text(player.modThickness(5, 2), false);
            if (Utils.rand(2) == 0) MainScreen.text(player.modTone(76, 2), false);
            if (player.gender < 2) if (Utils.rand(2) == 0) MainScreen.text(player.modFem(65, 1), false);
            else MainScreen.text(player.modFem(85, 2), false);
        }
    }

    public reptilum(player: Player): void {
        player.slimeFeed();
        //init variables
        let changes: number = 0;
        let changeLimit: number = 1;
        let temp2: number = 0;
        //Utils.randomly choose affects limit
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(4) == 0) changeLimit++;
        if (player.perks.has("HistoryAlchemist")) changeLimit++;
        //clear screen
        MainScreen.text("", true);
        MainScreen.text("You uncork the vial of fluid and drink it down.  The taste is sour, like a dry wine with an aftertaste not entirely dissimilar to alcohol.  Instead of the warmth you'd expect, it leaves your throat feeling cold and a little numb.", false);

        //Statistical changes:
        //-Reduces speed down to 50.
        if (player.stats.spe > 50 && changes < changeLimit && Utils.rand(4) == 0) {
            MainScreen.text("\n\nYou start to feel sluggish and cold.  Lying down to bask in the sun might make you feel better.", false);
            dynStats("spe", -1);
            changes++;
        }
        //-Reduces sensitivity.
        if (player.stats.sens > 20 && changes < changeLimit && Utils.rand(3) == 0) {
            MainScreen.text("\n\nThe sensation of prickly pins and needles moves over your body, leaving your senses a little dulled in its wake.", false);
            dynStats("sen", -1);
            changes++;
        }
        //Raises libido greatly to 50, then somewhat to 75, then slowly to 100.
        if (player.stats.lib < 100 && changes < changeLimit && Utils.rand(3) == 0) {
            MainScreen.text("\n\nA knot of fire in your gut doubles you over but passes after a few moments.  As you straighten you can feel the heat seeping into you, ", false);
            //(DICK)
            if (player.lowerBody.cockSpot.count() > 0 && (player.gender != 3 || Utils.rand(2) == 0)) {
                MainScreen.text("filling ", false);
                if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("each of ", false);
                MainScreen.text("your " + multiCockDescriptLight() + " with the desire to breed.  You get a bit hornier when you realize your sex-drive has gotten a boost.", false);
            }
            //(COOCH)
            else if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text("puddling in your " + vaginaDescript(0) + ".  An instinctive desire to mate and lay eggs spreads through you, increasing your lust and boosting your sex-drive.", false);
            //(TARDS)
            else MainScreen.text("puddling in your featureless crotch for a split-second before it slides into your " + assDescript() + ".  You want to be fucked, filled, and perhaps even gain a proper gender again.  Through the lust you realize your sex-drive has been permanently increased.", false);
            //+3 lib if less than 50
            if (player.stats.lib < 50) dynStats("lib", 1);
            //+2 lib if less than 75
            if (player.stats.lib < 75) dynStats("lib", 1);
            //+1 if above 75.
            dynStats("lib", 1);
            changes++;
        }
        //-Raises toughness to 70
        //(+3 to 40, +2 to 55, +1 to 70)
        if (player.tou < 70 && changes < changeLimit && Utils.rand(3) == 0) {
            //(+3)
            if (player.tou < 40) {
                MainScreen.text("\n\nYour body and skin both thicken noticeably.  You pinch your " + player.skinDesc + " experimentally and marvel at how much tougher your hide has gotten.", false);
                dynStats("tou", 3);
            }
            //(+2)
            else if (player.tou < 55) {
                MainScreen.text("\n\nYou grin as you feel your form getting a little more solid.  It seems like your whole body is toughening up quite nicely, and by the time the sensation goes away, you feel ready to take a hit.", false);
                dynStats("tou", 2);
            }
            //(+1)
            else {
                MainScreen.text("\n\nYou snarl happily as you feel yourself getting even tougher.  It's a barely discernible difference, but you can feel your " + player.skinDesc + " getting tough enough to make you feel invincible.", false);
                dynStats("tou", 1);
            }
            changes++;
        }

        //Sexual Changes:
        //-Lizard dick - first one
        if (player.lizardCocks() == 0 && player.lowerBody.cockSpot.count() > 0 && changes < changeLimit && Utils.rand(4) == 0) {
            //Find the first non-lizzy dick
            for (temp2 = 0; temp2 < player.lowerBody.cockSpot.count(); temp2++) {
                //Stop loopahn when dick be found
                if (player.lowerBody.cockSpot.list[temp2].cockType != CockType.LIZARD) break;
            }
            MainScreen.text("\n\nA slow tingle warms your groin.  Before it can progress any further, you yank back your " + player.armorName + " to investigate.  Your " + cockDescript(temp2) + " is changing!  It ripples loosely from ", false);
            if (player.lowerBody.cockSpot.hasSheath()) MainScreen.text("sheath ", false);
            else MainScreen.text("base ", false);
            MainScreen.text("to tip, undulating and convulsing as its color lightens, darkens, and finally settles on a purplish hue.  Your " + Appearance.cockNoun(CockType.HUMAN) + " resolves itself into a bulbous form, with a slightly pointed tip.  The 'bulbs' throughout its shape look like they would provide an interesting ride for your sexual partners, but the perverse, alien pecker ", false);
            if (player.stats.cor < 33) MainScreen.text("horrifies you.", false);
            else if (player.stats.cor < 66) MainScreen.text("is a little strange for your tastes.", false);
            else {
                MainScreen.text("looks like it might be more fun to receive than use on others.  ", false);
                if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text("Maybe you could find someone else with one to ride?", false);
                else MainScreen.text("Maybe you should test it out on someone and ask them exactly how it feels?", false);
            }
            MainScreen.text("  <b>You now have a bulbous, lizard-like cock.</b>", false);
            //Actually xform it nau
            if (player.lowerBody.cockSpot.hasSheath()) {
                player.lowerBody.cockSpot.list[temp2].cockType = CockType.LIZARD;
                if (!player.lowerBody.cockSpot.hasSheath()) MainScreen.text("\n\nYour sheath tightens and starts to smooth out, revealing ever greater amounts of your " + cockDescript(temp2) + "'s lower portions.  After a few moments <b>your groin is no longer so animalistic – the sheath is gone.</b>", false);
            }
            else player.lowerBody.cockSpot.list[temp2].cockType = CockType.LIZARD;
            changes++;
            dynStats("lib", 3, "lus", 10);
        }
        //(CHANGE OTHER DICK)
        //Requires 1 lizard cock, multiple cocks
        if (player.lowerBody.cockSpot.count() > 1 && player.lizardCocks() > 0 && player.lowerBody.cockSpot.count() > player.lizardCocks() && Utils.rand(4) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nA familiar tingle starts in your crotch, and before you can miss the show, you pull open your " + player.armorName + ".  As if operating on a cue, ", false);
            for (temp2 = 0; temp2 < player.lowerBody.cockSpot.count(); temp2++) {
                //Stop loopahn when dick be found
                if (player.lowerBody.cockSpot.list[temp2].cockType != CockType.LIZARD) break;
            }
            if (player.lowerBody.cockSpot.count() == 2) MainScreen.text("your other dick", false);
            else MainScreen.text("another one of your dicks", false);
            MainScreen.text(" starts to change into the strange reptilian shape you've grown familiar with.  It warps visibly, trembling and radiating pleasurable feelings back to you as the transformation progresses.  ", false);
            if (player.cumQ() < 50) MainScreen.text("pre-cum oozes from the tip", false);
            else if (player.cumQ() < 700) MainScreen.text("Thick pre-cum rains from the tip", false);
            else MainScreen.text("A wave of pre-cum splatters on the ground", false);
            MainScreen.text(" from the pleasure of the change.  In moments <b>you have a bulbous, lizard-like cock.</b>", false);
            //(REMOVE SHEATH IF NECESSARY)
            if (player.lowerBody.cockSpot.hasSheath()) {
                player.lowerBody.cockSpot.list[temp2].cockType = CockType.LIZARD;
                if (!player.lowerBody.cockSpot.hasSheath()) MainScreen.text("\n\nYour sheath tightens and starts to smooth out, revealing ever greater amounts of your " + cockDescript(temp2) + "'s lower portions.  After a few moments <b>your groin is no longer so animalistic – the sheath is gone.</b>", false);
            }
            else player.lowerBody.cockSpot.list[temp2].cockType = CockType.LIZARD;
            changes++;
            dynStats("lib", 3, "lus", 10);
        }
        //-Grows second lizard dick if only 1 dick
        if (player.lizardCocks() == 1 && player.lowerBody.cockSpot.count() == 1 && Utils.rand(4) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nA knot of pressure forms in your groin, forcing you off your " + player.feet() + " as you try to endure it.  You examine the affected area and see a lump starting to bulge under your " + player.skinDesc + ", adjacent to your " + cockDescript(0) + ".  The flesh darkens, turning purple", false);
            if (player.skinType == SKIN.FUR || player.skinType == SKIN.SCALES)
                MainScreen.text(" and shedding " + player.skinDesc, false);
            MainScreen.text(" as the bulge lengthens, pushing out from your body.  Too surprised to react, you can only pant in pain and watch as the fleshy lump starts to take on a penis-like appearance.  <b>You're growing a second lizard-cock!</b>  It doesn't stop growing until it's just as long as its brother and the same shade of shiny purple.  A dribble of cum oozes from its tip, and you feel relief at last.", false);

            player.lowerBody.cockSpot.add(new Cock());
            player.lowerBody.cockSpot.list[1].cockType = CockType.LIZARD;
            player.lowerBody.cockSpot.list[1].cockLength = player.lowerBody.cockSpot.list[0].cockLength;
            player.lowerBody.cockSpot.list[1].cockThickness = player.lowerBody.cockSpot.list[0].cockThickness;
            changes++;
            dynStats("lib", 3, "lus", 10);
        }
        //--Worms leave if 100% lizard dicks?
        //Require mammals?
        if (player.lizardCocks() == player.lowerBody.cockSpot.count() && changes < changeLimit && player.statusAffects.has("Infested")) {
            MainScreen.text("\n\nLike rats from a sinking ship, worms escape from your body in a steady stream.  Surprisingly, the sensation is remarkably pleasant, similar to the pleasure of sexual release in a way.  Though they seem inexhaustible, the tiny, cum-slimed invertebrates slow to a trickle.  The larger worm-kin inside you stirs as if disturbed from a nap, coming loose from whatever moorings it had attached itself to in the interior of your form.  It slowly works its way up your urethra, stretching to an almost painful degree with every lurching motion.  Your dick bloats out around the base, stretched like the ovipositor on a bee-girl in order to handle the parasitic creature, but thankfully, the ordeal is a brief one.", false);
            if (player.lowerBody.balls > 1) MainScreen.text("  The remaining " + num2Text(player.lowerBody.balls - 1) + " slither out the pre-stretched holes with ease, though the last one hangs from your tip for a moment before dropping to the ground.", false);
            MainScreen.text("  The white creature joins its kin on the ground and slowly slithers away.  Perhaps they prefer mammals? In any event, <b>you are no longer infected with worms</b>.", false);
            player.statusAffects.remove("Infested");
            changes++;
        }
        //-Breasts vanish to 0 rating if male
        if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 1 && player.gender == 1 && changes < changeLimit && Utils.rand(3) == 0) {
            //(HUEG)
            if (player.upperBody.chest.BreastRatingLargest[0].breastRating > 8) {
                MainScreen.text("\n\nThe flesh on your chest tightens up, losing nearly half its mass in the span of a few seconds.  With your center of balance shifted so suddenly, you stagger about trying not to fall on your ass.  You catch yourself and marvel at the massive change in breast size.", false);
                //Half tit size
            }
            //(NOT HUEG < 4)
            else MainScreen.text("\n\nIn an instant, your chest compacts in on itself, consuming every ounce of breast-flesh.  You're left with a  smooth, masculine torso, though your nipples remain.", false);
            //(BOTH – no new PG)
            MainScreen.text("  With the change in weight and gravity, you find it's gotten much easier to move about.", false);
            //Loop through behind the scenes and adjust all tits.
            for (temp2 = 0; temp2 < player.upperBody.chest.count(); temp2++) {
                if (player.upperBody.chest.list[temp2].breastRating > 8) player.upperBody.chest.list[temp2].breastRating /= 2;
                else player.upperBody.chest.list[temp2].breastRating = 0;
            }
            //(+2 speed)
            dynStats("lib", 2);
            changes++;
        }
        //-Lactation stoppage.
        if (player.biggestLactation() >= 1 && changes < changeLimit && Utils.rand(4) == 0) {
            if (player.upperBody.chest.countNipples() == 2) MainScreen.text("\n\nBoth of your", false);
            else MainScreen.text("\n\nAll of your many", false);
            MainScreen.text(" nipples relax.  It's a strange feeling, and you pull back your top to touch one.  It feels fine, though there doesn't seem to be any milk leaking out.  You give it a squeeze and marvel when nothing ", false);
            if (player.upperBody.chest.hasFuckableNipples()) MainScreen.text("but sexual fluid ", false);
            MainScreen.text("escapes it.  <b>You are no longer lactating.</b>  That makes sense, only mammals lactate!  Smiling, you muse at how much time this will save you when cleaning your gear.", false);
            if (player.perks.has("Feeder") || player.statusAffects.has("Feeder")) {
                MainScreen.text("\n\n(<b>Feeder perk lost!</b>)", false);
                player.perks.remove("Feeder");
                player.statusAffects.remove("Feeder");
            }
            changes++;
            //Loop through and reset lactation
            for (temp2 = 0; temp2 < player.upperBody.chest.count(); temp2++) {
                player.upperBody.chest.list[temp2].lactationMultiplier = 0;
            }
        }
        //-Nipples reduction to 1 per tit.
        if (player.averageNipplesPerBreast() > 1 && changes < changeLimit && Utils.rand(4) == 0) {
            MainScreen.text("\n\nA chill runs over your " + allBreastsDescript() + " and vanishes.  You stick a hand under your " + player.armorName + " and discover that your extra nipples are missing!  You're down to just one per ", false);
            if (player.upperBody.chest.BreastRatingLargest[0].breastRating < 1) MainScreen.text("'breast'.", false);
            else MainScreen.text("breast.", false);
            changes++;
            //Loop through and reset nipples
            for (temp2 = 0; temp2 < player.upperBody.chest.count(); temp2++) {
                player.upperBody.chest.list[temp2].nipplesPerBreast = 1;
            }
        }
        //-VAGs
        if (player.lowerBody.vaginaSpot.hasVagina() && !player.perks.has("Oviposition") && changes < changeLimit && Utils.rand(5) == 0 && player.lizardScore() > 3) {
            MainScreen.text("\n\nDeep inside yourself there is a change.  It makes you feel a little woozy, but passes quickly.  Beyond that, you aren't sure exactly what just happened, but you are sure it originated from your womb.\n", false);
            MainScreen.text("(<b>Perk Gained: Oviposition</b>)", false);
            player.createPerk(PerkLib.Oviposition, 0, 0, 0, 0);
            changes++;
        }

        //Physical changes:
        //-Existing horns become draconic, max of 4, max length of 1'
        if (player.hornType != HORNS.DRACONIC_X4_12_INCH_LONG && changes < changeLimit && Utils.rand(5) == 0) {
            //No dragon horns yet.
            if (player.hornType != HORNS.DRACONIC_X2 && player.hornType != HORNS.DRACONIC_X4_12_INCH_LONG) {
                //Already have horns
                if (player.horns > 0) {
                    //High quantity demon horns
                    if (player.hornType == HORNS.DEMON && player.horns > 4) {
                        MainScreen.text("\n\nYour horns condense, twisting around each other and merging into larger, pointed protrusions.  By the time they finish you have four draconic-looking horns, each about twelve inches long.", false);
                        player.horns = 12;
                        player.hornType = HORNS.DRACONIC_X4_12_INCH_LONG;
                    }
                    else {
                        MainScreen.text("\n\nYou feel your horns changing and warping, and reach back to touch them.  They have a slight curve and a gradual taper.  They must look something like the horns the dragons in your village's legends always had.", false);
                        player.hornType = HORNS.DRACONIC_X2;
                        if (player.horns > 13) {
                            MainScreen.text("  The change seems to have shrunken the horns, they're about a foot long now.", false);
                            player.horns = 12;
                        }

                    }
                    changes++;
                }
                //No horns
                else {
                    //-If no horns, grow a pair
                    MainScreen.text("\n\nWith painful pressure, the skin on the sides of your forehead splits around two tiny nub-like horns.  They're angled back in such a way as to resemble those you saw on the dragons in your village's legends.  A few inches of horn sprout from your head before stopping.  <b>You have about four inches of dragon-like horn.</b>", false);
                    player.horns = 4;
                    player.hornType = HORNS.DRACONIC_X2;

                    changes++;
                }
            }
            //ALREADY DRAGON
            else {
                if (player.hornType == HORNS.DRACONIC_X2) {
                    if (player.horns < 12) {
                        if (Utils.rand(2) == 0) {
                            MainScreen.text("\n\nYou get a headache as an inch of fresh horn escapes from your pounding skull.", false);
                            player.horns += 1;
                        }
                        else {
                            MainScreen.text("\n\nYour head aches as your horns grow a few inches longer.  They get even thicker about the base, giving you a menacing appearance.", false);
                            player.horns += 2 + Utils.rand(4);
                        }
                        if (player.horns >= 12) MainScreen.text("  <b>Your horns settle down quickly, as if they're reached their full size.</b>", false);
                        changes++;
                    }
                    //maxxed out, new row
                    else {
                        //--Next horn growth adds second row and brings length up to 12\"
                        MainScreen.text("\n\nA second row of horns erupts under the first, and though they are narrower, they grow nearly as long as your first row before they stop.  A sense of finality settles over you.  <b>You have as many horns as a lizan can grow.</b>", false);
                        player.hornType = HORNS.DRACONIC_X4_12_INCH_LONG;
                        changes++;
                    }
                }
            }
        }
        //-Hair stops growing!
        if (flags[FlagEnum.HAIR.GROWTH_STOPPED_BECAUSE_LIZARD] == 0 && changes < changeLimit && Utils.rand(4) == 0) {
            MainScreen.text("\n\nYour scalp tingles oddly.  In a panic, you reach up to your " + hairDescript() + ", but thankfully it appears unchanged.\n\n", false);
            MainScreen.text("(<b>Your hair has stopped growing.</b>)", false);
            changes++;
            flags[FlagEnum.HAIR.GROWTH_STOPPED_BECAUSE_LIZARD]++;
        }
        //Big physical changes:
        //-Legs – Draconic, clawed feet
        if (player.lowerBody != LOWER_BODY.LIZARD && changes < changeLimit && Utils.rand(5) == 0) {
            //Hooves -
            if (player.lowerBody == LOWER_BODY.HOOFED) MainScreen.text("\n\nYou scream in agony as you feel your hooves crack and break apart, beginning to rearrange.  Your legs change to a digitigrade shape while your feet grow claws and shift to have three toes on the front and a smaller toe on the heel.", false);
            //TAURS -
            else if (player.lowerBody == LOWER_BODY.CENTAUR) MainScreen.text("\n\nYour lower body is wracked by pain!  Once it passes, you discover that you're standing on digitigrade legs with lizard-like claws.", false);
            //feet types -
            else if (player.lowerBody == LOWER_BODY.HUMAN || player.lowerBody == LOWER_BODY.DOG || player.lowerBody == LOWER_BODY.DEMONIC_HIGH_HEELS || player.lowerBody == LOWER_BODY.DEMONIC_CLAWS || player.lowerBody == LOWER_BODY.BEE || player.lowerBody == LOWER_BODY.CAT || player.lowerBody == LOWER_BODY.LIZARD) MainScreen.text("\n\nYou scream in agony as you feel the bones in your legs break and begin to rearrange. They change to a digitigrade shape while your feet grow claws and shift to have three toes on the front and a smaller toe on the heel.", false);
            //Else –
            else MainScreen.text("\n\nPain rips through your " + player.legs() + ", morphing and twisting them until the bones rearrange into a digitigrade configuration.  The strange legs have three-toed, clawed feet, complete with a small vestigial claw-toe on the back for added grip.", false);
            MainScreen.text("  <b>You have reptilian legs and claws!</b>", false);
            player.lowerBody = LOWER_BODY.LIZARD;
            changes++;
        }
        //-Tail – sinuous lizard tail
        if (player.tailType != TAIL.LIZARD && player.lowerBody == LOWER_BODY.LIZARD && changes < changeLimit && Utils.rand(5) == 0) {
            //No tail
            if (player.tailType == TAIL.NONE) MainScreen.text("\n\nYou drop onto the ground as your spine twists and grows, forcing the flesh above your " + assDescript() + " to bulge out.  New bones form, one after another, building a tapered, prehensile tail onto the back of your body.  <b>You now have a reptilian tail!</b>", false);
            //Yes tail
            else MainScreen.text("\n\nYou drop to the ground as your tail twists and grows, changing its shape in order to gradually taper to a point.  It flicks back and forth, prehensile and totally under your control.  <b>You now have a reptilian tail.</b>", false);
            player.tailType = TAIL.LIZARD;
            changes++;
        }
        //Remove odd eyes
        if (changes < changeLimit && Utils.rand(5) == 0 && player.eyeType > EYES.HUMAN) {
            if (player.eyeType == EYES.BLACK_EYES_SAND_TRAP) {
                MainScreen.text("\n\nYou feel a twinge in your eyes and you blink.  It feels like black cataracts have just fallen away from you, and you know without needing to see your reflection that your eyes have gone back to looking human.");
            }
            else {
                MainScreen.text("\n\nYou blink and stumble, a wave of vertigo threatening to pull your " + player.feet() + " from under you.  As you steady and open your eyes, you realize something seems different.  Your vision is changed somehow.", false);
                if (player.eyeType == EYES.FOUR_SPIDER_EYES) MainScreen.text("  Your multiple, arachnid eyes are gone!</b>", false);
                MainScreen.text("  <b>You have normal, humanoid eyes again.</b>", false);
            }
            player.eyeType = EYES.HUMAN;
            changes++;
        }
        //-Ears become smaller nub-like openings?
        if (player.upperBody.head.earType != EARS.LIZARD && player.tailType == TAIL.LIZARD && player.lowerBody == LOWER_BODY.LIZARD && changes < changeLimit && Utils.rand(5) == 0) {
            MainScreen.text("\n\nTightness centers on your scalp, pulling your ears down from their normal, fleshy shape into small, scaley bumps with holes in their centers.  <b>You have reptilian ears!</b>", false);
            player.upperBody.head.earType = EARS.LIZARD;
            changes++;
        }
        //-Scales – color changes to red, green, white, blue, or black.  Rarely: purple or silver.
        if (player.skinType != SKIN.SCALES && player.upperBody.head.earType == EARS.LIZARD && player.tailType == TAIL.LIZARD && player.lowerBody == LOWER_BODY.LIZARD && changes < changeLimit && Utils.rand(5) == 0) {
            //(fur)
            if (player.skinType == SKIN.FUR) {
                //set new skinTone
                if (Utils.rand(10) == 0) {
                    if (Utils.rand(2) == 0) player.skinTone = "purple";
                    else player.skinTone = "silver";
                }
                //non rare skinTone
                else {
                    temp = Utils.rand(5);
                    if (temp == 0) player.skinTone = "red";
                    else if (temp == 1) player.skinTone = "green";
                    else if (temp == 2) player.skinTone = "white";
                    else if (temp == 3) player.skinTone = "blue";
                    else player.skinTone = "black";
                }
                MainScreen.text("\n\nYou scratch yourself, and come away with a large clump of " + player.hairColor + " fur.  Panicked, you look down and realize that your fur is falling out in huge clumps.  It itches like mad, and you scratch your body relentlessly, shedding the remaining fur with alarming speed.  Underneath the fur your skin feels incredibly smooth, and as more and more of the stuff comes off, you discover a seamless layer of " + player.skinTone + " scales covering most of your body.  The rest of the fur is easy to remove.  <b>You're now covered in scales from head to toe.</b>", false);
            }
            //(no fur)
            else {
                MainScreen.text("\n\nYou idly reach back to scratch yourself and nearly jump out of your " + player.armorName + " when you hit something hard.  A quick glance down reveals that scales are growing out of your " + player.skinTone + " skin with alarming speed.  As you watch, the surface of your skin is covered in smooth scales.  They interlink together so well that they may as well be seamless.  You peel back your " + player.armorName + " and the transformation has already finished on the rest of your body.  <b>You're covered from head to toe in shiny ", false);
                //set new skinTone
                if (Utils.rand(10) == 0) {
                    if (Utils.rand(2) == 0) player.skinTone = "purple";
                    else player.skinTone = "silver";
                }
                //non rare skinTone
                else {
                    temp = Utils.rand(5);
                    if (temp == 0) player.skinTone = "red";
                    else if (temp == 1) player.skinTone = "green";
                    else if (temp == 2) player.skinTone = "white";
                    else if (temp == 3) player.skinTone = "blue";
                    else player.skinTone = "black";
                }
                MainScreen.text(player.skinTone + " scales.</b>", false);
            }
            player.skinType = SKIN.SCALES;
            player.skinDesc = "scales";
            changes++;
        }
        //-Lizard-like face.
        if (player.faceType != FACE.LIZARD && player.skinType == SKIN.SCALES && player.upperBody.head.earType == EARS.LIZARD && player.tailType == TAIL.LIZARD && player.lowerBody == LOWER_BODY.LIZARD && changes < changeLimit && Utils.rand(5) == 0) {
            MainScreen.text("\n\nTerrible agony wracks your " + player.face() + " as bones crack and shift.  Your jawbone rearranges while your cranium shortens.  The changes seem to last forever; once they've finished, no time seems to have passed.  Your fingers brush against your toothy snout as you get used to your new face.  It seems <b>you have a toothy, reptilian visage now.</b>", false);
            player.faceType = FACE.LIZARD;
        }
        if (Utils.rand(4) == 0 && player.upperBody.gills && changes < changeLimit) {
            MainScreen.text("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.", false);
            player.upperBody.gills = false;
            changes++;
        }
        //FAILSAFE CHANGE
        if (changes == 0) {
            MainScreen.text("\n\nInhuman vitality spreads through your body, invigorating you!\n", false);
            HPChange(50, true);
            dynStats("lus", 3);
        }
    }

    /*
            public  wingStick(player:Player):void
            {
                MainScreen.text("You toss a wingstick at your foe!  It flies straight and true, almost as if it has a mind of its own as it arcs towards " + monster.a + monster.short + "!\n", true);
                //1% dodge for each point of speed over 80
                if (monster.spe - 80 > Utils.rand(100) + 1) {
                    MainScreen.text("Somehow " + monster.a + monster.short + "'", false);
                    if (!monster.plural) MainScreen.text("s", false);
                    MainScreen.text(" incredible speed allows " + monster.pronoun2 + " to avoid the spinning blades!  The deadly device shatters when it impacts something in the distance.", false);
                }
                //Not dodged
                else {
                    let damage:number = 40 + Utils.rand(61);
                    MainScreen.text(monster.capitalA + monster.short + " is hit with the wingstick!  It breaks apart as it lacerates " + monster.pronoun2 + ". (" + damage + ")", false);
                    monster.HP -= damage;
                    if (monster.HP < 0) monster.HP = 0;
                }
            }
    */

    public neonPinkEgg(pregnantChange: boolean, player: Player): void {
        let changes: number = 0;
        let changeLimit: number = 1;
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(2) == 0) changeLimit++;
        if (player.perks.has("HistoryAlchemist")) changeLimit++;
        //If this is a pregnancy change, only 1 change per proc.
        if (pregnantChange) changeLimit = 1;
        else MainScreen.text("", true);
        //If not pregnancy, mention eating it.
        if (!pregnantChange) MainScreen.text("You eat the neon pink egg, and to your delight it tastes sweet, like candy.  In seconds you've gobbled down the entire thing, and you lick your fingers clean before you realize you ate the shell – and it still tasted like candy.", false);
        //If pregnancy, warning!
        if (pregnantChange) {
            MainScreen.text("\n<b>Your egg-stuffed ", false);
            if (player.pregnancyType == PregnancyType.BUNNY) {
                MainScreen.text("womb ", false);
                if (player.buttPregnancyType == PregnancyType.BUNNY) MainScreen.text("and ", false);
            }
            if (player.buttPregnancyType == PregnancyType.BUNNY) MainScreen.text("backdoor ", false);
            if (player.buttPregnancyType == PregnancyType.BUNNY && player.pregnancyType == PregnancyType.BUNNY) MainScreen.text("rumble", false);
            else MainScreen.text("rumbles", false);
            MainScreen.text(" oddly, and you have a hunch that something's about to change</b>.", false);
        }
        //STATS CHANGURYUUUUU
        //Boost speed (max 80!)
        if (changes < changeLimit && Utils.rand(3) == 0 && player.stats.spe < 80) {
            if (player.stats.spe < 30) MainScreen.text("\n\nTingles run through your muscles, and your next few movements seem unexpectedly fast.  The egg somehow made you faster!", false);
            else if (player.stats.spe < 50) MainScreen.text("\n\nYou feel tingles running through your body, and after a moment, it's clear that you're getting faster.", false);
            else if (player.stats.spe < 65) MainScreen.text("\n\nThe tight, ready feeling you've grown accustomed to seems to intensify, and you know in the back of your mind that you've become even faster.", false);
            else MainScreen.text("\n\nSomething changes in your physique, and you grunt, chopping an arm through the air experimentally.  You seem to move even faster than before, confirming your suspicions.", false);
            changes++;
            if (player.stats.spe < 35) dynStats("spe", 1);
            dynStats("spe", 1);
        }
        //Boost libido
        if (changes < changeLimit && Utils.rand(5) == 0) {
            changes++;
            dynStats("lib", 1, "lus", (5 + player.stats.lib / 7));
            if (player.stats.lib < 30) dynStats("lib", 1);
            if (player.stats.lib < 40) dynStats("lib", 1);
            if (player.stats.lib < 60) dynStats("lib", 1);
            //Lower ones are gender specific for some reason
            if (player.stats.lib < 60) {
                //(Cunts or assholes!
                if (!player.lowerBody.cockSpot.hasCock() || (player.gender == 3 && Utils.rand(2) == 0)) {
                    if (player.stats.lib < 30) {
                        MainScreen.text("\n\nYou squirm a little and find your eyes glancing down to your groin.  Strange thoughts jump to mind, wondering how it would feel to breed until you're swollen and pregnant.  ", false);
                        if (player.stats.cor < 25) MainScreen.text("You're repulsed by such shameful thoughts.", false);
                        else if (player.stats.cor < 60) MainScreen.text("You worry that this place is really getting to you.", false);
                        else if (player.stats.cor < 90) MainScreen.text("You pant a little and wonder where the nearest fertile male is.", false);
                        else MainScreen.text("You grunt and groan with desire and disappointment.  You should get bred soon!", false);
                    }
                    else MainScreen.text("\n\nYour mouth rolls open as you start to pant with desire.  Did it get hotter?  Your hand reaches down to your " + player.assholeOrPussy() + ", and you're struck by just how empty it feels.  The desire to be filled, not by a hand or a finger but by a virile male, rolls through you like a wave, steadily increasing your desire for sex.", false);
                }
                //WANGS!
                if (player.lowerBody.cockSpot.hasCock()) {
                    if (player.stats.lib < 30) {
                        MainScreen.text("\n\nYou squirm a little and find your eyes glancing down to your groin.  Strange thoughts jump to mind, wondering how it would feel to fuck a ", false);
                        if (Utils.rand(2) == 0) MainScreen.text("female hare until she's immobilized by all her eggs", false);
                        else MainScreen.text("herm rabbit until her sack is so swollen that she's forced to masturbate over and over again just to regain mobility", false);
                        MainScreen.text(". ", false);
                        if (player.stats.cor < 25) MainScreen.text("You're repulsed by such shameful thoughts.", false);
                        else if (player.stats.cor < 50) MainScreen.text("You worry that this place is really getting to you.", false);
                        else if (player.stats.cor < 75) MainScreen.text("You pant a little and wonder where the nearest fertile female is.", false);
                        else MainScreen.text("You grunt and groan with desire and disappointment.  Gods you need to fuck!", false);
                    }
                    else MainScreen.text("\n\nYour mouth rolls open as you start to pant with desire.  Did it get hotter?  Your hand reaches down to " + sMultiCockDesc() + ", and you groan from how tight and hard it feels.  The desire to squeeze it, not with your hand but with a tight pussy or puckered asshole, runs through you like a wave, steadily increasing your desire for sex.", false);
                }
            }
            //Libido over 60? FUCK YEAH!
            else if (player.stats.lib < 80) {
                MainScreen.text("\n\nYou fan your neck and start to pant as your " + player.skinTone + " skin begins to flush red with heat", false);
                if (player.skinType > SKIN.PLAIN) MainScreen.text(" through your " + player.skinDesc, false);
                MainScreen.text(".  ", false);
                if (player.gender == 1) MainScreen.text("Compression tightens down on " + sMultiCockDesc() + " as it strains against your " + player.armorName + ".  You struggle to fight down your heightened libido, but it's hard – so very hard.", false);
                else if (player.gender == 0) MainScreen.text("Sexual hunger seems to gnaw at your " + assholeDescript() + ", demanding it be filled, but you try to resist your heightened libido.  It's so very, very hard.", false);
                else if (player.gender == 2) MainScreen.text("Moisture grows between your rapidly-engorging vulva, making you squish and squirm as you try to fight down your heightened libido, but it's hard – so very hard.", false);
                else MainScreen.text("Steamy moisture and tight compression war for your awareness in your groin as " + sMultiCockDesc() + " starts to strain against your " + player.armorName + ".  Your vulva engorges with blood, growing slicker and wetter.  You try so hard to fight down your heightened libido, but it's so very, very hard.  The urge to breed lingers in your mind, threatening to rear its ugly head.", false);
            }
            //MEGALIBIDO
            else {
                MainScreen.text("\n\nDelicious, unquenchable desire rises higher and higher inside you, until you're having trouble tamping it down all the time.  A little, nagging voice questions why you would ever want to tamp it down.  It feels so good to give in and breed that you nearly cave to the delicious idea on the spot.  Life is beginning to look increasingly like constant fucking or masturbating in a lust-induced haze, and you're having a harder and harder time finding fault with it.  ", false);
                if (player.stats.cor < 33) MainScreen.text("You sigh, trying not to give in completely.", false);
                else if (player.stats.cor < 66) MainScreen.text("You pant and groan, not sure how long you'll even want to resist.", false);
                else {
                    MainScreen.text("You smile and wonder if you can ", false);
                    if (player.stats.lib < 100) MainScreen.text("get your libido even higher.", false);
                    else MainScreen.text("find someone to fuck right now.", false);
                }
            }
        }
        //BIG sensitivity gains to 60.
        if (player.stats.sens < 60 && changes < changeLimit && Utils.rand(3) == 0) {
            changes++;
            MainScreen.text("\n\n", false);
            //(low)
            if (Utils.rand(3) != 2) {
                MainScreen.text("The feeling of small breezes blowing over your " + player.skinDesc + " gets a little bit stronger.  How strange.  You pinch yourself and nearly jump when it hurts a tad more than you'd think. You've gotten more sensitive!", false);
                dynStats("sen", 5);
            }
            //(BIG boost 1/3 chance)
            else {
                dynStats("sen", 15);
                MainScreen.text("Every movement of your body seems to bring heightened waves of sensation that make you woozy.  Your " + player.armorName + " rubs your " + nippleDescript(0) + "s deliciously", false);
                if (player.upperBody.chest.hasFuckableNipples()) {
                    MainScreen.text(", sticking to the ", false);
                    if (player.biggestLactation() > 2) MainScreen.text("milk-leaking nipple-twats", false);
                    else MainScreen.text("slippery nipple-twats", false);
                }
                else if (player.biggestLactation() > 2) MainScreen.text(", sliding over the milk-leaking teats with ease", false);
                else MainScreen.text(" catching on each of the hard nubs repeatedly", false);
                MainScreen.text(".  Meanwhile, your crotch... your crotch is filled with such heavenly sensations from ", false);
                if (player.gender == 1) {
                    MainScreen.text(sMultiCockDesc() + " and your ", false);
                    if (player.lowerBody.balls > 0) MainScreen.text(ballsDescriptLight(), false);
                    else MainScreen.text(assholeDescript(), false);
                }
                else if (player.gender == 2) MainScreen.text("your " + vaginaDescript(0) + " and " + clitDescript(), false);
                else if (player.gender == 3) {
                    MainScreen.text(sMultiCockDesc() + ", ", false);
                    if (player.lowerBody.balls > 0) MainScreen.text(ballsDescriptLight() + ", ", false);
                    MainScreen.text(vaginaDescript(0) + ", and " + clitDescript(), false);
                }
                //oh god genderless
                else MainScreen.text("you " + assholeDescript(), false);
                MainScreen.text(" that you have to stay stock-still to keep yourself from falling down and masturbating on the spot.  Thankfully the orgy of tactile bliss fades after a minute, but you still feel way more sensitive than your previous norm.  This will take some getting used to!", false);
            }
        }
        //Makes girls very girl(90), guys somewhat girly (61).
        if (changes < changeLimit && Utils.rand(2) == 0) {
            let buffer: string = "";
            if (player.gender < 2) buffer += player.modFem(61, 4);
            else buffer += player.modFem(90, 4);
            if (buffer != "") {
                MainScreen.text(buffer, false);
                changes++;
            }
        }

        //De-wettification of cunt (down to 3?)!
        if (player.wetness() > 3 && changes < changeLimit && Utils.rand(3) == 0) {
            //Just to be safe
            if (player.lowerBody.vaginaSpot.hasVagina()) {
                MainScreen.text("\n\nThe constant flow of fluids that sluice from your " + vaginaDescript(0) + " slow down, leaving you feeling a bit less like a sexual slip-'n-slide.", false);
                player.vaginas[0].vaginalWetness--;
                changes++;
            }
        }
        //Fertility boost!
        if (changes < changeLimit && Utils.rand(4) == 0 && player.fertility < 50 && player.lowerBody.vaginaSpot.hasVagina()) {
            player.fertility += 2 + Utils.rand(5);
            changes++;
            MainScreen.text("\n\nYou feel strange.  Fertile... somehow.  You don't know how else to think of it, but you know your body is just aching to be pregnant and give birth.", false);
        }
        //-VAGs
        if (player.lowerBody.vaginaSpot.hasVagina() && !player.perks.has("BunnyEggs") && changes < changeLimit && Utils.rand(4) == 0 && player.bunnyScore() > 3) {
            MainScreen.text("\n\nDeep inside yourself there is a change.  It makes you feel a little woozy, but passes quickly.  Beyond that, you aren't sure exactly what just happened, but you are sure it originated from your womb.\n\n", false);
            MainScreen.text("(<b>Perk Gained: Bunny Eggs</b>)", false);
            player.createPerk(PerkLib.BunnyEggs, 0, 0, 0, 0);
            changes++;
        }
        //Shrink Balls!
        if (player.lowerBody.balls > 0 && player.lowerBody.ballSize > 5 && Utils.rand(3) == 0 && changes < changeLimit) {
            if (player.lowerBody.ballSize < 10) {
                MainScreen.text("\n\nRelief washes through your groin as your " + ballsDescript() + " lose about an inch of their diameter.", false);
                player.lowerBody.ballSize--;
            }
            else if (player.lowerBody.ballSize < 25) {
                MainScreen.text("\n\nRelief washes through your groin as your " + ballsDescript() + " lose a few inches of their diameter.  Wow, it feels so much easier to move!", false);
                player.lowerBody.ballSize -= (2 + Utils.rand(3));
            }
            else {
                MainScreen.text("\n\nRelief washes through your groin as your " + ballsDescript() + " lose at least six inches of diameter.  Wow, it feels SOOOO much easier to move!", false);
                player.lowerBody.ballSize -= (6 + Utils.rand(3));
            }
            changes++;
        }
        //Get rid of extra balls
        if (player.lowerBody.balls > 2 && changes < changeLimit && Utils.rand(3) == 0) {
            changes++;
            MainScreen.text("\n\nThere's a tightening in your " + sackDescript() + " that only gets higher and higher until you're doubled over and wheezing.  When it passes, you reach down and discover that <b>two of your testicles are gone.</b>", false);
            player.lowerBody.balls -= 2;
        }
        //Boost cum production
        if ((player.lowerBody.balls > 0 || player.lowerBody.cockSpot.hasCock()) && player.cumQ() < 3000 && Utils.rand(3) == 0 && changeLimit > 1) {
            changes++;
            player.cumMultiplier += 3 + Utils.rand(7);
            if (player.cumQ() >= 250) dynStats("lus", 3);
            if (player.cumQ() >= 750) dynStats("lus", 4);
            if (player.cumQ() >= 2000) dynStats("lus", 5);
            //Balls
            if (player.lowerBody.balls > 0) {
                //(Small cum quantity) < 50
                if (player.cumQ() < 50) MainScreen.text("\n\nA twinge of discomfort runs through your " + ballsDescriptLight() + ", but quickly vanishes.  You heft your orbs but they haven't changed in size – they just feel a little bit denser.", false);
                //(medium cum quantity) < 250
                else if (player.cumQ() < 250) {
                    MainScreen.text("\n\nA ripple of discomfort runs through your " + ballsDescriptLight() + ", but it fades into a pleasant tingling.  You reach down to heft the orbs experimentally but they don't seem any larger.", false);
                    if (player.lowerBody.cockSpot.hasCock()) MainScreen.text("  In the process, you brush " + sMultiCockDesc() + " and discover a bead of pre leaking at the tip.", false);
                }
                //(large cum quantity) < 750
                else if (player.cumQ() < 750) {
                    MainScreen.text("\n\nA strong contraction passes through your " + sackDescript() + ", almost painful in its intensity.  ", false);
                    if (player.lowerBody.cockSpot.hasCock()) MainScreen.text(SMultiCockDesc() + " leaks and dribbles pre-cum down your " + player.legs() + " as your body's cum production kicks up even higher.", false);
                    else MainScreen.text("You wince, feeling pent up and yet unable to release.  You really wish you had a cock right about now.", false);
                }
                //(XL cum quantity) < 2000
                else if (player.cumQ() < 2000) {
                    MainScreen.text("\n\nAn orgasmic contraction wracks your " + ballsDescriptLight() + ", shivering through the potent orbs and passing as quickly as it came.  ", false);
                    if (player.lowerBody.cockSpot.hasCock()) MainScreen.text("A thick trail of slime leaks from " + sMultiCockDesc() + " down your " + player.leg() + ", pooling below you.", false);
                    else MainScreen.text("You grunt, feeling terribly pent-up and needing to release.  Maybe you should get a penis to go with these balls...", false);
                    MainScreen.text("  It's quite obvious that your cum production has gone up again.", false);
                }
                //(XXL cum quantity)
                else {
                    MainScreen.text("\n\nA body-wrenching contraction thrums through your " + ballsDescriptLight() + ", bringing with it the orgasmic feeling of your body kicking into cum-production overdrive.  ", false);
                    if (player.lowerBody.cockSpot.hasCock()) MainScreen.text("pre-cum explodes from " + sMultiCockDesc() + ", running down your " + player.leg() + " and splattering into puddles that would shame the orgasms of lesser " + player.mf("males", "persons") + ".  You rub yourself a few times, nearly starting to masturbate on the spot, but you control yourself and refrain for now.", false);
                    else MainScreen.text("You pant and groan but the pleasure just turns to pain.  You're so backed up – if only you had some way to vent all your seed!", false);
                }
            }
            //NO BALLZ (guaranteed cock tho)
            else {
                //(Small cum quantity) < 50
                if (player.cumQ() < 50) MainScreen.text("\n\nA twinge of discomfort runs through your body, but passes before you have any chance to figure out exactly what it did.", false);
                //(Medium cum quantity) < 250)
                else if (player.cumQ() < 250) MainScreen.text("\n\nA ripple of discomfort runs through your body, but it fades into a pleasant tingling that rushes down to " + sMultiCockDesc() + ".  You reach down to heft yourself experimentally and smile when you see pre-beading from your maleness.  Your cum production has increased!", false);
                //(large cum quantity) < 750
                else if (player.cumQ() < 750) MainScreen.text("\n\nA strong contraction passes through your body, almost painful in its intensity.  " + SMultiCockDesc() + " leaks and dribbles pre-cum down your " + player.legs() + " as your body's cum production kicks up even higher!  Wow, it feels kind of... good.", false);
                //(XL cum quantity) < 2000
                else if (player.cumQ() < 2000) MainScreen.text("\n\nAn orgasmic contraction wracks your abdomen, shivering through your midsection and down towards your groin.  A thick trail of slime leaks from " + sMultiCockDesc() + "  and trails down your " + player.leg() + ", pooling below you.  It's quite obvious that your body is producing even more cum now.", false);
                //(XXL cum quantity)
                else MainScreen.text("\n\nA body-wrenching contraction thrums through your gut, bringing with it the orgasmic feeling of your body kicking into cum-production overdrive.  pre-cum explodes from " + sMultiCockDesc() + ", running down your " + player.legs() + " and splattering into puddles that would shame the orgasms of lesser " + player.mf("males", "persons") + ".  You rub yourself a few times, nearly starting to masturbate on the spot, but you control yourself and refrain for now.", false);
            }
        }
        //Bunny feet! - requirez earz
        if (player.lowerBody != LOWER_BODY.BUNNY && changes < changeLimit && Utils.rand(5) == 0 && player.upperBody.head.earType == EARS.BUNNY) {
            //Taurs
            if (player.isTaur()) MainScreen.text("\n\nYour quadrupedal hind-quarters seizes, overbalancing your surprised front-end and causing you to stagger and fall to your side.  Pain lances throughout, contorting your body into a tightly clenched ball of pain while tendons melt and bones break, melt, and regrow.  When it finally stops, <b>you look down to behold your new pair of fur-covered rabbit feet</b>!", false);
            //Non-taurs
            else {
                MainScreen.text("\n\nNumbness envelops your " + player.legs() + " as they pull tighter and tighter.  You overbalance and drop on your " + assDescript(), false);
                if (player.tailType > TAIL.NONE) MainScreen.text(", nearly smashing your tail flat", false);
                else MainScreen.text(" hard enough to sting", false);
                MainScreen.text(" while the change works its way through you.  Once it finishes, <b>you discover that you now have fuzzy bunny feet and legs</b>!", false);
            }
            changes++;
            player.lowerBody = LOWER_BODY.BUNNY;
        }
        //BUN FACE!  REQUIREZ EARZ
        if (player.upperBody.head.earType == EARS.BUNNY && player.faceType != FACE.BUNNY && Utils.rand(3) == 0 && changes < changeLimit) {
            MainScreen.text("\n\n", false);
            changes++;
            //Human(ish) face
            if (player.faceType == FACE.HUMAN || player.faceType == FACE.SHARK_TEETH) MainScreen.text("You catch your nose twitching on its own at the bottom of your vision, but as soon as you focus on it, it stops.  A moment later, some of your teeth tingle and brush past your lips, exposing a white pair of buckteeth!  <b>Your face has taken on some rabbit-like characteristics!</b>", false);
            //Crazy furry TF shit
            else MainScreen.text("You grunt as your " + player.face() + " twists and reforms.  Even your teeth ache as their positions are rearranged to match some new, undetermined order.  When the process finishes, <b>you're left with a perfectly human looking face, save for your constantly twitching nose and prominent buck-teeth.</b>", false);
            player.faceType = FACE.BUNNY;
        }
        //DAH BUNBUN EARZ - requires poofbutt!
        if (player.upperBody.head.earType != EARS.BUNNY && changes < changeLimit && Utils.rand(3) == 0 && player.tailType == TAIL.RABBIT) {
            MainScreen.text("\n\nYour ears twitch and curl in on themselves, sliding around on the flesh of your head.  They grow warmer and warmer before they finally settle on the top of your head and unfurl into long, fluffy bunny-ears.  <b>You now have a pair of bunny ears.</b>", false);
            player.upperBody.head.earType = EARS.BUNNY;
            changes++;
        }
        //DAH BUNBUNTAILZ
        if (player.tailType != TAIL.RABBIT && Utils.rand(2) == 0 && changes < changeLimit) {
            if (player.tailType > TAIL.NONE) MainScreen.text("\n\nYour tail burns as it shrinks, pulling tighter and tighter to your backside until it's the barest hint of a stub.  At once, white, poofy fur explodes out from it.  <b>You've got a white bunny-tail!  It even twitches when you aren't thinking about it.</b>", false);
            else MainScreen.text("\n\nA burning pressure builds at your spine before dissipating in a rush of relief. You reach back and discover a small, fleshy tail that's rapidly growing long, poofy fur.  <b>You have a rabbit tail!</b>", false);
            player.tailType = TAIL.RABBIT;
            changes++;
        }
        if (Utils.rand(4) == 0 && player.upperBody.gills && changes < changeLimit) {
            MainScreen.text("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.", false);
            player.upperBody.gills = false;
            changes++;
        }
        //Bunny Breeder Perk?
        //FAILSAAAAFE
        if (changes == 0) {
            if (player.stats.lib < 100) changes++;
            dynStats("lib", 1, "lus", (5 + player.stats.lib / 7));
            if (player.stats.lib < 30) dynStats("lib", 1);
            if (player.stats.lib < 40) dynStats("lib", 1);
            if (player.stats.lib < 60) dynStats("lib", 1);
            //Lower ones are gender specific for some reason
            if (player.stats.lib < 60) {
                //(Cunts or assholes!
                if (!player.lowerBody.cockSpot.hasCock() || (player.gender == 3 && Utils.rand(2) == 0)) {
                    if (player.stats.lib < 30) {
                        MainScreen.text("\n\nYou squirm a little and find your eyes glancing down to your groin.  Strange thoughts jump to mind, wondering how it would feel to breed until you're swollen and pregnant.  ", false);
                        if (player.stats.cor < 25) MainScreen.text("You're repulsed by such shameful thoughts.", false);
                        else if (player.stats.cor < 60) MainScreen.text("You worry that this place is really getting to you.", false);
                        else if (player.stats.cor < 90) MainScreen.text("You pant a little and wonder where the nearest fertile male is.", false);
                        else MainScreen.text("You grunt and groan with desire and disappointment.  You should get bred soon!", false);
                    }
                    else MainScreen.text("\n\nYour mouth rolls open as you start to pant with desire.  Did it get hotter?  Your hand reaches down to your " + player.assholeOrPussy() + ", and you're struck by just how empty it feels.  The desire to be filled, not by a hand or a finger but by a virile male, rolls through you like a wave, steadily increasing your desire for sex.", false);
                }
                //WANGS!
                if (player.lowerBody.cockSpot.hasCock()) {
                    if (player.stats.lib < 30) {
                        MainScreen.text("\n\nYou squirm a little and find your eyes glancing down to your groin.  Strange thoughts jump to mind, wondering how it would feel to fuck a ", false);
                        if (Utils.rand(2) == 0) MainScreen.text("female hare until she's immobilized by all her eggs", false);
                        else MainScreen.text("herm rabbit until her sack is so swollen that she's forced to masturbate over and over again just to regain mobility", false);
                        MainScreen.text(". ", false);
                        if (player.stats.cor < 25) MainScreen.text("You're repulsed by such shameful thoughts.", false);
                        else if (player.stats.cor < 50) MainScreen.text("You worry that this place is really getting to you.", false);
                        else if (player.stats.cor < 75) MainScreen.text("You pant a little and wonder where the nearest fertile female is.", false);
                        else MainScreen.text("You grunt and groan with desire and disappointment.  Gods you need to fuck!", false);
                    }
                    else MainScreen.text("\n\nYour mouth rolls open as you start to pant with desire.  Did it get hotter?  Your hand reaches down to " + sMultiCockDesc() + ", and you groan from how tight and hard it feels.  The desire to have it squeezed, not with your hand but with a tight pussy or puckered asshole, runs through you like a wave, steadily increasing your desire for sex.", false);
                }
            }
            //Libido over 60? FUCK YEAH!
            else if (player.stats.lib < 80) {
                MainScreen.text("\n\nYou fan your neck and start to pant as your " + player.skinTone + " skin begins to flush red with heat", false);
                if (player.skinType > SKIN.PLAIN) MainScreen.text(" through your " + player.skinDesc, false);
                MainScreen.text(".  ", false);
                if (player.gender == 1) MainScreen.text("Compression tightens down on " + sMultiCockDesc() + " as it strains against your " + player.armorName + ".  You struggle to fight down your heightened libido, but it's hard – so very hard.", false);
                else if (player.gender == 0) MainScreen.text("Sexual hunger seems to gnaw at your " + assholeDescript() + ", demanding it be filled, but you try to resist your heightened libido.  It's so very, very hard.", false);
                else if (player.gender == 2) MainScreen.text("Moisture grows between your rapidly-engorging vulva, making you squish and squirm as you try to fight down your heightened libido, but it's hard – so very hard.", false);
                else MainScreen.text("Steamy moisture and tight compression war for your awareness in your groin as " + sMultiCockDesc() + " starts to strain against your " + player.armorName + ".  Your vulva engorges with blood, growing slicker and wetter.  You try so hard to fight down your heightened libido, but it's so very, very hard.  The urge to breed lingers in your mind, threatening to rear its ugly head.", false);
            }
            //MEGALIBIDO
            else {
                MainScreen.text("\n\nDelicious, unquenchable desire rises higher and higher inside you, until you're having trouble tamping it down all the time.  A little, nagging voice questions why you would ever want to tamp it down.  It feels so good to give in and breed that you nearly cave to the delicious idea on the spot.  Life is beginning to look increasingly like constant fucking or masturbating in a lust-induced haze, and you're having a harder and harder time finding fault with it.  ", false);
                if (player.stats.cor < 33) MainScreen.text("You sigh, trying not to give in completely.", false);
                else if (player.stats.cor < 66) MainScreen.text("You pant and groan, not sure how long you'll even want to resist.", false);
                else {
                    MainScreen.text("You smile and wonder if you can ", false);
                    if (player.stats.lib < 100) MainScreen.text("get your libido even higher.", false);
                    else MainScreen.text("find someone to fuck right now.", false);
                }
            }
        }
    }

    public goldenSeed(type: number, player: Player): void {
        //'type' refers to the variety of seed.
        //0 == standard.
        //1 == enhanced - increase change limit and no pre-reqs for TF
        let changes: number = 0;
        let changeLimit: number = 1;
        if (type == 1) changeLimit += 2;
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(2) == 0) changeLimit++;
        if (player.perks.has("HistoryAlchemist")) changeLimit++;
        //Generic eating text:
        MainScreen.text("", true);
        MainScreen.text("You pop the nut into your mouth, chewing the delicious treat and swallowing it quickly.  No wonder harpies love these things so much!", false);
        //****************
        //Stats:
        //****************
        //-Speed increase to 100.
        if (player.stats.spe < 100 && Utils.rand(3) == 0) {
            changes++;
            if (player.stats.spe >= 75) MainScreen.text("\n\nA familiar chill runs down your spine. Your muscles feel like well oiled machinery, ready to snap into action with lightning speed.", false);
            else MainScreen.text("\n\nA chill runs through your spine, leaving you feeling like your reflexes are quicker and your body faster.", false);
            //Speed gains diminish as it rises.
            if (player.stats.spe < 40) dynStats("spe", .5);
            if (player.stats.spe < 75) dynStats("spe", .5);
            dynStats("spe", .5);
        }
        //-Toughness decrease to 50
        if (player.tou > 50 && Utils.rand(3) == 0 && changes < changeLimit) {
            changes++;
            if (Utils.rand(2) == 0) MainScreen.text("\n\nA nice, slow warmth rolls from your gut out to your limbs, flowing through them before dissipating entirely. As it leaves, you note that your body feels softer and less resilient.", false);
            else MainScreen.text("\n\nYou feel somewhat lighter, but consequently more fragile.  Perhaps your bones have changed to be more harpy-like in structure?", false);
            dynStats("tou", -1);
        }
        //antianemone corollary:
        if (changes < changeLimit && player.upperBody.head.hairType == 4 && Utils.rand(2) == 0) {
            //-insert anemone hair removal into them under whatever criteria you like, though hair removal should precede abdomen growth; here's some sample text:
            MainScreen.text("\n\nAs you down the seed, your head begins to feel heavier.  Reaching up, you notice your tentacles becoming soft and somewhat fibrous.  Pulling one down reveals that it feels soft and fluffy, almost feathery; you watch as it dissolves into many thin, feathery stUtils.rands.  <b>Your hair is now like that of a harpy!</b>", false);
            player.upperBody.head.hairType = 1;
            changes++;
        }
        //-Strength increase to 70
        if (player.str < 70 && Utils.rand(3) == 0 && changes < changeLimit) {
            changes++;
            //(low str)
            if (player.str < 40) MainScreen.text("\n\nShivering, you feel a feverish sensation that reminds you of the last time you got sick. Thankfully, it passes swiftly, leaving slightly enhanced strength in its wake.", false);
            //(hi str – 50+)
            else MainScreen.text("\n\nHeat builds in your muscles, their already-potent mass shifting slightly as they gain even more strength.", false);
            //Faster until 40 str.
            if (player.str < 40) dynStats("str", .5);
            dynStats("str", .5);
        }
        //-Libido increase to 90
        if ((player.stats.lib < 90 || Utils.rand(3) == 0) && Utils.rand(3) == 0 && changes < changeLimit) {
            changes++;
            if (player.stats.lib < 90) dynStats("lib", 1);
            //(sub 40 lib)
            if (player.stats.lib < 40) {
                MainScreen.text("\n\nA passing flush colors your " + player.face() + " for a second as you daydream about sex. You blink it away, realizing the item seems to have affected your libido.", false);
                if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text(" The moistness of your " + vaginaDescript() + " seems to agree.", false);
                else if (player.lowerBody.cockSpot.hasCock()) MainScreen.text(" The hardness of " + sMultiCockDesc() + " seems to agree.", false);
                dynStats("lus", 5);
            }
            //(sub 75 lib)
            else if (player.stats.lib < 75) MainScreen.text("\n\nHeat, blessed heat, works through you from head to groin, leaving you to shudder and fantasize about the sex you could be having right now.\n\n", false);
            //(hi lib)
            else if (player.stats.lib < 90) MainScreen.text("\n\nSexual need courses through you, flushing your skin with a reddish hue while you pant and daydream of the wondrous sex you should be having right now.\n\n", false);
            //(90+)
            else MainScreen.text("\n\nYou groan, something about the seed rubbing your libido in just the right way to make you horny. Panting heavily, you sigh and fantasize about the sex you could be having.\n\n", false);
            //(fork to fantasy)
            if (player.stats.lib >= 40) {
                dynStats("lus", (player.stats.lib / 5 + 10));
                //(herm – either or!)
                //Cocks!
                if (player.lowerBody.cockSpot.hasCock() && (player.gender != 3 || Utils.rand(2) == 0)) {
                    //(male 1)
                    if (Utils.rand(2) == 0) {
                        MainScreen.text("In your fantasy you're winging through the sky, " + sMultiCockDesc() + " already hard and drizzling with male moisture while you circle an attractive harpy's nest. Her plumage is as blue as the sky, her eyes the shining teal of the sea, and legs splayed in a way that shows you how ready she is to be bred. You fold your wings and dive, wind whipping through your " + hairDescript() + " as she grows larger and larger. With a hard, body-slapping impact you land on top of her, plunging your hard, ready maleness into her hungry box. ", false);
                        if (player.lowerBody.cockSpot.count() > 1) {
                            MainScreen.text("The extra penis", false);
                            if (player.lowerBody.cockSpot.count() > 2) MainScreen.text("es rub ", false);
                            else MainScreen.text("rubs ", false);
                            MainScreen.text("the skin over her taut, empty belly, drooling your need atop her.  ", false);
                            MainScreen.text("You jolt from the vision unexpectedly, finding your " + sMultiCockDesc() + " is as hard as it was in the dream. The inside of your " + player.armorName + " is quite messy from all the pre-cum you've drooled. Perhaps you can find a harpy nearby to lie with.", false);
                        }
                    }
                    //(male 2)
                    else {
                        MainScreen.text("In your fantasy you're lying back in the nest your harem built for you, stroking your dick and watching the sexy bird-girl spread her thighs to deposit another egg onto the pile. The lewd moans do nothing to sate your need, and you beckon for another submissive harpy to approach. She does, her thick thighs swaying to show her understanding of your needs. The bird-woman crawls into your lap, sinking down atop your shaft to snuggle it with her molten heat. She begins kissing you, smearing your mouth with her drugged lipstick until you release the first of many loads. You sigh, riding the bliss, secure in the knowledge that this 'wife' won't let up until she's gravid with another egg. Then it'll be her sister-wife's turn. The tightness of " + sMultiCockDesc() + " inside your " + player.armorName + " rouses you from the dream, reminding you that you're just standing there, leaking your need into your gear.", false);
                    }
                }
                //Cunts!
                else if (player.lowerBody.vaginaSpot.hasVagina()) {
                    //(female 1)
                    if (Utils.rand(2) == 0) {
                        MainScreen.text("In your fantasy you're a happy harpy mother, your womb stretched by the sizable egg it contains. The surging hormones in your body arouse you again, and you turn to the father of your children, planting a wet kiss on his slobbering, lipstick-gilt cock. The poor adventurer writhes, hips pumping futilely in the air. He's been much more agreeable since you started keeping his cock coated with your kisses. You mount the needy boy, fantasizing about that first time when you found him near the portal, in the ruins of your old camp. The feeling of your stiff nipples ", false);
                        if (player.upperBody.chest.hasFuckableNipples()) MainScreen.text("and pussy leaking over ", false);
                        else if (player.biggestLactation() >= 1.5) MainScreen.text("dripping milk inside ", false);
                        else MainScreen.text("rubbing inside ", false);
                        MainScreen.text("your " + player.armorName + " shocks you from the dream, leaving you with nothing but the moistness of your loins for company. Maybe next year you'll find the mate of your dreams?", false);
                    }
                    //(female 2)
                    else {
                        MainScreen.text("In your fantasy you're sprawled on your back, thick thighs splayed wide while you're taken by a virile male. The poor stud was wandering the desert all alone, following some map, but soon you had his bright red rod sliding between your butt-cheeks, the pointed tip releasing runnels of submission to lubricate your loins. You let him mount your pussy before you grabbed him with your powerful thighs and took off. He panicked at first, but the extra blood flow just made him bigger. He soon forgot his fear and focused on the primal needs of all males – mating with a gorgeous harpy. You look back at him and wink, feeling his knot build inside you. Your aching, tender " + nippleDescript(0) + "s pull you out of the fantasy as they rub inside your " + player.armorName + ". Maybe once your quest is over you'll be able to find a shy, fertile male to mold into the perfect cum-pump.", false);
                    }
                }
            }
        }
        //****************
        //   Sexual:
        //****************
        //-Grow a cunt (guaranteed if no gender)
        if (player.gender == 0 || (!player.lowerBody.vaginaSpot.hasVagina() && changes < changeLimit && Utils.rand(3) == 0)) {
            changes++;
            //(balls)
            if (player.lowerBody.balls > 0) MainScreen.text("\n\nAn itch starts behind your " + ballsDescriptLight() + ", but before you can reach under to scratch it, the discomfort fades. A moment later a warm, wet feeling brushes your " + sackDescript() + ", and curious about the sensation, <b>you lift up your balls to reveal your new vagina.</b>", false);
            //(dick)
            else if (player.lowerBody.cockSpot.hasCock()) MainScreen.text("\n\nAn itch starts on your groin, just below your " + multiCockDescriptLight() + ". You pull your manhood aside to give you a better view, and you're able to watch as <b>your skin splits to give you a new vagina, complete with a tiny clit.</b>", false);
            //(neither)
            else MainScreen.text("\n\nAn itch starts on your groin and fades before you can take action. Curious about the intermittent sensation, <b>you peek under your " + player.armorName + " to discover your bUtils.rand new vagina, complete with pussy lips and a tiny clit.</b>", false);
            player.createVagina();
            player.lowerBody.vaginaSpot.list[0].clitLength = .25;
            dynStats("sen", 10);
            player.genderCheck();
        }
        //-Remove extra breast rows
        if (changes < changeLimit && player.upperBody.chest.count() > 1 && Utils.rand(3) == 0 && !flags[FlagEnum.HYPER_HAPPY]) {
            changes++;
            MainScreen.text("\n\nYou stumble back when your center of balance shifts, and though you adjust before you can fall over, you're left to watch in awe as your bottom-most " + breastDescript(player.upperBody.chest.count() - 1) + " shrink down, disappearing completely into your ", false);
            if (player.upperBody.chest.count() >= 3) MainScreen.text("abdomen", false);
            else MainScreen.text("chest", false);
            MainScreen.text(". The " + nippleDescript(player.upperBody.chest.count() - 1) + "s even fade until nothing but ", false);
            if (player.skinType == SKIN.FUR) MainScreen.text(player.hairColor + " " + player.skinDesc, false);
            else MainScreen.text(player.skinTone + " " + player.skinDesc, false);
            MainScreen.text(" remains. <b>You've lost a row of breasts!</b>", false);
            dynStats("sen", -5);
            player.removeBreastRow(player.upperBody.chest.count() - 1, 1);
        }
        //-Shrink tits if above DDs.
        //Cannot happen at same time as row removal
        else if (changes < changeLimit && player.upperBody.chest.count() == 1 && Utils.rand(3) == 0 && player.upperBody.chest.list[0].breastRating >= 7 && !flags[FlagEnum.HYPER_HAPPY]) {
            changes++;
            //(Use standard breast shrinking mechanism if breasts are under 'h')
            if (player.upperBody.chest.list[0].breastRating < 19) {
                player.shrinkTits();
            }
            //(H+)
            else {
                player.upperBody.chest.list[0].breastRating -= (4 + Utils.rand(4));
                MainScreen.text("\n\nYour chest pinches tight, wobbling dangerously for a second before the huge swell of your bust begins to shrink into itself. The weighty mounds jiggle slightly as they shed cup sizes like old, discarded coats, not stopping until they're " + player.breastCup(0) + "s.", false);
            }
        }
        //-Grow tits to a B-cup if below.
        if (changes < changeLimit && player.upperBody.chest.list[0].breastRating < 2 && Utils.rand(3) == 0) {
            changes++;
            MainScreen.text("\n\nYour chest starts to tingle, the " + player.skinDesc + " warming under your " + player.armorName + ". Reaching inside to feel the tender flesh, you're quite surprised when it puffs into your fingers, growing larger and larger until it settles into a pair of B-cup breasts.", false);
            if (player.upperBody.chest.list[0].breastRating < 1) MainScreen.text("  <b>You have breasts now!</b>", false);
            player.upperBody.chest.list[0].breastRating = 2;
        }
        //****************
        //General Appearance:
        //****************
        //-Femininity to 85
        if (player.femininity < 85 && changes < changeLimit && Utils.rand(3) == 0) {
            changes++;
            MainScreen.text(player.modFem(85, 3 + Utils.rand(5)), false);
        }
        //-Skin color change – tan, olive, dark, light
        if ((player.skinTone != "tan" && player.skinTone != "olive" && player.skinTone != "dark" && player.skinTone != "light") && changes < changeLimit && Utils.rand(5) == 0) {
            changes++;
            MainScreen.text("\n\nIt takes a while for you to notice, but <b>", false);
            if (player.skinType == SKIN.FUR) MainScreen.text("the skin under your " + player.hairColor + " " + player.skinDesc, false);
            else MainScreen.text("your " + player.skinDesc, false);
            MainScreen.text(" has changed to become ", false);
            temp = Utils.rand(4);
            if (temp == 0) player.skinTone = "tan";
            else if (temp == 1) player.skinTone = "olive";
            else if (temp == 2) player.skinTone = "dark";
            else if (temp == 3) player.skinTone = "light";
            MainScreen.text(player.skinTone + " colored.</b>", false);
        }
        //-Grow hips out if narrow.
        if (player.lowerBody.hipRating < 10 && changes < changeLimit && Utils.rand(3) == 0) {
            MainScreen.text("\n\nYour gait shifts slightly to accommodate your widening " + hipDescript() + ". The change is subtle, but they're definitely broader.", false);
            player.lowerBody.hipRating++;
            changes++;
        }
        //-Narrow hips if crazy wide
        if (player.lowerBody.hipRating >= 15 && changes < changeLimit && Utils.rand(3) == 0) {
            MainScreen.text("\n\nYour gait shifts inward, your " + hipDescript() + " narrowing significantly. They remain quite thick, but they're not as absurdly wide as before.", false);
            player.lowerBody.hipRating--;
            changes++;
        }
        //-Big booty
        if (player.lowerBody.butt.buttRating < 8 && changes < changeLimit && Utils.rand(3) == 0) {
            player.lowerBody.butt.buttRating++;
            changes++;
            MainScreen.text("\n\nA slight jiggle works through your rear, but instead of stopping it starts again. You can actually feel your " + player.armorName + " being filled out by the growing cheeks. When it stops, you find yourself the proud owner of a " + buttDescript() + ".", false);
        }
        //-Narrow booty if crazy huge.
        if (player.lowerBody.butt.buttRating >= 14 && changes < changeLimit && Utils.rand(4) == 0) {
            changes++;
            player.lowerBody.butt.buttRating--;
            MainScreen.text("\n\nA feeling of tightness starts in your " + buttDescript() + ", increasing gradually. The sensation grows and grows, but as it does your center of balance shifts. You reach back to feel yourself, and sure enough your massive booty is shrinking into a more manageable size.", false);
        }
        //-Body thickness to 25ish
        if (player.thickness > 25 && changes < changeLimit && Utils.rand(3) == 0) {
            MainScreen.text(player.modThickness(25, 3 + Utils.rand(4)), false);
            changes++;
        }
        //Remove odd eyes
        if (changes < changeLimit && Utils.rand(5) == 0 && player.eyeType > EYES.HUMAN) {
            if (player.eyeType == EYES.BLACK_EYES_SAND_TRAP) {
                MainScreen.text("\n\nYou feel a twinge in your eyes and you blink.  It feels like black cataracts have just fallen away from you, and you know without needing to see your reflection that your eyes have gone back to looking human.");
            }
            else {
                MainScreen.text("\n\nYou blink and stumble, a wave of vertigo threatening to pull your " + player.feet() + " from under you.  As you steady and open your eyes, you realize something seems different.  Your vision is changed somehow.", false);
                if (player.eyeType == EYES.FOUR_SPIDER_EYES) MainScreen.text("  Your multiple, arachnid eyes are gone!</b>", false);
                MainScreen.text("  <b>You have normal, humanoid eyes again.</b>", false);
            }
            player.eyeType = EYES.HUMAN;
            changes++;
        }
        //****************
        //Harpy Appearance:
        //****************
        //-Harpy legs
        if (player.lowerBody != LOWER_BODY.HARPY && changes < changeLimit && (type == 1 || player.tailType == TAIL.HARPY) && Utils.rand(4) == 0) {
            //(biped/taur)
            if (!player.isGoo()) MainScreen.text("\n\nYour " + player.legs() + " creak ominously a split-second before they go weak and drop you on the ground. They go completely limp, twisting and reshaping before your eyes in ways that make you wince. Your lower body eventually stops, but the form it's settled on is quite thick in the thighs. Even your " + player.feet() + " have changed.  ", false);
            //goo
            else MainScreen.text("\n\nYour gooey undercarriage loses some of its viscosity, dumping you into the puddle that was once your legs. As you watch, the fluid pulls together into a pair of distinctly leg-like shapes, solidifying into a distinctly un-gooey form. You've even regained a pair of feet!  ", false);
            player.lowerBody = LOWER_BODY.HARPY;
            changes++;
            //(cont)
            MainScreen.text("While humanoid in shape, they have two large, taloned toes on the front and a single claw protruding from the heel. The entire ensemble is coated in " + player.hairColor + " feathers from ankle to hip, reminding you of the bird-women of the mountains. <b>You now have harpy legs!</b>", false);
        }
        //-Feathery Tail
        if (player.tailType != TAIL.HARPY && changes < changeLimit && (type == 1 || player.upperBody.wingType == WING.FEATHERED_LARGE) && Utils.rand(4) == 0) {
            //(tail)
            if (player.tailType > TAIL.NONE) MainScreen.text("\n\nYour tail shortens, folding into the crack of your " + buttDescript() + " before it disappears. A moment later, a fan of feathers erupts in its place, fluffing up and down instinctively every time the breeze shifts. <b>You have a feathery harpy tail!</b>", false);
            //(no tail)
            else MainScreen.text("\n\nA tingling tickles the base of your spine, making you squirm in place. A moment later, it fades, but a fan of feathers erupts from your " + player.skinDesc + " in its place. The new tail fluffs up and down instinctively with every shift of the breeze. <b>You have a feathery harpy tail!</b>", false);
            player.tailType = TAIL.HARPY;
            changes++;
        }
        //-Propah Wings
        if (player.upperBody.wingType == WING.NONE && changes < changeLimit && (type == 1 || player.armType == ARM.HARPY) && Utils.rand(4) == 0) {
            MainScreen.text("\n\nPain lances through your back, the muscles knotting oddly and pressing up to bulge your " + player.skinDesc + ". It hurts, oh gods does it hurt, but you can't get a good angle to feel at the source of your agony. A loud crack splits the air, and then your body is forcing a pair of narrow limbs through a gap in your " + player.armorName + ". Blood pumps through the new appendages, easing the pain as they fill out and grow. Tentatively, you find yourself flexing muscles you didn't know you had, and <b>you're able to curve the new growths far enough around to behold your bUtils.rand new, " + player.hairColor + " wings.</b>", false);
            player.upperBody.wingType = WING.FEATHERED_LARGE;
            player.upperBody.wingDesc = "large, feathered";
            changes++;
        }
        //-Remove old wings
        if (player.upperBody.wingType != WING.FEATHERED_LARGE && player.upperBody.wingType > WING.NONE && changes < changeLimit && Utils.rand(4) == 0) {
            if (player.upperBody.wingType != WING.SHARK_FIN) MainScreen.text("\n\nSensation fades from your " + player.upperBody.wingDesc + " wings slowly but surely, leaving them dried out husks that break off to fall on the ground. Your back closes up to conceal the loss, as smooth and unbroken as the day you entered the portal.", false);
            else MainScreen.text("\n\nSensation fades from your large fin slowly but surely, leaving it a dried out husk that breaks off to fall on the ground. Your back closes up to conceal the loss, as smooth and unbroken as the day you entered the portal.", false);
            player.upperBody.wingType = WING.NONE;
            player.upperBody.wingDesc = "non-existant";
            changes++;
        }
        //-Feathery Arms
        if (player.armType != ARM.HARPY && changes < changeLimit && (type == 1 || player.upperBody.head.hairType == 1) && Utils.rand(4) == 0) {
            MainScreen.text("\n\nYou smile impishly as you lick the last bits of the nut from your teeth, but when you go to wipe your mouth, instead of the usual texture of your " + player.skinDesc + " on your lips, you feel feathers! You look on in horror while more of the avian plumage sprouts from your " + player.skinDesc + ", covering your forearms until <b>your arms look vaguely like wings</b>. Your hands remain unchanged thankfully. It'd be impossible to be a champion without hands! The feathery limbs might help you maneuver if you were to fly, but there's no way they'd support you alone.", false);
            changes++;
            player.armType = ARM.HARPY;
        }
        //-Feathery Hair
        if (player.upperBody.head.hairType != 1 && changes < changeLimit && (type == 1 || player.faceType == FACE.HUMAN) && Utils.rand(4) == 0) {
            MainScreen.text("\n\nA tingling starts in your scalp, getting worse and worse until you're itching like mad, the feathery stUtils.rands of your hair tickling your fingertips while you scratch like a dog itching a flea. When you pull back your hand, you're treated to the sight of downy fluff trailing from your fingernails. A realization dawns on you - you have feathers for hair, just like a harpy!", false);
            player.upperBody.head.hairType = 1;
            changes++;
        }
        //-Human face
        if (player.faceType != FACE.HUMAN && changes < changeLimit && (type == 1 || (player.upperBody.head.earType == EARS.HUMAN || player.upperBody.head.earType == EARS.ELFIN)) && Utils.rand(4) == 0) {
            MainScreen.text("\n\nSudden agony sweeps over your " + player.face() + ", your visage turning hideous as bones twist and your jawline shifts. The pain slowly vanishes, leaving you weeping into your fingers. When you pull your hands away you realize you've been left with a completely normal, human face.", false);
            player.faceType = FACE.HUMAN;
            changes++;
        }
        //-Gain human ears (keep elf ears)
        if ((player.upperBody.head.earType != EARS.HUMAN && player.upperBody.head.earType != EARS.ELFIN) && changes < changeLimit && Utils.rand(4) == 0) {
            MainScreen.text("\n\nOuch, your head aches! It feels like your ears are being yanked out of your head, and when you reach up to hold your aching noggin, you find they've vanished! Swooning and wobbling with little sense of balance, you nearly fall a half-dozen times before <b>a pair of normal, human ears sprout from the sides of your head.</b> You had almost forgotten what human ears felt like!", false);
            player.upperBody.head.earType = EARS.HUMAN;
            changes++;
        }
        if (Utils.rand(4) == 0 && player.upperBody.gills && changes < changeLimit) {
            MainScreen.text("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.", false);
            player.upperBody.gills = false;
            changes++;
        }
        //SPECIAL:
        //Harpy Womb – All eggs are automatically upgraded to large, requires legs + tail to be harpy.
        if (!player.perks.has("HarpyWomb") && player.lowerBody == LOWER_BODY.HARPY && player.tailType == TAIL.HARPY && Utils.rand(4) == 0 && changes < changeLimit) {
            player.createPerk(PerkLib.HarpyWomb, 0, 0, 0, 0);
            MainScreen.text("\n\nThere's a rumbling in your womb, signifying that some strange change has taken place in your most feminine area. No doubt something in it has changed to be more like a harpy. (<b>You've gained the Harpy Womb perk! All the eggs you lay will always be large so long as you have harpy legs and a harpy tail.</b>)", false);
            changes++;
        }
        if (changes < changeLimit && Utils.rand(4) == 0 && ((player.ass.analWetness > 0 && !player.perks.has("MaraesGiftButtslut")) || player.ass.analWetness > 1)) {
            MainScreen.text("\n\nYou feel a tightening up in your colon and your [asshole] sucks into itself.  You feel sharp pain at first but that thankfully fades.  Your ass seems to have dried and tightened up.");
            player.ass.analWetness--;
            if (player.ass.analLooseness > 1) player.ass.analLooseness--;
            changes++;
        }
        //Nipples Turn Back:
        if (player.statusAffects.has("BlackNipples") && changes < changeLimit && Utils.rand(3) == 0) {
            MainScreen.text("\n\nSomething invisible brushes against your " + nippleDescript(0) + ", making you twitch.  Undoing your clothes, you take a look at your chest and find that your nipples have turned back to their natural flesh colour.");
            changes++;
            player.statusAffects.remove("BlackNipples");
        }
        //Debugcunt
        if (changes < changeLimit && Utils.rand(3) == 0 && player.vaginaType() == 5 && player.lowerBody.vaginaSpot.hasVagina()) {
            MainScreen.text("\n\nSomething invisible brushes against your sex, making you twinge.  Undoing your clothes, you take a look at your vagina and find that it has turned back to its natural flesh colour.");
            player.vaginaType(0);
            changes++;
        }
        if (changes == 0) MainScreen.text("\n\nAside from being a tasty treat, it doesn't seem to do anything to you this time.", false);
    }

    /*
     General Effects:
     -Speed to 70
     -Int to 10

     Appearance Effects:
     -Hip widening funtimes
     -Remove feather-arms (copy this for goblin ale, mino blood, equinum, canine pepps, demon items)
     -Remove feathery hair (copy for equinum, canine peppers, Labova)

     Sexual:
     -Shrink balls down to reasonable size (3?)
     -Shorten clits to reasonable size
     -Shrink dicks down to 8\" max.
     -Rut/heat

     Big Roo Tfs:
     -Roo ears
     -Roo tail
     -Roo footsies
     -Fur
     -Roo face*/
    public kangaFruit(type: number, player: Player): void {
        MainScreen.text("", true);
        MainScreen.text("You squeeze the pod around the middle, forcing the end open.  Scooping out a handful of the yeasty-smelling seeds, you shovel them in your mouth.  Blech!  Tastes like soggy burnt bread... and yet, you find yourself going for another handful...", false);
        //Used to track changes and the max
        let changes: number = 0;
        let changeLimit: number = 1;
        if (type == 1) changeLimit += 2;
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(2) == 0) changeLimit++;
        if (player.perks.has("HistoryAlchemist")) changeLimit++;
        //Used as a holding variable for biggest dicks and the like
        let biggestCock: number;
        //****************
        //General Effects:
        //****************
        //-Int less than 10
        if (player.stats.int < 10) {
            if (player.stats.int < 8 && player.kangaScore() >= 5) {
                MainScreen.text("\n\nWhile you gnaw on the fibrous fruit, your already vacant mind continues to empty, leaving nothing behind but the motion of your jaw as you slowly chew and swallow your favorite food.  Swallow.  Chew.  Swallow.  You don't even notice your posture worsening or your arms shortening.  Without a single thought, you start to hunch over but keep munching on the food in your paws as if were the most normal thing in the world.  Teeth sink into one of your fingers, leaving you to yelp in pain.  With the last of your senses, you look at your throbbing paw to notice you've run out of kanga fruit!", false);
                MainScreen.text("\n\nStill hungry and licking your lips in anticipation, you sniff in deep lungfuls of air.  There's more of that wonderful fruit nearby!  You bound off in search of it on your incredibly muscular legs, their shape becoming more and more feral with every hop.  Now guided completely by instinct, you find a few stalks that grow from the ground.  Your belly rumbles, reminding you of your hunger, as you begin to dig into the kanga fruits...", false);
                MainScreen.text("\n\nLosing more of what little remains of yourself, your body is now entirely that of a feral kangaroo and your mind has devolved to match it.  After you finish the handful of fruits you found, you move on in search for more of the tasty treats.  Though you pass by your camp later on, there's no memory, no recognition, just a slight feeling of comfort and familiarity.  There's no food here so you hop away.", false);
                //[GAME OVER]
                getGame().gameOver();
                return;
            }
            MainScreen.text("\n\nWhile chewing, your mind becomes more and more tranquil.  You find it hard to even remember your mission, let alone your name.  <b>Maybe more kanga fruits will help?</b>", false);
        }
        //-Speed to 70
        if (player.stats.spe < 70 && Utils.rand(3) == 0) {
            //2 points up if below 40!
            if (player.stats.spe < 40) dynStats("spe", 1);
            dynStats("spe", 1);
            MainScreen.text("\n\nYour legs fill with energy as you eat the kanga fruit.  You feel like you could set a long-jump record!  You give a few experimental bounds, both standing and running, with your newfound vigor.  Your stride seems longer too; you even catch a bit of air as you push off with every powerful step.", false);
            changes++;
        }
        //-Int to 10
        if (player.stats.int > 2 && Utils.rand(3) == 0 && changes < changeLimit) {
            changes++;
            //Gain dumb (smart!)
            if (player.stats.int > 30) MainScreen.text("\n\nYou feel... antsy. You momentarily forget your other concerns as you look around you, trying to decide which direction you'd be most likely to find more food in.  You're about to set out on the search when your mind refocuses and you realize you already have some stored at camp.", false);
            //gain dumb (30-10 int):
            else if (player.stats.int > 10) MainScreen.text("\n\nYour mind wanders as you eat; you think of what it would be like to run forever, bounding across the wastes of Mareth in the simple joy of movement.  You bring the kanga fruit to your mouth one last time, only to realize there's nothing edible left on it.  The thought brings you back to yourself with a start.", false);
            //gain dumb (10-1 int):
            else MainScreen.text("\n\nYou lose track of everything as you eat, staring at the bugs crawling across the ground.  After a while you notice the dull taste of saliva in your mouth and realize you've been sitting there, chewing the same mouthful for five minutes.  You vacantly swallow and take another bite, then go back to staring at the ground.  Was there anything else to do today?", false);
            dynStats("int", -1);
        }
        //****************
        //Appearance Effects:
        //****************
        //-Hip widening funtimes
        if (changes < changeLimit && Utils.rand(4) == 0 && player.lowerBody.hipRating < 40) {
            MainScreen.text("\n\nYou weeble and wobble as your hipbones broaden noticeably, but somehow you don't fall down.  Actually, you feel a bit MORE stable on your new widened stance, if anything.", false);
            player.lowerBody.hipRating++;
            changes++;
        }
        //-Remove feather-arms (copy this for goblin ale, mino blood, equinum, canine pepps, demon items)
        if (changes < changeLimit && player.armType == ARM.HARPY && Utils.rand(4) == 0) {
            MainScreen.text("\n\nYou scratch at your biceps absentmindedly, but no matter how much you scratch, it isn't getting rid of the itch.  Glancing down in irritation, you discover that your feathery arms are shedding their feathery coating.  The wing-like shape your arms once had is gone in a matter of moments, leaving " + player.skinDesc + " behind.", false);
            player.armType = ARM.HUMAN;
            changes++;
        }
        //-Remove chitin-arms (copy this for goblin ale, mino blood, equinum, canine pepps, demon items)
        if (changes < changeLimit && player.armType == ARM.SPIDER && Utils.rand(4) == 0) {
            MainScreen.text("\n\nYou scratch at your biceps absentmindedly, but no matter how much you scratch, it isn't getting rid of the itch.  Glancing down in irritation, you discover that your arms' chitinous covering is flaking away.  The glossy black coating is soon gone, leaving " + player.skinDesc + " behind.", false);
            player.armType = ARM.HUMAN;
            changes++;
        }
        //-Remove feathery hair (copy for equinum, canine peppers, Labova)
        if (changes < changeLimit && player.upperBody.head.hairType == 1 && Utils.rand(4) == 0) {
            //(long):
            if (player.hairLength >= 6) MainScreen.text("\n\nA lock of your downy-soft feather-hair droops over your eye.  Before you can blow the offending down away, you realize the feather is collapsing in on itself.  It continues to curl inward until all that remains is a normal stUtils.rand of hair.  <b>Your hair is no longer feathery!</b>", false);
            //(short)
            else MainScreen.text("\n\nYou run your fingers through your downy-soft feather-hair while you await the effects of the item you just ingested.  While your hand is up there, it detects a change in the texture of your feathers.  They're completely disappearing, merging down into stUtils.rands of regular hair.  <b>Your hair is no longer feathery!</b>", false);
            changes++;
            player.upperBody.head.hairType = 0;
        }
        //Remove odd eyes
        if (changes < changeLimit && Utils.rand(5) == 0 && player.eyeType > EYES.HUMAN) {
            if (player.eyeType == EYES.BLACK_EYES_SAND_TRAP) {
                MainScreen.text("\n\nYou feel a twinge in your eyes and you blink.  It feels like black cataracts have just fallen away from you, and you know without needing to see your reflection that your eyes have gone back to looking human.");
            }
            else {
                MainScreen.text("\n\nYou blink and stumble, a wave of vertigo threatening to pull your " + player.feet() + " from under you.  As you steady and open your eyes, you realize something seems different.  Your vision is changed somehow.", false);
                if (player.eyeType == EYES.FOUR_SPIDER_EYES) MainScreen.text("  Your multiple, arachnid eyes are gone!</b>", false);
                MainScreen.text("  <b>You have normal, humanoid eyes again.</b>", false);
            }
            player.eyeType = EYES.HUMAN;
            changes++;
        }
        //****************
        //Sexual:
        //****************
        //-Shrink balls down to reasonable size (3?)
        if (player.lowerBody.ballSize >= 4 && changes < changeLimit && Utils.rand(2) == 0) {
            player.lowerBody.ballSize--;
            player.cumMultiplier++;
            MainScreen.text("\n\nYour " + sackDescript() + " pulls tight against your groin, vibrating slightly as it changes.  Once it finishes, you give your " + ballsDescriptLight() + " a gentle squeeze and discover they've shrunk.  Even with the reduced volume, they feel just as heavy.", false);
            changes++;
        }
        //-Shorten clits to reasonable size
        if (player.lowerBody.vaginaSpot.list[0].clitLength >= 4 && changes < changeLimit && Utils.rand(5) == 0) {
            MainScreen.text("\n\nPainful pricks work through your " + clitDescript() + ", all the way into its swollen clitoral sheath.  Gods, it feels afire with pain!  Agony runs up and down its length, and by the time the pain finally fades, the feminine organ has lost half its size.", false);
            player.lowerBody.vaginaSpot.list[0].clitLength /= 2;
            changes++;
        }
        //Find biggest dick!
        biggestCock = player.biggestCockIndex();
        //-Shrink dicks down to 8\" max.
        if (player.lowerBody.cockSpot.hasCock()) {
            if (player.lowerBody.cockSpot.list[biggestCock].cockLength >= 16 && changes < changeLimit && Utils.rand(5) == 0) {
                MainScreen.text("\n\nA roiling inferno of heat blazes in your " + cockDescript(biggestCock) + ", doubling you over in the dirt.  You rock back and forth while tears run unchecked down your cheeks.  Once the pain subsides and you're able to move again, you find the poor member has lost nearly half its size.", false);
                player.lowerBody.cockSpot.list[biggestCock].cockLength /= 2;
                player.lowerBody.cockSpot.list[biggestCock].cockThickness /= 1.5;
                if (player.lowerBody.cockSpot.list[biggestCock].cockThickness * 6 > player.lowerBody.cockSpot.list[biggestCock].cockLength) player.lowerBody.cockSpot.list[biggestCock].cockThickness -= .2;
                if (player.lowerBody.cockSpot.list[biggestCock].cockThickness * 8 > player.lowerBody.cockSpot.list[biggestCock].cockLength) player.lowerBody.cockSpot.list[biggestCock].cockThickness -= .2;
                if (player.lowerBody.cockSpot.list[biggestCock].cockThickness < .5) player.lowerBody.cockSpot.list[biggestCock].cockThickness = .5;
                changes++;
            }
            //COCK TF!
            if (player.kangaCocks() < player.lowerBody.cockSpot.count() && (type == 1 && Utils.rand(2) == 0) && changes < changeLimit) {
                MainScreen.text("\n\nYou feel a sharp pinch at the end of your penis and whip down your clothes to check.  Before your eyes, the tip of it collapses into a narrow point and the shaft begins to tighten behind it, assuming a conical shape before it retracts into ", false);
                if (player.lowerBody.cockSpot.hasSheath()) MainScreen.text("your sheath", false);
                else MainScreen.text("a sheath that forms at the base of it", false);
                MainScreen.text(".  <b>You now have a kangaroo-penis!</b>", false);
                let cockIdx: number = 0;
                //Find first non-roocock!
                while (cockIdx < player.lowerBody.cockSpot.count()) {
                    if (player.lowerBody.cockSpot.list[cockIdx].cockType != CockType.KANGAROO) {
                        player.lowerBody.cockSpot.list[cockIdx].cockType = CockType.KANGAROO;
                        player.lowerBody.cockSpot.list[cockIdx].knotMultiplier = 1;
                        break;
                    }
                    cockIdx++;
                }
                changes++;
            }
        }
        //****************
        //Big Kanga Morphs
        //type 1 ignores normal restrictions
        //****************
        //-Face (Req: Fur + Feet)
        if (player.faceType != FACE.KANGAROO && ((player.skinType == SKIN.FUR && player.lowerBody == LOWER_BODY.KANGAROO) || type == 1) && changes < changeLimit && Utils.rand(4) == 0) {
            //gain roo face from human/naga/shark/bun:
            if (player.faceType == FACE.HUMAN || player.faceType == FACE.SNAKE_FANGS || player.faceType == FACE.SHARK_TEETH || player.faceType == FACE.BUNNY) MainScreen.text("\n\nThe base of your nose suddenly hurts, as though someone were pinching and pulling at it.  As you shut your eyes against the pain and bring your hands to your face, you can feel your nose and palate shifting and elongating.  This continues for about twenty seconds as you stand there, quaking.  When the pain subsides, you run your hands all over your face; what you feel is a long muzzle sticking out, whiskered at the end and with a cleft lip under a pair of flat nostrils.  You open your eyes and receive confirmation. <b>You now have a kangaroo face!  Crikey!</b>", false);
            //gain roo face from other snout:
            else MainScreen.text("\n\nYour nose tingles. As you focus your eyes toward the end of it, it twitches and shifts into a muzzle similar to a stretched-out rabbit's, complete with harelip and whiskers.  <b>You now have a kangaroo face!</b>", false);
            changes++;
            player.faceType = FACE.KANGAROO;
        }
        //-Fur (Req: Footsies)
        if (player.skinType != SKIN.FUR && (player.lowerBody == LOWER_BODY.KANGAROO || type == 1) && changes < changeLimit && Utils.rand(4) == 0) {
            MainScreen.text("\n\nYour " + player.skinDesc + " itches terribly all over and you try cartoonishly to scratch everywhere at once.  As you pull your hands in, you notice " + player.hairColor + " fur growing on the backs of them.  All over your body the scene is repeated, covering you in the stuff.  <b>You now have fur!</b>", false);
            changes++;
            player.skinType = SKIN.FUR;
            player.skinDesc = "fur";
        }
        //-Roo footsies (Req: Tail)
        if (player.lowerBody != LOWER_BODY.KANGAROO && (type == 1 || player.tailType == TAIL.KANGAROO) && changes < changeLimit && Utils.rand(4) == 0) {
            //gain roo feet from centaur:
            if (player.lowerBody == LOWER_BODY.CENTAUR) MainScreen.text("\n\nYour backlegs suddenly wobble and collapse, causing you to pitch over onto your side.  Try as you might, you can't get them to stop spasming so you can stand back up; you thrash your hooves wildly as a pins-and-needles sensation overtakes your lower body.  A dull throbbing along your spine makes you moan in agony; it's as though someone had set an entire bookshelf on your shoulders and your spine were being compressed far beyond its limit.  After a minute of pain, the pressure evaporates and you look down at your legs.  Not only are your backlegs gone, but your forelegs have taken on a dogleg shape, with extremely long feet bearing a prominent middle toe!  You set about rubbing the feeling back into your legs and trying to move the new feet.  <b>You now have kangaroo legs!</b>", false);
            //gain roo feet from naga:
            else if (player.lowerBody == LOWER_BODY.NAGA) MainScreen.text("\n\nYour tail quivers, then shakes violently, planting you on your face.  As you try to bend around to look at it, you can just see the tip shrinking out of your field of vision from the corner of your eye.  The scaly skin below your waist tightens intolerably, then splits; you wriggle out of it, only to find yourself with a pair of long legs instead!  A bit of hair starts to grow in as you stand up unsteadily on your new, elongated feet.  <b>You now have kangaroo legs!</b>  Now, what are you going to do with a giant shed snakeskin?", false);
            //gain roo feet from slime:
            else if (player.lowerBody == LOWER_BODY.GOO) MainScreen.text("\n\nYour mounds of goo shrink and part involuntarily, exposing your crotch.  Modesty overwhelms you and you try to pull them together, but the shrinkage is continuing faster than you can shift your gooey body around.  Before long you've run out of goo to move, and your lower body now ends in a pair of slippery digitigrade legs with long narrow feet.  They dry in the air and a bit of fur begins to sprout as you look for something to cover up with.  <b>You now have kangaroo legs!</b> You sigh.  Guess this means it's back to wearing underpants again.", false);
            //gain roo feet from human/bee/demon/paw/lizard:
            else MainScreen.text("\n\nYour feet begin to crack and shift as the metatarsal bones lengthen.  Your knees buckle from the pain of your bones rearranging themselves, and you fall over.  After fifteen seconds of what feels like your feet being racked, the sensation stops.  You look down at your legs; they've taken a roughly dog-leg shape, but they have extremely long feet with a prominent middle toe!  As you stand up you find that you're equally comfortable standing flat on your feet as you are on the balls of them!  <b>You now have kangaroo legs!</b>", false);
            player.lowerBody = LOWER_BODY.KANGAROO;
            changes++;
        }
        //-Roo tail (Req: Ears)
        if (player.tailType != TAIL.KANGAROO && changes < changeLimit && Utils.rand(4) == 0 && (type != 1 || player.upperBody.head.earType == EARS.KANGAROO)) {
            //gain roo tail:
            if (player.tailType == TAIL.NONE) MainScreen.text("\n\nA painful pressure in your lower body causes you to stand straight and lock up.  At first you think it might be gas.  No... something is growing at the end of your tailbone.  As you hold stock still so as not to exacerbate the pain, something thick pushes out from the rear of your garments.  The pain subsides and you crane your neck around to look; a long, tapered tail is now attached to your butt and a thin coat of fur is already growing in!  <b>You now have a kangaroo tail!</b>", false);
            //gain roo tail from bee tail:
            else if (player.tailType == TAIL.SPIDER_ADBOMEN || player.tailType == TAIL.BEE_ABDOMEN) {
                MainScreen.text("\n\nYour chitinous backside shakes and cracks once you finish eating.  Peering at it as best you can, it appears as though the fuzz is falling out in clumps and the chitin is flaking off.  As convulsions begin to wrack your body and force you to collapse, the ", false);
                if (player.tailType == TAIL.BEE_ABDOMEN) MainScreen.text("hollow stinger drops out of the end, taking the venom organ with it.", false);
                else MainScreen.text("spinnerets drop out of the end, taking the last of your webbing with it.", false);
                MainScreen.text("  By the time you're back to yourself, the insectile carapace has fallen off completely, leaving you with a long, thick, fleshy tail in place of your proud, insectile abdomen.  <b>You now have a kangaroo tail!</b>  You wipe the errant spittle from your mouth as you idly bob your new tail about.", false);
            }
            //gain roo tail from other tail:
            else {
                MainScreen.text("\n\nYour tail twitches as you eat.  It begins to feel fat and swollen, and you try to look at your own butt as best you can.  What you see matches what you feel as your tail thickens and stretches out into a long cone shape.  <b>You now have a kangaroo tail!</b>", false);
            }
            player.tailType = TAIL.KANGAROO;
            changes++;
        }
        //-Roo ears
        if (player.upperBody.head.earType != EARS.KANGAROO && changes < changeLimit && Utils.rand(4) == 0) {
            //Bunbun ears get special texts!
            if (player.upperBody.head.earType == EARS.BUNNY) MainScreen.text("\n\nYour ears stiffen and shift to the sides!  You reach up and find them pointed outwards instead of up and down; they feel a bit wider now as well.  As you touch them, you can feel them swiveling in place in response to nearby sounds.  <b>You now have a pair of kangaroo ears!</b>", false);
            //Everybody else?  Yeah lazy.
            else MainScreen.text("\n\nYour ears twist painfully as though being yanked upwards and you clap your hands to your head.  Feeling them out, you discover them growing!  They stretch upwards, reaching past your fingertips, and then the tugging stops.  You cautiously feel along their lengths; they're long and stiff, but pointed outwards now, and they swivel around as you listen.  <b>You now have a pair of kangaroo ears!</b>", false);
            changes++;
            player.upperBody.head.earType = EARS.KANGAROO;
        }
        //UBEROOOO
        //kangaroo perk: - any liquid or food intake will accelerate a pregnancy, but it will not progress otherwise
        if (!player.perks.has("Diapause") && player.kangaScore() > 4 && Utils.rand(4) == 0 && changes < changeLimit && player.lowerBody.vaginaSpot.hasVagina()) {
            //Perk name and description:
            player.createPerk(PerkLib.Diapause, 0, 0, 0, 0);
            MainScreen.text("\n\nYour womb rumbles as something inside it changes.\n<b>(You have gained the Diapause perk.  Pregnancies will not progress when fluid intake is scarce, and will progress much faster when it isn't.)", false);
            changes++;
            //trigger effect: Your body reacts to the influx of nutrition, accelerating your pregnancy. Your belly bulges outward slightly.
        }
        if (Utils.rand(4) == 0 && player.upperBody.gills && changes < changeLimit) {
            MainScreen.text("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.", false);
            player.upperBody.gills = false;
            changes++;
        }
        if (changes == 0) {
            MainScreen.text("\n\nIt did not seem to have any effects, but you do feel better rested.", false);
            fatigue(-40);
        }
    }

    //[Giant Chocolate Cupcake] – 500 gems
    public giantChocolateCupcake(player: Player): void {
        MainScreen.text("", true);
        MainScreen.text("You look down at the massive chocolate cupcake and wonder just how you can possibly eat it all.  It fills the over-sized wrapper and bulges out over the top, somehow looking obscene even though it's merely a baked treat.  There is a single candle positioned atop its summit, and it bursts into flame as if by magic.  Eight red gumdrops ring the outer edge of the cupcake, illuminated by the flame.\n\n", false);
        MainScreen.text("You hesitantly take a bite.  It's sweet, as you'd expect, but there's also a slightly salty, chocolaty undercurrent of flavor.  Even knowing what the minotaur put in Maddie's mix, you find yourself grateful that this new creation doesn't seem to have any of his 'special seasonings'.  It wouldn't do to be getting drugged up while you're slowly devouring the massive, muffin-molded masterpiece. Before you know it, most of the cupcake is gone and you polish off the last chocolaty bites before licking your fingers clean.\n\n", false);
        MainScreen.text("Gods, you feel heavy!  You waddle slightly as your body begins thickening, swelling until you feel as wide as a house.  Lethargy spreads through your limbs, and you're forced to sit still a little while until you let out a lazy burp.\n\n", false);
        MainScreen.text("As you relax in your sugar-coma, you realize your muscle definition is fading away, disappearing until your " + player.skinDesc + " looks nearly as soft and spongy as Maddie's own.  You caress the soft, pudgy mass and shiver in delight, dimly wondering if this is how the cupcake-girl must feel all the time.", false);
        MainScreen.text(player.modTone(0, 100), false);
        MainScreen.text(player.modThickness(100, 100), false);
    }

    public sweetGossamer(type: number, player: Player): void {
        MainScreen.text("", true);
        let changes: number = 0;
        let changeLimit: number = 1;
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(2) == 0) changeLimit++;
        if (player.perks.has("HistoryAlchemist")) changeLimit++;
        //Consuming Text
        if (type == 0) MainScreen.text("You wad up the sweet, pink gossamer and eat it, finding it to be delicious and chewy, almost like gum.  Munching away, your mouth generates an enormous amount of spit until you're drooling all over yourself while you devour the sweet treat.", false);
        else if (type == 1) MainScreen.text("You wad up the sweet, black gossamer and eat it, finding it to be delicious and chewy, almost like licorice.  Munching away, your mouth generates an enormous amount of spit until you're drooling all over yourself while you devour the sweet treat.", false);

        //*************
        //Stat Changes
        //*************
        //(If speed<70, increases speed)
        if (player.stats.spe < 70 && changes < changeLimit && Utils.rand(3) == 0) {
            MainScreen.text("\n\nYour reflexes feel much faster. Experimentally, you make a grab at a fly on a nearby rock and quickly snatch it out of the air.  A compulsion to stuff it in your mouth and eat it surfaces, but you resist the odd desire.  Why would you ever want to do something like that?", false);
            dynStats("spe", 1.5);
            changes++;
        }
        //(If speed>80, decreases speed down to minimum of 80)
        if (player.stats.spe > 80 && changes < changeLimit && Utils.rand(3) == 0) {
            MainScreen.text("\n\nYou feel like resting high in the trees and waiting for your unsuspecting prey to wander below so you can take them without having to exert yourself.  What an odd thought!", false);
            dynStats("spe", -1.5);
            changes++;
        }
        //(increases sensitivity)
        if (changes < changeLimit && Utils.rand(3) == 0) {
            MainScreen.text("\n\nThe hairs on your arms and legs stand up straight for a few moments, detecting the airflow around you. Touch appears to be more receptive from now on.", false);
            dynStats("sen", 1);
            changes++;
        }
        //(Increase libido)
        if (changes < changeLimit && Utils.rand(3) == 0) {
            MainScreen.text("\n\nYou suddenly feel slightly needier, and your loins stir in quiet reminder that they could be seen to. The aftertaste hangs on your tongue and your teeth.  You wish there had been more.", false);
            dynStats("lib", 1);
            changes++;
        }
        //(increase toughness to 60)
        if (changes < changeLimit && Utils.rand(3) == 0 && player.tou < 60) {
            MainScreen.text("\n\nStretching languidly, you realize you're feeling a little tougher than before, almost as if you had a full-body shell of armor protecting your internal organs.  How strange.  You probe at yourself, and while your " + player.skinFurScales() + " doesn't feel much different, the underlying flesh does seem tougher.", false);
            dynStats("tou", 1);
            changes++;
        }
        //(decrease strength to 70)
        if (player.str > 70 && Utils.rand(3) == 0) {
            MainScreen.text("\n\nLethargy rolls through you while you burp noisily.  You rub at your muscles and sigh, wondering why you need to be strong when you could just sew up a nice sticky web to catch your enemies.  ", false);
            if (player.spiderScore() < 4) MainScreen.text("Wait, you're not a spider, that doesn't make any sense!", false);
            else MainScreen.text("Well, maybe you should put your nice, heavy abdomen to work.", false);
            dynStats("str", -1);
            changes++;
        }
        //****************
        //Sexual Changes
        //****************
        //Increase venom recharge
        if (player.tailType == TAIL.SPIDER_ADBOMEN && player.lowerBody.tailRecharge < 25 && changes < changeLimit) {
            changes++;
            MainScreen.text("\n\nThe spinnerets on your abdomen twitch and drip a little webbing.  The entirety of its heavy weight shifts slightly, and somehow you know you'll produce webs faster now.", false);
            player.lowerBody.tailRecharge += 5;
        }
        //(tightens vagina to 1, increases lust/libido)
        if (player.lowerBody.vaginaSpot.hasVagina()) {
            if (player.looseness() > 1 && changes < changeLimit && Utils.rand(3) == 0) {
                MainScreen.text("\n\nWith a gasp, you feel your " + vaginaDescript(0) + " tightening, making you leak sticky girl-juice. After a few seconds, it stops, and you rub on your " + vaginaDescript(0) + " excitedly. You can't wait to try this out!", false);
                dynStats("lib", 2, "lus", 25);
                changes++;
                player.vaginas[0].vaginalLooseness--;
            }
        }
        //(tightens asshole to 1, increases lust)
        if (player.ass.analLooseness > 1 && changes < changeLimit && Utils.rand(3) == 0) {
            MainScreen.text("\n\nYou let out a small cry as your " + assholeDescript() + " shrinks, becoming smaller and tighter. When it's done, you feel much hornier and eager to stretch it out again.", false);
            dynStats("lib", 2, "lus", 25);
            changes++;
            player.ass.analLooseness--;
        }
        //[Requires penises]
        //(Thickens all cocks to a ratio of 1\" thickness per 5.5\"
        if (player.lowerBody.cockSpot.hasCock() && changes < changeLimit && Utils.rand(4) == 0) {
            //Use temp to see if any dicks can be thickened
            temp = 0;
            counter = 0;
            while (counter < player.lowerBody.cockSpot.count()) {
                if (player.lowerBody.cockSpot.list[counter].cockThickness * 5.5 < player.lowerBody.cockSpot.list[counter].cockLength) {
                    player.lowerBody.cockSpot.list[counter].cockThickness += .1;
                    temp = 1;
                }
                counter++;
            }
            //If something got thickened
            if (temp == 1) {
                MainScreen.text("\n\nYou can feel your " + multiCockDescriptLight() + " filling out in your " + player.armorName + ". Pulling ", false);
                if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("it", false);
                else MainScreen.text("them", false);
                MainScreen.text(" out, you look closely.  ", false);
                if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("It's", false);
                else MainScreen.text("They're", false);
                MainScreen.text(" definitely thicker.", false);
                let counter: number;
                changes++;
            }
        }
        //[Increase to Breast Size] - up to Large DD
        if (player.smallestTitSize() < 6 && changes < changeLimit && Utils.rand(4) == 0) {
            MainScreen.text("\n\nAfter eating it, your chest aches and tingles, and your hands reach up to scratch at it unthinkingly.  Silently, you hope that you aren't allergic to it.  Just as you start to scratch at your " + breastDescript(player.smallestTitRow()) + ", your chest pushes out in slight but sudden growth.", false);
            player.upperBody.chest.list[player.smallestTitRow()].breastRating++;
            changes++;
        }
        //[Increase to Ass Size] - to 11
        if (player.lowerBody.butt.buttRating < 11 && changes < changeLimit && Utils.rand(4) == 0) {
            MainScreen.text("\n\nYou look over your shoulder at your " + buttDescript() + " only to see it expand just slightly. You gape in confusion before looking back at the remaining silk in your hands. You finish it anyway. Dammit!", false);
            player.lowerBody.butt.buttRating++;
            changes++;
        }
        //***************
        //Appearance Changes
        //***************
        //(Ears become pointed if not human)
        if (player.upperBody.head.earType != EARS.HUMAN && player.upperBody.head.earType != EARS.ELFIN && Utils.rand(4) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYour ears twitch once, twice, before starting to shake and tremble madly.  They migrate back towards where your ears USED to be, so long ago, finally settling down before twisting and stretching, changing to become <b>new, pointed elfin ears.</b>", false);
            player.upperBody.head.earType = EARS.ELFIN;
            changes++;
        }
        //(Fur/Scales fall out)
        if (player.skinType != SKIN.PLAIN && (player.upperBody.head.earType == EARS.HUMAN || player.upperBody.head.earType == EARS.ELFIN) && Utils.rand(4) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nA slowly-building itch spreads over your whole body, and as you idly scratch yourself, you find that your " + player.skinFurScales() + " ", false);
            if (player.skinType == SKIN.SCALES) MainScreen.text("are", false);
            else MainScreen.text("is", false);
            MainScreen.text(" falling to the ground, revealing flawless, almost pearly-white skin underneath.  <b>You now have pale white skin.</b>", false);
            player.skinTone = "pale white";
            player.skinAdj = "";
            player.skinType = SKIN.PLAIN;
            player.skinDesc = "skin";
            changes++;
        }
        //(Gain human face)
        if (player.skinType == SKIN.PLAIN && (player.faceType != FACE.SPIDER_FANGS && player.faceType != FACE.HUMAN) && changes < changeLimit && Utils.rand(4) == 0) {
            MainScreen.text("\n\nWracked by pain, your face slowly reforms into a perfect human shape.  Awed by the transformation, you run your fingers delicately over the new face, marvelling at the change.  <b>You have a human face again!</b>", false);
            player.faceType = FACE.HUMAN;
            changes++;
        }
        //-Remove breast rows over 2.
        if (changes < changeLimit && player.bRows() > 2 && Utils.rand(3) == 0 && !flags[FlagEnum.HYPER_HAPPY]) {
            changes++;
            MainScreen.text("\n\nYou stumble back when your center of balance shifts, and though you adjust before you can fall over, you're left to watch in awe as your bottom-most " + breastDescript(player.upperBody.chest.count() - 1) + " shrink down, disappearing completely into your ", false);
            if (player.bRows() >= 3) MainScreen.text("abdomen", false);
            else MainScreen.text("chest", false);
            MainScreen.text(". The " + nippleDescript(player.upperBody.chest.count() - 1) + "s even fade until nothing but ", false);
            if (player.skinType == SKIN.FUR) MainScreen.text(player.hairColor + " " + player.skinDesc, false);
            else MainScreen.text(player.skinTone + " " + player.skinDesc, false);
            MainScreen.text(" remains. <b>You've lost a row of breasts!</b>", false);
            dynStats("sen", -5);
            player.removeBreastRow(player.upperBody.chest.count() - 1, 1);
        }
        //-Nipples reduction to 1 per tit.
        if (player.averageNipplesPerBreast() > 1 && changes < changeLimit && Utils.rand(4) == 0) {
            MainScreen.text("\n\nA chill runs over your " + allBreastsDescript() + " and vanishes.  You stick a hand under your " + player.armorName + " and discover that your extra nipples are missing!  You're down to just one per ", false);
            if (player.upperBody.chest.BreastRatingLargest[0].breastRating < 1) MainScreen.text("'breast'.", false);
            else MainScreen.text("breast.", false);
            changes++;
            //Loop through and reset nipples
            for (temp = 0; temp < player.upperBody.chest.count(); temp++) {
                player.upperBody.chest.list[temp].nipplesPerBreast = 1;
            }
        }
        //Nipples Turn Black:
        if (player.findStatusAffect(StatusAffects.BlackNipples) < 0 && Utils.rand(6) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nA tickling sensation plucks at your nipples and you cringe, trying not to giggle.  Looking down you are in time to see the last spot of flesh tone disappear from your [nipples].  They have turned an onyx black!");
            player.statusAffects.add(new StatusAffect("BlackNipples", 0, 0, 0, 0)));
            changes++;
        }
        //eyes!
        if (player.skinType == SKIN.PLAIN && (player.faceType != FACE.SPIDER_FANGS || player.faceType != FACE.HUMAN) && player.eyeType == EYES.HUMAN && Utils.rand(4) == 0 && changes < changeLimit) {
            player.eyeType = EYES.FOUR_SPIDER_EYES;
            changes++;
            MainScreen.text("\n\nYou suddenly get the strangest case of double vision.  Stumbling and blinking around, you clutch at your face, but you draw your hands back when you poke yourself in the eye.  Wait, those fingers were on your forehead!  You tentatively run your fingertips across your forehead, not quite believing what you felt.  <b>There's a pair of eyes on your forehead, positioned just above your normal ones!</b>  This will take some getting used to!", false);
            dynStats("int", 5);
        }
        //(Gain spider fangs)
        if (player.faceType == FACE.HUMAN && player.skinType == SKIN.PLAIN && changes < changeLimit && Utils.rand(4) == 0) {
            MainScreen.text("\n\nTension builds within your upper gum, just above your canines.  You open your mouth and prod at the affected area, pricking your finger on the sharpening tooth.  It slides down while you're touching it, lengthening into a needle-like fang.  You check the other side and confirm your suspicions.  <b>You now have a pair of pointy spider-fangs, complete with their own venom!</b>", false);
            player.faceType = FACE.SPIDER_FANGS;
            changes++;
        }
        //(Arms to carapace-covered arms)
        if (player.armType != ARM.SPIDER && changes < changeLimit && Utils.rand(4) == 0) {
            MainScreen.text("\n\n", false);
            //(Bird pretext)
            if (player.armType == ARM.HARPY) MainScreen.text("The feathers covering your arms fall away, leaving them to return to a far more human appearance.  ", false);
            MainScreen.text("You watch, spellbound, while your forearms gradually become shiny.  The entire outer structure of your arms tingles while it divides into segments, turning the " + player.skinFurScales() + " into a shiny black carapace.  You touch the onyx exoskeleton and discover to your delight that you can still feel through it as naturally as your own skin.", false);
            player.armType = ARM.SPIDER;
            changes++;
        }
        //(Centaurs -> Normal Human Legs) (copy from elsewhere)
        if (player.isTaur() && changes < changeLimit && Utils.rand(4) == 0) {
            MainScreen.text("\n\nYour quadrupedal hind-quarters seizes, overbalancing your surprised front-end and causing you to stagger and fall to your side.  Pain lances throughout, contorting your body into a tightly clenched ball of pain while tendons melt and bones break, melt, and regrow.  When it finally stops, <b>you look down to behold your new pair of human legs</b>!", false);
            player.lowerBody = LOWER_BODY.HUMAN;
            changes++;
        }
        //(Goo -> Normal Human Legs) (copy from elsewhere)
        if (player.isGoo() && changes < changeLimit && Utils.rand(4) == 0) {
            MainScreen.text("\n\nYour lower body rushes inward, molding into two leg-like shapes that gradually stiffen up.  In moments they solidify into normal-looking legs, complete with regular, human feet.  <b>You now have normal feet!</b>", false);
            player.lowerBody = LOWER_BODY.HUMAN;
            changes++;
        }
        //(Naga -> Normal Human Legs) (copy from elsewhere)
        if (player.isNaga() && changes < changeLimit && Utils.rand(4) == 0) {
            MainScreen.text("\n\nYou collapse as your sinuous snake-tail tears in half, shifting into legs.  The pain is immense, particularly where your new feet are forming.  <b>You have human legs again.</b>", false);
            player.lowerBody = LOWER_BODY.HUMAN;
            changes++;
        }
        //Drider butt
        if (type == 1 && !player.perks.has("SpiderOvipositor") && player.isDrider() && player.tailType == TAIL.SPIDER_ADBOMEN && changes < changeLimit && Utils.rand(3) == 0 && (player.hasVagina || Utils.rand(2) == 0)) {
            MainScreen.text("\n\nAn odd swelling sensation floods your spider half.  Curling your abdomen underneath you for a better look, you gasp in recognition at your new 'equipment'!  Your semi-violent run-ins with the swamp's population have left you <i>intimately</i> familiar with the new appendage.  <b>It's a drider ovipositor!</b>  A few light prods confirm that it's just as sensitive as any of your other sexual organs.  You idly wonder what laying eggs with this thing will feel like...");
            MainScreen.text("\n\n(<b>Perk Gained:  Spider Ovipositor - Allows you to lay eggs in your foes!</b>)");
            //V1 - Egg Count
            //V2 - Fertilized Count
            player.createPerk(PerkLib.SpiderOvipositor, 0, 0, 0, 0);
            //Opens up drider ovipositor scenes from available mobs. The character begins producing unfertilized eggs in their arachnid abdomen. Egg buildup raises minimum lust and eventually lowers speed until the player has gotten rid of them.  This perk may only be used with the drider lower body, so your scenes should reflect that.
            //Any PC can get an Ovipositor perk, but it will be much rarer for characters without vaginas.
            //Eggs are unfertilized by default, but can be fertilized:
            //-female/herm characters can fertilize them by taking in semen; successfully passing a pregnancy check will convert one level ofunfertilized eggs to fertilized, even if the PC is already pregnant.
            //-male/herm characters will have a sex dream if they reach stage three of unfertilized eggs; this will represent their bee/drider parts drawing their own semen from their body to fertilize the eggs, and is accompanied by a nocturnal emission.
            //-unsexed characters cannot currently fertilize their eggs.
            //Even while unfertilized, eggs can be deposited inside NPCs - obviously, unfertilized eggs will never hatch and cannot lead to any egg-birth scenes that may be written later.
            changes++;
        }
        //(Normal Biped Legs -> Carapace-Clad Legs)
        if (((type == 1 && player.lowerBody != LOWER_BODY.DRIDER_LOWER_BODY && player.lowerBody != LOWER_BODY.CHITINOUS_SPIDER_LEGS) || (type != 1 && player.lowerBody != LOWER_BODY.CHITINOUS_SPIDER_LEGS)) && (!player.isGoo() && !player.isNaga() && !player.isTaur()) && changes < changeLimit && Utils.rand(4) == 0) {
            MainScreen.text("\n\nStarting at your " + player.feet() + ", a tingle runs up your " + player.legs() + ", not stopping until it reaches your thighs.  From the waist down, your strength completely deserts you, leaving you to fall hard on your " + buttDescript() + " in the dirt.  With nothing else to do, you look down, only to be mesmerized by the sight of black exoskeleton creeping up a perfectly human-looking calf.  It crests up your knee to envelop the joint in a many-faceted onyx coating.  Then, it resumes its slow upward crawl, not stopping until it has girded your thighs in glittery, midnight exoskeleton.  From a distance it would look almost like a black, thigh-high boot, but you know the truth.  <b>You now have human-like legs covered in a black, arachnid exoskeleton.</b>", false);
            player.lowerBody = LOWER_BODY.CHITINOUS_SPIDER_LEGS;
            changes++;
        }
        //(Tail becomes spider abdomen GRANT WEB ATTACK)
        if (player.tailType != TAIL.SPIDER_ADBOMEN && (player.lowerBody == LOWER_BODY.CHITINOUS_SPIDER_LEGS || player.lowerBody == LOWER_BODY.DRIDER_LOWER_BODY) && player.armType == ARM.SPIDER && Utils.rand(4) == 0) {
            MainScreen.text("\n\n", false);
            //(Pre-existing tails)
            if (player.tailType > TAIL.NONE) MainScreen.text("Your tail shudders as heat races through it, twitching violently until it feels almost as if it's on fire.  You jump from the pain at your " + buttDescript() + " and grab at it with your hands.  It's huge... and you can feel it hardening under your touches, firming up until the whole tail has become rock-hard and spherical in shape.  The heat fades, leaving behind a gentle warmth, and you realize your tail has become a spider's abdomen!  With one experimental clench, you even discover that it can shoot webs from some of its spinnerets, both sticky and non-adhesive ones.  That may prove useful.  <b>You now have a spider's abdomen hanging from above your " + buttDescript() + "!</b>\n\n", false);
            //(No tail)
            else MainScreen.text("A burst of pain hits you just above your " + buttDescript() + ", coupled with a sensation of burning heat and pressure.  You can feel your " + player.skinFurScales() + " tearing as something forces its way out of your body.  Reaching back, you grab at it with your hands.  It's huge... and you can feel it hardening under your touches, firming up until the whole tail has become rock-hard and spherical in shape.  The heat fades, leaving behind a gentle warmth, and you realize your tail has become a spider's abdomen!  With one experimental clench, you even discover that it can shoot webs from some of its spinnerets, both sticky and non-adhesive ones.  That may prove useful.  <b>You now have a spider's abdomen hanging from above your " + buttDescript() + "!</b>", false);
            player.tailType = TAIL.SPIDER_ADBOMEN;
            player.lowerBody.tailVenom = 5;
            player.lowerBody.tailRecharge = 5;
            changes++;
        }
        //(Drider Item Only: Carapace-Clad Legs to Drider Legs)
        if (type == 1 && player.lowerBody == LOWER_BODY.CHITINOUS_SPIDER_LEGS && Utils.rand(4) == 0 && player.tailType == TAIL.SPIDER_ADBOMEN) {
            MainScreen.text("\n\nJust like when your legs changed to those of a spider-morph, you find yourself suddenly paralyzed below the waist.  Your dark, reflective legs splay out and drop you flat on your back.   Before you can sit up, you feel tiny feelers of pain mixed with warmth and tingling running through them.  Terrified at the thought of all the horrible changes that could be wracking your body, you slowly sit up, expecting to find yourself turned into some incomprehensible monstrosity from the waist down.  As if to confirm your suspicions, the first thing you see is that your legs have transformed into eight long, spindly legs.  Instead of joining directly with your hips, they now connect with the spider-like body that has sprouted in place of where your legs would normally start.  Your abdomen has gotten even larger as well.  Once the strength returns to your new, eight-legged lower body, you struggle up onto your pointed 'feet', and wobble around, trying to get your balance.  As you experiment with your new form, you find you're even able to twist the spider half of your body down between your legs in an emulation of your old, bipedal stance.  That might prove useful should you ever want to engage in 'normal' sexual positions, particularly since your " + buttDescript() + " is still positioned just above the start of your arachnid half.  <b>You're now a drider.</b>", false);
            player.lowerBody = LOWER_BODY.DRIDER_LOWER_BODY;
            changes++;
        }
        if (Utils.rand(4) == 0 && player.upperBody.gills && changes < changeLimit) {
            MainScreen.text("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.", false);
            player.upperBody.gills = false;
            changes++;
        }
        if (changes == 0) {
            MainScreen.text("\n\nThe sweet silk energizes you, leaving you feeling refreshed.", false);
            fatigue(-33);
        }
    }

    /*
            public  applyLustStick(player:Player):void
            {
                MainScreen.text("", true);
                if (player.statusAffects.has("LustStickApplied")) {
                    player.statusAffects.get("LustStickApplied").value1 = 12 + Utils.rand(12);
                    MainScreen.text("You carefully open the sweet-smelling tube and smear the lipstick over the coat you already have on your lips.  <b>No doubt another layer will make it last even longer!</b>  ", false);
                    MainScreen.text("You finish and pucker your lips, feeling fairly sexy with your new, thicker makeup on.\n\n", false);
                }
                else {
                    player.statusAffects.add(new StatusAffect("LustStickApplied", 24, 0, 0, 0)));
                    MainScreen.text("You carefully open the sweet-smelling tube and smear the lipstick over your lips.  ", false);
                    if (player.lowerBody.cockSpot.hasCock()) MainScreen.text("It tingles a little, but the drugs have little to no effect on you now.", false);
                    else MainScreen.text("Honestly, it amazes you that something as little as a kiss can make a man putty in your hands.", false);
                    MainScreen.text("  You finish and pucker your lips, feeling fairly sexy with your new makeup on.\n\n", false);
                }
                dynStats("lus", 1);
    
            }
    */

    public broBrew(player: Player): void {
        MainScreen.text("", true);
        //no drink for bimbos!
        if (player.perks.has("BimboBody")) {
            MainScreen.text("The stuff hits you like a giant cube, nearly staggering you as it begins to settle.", false);
            if (player.tallness < 77) {
                player.tallness = 77;
                MainScreen.text(".. Did the ground just get farther away?  You glance down and realize, you're growing!  Like a sped-up flower sprout, you keep on getting taller until finally stopping around... six and a half feet, you assume.  Huh.  You didn't expect that to happen!", false);
            }
            if (player.tone < 100) {
                MainScreen.text("  A tingling in your arm draws your attention just in time to see your biceps and triceps swell with new-found energy, skin tightening until thick cords of muscle run across the whole appendage.  Your other arm surges forward with identical results.  To compensate, your shoulders and neck widen to bodybuilder-like proportions while your chest and abs tighten to a firm, statuesque physique.  Your " + player.legs() + " and glutes are the last to go, bulking up to proportions that would make any female martial artist proud.  You feel like you could kick forever with legs this powerful.", false);
                player.tone = 100;
            }
            MainScreen.text("\n\n", false);

            //female
            if (!player.lowerBody.cockSpot.hasCock()) {
                MainScreen.text("The beverage isn't done yet, however, and it makes it perfectly clear with a building pleasure in your groin.  You can only cry in ecstasy and loosen the bottoms of your " + player.armorName + " just in time for a little penis to spring forth.  You watch, enthralled, as blood quickly stiffens the shaft to its full length – then keeps on going!  Before long, you have a quivering 10-inch maleness, just ready to stuff into a welcoming box.", false);
                player.lowerBody.cockSpot.add(new Cock());
                player.lowerBody.cockSpot.list[0].cockLength = 10;
                player.lowerBody.cockSpot.list[0].cockThickness = 2;
                if (player.lowerBody.balls == 0) {
                    MainScreen.text("  Right on cue, two cum-laden testicles drop in behind it, their contents swirling and churning.", false);
                    player.lowerBody.balls = 2;
                    player.lowerBody.ballSize = 3;
                }
                MainScreen.text("\n\n", false);
            }
            else if (player.lowerBody.balls == 0) {
                MainScreen.text("A swelling begins behind your man-meat, and you're assailed with an incredibly peculiar sensation as two sperm-filled balls drop into a newly-formed scrotum.  Frikkin' sweet!\n\n", false);
                player.lowerBody.balls = 2;
                player.lowerBody.ballSize = 3;
            }
            MainScreen.text("Finally, you feel the transformation skittering to a halt, leaving you to openly roam your new chiseled and sex-ready body.  So what if you can barely form coherent sentences anymore?  A body like this does all the talking you need, you figure!", false);
            if (player.stats.int > 35) {
                player.stats.int = 35;
                dynStats("int", -0.1);

            }
            if (player.stats.lib < 50) {
                player.stats.lib = 50;
                dynStats("lib", .1);
            }
            MainScreen.text("\n\n", false);
            if (player.perks.has("BimboBrains")) MainScreen.text("<b>(Lost Perks - Bimbo Brains, Bimbo Body)\n", false);
            else MainScreen.text("<b>(Lost Perk - Bimbo Body)\n", false);
            player.perks.remove("BimboBrains");
            player.perks.remove("BimboBody");
            player.createPerk(PerkLib.FutaForm, 0, 0, 0, 0);
            player.createPerk(PerkLib.FutaFaculties, 0, 0, 0, 0);
            MainScreen.text("(Gained Perks - Futa Form, Futa Faculties)</b>", false);
            player.genderCheck();
            return;
        }
        //HP restore for bros!
        if (player.perks.has("BroBody") || player.perks.has("FutaForm")) {
            MainScreen.text("You crack open the can and guzzle it in a hurry.  Goddamn, this shit is the best.  As you crush the can against your forehead, you wonder if you can find a six-pack of it somewhere?\n\n", false);
            fatigue(-33);
            HPChange(100, true);
            return;
        }
        MainScreen.text("Well, maybe this will give you the musculature that you need to accomplish your goals.  You pull on the tab at the top and hear the distinctive snap-hiss of venting, carbonating pressure.  A smoky haze wafts from the opened container, smelling of hops and alcohol.  You lift it to your lips, the cold, metallic taste of the can coming to your tongue before the first amber drops of beer roll into your waiting mouth.  It tingles, but it's very, very good.  You feel compelled to finish it as rapidly as possible, and you begin to chug it.  You finish the entire container in seconds.\n\n", false);

        MainScreen.text("A churning, full sensation wells up in your gut, and without thinking, you open wide to release a massive burp. It rumbles through your chest, startling birds into flight in the distance.  Awesome!  You slam the can into your forehead hard enough to smash the fragile aluminum into a flat, crushed disc.  Damn, you feel stronger already", false);
        if (player.stats.int > 50) MainScreen.text(", though you're a bit worried by how much you enjoyed the simple, brutish act", false);
        MainScreen.text(".\n\n", false);

        //(Tits b' gone)
        if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 1) {
            MainScreen.text("A tingle starts in your " + nippleDescript(0) + "s before the tight buds grow warm, hot even.  ", false);
            if (player.biggestLactation() >= 1) MainScreen.text("Somehow, you know that the milk you had been producing is gone, reabsorbed by your body.  ", false);
            MainScreen.text("They pinch in towards your core, shrinking along with your flattening " + allChestDesc() + ".  You shudder and flex in response.  Your chest isn't just shrinking, it's reforming, sculping itself into a massive pair of chiseled pecs.  ", false);
            if (player.upperBody.chest.count() > 1) {
                MainScreen.text("The breasts below vanish entirely.  ", false);
                while (player.upperBody.chest.count() > 1) {
                    player.removeBreastRow(player.upperBody.chest.count() - 1, 1);
                }
            }
            player.upperBody.chest.list[0].breastRating = 0;
            player.upperBody.chest.list[0].nipplesPerBreast = 1;
            player.upperBody.chest.list[0].fuckable = false;
            if (player.upperBody.chest.BreastRatingLargest[0].nippleLength > .5) player.upperBody.chest.BreastRatingLargest[0].nippleLength = .25;
            player.upperBody.chest.list[0].lactationMultiplier = 0;
            player.statusAffects.remove("Feeder");
            player.perks.remove("Feeder");
            MainScreen.text("All too soon, your boobs are gone.  Whoa!\n\n", false);
        }

        MainScreen.text("Starting at your hands, your muscles begin to contract and release, each time getting tighter, stronger, and more importantly - larger.  The oddness travels up your arms, thickens your biceps, and broadens your shoulders.  Soon, your neck and chest are as built as your arms.  You give a few experimental flexes as your abs ", false);
        if (player.tone >= 70) MainScreen.text("further define themselves", false);
        else MainScreen.text("become extraordinarily visible", false);
        MainScreen.text(".  The strange, muscle-building changes flow down your " + player.legs() + ", making them just as fit and strong as the rest of you.  You curl your arm and kiss your massive, flexing bicep.  You're awesome!\n\n", false);

        MainScreen.text("Whoah, you're fucking ripped and strong, not at all like the puny weakling you were before.  Yet, you feel oddly wool-headed.  Your thoughts seem to be coming slower and slower, like they're plodding through a marsh.  You grunt in frustration at the realization.  Sure, you're a muscle-bound hunk now, but what good is it if you're as dumb as a box of rocks?  Your muscles flex in the most beautiful way, so you stop and strike a pose, mesmerized by your own appearance.  Fuck thinking, that shit's for losers!\n\n", false);

        //(has dick less than 10 inches)
        if (player.lowerBody.cockSpot.hasCock()) {
            if (player.lowerBody.cockSpot.list[0].cockLength < 10) {
                MainScreen.text("As if on cue, the familiar tingling gathers in your groin, and you dimly remember you have one muscle left to enlarge.  If only you had the intelligence left to realize that your penis is not a muscle.  In any event, your " + cockDescript(0) + " swells in size, ", false);
                if (player.lowerBody.cockSpot.list[0].cockThickness < 2.75) {
                    MainScreen.text("thickening and ", false);
                    player.lowerBody.cockSpot.list[0].cockThickness = 2.75;
                }
                MainScreen.text("lengthening until it's ten inches long and almost three inches wide.  Fuck, you're hung!  ", false);
                player.lowerBody.cockSpot.list[0].cockLength = 10;
            }
            //Dick already big enough! BALL CHECK!
            if (player.lowerBody.balls > 0) {
                MainScreen.text("Churning audibly, your " + sackDescript() + " sways, but doesn't show any outward sign of change.  Oh well, it's probably just like, getting more endurance or something.", false);
            }
            else {
                MainScreen.text("Two rounded orbs drop down below, filling out a new, fleshy sac above your " + player.legs() + ".  Sweet!  You can probably cum buckets with balls like these.", false);
                player.lowerBody.balls = 2;
                player.lowerBody.ballSize = 3;
            }
            MainScreen.text("\n\n", false);
        }
        //(No dick)
        else {
            MainScreen.text("You hear a straining, tearing noise before you realize it's coming from your underwear.  Pulling open your " + player.armorName + ", you gasp in surprise at the huge, throbbing manhood that now lies between your " + hipDescript() + ".  It rapidly stiffens to a full, ten inches, and goddamn, it feels fucking good.  You should totally find a warm hole to fuck!", false);
            if (player.lowerBody.balls == 0) MainScreen.text("  Two rounded orbs drop down below, filling out a new, fleshy sac above your " + player.legs() + ".  Sweet!  You can probably cum buckets with balls like these.", false);
            MainScreen.text("\n\n", false);
            player.lowerBody.cockSpot.add(new Cock());
            player.lowerBody.cockSpot.list[0].cockLength = 12;
            player.lowerBody.cockSpot.list[0].cockThickness = 2.75;
            if (player.lowerBody.balls == 0) {
                player.lowerBody.balls = 2;
                player.lowerBody.ballSize = 3;
            }
        }
        //(Pussy b gone)
        if (player.lowerBody.vaginaSpot.hasVagina()) {
            MainScreen.text("At the same time, your " + vaginaDescript(0) + " burns hot, nearly feeling on fire.  You cuss in a decidedly masculine way for a moment before the pain fades to a dull itch.  Scratching it, you discover your lady-parts are gone.  Only a sensitive patch of skin remains.\n\n", false);
            player.removeVagina(0, 1);
        }
        player.genderCheck();
        //(below max masculinity)
        if (player.femininity > 0) {
            MainScreen.text("Lastly, the change hits your face.  You can feel your jawbones shifting and sliding around, your skin changing to accommodate your face's new shape.  Once it's finished, you feel your impeccable square jaw and give a wide, easy-going grin.  You look awesome!\n\n", false);
            player.modFem(0, 100);
        }
        MainScreen.text("You finish admiring yourself and adjust your " + player.armorName + " to better fit your new physique.  Maybe there's some bitches around you can fuck.  Hell, as good as you look, you might have other dudes wanting you to fuck them too, no homo.\n\n", false);
        //max tone.  Thickness + 50
        player.modTone(100, 100);
        player.modThickness(100, 50);
        //Bonus cum production!
        player.createPerk(PerkLib.BroBrains, 0, 0, 0, 0);
        player.createPerk(PerkLib.BroBody, 0, 0, 0, 0);
        MainScreen.text("<b>(Bro Body - Perk Gained!)\n", false);
        MainScreen.text("(Bro Brains - Perk Gained!)</b>\n", false);//int to 20.  max int 50)
        if (player.perks.has("Feeder")) {
            MainScreen.text("<b>(Perk Lost - Feeder!)</b>\n", false);
            player.perks.remove("Feeder");
        }
        if (player.stats.int > 21) player.stats.int = 21;
        dynStats("str", 33, "tou", 33, "int", -1, "lib", 4, "lus", 40);
    }


    //Miscellaneous
    //ITEM GAINED FROM LUST WINS
    //bottle of ectoplasm. Regular stat-stuff include higher speed, (reduced libido?), reduced sensitivity, and higher intelligence. First-tier effects include 50/50 chance of sable skin with bone-white veins or ivory skin with onyx veins. Second tier, \"wisp-like legs that flit back and forth between worlds,\" or \"wisp-like legs\" for short. Third tier gives an \"Ephemeral\" perk, makes you (10%, perhaps?) tougher to hit, and gives you a skill that replaces tease/seduce—allowing the PC to possess the creature and force it to masturbate to gain lust. Around the same effectiveness as seduce.
    //Mouseover script: \"The green-tinted, hardly corporeal substance flows like a liquid inside its container. It makes you feel...uncomfortable, as you observe it.\"

    //Bottle of Ectoplasm Text
    public ectoplasm(player: Player): void {
        MainScreen.text("", true);
        MainScreen.text("You grimace and uncork the bottle, doing your best to ignore the unearthly smell drifting up to your nostrils. Steeling yourself, you raise the container to your lips and chug the contents, shivering at the feel of the stuff sliding down your throat.  Its taste, at least, is unexpectedly pleasant.  Almost tastes like oranges.", false);
        let changes: number = 0;
        let changeLimit: number = 1;
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(3) == 0) changeLimit++;
        if (player.perks.has("HistoryAlchemist")) changeLimit++;
        //Effect script 1:  (higher intelligence)
        if (player.stats.int < 100 && Utils.rand(3) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYou groan softly as your head begins pounding something fierce.  Wincing in pain, you massage your temples as the throbbing continues, and soon, the pain begins to fade; in its place comes a strange sense of sureness and wit.", false);
            dynStats("int", 1);
            if (player.stats.int < 50) dynStats("int", 1);
            changes++;
        }
        //Effect script 2:  (lower sensitivity)
        if (player.stats.sens >= 20 && Utils.rand(3) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nWoah, what the... you pinch your " + player.skinFurScales() + " to confirm your suspicions; the ghostly snack has definitely lowered your sensitivity.", false);
            dynStats("sen", -2);
            if (player.stats.sens >= 75) dynStats("sen", -2);
            changes++;
        }
        //Effect script 3:  (higher libido)
        if (player.stats.lib < 100 && Utils.rand(3) == 0 && changes < changeLimit) {
            //([if libido >49]
            if (player.stats.lib < 50) MainScreen.text("\n\nIdly, you drop a hand to your crotch as", false);
            else MainScreen.text("\n\nWith a substantial amount of effort, you resist the urge to stroke yourself as", false);
            MainScreen.text(" a trace amount of the ghost girl's lust is transferred into you.  How horny IS she, you have to wonder...", false);
            dynStats("lib", 1);
            if (player.stats.lib < 50) dynStats("lib", 1);
            changes++;
        }
        //Effect script a:  (human wang)
        if (player.lowerBody.cockSpot.hasCock() && changes < changeLimit) {
            if (Utils.rand(3) == 0 && player.lowerBody.cockSpot.list[0].cockType != CockType.HUMAN) {
                MainScreen.text("\n\nA strange tingling begins behind your " + cockDescript(0) + ", slowly crawling up across its entire length.  While neither particularly arousing nor uncomfortable, you do shift nervously as the feeling intensifies.  You resist the urge to undo your " + player.armorName + " to check, but by the feel of it, your penis is shifting form.  Eventually the transformative sensation fades, <b>leaving you with a completely human penis.</b>", false);
                player.lowerBody.cockSpot.list[0].cockType = CockType.HUMAN;
                changes++;
            }
        }
        //Appearnace Change
        //Hair
        if (Utils.rand(4) == 0 && changes < changeLimit && player.upperBody.head.hairType != 2) {
            MainScreen.text("\n\nA sensation of weightlessness assaults your scalp. You reach up and grab a handful of hair, confused. Your perplexion only heightens when you actually feel the follicles becoming lighter in your grasp, before you can hardly tell you're holding anything.  Plucking a stUtils.rand, you hold it up before you, surprised to see... it's completely transparent!  You have transparent hair!", false);
            player.upperBody.head.hairType = 2;
            changes++;
        }
        //Skin
        if (Utils.rand(4) == 0 && changes < changeLimit && (player.skinTone != "sable" && player.skinTone != "white")) {
            if (Utils.rand(2) == 0) {
                MainScreen.text("\n\nA warmth begins in your belly, slowly spreading through your torso and appendages. The heat builds, becoming uncomfortable, then painful, then nearly unbearable. Your eyes unfocus from the pain, and by the time the burning sensation fades, you can already tell something's changed. You raise a hand, staring at the milky-white flesh. Your eyes are drawn to the veins in the back of your hand, darkening to a jet black as you watch. <b>You have white skin, with black veins!</b>", false);
                player.skinTone = "white";
                player.skinAdj = "milky";
                player.skinDesc = "skin";
                player.skinType = SKIN.PLAIN;
            }
            else {
                MainScreen.text("\n\nA warmth begins in your belly, slowly spreading through your torso and appendages. The heat builds, becoming uncomfortable, then painful, then nearly unbearable. Your eyes unfocus from the pain, and by the time the burning sensation fades, you can already tell something's changed. You raise a hand, staring at the sable flesh. Your eyes are drawn to the veins in the back of your hand, brightening to an ashen tone as you watch.  <b>You have black skin, with white veins!</b>", false);
                player.skinTone = "sable";
                player.skinAdj = "ashen";
                player.skinDesc = "skin";
                player.skinType = SKIN.PLAIN;
            }
            changes++;
        }
        //Legs
        if (changes < changeLimit && !player.perks.has("Incorporeality") && (player.skinTone == "white" || player.skinTone == "sable") && player.upperBody.head.hairType == 2) {
            //(ghost-legs!  Absolutely no problem with regular encounters, though! [if you somehow got this with a centaur it'd probably do nothing cuz you're not supposed to be a centaur with ectoplasm ya dingus])
            MainScreen.text("\n\nAn otherworldly sensation begins in your belly, working its way to your " + hipDescript() + ". Before you can react, your " + player.legs() + " begin to tingle, and you fall on your rump as a large shudder runs through them. As you watch, your lower body shimmers, becoming ethereal, wisps rising from the newly ghost-like " + player.legs() + ". You manage to rise, surprised to find your new, ghostly form to be as sturdy as its former corporeal version. Suddenly, like a dam breaking, fleeting visions and images flow into your head, never lasting long enough for you to concentrate on one. You don't even realize it, but your arms fly up to your head, grasping your temples as you groan in pain. As fast as the mental bombardment came, it disappears, leaving you with a surprising sense of spiritual superiority.  <b>You have ghost legs!</b>\n\n", false);
            MainScreen.text("<b>(Gained Perk:  Incorporeality</b>)", false);
            player.createPerk(PerkLib.Incorporeality, 0, 0, 0, 0);
        }
        //Effect Script 8: 100% chance of healing
        if (changes == 0) {
            MainScreen.text("You feel strangely refreshed, as if you just gobbled down a bottle of sunshine.  A smile graces your lips as vitality fills you.  ", false);
            HPChange(player.level * 5 + 10, true);
            changes++;
        }
        //Incorporeality Perk Text:  You seem to have inherited some of the spiritual powers of the residents of the afterlife!  While you wouldn't consider doing it for long due to its instability, you can temporarily become incorporeal for the sake of taking over enemies and giving them a taste of ghostly libido.

        //Sample possession text (>79 int, perhaps?):  With a smile and a wink, your form becomes completely intangible, and you waste no time in throwing yourself into your opponent's frame. Before they can regain the initiative, you take control of one of their arms, vigorously masturbating for several seconds before you're finally thrown out. Recorporealizing, you notice your enemy's blush, and know your efforts were somewhat successful.
        //Failure:  With a smile and a wink, your form becomes completely intangible, and you waste no time in throwing yourself into the opponent's frame. Unfortunately, it seems they were more mentally prepared than you hoped, and you're summarily thrown out of their body before you're even able to have fun with them. Darn, you muse. Gotta get smarter.
    }

    public isabellaMilk(player: Player): void {
        MainScreen.text("", true);
        MainScreen.text("You swallow down the bottle of Isabella's milk.", false);
        if (player.fatigue > 0) MainScreen.text("  You feel much less tired! (-33 fatigue)", false);
        fatigue(-33);
    }


    //TF item - Shriveled Tentacle
    //tooltip:
    public shriveledTentacle(player: Player): void {
        MainScreen.text("", true);
        MainScreen.text("You chew on the rubbery tentacle; its texture and taste are somewhat comparable to squid, but the half-dormant nematocysts cause your mouth to tingle sensitively.", false);
        let changes: number = 0;
        let changeLimit: number = 1;
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(3) == 0) changeLimit++;
        if (player.perks.has("HistoryAlchemist")) changeLimit++;

        //possible use effects:
        //- toughess up, sensitivity down
        if (Utils.rand(3) == 0 && player.tou < 50 && changes < changeLimit) {
            MainScreen.text("\n\nYour skin feels clammy and a little rubbery.  You touch yourself experimentally and notice that you can barely feel the pressure from your fingertips.  Consumed with curiosity, you punch yourself lightly in the arm; the most you feel is a dull throb!", false);
            dynStats("tou", 1, "sen", -1);
            changes++;
        }
        //- speed down
        if (Utils.rand(3) == 0 && player.stats.spe > 40 && changes < changeLimit) {
            MainScreen.text("\n\nA pinprick sensation radiates from your stomach down to your knees, as though your legs were falling asleep.  Wobbling slightly, you stand up and take a few stumbling steps to work the blood back into them.  The sensation fades, but your grace fails to return and you stumble again.  You'll have to be a little more careful moving around for a while.", false);
            changes++;
            dynStats("spe", -1);
        }
        //- corruption increases by 1 up to low threshold (~20)
        if (Utils.rand(3) == 0 && player.stats.cor < 20 && changes < changeLimit) {
            MainScreen.text("\n\nYou shiver, a sudden feeling of cold rushing through your extremities.", false);
            changes++;
            dynStats("cor", 1);
        }
        //-always increases lust by a  of sensitivity
        //"The tingling of the tentacle

        //physical changes:
        //- may Utils.randomly remove bee abdomen, if present; always checks and does so when any changes to hair might happen
        if (Utils.rand(4) == 0 && changes < changeLimit && player.tailType == TAIL.BEE_ABDOMEN) {
            MainScreen.text("\n\nAs the gentle tingling of the tentacle's remaining venom spreads through your body, it begins to collect and intensify above the crack of your butt.  Looking back, you notice your abdomen shivering and contracting; with a snap, the chitinous appendage parts smoothly from your backside and falls to the ground.  <b>You no longer have a bee abdomen!</b>\n\n", false);
            player.tailType = TAIL.NONE;
            changes++;
        }
        //-may Utils.randomly remove bee wings:
        if (Utils.rand(4) == 0 && (player.upperBody.wingType == WING.BEE_LIKE_SMALL || player.upperBody.wingType == WING.BEE_LIKE_LARGE) && changes < changeLimit) {
            MainScreen.text("\n\nYour wings twitch and flap involuntarily.  You crane your neck to look at them as best you are able; from what you can see, they seem to be shriveling and curling up.  They're starting to look a lot like they did when they first popped out, wet and new.  <b>As you watch, they shrivel all the way, then recede back into your body.</b>", false);
            player.upperBody.wingType = WING.NONE;
            player.upperBody.wingDesc = "non-existent";
            changes++;
        }
        //-hair morphs to anemone tentacles, retains color, hair shrinks back to med-short('shaggy') and stops growing, lengthening treatments don't work and goblins won't cut it, but more anemone items can lengthen it one level at a time
        if (player.upperBody.gills && player.upperBody.head.hairType != 4 && changes < changeLimit && Utils.rand(5) == 0) {
            MainScreen.text("\n\nYour balance slides way off, and you plop down on the ground as mass concentrates on your head.  Reaching up, you give a little shriek as you feel a disturbingly thick, squirming thing where your hair should be.  Pulling it down in front of your eyes, you notice it's still attached to your head; what's more, it's the same color as your hair used to be.  <b>You now have squirming tentacles in place of hair!</b>  As you gaze at it, a gentle heat starts to suffuse your hand.  The tentacles must be developing their characteristic stingers!  You quickly let go; you'll have to take care to keep them from rubbing on your skin at all hours.  On the other hand, they're quite short and you find you can now flex and extend them as you would any other muscle, so that shouldn't be too hard.  You settle on a daring, windswept look for now.", false);
            player.upperBody.head.hairType = 4;
            player.hairLength = 5;
            if (flags[FlagEnum.HAIR.GROWTH_STOPPED_BECAUSE_LIZARD] == 0) {
                MainScreen.text("  <b>(Your hair has stopped growing.)</b>", false);
                flags[FlagEnum.HAIR.GROWTH_STOPPED_BECAUSE_LIZARD] = 1;
            }
            changes++;
            changes++;
            changes++;
            //(reset hair to 'shaggy', add tentacle hair status, stop hair growth)
            //appearance screen: replace 'hair' with 'tentacle-hair'
        }
        //-feathery gills sprout from chest and drape sensually over nipples (cumulative swimming power boost with fin, if swimming is implemented)
        if (Utils.rand(5) == 0 && !player.upperBody.gills && player.skinTone == "aphotic blue-black" && changes < changeLimit) {
            MainScreen.text("\n\nYou feel a pressure in your lower esophageal region and pull your garments down to check the area.  <b>Before your eyes a pair of feathery gills start to push out of the center of your chest, just below your neckline, parting sideways and draping over your " + nippleDescript(0) + "s.</b>  They feel a bit uncomfortable in the open air at first, but soon a thin film of mucus covers them and you hardly notice anything at all.  You redress carefully.", false);
            player.upperBody.gills = true;
            changes++;
        }
        //-[aphotic] skin tone (blue-black)
        if (Utils.rand(5) == 0 && changes < changeLimit && player.skinTone != "aphotic blue-black") {
            MainScreen.text("\n\nYou absently bite down on the last of the tentacle, then pull your hand away, wincing in pain.  How did you bite your finger so hard?  Looking down, the answer becomes obvious; <b>your hand, along with the rest of your skin, is now the same aphotic color as the dormant tentacle was!</b>", false);
            player.skinTone = "aphotic blue-black";
            changes++;
        }
        //-eat more, grow more 'hair':
        if (player.upperBody.head.hairType == 4 && player.hairLength < 36 &&
            Utils.rand(2) == 0 && changes < changeLimit) {
            temp = 5 + Utils.rand(3);
            player.hairLength += temp;
            MainScreen.text("\n\nAs you laboriously chew the rubbery dried anemone, your head begins to feel heavier.  Using your newfound control, you snake one of your own tentacles forward; holding it out where you can see it, the first thing you notice is that it appears quite a bit longer.  <b>Your head-tentacles are now " + num2Text(temp) + " inches longer!</b>", false);
            //(add one level of hairlength)
            changes++;
        }
    }

    //ITEMS START

    //Numb Rocks
    public numbRocks(player: Player): void {
        MainScreen.text("", true);
        //Numb rocks lower lust significantly but have a chance of inducing the masturbation preventing effect from minotaur.
        MainScreen.text("You pop open the package of numb rocks and dump it into your waiting mouth.  The strange candy fizzes and pops, leaving the nerves on your tongue feeling a bit deadened as you swallow the sweet mess.", false);

        if (player.lust >= 33) {
            MainScreen.text("\n\nThe numbness spreads through your body, bringing with it a sense of calm that seems to muffle your sexual urges.", false);
            player.lust -= 20 + Utils.rand(40);
        }
        if (Utils.rand(5) == 0) {
            if (player.findStatusAffect(StatusAffects.Dys) < 0) {
                MainScreen.text("\n\nUnfortunately, the skin of ", false);
                if (player.lowerBody.cockSpot.count() > 0) {
                    MainScreen.text(sMultiCockDesc(), false);
                    if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text(" and", false);
                    MainScreen.text(" ", false);
                }
                if (player.lowerBody.vaginaSpot.hasVagina()) {
                    if (!player.lowerBody.cockSpot.hasCock()) MainScreen.text("your ");
                    MainScreen.text(vaginaDescript(0) + " ", false);
                }
                if (!(player.lowerBody.cockSpot.hasCock() || player.lowerBody.vaginaSpot.hasVagina())) MainScreen.text(assholeDescript() + " ", false);
                MainScreen.text(" numbs up too.  You give yourself a gentle touch, but are quite disturbed when you realize you can barely feel it.  You can probably still fuck something to get off, but regular masturbation is out of the question...", false);
                player.statusAffects.add(new StatusAffect("Dys", 50 + Utils.rand(100))), 0, 0, 0);
            }
            else {
                MainScreen.text("\n\nSadly your groin becomes even more deadened to sensation.  You wonder how much longer you'll have to wait until you can please yourself again.", false);
                player.statusAffects.get("Dys").value1 = 50 + Utils.rand(100);
            }
        }
        else if (Utils.rand(4) == 0 && player.stats.int > 15) {
            MainScreen.text("\n\nNumbness clouds your mind, making you feel slow witted and dull.  Maybe these candies weren't such a exceptio... fantas... good idea.", false);
            dynStats("int", -(1 + Utils.rand(5)));
        }
        if (!player.perks.has("ThickSkin") && player.stats.sens < 30 && Utils.rand(4) == 0) {
            MainScreen.text("Slowly, ", false);
            if (player.skinType == SKIN.PLAIN) MainScreen.text("your skin", false);
            else MainScreen.text("the skin under your " + player.skinDesc, false);
            MainScreen.text(" begins to feel duller, almost... thicker.  You pinch yourself and find that your epidermis feels more resistant to damage, almost like natural armor!\n<b>(Thick Skin - Perk Gained!)</b>", false);
            player.createPerk(PerkLib.ThickSkin, 0, 0, 0, 0);
        }
        MainScreen.text("\n\nAfter the sensations pass, your " + player.skinDesc + " feels a little less receptive to touch.", false);
        dynStats("sen", -3);
        if (player.stats.sens < 1) player.stats.sens = 1;
    }

    //2. Sensitivity Draft
    public sensitivityDraft(player: Player): void {
        MainScreen.text("", true);
        MainScreen.text("You pop the cork on this small vial and drink down the clear liquid.  It makes your lips and tongue tingle strangely, letting you feel each globule of spit in your mouth and each breath of air as it slides past your lips.", false);

        if (player.statusAffects.has("Dys")) {
            MainScreen.text("\n\nThankfully, the draft invigorates your groin, replacing the numbness with waves of raw sensation.  It seems your crotch is back to normal and <b>you can masturbate again!</b>", false);
            player.statusAffects.remove("Dys");
        }
        if (Utils.rand(4) == 0 && player.findStatusAffect(StatusAffects.LustyTongue) < 0) {
            MainScreen.text("The constant tingling in your mouth grows and grows, particularly around your lips, until they feel as sensitive as ", false);
            if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text("your", false);
            else MainScreen.text("a woman's", false);
            MainScreen.text(" lower lips.  You'll have to be careful not to lick them!", false);
            //(Lustytongue status)
            player.statusAffects.add(new StatusAffect("LustyTongue", 25, 0, 0, 0)));
        }
        MainScreen.text("\n\nAfter the wave of sensation passes, your " + player.skinDesc + " feels a little more receptive to touch.  ", false);
        if (player.lust > 70 || player.stats.lib > 70) {
            MainScreen.text("You shiver and think of how much better it'll make sex and masturbation.", false);
        }
        else MainScreen.text("You worry it'll make it harder to resist the attentions of a demon.", false);
        dynStats("sen", 10, "lus", 5);
    }

    public foxTF(enhanced: boolean, player: Player): void {
        MainScreen.clearText();
        if (!enhanced) MainScreen.text("You examine the berry a bit, rolling the orangish-red fruit in your hand for a moment before you decide to take the plunge and chow down.  It's tart and sweet at the same time, and the flavors seem to burst across your tongue with potent strength.  Juice runs from the corners of your lips as you finish the tasty snack.");
        else MainScreen.text("You pop the cap on the enhanced \"Vixen's Vigor\" and decide to take a swig of it.  Perhaps it will make you as cunning as the crude fox Lumi drew on the front?");
        let changes: number = 0;
        let changeLimit: number = 1;
        if (enhanced) changeLimit += 2;
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(2) == 0) changeLimit++;
        //Used for dick and boob TFs
        let counter: number = 0;

        if (player.faceType == FACE.FOX && player.tailType == TAIL.FOX && player.upperBody.head.earType == EARS.FOX && player.lowerBody == LOWER_BODY.FOX && player.skinType == SKIN.FUR && Utils.rand(3) == 0) {
            if (flags[FlagEnum.FOX_BAD_END_WARNING] == 0) {
                MainScreen.text("\n\nYou get a massive headache and a craving to raid a henhouse.  Thankfully, both pass in seconds, but <b>maybe you should cut back on the vulpine items...</b>");
                flags[FlagEnum.FOX_BAD_END_WARNING] = 1;
            }
            else {
                MainScreen.text("\n\nYou scarf down the ");
                if (enhanced) MainScreen.text("fluid ");
                else MainScreen.text("berries ");
                MainScreen.text("with an uncommonly voracious appetite, taking particular enjoyment in the succulent, tart flavor.  As you carefully suck the last drops of ochre juice from your fingers, you note that it tastes so much more vibrant than you remember.  Your train of thought is violently interrupted by the sound of bones snapping, and you cry out in pain, doubling over as a flaming heat boils through your ribs.");
                MainScreen.text("\n\nWrithing on the ground, you clutch your hand to your chest, looking on in horror through tear-streaked eyes as the bones in your fingers pop and fuse, rearranging themselves into a dainty paw covered in coarse black fur, fading to a ruddy orange further up.  You desperately try to call out to someone - anyone - for help, but all that comes out is a high-pitched, ear-splitting yap.");
                if (player.lowerBody.tailVenom > 1) MainScreen.text("  Your tails thrash around violently as they begin to fuse painfully back into one, the fur bristling back out with a flourish.");
                MainScreen.text("\n\nA sharp spark of pain jolts through your spinal column as the bones shift themselves around, the joints in your hips migrating forward.  You continue to howl in agony even as you feel your intelligence slipping away.  In a way, it's a blessing - as your thoughts grow muddied, the pain is dulled, until you are finally left staring blankly at the sky above, tilting your head curiously.");
                MainScreen.text("\n\nYou roll over and crawl free of the " + player.armorName + " covering you, pawing the ground for a few moments before a pang of hunger rumbles through your stomach.  Sniffing the wind, you bound off into the wilderness, following the telltale scent of a farm toward the certain bounty of a chicken coop.");
                getGame().gameOver();
                return;
            }
        }
        //[increase Intelligence, Libido and Sensitivity]
        if (changes < changeLimit && Utils.rand(3) == 0 && (player.stats.lib < 80 || player.stats.int < 80 || player.stats.sens < 80)) {
            MainScreen.text("\n\nYou close your eyes, smirking to yourself mischievously as you suddenly think of several new tricks to try on your opponents; you feel quite a bit more cunning.  The mental picture of them helpless before your cleverness makes you shudder a bit, and you lick your lips and stroke yourself as you feel your skin tingling from an involuntary arousal.");
            if (player.stats.int < 80) dynStats("int", 4);
            if (player.stats.lib < 80) dynStats("lib", 1);
            if (player.stats.sens < 80) dynStats("sen", 1);
            //gain small lust also
            dynStats("lus", 10);
            changes++;
        }
        //[decrease Strength] (to some floor) // I figured 15 was fair, but you're in a better position to judge that than I am.
        if (changes < changeLimit && Utils.rand(3) == 0 && player.str > 40) {
            MainScreen.text("\n\nYou can feel your muscles softening as they slowly relax, becoming a tad weaker than before.  Who needs physical strength when you can outwit your foes with trickery and mischief?  You tilt your head a bit, wondering where that thought came from.");
            dynStats("str", -1);
            if (player.str > 60) dynStats("str", -1);
            if (player.str > 80) dynStats("str", -1);
            if (player.str > 90) dynStats("str", -1);
            changes++;
        }
        //[decrease Toughness] (to some floor) // 20 or so was my thought here
        if (changes < changeLimit && Utils.rand(3) == 0 && player.tou > 30) {
            if (player.tou < 60) MainScreen.text("\n\nYou feel your skin becoming noticeably softer.  A gentle exploratory pinch on your arm confirms it - your supple skin isn't going to offer you much protection.");
            else MainScreen.text("\n\nYou feel your skin becoming noticeably softer.  A gentle exploratory pinch on your arm confirms it - your hide isn't quite as tough as it used to be.");
            dynStats("tou", -1);
            if (player.str > 60) dynStats("tou", -1);
            if (player.str > 80) dynStats("tou", -1);
            if (player.str > 90) dynStats("tou", -1);
            changes++;
        }

        //[Change Hair Color: Golden-blonde or Reddish-orange]
        if (player.hairColor != "golden-blonde" && player.hairColor != "reddish-orange" && player.hairColor != "silver" && player.hairColor != "white" && player.hairColor != "red" && player.hairColor != "black" && changes < changeLimit && Utils.rand(4) == 0) {
            let hairTemp: number = Utils.rand(10);
            if (hairTemp < 5) player.hairColor = "reddish-orange";
            else if (hairTemp < 7) player.hairColor = "red";
            else if (hairTemp < 8) player.hairColor = "golden-blonde";
            else if (hairTemp < 9) player.hairColor = "silver";
            else player.hairColor = "black";
            MainScreen.text("\n\nYour scalp begins to tingle, and you gently grasp a stUtils.rand of hair, pulling it out to check it.  Your hair has become " + player.hairColor + "!");
        }
        //[Adjust hips toward 10 – wide/curvy/flared]
        if (changes < changeLimit && Utils.rand(3) == 0 && player.lowerBody.hipRating != 10) {
            //from narrow to wide
            if (player.lowerBody.hipRating < 10) {
                MainScreen.text("\n\nYou stumble a bit as the bones in your pelvis rearrange themselves painfully.  Your waistline has widened into [hips]!");
                player.lowerBody.hipRating++;
                if (player.lowerBody.hipRating < 7) player.lowerBody.hipRating++;
            }
            //from wide to narrower
            else {
                MainScreen.text("\n\nYou stumble a bit as the bones in your pelvis rearrange themselves painfully.  Your waistline has narrowed, becoming [hips].");
                player.lowerBody.hipRating--;
                if (player.lowerBody.hipRating > 15) player.lowerBody.hipRating--;
            }
            changes++;
        }
        //[Remove tentacle hair]
        //required if the hair length change below is triggered
        if (changes < changeLimit && player.upperBody.head.hairType == 4 && Utils.rand(3) == 0) {
            //-insert anemone hair removal into them under whatever criteria you like, though hair removal should precede abdomen growth; here's some sample text:
            MainScreen.text("\n\nEerie flames of the jewel migrate up your body to your head, where they cover your [hair].  Though they burned nowhere else in their lazy orbit, your head begins to heat up as they congregate.  Fearful, you raise your hands to it just as the temperature peaks, but as you touch your hair, the searing heat is suddenly gone - along with your tentacles!  <b>Your hair is normal again!</b>");
            player.upperBody.head.hairType = 0;
            changes++;
        }
        //[Adjust hair length toward range of 16-26 – very long to ass-length]
        if (player.upperBody.head.hairType != 4 && (player.hairLength > 26 || player.hairLength < 16) && changes < changeLimit && Utils.rand(4) == 0) {
            if (player.hairLength < 16) {
                player.hairLength += 1 + Utils.rand(4);
                MainScreen.text("\n\nYou experience a tingling sensation in your scalp.  Feeling a bit off-balance, you discover your hair has lengthened, becoming " + num2Text(Math.round(player.hairLength)) + " inches long.");
            }
            else {
                player.hairLength -= 1 + Utils.rand(4);
                MainScreen.text("\n\nYou experience a tingling sensation in your scalp.  Feeling a bit off-balance, you discover your hair has shed a bit of its length, becoming " + num2Text(Math.round(player.hairLength)) + " inches long.");
            }
            changes++;
        }
        if (changes < changeLimit && Utils.rand(10) == 0) {
            MainScreen.text("\n\nYou sigh as the exotic flavor washes through you, and unbidden, you begin to daydream.  Sprinting through the thicket, you can feel the corners of your muzzle curling up into a mischievous grin.  You smell the scent of demons, and not far away either.  With your belly full and throat watered, now is the perfect time for a little bit of trickery.   As the odor intensifies, you slow your playful gait and begin to creep a bit more carefully.");
            MainScreen.text("\n\nSuddenly, you are there, at a demonic camp, and you spy the forms of an incubus and a succubus, their bodies locked together at the hips and slowly undulating, even in sleep.  You carefully prance around their slumbering forms and find their supplies.  With the utmost care, you put your razor-sharp teeth to work, and slowly, meticulously rip through their packs - not with the intention of theft, but with mischief.  You make sure to leave small holes in the bottom of each, and after making sure your stealth remains unbroken, you urinate on their hooves.");
            MainScreen.text("\n\nThey don't even notice, so lost in the subconscious copulation as they are.  Satisfied at your petty tricks, you scurry off into the night, a red blur amidst the foliage.");
            changes++;
            fatigue(-10);
        }

        //dog cocks!
        if (changes < changeLimit && Utils.rand(3) == 0 && player.dogCocks() < player.lowerBody.cockSpot.count()) {
            let choices: Array = [];
            counter = player.lowerBody.cockSpot.count();
            while (counter > 0) {
                counter--;
                //Add non-dog locations to the array
                if (player.lowerBody.cockSpot.list[counter].cockType != CockType.DOG) choices[choices.length] = counter;
            }
            if (choices.length != 0) {
                let select: number = choices[Utils.rand(choices.length)];
                if (player.lowerBody.cockSpot.list[select].cockType == CockType.HUMAN) {
                    MainScreen.text("\n\nYour " + cockDescript(select) + " clenches painfully, becoming achingly, throbbingly erect.  A tightness seems to squeeze around the base, and you wince as you see your skin and flesh shifting forwards into a canine-looking sheath.  You shudder as the crown of your " + cockDescript(select) + " reshapes into a point, the sensations nearly too much for you.  You throw back your head as the transformation completes, your " + Appearance.cockNoun(CockType.DOG) + " much thicker than it ever was before.  <b>You now have a dog-cock.</b>", false);
                    player.lowerBody.cockSpot.list[select].cockThickness += .3;
                    dynStats("sen", 10, "lus", 5);
                }
                //Horse
                else if (player.lowerBody.cockSpot.list[select].cockType == CockType.HORSE) {
                    MainScreen.text("\n\nYour " + Appearance.cockNoun(CockType.HORSE) + " shrinks, the extra equine length seeming to shift into girth.  The flared tip vanishes into a more pointed form, a thick knotted bulge forming just above your sheath.  <b>You now have a dog-cock.</b>", false);
                    //Tweak length/thickness.
                    if (player.lowerBody.cockSpot.list[select].cockLength > 6) player.lowerBody.cockSpot.list[select].cockLength -= 2;
                    else player.lowerBody.cockSpot.list[select].cockLength -= .5;
                    player.lowerBody.cockSpot.list[select].cockThickness += .5;

                    dynStats("sen", 4, "lus", 5);
                }
                //Tentacular Tuesday!
                else if (player.lowerBody.cockSpot.list[select].cockType == CockType.TENTACLE) {
                    MainScreen.text("\n\nYour " + cockDescript(select) + " coils in on itself, reshaping and losing its plant-like coloration as thickens near the base, bulging out in a very canine-looking knot.  Your skin bunches painfully around the base, forming into a sheath.  <b>You now have a dog-cock.</b>", false);
                    dynStats("sen", 4, "lus", 10);
                }
                //Misc
                else {
                    MainScreen.text("\n\nYour " + cockDescript(select) + " trembles, reshaping itself into a shiny red doggie-dick with a fat knot at the base.  <b>You now have a dog-cock.</b>", false);
                    dynStats("sen", 4, "lus", 10);
                }
                player.lowerBody.cockSpot.list[select].cockType = CockType.DOG;
                player.lowerBody.cockSpot.list[select].knotMultiplier = 1.25;
                changes++;
            }

        }
        //Cum Multiplier Xform
        if (player.cumQ() < 5000 < 2 && Utils.rand(3) == 0 && changes < changeLimit && player.lowerBody.cockSpot.hasCock()) {
            temp = 2 + Utils.rand(4);
            //Lots of cum raises cum multiplier cap to 2 instead of 1.5
            if (player.perks.has("MessyOrgasms")) temp += Utils.rand(10);
            player.cumMultiplier += temp;
            //Flavor text
            if (player.lowerBody.balls == 0) MainScreen.text("\n\nYou feel a churning inside your gut as something inside you changes.", false);
            if (player.lowerBody.balls > 0) MainScreen.text("\n\nYou feel a churning in your " + ballsDescriptLight() + ".  It quickly settles, leaving them feeling somewhat more dense.", false);
            MainScreen.text("  A bit of milky pre dribbles from your " + multiCockDescriptLight() + ", pushed out by the change.", false);
            changes++;
        }
        if (changes < changeLimit && player.lowerBody.balls > 0 && player.lowerBody.ballSize > 4 && Utils.rand(3) == 0) {
            MainScreen.text("\n\nYour [sack] gets lighter and lighter, the skin pulling tight around your shrinking balls until you can't help but check yourself.");
            if (player.lowerBody.ballSize > 10) player.lowerBody.ballSize -= 5;
            if (player.lowerBody.ballSize > 20) player.lowerBody.ballSize -= 4;
            if (player.lowerBody.ballSize > 30) player.lowerBody.ballSize -= 4;
            if (player.lowerBody.ballSize > 40) player.lowerBody.ballSize -= 4;
            if (player.lowerBody.ballSize > 50) player.lowerBody.ballSize -= 8;
            if (player.lowerBody.ballSize > 60) player.lowerBody.ballSize -= 8;
            if (player.lowerBody.ballSize <= 10) player.lowerBody.ballSize--;
            changes++;
            MainScreen.text("  You now have a [balls].");
        }
        //Sprouting more!
        if (changes < changeLimit && enhanced && player.bRows() < 4 && player.upperBody.chest.list[player.bRows() - 1].breastRating > 1) {
            MainScreen.text("\n\nYour belly rumbles unpleasantly for a second as the ");
            if (!enhanced) MainScreen.text("berry ");
            else MainScreen.text("drink ");
            MainScreen.text("settles deeper inside you.  A second later, the unpleasant gut-gurgle passes, and you let out a tiny burp of relief.  Before you finish taking a few breaths, there's an itching below your " + allChestDesc() + ".  You idly scratch at it, but gods be damned, it hurts!  You peel off part of your " + player.armorName + " to inspect the unwholesome itch, ");
            if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 8) MainScreen.text("it's difficult to see past the wall of tits obscuring your view.");
            else MainScreen.text("it's hard to get a good look at.");
            MainScreen.text("  A few gentle prods draw a pleasant gasp from your lips, and you realize that you didn't have an itch - you were growing new nipples!");
            MainScreen.text("\n\nA closer examination reveals your new nipples to be just like the ones above in size and shape");
            if (player.upperBody.chest.list[player.bRows() - 1].nipplesPerBreast > 1) MainScreen.text(", not to mention number");
            else if (player.upperBody.chest.hasFuckableNipples()) MainScreen.text(", not to mention penetrability");
            MainScreen.text(".  While you continue to explore your body's newest addition, a strange heat builds behind the new nubs. Soft, jiggly breastflesh begins to fill your cupped hands.  Radiant warmth spreads through you, eliciting a moan of pleasure from your lips as your new breasts catch up to the pair above.  They stop at " + player.breastCup(player.bRows() - 1) + "s.  <b>You have " + num2Text(player.bRows() + 1) + " rows of breasts!</b>");
            player.createBreastRow();
            player.upperBody.chest.list[player.bRows() - 1].breastRating = player.upperBody.chest.list[player.bRows() - 2].breastRating;
            player.upperBody.chest.list[player.bRows() - 1].nipplesPerBreast = player.upperBody.chest.list[player.bRows() - 2].nipplesPerBreast;
            if (player.upperBody.chest.hasFuckableNipples()) player.upperBody.chest.list[player.bRows() - 1].fuckable = true;
            player.upperBody.chest.list[player.bRows() - 1].lactationMultiplier = player.upperBody.chest.list[player.bRows() - 2].lactationMultiplier;
            dynStats("sen", 2, "lus", 30);
            changes++;
        }
        //Find out if tits are eligible for evening
        let tits: boolean = false;
        counter = player.bRows();
        while (counter > 1) {
            counter--;
            //If the row above is 1 size above, can be grown!
            if (player.upperBody.chest.list[counter].breastRating <= (player.upperBody.chest.list[counter - 1].breastRating - 1) && changes < changeLimit && Utils.rand(2) == 0) {
                if (tits) MainScreen.text("\n\nThey aren't the only pair to go through a change!  Another row of growing bosom goes through the process with its sisters, getting larger.");
                else {
                    let select2: number = Utils.rand(3);
                    if (select2 == 1) MainScreen.text("\n\nA faint warmth buzzes to the surface of your " + breastDescript(counter) + ", the fluttering tingles seeming to vibrate faster and faster just underneath your " + player.skin() + ".  Soon, the heat becomes uncomfortable, and that row of chest-flesh begins to feel tight, almost thrumming like a newly-stretched drum.  You " + nippleDescript(counter) + "s go rock hard, and though the discomforting feeling of being stretched fades, the pleasant, warm buzz remains.  It isn't until you cup your tingly tits that you realize they've grown larger, almost in envy of the pair above.");
                    else if (select2 == 2) MainScreen.text("\n\nA faintly muffled gurgle emanates from your " + breastDescript(counter) + " for a split-second, just before your flesh shudders and shakes, stretching your " + player.skinFurScales() + " outward with newly grown breast.  Idly, you cup your hands to your swelling bosom, and though it stops soon, you realize that your breasts have grown closer in size to the pair above.");
                    else {
                        MainScreen.text("\n\nAn uncomfortable stretching sensation spreads its way across the curves of your " + breastDescript(counter) + ", threads of heat tingling through your flesh.  It feels as though your heartbeat has been magnified tenfold within the expanding mounds, your " + player.skin() + " growing flushed with arousal and your " + nippleDescript(counter) + " filling with warmth.  As the tingling heat gradually fades, a few more inches worth of jiggling breast spill forth.  Cupping them experimentally, you confirm that they have indeed grown to be a bit more in line with the size of the pair above.")
                    }
                }
                //Bigger change!
                if (player.upperBody.chest.list[counter].breastRating <= (player.upperBody.chest.list[counter - 1].breastRating - 3))
                    player.upperBody.chest.list[counter].breastRating += 2 + Utils.rand(2);
                //Smallish change.
                else player.upperBody.chest.list[counter].breastRating++;
                MainScreen.text("  You do a quick measurement and determine that your " + num2Text2(counter + 1) + " row of breasts are now " + player.breastCup(counter) + "s.");

                if (!tits) {
                    tits = true;
                    changes++;
                }
                dynStats("sen", 2, "lus", 10);
            }
        }
        //HEAT!
        if (player.statusAffects.get("Heat").value2 < 30 && Utils.rand(6) == 0 && changes < changeLimit) {
            if (player.goIntoHeat(true)) {
                changes++;
            }
        }
        //[Grow Fur]
        //FOURTH
        if ((enhanced || player.lowerBody == LOWER_BODY.FOX) && player.skinType != SKIN.FUR && changes < changeLimit && Utils.rand(4) == 0) {
            //from scales
            if (player.skinType == SKIN.SCALES) MainScreen.text("\n\nYour skin shifts and every scale stands on end, sending you into a mild panic.  No matter how you tense, you can't seem to flatten them again.  The uncomfortable sensation continues for some minutes until, as one, every scale falls from your body and a fine coat of fur pushes out.  You briefly consider collecting them, but when you pick one up, it's already as dry and brittle as if it were hundreds of years old.  <b>Oh well; at least you won't need to sun yourself as much with your new fur.</b>");
            //from skin
            else MainScreen.text("\n\nYour skin itches all over, the sudden intensity and uniformity making you too paranoid to scratch.  As you hold still through an agony of tiny tingles and pinches, fine, luxuriant fur sprouts from every bare inch of your skin!  <b>You'll have to get used to being furry...</b>");
            player.skinType = SKIN.FUR;
            player.skinAdj = "";
            player.skinDesc = "fur";
            changes++;
        }
        //[Grow Fox Legs]
        //THIRD
        if ((enhanced || player.upperBody.head.earType == EARS.FOX) && player.lowerBody != LOWER_BODY.FOX && changes < changeLimit && Utils.rand(5) == 0) {
            //4 legs good, 2 legs better
            if (player.isTaur()) MainScreen.text("\n\nYou shiver as the strength drains from your back legs.  Shaken, you sit on your haunches, forelegs braced wide to stop you from tipping over;  their hooves scrape the dirt as your lower body shrinks, dragging them backward until you can feel the upper surfaces of your hindlegs with their undersides.  A wave of nausea and vertigo overtakes you, and you close your eyes to shut out the sensations.  When they reopen, what greets them are not four legs, but only two... and those roughly in the shape of your old hindleg, except for the furry toes where your hooves used to be.  <b>You now have fox legs!</b>");
            //n*ga please
            else if (player.isNaga()) MainScreen.text("\n\nYour scales split at the waistline and begin to peel, shedding like old snakeskin.  If that weren't curious enough, the flesh - not scales - underneath is pink and new, and the legs it covers crooked into the hocks and elongated feet of a field animal.  As the scaly coating falls and you step out of it, walking of necessity on your toes, a fine powder blows from the dry skin.  Within minutes, it crumbles completely and is taken by the ever-moving wind.  <b>Your legs are now those of a fox!</b>");
            //other digitigrade
            else if (player.lowerBody == LOWER_BODY.HOOFED || player.lowerBody == LOWER_BODY.DOG || player.lowerBody == LOWER_BODY.CAT || player.lowerBody == LOWER_BODY.BUNNY || player.lowerBody == LOWER_BODY.KANGAROO)
                MainScreen.text("\n\nYour legs twitch and quiver, forcing you to your seat.  As you watch, the ends shape themselves into furry, padded toes.  <b>You now have fox feet!</b>  Rather cute ones, actually.");
            //red drider bb gone
            else if (player.lowerBody == LOWER_BODY.DRIDER_LOWER_BODY) MainScreen.text("\n\nYour legs buckle under you and you fall, smashing your abdomen on the ground.  Though your control deserts and you cannot see behind you, still you feel the disgusting sensation of chitin loosening and sloughing off your body, and the dry breeze on your exposed nerves.  Reflexively, your legs cling together to protect as much of their now-sensitive surface as possible.  When you try to part them, you find you cannot.  Several minutes pass uncomforably until you can again bend your legs, and when you do, you find that all the legs of a side bend together - <b>in the shape of a fox's leg!</b>");
            //goo home and goo to bed
            else if (player.isGoo()) MainScreen.text("\n\nIt takes a while before you notice that your gooey mounds have something more defined in them.  As you crane your body and shift them around to look, you can just make out a semi-solid mass in the shape of a crooked, animalistic leg.  You don't think much of it until, a few minutes later, you step right out of your swishing gooey undercarriage and onto the new foot.  The goo covering it quickly dries up, as does the part you left behind, <b>revealing a pair of dog-like fox legs!</b>");
            //reg legs, not digitigrade
            else {
                MainScreen.text("\n\nYour hamstrings tense painfully and begin to pull, sending you onto your face.  As you writhe on the ground, you can feel your thighs shortening and your feet stretching");
                if (player.lowerBody == LOWER_BODY.BEE) MainScreen.text(", while a hideous cracking fills the air");
                MainScreen.text(".  When the spasms subside and you can once again stand, <b>you find that your legs have been changed to those of a fox!</b>");
            }
            player.lowerBody = LOWER_BODY.FOX;
            changes++;
        }
        //Grow Fox Ears]
        //SECOND
        if ((enhanced || player.tailType == TAIL.FOX) && player.upperBody.head.earType != EARS.FOX && changes < changeLimit && Utils.rand(4) == 0) {
            //from human/gob/liz ears
            if (player.upperBody.head.earType == EARS.HUMAN || player.upperBody.head.earType == EARS.ELFIN || player.upperBody.head.earType == EARS.LIZARD) {
                MainScreen.text("\n\nThe sides of your face painfully stretch as your ears elongate and begin to push past your hairline, toward the top of your head.  They elongate, becoming large vulpine triangles covered in bushy fur.  <b>You now have fox ears.</b>");
            }
            //from dog/cat/roo ears
            else {
                MainScreen.text("\n\nYour ears change, shifting from their current shape to become vulpine in nature.  <b>You now have fox ears.</b>");
            }
            player.upperBody.head.earType = EARS.FOX;
            changes++;
        }
        //[Grow Fox Tail](fairly common)
        //FIRST
        if (player.tailType != TAIL.FOX && changes < changeLimit && Utils.rand(4) == 0) {
            //from no tail
            if (player.tailType == TAIL.NONE) MainScreen.text("\n\nA pressure builds on your backside.  You feel under your [armor] and discover a strange nodule growing there that seems to be getting larger by the second.  With a sudden flourish of movement, it bursts out into a long and bushy tail that sways hypnotically, as if it had a mind of its own.  <b>You now have a fox's tail!</b>");
            //from another type of tail
            else MainScreen.text("\n\nPain lances through your lower back as your tail shifts violently.  With one final aberrant twitch, it fluffs out into a long, bushy fox tail that whips around in an almost hypnotic fashion.  <b>You now have a fox's tail!</b>");
            player.tailType = TAIL.FOX;
            player.lowerBody.tailVenom = 1;
            changes++;
        }
        //[Grow Fox Face]
        //LAST - muzzlygoodness
        //should work from any face, including other muzzles
        if (player.skinType == SKIN.FUR && player.faceType != FACE.FOX && changes < changeLimit && Utils.rand(5) == 0) {
            MainScreen.text("\n\nYour face pinches and you clap your hands to it.  Within seconds, your nose is poking through those hands, pushing them slightly to the side as new flesh and bone build and shift behind it, until it stops in a clearly defined, tapered, and familiar point you can see even without the aid of a mirror.  <b>Looks like you now have a fox's face.</b>");
            if (silly()) MainScreen.text("  And they called you crazy...");
            changes++;
            player.faceType = FACE.FOX;
        }
        if (player.tone > 40 && changes < changeLimit && Utils.rand(2) == 0) {
            MainScreen.text("\n\nMoving brings with it a little more jiggle than you're used to.  You don't seem to have gained weight, but your muscles seem less visible, and various parts of you are pleasantly softer.");
            player.tone -= 4;
        }
        //Nipples Turn Back:
        if (player.statusAffects.has("BlackNipples") && changes < changeLimit && Utils.rand(3) == 0) {
            MainScreen.text("\n\nSomething invisible brushes against your " + nippleDescript(0) + ", making you twitch.  Undoing your clothes, you take a look at your chest and find that your nipples have turned back to their natural flesh colour.");
            changes++;
            player.statusAffects.remove("BlackNipples");
        }
        //Debugcunt
        if (changes < changeLimit && Utils.rand(3) == 0 && player.vaginaType() == 5 && player.lowerBody.vaginaSpot.hasVagina()) {
            MainScreen.text("\n\nSomething invisible brushes against your sex, making you twinge.  Undoing your clothes, you take a look at your vagina and find that it has turned back to its natural flesh colour.");
            player.vaginaType(0);
            changes++;
        }
        if (changes == 0) {
            MainScreen.text("\n\nWell that didn't do much, but you do feel a little refreshed!");
            fatigue(-5);
        }
    }

    public godMead(player: Player): void {
        MainScreen.clearText();
        MainScreen.text("You take a hearty swig of mead, savoring the honeyed taste on your tongue.  Emboldened by the first drink, you chug the remainder of the horn's contents in no time flat.  You wipe your lips, satisfied, and let off a small belch as you toss the empty horn aside.");

        //Libido: No desc., always increases.
        //Corruption: No desc., always decreases.
        dynStats("lib", 1, "cor", -1);
        //Health/HP(Large increase; always occurs):
        MainScreen.text("\n\nYou feel suddenly invigorated by the potent beverage, like you could take on a whole horde of barbarians or giants and come out victorious!");
        HPChange(Math.round(player.maxHP() * .33), false);
        if (Utils.rand(3) == 0) {
            MainScreen.text("\n\nThe alcohol fills your limbs with vigor, making you feel like you could take on the world with just your fists!");
            if (silly()) MainScreen.text("  Maybe you should run around shirtless, drink, and fight!  Saxton Hale would be proud.");
            dynStats("str", 1);
        }
        //Tough:
        else {
            MainScreen.text("\n\nYou thump your chest and grin - your foes will have a harder time taking you down while you're fortified by liquid courage.");
            dynStats("tou", 1);
        }
        //Grow Beard [ONLY if PC has a masculine face & a dick.)( -- Why? Bearded ladies are also a fetish [That's just nasty.] (I want a lady beard)): A sudden tingling runs along your chin. You rub it with your hand, and find a thin layer of bristles covering your lower face. You now sport a fine [player.HairColor] beard!
        //[If player already has beard] A sudden tingling runs along your chin. You stroke your beard proudly as it slowly grows in length and lustre.
        //Grow hair: Your scalp is beset by pins and needles as your hair grows out, stopping after it reaches [medium/long] length.}
    }

    public sheepMilk(player: Player): void {
        MainScreen.text("You gulp the bottle's contents, and its sweet taste immediately invigorates you, making you feel calm and concentrated", true);
        //-30 fatigue, -2 libido, -10 lust]
        fatigue(-30);
        dynStats("lib", -.25, "lus", -10, "cor", -0.5);
    }

    //Item: Dragon Egg (Z) (FEN CODED TO HERE - OR AT LEAST COPIED INTO THE CODE FOR FUTURE CODING)
    //Itemdescription - "A large, solid egg, easily the size of your clenched fist.  Its shell color is reddish-white, with blue splotches."

    public eatEmberEgg(player: Player): void {
        MainScreen.clearText();
        //Effect:
        //Boosts the special effect of Dragonbreath by 20% for 1 use. ie: if Tainted's breath weapon has a 80% chance to stun on hit, +20% equals 100% chance to stun.
        MainScreen.text("You crack the shell easily and swallow the large yolk and the copious amounts of albumen - the yolk is blue, while the rest is crimson-tinted.  It tastes like... well, it tastes mostly of spiced mint, you think.");
        if (player.perks.has("Dragonfire")) {
            if (player.statusAffects.has("DragonBreathCooldown")) player.statusAffects.remove("DragonBreathCooldown");
            else {
                if (player.findStatusAffect(StatusAffects.DragonBreathBoost) < 0) player.statusAffects.add(new StatusAffect("DragonBreathBoost", 0, 0, 0, 0)));
            }
            //(if PC has breath weapon)
            MainScreen.text("\n\nA sudden surge of energy fills your being and you feel like you could blast anything to atoms with a single breath, like the mighty dragons of legends.");
        }
        fatigue(-20);
    }


    //Inventory Description:
    //9999A shining teardrop-shaped jewel.  An eerie blue flame dances beneath the surface.
    //Fox Jewel (Magatama)

    //Consume:
    public foxJewel(mystic: boolean, player: Player): void {
        MainScreen.clearText();
        let changes: number = 0;
        let changeLimit: number = 1;
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(3) == 0) changeLimit++;
        if (mystic) changeLimit += 2;
        if (player.perks.has("HistoryAlchemist")) changeLimit++;
        if (mystic) MainScreen.text("You examine the jewel for a bit, rolling it around in your hand as you ponder its mysteries.  You hold it up to the light with fascinated curiosity, watching the eerie purple flame dancing within.  Without warning, the gem splits down the center, dissolving into nothing in your hand.  As the pale lavender flames swirl around you, the air is filled with a sickly sweet scent that drips with the bitter aroma of licorice, filling you with a dire warmth.");
        else MainScreen.text("You examine the jewel for a bit, rolling it around in your hand as you ponder its mysteries.  You hold it up to the light with fascinated curiosity, watching the eerie blue flame dancing within.  Without warning, the gem splits down the center, dissolving into nothing in your hand.  As the pale azure flames swirl around you, the air is filled with a sweet scent that drips with the aroma of wintergreen, sending chills down your spine.");

        //**********************
        //BASIC STATS
        //**********************
        //[increase Intelligence, Libido and Sensitivity]
        if (player.stats.int < 100 && changes < changeLimit && ((mystic && Utils.rand(2) == 0) || (!mystic && Utils.rand(4) == 0))) {
            MainScreen.text("\n\nYou close your eyes, smirking to yourself mischievously as you suddenly think of several new tricks to try on your opponents; you feel quite a bit more cunning.  The mental image of them helpless before your cleverness makes you shudder a bit, and you lick your lips and stroke yourself as you feel your skin tingling from an involuntary arousal.");
            //Raise INT, Lib, Sens. and +10 LUST
            dynStats("int", 2, "lib", 1, "sen", 2, "lus", 10);
            changes++;
        }
        //[decrease Strength toward 15]
        if (player.str > 15 && changes < changeLimit && ((mystic && Utils.rand(2) == 0) || (!mystic && Utils.rand(3) == 0))) {
            MainScreen.text("\n\nYou can feel your muscles softening as they slowly relax, becoming a tad weaker than before.  Who needs physical strength when you can outwit your foes with trickery and mischief?  You tilt your head a bit, wondering where that thought came from.");
            dynStats("str", -1);
            if (player.str > 70) dynStats("str", -1);
            if (player.str > 50) dynStats("str", -1);
            if (player.str > 30) dynStats("str", -1);
            changes++;
        }
        //[decrease Toughness toward 20]
        if (player.tou > 20 && changes < changeLimit && ((mystic && Utils.rand(2) == 0) || (!mystic && Utils.rand(3) == 0))) {
            //from 66 or less toughness
            if (player.tou <= 66) MainScreen.text("\n\nYou feel your " + player.skinFurScales() + " becoming noticeably softer.  A gentle exploratory pinch on your arm confirms it - your " + player.skinFurScales() + " won't offer you much protection.");
            //from 66 or greater toughness
            else MainScreen.text("\n\nYou feel your " + player.skinFurScales() + " becoming noticeably softer.  A gentle exploratory pinch on your arm confirms it - your hide isn't quite as tough as it used to be.");
            dynStats("tou", -1);
            if (player.tou > 66) dynStats("tou", -1);
            changes++;
        }
        if (mystic && changes < changeLimit && Utils.rand(2) == 0 && player.stats.cor < 100) {
            if (player.stats.cor < 33) MainScreen.text("\n\nA sense of dirtiness comes over you, like the magic of this gem is doing some perverse impropriety to you.");
            else if (player.stats.cor < 66) MainScreen.text("\n\nA tingling wave of sensation rolls through you, but you have no idea what exactly just changed.  It must not have been that important.");
            else MainScreen.text("\n\nThoughts of mischief roll across your consciousness, unbounded by your conscience or any concern for others.  You should really have some fun - who cares who it hurts, right?");
            dynStats("cor", 1);
        }


        //**********************
        //MEDIUM/SEXUAL CHANGES
        //**********************
        //[adjust Femininity toward 50]
        //from low to high
        //Your facial features soften as your body becomes more androgynous.
        //from high to low
        //Your facial features harden as your body becomes more androgynous.
        if (((mystic && Utils.rand(2) == 0) || (!mystic && Utils.rand(4) == 0)) && changes < changeLimit && player.femininity != 50) {
            MainScreen.text(player.modFem(50, 2), false);
            changes++;
        }
        //[decrease muscle tone toward 40]
        if (player.tone >= 40 && changes < changeLimit && ((mystic && Utils.rand(2) == 0) || (!mystic && Utils.rand(4) == 0))) {
            MainScreen.text("\n\nMoving brings with it a little more jiggle than you're used to.  You don't seem to have gained weight, but your muscles seem less visible, and various parts of you are pleasantly softer.");
            player.tone -= 2 + Utils.rand(3);
            changes++;
        }

        //[Adjust hips toward 10 – wide/curvy/flared]
        //from narrow to wide
        if (player.lowerBody.hipRating < 10 && ((mystic && Utils.rand(2) == 0) || (!mystic && Utils.rand(3) == 0)) && changes < changeLimit) {
            player.lowerBody.hipRating++;
            if (player.lowerBody.hipRating < 7) player.lowerBody.hipRating++;
            if (player.lowerBody.hipRating < 4) player.lowerBody.hipRating++;
            MainScreen.text("\n\nYou stumble a bit as the bones in your pelvis rearrange themselves painfully.  Your hips have widened nicely!");
            changes++;
        }
        //from wide to narrower
        if (player.lowerBody.hipRating > 10 && ((mystic && Utils.rand(2) == 0) || (!mystic && Utils.rand(3) == 0)) && changes < changeLimit) {
            player.lowerBody.hipRating--;
            if (player.lowerBody.hipRating > 14) player.lowerBody.hipRating--;
            if (player.lowerBody.hipRating > 19) player.lowerBody.hipRating--;
            if (player.lowerBody.hipRating > 24) player.lowerBody.hipRating--;
            MainScreen.text("\n\nYou stumble a bit as the bones in your pelvis rearrange themselves painfully.  Your hips have narrowed.");
            changes++;
        }

        //[Adjust hair length toward range of 16-26 – very long to ass-length]
        if ((player.hairLength < 16 || player.hairLength > 26) && ((mystic && Utils.rand(2) == 0) || (!mystic && Utils.rand(3) == 0)) && changes < changeLimit) {
            //from short to long
            if (player.hairLength < 16) {
                player.hairLength += 3 + Utils.rand(3);
                MainScreen.text("\n\nYou experience a tingling sensation in your scalp.  Feeling a bit off-balance, you discover your hair has lengthened, becoming " + hairDescript() + ".");
            }
            //from long to short
            else {
                player.hairLength -= 3 + Utils.rand(3);
                MainScreen.text("\n\nYou experience a tingling sensation in your scalp.  Feeling a bit off-balance, you discover your hair has shed a bit of its length, becoming " + hairDescript() + ".");
            }
            changes++;
        }
        //[Increase Vaginal Capacity] - requires vagina, of course
        if (player.lowerBody.vaginaSpot.hasVagina() && ((mystic && Utils.rand(2) == 0) || (!mystic && Utils.rand(3) == 0)) && player.statusAffects.get("BonusVCapacity").value1 < 200 && changes < changeLimit) {
            MainScreen.text("\n\nA gurgling sound issues from your abdomen, and you double over as a trembling ripple passes through your womb.  The flesh of your stomach roils as your internal organs begin to shift, and when the sensation finally passes, you are instinctively aware that your " + vaginaDescript(0) + " is a bit deeper than it was before.");
            if (player.findStatusAffect(StatusAffects.BonusVCapacity) < 0) {
                player.statusAffects.add(new StatusAffect("BonusVCapacity", 0, 0, 0, 0)));
            }
            player.statusAffects.get("BonusVCapacity").value1 = 5 + Utils.rand(10);
            changes++;
        }
        //[Vag of Holding] - rare effect, only if PC has high vaginal looseness
        else if (player.lowerBody.vaginaSpot.hasVagina() && ((mystic) || (!mystic && Utils.rand(5) == 0)) && player.statusAffects.get("BonusVCapacity").value1 >= 200 && player.statusAffects.get("BonusVCapacity").value1 < 8000 && changes < changeLimit) {
            MainScreen.text("\n\nYou clutch your stomach with both hands, dropping to the ground in pain as your internal organs begin to twist and shift violently inside you.  As you clench your eyes shut in agony, you are overcome with a sudden calm.  The pain in your abdomen subsides, and you feel at one with the unfathomable infinity of the universe, warmth radiating through you from the vast swirling cosmos contained within your womb.");
            if (silly()) MainScreen.text("  <b>Your vagina has become a universe unto itself, capable of accepting colossal insertions beyond the scope of human comprehension!</b>");
            else MainScreen.text("  <b>Your vagina is now capable of accepting even the most ludicrously sized insertions with no ill effects.</b>");
            player.changeStatusValue(StatusAffects.BonusVCapacity, 1, 8000);
            changes++;
        }


        //**********************
        //BIG APPEARANCE CHANGES
        //**********************
        //[Grow Fox Tail]
        if (player.tailType != TAIL.FOX && changes < changeLimit && ((mystic && Utils.rand(2) == 0) || (!mystic && Utils.rand(4) == 0))) {
            //if PC has no tail
            if (player.tailType == TAIL.NONE) {
                MainScreen.text("\n\nA pressure builds on your backside.  You feel under your " + player.armorName + " and discover a strange nodule growing there that seems to be getting larger by the second.  With a sudden flourish of movement, it bursts out into a long and bushy tail that sways hypnotically, as if it has a mind of its own.  <b>You now have a fox-tail.</b>");
            }
            //if PC has another type of tail
            else if (player.tailType != TAIL.FOX) {
                MainScreen.text("\n\nPain lances through your lower back as your tail shifts and twitches violently.  With one final aberrant twitch, it fluffs out into a long, bushy fox tail that whips around in an almost hypnotic fashion.  <b>You now have a fox-tail.</b>");
            }
            player.tailType = TAIL.FOX;
            player.lowerBody.tailVenom = 1;
            changes++;
        }
        if (!mystic && player.upperBody.head.earType == EARS.FOX && player.tailType == TAIL.FOX && player.lowerBody.tailVenom == 8 && Utils.rand(3) == 0) {
            MainScreen.text("\n\nYou have the feeling that if you could grow a ninth tail you would be much more powerful, but you would need to find a way to enhance one of these gems or meditate with one to have a chance at unlocking your full potential.");
        }
        //[Grow Addtl. Fox Tail]
        //(rare effect, up to max of 8 tails, requires PC level and int*10 = number of tail to be added)
        else if (player.tailType == TAIL.FOX && player.lowerBody.tailVenom < 8 && player.lowerBody.tailVenom + 1 <= player.level && player.lowerBody.tailVenom + 1 <= player.stats.int / 10 && changes < changeLimit && ((mystic && Utils.rand(2) == 0) || (!mystic && Utils.rand(3) == 0))) {
            //if PC has 1 fox tail
            if (player.lowerBody.tailVenom == 1) {
                MainScreen.text("\n\nA tingling pressure builds on your backside, and your bushy tail begins to glow with an eerie, ghostly light.  With a crackle of electrical energy, your tail splits into two!  <b>You now have a pair of fox-tails.</b>");
                //increment tail by 1
            }
            //else if PC has 2 or more fox tails
            else {
                MainScreen.text("\n\nA tingling pressure builds on your backside, and your bushy tails begin to glow with an eerie, ghostly light.  With a crackle of electrical energy, one of your tails splits in two, giving you " + num2Text(player.lowerBody.tailVenom + 1) + "!  <b>You now have a cluster of " + num2Text(player.lowerBody.tailVenom + 1) + " fox-tails.</b>");
                //increment tail by 1
            }
            player.lowerBody.tailVenom++;
            changes++;
        }
        //[Grow 9th tail and gain Corrupted Nine-tails perk]
        else if (mystic && Utils.rand(4) == 0 && changes < changeLimit && player.tailType == TAIL.FOX && player.lowerBody.tailVenom == 8 && player.level >= 9 && player.upperBody.head.earType == EARS.FOX && player.stats.int >= 90 && !player.perks.has("CorruptedNinetails") && !player.perks.has("EnlightenedNinetails")) {
            MainScreen.text("Your bushy tails begin to glow with an eerie, ghostly light, and with a crackle of electrical energy, split into nine tails.  <b>You are now a nine-tails!  But something is wrong...  The cosmic power radiating from your body feels...  tainted somehow.  The corruption pouring off your body feels...  good.</b>");
            MainScreen.text("\n\nYou have the inexplicable urge to set fire to the world, just to watch it burn.  With your newfound power, it's a goal that is well within reach.");
            MainScreen.text("\n\n(Perk Gained: Corrupted Nine-tails - Grants two magical special attacks.)");
            player.createPerk(PerkLib.CorruptedNinetails, 0, 0, 0, 0);
            dynStats("lib", 2, "lus", 10, "cor", 10);
            player.lowerBody.tailVenom = 9;
            changes++;
        }

        //[Grow Fox Ears]
        if (player.tailType == TAIL.FOX && ((mystic && Utils.rand(2) == 0) || (!mystic && Utils.rand(4) == 0)) && player.upperBody.head.earType != EARS.FOX && changes < changeLimit) {
            //if PC has non-animal ears
            if (player.upperBody.head.earType == EARS.HUMAN) MainScreen.text("\n\nThe sides of your face painfully stretch as your ears morph and begin to migrate up past your hairline, toward the top of your head.  They elongate, becoming large vulpine triangles covered in bushy fur.  You now have fox ears.");
            //if PC has animal ears
            else MainScreen.text("\n\nYour ears change shape, shifting from their current shape to become vulpine in nature.  You now have fox ears.");
            player.upperBody.head.earType = EARS.FOX;
            changes++;
        }
        //[Change Hair Color: Golden-blonde, SIlver Blonde, White, Black, Red]
        if (((mystic && Utils.rand(2) == 0) || (!mystic && Utils.rand(4) == 0)) && changes < changeLimit && player.hairColor != "golden blonde" && player.hairColor != "silver blonde" && player.hairColor != "white" && player.hairColor != "black" && player.hairColor != "red") {
            let hairTemp: number = Utils.rand(10);
            if (hairTemp == 0) player.hairColor = "golden blonde";
            else if (hairTemp == 1) player.hairColor = "silver blonde";
            else if (hairTemp <= 3) player.hairColor = "white";
            else if (hairTemp <= 6) player.hairColor = "black";
            else player.hairColor = "red";
            MainScreen.text("\n\nYour scalp begins to tingle, and you gently grasp a stUtils.rand, pulling it forward to check it.  Your hair has become the same " + player.hairColor + " as a kitsune's!");
            changes++;
        }
        //[Change Skin Type: remove fur or scales, change skin to Tan, Olive, or Light]
        if (player.skinType == SKIN.FUR || player.skinType == SKIN.SCALES && ((mystic) || (!mystic && Utils.rand(2) == 0))) {
            MainScreen.text("\n\nYou begin to tingle all over your " + player.skin() + ", starting as a cool, pleasant sensation but gradually worsening until you are furiously itching all over.");
            if (player.skinType == SKIN.FUR) MainScreen.text("  You stare in horror as you pull your fingers away holding a handful of " + player.hairColor + " fur!  Your fur sloughs off your body in thick clumps, falling away to reveal patches of bare, " + player.skinTone + " skin.");
            else if (player.skinType == SKIN.SCALES) MainScreen.text("  You stare in horror as you pull your fingers away holding a handful of dried up scales!  Your scales continue to flake and peel off your skin in thick patches, revealing the tender " + player.skinTone + " skin underneath.");
            MainScreen.text("  Your skin slowly turns raw and red under your severe scratching, the tingling sensations raising goosebumps across your whole body.  Over time, the itching fades, and your flushed skin resolves into a natural-looking ");
            player.skinType = SKIN.PLAIN;
            player.skinAdj = "";
            player.skinDesc = "skin";
            if (!mystic && player.skinTone != "tan" && player.skinTone != "olive" && player.skinTone != "light") {
                let skinTemp: number = Utils.rand(3);
                if (skinTemp == 0) player.skinTone = "tan";
                else if (skinTemp == 1) player.skinTone = "olive";
                else player.skinTone = "light";
            }
            else if (mystic && player.skinTone != "dark" && player.skinTone != "ebony" && player.skinTone != "ashen" && player.skinTone != "sable" && player.skinTone != "milky white") {
                let skinT: number = Utils.rand(5);
                if (skinT == 0) player.skinTone = "dark";
                else if (skinT == 1) player.skinTone = "ebony";
                else if (skinT == 2) player.skinTone = "ashen";
                else if (skinT == 3) player.skinTone = "sable";
                else player.skinTone = "milky white";
            }
            MainScreen.text(player.skinTone + " complexion.");
            MainScreen.text("  <b>You now have " + player.skin() + "!</b>");
            changes++;
        }
        //Change skin tone if not changed you!
        else if (mystic && player.skinTone != "dark" && player.skinTone != "ebony" && player.skinTone != "ashen" && player.skinTone != "sable" && player.skinTone != "milky white" && changes < changeLimit && ((mystic && Utils.rand(2) == 0) || (!mystic && Utils.rand(3) == 0))) {
            MainScreen.text("\n\nYou feel a crawling sensation on the surface of your skin, starting at the small of your back and spreading to your extremities, ultimately reaching your face.  Holding an arm up to your face, you discover that <b>you now have ");
            let mtoneTemp: number = Utils.rand(5);
            if (mtoneTemp == 0) player.skinTone = "dark";
            else if (mtoneTemp == 1) player.skinTone = "ebony";
            else if (mtoneTemp == 2) player.skinTone = "ashen";
            else if (mtoneTemp == 3) player.skinTone = "sable";
            else player.skinTone = "milky white";
            MainScreen.text(player.skin() + "!</b>");
            changes++;
        }
        //Change skin tone if not changed you!
        else if (!mystic && player.skinTone != "tan" && player.skinTone != "olive" && player.skinTone != "light" && changes < changeLimit && ((mystic && Utils.rand(2) == 0) || (!mystic && Utils.rand(3) == 0))) {
            MainScreen.text("\n\nYou feel a crawling sensation on the surface of your skin, starting at the small of your back and spreading to your extremities, ultimately reaching your face.  Holding an arm up to your face, you discover that <b>you now have ");
            let toneTemp: number = Utils.rand(3);
            if (toneTemp == 0) player.skinTone = "tan";
            else if (toneTemp == 1) player.skinTone = "olive";
            else player.skinTone = "light";
            MainScreen.text(player.skin() + "!</b>");
            changes++;
        }
        //[Change Skin Color: add "Tattoos"]
        //From Tan, Olive, or Light skin tones
        else if ((mystic && 9999 == 0 && (player.skinTone == "dark" || player.skinTone == "ebony" || player.skinTone == "ashen" || player.skinTone == "sable" || player.skinTone == "milky white")) || (!mystic && 9999 == 0 && (player.skinTone == "tan" || player.skinTone == "olive" || player.skinTone || "light")) && changes < changeLimit) {
            MainScreen.text("You feel a crawling sensation on the surface of your skin, starting at the small of your back and spreading to your extremities, ultimately reaching your face.  You are caught by surprise when you are suddenly assaulted by a blinding flash issuing from areas of your skin, and when the spots finally clear from your vision, an assortment of glowing tribal tattoos adorns your " + player.skin() + ".  The glow gradually fades, but the distinctive ");
            if (mystic) MainScreen.text("angular");
            else MainScreen.text("curved");
            MainScreen.text(" markings remain, as if etched into your skin.");
            changes++;
            //9999 - pending tats system
        }
        //Nipples Turn Back:
        if (player.statusAffects.has("BlackNipples") && changes < changeLimit && Utils.rand(3) == 0) {
            MainScreen.text("\n\nSomething invisible brushes against your " + nippleDescript(0) + ", making you twitch.  Undoing your clothes, you take a look at your chest and find that your nipples have turned back to their natural flesh colour.");
            changes++;
            player.statusAffects.remove("BlackNipples");
        }
        //Debugcunt
        if (changes < changeLimit && Utils.rand(3) == 0 && player.vaginaType() == 5 && player.lowerBody.vaginaSpot.hasVagina()) {
            MainScreen.text("\n\nSomething invisible brushes against your sex, making you twinge.  Undoing your clothes, you take a look at your vagina and find that it has turned back to its natural flesh colour.");
            player.vaginaType(0);
            changes++;
        }
        if (changes == 0) {
            MainScreen.text("\n\nOdd.  You don't feel any different.");
        }
    }

    /* Moved to KitsuneGift.as
    //Kitsune's Gift
            public  kitsunesGift(player:Player):void
            {
                MainScreen.clearText();
                MainScreen.text("Curiosity gets the best of you, and you decide to open the package.  After all, what's the worst that could happen?\n\n");
                //Opening the gift Utils.randomly results in one of the following:
    //			menuLoc = MENU_LOCATION_KITSUNE_GIFT;
            	
                switch(Utils.rand(12)) {
                //[Fox Jewel]
                    case 0: 
                    MainScreen.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, and to your delight, sitting in the center is a small teardrop-shaped jewel!");
                    MainScreen.text("\n\n<b>You've received a shining Fox Jewel from the kitsune's gift!  How generous!</b>  ");
                    inventory.takeItem(consumables.FOXJEWL, inventory.inventoryMenu);
                    break;
    
                //[Fox Berries]
                    case 1:
                    MainScreen.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, and to your delight, there is a small cluster of orange-colored berries sitting in the center!");
                    MainScreen.text("\n\n<b>You've received a fox berry from the kitsune's gift!  How generous!</b>  ");
                    //add Fox Berries to inventory
                    inventory.takeItem(consumables.FOXBERY, inventory.inventoryMenu);
                    break;
    
                //[Gems]
                    case 2:
                    MainScreen.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, and to your delight, it is filled to the brim with shining gems!");
                    let gems: number = 2 + Utils.rand(20);
                    MainScreen.text("\n\n<b>You've received " + num2Text(gems) + " shining gems from the kitsune's gift!  How generous!</b>");
                    player.stats.gems += gems;
                    //add X gems to inventory
                    statScreenRefresh();
                    break;
    
                //[Kitsune Tea/Scholar's Tea] //Just use Scholar's Tea and drop the "trick" effect if you don't want to throw in another new item.
                    case 3:
                    MainScreen.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, and to your delight, it contains a small bag of dried tea leaves!");
                    MainScreen.text("\n\n<b>You've received a bag of tea from the kitsune's gift!  How thoughtful!</b>  ");
                    //add Kitsune Tea/Scholar's Tea to inventory
                    inventory.takeItem(consumables.SMART_T, inventory.inventoryMenu);
                    break;
    
                //[Hair Dye]
                    case 4:
                    MainScreen.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, and to your delight, it contains a small vial filled with hair dye!");
                    let itype:ItemType = [
                        consumables.RED_DYE,
                        consumables.BLOND_D,
                        consumables.BLACK_D,
                        consumables.WHITEDY
                    ][Utils.rand(4)];
    
                    MainScreen.text("\n\n<b>You've received " + itype.longName + " from the kitsune's gift!  How generous!</b>  ");
                    //add <color> Dye to inventory
                    inventory.takeItem(itype, inventory.inventoryMenu);
                    break;
    
                //[Knowledge Spell]
                    case 5:
                    MainScreen.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, but it seems like there's nothing else inside.  As you peer into the box, a glowing circle filled with strange symbols suddenly flashes to life!  Light washes over you, and your mind is suddenly assaulted with new knowledge...  and the urge to use that knowledge for mischief!");
    
                    MainScreen.text("\n\n<b>The kitsune has shared some of its knowledge with you!</b>  But in the process, you've gained some of the kitsune's promiscuous trickster nature...");
                    //Increase INT and Libido, +10 LUST
                    dynStats("int", 4, "sen", 2, "lus", 10);
                    break;
    
                //[Thief!]
                    case 6:
                    MainScreen.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, and sitting in the center is an artfully crafted paper doll.  Before your eyes, the doll springs to life, dancing about fancifully.  Without warning, it leaps into your item pouch, then hops away and gallavants into the woods, carting off a small fortune in gems.");
    
                    MainScreen.text("\n\n<b>The kitsune's familiar has stolen your gems!</b>");
                    // Lose X gems as though losing in battle to a kitsune
                    player.stats.gems -= 2 + Utils.rand(15);
                    statScreenRefresh();
                    break;
    
                //[Prank]
                    case 7:
                    MainScreen.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, and sitting in the center is an artfully crafted paper doll.  Before your eyes, the doll springs to life, dancing about fancifully.  Without warning, it pulls a large calligraphy brush from thin air and leaps up into your face, then hops away and gallavants off into the woods.  Touching your face experimentally, you come away with a fresh coat of black ink on your fingertips.");
    
                    MainScreen.text("\n\n<b>The kitsune's familiar has drawn all over your face!</b>  The resilient marks take about an hour to completely scrub off in the nearby stream.  You could swear you heard some mirthful snickering among the trees while you were cleaning yourself off.");
                    //Advance time 1 hour, -20 LUST
                    dynStats("lus", -20);
                    break;
    
                //[Aphrodisiac]
                    case 8:
                    MainScreen.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, and sitting in the center is an artfully crafted paper doll.  Before your eyes, the doll springs to life, dancing about fancifully.  Without warning, it tosses a handful of sweet-smelling pink dust into your face, then hops over the rim of the box and gallavants off into the woods.  Before you know what has happened, you feel yourself growing hot and flushed, unable to keep your hands away from your groin.");
                    MainScreen.text("\n\n<b>Oh no!  The kitsune's familiar has hit you with a powerful aphrodisiac!  You are debilitatingly aroused and can think of nothing other than masturbating.</b>");
                    //+100 LUST
                    dynStats("lus=", 100, "resisted", false);
                    break;
    
                //[Wither]
                    case 9:
                    MainScreen.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, and sitting in the center is an artfully crafted paper doll.  Before your eyes, the doll springs to life, dancing about fancifully.  Without warning, it tosses a handful of sour-smelling orange powder into your face, then hops over the rim of the box and gallavants off into the woods.  Before you know what has happened, you feel the strength draining from your muscles, withering away before your eyes.");
                    MainScreen.text("\n\n<b>Oh no!  The kitsune's familiar has hit you with a strength draining spell!  Hopefully it's only temporary...</b>");
                    dynStats("str", -5, "tou", -5);
                    break;
    
                //[Dud]
                    case 10:
                    MainScreen.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, but to your disappointment, the only other contents appear to be nothing more than twigs, leaves, and other forest refuse.");
                    MainScreen.text("\n\n<b>It seems the kitsune's gift was just a pile of useless junk!  What a ripoff!</b>");
                    break;
    
                //[Dud...  Or is it?]
                    case 11:
                    MainScreen.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, but to your disappointment, the only other contents appear to be nothing more than twigs, leaves, and other forest refuse.  Upon further investigation, though, you find a shard of shiny black chitinous plating mixed in with the other useless junk.");
                        MainScreen.text("\n\n<b>At least you managed to salvage a shard of black chitin from it...</b>  ");
                    inventory.takeItem(useables.B_CHITN, inventory.inventoryMenu);
                    break;
    
                    default: trace("Kitsune's gift roll foobar..."); break;
                }
            }
    */

    /*
     Perk

     Corrupted Nine-tails:
     Description: The mystical energy of the nine-tails surges through you, filling you with phenomenal cosmic power!  Your boundless magic allows you to recover quickly after casting spells, but your method of attaining it has corrupted the transformation, preventing you from achieving true enlightenment.
     Effect: Recover 1-3 Fatigue per Round in combat, 3 per hour out of combat.  Victory sex recovers fatigue equal to 2x the enemy's level.  Also applies Masochist and Sadist perks, if they are not already.
     //Alternatively, add the same effects as Masochist and Sadist but don't allow stacking, this way the effects can be removed if the player loses the corrupted nine-tails perk.
     Requirements: Have fox ears and obtain your 9th tail from the Mystic Jewel item.  Must maintain at least 80 corruption and 80 intelligence, fox ears and 9 tails, or lose the perk.

     Corrupted Fox Fire
     Fatigue Cost: 35
     Deals direct damage and lust regardless of enemy defenses.  Especially effective against non-corrupted targets.
     Cast: MainScreen.text( "Holding out your palm, you conjure corrupted purple flame that dances across your fingertips.  You launch it at the " + monster.short + " with a ferocious throw, and it bursts on impact, showering dazzling lavender sparks everywhere." );

     Terror
     Fatigue Cost: 25
     Inflicts fear and reduces enemy SPD.
     Cast: MainScreen.text( "The world goes dark, an inky shadow blanketing everything in sight as you fill the " + monster.short + "'s mind with visions of otherworldly terror that defy description."  + ((succeed) ? "They cower in horror as they succumb to your illusion, believing themselves beset by eldritch horrors beyond their wildest nightmares." : "The dark fog recedes as quickly as it rolled in as they push back your illusions, resisting your hypnotic influence.") );

     Seal
     Fatigue Cost: 35
     Seals enemy abilities, preventing them from using their specials.
     Cast: MainScreen.text( "You make a series of gestures, chanting in a strange tongue.  " + ((succeed) ? "A symbol made of flames appears on the " + monster.short + "'s body, temporarily preventing them from using any special abilities!" : "A symbol made of flames appears on the " + monster.short + "'s body, but it dissipates as quickly as it was formed, failing to properly seal them." ) );

     Enlightened Nine-tails:
     Description: The mystical energy of the nine-tails surges through you, filling you with phenomenal cosmic power!  Your boundless magic allows you to recover quickly after casting spells.
     Effect: Recover 1-3 Fatigue per Round in combat, 3 per hour out of combat.  Provides a buff to Tease.  Victory sex recovers fatigue equal to 2x the enemy's level.
     Requirements: Have fox ears and obtain your 9th tail from spiritual enlightenment.  Must maintain at least 80 intelligence, fox ears and 9 tails, or lose the perk.

     Fox Fire
     Fatigue Cost: 35
     Deals direct damage and lust regardless of enemy defenses.  Especially effective against corrupted targets.
     Cast: MainScreen.text( "Holding out your palm, you conjure an ethereal blue flame that dances across your fingertips.  You launch it at the " + monster.short + " with a ferocious throw, and it bursts on impact, showering dazzling azure sparks everywhere.");

     Illusion
     Fatigue Cost: 25
     Decrease enemy hit chance and increase their susceptibility to lust attacks.
     Cast: MainScreen.text( "The world begins to twist and distort around you as reality bends to your will, the " + monster.short + "'s mind blanketed in the thick fog of your illusions." + ((succeed) ? "They stumble humorously to and fro, unable to keep pace with the shifting illusions that cloud their perceptions" : "Like the snapping of a rubber band, reality falls back into its rightful place as they resist your illusory conjurations." ) );

     Seal
     Fatigue Cost: 35
     Seals enemy abilities, preventing them from using their specials.
     Cast: MainScreen.text( "You make a series of gestures, chanting in a strange tongue.  " + ((succeed) ? "A symbol made of flames appears on the " + monster.short + "'s body, temporarily preventing them from using any special abilities!" : "A symbol made of flames appears on the " + monster.short + "'s body, but it dissipates as quickly as it was formed, failing to properly seal them." ) );
     Teases

     // Specific to tentacle beasts
     MainScreen.text( "You find yourself unable to stifle a flirtatious giggle, waggling your fingers at the tentacle beast and grinning.  You stroll fearlessly up to the writhing abomination and run your hands through its thick, foliage-like coat, your tail" + ((player.tailVenum > 1) ? "s" : "" ) + " curling around its wriggling limbs.  " + ((succeed) ? "The creature's wild thrashing is quelled by confusion and arousal, a few of its limbs running along your face tenderly before you break away.  The beast resumes its savage flailing, but you can tell your touch had an effect on it." : "The creature is unmoved by your tender caresses, swinging a thick limb at you violently.  Thankfully, you are able to break away from it unscathed, but it's obvious that you're going to have to try harder to fluster this beast.") );
     */

    //Unbimbo Yourself:*
    /* Now handled by DeBimbo.as
            public  deBimbo(player:Player):void
            {
                MainScreen.clearText();
                if (!player.perks.has("BimboBrains") && !player.perks.has("FutaFaculties")) {
                    MainScreen.text("You can't use this right now, and it's too expensive to waste!\n\n");
                    if (debug) {}
                    else {
                        inventory.takeItem(consumables.DEBIMBO);
                    }
                    return;
                }
                MainScreen.text("Well, time to see what this smelly, old rat was on about!  You pinch your nose and swallow the foul-tasting mixture with a grimace.  Oh, that's just <i>nasty!</i>  You drop the vial, which shatters on the ground, clutching at your head as a wave of nausea rolls over you.  Stumbling back against a rock for support, you close your eyes.  A constant, pounding ache throbs just behind your temples, and for once, you find yourself speechless.  A pained groan slips through your lips as thoughts and memories come rushing back.  One after another, threads of cognizant thought plow through the simple matrices of your bimbo mind, shredding and replacing them.");
                MainScreen.text("\n\nYou... you were an air-headed ditz!  A vacuous, idiot-girl with nothing between her ears but hunger for dick and pleasure!  You shudder as your faculties return, the pain diminishing with each passing moment.");
                if (player.perks.has("BimboBrains")) {
                    MainScreen.text("\n\n(<b>Perk Removed:  Bimbo Brains - Your intelligence and speech patterns are no longer limited to that of a bimbo.</b>)");
                    player.perks.remove("BimboBrains");
                }
                else if (player.perks.has("FutaFaculties")) {
                    MainScreen.text("\n\n(<b>Perk Removed:  Futa Faculties - Your intelligence and speech patterns are no longer limited to that of a futanari bimbo.</b>)");
                    player.perks.remove("FutaFaculties");
                }
            }
    */
    //Fish Fillet
    public fishFillet(player: Player): void {
        MainScreen.clearText();
        if (!getGame().inCombat) MainScreen.text("You sit down and unwrap your fish fillet. It's perfectly flaky, allowing you to break it off in bite-sized chunks.  The salty meal disappears quickly, and your stomach gives an appreciative gurgle.");
        //(In combat?)
        else MainScreen.text("You produce the fish fillet from your bag.  Rather than unwrap it and savor the taste as you normally would, you take a large bite out of it, leaf wrapping and all.  In no time your salty meal is gone, your stomach giving an appreciative gurgle.");

        //Increase HP by quite a bit!)
        //(Slight chance at increasing Toughness?)
        //(If lake has been tainted, +1 Corruption?)
        if (player.statusAffects.has("FactoryOverload")) dynStats("cor", 0.5);
        dynStats("cor", 0.1);
        HPChange(Math.round(player.maxHP() * .25), false);
    }

    //Trap Oil
    //Flavour Description: A round, opaque glass vial filled with a clear, viscous fluid.  It has a symbol inscribed on it, a circle with a cross and arrow pointing out of it in opposite directions.  It looks and smells entirely innocuous.
    public trapOil(player: Player): void {
        MainScreen.clearText();
        let changes: number = 0;
        let changeLimit: number = 1;
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(3) == 0) changeLimit++;
        if (Utils.rand(3) == 0) changeLimit++;
        if (player.perks.has("HistoryAlchemist")) changeLimit++;
        MainScreen.text("You pour some of the oil onto your hands and ");
        if (player.stats.cor < 30) MainScreen.text("hesitantly ");
        else if (player.stats.cor > 70) MainScreen.text("eagerly ");
        MainScreen.text("rub it into your arms and chest.  The substance is warm, coating and ever so slightly numbing; it quickly sinks into your skin, leaving you feeling smooth and sleek.");

        //Speed Increase:
        if (player.stats.spe < 100 && Utils.rand(3) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYou feel fleet and lighter on your toes; you sense you could dodge, dart or skip away from anything.");
            dynStats("spe", 1);
            changes++;
        }
        //Strength Loss:
        else if (player.str > 40 && Utils.rand(3) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nA sense of helplessness settles upon you as your limbs lose mass, leaving you feeling weaker and punier.");
            dynStats("str", -1);
            changes++;
        }
        //Sensitivity Increase:
        if (player.stats.sens < 70 && player.lowerBody.cockSpot.hasCock() && Utils.rand(3) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nA light breeze brushes over you and your skin tingles.  You have become more sensitive to physical sensation.");
            dynStats("sen", 5);
            changes++;
        }
        //Libido Increase:
        if (player.stats.lib < 70 && player.lowerBody.vaginaSpot.hasVagina() && Utils.rand(3) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYou feel your blood quicken and rise, and a desire to... hunt builds within you.");
            dynStats("lib", 2);
            if (player.stats.lib < 30) dynStats("lib", 2);
            changes++;
        }
        //Body Mass Loss:
        if (player.thickness > 40 && Utils.rand(3) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYou feel an odd tightening sensation in your midriff, as if you were becoming narrower and lither.  You frown downwards, and then turn your arms around, examining them closely.  Is it just you or have you lost weight?");
            player.modThickness(40, 3);
            changes++;
        }

        //Thigh Loss: (towards “girly”)
        if (player.lowerBody.hipRating >= 10 && Utils.rand(4) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYou touch your thighs speculatively.  It's not just your imagination; you've lost a bit of weight around your waist.");
            player.lowerBody.hipRating--;
            if (player.lowerBody.hipRating > 15) player.lowerBody.hipRating -= 2 + Utils.rand(3);
            changes++;
        }
        //Thigh Gain: (towards “girly”)
        if (player.lowerBody.hipRating < 6 && Utils.rand(4) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYou touch your thighs speculatively.  You think you may have gained a little weight around your waist.");
            player.lowerBody.hipRating++;
            changes++;
        }
        //Breast Loss: (towards A cup)
        if (player.upperBody.chest.BreastRatingLargest[0].breastRating > 1 && Utils.rand(4) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYou gasp as you feel a compressing sensation in your chest and around your [fullChest].  The feeling quickly fades however, leaving you feeling like you have lost a considerable amount of weight from your upper body.");
            temp = 0;
            while (temp < player.bRows()) {
                if (player.upperBody.chest.list[temp].breastRating > 70) player.upperBody.chest.list[temp].breastRating -= Utils.rand(3) + 15;
                else if (player.upperBody.chest.list[temp].breastRating > 50) player.upperBody.chest.list[temp].breastRating -= Utils.rand(3) + 10;
                else if (player.upperBody.chest.list[temp].breastRating > 30) player.upperBody.chest.list[temp].breastRating -= Utils.rand(3) + 7;
                else if (player.upperBody.chest.list[temp].breastRating > 15) player.upperBody.chest.list[temp].breastRating -= Utils.rand(3) + 4;
                else player.upperBody.chest.list[temp].breastRating -= 2 + Utils.rand(2);
                if (player.upperBody.chest.list[temp].breastRating < 1) player.upperBody.chest.list[temp].breastRating = 1;
                temp++;
            }
            changes++;
        }
        //Breast Gain: (towards A cup)
        if (player.upperBody.chest.BreastRatingLargest[0].breastRating < 1 || player.upperBody.chest.list[0].breastRating < 1 && Utils.rand(4) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYou feel a vague swelling sensation in your [fullChest], and you frown downwards.  You seem to have gained a little weight on your chest.  Not enough to stand out, but- you cup yourself carefully- certainly giving you the faintest suggestion of boobs.");
            player.upperBody.chest.list[0].breastRating = 1;
            if (player.bRows() > 1) {
                temp = 1;
                while (temp < player.bRows()) {
                    if (player.upperBody.chest.list[temp].breastRating < 1) player.upperBody.chest.list[temp].breastRating = 1;
                }
            }
            changes++;
        }
        //Penis Reduction towards 3.5 Inches:
        if (player.longestCockLength() >= 3.5 && player.lowerBody.cockSpot.hasCock() && Utils.rand(2) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYou flinch and gasp as your " + multiCockDescriptLight() + " suddenly become");
            if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("s");
            MainScreen.text(" incredibly sensitive and retract into your body.  Anxiously you pull down your underclothes to examine your nether regions.  To your relief ");
            if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("it is");
            else MainScreen.text("they are");
            MainScreen.text(" still present, and as you touch ");
            if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("it");
            else MainScreen.text("them");
            MainScreen.text(", the sensitivity fades, however - a blush comes to your cheeks - ");
            if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("it seems");
            else MainScreen.text("they seem");
            MainScreen.text(" to have become smaller.");
            temp = 0;
            while (temp < player.lowerBody.cockSpot.count()) {
                if (player.lowerBody.cockSpot.list[temp].cockLength >= 3.5) {
                    //Shrink said cock
                    if (player.lowerBody.cockSpot.list[temp].cockLength < 6 && player.lowerBody.cockSpot.list[temp].cockLength >= 2.9) {
                        player.lowerBody.cockSpot.list[temp].cockLength -= .5;
                        if (player.lowerBody.cockSpot.list[temp].cockThickness * 6 > player.lowerBody.cockSpot.list[temp].cockLength) player.lowerBody.cockSpot.list[temp].cockThickness -= .2;
                        if (player.lowerBody.cockSpot.list[temp].cockThickness * 8 > player.lowerBody.cockSpot.list[temp].cockLength) player.lowerBody.cockSpot.list[temp].cockThickness -= .2;
                        if (player.lowerBody.cockSpot.list[temp].cockThickness < .5) player.lowerBody.cockSpot.list[temp].cockThickness = .5;
                    }
                    player.lowerBody.cockSpot.list[temp].cockLength -= 0.5;
                    player.increaseCock(temp, Math.round(player.lowerBody.cockSpot.list[temp].cockLength * 0.33) * -1);
                }
                temp++;
            }
            changes++;
        }
        //Testicle Reduction:
        if (player.lowerBody.balls > 0 && player.lowerBody.cockSpot.hasCock() && (player.lowerBody.ballSize > 1 || player.findStatusAffect(StatusAffects.Uniball) < 0) && Utils.rand(4) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYou feel a delicate tightening sensation around your [balls].  The sensation upon this most sensitive part of your anatomy isn't painful, but the feeling of your balls getting smaller is intense enough that you stifle anything more than a sharp intake of breath only with difficulty.");
            player.lowerBody.ballSize--;
            if (player.lowerBody.ballSize > 8) player.lowerBody.ballSize--;
            if (player.lowerBody.ballSize > 10) player.lowerBody.ballSize--;
            if (player.lowerBody.ballSize > 12) player.lowerBody.ballSize--;
            if (player.lowerBody.ballSize > 15) player.lowerBody.ballSize--;
            if (player.lowerBody.ballSize > 20) player.lowerBody.ballSize--;
            //Testicle Reduction final:
            if (player.lowerBody.ballSize < 1 && player.findStatusAffect(StatusAffects.Uniball) < 0) {
                MainScreen.text("  You whimper as once again, your balls tighten and shrink.  Your eyes widen when you feel the gentle weight of your testicles pushing against the top of your [hips], and a few hesitant swings of your rear confirm what you can feel - you've tightened your balls up so much they no longer hang beneath your " + multiCockDescriptLight() + ", but press perkily upwards.  Heat ringing your ears, you explore your new sack with a careful hand.  You are deeply grateful you apparently haven't reversed puberty, but you discover that though you still have " + num2Text(player.lowerBody.balls) + ", your balls now look and feel like one: one cute, tight little sissy parcel, its warm, insistent pressure upwards upon the joining of your thighs a never-ending reminder of it.");
                //[Note: Balls description should no longer say “swings heavily beneath”.  For simplicity's sake sex scenes should continue to assume two balls]
                player.lowerBody.ballSize = 1;
                player.statusAffects.add(new StatusAffect("Uniball", 0, 0, 0, 0)));
            }
            else if (player.lowerBody.ballSize < 1) player.lowerBody.ballSize = 1;
            changes++;
        }
        //Anal Wetness Increase:
        if (player.ass.analWetness < 5 && Utils.rand(4) == 0 && changes < changeLimit) {
            if (player.ass.analWetness < 4) MainScreen.text("\n\nYour eyes widen in shock as you feel oily moisture bead out of your [asshole].  Your asshole has become wetter and more pliable.");
            //Anal Wetness Increase Final (always loose):
            else MainScreen.text("\n\nYou moan as clear, odorless oil dribbles out of your [asshole], this time in enough quantity to stain your [armor].  Your back passage feels incredibly sensitive, wet and accommodating.  Your ass is ready to be plowed by anything, and always will be.");
            player.ass.analWetness++;
            //buttChange(30,false,false,false);
            if (player.ass.analLooseness < 3) player.ass.analLooseness++;
            changes++;
            dynStats("sen", 2);
        }
        //Fertility Decrease:
        if (player.lowerBody.vaginaSpot.hasVagina() && Utils.rand(4) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nThe vague numbness in your skin sinks slowly downwards, and you put a hand on your lower stomach as the sensation centers itself there.  ");
            dynStats("sen", -2);
            //High fertility:
            if (player.fertility >= 30) MainScreen.text("It feels like your overcharged reproductive organs have simmered down a bit.");
            //Average fertility:
            else if (player.fertility >= 5) MainScreen.text("You feel like you have dried up a bit inside; you are left feeling oddly tranquil.");
            //[Low/No fertility:
            else {
                MainScreen.text("Although the numbness makes you feel serene, the trap oil has no effect upon your ");
                if (player.fertility > 0) MainScreen.text("mostly ");
                MainScreen.text("sterile system.");
                //[Low/No fertility + Trap/Corruption  >70:
                if (player.stats.cor > 70) MainScreen.text("  For some reason the fact that you cannot  as nature intended makes you feel helpless and submissive.  Perhaps the only way to be a useful creature now is to find a dominant, fertile being willing to plow you full of eggs? You shake the alien, yet oddly alluring thought away.");
            }
            player.fertility -= 1 + Utils.rand(3);
            if (player.fertility < 4) player.fertility = 4;
            changes++;
        }
        //Male Effects
        if (player.gender == 1) {
            //Femininity Increase Final (max femininity allowed increased by +10):
            if (Utils.rand(4) == 0 && changes < changeLimit) {
                if (player.femininity < 70 && player.femininity >= 60) {
                    MainScreen.text("\n\nYou laugh as you feel your features once again soften, before stopping abruptly.  Your laugh sounded more like a girly giggle than anything else.  Feeling slightly more sober, you touch the soft flesh of your face prospectively.  The trap oil has changed you profoundly, making your innate maleness... difficult to discern, to say the least.  You suspect you could make yourself look even more like a girl now if you wanted to.");
                    if (!player.perks.has("Androgyny")) {
                        player.createPerk(PerkLib.Androgyny, 0, 0, 0, 0);
                        MainScreen.text("\n\n(<b>Perk Gained: Androgyny</b>)");
                    }
                    player.femininity += 10;
                    if (player.femininity > 70) player.femininity = 70;
                    changes++;
                }
                //Femininity Increase:
                else {
                    MainScreen.text("\n\nYour face softens as your features become more feminine.");
                    player.femininity += 10;
                    changes++;
                }
            }
            //Muscle tone reduction:
            if (player.tone > 20 && Utils.rand(4) == 0 && changes < changeLimit) {
                MainScreen.text("\n\nYou sink a finger into your arm inquiringly.  You seem to have lost some of your muscle definition, leaving you looking softer.");
                player.tone -= 10;
                changes++;
            }
        }
        //Female Effects
        else if (player.gender == 2) {
            //Masculinity Increase:
            if (player.femininity > 30 && Utils.rand(4) == 0 && changes < changeLimit) {
                player.femininity -= 10;
                if (player.femininity < 30) {
                    player.femininity = 30;
                    //Masculinity Increase Final (max masculinity allowed increased by +10):
                    MainScreen.text("\n\nYou laugh as you feel your features once again soften, before stopping abruptly.  Your laugh sounded more like a boyish crow than anything else.  Feeling slightly more sober, you touch the defined lines of your face prospectively.  The trap oil has changed you profoundly, making your innate femaleness... difficult to discern, to say the least.  You suspect you could make yourself look even more like a boy now if you wanted to.");
                    if (!player.perks.has("Androgyny")) {
                        player.createPerk(PerkLib.Androgyny, 0, 0, 0, 0);
                        MainScreen.text("\n\n(<b>Perk Gained: Androgyny</b>)");
                    }
                }
                else {
                    MainScreen.text("\n\nYour face becomes more set and defined as your features turn more masculine.");
                }
                changes++;
            }
            //Muscle tone gain:
            if (player.tone < 80 && Utils.rand(4) == 0 && changes < changeLimit) {
                MainScreen.text("\n\nYou flex your arm in interest.  Although you have become thinner, your muscles seem to have become more defined.");
                player.tone += 10;
                changes++;
            }
        }
        //Nipples Turn Black:
        if (player.findStatusAffect(StatusAffects.BlackNipples) < 0 && Utils.rand(6) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nA tickling sensation plucks at your nipples and you cringe, trying not to giggle.  Looking down you are in time to see the last spot of flesh tone disappear from your [nipples].  They have turned an onyx black!");
            player.statusAffects.add(new StatusAffect("BlackNipples", 0, 0, 0, 0)));
            changes++;
        }
        //Remove odd eyes
        if (player.eyeType == EYES.FOUR_SPIDER_EYES && Utils.rand(2) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYou blink and stumble, a wave of vertigo threatening to pull your " + player.feet() + " from under you.  As you steady and open your eyes, you realize something seems different.  Your vision is changed somehow.", false);
            if (player.eyeType == EYES.FOUR_SPIDER_EYES) MainScreen.text("  Your multiple, arachnid eyes are gone!</b>", false);
            MainScreen.text("  <b>You have normal, humanoid eyes again.</b>", false);
            player.eyeType = EYES.HUMAN;
            changes++;
        }
        //PC Trap Effects
        if (player.eyeType != EYES.BLACK_EYES_SAND_TRAP && Utils.rand(4) == 0 && changes < changeLimit) {
            player.eyeType = EYES.BLACK_EYES_SAND_TRAP;
            //Eyes Turn Black:
            MainScreen.text("\n\nYou blink, and then blink again.  It feels like something is irritating your eyes.  Panic sets in as black suddenly blooms in the corner of your left eye and then your right, as if drops of ink were falling into them.  You calm yourself down with the thought that rubbing at your eyes will certainly make whatever is happening to them worse; through force of will you hold your hands behind your back and wait for the strange affliction to run its course.  The strange inky substance pools over your entire vision before slowly fading, thankfully taking the irritation with it.  As soon as it goes you stride quickly over to the stream and stare at your reflection.  <b>Your pupils, your irises, your entire eye has turned a liquid black</b>, leaving you looking vaguely like the many half insect creatures which inhabit these lands.  You find you are merely grateful the change apparently hasn't affected your vision.");
            changes++;
        }
        //Vagina Turns Black:
        if (player.lowerBody.vaginaSpot.hasVagina() && player.vaginaType() != 5 && Utils.rand(4) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYour [vagina] feels... odd.  You undo your clothes and gingerly inspect your nether regions.  The tender pink color of your sex has disappeared, replaced with smooth, marble blackness starting at your lips and working inwards.");
            //(Wet:
            if (player.wetness() >= 3) MainScreen.text("  Your natural lubrication makes it gleam invitingly.");
            //(Corruption <50:
            if (player.stats.cor < 50) MainScreen.text("  After a few cautious touches you decide it doesn't feel any different- it does certainly look odd, though.");
            else MainScreen.text("  After a few cautious touches you decide it doesn't feel any different - the sheer bizarreness of it is a big turn on though, and you feel it beginning to shine with anticipation at the thought of using it.");
            MainScreen.text("  <b>Your vagina is now ebony in color.</b>");
            dynStats("sen", 2, "lus", 10);
            player.vaginaType(5);
            changes++;
        }
        //Dragonfly Wings:
        if (player.upperBody.wingType != WING.GIANT_DRAGONFLY && Utils.rand(4) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYou scream and fall to your knees as incredible pain snags at your shoulders, as if needle like hooks were being sunk into your flesh just below your shoulder blades.  After about five seconds of white hot, keening agony it is with almost sexual relief that something splits out of your upper back.  You clench the dirt as you slide what feel like giant leaves of paper into the open air.  Eventually the sensation passes and you groggily get to your feet.  You can barely believe what you can see by craning your neck behind you - <b>you've grown a set of four giant dragonfly wings</b>, thinner, longer and more pointed than the ones you've seen upon the forest bee girls, but no less diaphanous and beautiful.  You cautiously flex the new muscle groups in your shoulder blades and gasp as your new wings whirr and lift you several inches off the ground.  What fun this is going to be!");
            //Wings Fall Out: You feel a sharp pinching sensation in your shoulders and you cringe slightly.  Your former dragonfly wings make soft, papery sounds as they fall into the dirt behind you.
            changes++;
            player.upperBody.wingType = WING.GIANT_DRAGONFLY;
        }
        if (changes == 0) {
            MainScreen.text("\n\nWell... that didn't amount to much.");
            player.upperBody.wingDesc = "giant dragonfly";
        }
    }

    //PurPeac
    //Purity Peach - Inventory
    public purityPeach(player: Player): void {
        MainScreen.clearText();
        MainScreen.text("You bite into the sweet, juicy peach, feeling a sensation of energy sweeping through your limbs and your mind.  You feel revitalized, refreshed, and somehow cleansed.");
        fatigue(-15);
        HPChange(Math.round(player.maxHP() * 0.25), false);
    }

    //New Item: "Purple Fruit"
    //This sweet-smelling produce looks like an eggplant but feels almost squishy, and rubbery to the touch. Holding it to your ear, you think you can hear some fluid sloshing around inside.

    //>When Used
    public purpleFruitEssrayle(player: Player): void {
        MainScreen.clearText();
        MainScreen.text("You bite into the fruit Essrayle gave you with little hesitation.  It's amazingly sweet, with a texture that's rather gummy.  The juice is a candied grape syrup that fills your cheeks and flows down your throat with far more fluid than the size of the plant should allow.  You hastily devour the entire thing, unable to stop yourself once you've started.");
        MainScreen.text("\n\nA tingling warmth shifts to a roaring inferno in your veins, your heart-rate spiking abruptly.  The intensity of it almost makes your body feel molten!  But, as quickly as it came, the sensation fades into merely a pleasing warmth that settles in your chest.");
        if (player.averageNipplesPerBreast() < 4) {
            MainScreen.text("  At first you think nothing has changed, but a second look confirms that your breasts now sport the same quartet of cow-like nipples the bovine plant-girl bears.");
            if (player.upperBody.chest.BreastRatingLargest[0].nippleLength < 4) player.upperBody.chest.BreastRatingLargest[0].nippleLength = 4;
            temp = player.bRows();
            while (temp > 0) {
                temp--;
                player.upperBody.chest.list[temp].nipplesPerBreast = 4;
            }
        }
        //[Player gains quad nipples, milk production and libido way up]
        dynStats("lib", 5);
        player.boostLactation(3 * player.bRows());
    }

    //TF Items
    //Ringtail Fig/RingFig (please do not change the fruit type to suit whimsy because I have some plans for figs)
    //tooltip:
    //A dried fig with two lobes and thin dark rings just below its stem.  The skin is wrinkly and it looks vaguely like a bulging scrotum.

    public ringtailFig(player: Player): void {
        MainScreen.clearText();
        //eat it:
        MainScreen.text("You split the fruit and scoop out the pulp, eating it greedily.  It's sweet and slightly gritty with seeds, and you quickly finish both halves.");

        let changes: number = 0;
        let changeLimit: number = 1;
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(3) == 0) changeLimit++;
        if (Utils.rand(3) == 0) changeLimit++;

        //stat gains:
        //gain speed to ceiling of 80
        if (player.stats.spe < 80 && Utils.rand(3) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYou twitch and turn your head this way and that, feeling a bit more alert.  This will definitely help when defending your personal space from violators.");
            changes++;
            if (player.stats.spe < 40) dynStats("spe", 1);
            dynStats("spe", 1);
        }
        //gain sensitivity
        if (player.stats.sens < 80 && Utils.rand(3) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nThe wrinkled rind suddenly feels alarmingly distinct in your hands, and you drop the remnants of the fruit.  Wonderingly, you touch yourself with a finger - you can feel even the lightest pressure on your " + player.skinFurScales() + " much more clearly now!");
            if (player.stats.sens < 60) dynStats("sen", 2);
            dynStats("sen", 2);
            changes++;
        }
        //lose toughness to floor of 50
        if (Utils.rand(4) && player.tou > 50 && changes < changeLimit) {
            MainScreen.text("\n\nYou find yourself wishing you could just sit around and eat all day, and spend a while lazing about and doing nothing before you can rouse yourself to get moving.");
            if (player.tou > 75) dynStats("tou", -1);
            dynStats("tou", -1);
            changes++;
        }

        //Sex stuff
        if (player.lowerBody.cockSpot.hasCock()) {
            //gain ball size
            if (player.lowerBody.balls > 0 && player.lowerBody.ballSize < 15 && Utils.rand(4) == 0 && changes < changeLimit) {
                MainScreen.text("\n\nYour [balls] inflate, stretching the skin of your sack.  Exposing them, you can see that they've grown several inches!  How magical!");
                changes++;
                player.lowerBody.ballSize += 2 + Utils.rand(3);
                dynStats("lib", 1);
            }
            //gain balls up to 2 (only if full-coon face and fur; no dick required)
            if (player.lowerBody.balls == 0 && player.skinType == SKIN.FUR && 9999 == 9999 && Utils.rand(3) == 0 && changes < changeLimit) {
                MainScreen.text("\n\nAs you eat, you contemplate your masked appearance; it strikes you that you're dangerously close to the classic caricature of a thief.  Really, all it would take is a big, nondescript sack and a hurried gait and everyone would immediately think the worst of you.  In a brief fit of pique, you wish you had such a bag to store your things in, eager to challenge a few assumptions.  A few minutes into that line of thought, a twisting ache in your lower gut bends you double, and you expose yourself hurriedly to examine the region.  As you watch, a balloon of flesh forms on your crotch, and two lumps migrate from below your navel down into it.  <b>Looks like you have a sack, after all.</b>");
                player.lowerBody.balls = 2;
                player.lowerBody.ballSize = 1;
                changes++;
            }
        }
        //gain thickness or lose tone or whatever - standard message
        if (Utils.rand(4) == 0 && player.thickness < 80 && changes < changeLimit) {
            MainScreen.text(player.modThickness(80, 2), false);
            changes++;
        }
        //bodypart changes:
        if (player.tailType != TAIL.RACCOON && Utils.rand(4) == 0 && changes < changeLimit) {
            //grow da tail
            //from no tail:
            if (player.tailType == TAIL.NONE) {
                MainScreen.text("\n\nPain shivers through your spine and forces you onto the ground; your body locks up despite your attempt to rise again.  You can feel a tug on your spine from your backside, as if someone is trying to pull it out!  Several nodules form along your back, growing into new vertebrae and pushing the old ones downward and into your [armor].  An uncomfortable pressure grows there, as whatever development is taking place fights to free itself from the constriction.  Finally the shifting stops, and you're able to move again; the first thing you do is loosen your bottoms, allowing a matted tail to slide out.  <b>It twitches involuntarily, fluffing out into a ringed raccoon tail!</b>");
            }
            //from other tail:
            else {
                MainScreen.text("\n\nYour tail goes rigid with pain, and soon your body follows.  It feels as though your spine is trying to push the growth off of your body... barely, you manage to turn your head to see almost exactly that!  A new ringed, fluffy tail is growing in behind its predecessor, dark bands after light.  Soon it reaches full length and a tear comes to your eye as your old tail parts from its end and drops to the ground like overripe fruit, dissolving.  <b>You now have a raccoon tail!</b>");
            }
            player.tailType = TAIL.RACCOON;
            changes++;
        }
        //gain fur
        if ((player.lowerBody == LOWER_BODY.RACCOON && player.upperBody.head.earType == EARS.RACCOON) && player.skinType != SKIN.FUR && changes < changeLimit && Utils.rand(4) == 0) {
            MainScreen.text("\n\nYou shiver, feeling a bit cold.  Just as you begin to wish for something to cover up with, it seems your request is granted; thick, bushy fur begins to grow all over your body!  You tug at the tufts in alarm, but they're firmly rooted and... actually pretty soft.  Huh.  <b>You now have a warm coat of " + player.hairColor + " raccoon fur!</b>");
            player.skinType = SKIN.FUR;
            player.skinAdj = "";
            player.skinDesc = "fur";
            changes++;
        }
        //gain coon ears
        if (player.tailType == TAIL.RACCOON && player.upperBody.head.earType != EARS.RACCOON && Utils.rand(4) == 0 && changes < changeLimit) {
            //from dog, kangaroo, bunny, other long ears
            if (player.upperBody.head.earType == EARS.DOG || player.upperBody.head.earType == EARS.BUNNY || player.upperBody.head.earType == EARS.KANGAROO) MainScreen.text("\n\nYour ears compress, constricting your ear canal momentarily.  You shake your head to get sound back, and reach up to touch the auricles, to find a pair of stubby egg-shaped ears in their place.  <b>You now have raccoon ears!</b>");
            //from cat, horse, cow ears
            else if (player.upperBody.head.earType == EARS.HORSE || player.upperBody.head.earType == EARS.COW || player.upperBody.head.earType == EARS.CAT) MainScreen.text("\n\nYour ears tingle.  Huh.  Do they feel a bit rounder at the tip now?  <b>Looks like you have raccoon ears.</b>");
            //from human, goblin, lizard or other short ears
            else MainScreen.text("\n\nYour ears prick and stretch uncomfortably, poking up through your " + hairDescript() + ".  Covering them with your hands, you feel them shaping into little eggdrop ornaments resting atop your head.  <b>You have raccoon ears!</b>");
            player.upperBody.head.earType = EARS.RACCOON;
            changes++;
        }
        //gain feet-coon
        if (player.upperBody.head.earType == EARS.RACCOON && player.lowerBody != LOWER_BODY.RACCOON && changes < changeLimit && Utils.rand(4) == 0) {
            //from naga non-feet (gain fatigue and lose lust)
            if (player.isNaga()) {
                MainScreen.text("\n\nYour body straightens and telescopes suddenly and without the length of your snake half to anchor you, you're left with your face in the dirt.  A shuffling and scraping of falling scales sounds and a terrible cramp takes you as your back half continues migrating, subducting under your [butt] and making you feel extremely bloated.  As your once prominent tail dwindles to roughly the length of your torso, a sickly ripping noise fills your head and it bursts apart, revealing two new legs!  The tattered snake-skin continues melding into your groin as you examine the fuzzy legs and long-toed, sensitive feet.  <b>Looks like you now have raccoon hind-paws...</b> and an upset stomach.");
                dynStats("lus", -30);
                fatigue(5);
            }
            //from amoeba non-feet
            else if (player.isGoo()) MainScreen.text("\n\nYour gooey undercarriage begins to boil violently, and before you can do anything, it evaporates!  Left sitting on just the small pad of sticky half-dried slime that comprises your [butt], a sudden bulge under you is enough to push you onto your back.  Wondering idly and unable to see what's happening, you close your eyes and try to focus on what sensations you can feel from your lower body.  You feel... a swell of expansion, followed by weak muscles trying to contract for the first time, pulling flimsy, folded limbs apart and laying them flat.  As your attention wanders downward, you feel toes wiggling - far longer toes than you remember.  For several minutes you lie still and test muscles gingerly as your body solidifes, but when you can finally move again and look at your legs properly, what you see surprises you very little.  <b>You have fuzzy legs and a pair of long-toed raccoon paws!</b>");
            //from hooves or hard feet, including centaurs and bees
            else if (player.lowerBody == LOWER_BODY.HOOFED || player.lowerBody == LOWER_BODY.CENTAUR || player.lowerBody == LOWER_BODY.BEE || player.lowerBody == LOWER_BODY.PONY || player.lowerBody == LOWER_BODY.CHITINOUS_SPIDER_LEGS) {
                MainScreen.text("\n\nYour [feet] feel very... wide, all of a sudden.  You clop around experimentally, finding them far less responsive and more cumbersome than usual.  On one step, one of your feet ");
                if (player.lowerBody == LOWER_BODY.HOOFED || player.lowerBody == LOWER_BODY.CENTAUR || player.lowerBody == LOWER_BODY.PONY) MainScreen.text("pops right out of its hoof just in time");
                else MainScreen.text("comes loose inside its long boot, and you pull it free with irritation only");
                MainScreen.text(" for you to set it back down on a sharp rock!  Biting off a curse, you examine the new bare foot.  It looks much like a human's, except for the nearly-twice-as-long toes.  You find you can even use them to pick things up; the sharp rock is dropped into your hand and tossed far away.  The shed [foot] is quickly joined on the ground by its complement, revealing more long toes.  ");
                if (player.isTaur()) MainScreen.text("For a few minutes you amuse yourself with your four prehensile feet... you even make up a game that involves juggling a stone under your body by tossing it between two feet while balancing on the others.  It's only a short while, however, before your lower stomach grumbles and a searing pain makes you miss your catch.  Anticipating what will happen, you lie down carefully and close your eyes, biting down on a soft wad of cloth.  The pain quickly returns and drives you into unconsciousness, and when you awaken, your back legs are gone.  ");
                MainScreen.text("<b>You now have two fuzzy, long-toed raccoon legs.</b>");
            }
            //from human, demon, paw feet
            else {
                MainScreen.text("\n\nYour toes wiggle of their own accord, drawing your attention.  Looking down, you can see them changing from their current shape, stretching into oblongs.  When they finish, your foot appears humanoid, but with long, prehesile toes!  ");
                if ((player.lowerBody == LOWER_BODY.HUMAN || player.lowerBody == LOWER_BODY.DEMONIC_HIGH_HEELS || player.lowerBody == LOWER_BODY.DEMONIC_CLAWS) && player.skinType != SKIN.FUR) MainScreen.text("The sensation of walking around on what feels like a second pair of hands is so weird that you miss noticing the itchy fur growing in over your legs...  ");
                MainScreen.text("<b>You now have raccoon paws!</b>");
            }
            player.lowerBody = LOWER_BODY.RACCOON;
            changes++;
        }
        //gain half-coon face (prevented if already full-coon)
        if (player.faceType != FACE.RACCOON_MASK && player.faceType != FACE.RACCOON && Utils.rand(4) == 0 && changes < changeLimit) {
            //from human/naga/shark/bun face
            if (player.faceType == FACE.HUMAN || player.faceType == FACE.SHARK_TEETH || player.faceType == FACE.SNAKE_FANGS || player.faceType == FACE.BUNNY) {
                MainScreen.text("\n\nA sudden wave of exhaustion passes over you, and your face goes partially numb around your eyes.  ");
                //(nagasharkbunnies)
                if (player.faceType == FACE.SHARK_TEETH || player.faceType == FACE.SNAKE_FANGS || player.faceType == FACE.BUNNY) {
                    MainScreen.text("Your prominent teeth chatter noisily at first, then with diminishing violence, until you can no longer feel them jutting past the rest!  ");
                }
                MainScreen.text("Shaking your head a bit, you wait for your energy to return, then examine your appearance.  ");
                //(if player skinTone = ebony/black/ebony with tats and no fur/scales or if black/midnight fur or if black scales
                if (((player.skinTone == "ebony" || player.skinTone == "black") && (player.skinType == SKIN.PLAIN || player.skinType == SKIN.GOO)) || ((player.hairColor == "black" || player.hairColor == "midnight") && (player.skinType == SKIN.FUR || player.skinType == SKIN.SCALES))) {
                    MainScreen.text("Nothing seems different at first.  Strange... you look closer and discover a darker, mask-line outline on your already inky visage.  <b>You now have a barely-visible raccoon mask.</b>");
                }
                else MainScreen.text("A dark, almost black mask shades the " + player.skinFurScales() + " around your eyes and over the topmost portion of your nose, lending you a criminal air!  <b>You now have a raccoon mask!</b>");
            }
            //from snout (will not overwrite full-coon snout but will overwrite others)
            else {
                MainScreen.text("\n\nA sudden migraine sweeps over you and you clutch your head in agony as your nose collapses back to human dimensions.  A worrying numb spot grows around your eyes, and you entertain several horrible premonitions until it passes as suddenly as it came.  Checking your reflection in your water barrel, you find ");
                //[(if black/midnight fur or if black scales)
                if (((player.hairColor == "black" || player.hairColor == "midnight") && (player.skinType == SKIN.FUR || player.skinType == SKIN.SCALES))) MainScreen.text("your face apparently returned to normal shape, albeit still covered in " + player.skinFurScales() + ".  You look closer and discover a darker, mask-line outline on your already inky visage.  <b>You now have a barely-visible raccoon mask on your otherwise normal human face.</b>");
                else if ((player.skinTone == "ebony" || player.skinTone == "black") && (player.skinType == SKIN.PLAIN || player.skinType == SKIN.GOO)) MainScreen.text("your face apparently returned to normal shape.  You look closer and discover a darker, mask-line outline on your already inky visage.  <b>You now have a barely-visible raccoon mask on your normal human face.</b>");
                else MainScreen.text("your face returned to human dimensions, but shaded by a black mask around the eyes and over the nose!  <b>You now have a humanoid face with a raccoon mask!</b>");
            }
            player.faceType = FACE.RACCOON_MASK;
            changes++;
        }
        //gain full-coon face (requires half-coon and fur)
        //from humanoid - should be the only one possible
        else if (player.faceType == FACE.RACCOON_MASK && player.lowerBody == LOWER_BODY.RACCOON && player.skinType == SKIN.FUR && Utils.rand(4) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYour face pinches with tension, and you rub the bridge of your nose to release it.  The action starts a miniature slide in your bone structure, and your nose extends out in front of you!  You shut your eyes, waiting for the sinus pressure to subside, and when you open them, a triangular, pointed snout dotted with whiskers and capped by a black nose greets you!  <b>You now have a raccoon's face!</b>");
            //from muzzleoid - should not be possible, but included if things change
            //Your face goes numb, and you can see your snout shifting into a medium-long, tapered shape.  Closing your eyes, you rub at your forehead to try and get sensation back into it; it takes several minutes before full feeling returns.  <b>When it does, you look again at yourself and see a raccoon's pointy face, appointed with numerous whiskers and a black nose!</b>
            changes++;
            player.faceType = FACE.RACCOON;
        }
        //fatigue damage (only if face change was not triggered)
        else if (Utils.rand(2) == 0 && changes < changeLimit && (player.faceType != FACE.RACCOON_MASK && player.faceType != FACE.RACCOON)) {
            MainScreen.text("\n\nYou suddenly feel tired and your eyelids are quite heavy.  Checking your reflection, you can see small dark rings have begun to form under your eyes.");
            fatigue(10);
            changes++;
        }
        if (changes == 0) {
            MainScreen.text("\n\nYawning, you figure you could really use a nap.");
            fatigue(5);
        }
    }

    //MouseCo
    //tooltip:
    //A handful of rare aromatic beans with sharp creases in the middle, making them look like small mouse ears.  Allegedly very popular and plentiful before the mice-folk were wiped out.


    //Mouse Cocoa/MousCoco (you can change the name if you're saddlesore I guess but I'll make fun of you for having no plausible source of chocolate for your bakery if you do)
    public mouseCocoa(player: Player): void {
        MainScreen.clearText();

        let changes: number = 0;
        let changeLimit: number = 1;
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(3) == 0) changeLimit++;
        if (Utils.rand(3) == 0) changeLimit++;

        //use:
        MainScreen.text("You pop several of the beans in your mouth and suck; they immediately reward you by giving up an oily, chocolatey flavor with a hint of bitterness.  For several minutes you ");
        if (!player.isTaur()) MainScreen.text("sit and ");
        MainScreen.text("enjoy the taste.");

        //stat changes:
        //lose height + gain speed (42" height floor, no speed ceiling but no speed changes without height change)
        if (player.tallness >= 45 && changes < changeLimit && Utils.rand(3) == 0) {
            //not horse
            if (!player.isTaur()) MainScreen.text("\n\nYou tap your [feet] idly against the rock you sit upon as you enjoy the treat; it takes several minutes before you realize you don't reach as far down as you did when you sat down!  In shock, you jerk upright and leap off, nearly falling forward as your body moves more responsively than before!  Experimentally, you move in place as you look down at your now-closer [feet]; the sensation of a more compact agility stays with you.");
            //horse
            else MainScreen.text("\n\nYou trot idly in place as you eat, moving quicker and quicker as you become increasingly bored; on one step, the ground sneaks up on you and you hit it sharply, expecting a few more inches before contact!  Looking down, you notice better resolution than before - you can make out the dirt a bit more clearly.  It looks like you just shed some height, but... you're feeling too jittery to care.  You just want to run around.");
            dynStats("spe", 1);
            player.tallness--;
            if (player.tallness > 60) player.tallness--;
            if (player.tallness > 70) player.tallness--;
            if (player.tallness > 80) player.tallness--;
            if (player.tallness > 90) player.tallness -= 2;
            if (player.tallness > 100) player.tallness -= 2;
            changes++;
        }
        //lose tough
        if (player.tou > 50 && changes < changeLimit && Utils.rand(3) == 0) {
            MainScreen.text("\n\nYou feel a bit less sturdy, both physically and mentally.  In fact, you'd prefer to have somewhere to hide for the time being, until your confidence returns.  The next few minutes are passed in a mousey funk - even afterward, you can't quite regain the same sense of invincibility you had before.");
            changes++;
            dynStats("tou", -1);
            if (player.tou >= 75) dynStats("tou", -1);
            if (player.tou >= 90) dynStats("tou", -1);
        }

        //SEXYYYYYYYYYYY
        //vag-anal capacity up for non-goo (available after PC < 5 ft; capacity ceiling reasonable but not horse-like or gooey)
        if (player.tallness < 60 && (player.analCapacity() < 100 || (player.vaginalCapacity() < 100 && player.lowerBody.vaginaSpot.hasVagina())) && changes < changeLimit && Utils.rand(3) == 0) {
            MainScreen.text("\n\nYour ");
            if (player.vaginalCapacity() < 100 && player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text("[vagina]");
            else MainScreen.text("[asshole]");
            MainScreen.text(" itches, and you shyly try to scratch it, looking around to see if you're watched.  ");
            if (player.isTaur()) MainScreen.text("Backing up to a likely rock, you rub your hindquarters against it, only to be surprised when you feel your hole part smoothly against the surface, wider than you're used to!");
            else MainScreen.text("Slipping a hand in your [armor], you rub vigorously; your hole opens more easily and your fingers poke in farther than you're used to!");
            MainScreen.text("  It feels unusual - not bad, really, but definitely weird.  You can see how it would come in handy, now that you're smaller than most prospective partners, but... shaking your head, you ");
            if (player.isTaur()) MainScreen.text("back away from your erstwhile sedimentary lover");
            else MainScreen.text("pull your hand back out");
            MainScreen.text(".");
            //adds some lust
            dynStats("lus", 10 + player.stats.sens / 5);
            if (player.vaginalCapacity() < 100 && player.lowerBody.vaginaSpot.hasVagina()) {
                if (player.findStatusAffect(StatusAffects.BonusVCapacity) < 0) player.statusAffects.add(new StatusAffect("BonusVCapacity", 0, 0, 0, 0)));
                player.statusAffects.get("BonusVCapacity").value1 = 5;
            }
            else {
                if (player.findStatusAffect(StatusAffects.BonusACapacity) < 0) player.statusAffects.add(new StatusAffect("BonusACapacity", 0, 0, 0, 0)));
                player.statusAffects.get("BonusACapacity").value1 = 5;
            }
            changes++;
        }
        //fem fertility up and heat (suppress if pregnant)
        //not already in heat (add heat and lust)
        if (player.statusAffects.get("Heat").value2 < 30 && Utils.rand(2) == 0 && changes < changeLimit) {
            let intensified: boolean = player.inHeat;
            if (player.goIntoHeat(false)) {
                if (intensified) {
                    MainScreen.text("\n\nYour womb feels achingly empty, and your temperature shoots up.  Try as you might, you can't stop fantasizing about being filled with semen, drenched inside and out with it, enough to make a baker's dozen offspring.  ");
                    //[(no mino cum in inventory)]
                    if (!player.hasItem(consumables.MINOCUM)) {
                        MainScreen.text("<b>Your heat has intensified as much as your fertility has increased, which is a considerable amount!</b>");
                    }
                    else if (player.lust < 100 || player.isTaur()) MainScreen.text("You even pull out a bottle of minotaur jism and spend several minutes considering the feasibility of pouring it directly in your [vagina], but regain your senses as you're unsealing the cap, setting it aside.  <b>Still, your heat is more intense than ever and your increasingly-fertile body is practically begging for dick - it'll be hard to resist any that come near!</b>");
                    //(mino cum in inventory and non-horse, 100 lust)
                    else {
                        MainScreen.text("Desperately horny, you pull out your bottle of minotaur jism and break the seal in two shakes, then lie down with your hips elevated and upend it over your greedy vagina.  The gooey seed pours into you, and you orgasm fitfully, shaking and failing to hold the bottle in place as it coats your labia.  <b>As a hazy doze infiltrates your mind, you pray the pregnancy takes and dream of the sons you'll bear with your increasingly fertile body... you're going to go insane if you don't get a baby in you</b>.");
                        //(consumes item, increment addiction/output addict message, small chance of mino preg, reduce lust)]", false);
                        player.minoCumAddiction(5);
                        player.knockUp(PregnancyType.MINOTAUR, PregnancyType.INCUBATION_MINOTAUR, 175);
                        player.consumeItem(consumables.MINOCUM);
                    }
                }
                else {
                    MainScreen.text("\n\nYour insides feel... roomy.  Accomodating, even.  You could probably carry a whole litter of little [name]s right now.  Filled with a sudden flush of desire, you look around furtively for any fertile males.  With a shake of your head, you try to clear your thoughts, but daydreams of being stuffed with seed creep right back in - it looks like your body is intent on probing the limits of your new fertility.  <b>You're in heat, and pregnable in several senses of the word!</b>", false);

                    // Also make a permanent nudge.
                    player.fertility++;
                }
                changes++;
            }
        }

        //bodypart changes:
        //gain ears
        if (player.upperBody.head.earType != EARS.MOUSE && changes < changeLimit && Utils.rand(4) == 0) {
            MainScreen.text("\n\nYour ears ");
            if (player.upperBody.head.earType == EARS.HORSE || player.upperBody.head.earType == EARS.COW || player.upperBody.head.earType == EARS.DOG || player.upperBody.head.earType == EARS.BUNNY || player.upperBody.head.earType == EARS.KANGAROO) MainScreen.text("shrink suddenly");
            else MainScreen.text("pull away from your head");
            MainScreen.text(", like they're being pinched, and you can distinctly feel the auricles taking a rounded shape through the pain.  Reaching up to try and massage away their stings, <b>you're not terribly surprised when you find a pair of fuzzy mouse's ears poking through your " + hairDescript() + ".</b>");
            player.upperBody.head.earType = EARS.MOUSE;
            changes++;
        }
        //gain tail
        //from no tail
        if (player.upperBody.head.earType == EARS.MOUSE && player.tailType != TAIL.MOUSE && changes < changeLimit && Utils.rand(4) == 0) {
            //from other tail
            if (player.tailType > TAIL.NONE) {
                MainScreen.text("\n\nYour tail clenches and itches simultaneously, leaving you wondering whether to cry out or try to scratch it.  The question is soon answered as the pain takes the forefront; looking backward is a horrible strain, but when you manage it, you can see your old appendage ");
                if (player.tailType == TAIL.HORSE) MainScreen.text("elongating");
                else MainScreen.text("compressing");
                MainScreen.text(" into a long, thin line.  With a shudder, it begins to shed until it's completely, starkly nude.  <b>Your new mouse tail looks a bit peaked.</b>");
            }
            else MainScreen.text("\n\nA small nub pokes from your backside, and you turn to look at it.  When you do, your neck aches as if whiplashed, and you groan as your spine shifts smoothly downward like a rope being pulled, growing new vertebra behind it and expanding the nub into a naked, thin, tapered shape.  <b>Rubbing at your sore neck, you stare at your new mouse tail.</b>");
            player.tailType = TAIL.MOUSE;
            changes++;
        }
        //get teeth - from human, bunny, coonmask, or other humanoid teeth faces
        if (player.upperBody.head.earType == EARS.MOUSE && (player.faceType == FACE.HUMAN || player.faceType == FACE.SHARK_TEETH || player.faceType == FACE.BUNNY || player.faceType == FACE.SPIDER_FANGS || player.faceType == FACE.RACCOON_MASK) && Utils.rand(4) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYour teeth grind on their own, and you feel a strange, insistent pressure just under your nose.  As you open your mouth and run your tongue along them, you can feel ");
            if (player.faceType != FACE.HUMAN) MainScreen.text("the sharp teeth receding and ");
            MainScreen.text("your incisors lengthening.  It's not long before they're twice as long as their neighbors and the obvious growth stops, but the pressure doesn't go away completely.  <b>Well, you now have mouse incisors and your face aches a tiny bit - wonder if they're going to keep growing?</b>");
            player.faceType = FACE.BUCKTEETH;
            changes++;
        }
        //get mouse muzzle from mouse teeth or other muzzle
        if (player.skinType == SKIN.FUR && player.faceType != FACE.MOUSE && (player.faceType != FACE.HUMAN || player.faceType != FACE.SHARK_TEETH || player.faceType != FACE.BUNNY || player.faceType != FACE.SPIDER_FANGS || player.faceType != FACE.RACCOON_MASK) && Utils.rand(4) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nA wave of light-headedness hits you, and you black out.  In your unconsciousness, you dream of chewing - food, wood, cloth, paper, leather, even metal... whatever you can fit in your mouth, even if it doesn't taste like anything much.  For several minutes you just chew and chew your way through a parade of ordinary objects, savoring the texture of each one against your teeth, until finally you awaken.  Your teeth work, feeling longer and more prominent than before, and you hunt up your reflection.  <b>Your face has shifted to resemble a mouse's, down to the whiskers!</b>");
            player.faceType = FACE.MOUSE;
            changes++;
        }
        //get fur
        if ((player.skinType != SKIN.FUR || (player.skinType == SKIN.FUR && (player.hairColor != "brown" && player.hairColor != "white"))) && changes < changeLimit && Utils.rand(4) == 0) {
            //from skinscales
            if (player.skinType != SKIN.FUR) {
                MainScreen.text("\n\nYour " + player.skinFurScales() + " itch");
                if (player.skinType > SKIN.PLAIN) MainScreen.text("es");
                MainScreen.text(" all over");
                if (player.tailType > TAIL.NONE) MainScreen.text(", except on your tail");
                MainScreen.text(".  Alarmed and suspicious, you tuck in your hands, trying to will yourself not to scratch, but it doesn't make much difference.  Tufts of ");
                temp = Utils.rand(10);
                if (temp < 8) {
                    MainScreen.text("brown");
                    player.hairColor = "brown";
                }
                else {
                    MainScreen.text("white");
                    player.hairColor = "white";
                }
                MainScreen.text(" fur begin to force through your skin");
                if (player.skinType == SKIN.SCALES) MainScreen.text(", pushing your scales out with little pinches");
                MainScreen.text(", resolving the problem for you.  <b>You now have fur.</b>");
            }
            //from other color fur
            else {
                MainScreen.text("\n\nYour fur stands on end, as if trying to leap from your body - which it does next.  You watch, dumb with shock, as your covering deserts you, but it's quickly replaced with another layer of ");
                temp = Utils.rand(10);
                if (temp < 8) {
                    MainScreen.text("brown");
                    player.hairColor = "brown";
                }
                else {
                    MainScreen.text("white");
                    player.hairColor = "white";
                }
                MainScreen.text(" fuzz coming in behind it that soon grows to full-fledged fur.");
            }
            player.skinAdj = "";
            player.skinDesc = "fur";
            player.skinType = SKIN.FUR;
            changes++;
        }
    }

    //special attack - bite?
    //tooth length counter starts when you get teef, mouse bite gets more powerful over time as teeth grow in
    //hit
    //You sink your prominent incisors deep into your foe.  They're not as sharp as a predator's, but even a mouse bites when threatened, and you punch quite a large hole.
    //miss
    //You attempt to turn and bite your foe, but " + monster.pronoun1 + " pulls back deftly and your jaws close on empty air.

    //perk - fuck if i know
    //maybe some pregnancy-accelerating thing

    private demonChanges(player: Player): void {
        //Change tail if already horned.
        if (player.tailType != TAIL.DEMONIC && player.horns > 0) {
            if (player.tailType != TAIL.NONE) {
                MainScreen.text("\n\n", false);
                if (player.tailType == TAIL.SPIDER_ADBOMEN || player.tailType == TAIL.BEE_ABDOMEN) MainScreen.text("You feel a tingling in your insectile abdomen as it stretches, narrowing, the exoskeleton flaking off as it transforms into a flexible demon-tail, complete with a round spaded tip.  ", false);
                else MainScreen.text("You feel a tingling in your tail.  You are amazed to discover it has shifted into a flexible demon-tail, complete with a round spaded tip.  ", false);
                MainScreen.text("<b>Your tail is now demonic in appearance.</b>", false);
            }
            else MainScreen.text("\n\nA pain builds in your backside... growing more and more pronounced.  The pressure suddenly disappears with a loud ripping and tearing noise.  <b>You realize you now have a demon tail</b>... complete with a cute little spade.", false);
            dynStats("cor", 4);
            player.tailType = TAIL.DEMONIC;
        }
        //grow horns!
        if (player.horns == 0 || (Utils.rand(player.horns + 3) == 0)) {
            if (player.horns < 12 && (player.hornType == HORNS.NONE || player.hornType == HORNS.DEMON)) {
                MainScreen.text("\n\n", false);
                if (player.horns == 0) {
                    MainScreen.text("A small pair of demon horns erupts from your forehead.  They actually look kind of cute.  <b>You have horns!</b>", false);
                }
                else MainScreen.text("Another pair of demon horns, larger than the last, forms behind the first row.", false);
                if (player.hornType == HORNS.NONE) player.hornType = HORNS.DEMON;
                player.horns++;
                player.horns++;
                dynStats("cor", 3);
            }
            //Text for shifting horns
            else if (player.hornType > HORNS.DEMON) {
                MainScreen.text("\n\n", false);
                MainScreen.text("Your horns shift, shrinking into two small demonic-looking horns.", false);
                player.horns = 2;
                player.hornType = HORNS.DEMON;
                dynStats("cor", 3);
            }
        }
        //Nipples Turn Back:
        if (player.statusAffects.has("BlackNipples") && Utils.rand(3) == 0) {
            MainScreen.text("\n\nSomething invisible brushes against your " + nippleDescript(0) + ", making you twitch.  Undoing your clothes, you take a look at your chest and find that your nipples have turned back to their natural flesh colour.");
            player.statusAffects.remove("BlackNipples");
        }
        //remove fur
        if ((player.faceType != FACE.HUMAN || player.skinType != SKIN.PLAIN) && Utils.rand(3) == 0) {
            //Remove face before fur!
            if (player.faceType != FACE.HUMAN) {
                MainScreen.text("\n\n", false);
                MainScreen.text("Your visage twists painfully, returning to a more normal human shape, albeit with flawless skin.  <b>Your face is human again!</b>", false);
                player.faceType = FACE.HUMAN;
            }
            //De-fur
            else if (player.skinType != SKIN.PLAIN) {
                MainScreen.text("\n\n", false);
                if (player.skinType == SKIN.FUR) MainScreen.text("Your skin suddenly feels itchy as your fur begins falling out in clumps, <b>revealing inhumanly smooth skin</b> underneath.", false);
                if (player.skinType == SKIN.SCALES) MainScreen.text("Your scales begin to itch as they begin falling out in droves, <b>revealing your inhumanly smooth " + player.skinTone + " skin</b> underneath.", false);
                player.skinType = SKIN.PLAIN;
                player.skinDesc = "skin";
            }
        }
        //Demon tongue
        if (player.tongueType == TONUGE.SNAKE && Utils.rand(3) == 0) {
            MainScreen.text("\n\nYour snake-like tongue tingles, thickening in your mouth until it feels more like your old human tongue, at least for the first few inches.  It bunches up inside you, and when you open up your mouth to release it, roughly two feet of tongue dangles out.  You find it easy to move and control, as natural as walking.  <b>You now have a long demon-tongue.</b>", false);
            player.tongueType = TONUGE.DEMONIC;
        }
        //foot changes - requires furless
        if (player.skinType == SKIN.PLAIN && Utils.rand(4) == 0) {
            //Males/genderless get clawed feet
            if (player.gender <= 1) {
                if (player.lowerBody != LOWER_BODY.DEMONIC_CLAWS) {
                    MainScreen.text("\n\n", false);
                    MainScreen.text("Every muscle and sinew below your hip tingles and you begin to stagger. Seconds after you sit down, pain explodes in your " + player.feet() + ". Something hard breaks through your sole from the inside out as your toes splinter and curve cruelly. The pain slowly diminishes and your eyes look along a human leg that splinters at the foot into a claw with sharp black nails. When you relax, your feet grip the ground easily. <b>Your feet are now formed into demonic claws.</b>", false);
                    player.lowerBody = LOWER_BODY.DEMONIC_CLAWS;
                }
            }
            //Females/futa get high heels
            else if (player.lowerBody != LOWER_BODY.DEMONIC_HIGH_HEELS) {
                MainScreen.text("\n\n", false);
                MainScreen.text("Every muscle and sinew below your hip tingles and you begin to stagger. Seconds after you sit down, pain explodes in your " + player.feet() + ". Something hard breaks through your sole from the inside out. The pain slowly diminishes and your eyes look along a human leg to a thin and sharp horn protruding from the heel. When you relax, your feet are pointing down and their old posture is only possible with an enormous effort. <b>Your feet are now formed into demonic high-heels.</b> Tentatively you stand up and try to take a few steps. To your surprise you feel as if you were born with this and stride vigorously forward, hips swaying.", false);
                player.lowerBody = LOWER_BODY.DEMONIC_HIGH_HEELS;
            }
        }
        //Grow demon wings
        if (player.upperBody.wingType != WING.BAT_LIKE_LARGE && Utils.rand(8) == 0 && player.stats.cor >= 50) {
            //grow smalls to large
            if (player.upperBody.wingType == WING.BAT_LIKE_TINY && player.stats.cor >= 75) {
                MainScreen.text("\n\n", false);
                MainScreen.text("Your small demonic wings stretch and grow, tingling with the pleasure of being attached to such a tainted body.  You stretch over your shoulder to stroke them as they unfurl, turning into full-sized demon-wings.  <b>Your demonic wings have grown!</b>", false);
                player.upperBody.wingType = WING.BAT_LIKE_LARGE;
                player.upperBody.wingDesc = "large, bat-like";
            }
            else if (player.upperBody.wingType == WING.SHARK_FIN) {
                MainScreen.text("\n\n", false);
                MainScreen.text("The muscles around your shoulders bunch up uncomfortably, changing to support the new bat-like wings growing from your back.  You twist your head as far as you can for a look and realize your fin has changed into ", false);
                MainScreen.text("small ", false);
                player.upperBody.wingType = WING.BAT_LIKE_TINY;
                player.upperBody.wingDesc = "tiny, bat-like";
                MainScreen.text("bat-like demon-wings!", false);
            }
            else if (player.upperBody.wingType == WING.BEE_LIKE_SMALL || player.upperBody.wingType == WING.BEE_LIKE_LARGE) {
                MainScreen.text("\n\n", false);
                MainScreen.text("The muscles around your shoulders bunch up uncomfortably, changing to support your wings as you feel their weight increasing.  You twist your head as far as you can for a look and realize they've changed into ", false);
                if (player.upperBody.wingType == WING.BEE_LIKE_SMALL) {
                    MainScreen.text("small ", false);
                    player.upperBody.wingType = WING.BAT_LIKE_TINY;
                    player.upperBody.wingDesc = "tiny, bat-like";
                }
                else {
                    MainScreen.text("large ", false);
                    player.upperBody.wingType = WING.BAT_LIKE_LARGE;
                    player.upperBody.wingDesc = "large, bat-like";
                }
                MainScreen.text("<b>bat-like demon-wings!</b>", false);
            }
            //No wings
            else if (player.upperBody.wingType == WING.NONE) {
                MainScreen.text("\n\n", false);
                MainScreen.text("A knot of pain forms in your shoulders as they tense up.  With a surprising force, a pair of small demonic wings sprout from your back, ripping a pair of holes in the back of your " + player.armorName + ".  <b>You now have tiny demonic wings</b>.", false);
                player.upperBody.wingType = WING.BAT_LIKE_TINY;
                player.upperBody.wingDesc = "tiny, bat-like";
            }

        }
    }

    public herbalContraceptive(player: Player): void {
        MainScreen.clearText();

        // Placeholder, sue me
        MainScreen.text("You chew on the frankly awfully bitter leaves as quickly as possible before swallowing them down.");

        player.statusAffects.add(new StatusAffect("Contraceptives", 1, 48, 0, 0)));
    }

    public princessPucker(player: Player): void {
        MainScreen.clearText();

        MainScreen.text("You uncork the bottle, and sniff it experimentally.  The fluid is slightly pink, full of flecks of gold, and smelling vaguely of raspberries.  Princess Gwynn said it was drinkable.\n\n");

        MainScreen.text("You down the bottle, hiccuping a bit at the syrupy-sweet raspberry flavor.  Immediately following the sweet is a bite of sour, like sharp lime.  You pucker your lips, and feel your head clear a bit from the intensity of flavor.  You wonder what Gwynn makes this out of.\n\n");

        MainScreen.text("Echoing the sensation in your head is an answering tingle in your body.  The sudden shock of citrusy sour has left you slightly less inclined to fuck, a little more focused on your priorities.\n\n");

        if (Utils.rand(2) == 0) {
            dynStats("lus-", 20, "lib-", 2);
        }
        else {
            dynStats("lus-", 20, "sen-", 2);
        }

        if (player.hairColor != "pink") {
            if (Utils.rand(5) == 0) {
                MainScreen.text("A slight tingle across your scalp draws your attention to your hair.  It seems your " + player.hairColor + " is rapidly gaining a distinctly pink hue, growing in from the roots!\n\n");
                player.hairColor = "pink";
            }
        }
    }

    //Ferret Fruit
    public ferretTF(player: Player): void {
        //CoC Ferret TF (Ferret Fruit)
        //Finding Ferret Fruit
        //- Ferret Fruit may be Utils.randomly found while exploring the plains.
        //- Upon finding Ferret Fruit: “While searching the plains, you find an odd little tree with a curved trunk. The shape of its fruit appears to mimic that of the tree. A few of the fruits seem to have fallen off. You brush the dirt off of one of the fruits before placing in in your (x) pouch. (if there is no room in your inventory, you get the generic option to use now or abandon)
        //- If you hover over the fruit in your inventory, this is its description:  “This fruit is curved oddly, just like the tree it came from.  The skin is fuzzy and brown, like the skin of a peach.”
        //-Upon eating the fruit:
        MainScreen.clearText();
        MainScreen.text("Feeling parched, you gobble down the fruit without much hesitation. Despite the skin being fuzzy like a peach, the inside is relatively hard, and its taste reminds you of that of an apple.  It even has a core like an apple. Finished, you toss the core aside.");

        //BAD END:
        if (player.ferretScore() >= 6) {
            //Get warned!
            if (flags[FlagEnum.FERRET_BAD_END_WARNING] == 0) {
                MainScreen.text("\n\nYou find yourself staring off into the distance, dreaming idly of chasing rabbits through a warren.  You shake your head, returning to reality.  <b>Perhaps you should cut back on all the Ferret Fruit?</b>");
                player.stats.int -= 5 + Utils.rand(3);
                if (player.stats.int < 5) player.stats.int = 5;
                flags[FlagEnum.FERRET_BAD_END_WARNING] = 1;
            }
            //BEEN WARNED! BAD END! DUN DUN DUN
            else if (Utils.rand(3) == 0) {
                //-If you fail to heed the warning, it’s game over:
                MainScreen.text("\n\nAs you down the fruit, you begin to feel all warm and fuzzy inside.  You flop over on your back, eagerly removing your clothes.  You laugh giddily, wanting nothing more than to roll about happily in the grass.  Finally finished, you attempt to get up, but something feels...  different.  Try as you may, you find yourself completely unable to stand upright for a long period of time.  You only manage to move about comfortably on all fours.  Your body now resembles that of a regular ferret.  That can’t be good!  As you attempt to comprehend your situation, you find yourself less and less able to focus on the problem.  Your attention eventually drifts to a rabbit in the distance.  You lick your lips. Nevermind that, you have warrens to raid!");
                getGame().gameOver();
                return;
            }
        }
        //Reset the warning if ferret score drops.
        else {
            flags[FlagEnum.FERRET_BAD_END_WARNING] = 0;
        }

        let changes: number = 0;
        let changeLimit: number = 1;
        let temp: number = 0;
        let x: number = 0;
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(3) == 0) changeLimit++;

        //Ferret Fruit Effects
        //- + Thin:
        if (player.thickness > 15 && changes < changeLimit && Utils.rand(3) == 0) {
            MainScreen.text("\n\nEach movement feels a tiny bit easier than the last.  Did you just lose a little weight!? (+2 thin)");
            player.thickness -= 2;
            changes++;
        }
        //- If speed is > 80, increase speed:
        if (player.stats.spe < 80 && Utils.rand(3) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYour muscles begin to twitch rapidly, but the feeling is not entirely unpleasant.  In fact, you feel like running.");
            dynStats("spe", 1);
            changes++;
        }
        //- If male with a hip rating >4 or a female/herm with a hip rating >6:
        if (((!player.lowerBody.cockSpot.hasCock() && player.lowerBody.hipRating > 6) || (player.lowerBody.cockSpot.hasCock() && player.lowerBody.hipRating > 4)) && Utils.rand(3) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nA warm, tingling sensation arises in your [hips].  Immediately, you reach down to them, concerned.  You can feel a small portion of your [hips] dwindling away under your hands.");
            player.lowerBody.hipRating--;
            if (player.lowerBody.hipRating > 10) player.lowerBody.hipRating--;
            if (player.lowerBody.hipRating > 15) player.lowerBody.hipRating--;
            if (player.lowerBody.hipRating > 20) player.lowerBody.hipRating--;
            if (player.lowerBody.hipRating > 23) player.lowerBody.hipRating--;
            changes++;
        }
        //- If butt rating is greater than “petite”:
        if (player.lowerBody.butt.buttRating >= 8 && Utils.rand(3) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYou cringe as your [butt] begins to feel uncomfortably tight.  Once the sensation passes, you look over your shoulder, inspecting yourself.  It would appear that your ass has become smaller!");
            player.lowerBody.butt.buttRating--;
            if (player.lowerBody.butt.buttRating > 10) player.lowerBody.butt.buttRating--;
            if (player.lowerBody.butt.buttRating > 15) player.lowerBody.butt.buttRating--;
            if (player.lowerBody.butt.buttRating > 20) player.lowerBody.butt.buttRating--;
            if (player.lowerBody.butt.buttRating > 23) player.lowerBody.butt.buttRating--;
            changes++;
        }

        //-If male with breasts or female/herm with breasts > B cup:
        if (!flags[FlagEnum.HYPER_HAPPY] && (player.upperBody.chest.BreastRatingLargest[0].breastRating > 2 || (player.lowerBody.cockSpot.hasCock() && player.upperBody.chest.BreastRatingLargest[0].breastRating >= 1)) && Utils.rand(2) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYou cup your tits as they begin to tingle strangely.  You can actually feel them getting smaller in your hands!");
            for (x = 0; x < player.bRows(); x++) {
                if (player.upperBody.chest.list[x].breastRating > 2 || (player.lowerBody.cockSpot.hasCock() && player.upperBody.chest.list[x].breastRating >= 1)) {
                    player.upperBody.chest.list[x].breastRating--;
                }
            }
            changes++;
            //(this will occur incrementally until they become flat, manly breasts for males, or until they are A or B cups for females/herms)
        }
        //-If penis size is > 6 inches:
        if (player.lowerBody.cockSpot.hasCock()) {
            //Find longest cock
            temp = -1;
            for (x = 0; x < player.lowerBody.cockSpot.count(); x++) {
                if (temp == -1 || player.lowerBody.cockSpot.list[x].cockLength > player.lowerBody.cockSpot.list[temp].cockLength) temp = x;
            }
            if (temp >= 0 && Utils.rand(2) == 0 && changes < changeLimit) {
                if (player.lowerBody.cockSpot.list[temp].cockLength > 6 && !flags[FlagEnum.HYPER_HAPPY]) {
                    MainScreen.text("\n\nA pinching sensation racks the entire length of your " + cockDescript(temp) + ".  Within moments, the sensation is gone, but it appears to have become smaller.");
                    player.lowerBody.cockSpot.list[temp].cockLength--;
                    if (Utils.rand(2) == 0) player.lowerBody.cockSpot.list[temp].cockLength--;
                    if (player.lowerBody.cockSpot.list[temp].cockLength >= 9) player.lowerBody.cockSpot.list[temp].cockLength -= Utils.rand(3) + 1;
                    if (player.lowerBody.cockSpot.list[temp].cockLength / 6 >= player.lowerBody.cockSpot.list[temp].cockThickness) {
                        MainScreen.text("  Luckily, it doen’t seem to have lost its previous thickness.");
                    }
                    else {
                        player.lowerBody.cockSpot.list[temp].cockThickness = player.lowerBody.cockSpot.list[temp].cockLength / 6;
                    }
                    changes++;
                }
            }
        }
        //-If the PC has quad nipples:
        if (player.averageNipplesPerBreast() > 1 && Utils.rand(4) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nA tightness arises in your nipples as three out of four on each breast recede completely, the leftover nipples migrating to the middle of your breasts.  <b>You are left with only one nipple on each breast.</b>");
            for (x = 0; x < player.bRows(); x++) {
                player.upperBody.chest.list[x].nipplesPerBreast = 1;
            }
            changes++;
        }
        //If the PC has gills:
        if (player.upperBody.gills && Utils.rand(4) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYou grit your teeth as a stinging sensation arises in your gills.  Within moments, the sensation passes, and <b>your gills are gone!</b>");
            player.upperBody.gills = false;
            changes++;
        }
        //If the PC has tentacle hair:
        if (player.upperBody.head.hairType == HAIR.ANEMONE && Utils.rand(4) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYour head feels strange as the tentacles you have for hair begin to recede back into your scalp, eventually leaving you with a bald head.  Your head is not left bald for long, though.  Within moments, a full head of hair sprouts from the skin of your scalp.  <b>Your hair is normal again!</b>");
            //Turn hair growth on.
            flags[FlagEnum.HAIR.GROWTH_STOPPED_BECAUSE_LIZARD] = 0;
            player.upperBody.head.hairType = 0;
            changes++;
        }
        //If the PC has goo hair:
        if (player.upperBody.head.hairType == HAIR.GOO && Utils.rand(3) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYour gooey hair begins to fall out in globs, eventually leaving you with a bald head.  Your head is not left bald for long, though.  Within moments, a full head of hair sprouts from the skin of your scalp.  <b>Your hair is normal again!</b>");
            //Turn hair growth on.
            flags[FlagEnum.HAIR.GROWTH_STOPPED_BECAUSE_LIZARD] = 0;
            player.upperBody.head.hairType = 0;
            changes++;
        }
        //If the PC has four eyes:
        if (player.eyeType == EYES.FOUR_SPIDER_EYES && Utils.rand(3) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYour two forehead eyes start throbbing painfully, your sight in them eventually going dark.  You touch your forehead to inspect your eyes, only to find out that they have disappeared.  <b>You only have two eyes now!</b>");
            player.eyeType = 0;
            changes++;
        }
        //Go into heat
        if (Utils.rand(3) == 0 && changes < changeLimit) {
            if (player.goIntoHeat(true)) {
                changes++;
            }
        }
        //Turn ferret mask to full furface.
        if (player.faceType == FACE.FERRET_MASK && player.skinType == SKIN.FUR && player.upperBody.head.earType == EARS.FERRET && player.tailType == TAIL.FERRET && player.lowerBody == LOWER_BODY.FERRET && Utils.rand(4) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYou cry out in pain as the bones in your face begin to break and rearrange.  You rub your face furiously in an attempt to ease the pain, but to no avail.  As the sensations pass, you examine your face in a nearby puddle.  <b>You nearly gasp in shock at the sight of your new ferret face!</b>");
            player.faceType = FACE.FERRET;
            changes++;
        }
        //If face is human:
        if (player.faceType == 0 && Utils.rand(3) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nA horrible itching begins to encompass the area around your eyes.  You grunt annoyedly, rubbing furiously at the afflicted area.  Once the feeling passes, you make your way to the nearest reflective surface to see if anything has changed.  Your suspicions are confirmed.  The [skinFurScales] around your eyes has darkened.  <b>You now have a ferret mask!</b>");
            player.faceType = FACE.FERRET_MASK;
            changes++;
        }
        //If face is not ferret, has ferret ears, tail, and legs:
        if (player.faceType != FACE.HUMAN && player.faceType != FACE.FERRET_MASK && player.faceType != FACE.FERRET && Utils.rand(3) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYou groan uncomfortably as the bones in your [face] begin to rearrange.  You grab your head with both hands, rubbing at your temples in an attempt to ease the pain.  As the shifting stops, you frantically feel at your face.  The familiar feeling is unmistakable.  <b>Your face is human again!</b>");
            player.faceType = 0;
            changes++;
        }
        //No fur, has ferret ears, tail, and legs:
        if (player.skinType != SKIN.FUR && player.upperBody.head.earType == EARS.FERRET && player.tailType == TAIL.FERRET && player.lowerBody == LOWER_BODY.FERRET && Utils.rand(4) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYour skin starts to itch like crazy as a thick coat of fur sprouts out of your skin.");
            //If hair was not sandy brown, silver, white, or brown
            if (player.hairColor != "sandy brown" && player.hairColor != "silver" && player.hairColor != "white" && player.hairColor != "brown") {
                MainScreen.text("\n\nOdder still, all of your hair changes to ");
                if (Utils.rand(4) == 0) player.hairColor = "sandy brown";
                else if (Utils.rand(3) == 0) player.hairColor = "silver";
                else if (Utils.rand(2) == 0) player.hairColor = "white";
                else player.hairColor = "brown";
                MainScreen.text(".");
            }
            MainScreen.text("  <b>You now have " + player.hairColor + " fur!</b>");
            player.skinType = SKIN.FUR;
            changes++;
        }
        //Tail TFs!
        if (player.tailType != TAIL.FERRET && player.upperBody.head.earType == EARS.FERRET && Utils.rand(3) == 0 && changes < changeLimit) {
            //If ears are ferret, no tail:
            if (player.tailType == 0) {
                MainScreen.text("\n\nYou slump to the ground as you feel your spine lengthening and twisting, sprouting fur as it finishes growing.  Luckily the new growth does not seem to have ruined your [armor].  <b>You now have a ferret tail!</b>");
            }
            //Placeholder for any future TFs that will need to be made compatible with this one
            //centaur, has ferret ears:
            else if (player.tailType == TAIL.HORSE && player.isTaur()) MainScreen.text("\n\nYou shiver as the wind gets to your tail, all of its shiny bristles having fallen out.  Your tail then begins to lengthen, warming back up as it sprouts a new, shaggier coat of fur.  This new, mismatched tail looks a bit odd on your horse lower body.  <b>You now have a ferret tail!</b>");
            //If tail is harpy, has ferret ears:
            else if (player.tailType == TAIL.HARPY) MainScreen.text("\n\nYou feel a soft tingle as your tail feathers fall out one by one.  The little stump that once held the feathers down begins to twist and lengthen before sprouting soft, fluffy fur.  <b>You now have a ferret tail!</b>");
            //If tail is bunny, has ferret ears:
            else if (player.tailType == TAIL.RABBIT) MainScreen.text("\n\nYou feel a pressure at the base of your tiny, poofy bunny tail as it begins to lengthen, gaining at least another foot in length.  <b>You now have a ferret tail!</b>");
            //If tail is reptilian/draconic, has ferret ears:
            else if (player.tailType == TAIL.DRACONIC || player.tailType == TAIL.LIZARD) MainScreen.text("\n\nYou reach a hand behind yourself to rub at your backside as your tail begins to twist and warp, becoming much thinner than before.  It then sprouts a thick coat of fur.  <b>You now have a ferret tail!</b>");
            //If tail is cow, has ferret ears:
            else if (player.tailType == TAIL.COW) MainScreen.text("\n\nYour tail begins to itch slightly as the poof at the end of your tail begins to spread across its entire surface, making all of its fur much more dense than it was before. It also loses a tiny bit of its former length. <b>You now have a ferret tail!</b>");
            //If tail is cat, has ferret ears:
            else if (player.tailType == TAIL.CAT) MainScreen.text("\n\nYour tail begins to itch as its fur becomes much denser than it was before.  It also loses a tiny bit of its former length.  <b>You now have a ferret tail!</b>");
            //If tail is dog, has ferret ears:
            else if (player.tailType == TAIL.DOG) MainScreen.text("\n\nSomething about your tail feels... different.  You reach behind yourself, feeling it.  It feels a bit floppier than it was before, and the fur seems to have become a little more dense.  <b>You now have a ferret tail!</b>");
            //If tail is kangaroo, has ferret ears:
            else if (player.tailType == TAIL.KANGAROO) MainScreen.text("\n\nYour tail becomes uncomfortably tight as the entirety of its length begins to lose a lot of its former thickness.  The general shape remains tapered, but its fur has become much more dense and shaggy.  <b>You now have a ferret tail!</b>");
            //If tail is fox, has ferret ears:
            else if (player.tailType == TAIL.FOX) MainScreen.text("\n\nYour tail begins to itch as its fur loses a lot of its former density.  It also appears to have lost a bit of length.  <b>You now have a ferret tail!</b>");
            //If tail is raccoon, has ferret ears:
            else if (player.tailType == TAIL.RACCOON) MainScreen.text("\n\nYour tail begins to itch as its fur loses a lot of its former density, losing its trademark ring pattern as well.  It also appears to have lost a bit of length.  <b>You now have a ferret tail!</b>");
            //If tail is horse, has ferret ears:
            else if (player.tailType == TAIL.HORSE) MainScreen.text("\n\nYou shiver as the wind gets to your tail, all of its shiny bristles having fallen out.  Your tail then begins to lengthen, warming back up as it sprouts a new, shaggier coat of fur.  <b>You now have a ferret tail!</b>");
            //If tail is mouse, has ferret ears:
            else if (player.tailType == TAIL.MOUSE) MainScreen.text("\n\nYour tail begins to itch as its bald surface begins to sprout a thick layer of fur.  It also appears to have lost a bit of its former length.  <b>You now have a ferret tail!</b>");
            else MainScreen.text("\n\nYour tail begins to itch a moment before it starts writhing, your back muscles spasming as it changes shape. Before you know it, <b>your tail has reformed into a narrow, ferret's tail.</b>");
            player.tailType = TAIL.FERRET;
            changes++;
        }
        //If naga, has ferret ears:
        //(NOTE: this is the only exception to the legs coming after the tail, as the ferret tail will only go away right after it appears because of your snake lower half)
        else if (player.isNaga() && player.upperBody.head.earType == EARS.FERRET && Utils.rand(4) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYou scream in agony as a horrible pain racks the entire length of your snake-like coils.  Unable to take it anymore, you pass out.  When you wake up, you’re shocked to find that you no longer have the lower body of a snake.  Instead, you have soft, furry legs that resemble that of a ferret’s.  <b>You now have ferret legs!</b>");
            changes++;
            player.lowerBody = LOWER_BODY.FERRET;
        }
        //If legs are not ferret, has ferret ears and tail
        if (player.lowerBody != LOWER_BODY.FERRET && player.upperBody.head.earType == EARS.FERRET && player.tailType == TAIL.FERRET && Utils.rand(4) == 0 && changes < changeLimit) {
            //-If centaur, has ferret ears and tail:
            if (player.isTaur()) MainScreen.text("\n\nYou scream in agony as a horrible pain racks your entire horse lower half.  Unable to take it anymore, you pass out.  When you wake up, you’re shocked to find that you no longer have the lower body of a horse.  Instead, you have soft, furry legs that resemble that of a ferret’s.  <b>You now have ferret legs!</b>");

            MainScreen.text("\n\nYou scream in agony as the bones in your legs begin to break and rearrange.  Even as the pain passes, an uncomfortable combination of heat and throbbing continues even after the transformation is over.  You rest for a moment, allowing the sensations to subside.  Now feeling more comfortable, <b>you stand up, ready to try out your new ferret legs!</b>");
            changes++;
            player.lowerBody = LOWER_BODY.FERRET;
        }
        //If ears are not ferret:
        if (player.upperBody.head.earType != EARS.FERRET && Utils.rand(4) == 0 && changes < changeLimit && Utils.rand(2.5) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYou squint as you feel a change in your ears.  Inspecting your reflection in a nearby puddle you find that <b>your ears have become small, fuzzy, and rounded, just like a ferret’s!</b>");
            player.upperBody.head.earType = EARS.FERRET;
            changes++;
        }
        //If no other effect occurred, fatigue decreases:
        if (changes == 0) {
            MainScreen.text("\n\nYour eyes widen.  With the consumption of the fruit, you feel much more energetic.  You’re wide awake now!");
            changes++;
            fatigue(-10);
        }
    }
}

