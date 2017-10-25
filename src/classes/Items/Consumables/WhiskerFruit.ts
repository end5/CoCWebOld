import Consumable from './Consumable';
import BreastRow from '../../Body/BreastRow';
import Cock, { CockType } from '../../Body/Cock';
import { SkinType } from '../../Body/Creature';
import { FaceType } from '../../Body/Face';
import { EarType } from '../../Body/Head';
import { LowerBodyType, TailType } from '../../Body/LowerBody';
import BreastDescriptor from '../../Descriptors/BreastDescriptor';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import HeadDescriptor from '../../Descriptors/HeadDescriptor';
import LowerBodyDescriptor from '../../Descriptors/LowerBodyDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import CreatureChange from '../../display/CreatureChange';
import MainScreen from '../../display/MainScreen';
import Flags, { FlagEnum } from '../../Game/Flags';
import Player from '../../Player';
import Utils from '../../Utilities/Utils';

export default class WhiskerFruit extends Consumable {
    public constructor() {
        super("W.Fruit", "W.Fruit", "a piece of whisker-fruit", WhiskerFruit.DefaultValue, "This small, peach-sized fruit has tiny whisker-like protrusions growing from the sides.");
    }

    public use(player: Player) {
        let changes: number = 0;
        let changeLimit: number = 1;
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
                player.stats.spe += 2;
            }
            //medium speed
            else if (player.stats.spe <= 60) {
                MainScreen.text("\n\nYou stumble as you shift position, surprised by how quickly you move. After a moment or two of disorientation, you adjust. You're certain that you can run faster now.", false);
                player.stats.spe += 1;
            }
            //high speed
            else {
                MainScreen.text("\n\nYou pause mid-step and crouch. Your leg muscles have cramped up like crazy. After a few moments, the pain passes and you feel like you could chase anything down.", false);
                player.stats.spe += .5;
            }
            changes++;
        }
        //Strength raises to 40
        if (player.stats.str < 40 && Utils.rand(3) == 0 && changes < changeLimit) {
            if (Utils.rand(2) == 0) MainScreen.text("\n\nYour muscles feel taut, like a coiled spring, and a bit more on edge.", false);
            else MainScreen.text("\n\nYou arch your back as your muscles clench painfully.  The cramp passes swiftly, leaving you feeling like you've gotten a bit stronger.", false);
            player.stats.str += 1;
            changes++;
        }
        //Strength ALWAYS drops if over 60
        //Does not add to change total
        else if (player.stats.str > 60 && Utils.rand(2) == 0) {
            MainScreen.text("\n\nShivers run from your head to your toes, leaving you feeling weak.  Looking yourself over, your muscles seemed to have lost some bulk.", false);
            player.stats.str += -2;
        }
        //Toughness drops if over 50
        //Does not add to change total
        if (player.stats.tou > 50 && Utils.rand(2) == 0) {
            MainScreen.text("\n\nYour body seems to compress momentarily, becoming leaner and noticeably less tough.", false);
            player.stats.tou += -2;
        }
        //Intelliloss
        if (Utils.rand(4) == 0 && changes < changeLimit) {
            //low intelligence
            if (player.stats.int < 15) MainScreen.text("\n\nYou feel like something is slipping away from you but can't figure out exactly what's happening.  You scrunch up your " + FaceDescriptor.describeFace(player) + ", trying to understand the situation.  Before you can reach any kind of conclusion, something glitters in the distance, distracting your feeble mind long enough for you to forget the problem entirely.", false);
            //medium intelligence
            else if (player.stats.int < 50) {
                MainScreen.text("\n\nYour mind feels somewhat sluggish, and you wonder if you should just lie down ", false);
                if (Utils.rand(2) == 0) {
                    MainScreen.text("somewhere and ", false);
                    const chance: number = Utils.rand(3);
                    if (chance == 0) MainScreen.text("toss a ball around or something", false);
                    else if (chance == 1) MainScreen.text("play with some yarn", false);
                    else if (chance == 2) MainScreen.text("take a nap and stop worrying", false);
                }
                else MainScreen.text("in the sun and let your troubles slip away", false);
                MainScreen.text(".", false);
            }
            //High intelligence
            else MainScreen.text("\n\nYou start to feel a bit dizzy, but the sensation quickly passes.  Thinking hard on it, you mentally brush away the fuzziness that seems to permeate your brain and determine that this fruit may have actually made you dumber.  It would be best not to eat too much of it.", false);
            player.stats.int += -1;
            changes++;
        }
        //Libido gain
        if (player.stats.lib < 80 && changes < changeLimit && Utils.rand(4) == 0) {
            //Cat dicked folks
            if (player.lowerBody.cockSpot.countType(CockType.CAT) > 0) {
                const catCock: Cock = player.lowerBody.cockSpot.listCockType(CockType.CAT)[0];
                MainScreen.text("\n\nYou feel your " + CockDescriptor.describeCock(player, catCock) + " growing hard, the barbs becoming more sensitive. You gently run your hands down them and imagine the feeling of raking the insides of a cunt as you pull.  The fantasy continues, and after ejaculating and hearing the female yowl with pleasure, you shake your head and try to drive off the image.  ", false);
                if (player.stats.cor < 33) MainScreen.text("You need to control yourself better.", false);
                else if (player.stats.cor < 66) MainScreen.text("You're not sure how you feel about the fantasy.", false);
                else MainScreen.text("You hope to find a willing partner to make this a reality.", false);
            }
            //Else �
            else {
                MainScreen.text("\n\nA rush of tingling warmth spreads through your body as it digests the fruit.  You can feel your blood pumping through your extremities, making them feel sensitive and surprisingly sensual.  It's going to be hard to resist getting ", false);
                if (player.stats.lust > 60) MainScreen.text("even more ", false);
                MainScreen.text("turned on.", false);
            }
            player.stats.lib += 1;
            player.stats.sens += .25;
            changes++;
        }

        //Sexual changes would go here if I wasn't a tard.
        //Heat
        if (Utils.rand(4) == 0 && changes < changeLimit) {
            let intensified: boolean = player.inHeat;

            if (player.goIntoHeat()) {
                if (intensified) {
                    if (Utils.rand(2) == 0) MainScreen.text("\n\nThe itch inside your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " is growing stronger, and you desperately want to find a nice cock to massage the inside.", false);
                    else MainScreen.text("\n\nThe need inside your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " grows even stronger.  You desperately need to find a mate to 'scratch your itch' and fill your womb with kittens.  It's difficult NOT to think about a cock slipping inside your moist fuck-tunnel, and at this point you'll have a hard time resisting ANY male who approaches.", false);
                }
                else {
                    MainScreen.text("\n\nThe interior of your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " clenches tightly, squeezing with reflexive, aching need.  Your skin flushes hot ", false);
                    if (player.skinType == SkinType.FUR) MainScreen.text("underneath your fur ", false);
                    MainScreen.text("as images and fantasies ", false);
                    if (player.stats.cor < 50) MainScreen.text("assault ", false);
                    else MainScreen.text("fill ", false);
                    MainScreen.text(" your mind.  Lithe cat-boys with their perfect, spine-covered cocks line up behind you, and you bend over to present your needy pussy to them.  You tremble with the desire to feel the exotic texture of their soft barbs rubbing your inner walls, smearing your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " with their cum as you're impregnated.  Shivering, you recover from the fantasy and pull your fingers from your aroused sex.  <b>It would seem you've gone into heat!</b>", false);
                }
                changes++;
            }
        }

        //Shrink the boobalies down to A for men or C for girls.
        if (player.upperBody.chest.count() > 0 && changes < changeLimit && Utils.rand(4) == 0 && !Flags.list[FlagEnum.HYPER_HAPPY]) {
            let breastShrinkageThreshold: number = 0;
            let shrinkingHappened: boolean = false;
            //Determine if shrinkage is required
            if (!player.lowerBody.vaginaSpot.hasVagina() && player.upperBody.chest.BreastRatingLargest[0].breastRating > 2) breastShrinkageThreshold = 2;
            else if (player.upperBody.chest.BreastRatingLargest[0].breastRating > 4) breastShrinkageThreshold = 4;
            //IT IS!
            if (breastShrinkageThreshold > 0) {
                let selectedBreastRow: BreastRow;
                for (let index: number = 0; index < player.upperBody.chest.count(); index++) {
                    //If this row is over threshhold
                    selectedBreastRow = player.upperBody.chest.get(index);
                    if (selectedBreastRow.breastRating > breastShrinkageThreshold) {
                        //Big change
                        if (selectedBreastRow.breastRating > 10) {
                            selectedBreastRow.breastRating -= 2 + Utils.rand(3);
                            if (!shrinkingHappened) MainScreen.text("\n\nThe " + BreastDescriptor.describeBreastRow(selectedBreastRow) + " on your chest wobble for a second, then tighten up, losing several cup-sizes in the process!", false);
                            else MainScreen.text("  The change moves down to your " + Utils.numToOrdinalText(index + 1) + " row of " + BreastDescriptor.describeBreastRow(selectedBreastRow) + ". They shrink greatly, losing a couple cup-sizes.", false);
                        }
                        //Small change
                        else {
                            selectedBreastRow.breastRating -= 1;
                            if (!shrinkingHappened) MainScreen.text("\n\nAll at once, your sense of gravity shifts.  Your back feels a sense of relief, and it takes you a moment to realize your " + BreastDescriptor.describeBreastRow(selectedBreastRow) + " have shrunk!", false);
                            else MainScreen.text("  Your " + Utils.numToOrdinalText(index + 1) + " row of " + BreastDescriptor.describeBreastRow(selectedBreastRow) + " gives a tiny jiggle as it shrinks, losing some off its mass.", false);
                        }
                        //Increment changed rows
                        shrinkingHappened = true;
                    }
                }
            }
            //Count that tits were shrunk
            if (shrinkingHappened) changes++;
        }
        //Cat dangly-doo.
        if (player.lowerBody.cockSpot.count() > 0 && player.lowerBody.cockSpot.countType(CockType.CAT) < player.lowerBody.cockSpot.count() &&
            changes < changeLimit && Utils.rand(4) == 0) {
            //loop through and find a non-cat wang.
            let selectedCock: Cock;
            for (let index: number = 0; index < player.lowerBody.cockSpot.count(); index++) {
                selectedCock = player.lowerBody.cockSpot.get(index);
                if (selectedCock.cockType == CockType.CAT) {
                    MainScreen.text("\n\nYour " + CockDescriptor.describeCock(player, selectedCock) + " swells up with near-painful arousal and begins to transform.  It turns pink and begins to narrow until the tip is barely wide enough to accommodate your urethra.  Barbs begin to sprout from its flesh, if you can call the small, fleshy nubs barbs. They start out thick around the base of your " + CockDescriptor.nounCock(CockType.HUMAN) + " and shrink towards the tip. The smallest are barely visible. <b>Your new feline dong throbs powerfully</b> and spurts a few droplets of cum.  ", false);
                    if (!selectedCock.hasSheath()) {
                        MainScreen.text("Then, it begins to shrink and sucks itself inside your body.  Within a few moments, a fleshy sheath is formed.", false);
                        if (player.lowerBody.balls > 0) MainScreen.text("  Thankfully, your balls appear untouched.", false);
                    }
                    else MainScreen.text("Then, it disappears back into your sheath.", false);
                    selectedCock.cockType = CockType.CAT;
                    selectedCock.knotMultiplier = 1;
                }
            }
            changes++;
        }
        //Cat penorz shrink
        if (player.lowerBody.cockSpot.countType(CockType.CAT) > 0 && Utils.rand(3) == 0 && changes < changeLimit && !Flags.list[FlagEnum.HYPER_HAPPY]) {
            //loop through and find a cat wang.
            let selectedCock: Cock = null;
            let changedCock: number = 0;
            for (let index: number = 0; index < player.lowerBody.cockSpot.count(); index++) {
                selectedCock = player.lowerBody.cockSpot.get(index);
                if (selectedCock.cockType == CockType.CAT && selectedCock.cockLength > 6) {
                    //lose 33% size until under 10, then lose 2" at a time
                    if (selectedCock.cockLength > 16) {
                        if (changedCock == 0)
                            MainScreen.text("\n\nYour " + CockDescriptor.describeCock(player, selectedCock) + " tingles, making your sheath feel a little less tight.  It dwindles in size, losing a full third of its length and a bit of girth before the change finally stops.", false);
                        selectedCock.cockLength *= .66;
                        changedCock++;
                    }
                    else if (selectedCock.cockLength > 6) {
                        if (changedCock == 0)
                            MainScreen.text("\n\nYour " + CockDescriptor.describeCock(player, selectedCock) + " tingles and withdraws further into your sheath.  If you had to guess, you'd say you've lost about two inches of total length and perhaps some girth.", false);
                        selectedCock.cockLength -= 2;
                        changedCock++;
                    }
                    if (selectedCock.cockLength / 5 < selectedCock.cockThickness && selectedCock.cockThickness > 1.25)
                        selectedCock.cockThickness = selectedCock.cockLength / 6;
                }
            }
            //(big sensitivity boost)
            MainScreen.text("  Although the package is smaller, it feels even more sensitive � as if it retained all sensation of its larger size in its smaller form.", false);
            player.stats.sens += 5;
            //Make note of other dicks changing
            if (changedCock > 1) MainScreen.text("  Upon further inspection, all your " + CockDescriptor.nounCock(CockType.CAT) + "s have shrunk!", false);
            changes++;
        }

        //Body type changes.  Teh rarest of the rare.
        //DA EARZ
        if (player.upperBody.head.earType != EarType.CAT && Utils.rand(5) == 0 && changes < changeLimit) {
            //human to cat:
            if (player.upperBody.head.earType == EarType.HUMAN) {
                if (Utils.rand(2) == 0) MainScreen.text("\n\nThe skin on the sides of your face stretches painfully as your ears migrate upwards, towards the top of your head. They shift and elongate a little, fur growing on them as they become feline in nature. <b>You now have cat ears.</b>", false);
                else MainScreen.text("\n\nYour ears begin to tingle. You reach up with one hand and gently rub them. They appear to be growing fur. Within a few moments, they've migrated up to the top of your head and increased in size. The tingling stops and you find yourself hearing noises in a whole new way. <b>You now have cat ears.</b>", false);
            }
            //non human to cat:
            else {
                if (Utils.rand(2) == 0) MainScreen.text("\n\nYour ears change shape, morphing into pointed, feline ears!  They swivel about reflexively as you adjust to them.  <b>You now have cat ears.</b>", false);
                else MainScreen.text("\n\nYour ears tingle and begin to change shape. Within a few moments, they've become long and feline.  Thanks to the new fuzzy organs, you find yourself able to hear things that eluded your notice up until now. <b>You now have cat ears.</b>", false);
            }
            player.upperBody.head.earType = EarType.CAT;
            changes++;
        }
        //DA TailType (IF ALREADY HAZ URZ)
        if (player.lowerBody.tailType != TailType.CAT && player.upperBody.head.earType == EarType.CAT && Utils.rand(5) == 0 && changes < changeLimit) {
            if (player.lowerBody.tailType == TailType.NONE) {
                let chance: number = Utils.rand(3);
                if (chance == 0) MainScreen.text("\n\nA pressure builds in your backside. You feel under your " + player.inventory.armor.displayName + " and discover an odd bump that seems to be growing larger by the moment. In seconds it passes between your fingers, bursts out the back of your clothes and grows most of the way to the ground. A thick coat of fur springs up to cover your new tail. You instinctively keep adjusting it to improve your balance. <b>You now have a cat-tail.</b>", false);
                if (chance == 1) MainScreen.text("\n\nYou feel your backside shift and change, flesh molding and displacing into a long, flexible tail! <b>You now have a cat tail.</b>", false);
                if (chance == 2) MainScreen.text("\n\nYou feel an odd tingling in your spine and your tail bone starts to throb and then swell. Within a few moments it begins to grow, adding new bones to your spine. Before you know it, you have a tail. Just before you think it's over, the tail begins to sprout soft, glossy " + player.upperBody.head.hairColor + " fur. <b>You now have a cat tail.</b>", false);
            }
            else MainScreen.text("\n\nYou pause and tilt your head... something feels different.  Ah, that's what it is; you turn around and look down at your tail as it starts to change shape, narrowing and sprouting glossy fur. <b>You now have a cat tail.</b>", false);
            player.lowerBody.tailType = TailType.CAT;
            changes++;
        }
        //Da paws (if already haz ears & tail)
        if (player.lowerBody.tailType == TailType.CAT && player.upperBody.head.earType == EarType.CAT && Utils.rand(5) == 0 && changes < changeLimit && player.lowerBody.type != LowerBodyType.CAT) {
            //hoof to cat:
            if (player.lowerBody.type == LowerBodyType.HOOFED || player.lowerBody.type == LowerBodyType.CENTAUR) {
                MainScreen.text("\n\nYou feel your hooves suddenly splinter, growing into five unique digits. Their flesh softens as your hooves reshape into furred cat paws. <b>You now have cat paws.</b>", false);
                if (player.lowerBody.type == LowerBodyType.CENTAUR) MainScreen.text("  You feel woozy and collapse on your side.  When you wake, you're no longer a centaur and your body has returned to a humanoid shape.", false);
            }
            //Goo to cat
            else if (player.lowerBody.type == LowerBodyType.GOO) {
                MainScreen.text("\n\nYour lower body rushes inward, molding into two leg-like shapes that gradually stiffen up.  In moments they solidify into digitigrade legs, complete with soft, padded cat-paws.  <b>You now have cat-paws!</b>", false);
            }
            //non hoof to cat:
            else MainScreen.text("\n\nYou scream in agony as you feel the bones in your " + LowerBodyDescriptor.describeFeet(player) + " break and begin to rearrange. When the pain fades, you feel surprisingly well-balanced. <b>You now have cat paws.</b>", false);
            player.lowerBody.type = LowerBodyType.CAT;
            changes++;
        }
        //TURN INTO A FURRAH!  OH SHIT
        if (player.lowerBody.tailType == TailType.CAT &&
            player.upperBody.head.earType == EarType.CAT &&
            player.lowerBody.type == LowerBodyType.CAT &&
            player.skinType != SkinType.FUR &&
            Utils.rand(5) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYour " + player.skinDesc + " begins to tingle, then itch. You reach down to scratch your arm absent-mindedly and pull your fingers away to find stUtils.Utils.rands of " + player.upperBody.head.hairColor + " fur. Wait, fur?  What just happened?! You spend a moment examining yourself and discover that <b>you are now covered in glossy, soft fur.</b>\n\n", false);
            player.skinType = SkinType.FUR;
            player.skinDesc = "fur";
            changes++;
        }
        //CAT-FaceType!  FULL ON FURRY!  RAGE AWAY NEKOZ
        if (player.lowerBody.tailType == TailType.CAT &&
            player.upperBody.head.earType == EarType.CAT &&
            player.lowerBody.type == LowerBodyType.CAT &&
            player.skinType == SkinType.FUR &&
            player.upperBody.head.face.faceType != FaceType.CAT &&
            Utils.rand(5) == 0 &&
            changes < changeLimit) {
            //Gain cat face, replace old face
            let chance: number = Utils.rand(3);
            if (chance == 0) MainScreen.text("\n\nYour face is wracked with pain. You throw back your head and scream in agony as you feel your cheekbones breaking and shifting, reforming into something... different. You find a puddle to view your reflection and discover <b>your face is now a cross between human and feline features.</b>", false);
            else if (chance == 1) MainScreen.text("\n\nMind-numbing pain courses through you as you feel your facial bones rearranging.  You clutch at your face in agony as your skin crawls and shifts, your visage reshaping to replace your facial playeristics with those of a feline. <b>You now have an anthropomorphic cat-face.</b>", false);
            else MainScreen.text("\n\nYour face is wracked with pain. You throw back your head and scream in agony as you feel your cheekbones breaking and shifting, reforming into something else. <b>Your facial features rearrange to take on many feline aspects.</b>", false);
            player.upperBody.head.face.faceType = FaceType.CAT;
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
            CreatureChange.HPChange(player, 50);
            player.stats.lust += 3;
        }
        if (changes < changeLimit) {
            if (Utils.rand(2) == 0) MainScreen.text(player.modThickness(5, 2), false);
            if (Utils.rand(2) == 0) MainScreen.text(player.modTone(76, 2), false);
            if (player.gender < 2) if (Utils.rand(2) == 0) MainScreen.text(player.modFem(65, 1), false);
            else MainScreen.text(player.modFem(85, 2), false);
        }
    }
}