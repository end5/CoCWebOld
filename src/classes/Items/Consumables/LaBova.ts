import Consumable from "./Consumable";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";
import Utils from "../../Utilities/Utils";

export default class LaBova extends Consumable {
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
    public constructor() {
        super("Smart T", "Scholars T.", "a cup of scholar's tea", 0, "This powerful brew supposedly has mind-strengthening effects.");
    }

    public use(player: Player) {
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
        if (player.lowerBody.cockSpot.count() > 0 && Utils.rand(2) == 0 && !Flags.get(FlagEnum.HYPER_HAPPY)) {
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
            if (player.hairLength >= 6) MainScreen.text("\n\nA lock of your downy-soft feather-hair droops over your eye.  Before you can blow the offending down away, you realize the feather is collapsing in on itself.  It continues to curl inward until all that remains is a normal stUtils.Utils.rand of hair.  <b>Your hair is no longer feathery!</b>", false);
            //(short)
            else MainScreen.text("\n\nYou run your fingers through your downy-soft feather-hair while you await the effects of the item you just ingested.  While your hand is up there, it detects a change in the texture of your feathers.  They're completely disappearing, merging down into stUtils.Utils.rands of regular hair.  <b>Your hair is no longer feathery!</b>", false);
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
}