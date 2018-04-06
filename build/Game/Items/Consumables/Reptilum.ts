import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import DisplayText from '../../../Engine/display/DisplayText';
import { randInt } from '../../../Engine/Utilities/SMath';
import BreastRow from '../../Body/BreastRow';
import Cock, { CockType } from '../../Body/Cock';
import { EarType } from '../../Body/Ears';
import { EyeType } from '../../Body/Eyes';
import { FaceType } from '../../Body/Face';
import { HornType } from '../../Body/Horns';
import { LegType } from '../../Body/Legs';
import RaceScore from '../../Body/RaceScore';
import { SkinType } from '../../Body/Skin';
import Tail, { TailType } from '../../Body/Tail';
import Character from '../../Character/Character';
import PlayerFlags from '../../Character/Player/PlayerFlags';
import * as BreastDescriptor from '../../Descriptors/BreastDescriptor';
import * as ButtDescriptor from '../../Descriptors/ButtDescriptor';
import * as CockDescriptor from '../../Descriptors/CockDescriptor';
import * as FaceDescriptor from '../../Descriptors/FaceDescriptor';
import * as HeadDescriptor from '../../Descriptors/HeadDescriptor';
import * as LegDescriptor from '../../Descriptors/LegDescriptor';
import * as VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import { PerkType } from '../../Effects/PerkType';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import * as StatModifier from '../../Modifiers/StatModifier';
import User from '../../User';
import { numToCardinalText } from '../../Utilities/NumToText';
import ItemDesc from '../ItemDesc';

export default class Reptilum extends Consumable {
    public constructor() {
        super(ConsumableName.Reptilum, new ItemDesc("Reptlum", "a vial of Reptilum", "This is a rounded bottle with a small label that reads, \"<i>Reptilum</i>\".  It is likely this potion is tied to reptiles in some way."));
    }

    private getFirstNonLizzyCock(character: Character): Cock {
        for (let index: number = 0; index < character.torso.cocks.count; index++) {
            if (character.torso.cocks.get(index).type !== CockType.LIZARD) {
                return character.torso.cocks.get(index);
            }
        }
    }

    public use(character: Character) {
        // character.slimeFeed();
        // init variables
        let changes: number = 0;
        let changeLimit: number = 1;
        // Utils.randomly choose affects limit
        if (randInt(2) === 0) changeLimit++;
        if (randInt(2) === 0) changeLimit++;
        if (randInt(4) === 0) changeLimit++;
        if (character.perks.has(PerkType.HistoryAlchemist)) changeLimit++;
        // clear screen
        DisplayText().clear();
        DisplayText("You uncork the vial of fluid and drink it down.  The taste is sour, like a dry wine with an aftertaste not entirely dissimilar to alcohol.  Instead of the warmth you'd expect, it leaves your throat feeling cold and a little numb.");

        // Statistical changes:
        // -Reduces speed down to 50.
        if (character.stats.spe > 50 && changes < changeLimit && randInt(4) === 0) {
            DisplayText("\n\nYou start to feel sluggish and cold.  Lying down to bask in the sun might make you feel better.");
            character.stats.spe += -1;
            changes++;
        }
        // -Reduces sensitivity.
        if (character.stats.sens > 20 && changes < changeLimit && randInt(3) === 0) {
            DisplayText("\n\nThe sensation of prickly pins and needles moves over your body, leaving your senses a little dulled in its wake.");
            character.stats.sens += -1;
            changes++;
        }
        // Raises libido greatly to 50, then somewhat to 75, then slowly to 100.
        if (character.stats.lib < 100 && changes < changeLimit && randInt(3) === 0) {
            DisplayText("\n\nA knot of fire in your gut doubles you over but passes after a few moments.  As you straighten you can feel the heat seeping into you, ");
            // (DICK)
            if (character.torso.cocks.count > 0 && (character.gender !== 3 || randInt(2) === 0)) {
                DisplayText("filling ");
                if (character.torso.cocks.count > 1) DisplayText("each of ");
                DisplayText("your " + CockDescriptor.describeMultiCockShort(character) + " with the desire to breed.  You get a bit hornier when you realize your sex-drive has gotten a boost.");
            }
            // (COOCH)
            else if (character.torso.vaginas.count > 0)
                DisplayText("puddling in your " + VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)) + ".  An instinctive desire to mate and lay eggs spreads through you, increasing your lust and boosting your sex-drive.");
            // (TARDS)
            else DisplayText("puddling in your featureless crotch for a split-second before it slides into your " + ButtDescriptor.describeButt(character) + ".  You want to be fucked, filled, and perhaps even gain a proper gender again.  Through the lust you realize your sex-drive has been permanently increased.");
            // +3 lib if less than 50
            if (character.stats.lib < 50) character.stats.lib += 1;
            // +2 lib if less than 75
            if (character.stats.lib < 75) character.stats.lib += 1;
            // +1 if above 75.
            character.stats.lib += 1;
            changes++;
        }
        // -Raises toughness to 70
        // (+3 to 40, +2 to 55, +1 to 70)
        if (character.stats.tou < 70 && changes < changeLimit && randInt(3) === 0) {
            // (+3)
            if (character.stats.tou < 40) {
                DisplayText("\n\nYour body and skin both thicken noticeably.  You pinch your " + character.skin.desc + " experimentally and marvel at how much tougher your hide has gotten.");
                character.stats.tou += 3;
            }
            // (+2)
            else if (character.stats.tou < 55) {
                DisplayText("\n\nYou grin as you feel your form getting a little more solid.  It seems like your whole body is toughening up quite nicely, and by the time the sensation goes away, you feel ready to take a hit.");
                character.stats.tou += 2;
            }
            // (+1)
            else {
                DisplayText("\n\nYou snarl happily as you feel yourself getting even tougher.  It's a barely discernible difference, but you can feel your " + character.skin.desc + " getting tough enough to make you feel invincible.");
                character.stats.tou += 1;
            }
            changes++;
        }

        // Sexual Changes:
        // -Lizard dick - first one
        if (character.torso.cocks.filter(Cock.FilterType(CockType.LIZARD)).length <= 0 && character.torso.cocks.count > 0 && changes < changeLimit && randInt(4) === 0) {
            // Find the first non-lizzy dick
            const nonLizzyDick: Cock = this.getFirstNonLizzyCock(character);
            DisplayText("\n\nA slow tingle warms your groin.  Before it can progress any further, you yank back your " + character.inventory.equipment.armor.displayName + " to investigate.  Your " + CockDescriptor.describeCock(character, nonLizzyDick) + " is changing!  It ripples loosely from ");
            if (character.torso.cocks.filter(Cock.HasSheath).length > 0) DisplayText("sheath ");
            else DisplayText("base ");
            DisplayText("to tip, undulating and convulsing as its color lightens, darkens, and finally settles on a purplish hue.  Your " + CockDescriptor.nounCock(CockType.HUMAN) + " resolves itself into a bulbous form, with a slightly pointed tip.  The 'bulbs' throughout its shape look like they would provide an interesting ride for your sexual partners, but the perverse, alien pecker ");
            if (character.stats.cor < 33) DisplayText("horrifies you.");
            else if (character.stats.cor < 66) DisplayText("is a little strange for your tastes.");
            else {
                DisplayText("looks like it might be more fun to receive than use on others.  ");
                if (character.torso.vaginas.count > 0) DisplayText("Maybe you could find someone else with one to ride?");
                else DisplayText("Maybe you should test it out on someone and ask them exactly how it feels?");
            }
            DisplayText("  <b>You now have a bulbous, lizard-like cock.</b>");
            // Actually xform it nau
            if (character.torso.cocks.filter(Cock.HasSheath).length > 0) {
                nonLizzyDick.type = CockType.LIZARD;
                if (character.torso.cocks.filter(Cock.HasSheath).length <= 0)
                    DisplayText("\n\nYour sheath tightens and starts to smooth out, revealing ever greater amounts of your " + CockDescriptor.describeCock(character, nonLizzyDick) + "'s lower portions.  After a few moments <b>your groin is no longer so animalistic - the sheath is gone.</b>");
            }
            else nonLizzyDick.type = CockType.LIZARD;
            changes++;
            character.stats.lib += 3;
            character.stats.lust += 10;
        }
        // (CHANGE OTHER DICK)
        // Requires 1 lizard cock, multiple cocks
        if (character.torso.cocks.count > 1 && character.torso.cocks.filter(Cock.FilterType(CockType.LIZARD)).length > 0 && character.torso.cocks.count > character.torso.cocks.filter(Cock.FilterType(CockType.LIZARD)).length && randInt(4) === 0 && changes < changeLimit) {
            DisplayText("\n\nA familiar tingle starts in your crotch, and before you can miss the show, you pull open your " + character.inventory.equipment.armor.displayName + ".  As if operating on a cue, ");
            const nonLizzyDick: Cock = this.getFirstNonLizzyCock(character);
            if (character.torso.cocks.count === 2) DisplayText("your other dick");
            else DisplayText("another one of your dicks");
            DisplayText(" starts to change into the strange reptilian shape you've grown familiar with.  It warps visibly, trembling and radiating pleasurable feelings back to you as the transformation progresses.  ");
            if (character.cumQ() < 50) DisplayText("pre-cum oozes from the tip");
            else if (character.cumQ() < 700) DisplayText("Thick pre-cum rains from the tip");
            else DisplayText("A wave of pre-cum splatters on the ground");
            DisplayText(" from the pleasure of the change.  In moments <b>you have a bulbous, lizard-like cock.</b>");
            // (REMOVE SHEATH IF NECESSARY)
            if (character.torso.cocks.filter(Cock.HasSheath).length > 0) {
                nonLizzyDick.type = CockType.LIZARD;
                if (character.torso.cocks.filter(Cock.HasSheath).length <= 0)
                    DisplayText("\n\nYour sheath tightens and starts to smooth out, revealing ever greater amounts of your " + CockDescriptor.describeCock(character, nonLizzyDick) + "'s lower portions.  After a few moments <b>your groin is no longer so animalistic - the sheath is gone.</b>");
            }
            else nonLizzyDick.type = CockType.LIZARD;
            changes++;
            character.stats.lib += 3;
            character.stats.lust += 10;
        }
        // -Grows second lizard dick if only 1 dick
        if (character.torso.cocks.filter(Cock.FilterType(CockType.LIZARD)).length === 1 && character.torso.cocks.count === 1 && randInt(4) === 0 && changes < changeLimit) {
            const firstCock = character.torso.cocks.get(0);
            DisplayText("\n\nA knot of pressure forms in your groin, forcing you off your " + LegDescriptor.describeFeet(character) + " as you try to endure it.  You examine the affected area and see a lump starting to bulge under your " + character.skin.desc + ", adjacent to your " + CockDescriptor.describeCock(character, firstCock) + ".  The flesh darkens, turning purple");
            if (character.skin.type === SkinType.FUR || character.skin.type === SkinType.SCALES)
                DisplayText(" and shedding " + character.skin.desc);
            DisplayText(" as the bulge lengthens, pushing out from your body.  Too surprised to react, you can only pant in pain and watch as the fleshy lump starts to take on a penis-like appearance.  <b>You're growing a second lizard-cock!</b>  It doesn't stop growing until it's just as long as its brother and the same shade of shiny purple.  A dribble of cum oozes from its tip, and you feel relief at last.");

            const newCock = new Cock();
            newCock.type = CockType.LIZARD;
            newCock.length = firstCock.length;
            newCock.thickness = firstCock.thickness;
            character.torso.cocks.add(newCock);
            changes++;
            character.stats.lib += 3;
            character.stats.lust += 10;
        }
        // --Worms leave if 100% lizard dicks?
        // Require mammals?
        if (character.torso.cocks.filter(Cock.FilterType(CockType.LIZARD)).length === character.torso.cocks.count && changes < changeLimit && character.statusAffects.has(StatusAffectType.Infested)) {
            DisplayText("\n\nLike rats from a sinking ship, worms escape from your body in a steady stream.  Surprisingly, the sensation is remarkably pleasant, similar to the pleasure of sexual release in a way.  Though they seem inexhaustible, the tiny, cum-slimed invertebrates slow to a trickle.  The larger worm-kin inside you stirs as if disturbed from a nap, coming loose from whatever moorings it had attached itself to in the interior of your form.  It slowly works its way up your urethra, stretching to an almost painful degree with every lurching motion.  Your dick bloats out around the base, stretched like the ovipositor on a bee-girl in order to handle the parasitic creature, but thankfully, the ordeal is a brief one.");
            if (character.torso.balls.quantity > 1) DisplayText("  The remaining " + numToCardinalText(character.torso.balls.quantity - 1) + " slither out the pre-stretched holes with ease, though the last one hangs from your tip for a moment before dropping to the ground.");
            DisplayText("  The white creature joins its kin on the ground and slowly slithers away.  Perhaps they prefer mammals? In any event, <b>you are no longer infected with worms</b>.");
            character.statusAffects.remove(StatusAffectType.Infested);
            changes++;
        }
        // -Breasts vanish to 0 rating if male
        if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 1 && character.gender === 1 && changes < changeLimit && randInt(3) === 0) {
            // (HUEG)
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 8) {
                DisplayText("\n\nThe flesh on your chest tightens up, losing nearly half its mass in the span of a few seconds.  With your center of balance shifted so suddenly, you stagger about trying not to fall on your ass.  You catch yourself and marvel at the massive change in breast size.");
                // Half tit size
            }
            // (NOT HUEG < 4)
            else DisplayText("\n\nIn an instant, your chest compacts in on itself, consuming every ounce of breast-flesh.  You're left with a  smooth, masculine torso, though your nipples remain.");
            // (BOTH - no new PG)
            DisplayText("  With the change in weight and gravity, you find it's gotten much easier to move about.");
            // Loop through behind the scenes and adjust all tits.
            for (let index: number = 0; index < character.torso.chest.count; index++) {
                const breasts = character.torso.chest.get(index);
                if (breasts.rating > 8)
                    breasts.rating /= 2;
                else
                    breasts.rating = 0;
            }
            // (+2 speed)
            character.stats.lib += 2;
            changes++;
        }
        // -Lactation stoppage.
        if (character.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier >= 1 && changes < changeLimit && randInt(4) === 0) {
            if (character.torso.chest.countNipples() === 2) DisplayText("\n\nBoth of your");
            else DisplayText("\n\nAll of your many");
            DisplayText(" nipples relax.  It's a strange feeling, and you pull back your top to touch one.  It feels fine, though there doesn't seem to be any milk leaking out.  You give it a squeeze and marvel when nothing ");
            if (character.torso.chest.filter(BreastRow.FuckableNipples).length > 0) DisplayText("but sexual fluid ");
            DisplayText("escapes it.  <b>You are no longer lactating.</b>  That makes sense, only mammals lactate!  Smiling, you muse at how much time this will save you when cleaning your gear.");
            if (character.perks.has(PerkType.Feeder) || character.statusAffects.has(StatusAffectType.Feeder)) {
                DisplayText("\n\n(<b>Feeder perk lost!</b>)");
                character.perks.remove(PerkType.Feeder);
                character.statusAffects.remove(StatusAffectType.Feeder);
            }
            changes++;
            // Loop through and reset lactation
            for (let index: number = 0; index < character.torso.chest.count; index++) {
                character.torso.chest.get(index).lactationMultiplier = 0;
            }
        }
        // -Nipples reduction to 1 per tit.
        if (character.torso.chest.reduce(BreastRow.AverageNipplesPerBreast, 0) > 1 && changes < changeLimit && randInt(4) === 0) {
            DisplayText("\n\nA chill runs over your " + BreastDescriptor.describeAllBreasts(character) + " and vanishes.  You stick a hand under your " + character.inventory.equipment.armor.displayName + " and discover that your extra nipples are missing!  You're down to just one per ");
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating < 1) DisplayText("'breast'.");
            else DisplayText("breast.");
            changes++;
            // Loop through and reset nipples
            for (let index: number = 0; index < character.torso.chest.count; index++) {
                character.torso.chest.get(index).nipples.count = 1;
            }
        }
        // -VAGs
        if (character.torso.vaginas.count > 0 && !character.perks.has(PerkType.Oviposition) && changes < changeLimit && randInt(5) === 0 && RaceScore.lizardScore(character) > 3) {
            DisplayText("\n\nDeep inside yourself there is a change.  It makes you feel a little woozy, but passes quickly.  Beyond that, you aren't sure exactly what just happened, but you are sure it originated from your womb.\n");
            DisplayText("(<b>Perk Gained: Oviposition</b>)");
            character.perks.add(PerkType.Oviposition, 0, 0, 0, 0);
            changes++;
        }

        // Physical changes:
        // -Existing horns.amount become draconic, max of 4, max length of 1'
        if (character.torso.neck.head.horns.type !== HornType.DRACONIC_X4_12_INCH_LONG && changes < changeLimit && randInt(5) === 0) {
            // No dragon horns.amount yet.
            if (character.torso.neck.head.horns.type !== HornType.DRACONIC_X2) {
                // Already have horns
                if (character.torso.neck.head.horns.amount > 0) {
                    // High quantity demon horns
                    if (character.torso.neck.head.horns.type === HornType.DEMON && character.torso.neck.head.horns.amount > 4) {
                        DisplayText("\n\nYour horns.amount condense, twisting around each other and merging into larger, pointed protrusions.  By the time they finish you have four draconic-looking horns, each about twelve inches long.");
                        character.torso.neck.head.horns.amount = 12;
                        character.torso.neck.head.horns.type = HornType.DRACONIC_X4_12_INCH_LONG;
                    }
                    else {
                        DisplayText("\n\nYou feel your horns.amount changing and warping, and reach back to touch them.  They have a slight curve and a gradual taper.  They must look something like the horns.amount the dragons in your village's legends always had.");
                        character.torso.neck.head.horns.type = HornType.DRACONIC_X2;
                        if (character.torso.neck.head.horns.amount > 13) {
                            DisplayText("  The change seems to have shrunken the horns, they're about a foot long now.");
                            character.torso.neck.head.horns.amount = 12;
                        }

                    }
                    changes++;
                }
                // No horns
                else {
                    // -If no horns, grow a pair
                    DisplayText("\n\nWith painful pressure, the skin on the sides of your forehead splits around two tiny nub-like horns.  They're angled back in such a way as to resemble those you saw on the dragons in your village's legends.  A few inches of horn sprout from your head before stopping.  <b>You have about four inches of dragon-like horn.</b>");
                    character.torso.neck.head.horns.amount = 4;
                    character.torso.neck.head.horns.type = HornType.DRACONIC_X2;

                    changes++;
                }
            }
            // ALREADY DRAGON
            else {
                if (character.torso.neck.head.horns.type === HornType.DRACONIC_X2) {
                    if (character.torso.neck.head.horns.amount < 12) {
                        if (randInt(2) === 0) {
                            DisplayText("\n\nYou get a headache as an inch of fresh horn escapes from your pounding skull.");
                            character.torso.neck.head.horns.amount += 1;
                        }
                        else {
                            DisplayText("\n\nYour head aches as your horns.amount grow a few inches longer.  They get even thicker about the base, giving you a menacing appearance.");
                            character.torso.neck.head.horns.amount += 2 + randInt(4);
                        }
                        if (character.torso.neck.head.horns.amount >= 12) DisplayText("  <b>Your horns.amount settle down quickly, as if they're reached their full size.</b>");
                        changes++;
                    }
                    // maxxed out, new row
                    else {
                        // --Next horn growth adds second row and brings length up to 12\"
                        DisplayText("\n\nA second row of horns.amount erupts under the first, and though they are narrower, they grow nearly as long as your first row before they stop.  A sense of finality settles over you.  <b>You have as many horns.amount as a lizan can grow.</b>");
                        character.torso.neck.head.horns.type = HornType.DRACONIC_X4_12_INCH_LONG;
                        changes++;
                    }
                }
            }
        }
        // -Hair stops growing!
        if ((User.flags.get("Player") as PlayerFlags).HAIR_GROWTH_STOPPED_BECAUSE_LIZARD === 0 && changes < changeLimit && randInt(4) === 0) {
            DisplayText("\n\nYour scalp tingles oddly.  In a panic, you reach up to your " + HeadDescriptor.describeHair(character) + ", but thankfully it appears unchanged.\n\n");
            DisplayText("(<b>Your hair has stopped growing.</b>)");
            changes++;
            (User.flags.get("Player") as PlayerFlags).HAIR_GROWTH_STOPPED_BECAUSE_LIZARD++;
        }
        // Big physical changes:
        // -Legs - Draconic, clawed feet
        if (character.torso.hips.legs.type !== LegType.LIZARD && changes < changeLimit && randInt(5) === 0) {
            // Hooves -
            if (character.torso.hips.legs.type === LegType.HOOFED) DisplayText("\n\nYou scream in agony as you feel your hooves crack and break apart, beginning to rearrange.  Your legs change to a digitigrade shape while your feet grow claws and shift to have three toes on the front and a smaller toe on the heel.");
            // TAURS -
            else if (character.torso.hips.legs.type === LegType.CENTAUR) DisplayText("\n\nYour lower body is wracked by pain!  Once it passes, you discover that you're standing on digitigrade legs with lizard-like claws.");
            // feet types -
            else if (character.torso.hips.legs.type === LegType.HUMAN || character.torso.hips.legs.type === LegType.DOG || character.torso.hips.legs.type === LegType.DEMONIC_HIGH_HEELS || character.torso.hips.legs.type === LegType.DEMONIC_CLAWS || character.torso.hips.legs.type === LegType.BEE || character.torso.hips.legs.type === LegType.CAT) DisplayText("\n\nYou scream in agony as you feel the bones in your legs break and begin to rearrange. They change to a digitigrade shape while your feet grow claws and shift to have three toes on the front and a smaller toe on the heel.");
            // Else -
            else DisplayText("\n\nPain rips through your " + LegDescriptor.describeLegs(character) + ", morphing and twisting them until the bones rearrange into a digitigrade configuration.  The strange legs have three-toed, clawed feet, complete with a small vestigial claw-toe on the back for added grip.");
            DisplayText("  <b>You have reptilian legs and claws!</b>");
            character.torso.hips.legs.type = LegType.LIZARD;
            changes++;
        }
        // -Tail - sinuous lizard tail
        if (character.torso.tails.reduce(Tail.HasType(TailType.LIZARD), false) && character.torso.hips.legs.type === LegType.LIZARD && changes < changeLimit && randInt(5) === 0) {
            // No tail
            if (character.torso.tails.count >= 1) DisplayText("\n\nYou drop onto the ground as your spine twists and grows, forcing the flesh above your " + ButtDescriptor.describeButt(character) + " to bulge out.  New bones form, one after another, building a tapered, prehensile tail onto the back of your body.  <b>You now have a reptilian tail!</b>");
            // Yes tail
            else DisplayText("\n\nYou drop to the ground as your tail twists and grows, changing its shape in order to gradually taper to a point.  It flicks back and forth, prehensile and totally under your control.  <b>You now have a reptilian tail.</b>");
            character.torso.tails.clear();
            character.torso.tails.add(new Tail(TailType.LIZARD));
            changes++;
        }
        // Remove odd eyes
        if (changes < changeLimit && randInt(5) === 0 && character.torso.neck.head.face.eyes.type > EyeType.HUMAN) {
            if (character.torso.neck.head.face.eyes.type === EyeType.BLACK_EYES_SAND_TRAP) {
                DisplayText("\n\nYou feel a twinge in your eyes and you blink.  It feels like black cataracts have just fallen away from you, and you know without needing to see your reflection that your eyes have gone back to looking human.");
            }
            else {
                DisplayText("\n\nYou blink and stumble, a wave of vertigo threatening to pull your " + LegDescriptor.describeFeet(character) + " from under you.  As you steady and open your eyes, you realize something seems different.  Your vision is changed somehow.");
                if (character.torso.neck.head.face.eyes.type === EyeType.FOUR_SPIDER_EYES) DisplayText("  Your multiple, arachnid eyes are gone!</b>");
                DisplayText("  <b>You have normal, humanoid eyes again.</b>");
            }
            character.torso.neck.head.face.eyes.type = EyeType.HUMAN;
            changes++;
        }
        // -Ears become smaller nub-like openings?
        if (character.torso.neck.head.ears.type !== EarType.LIZARD && character.torso.tails.reduce(Tail.HasType(TailType.LIZARD), false) && character.torso.hips.legs.type === LegType.LIZARD && changes < changeLimit && randInt(5) === 0) {
            DisplayText("\n\nTightness centers on your scalp, pulling your ears down from their normal, fleshy shape into small, scaley bumps with holes in their centers.  <b>You have reptilian ears!</b>");
            character.torso.neck.head.ears.type = EarType.LIZARD;
            changes++;
        }
        // -Scales - color changes to red, green, white, blue, or black.  Rarely: purple or silver.
        if (character.skin.type !== SkinType.SCALES && character.torso.neck.head.ears.type === EarType.LIZARD && character.torso.tails.reduce(Tail.HasType(TailType.LIZARD), false) && character.torso.hips.legs.type === LegType.LIZARD && changes < changeLimit && randInt(5) === 0) {
            // (fur)
            if (character.skin.type === SkinType.FUR) {
                // set new skin.tone
                if (randInt(10) === 0) {
                    if (randInt(2) === 0) character.skin.tone = "purple";
                    else character.skin.tone = "silver";
                }
                // non rare skin.tone
                else {
                    const chance: number = randInt(5);
                    if (chance === 0) character.skin.tone = "red";
                    else if (chance === 1) character.skin.tone = "green";
                    else if (chance === 2) character.skin.tone = "white";
                    else if (chance === 3) character.skin.tone = "blue";
                    else character.skin.tone = "black";
                }
                DisplayText("\n\nYou scratch yourself, and come away with a large clump of " + character.torso.neck.head.hair.color + " fur.  Panicked, you look down and realize that your fur is falling out in huge clumps.  It itches like mad, and you scratch your body relentlessly, shedding the remaining fur with alarming speed.  Underneath the fur your skin feels incredibly smooth, and as more and more of the stuff comes off, you discover a seamless layer of " + character.skin.tone + " scales covering most of your body.  The rest of the fur is easy to remove.  <b>You're now covered in scales from head to toe.</b>");
            }
            // (no fur)
            else {
                DisplayText("\n\nYou idly reach back to scratch yourself and nearly jump out of your " + character.inventory.equipment.armor.displayName + " when you hit something hard.  A quick glance down reveals that scales are growing out of your " + character.skin.tone + " skin with alarming speed.  As you watch, the surface of your skin is covered in smooth scales.  They interlink together so well that they may as well be seamless.  You peel back your " + character.inventory.equipment.armor.displayName + " and the transformation has already finished on the rest of your body.  <b>You're covered from head to toe in shiny ");
                // set new skin.tone
                if (randInt(10) === 0) {
                    if (randInt(2) === 0) character.skin.tone = "purple";
                    else character.skin.tone = "silver";
                }
                // non rare skin.tone
                else {
                    const chance: number = randInt(5);
                    if (chance === 0) character.skin.tone = "red";
                    else if (chance === 1) character.skin.tone = "green";
                    else if (chance === 2) character.skin.tone = "white";
                    else if (chance === 3) character.skin.tone = "blue";
                    else character.skin.tone = "black";
                }
                DisplayText(character.skin.tone + " scales.</b>");
            }
            character.skin.type = SkinType.SCALES;
            character.skin.desc = "scales";
            changes++;
        }
        // -Lizard-like face.
        if (character.torso.neck.head.face.type !== FaceType.LIZARD && character.skin.type === SkinType.SCALES && character.torso.neck.head.ears.type === EarType.LIZARD && character.torso.tails.reduce(Tail.HasType(TailType.LIZARD), false) && character.torso.hips.legs.type === LegType.LIZARD && changes < changeLimit && randInt(5) === 0) {
            DisplayText("\n\nTerrible agony wracks your " + FaceDescriptor.describeFace(character) + " as bones crack and shift.  Your jawbone rearranges while your cranium shortens.  The changes seem to last forever; once they've finished, no time seems to have passed.  Your fingers brush against your toothy snout as you get used to your new face.  It seems <b>you have a toothy, reptilian visage now.</b>");
            character.torso.neck.head.face.type = FaceType.LIZARD;
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
    }
}
