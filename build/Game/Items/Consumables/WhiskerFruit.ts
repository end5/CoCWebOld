import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import DisplayText from '../../../Engine/display/DisplayText';
import { randInt } from '../../../Engine/Utilities/SMath';
import BreastRow from '../../Body/BreastRow';
import Cock, { CockType } from '../../Body/Cock';
import { EarType } from '../../Body/Ears';
import { FaceType } from '../../Body/Face';
import { LegType } from '../../Body/Legs';
import { SkinType } from '../../Body/Skin';
import Tail, { TailType } from '../../Body/Tail';
import Character from '../../Character/Character';
import * as BreastDescriptor from '../../Descriptors/BreastDescriptor';
import * as CockDescriptor from '../../Descriptors/CockDescriptor';
import * as FaceDescriptor from '../../Descriptors/FaceDescriptor';
import * as LegDescriptor from '../../Descriptors/LegDescriptor';
import * as VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import { PerkType } from '../../Effects/PerkType';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import * as BodyModifier from '../../Modifiers/BodyModifier';
import * as StatModifier from '../../Modifiers/StatModifier';
import User from '../../User';
import { numToOrdinalText } from '../../Utilities/NumToText';
import ItemDesc from '../ItemDesc';

export default class WhiskerFruit extends Consumable {
    public constructor() {
        super(ConsumableName.WhiskerFruit, new ItemDesc("W.Fruit", "a piece of whisker-fruit", "This small, peach-sized fruit has tiny whisker-like protrusions growing from the sides."));
    }

    public use(character: Character) {
        let changes: number = 0;
        let changeLimit: number = 1;
        if (randInt(2) === 0) changeLimit++;
        if (randInt(2) === 0) changeLimit++;
        if (randInt(3) === 0) changeLimit++;
        if (character.perks.has(PerkType.HistoryAlchemist)) changeLimit++;
        // Text go!
        DisplayText().clear();
        DisplayText("You take a bite of the fruit and gulp it down. It's thick and juicy and has an almost overpowering sweetness. Nevertheless, it is delicious and you certainly could use a meal.  You devour the fruit, stopping only when the hard, nubby pit is left; which you toss aside.");
        // Speed raises up to 75
        if (character.stats.spe < 75 && randInt(3) === 0 && changes < changeLimit) {
            // low speed
            if (character.stats.spe <= 30) {
                DisplayText("\n\nYou feel... more balanced, sure of step. You're certain that you've become just a little bit faster.");
                character.stats.spe += 2;
            }
            // medium speed
            else if (character.stats.spe <= 60) {
                DisplayText("\n\nYou stumble as you shift position, surprised by how quickly you move. After a moment or two of disorientation, you adjust. You're certain that you can run faster now.");
                character.stats.spe += 1;
            }
            // high speed
            else {
                DisplayText("\n\nYou pause mid-step and crouch. Your leg muscles have cramped up like crazy. After a few moments, the pain passes and you feel like you could chase anything down.");
                character.stats.spe += .5;
            }
            changes++;
        }
        // Strength raises to 40
        if (character.stats.str < 40 && randInt(3) === 0 && changes < changeLimit) {
            if (randInt(2) === 0) DisplayText("\n\nYour muscles feel taut, like a coiled spring, and a bit more on edge.");
            else DisplayText("\n\nYou arch your back as your muscles clench painfully.  The cramp passes swiftly, leaving you feeling like you've gotten a bit stronger.");
            character.stats.str += 1;
            changes++;
        }
        // Strength ALWAYS drops if over 60
        // Does not add to change total
        else if (character.stats.str > 60 && randInt(2) === 0) {
            DisplayText("\n\nShivers run from your head to your toes, leaving you feeling weak.  Looking yourself over, your muscles seemed to have lost some bulk.");
            character.stats.str += -2;
        }
        // Toughness drops if over 50
        // Does not add to change total
        if (character.stats.tou > 50 && randInt(2) === 0) {
            DisplayText("\n\nYour body seems to compress momentarily, becoming leaner and noticeably less tough.");
            character.stats.tou += -2;
        }
        // Intelliloss
        if (randInt(4) === 0 && changes < changeLimit) {
            // low intelligence
            if (character.stats.int < 15) DisplayText("\n\nYou feel like something is slipping away from you but can't figure out exactly what's happening.  You scrunch up your " + FaceDescriptor.describeFace(character) + ", trying to understand the situation.  Before you can reach any kind of conclusion, something glitters in the distance, distracting your feeble mind long enough for you to forget the problem entirely.");
            // medium intelligence
            else if (character.stats.int < 50) {
                DisplayText("\n\nYour mind feels somewhat sluggish, and you wonder if you should just lie down ");
                if (randInt(2) === 0) {
                    DisplayText("somewhere and ");
                    const chance: number = randInt(3);
                    if (chance === 0) DisplayText("toss a ball around or something");
                    else if (chance === 1) DisplayText("play with some yarn");
                    else if (chance === 2) DisplayText("take a nap and stop worrying");
                }
                else DisplayText("in the sun and let your troubles slip away");
                DisplayText(".");
            }
            // High intelligence
            else DisplayText("\n\nYou start to feel a bit dizzy, but the sensation quickly passes.  Thinking hard on it, you mentally brush away the fuzziness that seems to permeate your brain and determine that this fruit may have actually made you dumber.  It would be best not to eat too much of it.");
            character.stats.int += -1;
            changes++;
        }
        // Libido gain
        if (character.stats.lib < 80 && changes < changeLimit && randInt(4) === 0) {
            // Cat dicked folks
            if (character.torso.cocks.filter(Cock.FilterType(CockType.CAT)).length > 0) {
                const catCock: Cock = character.torso.cocks.filter(Cock.FilterType(CockType.CAT))[0];
                DisplayText("\n\nYou feel your " + CockDescriptor.describeCock(character, catCock) + " growing hard, the barbs becoming more sensitive. You gently run your hands down them and imagine the feeling of raking the insides of a cunt as you pull.  The fantasy continues, and after ejaculating and hearing the female yowl with pleasure, you shake your head and try to drive off the image.  ");
                if (character.stats.cor < 33) DisplayText("You need to control yourself better.");
                else if (character.stats.cor < 66) DisplayText("You're not sure how you feel about the fantasy.");
                else DisplayText("You hope to find a willing partner to make this a reality.");
            }
            // Else �
            else {
                DisplayText("\n\nA rush of tingling warmth spreads through your body as it digests the fruit.  You can feel your blood pumping through your extremities, making them feel sensitive and surprisingly sensual.  It's going to be hard to resist getting ");
                if (character.stats.lust > 60) DisplayText("even more ");
                DisplayText("turned on.");
            }
            character.stats.lib += 1;
            character.stats.sens += .25;
            changes++;
        }

        // Sexual changes would go here if I wasn't a tard.
        // Heat
        if (randInt(4) === 0 && changes < changeLimit) {
            const intensified: boolean = character.statusAffects.has(StatusAffectType.Heat);

            if (character.torso.vaginas.count > 0) {
                if (intensified) {
                    if (randInt(2) === 0) DisplayText("\n\nThe itch inside your " + VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)) + " is growing stronger, and you desperately want to find a nice cock to massage the inside.");
                    else DisplayText("\n\nThe need inside your " + VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)) + " grows even stronger.  You desperately need to find a mate to 'scratch your itch' and fill your womb with kittens.  It's difficult NOT to think about a cock slipping inside your moist fuck-tunnel, and at this point you'll have a hard time resisting ANY male who approaches.");
                }
                else {
                    DisplayText("\n\nThe interior of your " + VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)) + " clenches tightly, squeezing with reflexive, aching need.  Your skin flushes hot ");
                    if (character.skin.type === SkinType.FUR) DisplayText("underneath your fur ");
                    DisplayText("as images and fantasies ");
                    if (character.stats.cor < 50) DisplayText("assault ");
                    else DisplayText("fill ");
                    DisplayText(" your mind.  Lithe cat-boys with their perfect, spine-covered cocks line up behind you, and you bend over to present your needy pussy to them.  You tremble with the desire to feel the exotic texture of their soft barbs rubbing your inner walls, smearing your " + VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)) + " with their cum as you're impregnated.  Shivering, you recover from the fantasy and pull your fingers from your aroused sex.  <b>It would seem you've gone into heat!</b>");
                }
                changes++;
            }
        }

        // Shrink the boobalies down to A for men or C for girls.
        if (character.torso.chest.count > 0 && changes < changeLimit && randInt(4) === 0 && !User.settings.hyperHappy) {
            let breastShrinkageThreshold: number = 0;
            let shrinkingHappened: boolean = false;
            // Determine if shrinkage is required
            if (character.torso.vaginas.count <= 0 && character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 2) breastShrinkageThreshold = 2;
            else if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 4) breastShrinkageThreshold = 4;
            // IT IS!
            if (breastShrinkageThreshold > 0) {
                let selectedBreastRow: BreastRow;
                for (let index: number = 0; index < character.torso.chest.count; index++) {
                    // If this row is over threshhold
                    selectedBreastRow = character.torso.chest.get(index);
                    if (selectedBreastRow.rating > breastShrinkageThreshold) {
                        // Big change
                        if (selectedBreastRow.rating > 10) {
                            selectedBreastRow.rating -= 2 + randInt(3);
                            if (!shrinkingHappened) DisplayText("\n\nThe " + BreastDescriptor.describeBreastRow(selectedBreastRow) + " on your chest wobble for a second, then tighten up, losing several cup-sizes in the process!");
                            else DisplayText("  The change moves down to your " + numToOrdinalText(index + 1) + " row of " + BreastDescriptor.describeBreastRow(selectedBreastRow) + ". They shrink greatly, losing a couple cup-sizes.");
                        }
                        // Small change
                        else {
                            selectedBreastRow.rating -= 1;
                            if (!shrinkingHappened) DisplayText("\n\nAll at once, your sense of gravity shifts.  Your back feels a sense of relief, and it takes you a moment to realize your " + BreastDescriptor.describeBreastRow(selectedBreastRow) + " have shrunk!");
                            else DisplayText("  Your " + numToOrdinalText(index + 1) + " row of " + BreastDescriptor.describeBreastRow(selectedBreastRow) + " gives a tiny jiggle as it shrinks, losing some off its mass.");
                        }
                        // Increment changed rows
                        shrinkingHappened = true;
                    }
                }
            }
            // Count that tits were shrunk
            if (shrinkingHappened) changes++;
        }
        // Cat dangly-doo.
        if (character.torso.cocks.count > 0 && character.torso.cocks.filter(Cock.FilterType(CockType.CAT)).length < character.torso.cocks.count &&
            changes < changeLimit && randInt(4) === 0) {
            // loop through and find a non-cat wang.
            let selectedCock: Cock;
            for (let index: number = 0; index < character.torso.cocks.count; index++) {
                selectedCock = character.torso.cocks.get(index);
                if (selectedCock.type === CockType.CAT) {
                    DisplayText("\n\nYour " + CockDescriptor.describeCock(character, selectedCock) + " swells up with near-painful arousal and begins to transform.  It turns pink and begins to narrow until the tip is barely wide enough to accommodate your urethra.  Barbs begin to sprout from its flesh, if you can call the small, fleshy nubs barbs. They start out thick around the base of your " + CockDescriptor.nounCock(CockType.HUMAN) + " and shrink towards the tip. The smallest are barely visible. <b>Your new feline dong throbs powerfully</b> and spurts a few droplets of cum.  ");
                    if (!selectedCock.hasSheath()) {
                        DisplayText("Then, it begins to shrink and sucks itself inside your body.  Within a few moments, a fleshy sheath is formed.");
                        if (character.torso.balls.quantity > 0) DisplayText("  Thankfully, your balls appear untouched.");
                    }
                    else DisplayText("Then, it disappears back into your sheath.");
                    selectedCock.type = CockType.CAT;
                    selectedCock.knotMultiplier = 1;
                }
            }
            changes++;
        }
        // Cat penorz shrink
        if (character.torso.cocks.filter(Cock.FilterType(CockType.CAT)).length > 0 && randInt(3) === 0 && changes < changeLimit && !User.settings.hyperHappy) {
            // loop through and find a cat wang.
            let selectedCock: Cock = null;
            let changedCock: number = 0;
            for (let index: number = 0; index < character.torso.cocks.count; index++) {
                selectedCock = character.torso.cocks.get(index);
                if (selectedCock.type === CockType.CAT && selectedCock.length > 6) {
                    // lose 33% size until under 10, then lose 2" at a time
                    if (selectedCock.length > 16) {
                        if (changedCock === 0)
                            DisplayText("\n\nYour " + CockDescriptor.describeCock(character, selectedCock) + " tingles, making your sheath feel a little less tight.  It dwindles in size, losing a full third of its length and a bit of girth before the change finally stops.");
                        selectedCock.length *= .66;
                        changedCock++;
                    }
                    else if (selectedCock.length > 6) {
                        if (changedCock === 0)
                            DisplayText("\n\nYour " + CockDescriptor.describeCock(character, selectedCock) + " tingles and withdraws further into your sheath.  If you had to guess, you'd say you've lost about two inches of total length and perhaps some girth.");
                        selectedCock.length -= 2;
                        changedCock++;
                    }
                    if (selectedCock.length / 5 < selectedCock.thickness && selectedCock.thickness > 1.25)
                        selectedCock.thickness = selectedCock.length / 6;
                }
            }
            // (big sensitivity boost)
            DisplayText("  Although the package is smaller, it feels even more sensitive � as if it retained all sensation of its larger size in its smaller form.");
            character.stats.sens += 5;
            // Make note of other dicks changing
            if (changedCock > 1) DisplayText("  Upon further inspection, all your " + CockDescriptor.nounCock(CockType.CAT) + "s have shrunk!");
            changes++;
        }

        // Body type changes.  Teh rarest of the rare.
        // DA EARZ
        if (character.torso.neck.head.ears.type !== EarType.CAT && randInt(5) === 0 && changes < changeLimit) {
            // human to cat:
            if (character.torso.neck.head.ears.type === EarType.HUMAN) {
                if (randInt(2) === 0) DisplayText("\n\nThe skin on the sides of your face stretches painfully as your ears migrate upwards, towards the top of your head. They shift and elongate a little, fur growing on them as they become feline in nature. <b>You now have cat ears.</b>");
                else DisplayText("\n\nYour ears begin to tingle. You reach up with one hand and gently rub them. They appear to be growing fur. Within a few moments, they've migrated up to the top of your head and increased in size. The tingling stops and you find yourself hearing noises in a whole new way. <b>You now have cat ears.</b>");
            }
            // non human to cat:
            else {
                if (randInt(2) === 0) DisplayText("\n\nYour ears change shape, morphing into pointed, feline ears!  They swivel about reflexively as you adjust to them.  <b>You now have cat ears.</b>");
                else DisplayText("\n\nYour ears tingle and begin to change shape. Within a few moments, they've become long and feline.  Thanks to the new fuzzy organs, you find yourself able to hear things that eluded your notice up until now. <b>You now have cat ears.</b>");
            }
            character.torso.neck.head.ears.type = EarType.CAT;
            changes++;
        }
        // DA TailType (IF ALREADY HAZ URZ)
        if (!character.torso.tails.reduce(Tail.HasType(TailType.CAT), false) && character.torso.neck.head.ears.type === EarType.CAT && randInt(5) === 0 && changes < changeLimit) {
            if (character.torso.tails.count === 0) {
                const chance: number = randInt(3);
                if (chance === 0) DisplayText("\n\nA pressure builds in your backside. You feel under your " + character.inventory.equipment.armor.displayName + " and discover an odd bump that seems to be growing larger by the moment. In seconds it passes between your fingers, bursts out the back of your clothes and grows most of the way to the ground. A thick coat of fur springs up to cover your new tail. You instinctively keep adjusting it to improve your balance. <b>You now have a cat-tail.</b>");
                if (chance === 1) DisplayText("\n\nYou feel your backside shift and change, flesh molding and displacing into a long, flexible tail! <b>You now have a cat tail.</b>");
                if (chance === 2) DisplayText("\n\nYou feel an odd tingling in your spine and your tail bone starts to throb and then swell. Within a few moments it begins to grow, adding new bones to your spine. Before you know it, you have a tail. Just before you think it's over, the tail begins to sprout soft, glossy " + character.torso.neck.head.hair.color + " fur. <b>You now have a cat tail.</b>");
            }
            else DisplayText("\n\nYou pause and tilt your head... something feels different.  Ah, that's what it is; you turn around and look down at your tail as it starts to change shape, narrowing and sprouting glossy fur. <b>You now have a cat tail.</b>");
            character.torso.tails.clear();
            character.torso.tails.add(new Tail(TailType.CAT));
            changes++;
        }
        // Da paws (if already haz ears & tail)
        if (character.torso.tails.reduce(Tail.HasType(TailType.CAT), false) && character.torso.neck.head.ears.type === EarType.CAT && randInt(5) === 0 && changes < changeLimit && character.torso.hips.legs.type !== LegType.CAT) {
            // hoof to cat:
            if (character.torso.hips.legs.type === LegType.HOOFED || character.torso.hips.legs.type === LegType.CENTAUR) {
                DisplayText("\n\nYou feel your hooves suddenly splinter, growing into five unique digits. Their flesh softens as your hooves reshape into furred cat paws. <b>You now have cat paws.</b>");
                if (character.torso.hips.legs.type === LegType.CENTAUR) DisplayText("  You feel woozy and collapse on your side.  When you wake, you're no longer a centaur and your body has returned to a humanoid shape.");
            }
            // Goo to cat
            else if (character.torso.hips.legs.type === LegType.GOO) {
                DisplayText("\n\nYour lower body rushes inward, molding into two leg-like shapes that gradually stiffen up.  In moments they solidify into digitigrade legs, complete with soft, padded cat-paws.  <b>You now have cat-paws!</b>");
            }
            // non hoof to cat:
            else DisplayText("\n\nYou scream in agony as you feel the bones in your " + LegDescriptor.describeFeet(character) + " break and begin to rearrange. When the pain fades, you feel surprisingly well-balanced. <b>You now have cat paws.</b>");
            character.torso.hips.legs.type = LegType.CAT;
            changes++;
        }
        // TURN INTO A FURRAH!  OH SHIT
        if (character.torso.tails.reduce(Tail.HasType(TailType.CAT), false) &&
            character.torso.neck.head.ears.type === EarType.CAT &&
            character.torso.hips.legs.type === LegType.CAT &&
            character.skin.type !== SkinType.FUR &&
            randInt(5) === 0 && changes < changeLimit) {
            DisplayText("\n\nYour " + character.skin.desc + " begins to tingle, then itch. You reach down to scratch your arm absent-mindedly and pull your fingers away to find stUtils.Utils.rand(s of " + character.torso.neck.head.hair.color + " fur. Wait, fur?  What just happened?! You spend a moment examining yourself and discover that <b>you are now covered in glossy, soft fur.</b>\n\n");
            character.skin.type = SkinType.FUR;
            character.skin.desc = "fur";
            changes++;
        }
        // CAT-FaceType!  FULL ON FURRY!  RAGE AWAY NEKOZ
        if (character.torso.tails.reduce(Tail.HasType(TailType.CAT), false) &&
            character.torso.neck.head.ears.type === EarType.CAT &&
            character.torso.hips.legs.type === LegType.CAT &&
            character.skin.type === SkinType.FUR &&
            character.torso.neck.head.face.type !== FaceType.CAT &&
            randInt(5) === 0 &&
            changes < changeLimit) {
            // Gain cat face, replace old face
            const chance: number = randInt(3);
            if (chance === 0) DisplayText("\n\nYour face is wracked with pain. You throw back your head and scream in agony as you feel your cheekbones breaking and shifting, reforming into something... different. You find a puddle to view your reflection and discover <b>your face is now a cross between human and feline features.</b>");
            else if (chance === 1) DisplayText("\n\nMind-numbing pain courses through you as you feel your facial bones rearranging.  You clutch at your face in agony as your skin crawls and shifts, your visage reshaping to replace your facial characteristics with those of a feline. <b>You now have an anthropomorphic cat-face.</b>");
            else DisplayText("\n\nYour face is wracked with pain. You throw back your head and scream in agony as you feel your cheekbones breaking and shifting, reforming into something else. <b>Your facial features rearrange to take on many feline aspects.</b>");
            character.torso.neck.head.face.type = FaceType.CAT;
            changes++;
        }
        if (randInt(4) === 0 && character.torso.neck.gills && changes < changeLimit) {
            DisplayText("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.");
            character.torso.neck.gills = false;
            changes++;
        }
        // FAILSAFE CHANGE
        if (changes === 0) {
            DisplayText("\n\nInhuman vitality spreads through your body, invigorating you!\n");
            StatModifier.displayCharacterHPChange(character, 50);
            character.stats.lust += 3;
        }
        if (changes < changeLimit) {
            if (randInt(2) === 0) DisplayText(BodyModifier.displayModThickness(character, 5, 2));
            if (randInt(2) === 0) DisplayText(BodyModifier.displayModTone(character, 76, 2));
            if (character.gender < 2) if (randInt(2) === 0) DisplayText(BodyModifier.displayModFem(character, 65, 1));
            else DisplayText(BodyModifier.displayModFem(character, 85, 2));
        }
    }
}