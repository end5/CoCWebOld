import Consumable from './Consumable';
import { SkinType } from '../../Body/Creature';
import { FaceType } from '../../Body/Face';
import { EarType, HornType } from '../../Body/Head';
import { LowerBodyType, TailType } from '../../Body/LowerBody';
import Vagina, { VaginaLooseness, VaginaWetness } from '../../Body/Vagina';
import BallsDescriptor from '../../Descriptors/BallsDescriptor';
import BreastDescriptor from '../../Descriptors/BreastDescriptor';
import ButtDescriptor from '../../Descriptors/ButtDescriptor';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import LowerBodyDescriptor from '../../Descriptors/LowerBodyDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import DisplayText from '../../display/DisplayText';
import PerkFactory from '../../Effects/PerkFactory';
import { PerkType } from '../../Effects/PerkType';
import StatusAffectFactory from '../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Flags, { FlagEnum } from '../../Game/Flags';
import BodyModifier from '../../Modifiers/BodyModifier';
import BreastModifier from '../../Modifiers/BreastModifier';
import CockModifier from '../../Modifiers/CockModifier';
import Player from '../../Player/Player';
import Utils from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

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
    private enhanced: boolean;
    private tainted: boolean;
    public constructor(enhanced: boolean, tainted: boolean) {
        if (enhanced)
            super("ProBova", new ItemDesc("ProBova", "a bottle containing a misty fluid labeled \"ProBova\"", "This cloudy potion has been enhanced by the alchemist Lumi to imbue its drinker with cow-like attributes."));
        else if (tainted)
            super("LaBova ", new ItemDesc("La Bova", "a bottle containing a misty fluid labeled \"LaBova\"", "A bottle containing a misty fluid with a grainy texture, it has a long neck and a ball-like base.  The label has a stylized picture of a well endowed cowgirl nursing two guys while they jerk themselves off."));
        else
            super("P.LBova", new ItemDesc("P.LBova", "a bottle containing a white fluid labeled \"Pure LaBova\"", "A bottle containing a misty fluid with a grainy texture); it has a long neck and a ball-like base.  The label has a stylized picture of a well-endowed cow-girl nursing two guys while they jerk themselves off. It has been purified by Rathazul."));
        this.enhanced = enhanced;
        this.tainted = tainted;
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
        if (player.perks.has(PerkType.HistoryAlchemist)) changeLimit++;
        if (this.enhanced) changeLimit += 2;
        //LaBova:
        //ItemDesc: "A bottle containing a misty fluid with a grainy texture, it has a long neck and a ball-like base.  The label has a stylized picture of a well endowed cowgirl nursing two guys while they jerk themselves off.  "
        //ItemUseText:
        DisplayText.clear();
        DisplayText.text("You drink the ");
        if (this.enhanced) DisplayText.text("Pro Bova");
        else DisplayText.text("La Bova");
        DisplayText.text(".  The drink has an odd texture, but is very sweet.  It has a slight aftertaste of milk.");
        //Possible Item Effects:
        //STATS
        //Increase player str:
        if (changes < changeLimit && Utils.rand(3) == 0) {
            let strengthGain = 60 - player.stats.str;
            if (strengthGain <= 0) strengthGain = 0;
            else {
                if (Utils.rand(2) == 0) DisplayText.text("\n\nThere is a slight pain as you feel your muscles shift somewhat.  Their appearance does not change much, but you feel much stronger.");
                else DisplayText.text("\n\nYou feel your muscles tighten and clench as they become slightly more pronounced.");
                player.stats.str += strengthGain / 10;
                changes++;
            }
        }
        //Increase player.stats.tou:
        if (changes < changeLimit && Utils.rand(3) == 0) {
            let toughGain = 60 - player.stats.tou;
            if (toughGain <= 0) toughGain = 0;
            else {
                if (Utils.rand(2) == 0) DisplayText.text("\n\nYou feel your insides toughening up; it feels like you could stand up to almost any blow.");
                else DisplayText.text("\n\nYour bones and joints feel sore for a moment, and before long you realize they've gotten more durable.");
                player.stats.tou += toughGain / 10;
                changes++;

            }
        }
        //Decrease player spd if it is over 30:
        if (changes < changeLimit && Utils.rand(3) == 0) {
            if (player.stats.spe > 30) {
                DisplayText.text("\n\nThe body mass you've gained is making your movements more sluggish.");
                changes++;
                player.stats.spe += -((player.stats.spe - 30) / 10);
            }
        }
        //Increase Corr, up to a max of 50.
        if (this.tainted) {
            let corruptionGain = 50 - player.stats.cor;
            if (corruptionGain < 0) corruptionGain = 0;
            player.stats.cor += corruptionGain / 10;
        }
        //Sex bits - Duderiffic
        if (player.lowerBody.cockSpot.count() > 0 && Utils.rand(2) == 0 && !Flags.list[FlagEnum.HYPER_HAPPY]) {
            //If the player has at least one dick, decrease the size of each slightly,
            DisplayText.text("\n\n");
            const biggestCock = player.lowerBody.cockSpot.listLargestCockArea[0];
            let cockGrowth: number = 0;
            //Shrink said cock
            if (biggestCock.cockLength < 6 && biggestCock.cockLength >= 2.9) {
                biggestCock.cockLength -= .5;
                cockGrowth -= .5;
            }
            cockGrowth += CockModifier.growCock(player, biggestCock, (Utils.rand(3) + 1) * -1);
            CockModifier.displayLengthChange(player, cockGrowth, 1);
            if (biggestCock.cockLength < 2) {
                DisplayText.text("  ");
                if (player.lowerBody.cockSpot.count() == 1 && !player.lowerBody.vaginaSpot.hasVagina()) {
                    DisplayText.text("Your " + CockDescriptor.describeCock(player, biggestCock) + " suddenly starts tingling.  It's a familiar feeling, similar to an orgasm.  However, this one seems to start from the top down, instead of gushing up from your loins.  You spend a few seconds frozen to the odd sensation, when it suddenly feels as though your own body starts sucking on the base of your shaft.  Almost instantly, your cock sinks into your crotch with a wet slurp.  The tip gets stuck on the front of your body on the way down, but your glans soon loses all volume to turn into a shiny new clit.");
                    if (player.lowerBody.balls > 0)
                        DisplayText.text("  At the same time, your " + BallsDescriptor.describeBallsShort(player) + " fall victim to the same sensation; eagerly swallowed whole by your crotch.");
                    DisplayText.text("  Curious, you touch around down there, to find you don't have any exterior organs left.  All of it got swallowed into the gash you now have running between two fleshy folds, like sensitive lips.  It suddenly occurs to you; <b>you now have a vagina!</b>");
                    player.lowerBody.balls = 0;
                    player.lowerBody.ballSize = 1;
                    const newVagina = new Vagina();
                    newVagina.clitLength = .25;
                    player.lowerBody.vaginaSpot.add(newVagina);
                    player.lowerBody.cockSpot.remove(player, biggestCock);
                }
                else {
                    CockModifier.displayKillCocks(player, 1);
                    player.updateGender();
                }
            }
            //if the last of the player's dicks are eliminated this way, they gain a virgin vagina;
            if (player.lowerBody.cockSpot.count() == 0 && !player.lowerBody.vaginaSpot.hasVagina()) {
                const newVagina = new Vagina();
                newVagina.vaginalLooseness = VaginaLooseness.TIGHT;
                newVagina.vaginalWetness = VaginaWetness.NORMAL;
                newVagina.virgin = true;
                newVagina.clitLength = .25;
                player.lowerBody.vaginaSpot.add(newVagina);
                DisplayText.text("\n\nAn itching starts in your crotch and spreads vertically.  You reach down and discover an opening.  You have grown a <b>new " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + "</b>!");

                changes++;
                player.updateGender();
                player.stats.lust += 10;
            }
        }
        //Sex bits - girly
        let boobsGrew: boolean = false;
        //Increase player's breast size, if they are HH or bigger
        //do not increase size, but do the other actions:
        if (((this.tainted && player.upperBody.chest.BreastRatingLargest[0].breastRating <= 11) || (!this.tainted && player.upperBody.chest.BreastRatingLargest[0].breastRating <= 5)) && changes < changeLimit && (Utils.rand(3) == 0 || this.enhanced)) {
            if (Utils.rand(2) == 0) DisplayText.text("\n\nYour " + BreastDescriptor.describeBreastRow(player.upperBody.chest.get(0)) + " tingle for a moment before becoming larger.");
            else DisplayText.text("\n\nYou feel a little weight added to your chest as your " + BreastDescriptor.describeBreastRow(player.upperBody.chest.get(0)) + " seem to inflate and settle in a larger size.");
            BreastModifier.growTopBreastRow(player, 1 + Utils.rand(3), 1, false);
            changes++;
            player.stats.sens += .5;
            boobsGrew = true;
        }
        //-Remove feathery hair (copy for equinum, canine peppers, Labova)
        if (changes < changeLimit && player.upperBody.head.hairType == 1 && Utils.rand(4) == 0) {
            //(long):
            if (player.upperBody.head.hairLength >= 6) DisplayText.text("\n\nA lock of your downy-soft feather-hair droops over your eye.  Before you can blow the offending down away, you realize the feather is collapsing in on itself.  It continues to curl inward until all that remains is a normal stUtils.Utils.rand of hair.  <b>Your hair is no longer feathery!</b>");
            //(short)
            else DisplayText.text("\n\nYou run your fingers through your downy-soft feather-hair while you await the effects of the item you just ingested.  While your hand is up there, it detects a change in the texture of your feathers.  They're completely disappearing, merging down into stUtils.Utils.rands of regular hair.  <b>Your hair is no longer feathery!</b>");
            changes++;
            player.upperBody.head.hairType = 0;
        }
        //If breasts are D or bigger and are not lactating, they also start lactating:
        if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 4 && player.upperBody.chest.get(0).lactationMultiplier < 1 && changes < changeLimit && (Utils.rand(3) == 0 || boobsGrew || this.enhanced)) {
            DisplayText.text("\n\nYou gasp as your " + BreastDescriptor.describeBreastRow(player.upperBody.chest.get(0)) + " feel like they are filling up with something.  Within moments, a drop of milk leaks from your " + BreastDescriptor.describeBreastRow(player.upperBody.chest.get(0)) + "; <b> you are now lactating</b>.");
            player.upperBody.chest.get(0).lactationMultiplier = 1.25;
            changes++;
            player.stats.sens += .5;
        }
        //Quad nipples and other 'special enhanced things.
        if (this.enhanced) {
            //QUAD DAMAGE!
            if (player.upperBody.chest.get(0).nipplesPerBreast == 1) {
                changes++;
                player.upperBody.chest.get(0).nipplesPerBreast = 4;
                DisplayText.text("\n\nYour " + BreastDescriptor.describeNipple(player, player.upperBody.chest.get(0)) + "s tingle and itch.  You pull back your " + player.inventory.armorSlot.equipment.displayName + " and watch in shock as they split into four distinct nipples!  <b>You now have four nipples on each side of your chest!</b>");
                if (player.upperBody.chest.count() >= 2 && player.upperBody.chest.get(1).nipplesPerBreast == 1) {
                    DisplayText.text("A moment later your second row of " + BreastDescriptor.describeBreastRow(player.upperBody.chest.get(1)) + " does the same.  <b>You have sixteen nipples now!</b>");
                    player.upperBody.chest.get(1).nipplesPerBreast = 4;
                }
                if (player.upperBody.chest.count() >= 3 && player.upperBody.chest.get(2).nipplesPerBreast == 1) {
                    DisplayText.text("Finally, your ");
                    if (player.upperBody.chest.count() == 3) DisplayText.text("third row of " + BreastDescriptor.describeBreastRow(player.upperBody.chest.get(2)) + " mutates along with its sisters, sprouting into a wonderland of nipples.");
                    else if (player.upperBody.chest.count() >= 4) {
                        DisplayText.text("everything from the third row down mutates, sprouting into a wonderland of nipples.");
                        player.upperBody.chest.get(3).nipplesPerBreast = 4;
                        if (player.upperBody.chest.count() >= 5) player.upperBody.chest.get(4).nipplesPerBreast = 4;
                        if (player.upperBody.chest.count() >= 6) player.upperBody.chest.get(5).nipplesPerBreast = 4;
                        if (player.upperBody.chest.count() >= 7) player.upperBody.chest.get(6).nipplesPerBreast = 4;
                        if (player.upperBody.chest.count() >= 8) player.upperBody.chest.get(7).nipplesPerBreast = 4;
                        if (player.upperBody.chest.count() >= 9) player.upperBody.chest.get(8).nipplesPerBreast = 4;
                    }
                    player.upperBody.chest.get(2).nipplesPerBreast = 4;
                    DisplayText.text("  <b>You have a total of " + Utils.numToCardinalText(player.upperBody.chest.countNipples()) + " nipples.</b>");
                }
            }
            //QUAD DAMAGE IF WEIRD SHIT BROKE BEFORE
            else if (player.upperBody.chest.count() > 1 && player.upperBody.chest.get(1).nipplesPerBreast == 1) {
                if (player.upperBody.chest.get(1).nipplesPerBreast == 1) {
                    DisplayText.text("\n\nYour second row of " + BreastDescriptor.describeBreastRow(player.upperBody.chest.get(1)) + " tingle and itch.  You pull back your " + player.inventory.armorSlot.equipment.displayName + " and watch in shock as your " + BreastDescriptor.describeNipple(player, player.upperBody.chest.get(1)) + " split into four distinct nipples!  <b>You now have four nipples on each breast in your second row of breasts</b>.");
                    player.upperBody.chest.get(1).nipplesPerBreast = 4;
                }
            }
            else if (player.upperBody.chest.count() > 2 && player.upperBody.chest.get(2).nipplesPerBreast == 1) {
                if (player.upperBody.chest.get(2).nipplesPerBreast == 1) {
                    DisplayText.text("\n\nYour third row of " + BreastDescriptor.describeBreastRow(player.upperBody.chest.get(2)) + " tingle and itch.  You pull back your " + player.inventory.armorSlot.equipment.displayName + " and watch in shock as your " + BreastDescriptor.describeNipple(player, player.upperBody.chest.get(2)) + " split into four distinct nipples!  <b>You now have four nipples on each breast in your third row of breasts</b>.");
                    player.upperBody.chest.get(2).nipplesPerBreast = 4;
                }
            }
            else if (player.upperBody.chest.count() > 3 && player.upperBody.chest.get(3).nipplesPerBreast == 1) {
                if (player.upperBody.chest.get(3).nipplesPerBreast == 1) {
                    DisplayText.text("\n\nYour fourth row of " + BreastDescriptor.describeBreastRow(player.upperBody.chest.get(3)) + " tingle and itch.  You pull back your " + player.inventory.armorSlot.equipment.displayName + " and watch in shock as your " + BreastDescriptor.describeNipple(player, player.upperBody.chest.get(3)) + " split into four distinct nipples!  <b>You now have four nipples on each breast in your fourth row of breasts</b>.");
                    player.upperBody.chest.get(3).nipplesPerBreast = 4;
                }
            }
            else if (player.upperBody.chest.LactationMultipierLargest[0].lactationMultiplier > 1) {
                if (Utils.rand(2) == 0) DisplayText.text("\n\nA wave of pleasure passes through your chest as your " + BreastDescriptor.describeBreastRow(player.upperBody.chest.get(0)) + " start leaking milk from a massive jump in production.");
                else DisplayText.text("\n\nSomething shifts inside your " + BreastDescriptor.describeBreastRow(player.upperBody.chest.get(0)) + " and they feel MUCH fuller and riper.  You know that you've started producing much more milk.");
                BreastModifier.boostLactation(player, 2.5);
                if ((player.upperBody.chest.BreastRatingLargest[0].nippleLength < 1.5 && this.tainted) || (!this.tainted && player.upperBody.chest.BreastRatingLargest[0].nippleLength < 1)) {
                    DisplayText.text("  Your " + BreastDescriptor.describeNipple(player, player.upperBody.chest.get(0)) + "s swell up, growing larger to accommodate your increased milk flow.");
                    player.upperBody.chest.BreastRatingLargest[0].nippleLength += .25;
                    player.stats.sens += .5;
                }
                changes++;
            }
        }
        //If breasts are already lactating and the player is not lactating beyond a reasonable level, they start lactating more:
        else {
            if (this.tainted && player.upperBody.chest.get(0).lactationMultiplier > 1 && player.upperBody.chest.get(0).lactationMultiplier < 5 && changes < changeLimit && (Utils.rand(3) == 0 || this.enhanced)) {
                if (Utils.rand(2) == 0) DisplayText.text("\n\nA wave of pleasure passes through your chest as your " + BreastDescriptor.describeBreastRow(player.upperBody.chest.get(0)) + " start producing more milk.");
                else DisplayText.text("\n\nSomething shifts inside your " + BreastDescriptor.describeBreastRow(player.upperBody.chest.get(0)) + " and they feel fuller and riper.  You know that you've started producing more milk.");
                BreastModifier.boostLactation(player, 0.75);
                if ((player.upperBody.chest.BreastRatingLargest[0].nippleLength < 1.5 && this.tainted) || (!this.tainted && player.upperBody.chest.BreastRatingLargest[0].nippleLength < 1)) {
                    DisplayText.text("  Your " + BreastDescriptor.describeNipple(player, player.upperBody.chest.get(0)) + "s swell up, growing larger to accommodate your increased milk flow.");
                    player.upperBody.chest.BreastRatingLargest[0].nippleLength += .25;
                    player.stats.sens += .5;
                }
                changes++;
            }
            if (!this.tainted) {
                if (player.upperBody.chest.get(0).lactationMultiplier > 1 && player.upperBody.chest.get(0).lactationMultiplier < 3.2 && changes < changeLimit && Utils.rand(3) == 0) {
                    if (Utils.rand(2) == 0) DisplayText.text("\n\nA wave of pleasure passes through your chest as your " + BreastDescriptor.describeBreastRow(player.upperBody.chest.get(0)) + " start producing more milk.");
                    else DisplayText.text("\n\nSomething shifts inside your " + BreastDescriptor.describeBreastRow(player.upperBody.chest.get(0)) + " and they feel fuller and riper.  You know that you've started producing more milk.");
                    BreastModifier.boostLactation(player, 0.75);
                    if ((player.upperBody.chest.BreastRatingLargest[0].nippleLength < 1.5 && this.tainted) || (!this.tainted && player.upperBody.chest.BreastRatingLargest[0].nippleLength < 1)) {
                        DisplayText.text("  Your " + BreastDescriptor.describeNipple(player, player.upperBody.chest.get(0)) + "s swell up, growing larger to accommodate your increased milk flow.");
                        player.upperBody.chest.BreastRatingLargest[0].nippleLength += .25;
                        player.stats.sens += .5;
                    }
                    changes++;
                }
                if ((player.upperBody.chest.get(0).lactationMultiplier > 2 && player.statusAffects.has(StatusAffectType.Feeder)) || player.upperBody.chest.get(0).lactationMultiplier > 5) {
                    if (Utils.rand(2) == 0) DisplayText.text("\n\nYour breasts suddenly feel less full, it seems you aren't lactating at quite the level you were.");
                    else DisplayText.text("\n\nThe insides of your breasts suddenly feel bloated.  There is a spray of milk from them, and they settle closer to a more natural level of lactation.");
                    changes++;
                    player.stats.sens += .5;
                    BreastModifier.boostLactation(player, -1);
                }
            }
        }
        //If breasts are lactating at a fair level
        //and the player has not received this status,
        //apply an effect where the player really wants
        //to give their milk to other creatures
        //(capable of getting them addicted):
        if (!player.statusAffects.has(StatusAffectType.Feeder) && player.upperBody.chest.LactationMultipierLargest[0].lactationMultiplier >= 3 && Utils.rand(2) == 0 && player.upperBody.chest.BreastRatingLargest[0].breastRating >= 5 && player.stats.cor >= 35) {
            DisplayText.text("\n\nYou start to feel a strange desire to give your milk to other creatures.  For some reason, you know it will be very satisfying.\n\n<b>(You have gained the 'Feeder' perk!)</b>");
            player.statusAffects.add(StatusAffectFactory.create(StatusAffectType.Feeder, 0, 0, 0, 0));
            player.perks.add(PerkFactory.create(PerkType.Feeder, 0, 0, 0, 0));
            changes++;
        }
        //UNFINISHED
        //If player has addictive quality and drinks pure version, removes addictive quality.
        //if the player has a vagina and it is tight, it loosens.
        if (player.lowerBody.vaginaSpot.hasVagina()) {
            if (player.lowerBody.vaginaSpot.get(0).vaginalLooseness < VaginaLooseness.LOOSE && changes < changeLimit && Utils.rand(2) == 0) {
                DisplayText.text("\n\nYou feel a relaxing sensation in your groin.  On further inspection you discover your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " has somehow relaxed, permanently loosening.");
                player.lowerBody.vaginaSpot.get(0).vaginalLooseness++;
                //Cunt Stretched used to determine how long since last enlargement
                if (!player.statusAffects.has(StatusAffectType.CuntStretched))
                    player.statusAffects.add(StatusAffectFactory.create(StatusAffectType.CuntStretched, 0, 0, 0, 0));
                //Reset the timer on it to 0 when restretched.
                else
                    player.statusAffects.get(StatusAffectType.CuntStretched).value1 = 0;
                player.lowerBody.vaginaSpot.get(0).vaginalLooseness++;
                changes++;
                player.stats.lust += 10;
            }
        }
        //General Appearance (Tail -> Ears -> Paws(fur stripper) -> Face -> Horns
        //Give the player a bovine tail, same as the minotaur
        if (this.tainted && player.lowerBody.tailType != TailType.COW && changes < changeLimit && Utils.rand(3) == 0) {
            if (player.lowerBody.tailType == TailType.NONE) DisplayText.text("\n\nYou feel the flesh above your " + ButtDescriptor.describeButt(player) + " knotting and growing.  It twists and writhes around itself before flopping straight down, now shaped into a distinctly bovine form.  You have a <b>cow tail</b>.");
            else {
                if (player.lowerBody.tailType < TailType.SPIDER_ABDOMEN || player.lowerBody.tailType > TailType.BEE_ABDOMEN) {
                    DisplayText.text("\n\nYour tail bunches uncomfortably, twisting and writhing around itself before flopping straight down, now shaped into a distinctly bovine form.  You have a <b>cow tail</b>.");
                }
                //insect
                if (player.lowerBody.tailType == TailType.SPIDER_ABDOMEN || player.lowerBody.tailType == TailType.BEE_ABDOMEN) {
                    DisplayText.text("\n\nYour insect-like abdomen tingles pleasantly as it begins shrinking and softening, chitin morphing and reshaping until it looks exactly like a <b>cow tail</b>.");
                }
            }
            player.lowerBody.tailType = TailType.COW;
            changes++;
        }
        //Give the player bovine ears, same as the minotaur
        if (this.tainted && player.upperBody.head.earType != EarType.COW && changes < changeLimit && Utils.rand(4) == 0 && player.lowerBody.tailType == TailType.COW) {
            DisplayText.text("\n\nYou feel your ears tug on your scalp as they twist shape, becoming oblong and cow-like.  <b>You now have cow ears.</b>");
            player.upperBody.head.earType = EarType.COW;
            changes++;
        }
        //If the player is under 7 feet in height, increase their height, similar to the minotaur
        if (((this.enhanced && player.tallness < 96) || player.tallness < 84) && changes < changeLimit && Utils.rand(2) == 0) {
            let heightGain = Utils.rand(5) + 3;
            //Slow rate of growth near ceiling
            if (player.tallness > 74) heightGain = Math.floor(heightGain / 2);
            //Never 0
            if (heightGain == 0) heightGain = 1;
            //Flavor texts.  Flavored like 1950's cigarettes. Yum.
            if (heightGain < 5) DisplayText.text("\n\nYou shift uncomfortably as you realize you feel off balance.  Gazing down, you realize you have grown SLIGHTLY taller.");
            if (heightGain >= 5 && heightGain < 7) DisplayText.text("\n\nYou feel dizzy and slightly off, but quickly realize it's due to a sudden increase in height.");
            if (heightGain == 7) DisplayText.text("\n\nStaggering forwards, you clutch at your head dizzily.  You spend a moment getting your balance, and stand up, feeling noticeably taller.");
            player.tallness += heightGain;
            changes++;
        }
        //Give the player hoofs, if the player already has hoofs STRIP FUR
        if (this.tainted && player.lowerBody.type != LowerBodyType.HOOFED && player.upperBody.head.earType == EarType.COW) {
            if (changes < changeLimit && Utils.rand(3) == 0) {
                changes++;
                if (player.lowerBody.type == LowerBodyType.HUMAN) DisplayText.text("\n\nYou stagger as your feet change, curling up into painful angry lumps of flesh.  They get tighter and tighter, harder and harder, until at last they solidify into hooves!");
                if (player.lowerBody.type == LowerBodyType.DOG) DisplayText.text("\n\nYou stagger as your paws change, curling up into painful angry lumps of flesh.  They get tighter and tighter, harder and harder, until at last they solidify into hooves!");
                if (player.lowerBody.type == LowerBodyType.NAGA) DisplayText.text("\n\nYou collapse as your sinuous snake-tail tears in half, shifting into legs.  The pain is immense, particularly in your new feet as they curl inward and transform into hooves!");
                //Catch-all
                if (player.lowerBody.type > LowerBodyType.NAGA) DisplayText.text("\n\nYou stagger as your " + LowerBodyDescriptor.describeFeet(player) + " change, curling up into painful angry lumps of flesh.  They get tighter and tighter, harder and harder, until at last they solidify into hooves!");
                DisplayText.text("  A coat of beastial fur springs up below your waist, itching as it fills in.<b>  You now have hooves in place of your feet!</b>");
                player.lowerBody.type = LowerBodyType.HOOFED;
                player.stats.cor += 0;
                changes++;
            }
        }
        //If the player's face is non-human, they gain a human face
        if (!this.enhanced && player.lowerBody.type == LowerBodyType.HOOFED && player.upperBody.head.face.faceType != FaceType.HUMAN && changes < changeLimit && Utils.rand(4) == 0) {
            //Remove face before fur!
            DisplayText.text("\n\nYour visage twists painfully, returning to a normal human shape.  <b>Your face is human again!</b>");
            player.upperBody.head.face.faceType = FaceType.HUMAN;
            changes++;
        }
        //enhanced get shitty fur
        if (this.enhanced && (player.skinDesc != "fur" || player.upperBody.head.hairColor != "black and white spotted")) {
            if (player.skinDesc != "fur") DisplayText.text("\n\nYour " + player.skinDesc + " itches intensely.  You scratch and scratch, but it doesn't bring any relief.  Fur erupts between your fingers, and you watch open-mouthed as it fills in over your whole body.  The fur is patterned in black and white, like that of a cow.  The color of it even spreads to your hair!  <b>You have cow fur!</b>");
            else DisplayText.text("\n\nA ripple spreads through your fur as some patches darken and others lighten.  After a few moments you're left with a black and white spotted pattern that goes the whole way up to the hair on your head!  <b>You've got cow fur!</b>");
            player.skinDesc = "fur";
            player.skinAdj = "";
            player.skinType = SkinType.FUR;
            player.upperBody.head.hairColor = "black and white spotted";

        }
        //if enhanced to probova give a shitty cow face
        else if (this.enhanced && player.upperBody.head.face.faceType != FaceType.COW_MINOTAUR) {
            DisplayText.text("\n\nYour visage twists painfully, warping and crackling as your bones are molded into a new shape.  Once it finishes, you reach up to touch it, and you discover that <b>your face is like that of a cow!</b>");
            player.upperBody.head.face.faceType = FaceType.COW_MINOTAUR;
            changes++;
        }
        //Give the player bovine horns, or increase their size, same as the minotaur
        //New horns or expanding mino horns
        if (this.tainted && changes < changeLimit && Utils.rand(3) == 0 && player.upperBody.head.face.faceType == FaceType.HUMAN) {
            //Get bigger or change horns
            if (player.upperBody.head.hornType == HornType.COW_MINOTAUR || player.upperBody.head.hornType == HornType.NONE) {
                //Get bigger if player has horns
                if (player.upperBody.head.hornType == HornType.COW_MINOTAUR) {
                    if (player.upperBody.head.horns < 5) {
                        //Fems horns don't get bigger.
                        DisplayText.text("\n\nYour small horns get a bit bigger, stopping as medium sized nubs.");
                        player.upperBody.head.horns += 1 + Utils.rand(2);
                        changes++;
                    }
                }
                //If no horns yet..
                if (player.upperBody.head.hornType == HornType.NONE || player.upperBody.head.horns == 0) {
                    DisplayText.text("\n\nWith painful pressure, the skin on your forehead splits around two tiny nub-like horns, similar to those you would see on the cattle back in your homeland.");
                    player.upperBody.head.hornType = HornType.COW_MINOTAUR;
                    player.upperBody.head.horns = 1;
                    changes++;
                }
                /* Never reached
                //TF other horns
                if (player.upperBody.head.hornType != HornType.NONE && player.upperBody.head.hornType != HornType.COW_MINOTAUR && player.upperBody.head.horns > 0) {
                    DisplayText.text("\n\nYour horns twist, filling your skull with agonizing pain for a moment as they transform into cow-horns.");
                    player.upperBody.head.hornType = HornType.COW_MINOTAUR;
                }*/
            }
            //Not mino horns, change to cow-horns
            if (player.upperBody.head.hornType == HornType.DEMON || player.upperBody.head.hornType > HornType.COW_MINOTAUR) {
                DisplayText.text("\n\nYour horns vibrate and shift as if made of clay, reforming into two small bovine nubs.");
                player.upperBody.head.hornType = HornType.COW_MINOTAUR;
                player.upperBody.head.horns = 2;
                changes++;
            }
        }
        //Increase the size of the player's hips, if they are not already childbearing or larger
        if (Utils.rand(2) == 0 && player.lowerBody.hipRating < 15 && changes < changeLimit) {
            if (!this.tainted && player.lowerBody.hipRating < 8 || this.tainted) {
                DisplayText.text("\n\nYou stumble as you feel the bones in your hips grinding, expanding your hips noticeably.");
                player.lowerBody.hipRating += 1 + Utils.rand(4);
                changes++;
            }
        }
        if (Utils.rand(4) == 0 && player.upperBody.gills && changes < changeLimit) {
            DisplayText.text("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.");
            player.upperBody.gills = false;
            changes++;
        }
        //Increase the size of the player's ass (less likely then hips), if it is not already somewhat big
        if (Utils.rand(2) == 0 && player.lowerBody.butt.buttRating < 13 && changes < changeLimit) {
            if (!this.tainted && player.lowerBody.butt.buttRating < 8 || this.tainted) {
                DisplayText.text("\n\nA sensation of being unbalanced makes it difficult to walk.  You pause, paying careful attention to your new center of gravity before understanding dawns on you - your ass has grown!");
                player.lowerBody.butt.buttRating += 1 + Utils.rand(2);
                changes++;
            }
        }
        //Nipples Turn Back:
        if (player.statusAffects.has(StatusAffectType.BlackNipples) && changes < changeLimit && Utils.rand(3) == 0) {
            DisplayText.text("\n\nSomething invisible brushes against your " + BreastDescriptor.describeNipple(player, player.upperBody.chest.get(0)) + ", making you twitch.  Undoing your clothes, you take a look at your chest and find that your nipples have turned back to their natural flesh colour.");
            changes++;
            player.statusAffects.remove(StatusAffectType.BlackNipples);
        }
        //Debugcunt
        if (changes < changeLimit && Utils.rand(3) == 0 && player.lowerBody.vaginaSpot.get(0).vaginaType == 5 && player.lowerBody.vaginaSpot.hasVagina()) {
            DisplayText.text("\n\nSomething invisible brushes against your sex, making you twinge.  Undoing your clothes, you take a look at your vagina and find that it has turned back to its natural flesh colour.");
            player.lowerBody.vaginaSpot.get(0).vaginaType = 0;
            changes++;
        }
        if (Utils.rand(3) == 0) DisplayText.text(player.modFem(79, 3));
        if (Utils.rand(3) == 0) DisplayText.text(BodyModifier.displayModThickness(player, 70, 4));
        if (Utils.rand(5) == 0) DisplayText.text(BodyModifier.displayModTone(player, 10, 5));
    }
}