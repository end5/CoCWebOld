import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { DisplayText } from '../../../Engine/display/DisplayText';
import { randInt } from '../../../Engine/Utilities/SMath';
import { BreastRow } from '../../Body/BreastRow';
import { Cock } from '../../Body/Cock';
import { EarType } from '../../Body/Ears';
import { FaceType } from '../../Body/Face';
import { HornType } from '../../Body/Horns';
import { LegType } from '../../Body/Legs';
import { SkinType } from '../../Body/Skin';
import { Tail, TailType } from '../../Body/Tail';
import { Vagina, VaginaLooseness, VaginaWetness } from '../../Body/Vagina';
import { Character } from '../../Character/Character';
import { Desc } from '../../Descriptors/Descriptors';
import { PerkType } from '../../Effects/PerkType';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import { Mod } from '../../Modifiers/Modifiers';
import { User } from '../../User';
import { numToCardinalText } from '../../Utilities/NumToText';
import { ItemDesc } from '../ItemDesc';

export class LaBova extends Consumable {
    /*Purified LaBova:
     This will be one of the items that the character will have to give Marble to purify her, but there is a limit on how much she can be purified in this way.
     Effects on the character:
     Mostly the same, but without animal transforms, corruption, and lower limits on body changes
     Hips and ass cap at half the value for LaBova
     Nipple growth caps at 1 inch
     Breasts cap at E or DD cup
     Raises lactation to a relatively low level, reduces high levels: \"Your breasts suddenly feel less full, it seems you aren't lactating at quite the level you where.\"  OR  \"The insides of your breasts suddenly feel bloated.  There is a spray of milk from them, and they settle closer to a more natural level of lactation.\"
     Does not apply the addictive quality
     If the character has the addictive quality, this item can remove that effect

     Enhanced LaBova:
     Something that the character can either make or find later; put it in whenever you want, or make your own item.  This is just a possible suggestion.  If it is given to Marble, she only gains the quad nipples.
     Effects on the character
     Mostly the same, but some of the effects can be more pronounced.  Ie, more str gain from one dose, or more breast growth.
     If the character's nipples are larger than 1 inch in length, this item is guaranteed to give them quad nipples.  This applies to all their breasts; seems like it ould be a good compromise on whether or not cowgirls should have 4 breasts.
     Very small chance to increase fertility (normally this increase would only happen when the character forces a creature to drink their milk).
     */
    private enhanced: boolean;
    private tainted: boolean;
    public constructor(enhanced: boolean, tainted: boolean) {
        if (enhanced)
            super(ConsumableName.LaBovaEnhanced, new ItemDesc("ProBova", "a bottle containing a misty fluid labeled \"ProBova\"", "This cloudy potion has been enhanced by the alchemist Lumi to imbue its drinker with cow-like attributes."));
        else if (tainted)
            super(ConsumableName.LaBova, new ItemDesc("La Bova", "a bottle containing a misty fluid labeled \"LaBova\"", "A bottle containing a misty fluid with a grainy texture, it has a long neck and a ball-like base.  The label has a stylized picture of a well endowed cowgirl nursing two guys while they jerk themselves off."));
        else
            super(ConsumableName.LaBovaPure, new ItemDesc("P.LBova", "a bottle containing a white fluid labeled \"Pure LaBova\"", "A bottle containing a misty fluid with a grainy texture); it has a long neck and a ball-like base.  The label has a stylized picture of a well-endowed cow-girl nursing two guys while they jerk themselves off. It has been purified by Rathazul."));
        this.enhanced = enhanced;
        this.tainted = tainted;
    }

    public use(character: Character) {
        // character.slimeFeed();
        // Changes done
        let changes: number = 0;
        // Change limit
        let changeLimit: number = 1;
        if (randInt(2) === 0) changeLimit++;
        if (randInt(3) === 0) changeLimit++;
        if (randInt(3) === 0) changeLimit++;
        if (character.perks.has(PerkType.HistoryAlchemist)) changeLimit++;
        if (this.enhanced) changeLimit += 2;
        // LaBova:
        // ItemDesc: "A bottle containing a misty fluid with a grainy texture, it has a long neck and a ball-like base.  The label has a stylized picture of a well endowed cowgirl nursing two guys while they jerk themselves off.  "
        // ItemUseText:
        DisplayText().clear();
        DisplayText("You drink the ");
        if (this.enhanced) DisplayText("Pro Bova");
        else DisplayText("La Bova");
        DisplayText(".  The drink has an odd texture, but is very sweet.  It has a slight aftertaste of milk.");
        // Possible Item Effects:
        // STATS
        // Increase character str:
        if (changes < changeLimit && randInt(3) === 0) {
            let strengthGain = 60 - character.stats.str;
            if (strengthGain <= 0) strengthGain = 0;
            else {
                if (randInt(2) === 0) DisplayText("\n\nThere is a slight pain as you feel your muscles shift somewhat.  Their appearance does not change much, but you feel much stronger.");
                else DisplayText("\n\nYou feel your muscles tighten and clench as they become slightly more pronounced.");
                character.stats.str += strengthGain / 10;
                changes++;
            }
        }
        // Increase character.stats.tou:
        if (changes < changeLimit && randInt(3) === 0) {
            let toughGain = 60 - character.stats.tou;
            if (toughGain <= 0) toughGain = 0;
            else {
                if (randInt(2) === 0) DisplayText("\n\nYou feel your insides toughening up; it feels like you could stand up to almost any blow.");
                else DisplayText("\n\nYour bones and joints feel sore for a moment, and before long you realize they've gotten more durable.");
                character.stats.tou += toughGain / 10;
                changes++;

            }
        }
        // Decrease character spd if it is over 30:
        if (changes < changeLimit && randInt(3) === 0) {
            if (character.stats.spe > 30) {
                DisplayText("\n\nThe body mass you've gained is making your movements more sluggish.");
                changes++;
                character.stats.spe += -((character.stats.spe - 30) / 10);
            }
        }
        // Increase Corr, up to a max of 50.
        if (this.tainted) {
            let corruptionGain = 50 - character.stats.cor;
            if (corruptionGain < 0) corruptionGain = 0;
            character.stats.cor += corruptionGain / 10;
        }
        // Sex bits - Duderiffic
        if (character.torso.cocks.count > 0 && randInt(2) === 0 && !User.settings.hyperHappy) {
            // If the character has at least one dick, decrease the size of each slightly,
            DisplayText("\n\n");
            const biggestCock = character.torso.cocks.sort(Cock.LargestCockArea)[0];
            let cockGrowth: number = 0;
            // Shrink said cock
            if (biggestCock.length < 6 && biggestCock.length >= 2.9) {
                biggestCock.length -= .5;
                cockGrowth -= .5;
            }
            cockGrowth += Mod.Cock.growCock(character, biggestCock, (randInt(3) + 1) * -1);
            Mod.Cock.displayLengthChange(character, cockGrowth, 1);
            if (biggestCock.length < 2) {
                DisplayText("  ");
                if (character.torso.cocks.count === 1 && character.torso.vaginas.count <= 0) {
                    DisplayText("Your " + Desc.Cock.describeCock(character, biggestCock) + " suddenly starts tingling.  It's a familiar feeling, similar to an orgasm.  However, this one seems to start from the top down, instead of gushing up from your loins.  You spend a few seconds frozen to the odd sensation, when it suddenly feels as though your own body starts sucking on the base of your shaft.  Almost instantly, your cock sinks into your crotch with a wet slurp.  The tip gets stuck on the front of your body on the way down, but your glans soon loses all volume to turn into a shiny new clit.");
                    if (character.torso.balls.quantity > 0)
                        DisplayText("  At the same time, your " + Desc.Balls.describeBallsShort(character) + " fall victim to the same sensation; eagerly swallowed whole by your crotch.");
                    DisplayText("  Curious, you touch around down there, to find you don't have any exterior organs left.  All of it got swallowed into the gash you now have running between two fleshy folds, like sensitive lips.  It suddenly occurs to you; <b>you now have a vagina!</b>");
                    character.torso.balls.quantity = 0;
                    character.torso.balls.size = 1;
                    character.torso.vaginas.add(new Vagina());
                    character.torso.cocks.remove(character.torso.cocks.indexOf(biggestCock));
                }
                else {
                    Mod.Cock.displayKillCocks(character, 1);
                    character.updateGender();
                }
            }
            // if the last of the character's dicks are eliminated this way, they gain a virgin vagina;
            if (character.torso.cocks.count === 0 && character.torso.vaginas.count <= 0) {
                const newVagina = new Vagina();
                newVagina.looseness = VaginaLooseness.TIGHT;
                newVagina.wetness = VaginaWetness.NORMAL;
                newVagina.virgin = true;
                character.torso.vaginas.add(newVagina);
                DisplayText("\n\nAn itching starts in your crotch and spreads vertically.  You reach down and discover an opening.  You have grown a <b>new " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + "</b>!");

                changes++;
                character.updateGender();
                character.stats.lust += 10;
            }
        }
        // Sex bits - girly
        let boobsGrew: boolean = false;
        // Increase character's breast size, if they are HH or bigger
        // do not increase size, but do the other actions:
        if (((this.tainted && character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating <= 11) || (!this.tainted && character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating <= 5)) && changes < changeLimit && (randInt(3) === 0 || this.enhanced)) {
            if (randInt(2) === 0) DisplayText("\n\nYour " + Desc.Breast.describeBreastRow(character.torso.chest.get(0)) + " tingle for a moment before becoming larger.");
            else DisplayText("\n\nYou feel a little weight added to your chest as your " + Desc.Breast.describeBreastRow(character.torso.chest.get(0)) + " seem to inflate and settle in a larger size.");
            Mod.Breast.growTopBreastRow(character, 1 + randInt(3), 1, false);
            changes++;
            character.stats.sens += .5;
            boobsGrew = true;
        }
        // -Remove feathery hair (copy for equinum, canine peppers, Labova)
        if (changes < changeLimit && character.torso.neck.head.hair.type === 1 && randInt(4) === 0) {
            // (long):
            if (character.torso.neck.head.hair.length >= 6) DisplayText("\n\nA lock of your downy-soft feather-hair droops over your eye.  Before you can blow the offending down away, you realize the feather is collapsing in on itself.  It continues to curl inward until all that remains is a normal stUtils.Utils.rand( of hair.  <b>Your hair is no longer feathery!</b>");
            // (short)
            else DisplayText("\n\nYou run your fingers through your downy-soft feather-hair while you await the effects of the item you just ingested.  While your hand is up there, it detects a change in the texture of your feathers.  They're completely disappearing, merging down into stUtils.Utils.rand(s of regular hair.  <b>Your hair is no longer feathery!</b>");
            changes++;
            character.torso.neck.head.hair.type = 0;
        }
        // If breasts are D or bigger and are not lactating, they also start lactating:
        if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 4 && character.torso.chest.get(0).lactationMultiplier < 1 && changes < changeLimit && (randInt(3) === 0 || boobsGrew || this.enhanced)) {
            DisplayText("\n\nYou gasp as your " + Desc.Breast.describeBreastRow(character.torso.chest.get(0)) + " feel like they are filling up with something.  Within moments, a drop of milk leaks from your " + Desc.Breast.describeBreastRow(character.torso.chest.get(0)) + "; <b> you are now lactating</b>.");
            character.torso.chest.get(0).lactationMultiplier = 1.25;
            changes++;
            character.stats.sens += .5;
        }
        // Quad nipples and other 'special enhanced things.
        if (this.enhanced) {
            // QUAD DAMAGE!
            if (character.torso.chest.get(0).nipples.count === 1) {
                changes++;
                character.torso.chest.get(0).nipples.count = 4;
                DisplayText("\n\nYour " + Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + "s tingle and itch.  You pull back your " + character.inventory.equipment.armor.displayName + " and watch in shock as they split into four distinct nipples!  <b>You now have four nipples on each side of your chest!</b>");
                if (character.torso.chest.count >= 2 && character.torso.chest.get(1).nipples.count === 1) {
                    DisplayText("A moment later your second row of " + Desc.Breast.describeBreastRow(character.torso.chest.get(1)) + " does the same.  <b>You have sixteen nipples now!</b>");
                    character.torso.chest.get(1).nipples.count = 4;
                }
                if (character.torso.chest.count >= 3 && character.torso.chest.get(2).nipples.count === 1) {
                    DisplayText("Finally, your ");
                    if (character.torso.chest.count === 3) DisplayText("third row of " + Desc.Breast.describeBreastRow(character.torso.chest.get(2)) + " mutates along with its sisters, sprouting into a wonderland of nipples.");
                    else if (character.torso.chest.count >= 4) {
                        DisplayText("everything from the third row down mutates, sprouting into a wonderland of nipples.");
                        character.torso.chest.get(3).nipples.count = 4;
                        if (character.torso.chest.count >= 5) character.torso.chest.get(4).nipples.count = 4;
                        if (character.torso.chest.count >= 6) character.torso.chest.get(5).nipples.count = 4;
                        if (character.torso.chest.count >= 7) character.torso.chest.get(6).nipples.count = 4;
                        if (character.torso.chest.count >= 8) character.torso.chest.get(7).nipples.count = 4;
                        if (character.torso.chest.count >= 9) character.torso.chest.get(8).nipples.count = 4;
                    }
                    character.torso.chest.get(2).nipples.count = 4;
                    DisplayText("  <b>You have a total of " + numToCardinalText(character.torso.chest.countNipples()) + " nipples.</b>");
                }
            }
            // QUAD DAMAGE IF WEIRD SHIT BROKE BEFORE
            else if (character.torso.chest.count > 1 && character.torso.chest.get(1).nipples.count === 1) {
                if (character.torso.chest.get(1).nipples.count === 1) {
                    DisplayText("\n\nYour second row of " + Desc.Breast.describeBreastRow(character.torso.chest.get(1)) + " tingle and itch.  You pull back your " + character.inventory.equipment.armor.displayName + " and watch in shock as your " + Desc.Breast.describeNipple(character, character.torso.chest.get(1)) + " split into four distinct nipples!  <b>You now have four nipples on each breast in your second row of breasts</b>.");
                    character.torso.chest.get(1).nipples.count = 4;
                }
            }
            else if (character.torso.chest.count > 2 && character.torso.chest.get(2).nipples.count === 1) {
                if (character.torso.chest.get(2).nipples.count === 1) {
                    DisplayText("\n\nYour third row of " + Desc.Breast.describeBreastRow(character.torso.chest.get(2)) + " tingle and itch.  You pull back your " + character.inventory.equipment.armor.displayName + " and watch in shock as your " + Desc.Breast.describeNipple(character, character.torso.chest.get(2)) + " split into four distinct nipples!  <b>You now have four nipples on each breast in your third row of breasts</b>.");
                    character.torso.chest.get(2).nipples.count = 4;
                }
            }
            else if (character.torso.chest.count > 3 && character.torso.chest.get(3).nipples.count === 1) {
                if (character.torso.chest.get(3).nipples.count === 1) {
                    DisplayText("\n\nYour fourth row of " + Desc.Breast.describeBreastRow(character.torso.chest.get(3)) + " tingle and itch.  You pull back your " + character.inventory.equipment.armor.displayName + " and watch in shock as your " + Desc.Breast.describeNipple(character, character.torso.chest.get(3)) + " split into four distinct nipples!  <b>You now have four nipples on each breast in your fourth row of breasts</b>.");
                    character.torso.chest.get(3).nipples.count = 4;
                }
            }
            else if (character.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier > 1) {
                if (randInt(2) === 0) DisplayText("\n\nA wave of pleasure passes through your chest as your " + Desc.Breast.describeBreastRow(character.torso.chest.get(0)) + " start leaking milk from a massive jump in production.");
                else DisplayText("\n\nSomething shifts inside your " + Desc.Breast.describeBreastRow(character.torso.chest.get(0)) + " and they feel MUCH fuller and riper.  You know that you've started producing much more milk.");
                Mod.Breast.boostLactation(character, 2.5);
                if ((character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].nipples.length < 1.5 && this.tainted) || (!this.tainted && character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].nipples.length < 1)) {
                    DisplayText("  Your " + Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + "s swell up, growing larger to accommodate your increased milk flow.");
                    character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].nipples.length += .25;
                    character.stats.sens += .5;
                }
                changes++;
            }
        }
        // If breasts are already lactating and the character is not lactating beyond a reasonable level, they start lactating more:
        else {
            if (this.tainted && character.torso.chest.get(0).lactationMultiplier > 1 && character.torso.chest.get(0).lactationMultiplier < 5 && changes < changeLimit && (randInt(3) === 0 || this.enhanced)) {
                if (randInt(2) === 0) DisplayText("\n\nA wave of pleasure passes through your chest as your " + Desc.Breast.describeBreastRow(character.torso.chest.get(0)) + " start producing more milk.");
                else DisplayText("\n\nSomething shifts inside your " + Desc.Breast.describeBreastRow(character.torso.chest.get(0)) + " and they feel fuller and riper.  You know that you've started producing more milk.");
                Mod.Breast.boostLactation(character, 0.75);
                if ((character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].nipples.length < 1.5 && this.tainted) || (!this.tainted && character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].nipples.length < 1)) {
                    DisplayText("  Your " + Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + "s swell up, growing larger to accommodate your increased milk flow.");
                    character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].nipples.length += .25;
                    character.stats.sens += .5;
                }
                changes++;
            }
            if (!this.tainted) {
                if (character.torso.chest.get(0).lactationMultiplier > 1 && character.torso.chest.get(0).lactationMultiplier < 3.2 && changes < changeLimit && randInt(3) === 0) {
                    if (randInt(2) === 0) DisplayText("\n\nA wave of pleasure passes through your chest as your " + Desc.Breast.describeBreastRow(character.torso.chest.get(0)) + " start producing more milk.");
                    else DisplayText("\n\nSomething shifts inside your " + Desc.Breast.describeBreastRow(character.torso.chest.get(0)) + " and they feel fuller and riper.  You know that you've started producing more milk.");
                    Mod.Breast.boostLactation(character, 0.75);
                    if ((character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].nipples.length < 1.5 && this.tainted) || (!this.tainted && character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].nipples.length < 1)) {
                        DisplayText("  Your " + Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + "s swell up, growing larger to accommodate your increased milk flow.");
                        character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].nipples.length += .25;
                        character.stats.sens += .5;
                    }
                    changes++;
                }
                if ((character.torso.chest.get(0).lactationMultiplier > 2 && character.statusAffects.has(StatusAffectType.Feeder)) || character.torso.chest.get(0).lactationMultiplier > 5) {
                    if (randInt(2) === 0) DisplayText("\n\nYour breasts suddenly feel less full, it seems you aren't lactating at quite the level you were.");
                    else DisplayText("\n\nThe insides of your breasts suddenly feel bloated.  There is a spray of milk from them, and they settle closer to a more natural level of lactation.");
                    changes++;
                    character.stats.sens += .5;
                    Mod.Breast.boostLactation(character, -1);
                }
            }
        }
        // If breasts are lactating at a fair level
        // and the character has not received this status,
        // apply an effect where the character really wants
        // to give their milk to other creatures
        // (capable of getting them addicted):
        if (!character.statusAffects.has(StatusAffectType.Feeder) && character.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier >= 3 && randInt(2) === 0 && character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 5 && character.stats.cor >= 35) {
            DisplayText("\n\nYou start to feel a strange desire to give your milk to other creatures.  For some reason, you know it will be very satisfying.\n\n<b>(You have gained the 'Feeder' perk!)</b>");
            character.statusAffects.add(StatusAffectType.Feeder, 0, 0, 0, 0);
            character.perks.add(PerkType.Feeder, 0, 0, 0, 0);
            changes++;
        }
        // UNFINISHED
        // If character has addictive quality and drinks pure version, removes addictive quality.
        // if the character has a vagina and it is tight, it loosens.
        if (character.torso.vaginas.count > 0) {
            if (character.torso.vaginas.get(0).looseness < VaginaLooseness.LOOSE && changes < changeLimit && randInt(2) === 0) {
                DisplayText("\n\nYou feel a relaxing sensation in your groin.  On further inspection you discover your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " has somehow relaxed, permanently loosening.");
                character.torso.vaginas.get(0).looseness++;
                // Cunt Stretched used to determine how long since last enlargement
                if (!character.statusAffects.has(StatusAffectType.CuntStretched))
                    character.statusAffects.add(StatusAffectType.CuntStretched, 0, 0, 0, 0);
                // Reset the timer on it to 0 when restretched.
                else
                    character.statusAffects.get(StatusAffectType.CuntStretched).value1 = 0;
                character.torso.vaginas.get(0).looseness++;
                changes++;
                character.stats.lust += 10;
            }
        }
        // General Appearance (Tail -> Ears -> Paws(fur stripper) -> Face -> Horns
        // Give the character a bovine tail, same as the minotaur
        if (this.tainted && !character.torso.tails.reduce(Tail.HasType(TailType.COW), false) && changes < changeLimit && randInt(3) === 0) {
            if (character.torso.tails.count === 0) DisplayText("\n\nYou feel the flesh above your " + Desc.Butt.describeButt(character) + " knotting and growing.  It twists and writhes around itself before flopping straight down, now shaped into a distinctly bovine form.  You have a <b>cow tail</b>.");
            else {
                if (character.torso.tails.count > 0) {
                    DisplayText("\n\nYour tail bunches uncomfortably, twisting and writhing around itself before flopping straight down, now shaped into a distinctly bovine form.  You have a <b>cow tail</b>.");
                }
                // insect
                if (character.torso.tails.reduce(Tail.HasType(TailType.SPIDER_ABDOMEN), false) || character.torso.tails.reduce(Tail.HasType(TailType.BEE_ABDOMEN), false)) {
                    DisplayText("\n\nYour insect-like abdomen tingles pleasantly as it begins shrinking and softening, chitin morphing and reshaping until it looks exactly like a <b>cow tail</b>.");
                }
            }
            character.torso.tails.clear();
            const newTail = new Tail();
            newTail.type = TailType.COW;
            character.torso.tails.add(newTail);
            changes++;
        }
        // Give the character bovine ears, same as the minotaur
        if (this.tainted && character.torso.neck.head.ears.type !== EarType.COW && changes < changeLimit && randInt(4) === 0 && character.torso.tails.reduce(Tail.HasType(TailType.COW), false)) {
            DisplayText("\n\nYou feel your ears tug on your scalp as they twist shape, becoming oblong and cow-like.  <b>You now have cow ears.</b>");
            character.torso.neck.head.ears.type = EarType.COW;
            changes++;
        }
        // If the character is under 7 feet in height, increase their height, similar to the minotaur
        if (((this.enhanced && character.tallness < 96) || character.tallness < 84) && changes < changeLimit && randInt(2) === 0) {
            let heightGain = randInt(5) + 3;
            // Slow rate of growth near ceiling
            if (character.tallness > 74) heightGain = Math.floor(heightGain / 2);
            // Never 0
            if (heightGain === 0) heightGain = 1;
            // Flavor texts.  Flavored like 1950's cigarettes. Yum.
            if (heightGain < 5) DisplayText("\n\nYou shift uncomfortably as you realize you feel off balance.  Gazing down, you realize you have grown SLIGHTLY taller.");
            if (heightGain >= 5 && heightGain < 7) DisplayText("\n\nYou feel dizzy and slightly off, but quickly realize it's due to a sudden increase in height.");
            if (heightGain === 7) DisplayText("\n\nStaggering forwards, you clutch at your head dizzily.  You spend a moment getting your balance, and stand up, feeling noticeably taller.");
            character.tallness += heightGain;
            changes++;
        }
        // Give the character hoofs, if the character already has hoofs STRIP FUR
        if (this.tainted && character.torso.hips.legs.type !== LegType.HOOFED && character.torso.neck.head.ears.type === EarType.COW) {
            if (changes < changeLimit && randInt(3) === 0) {
                changes++;
                if (character.torso.hips.legs.type === LegType.HUMAN) DisplayText("\n\nYou stagger as your feet change, curling up into painful angry lumps of flesh.  They get tighter and tighter, harder and harder, until at last they solidify into hooves!");
                if (character.torso.hips.legs.type === LegType.DOG) DisplayText("\n\nYou stagger as your paws change, curling up into painful angry lumps of flesh.  They get tighter and tighter, harder and harder, until at last they solidify into hooves!");
                if (character.torso.hips.legs.type === LegType.NAGA) DisplayText("\n\nYou collapse as your sinuous snake-tail tears in half, shifting into legs.  The pain is immense, particularly in your new feet as they curl inward and transform into hooves!");
                // Catch-all
                if (character.torso.hips.legs.type > LegType.NAGA) DisplayText("\n\nYou stagger as your " + Desc.Leg.describeFeet(character) + " change, curling up into painful angry lumps of flesh.  They get tighter and tighter, harder and harder, until at last they solidify into hooves!");
                DisplayText("  A coat of beastial fur springs up below your waist, itching as it fills in.<b>  You now have hooves in place of your feet!</b>");
                character.torso.hips.legs.type = LegType.HOOFED;
                character.stats.cor += 0;
                changes++;
            }
        }
        // If the character's face is non-human, they gain a human face
        if (!this.enhanced && character.torso.hips.legs.type === LegType.HOOFED && character.torso.neck.head.face.type !== FaceType.HUMAN && changes < changeLimit && randInt(4) === 0) {
            // Remove face before fur!
            DisplayText("\n\nYour visage twists painfully, returning to a normal human shape.  <b>Your face is human again!</b>");
            character.torso.neck.head.face.type = FaceType.HUMAN;
            changes++;
        }
        // enhanced get shitty fur
        if (this.enhanced && (character.skin.desc !== "fur" || character.torso.neck.head.hair.color !== "black and white spotted")) {
            if (character.skin.desc !== "fur") DisplayText("\n\nYour " + character.skin.desc + " itches intensely.  You scratch and scratch, but it doesn't bring any relief.  Fur erupts between your fingers, and you watch open-mouthed as it fills in over your whole body.  The fur is patterned in black and white, like that of a cow.  The color of it even spreads to your hair!  <b>You have cow fur!</b>");
            else DisplayText("\n\nA ripple spreads through your fur as some patches darken and others lighten.  After a few moments you're left with a black and white spotted pattern that goes the whole way up to the hair on your head!  <b>You've got cow fur!</b>");
            character.skin.desc = "fur";
            character.skin.adj = "";
            character.skin.type = SkinType.FUR;
            character.torso.neck.head.hair.color = "black and white spotted";

        }
        // if enhanced to probova give a shitty cow face
        else if (this.enhanced && character.torso.neck.head.face.type !== FaceType.COW_MINOTAUR) {
            DisplayText("\n\nYour visage twists painfully, warping and crackling as your bones are molded into a new shape.  Once it finishes, you reach up to touch it, and you discover that <b>your face is like that of a cow!</b>");
            character.torso.neck.head.face.type = FaceType.COW_MINOTAUR;
            changes++;
        }
        // Give the character bovine horns, or increase their size, same as the minotaur
        // New horns.amount or expanding mino horns
        if (this.tainted && changes < changeLimit && randInt(3) === 0 && character.torso.neck.head.face.type === FaceType.HUMAN) {
            // Get bigger or change horns
            if (character.torso.neck.head.horns.type === HornType.COW_MINOTAUR || character.torso.neck.head.horns.type === HornType.NONE) {
                // Get bigger if character has horns
                if (character.torso.neck.head.horns.type === HornType.COW_MINOTAUR) {
                    if (character.torso.neck.head.horns.amount < 5) {
                        // Fems horns.amount don't get bigger.
                        DisplayText("\n\nYour small horns.amount get a bit bigger, stopping as medium sized nubs.");
                        character.torso.neck.head.horns.amount += 1 + randInt(2);
                        changes++;
                    }
                }
                // If no horns.amount yet..
                if (character.torso.neck.head.horns.type === HornType.NONE || character.torso.neck.head.horns.amount === 0) {
                    DisplayText("\n\nWith painful pressure, the skin on your forehead splits around two tiny nub-like horns, similar to those you would see on the cattle back in your homeland.");
                    character.torso.neck.head.horns.type = HornType.COW_MINOTAUR;
                    character.torso.neck.head.horns.amount = 1;
                    changes++;
                }
                /* Never reached
                //TF other horns
                if (character.torso.neck.head.horns.type != HornType.NONE && character.torso.neck.head.horns.type != HornType.COW_MINOTAUR && character.torso.neck.head.horns.amount > 0) {
                    DisplayText("\n\nYour horns.amount twist, filling your skull with agonizing pain for a moment as they transform into cow-horns.");
                    character.torso.neck.head.horns.type = HornType.COW_MINOTAUR;
                }*/
            }
            // Not mino horns, change to cow-horns
            if (character.torso.neck.head.horns.type === HornType.DEMON || character.torso.neck.head.horns.type > HornType.COW_MINOTAUR) {
                DisplayText("\n\nYour horns.amount vibrate and shift as if made of clay, reforming into two small bovine nubs.");
                character.torso.neck.head.horns.type = HornType.COW_MINOTAUR;
                character.torso.neck.head.horns.amount = 2;
                changes++;
            }
        }
        // Increase the size of the character's hips, if they are not already childbearing or larger
        if (randInt(2) === 0 && character.torso.hips.rating < 15 && changes < changeLimit) {
            if (!this.tainted && character.torso.hips.rating < 8 || this.tainted) {
                DisplayText("\n\nYou stumble as you feel the bones in your hips grinding, expanding your hips noticeably.");
                character.torso.hips.rating += 1 + randInt(4);
                changes++;
            }
        }
        if (randInt(4) === 0 && character.torso.neck.gills && changes < changeLimit) {
            DisplayText("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.");
            character.torso.neck.gills = false;
            changes++;
        }
        // Increase the size of the character's ass (less likely then hips), if it is not already somewhat big
        if (randInt(2) === 0 && character.torso.butt.rating < 13 && changes < changeLimit) {
            if (!this.tainted && character.torso.butt.rating < 8 || this.tainted) {
                DisplayText("\n\nA sensation of being unbalanced makes it difficult to walk.  You pause, paying careful attention to your new center of gravity before understanding dawns on you - your ass has grown!");
                character.torso.butt.rating += 1 + randInt(2);
                changes++;
            }
        }
        // Nipples Turn Back:
        if (character.statusAffects.has(StatusAffectType.BlackNipples) && changes < changeLimit && randInt(3) === 0) {
            DisplayText("\n\nSomething invisible brushes against your " + Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + ", making you twitch.  Undoing your clothes, you take a look at your chest and find that your nipples have turned back to their natural flesh colour.");
            changes++;
            character.statusAffects.remove(StatusAffectType.BlackNipples);
        }
        // Debugcunt
        if (changes < changeLimit && randInt(3) === 0 && character.torso.vaginas.get(0).type === 5 && character.torso.vaginas.count > 0) {
            DisplayText("\n\nSomething invisible brushes against your sex, making you twinge.  Undoing your clothes, you take a look at your vagina and find that it has turned back to its natural flesh colour.");
            character.torso.vaginas.get(0).type = 0;
            changes++;
        }
        if (randInt(3) === 0) DisplayText(Mod.Body.displayModFem(character, 79, 3));
        if (randInt(3) === 0) DisplayText(Mod.Body.displayModThickness(character, 70, 4));
        if (randInt(5) === 0) DisplayText(Mod.Body.displayModTone(character, 10, 5));
    }
}
