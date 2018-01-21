import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import BreastRow from '../../Body/BreastRow';
import Cock, { CockType } from '../../Body/Cock';
import { EarType } from '../../Body/Ears';
import { EyeType } from '../../Body/Eyes';
import { FaceType } from '../../Body/Face';
import { HornType } from '../../Body/Horns';
import { LegType } from '../../Body/Legs';
import { SkinType } from '../../Body/Skin';
import Tail, { TailType } from '../../Body/Tail';
import BreastDescriptor from '../../Descriptors/BreastDescriptor';
import ButtDescriptor from '../../Descriptors/ButtDescriptor';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import FaceDescriptor from '../../Descriptors/FaceDescriptor';
import HeadDescriptor from '../../Descriptors/HeadDescriptor';
import LegDescriptor from '../../Descriptors/LowerBodyDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import DisplayText from '../../display/DisplayText';
import PerkFactory from '../../Effects/PerkFactory';
import { PerkType } from '../../Effects/PerkType';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Flags, { FlagEnum } from '../../Game/Flags';
import StatModifier from '../../Modifiers/StatModifier';
import Player from '../../Player/Player';
import RaceScore from '../../RaceScore';
import { Utils } from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class Reptilum extends Consumable {
    public constructor() {
        super(ConsumableName.Reptilum, new ItemDesc("Reptlum", "a vial of Reptilum", "This is a rounded bottle with a small label that reads, \"<i>Reptilum</i>\".  It is likely this potion is tied to reptiles in some way."));
    }

    private getFirstNonLizzyCock(player: Player): Cock {
        for (let index: number = 0; index < player.torso.cocks.count; index++) {
            if (player.torso.cocks.get(index).type !== CockType.LIZARD) {
                return player.torso.cocks.get(index);
            }
        }
    }

    public use(player: Player) {
        player.slimeFeed();
        // init variables
        let changes: number = 0;
        let changeLimit: number = 1;
        // Utils.randomly choose affects limit
        if (Utils.rand(2) === 0) changeLimit++;
        if (Utils.rand(2) === 0) changeLimit++;
        if (Utils.rand(4) === 0) changeLimit++;
        if (player.perks.has(PerkType.HistoryAlchemist)) changeLimit++;
        // clear screen
        DisplayText().clear();
        DisplayText("You uncork the vial of fluid and drink it down.  The taste is sour, like a dry wine with an aftertaste not entirely dissimilar to alcohol.  Instead of the warmth you'd expect, it leaves your throat feeling cold and a little numb.");

        // Statistical changes:
        // -Reduces speed down to 50.
        if (player.stats.spe > 50 && changes < changeLimit && Utils.rand(4) === 0) {
            DisplayText("\n\nYou start to feel sluggish and cold.  Lying down to bask in the sun might make you feel better.");
            player.stats.spe += -1;
            changes++;
        }
        // -Reduces sensitivity.
        if (player.stats.sens > 20 && changes < changeLimit && Utils.rand(3) === 0) {
            DisplayText("\n\nThe sensation of prickly pins and needles moves over your body, leaving your senses a little dulled in its wake.");
            player.stats.sens += -1;
            changes++;
        }
        // Raises libido greatly to 50, then somewhat to 75, then slowly to 100.
        if (player.stats.lib < 100 && changes < changeLimit && Utils.rand(3) === 0) {
            DisplayText("\n\nA knot of fire in your gut doubles you over but passes after a few moments.  As you straighten you can feel the heat seeping into you, ");
            // (DICK)
            if (player.torso.cocks.count > 0 && (player.gender !== 3 || Utils.rand(2) === 0)) {
                DisplayText("filling ");
                if (player.torso.cocks.count > 1) DisplayText("each of ");
                DisplayText("your " + CockDescriptor.describeMultiCockShort(player) + " with the desire to breed.  You get a bit hornier when you realize your sex-drive has gotten a boost.");
            }
            // (COOCH)
            else if (player.torso.vaginas.count > 0)
                DisplayText("puddling in your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + ".  An instinctive desire to mate and lay eggs spreads through you, increasing your lust and boosting your sex-drive.");
            // (TARDS)
            else DisplayText("puddling in your featureless crotch for a split-second before it slides into your " + ButtDescriptor.describeButt(player) + ".  You want to be fucked, filled, and perhaps even gain a proper gender again.  Through the lust you realize your sex-drive has been permanently increased.");
            // +3 lib if less than 50
            if (player.stats.lib < 50) player.stats.lib += 1;
            // +2 lib if less than 75
            if (player.stats.lib < 75) player.stats.lib += 1;
            // +1 if above 75.
            player.stats.lib += 1;
            changes++;
        }
        // -Raises toughness to 70
        // (+3 to 40, +2 to 55, +1 to 70)
        if (player.stats.tou < 70 && changes < changeLimit && Utils.rand(3) === 0) {
            // (+3)
            if (player.stats.tou < 40) {
                DisplayText("\n\nYour body and skin both thicken noticeably.  You pinch your " + player.skin.desc + " experimentally and marvel at how much tougher your hide has gotten.");
                player.stats.tou += 3;
            }
            // (+2)
            else if (player.stats.tou < 55) {
                DisplayText("\n\nYou grin as you feel your form getting a little more solid.  It seems like your whole body is toughening up quite nicely, and by the time the sensation goes away, you feel ready to take a hit.");
                player.stats.tou += 2;
            }
            // (+1)
            else {
                DisplayText("\n\nYou snarl happily as you feel yourself getting even tougher.  It's a barely discernible difference, but you can feel your " + player.skin.desc + " getting tough enough to make you feel invincible.");
                player.stats.tou += 1;
            }
            changes++;
        }

        // Sexual Changes:
        // -Lizard dick - first one
        if (player.torso.cocks.filterType(CockType.LIZARD).length <= 0 && player.torso.cocks.count > 0 && changes < changeLimit && Utils.rand(4) === 0) {
            // Find the first non-lizzy dick
            const nonLizzyDick: Cock = this.getFirstNonLizzyCock(player);
            DisplayText("\n\nA slow tingle warms your groin.  Before it can progress any further, you yank back your " + player.inventory.equipment.armor.displayName + " to investigate.  Your " + CockDescriptor.describeCock(player, nonLizzyDick) + " is changing!  It ripples loosely from ");
            if (player.torso.cocks.filter(Cock.HasSheath).length > 0) DisplayText("sheath ");
            else DisplayText("base ");
            DisplayText("to tip, undulating and convulsing as its color lightens, darkens, and finally settles on a purplish hue.  Your " + CockDescriptor.nounCock(CockType.HUMAN) + " resolves itself into a bulbous form, with a slightly pointed tip.  The 'bulbs' throughout its shape look like they would provide an interesting ride for your sexual partners, but the perverse, alien pecker ");
            if (player.stats.cor < 33) DisplayText("horrifies you.");
            else if (player.stats.cor < 66) DisplayText("is a little strange for your tastes.");
            else {
                DisplayText("looks like it might be more fun to receive than use on others.  ");
                if (player.torso.vaginas.count > 0) DisplayText("Maybe you could find someone else with one to ride?");
                else DisplayText("Maybe you should test it out on someone and ask them exactly how it feels?");
            }
            DisplayText("  <b>You now have a bulbous, lizard-like cock.</b>");
            // Actually xform it nau
            if (player.torso.cocks.filter(Cock.HasSheath).length > 0) {
                nonLizzyDick.type = CockType.LIZARD;
                if (player.torso.cocks.filter(Cock.HasSheath).length <= 0)
                    DisplayText("\n\nYour sheath tightens and starts to smooth out, revealing ever greater amounts of your " + CockDescriptor.describeCock(player, nonLizzyDick) + "'s lower portions.  After a few moments <b>your groin is no longer so animalistic - the sheath is gone.</b>");
            }
            else nonLizzyDick.type = CockType.LIZARD;
            changes++;
            player.stats.lib += 3;
            player.stats.lust += 10;
        }
        // (CHANGE OTHER DICK)
        // Requires 1 lizard cock, multiple cocks
        if (player.torso.cocks.count > 1 && player.torso.cocks.filterType(CockType.LIZARD).length > 0 && player.torso.cocks.count > player.torso.cocks.filterType(CockType.LIZARD).length && Utils.rand(4) === 0 && changes < changeLimit) {
            DisplayText("\n\nA familiar tingle starts in your crotch, and before you can miss the show, you pull open your " + player.inventory.equipment.armor.displayName + ".  As if operating on a cue, ");
            const nonLizzyDick: Cock = this.getFirstNonLizzyCock(player);
            if (player.torso.cocks.count === 2) DisplayText("your other dick");
            else DisplayText("another one of your dicks");
            DisplayText(" starts to change into the strange reptilian shape you've grown familiar with.  It warps visibly, trembling and radiating pleasurable feelings back to you as the transformation progresses.  ");
            if (player.cumQ() < 50) DisplayText("pre-cum oozes from the tip");
            else if (player.cumQ() < 700) DisplayText("Thick pre-cum rains from the tip");
            else DisplayText("A wave of pre-cum splatters on the ground");
            DisplayText(" from the pleasure of the change.  In moments <b>you have a bulbous, lizard-like cock.</b>");
            // (REMOVE SHEATH IF NECESSARY)
            if (player.torso.cocks.filter(Cock.HasSheath).length > 0) {
                nonLizzyDick.type = CockType.LIZARD;
                if (player.torso.cocks.filter(Cock.HasSheath).length <= 0)
                    DisplayText("\n\nYour sheath tightens and starts to smooth out, revealing ever greater amounts of your " + CockDescriptor.describeCock(player, nonLizzyDick) + "'s lower portions.  After a few moments <b>your groin is no longer so animalistic - the sheath is gone.</b>");
            }
            else nonLizzyDick.type = CockType.LIZARD;
            changes++;
            player.stats.lib += 3;
            player.stats.lust += 10;
        }
        // -Grows second lizard dick if only 1 dick
        if (player.torso.cocks.filterType(CockType.LIZARD).length === 1 && player.torso.cocks.count === 1 && Utils.rand(4) === 0 && changes < changeLimit) {
            const firstCock = player.torso.cocks.get(0);
            DisplayText("\n\nA knot of pressure forms in your groin, forcing you off your " + LegDescriptor.describeFeet(player) + " as you try to endure it.  You examine the affected area and see a lump starting to bulge under your " + player.skin.desc + ", adjacent to your " + CockDescriptor.describeCock(player, firstCock) + ".  The flesh darkens, turning purple");
            if (player.skin.type === SkinType.FUR || player.skin.type === SkinType.SCALES)
                DisplayText(" and shedding " + player.skin.desc);
            DisplayText(" as the bulge lengthens, pushing out from your body.  Too surprised to react, you can only pant in pain and watch as the fleshy lump starts to take on a penis-like appearance.  <b>You're growing a second lizard-cock!</b>  It doesn't stop growing until it's just as long as its brother and the same shade of shiny purple.  A dribble of cum oozes from its tip, and you feel relief at last.");

            const newCock = new Cock();
            newCock.type = CockType.LIZARD;
            newCock.length = firstCock.length;
            newCock.thickness = firstCock.thickness;
            player.torso.cocks.add(newCock);
            changes++;
            player.stats.lib += 3;
            player.stats.lust += 10;
        }
        // --Worms leave if 100% lizard dicks?
        // Require mammals?
        if (player.torso.cocks.filterType(CockType.LIZARD).length === player.torso.cocks.count && changes < changeLimit && player.statusAffects.has(StatusAffectType.Infested)) {
            DisplayText("\n\nLike rats from a sinking ship, worms escape from your body in a steady stream.  Surprisingly, the sensation is remarkably pleasant, similar to the pleasure of sexual release in a way.  Though they seem inexhaustible, the tiny, cum-slimed invertebrates slow to a trickle.  The larger worm-kin inside you stirs as if disturbed from a nap, coming loose from whatever moorings it had attached itself to in the interior of your form.  It slowly works its way up your urethra, stretching to an almost painful degree with every lurching motion.  Your dick bloats out around the base, stretched like the ovipositor on a bee-girl in order to handle the parasitic creature, but thankfully, the ordeal is a brief one.");
            if (player.torso.balls.quantity > 1) DisplayText("  The remaining " + Utils.numToCardinalText(player.torso.balls.quantity - 1) + " slither out the pre-stretched holes with ease, though the last one hangs from your tip for a moment before dropping to the ground.");
            DisplayText("  The white creature joins its kin on the ground and slowly slithers away.  Perhaps they prefer mammals? In any event, <b>you are no longer infected with worms</b>.");
            player.statusAffects.remove(StatusAffectType.Infested);
            changes++;
        }
        // -Breasts vanish to 0 rating if male
        if (player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 1 && player.gender === 1 && changes < changeLimit && Utils.rand(3) === 0) {
            // (HUEG)
            if (player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 8) {
                DisplayText("\n\nThe flesh on your chest tightens up, losing nearly half its mass in the span of a few seconds.  With your center of balance shifted so suddenly, you stagger about trying not to fall on your ass.  You catch yourself and marvel at the massive change in breast size.");
                // Half tit size
            }
            // (NOT HUEG < 4)
            else DisplayText("\n\nIn an instant, your chest compacts in on itself, consuming every ounce of breast-flesh.  You're left with a  smooth, masculine torso, though your nipples remain.");
            // (BOTH - no new PG)
            DisplayText("  With the change in weight and gravity, you find it's gotten much easier to move about.");
            // Loop through behind the scenes and adjust all tits.
            for (let index: number = 0; index < player.torso.chest.count; index++) {
                const breasts = player.torso.chest.get(index);
                if (breasts.rating > 8)
                    breasts.rating /= 2;
                else
                    breasts.rating = 0;
            }
            // (+2 speed)
            player.stats.lib += 2;
            changes++;
        }
        // -Lactation stoppage.
        if (player.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier >= 1 && changes < changeLimit && Utils.rand(4) === 0) {
            if (player.torso.chest.countNipples() === 2) DisplayText("\n\nBoth of your");
            else DisplayText("\n\nAll of your many");
            DisplayText(" nipples relax.  It's a strange feeling, and you pull back your top to touch one.  It feels fine, though there doesn't seem to be any milk leaking out.  You give it a squeeze and marvel when nothing ");
            if (player.torso.chest.filter(BreastRow.FuckableNipples).length > 0) DisplayText("but sexual fluid ");
            DisplayText("escapes it.  <b>You are no longer lactating.</b>  That makes sense, only mammals lactate!  Smiling, you muse at how much time this will save you when cleaning your gear.");
            if (player.perks.has(PerkType.Feeder) || player.statusAffects.has(StatusAffectType.Feeder)) {
                DisplayText("\n\n(<b>Feeder perk lost!</b>)");
                player.perks.remove(PerkType.Feeder);
                player.statusAffects.remove(StatusAffectType.Feeder);
            }
            changes++;
            // Loop through and reset lactation
            for (let index: number = 0; index < player.torso.chest.count; index++) {
                player.torso.chest.get(index).lactationMultiplier = 0;
            }
        }
        // -Nipples reduction to 1 per tit.
        if (player.torso.chest.reduce(BreastRow.AverageNipplesPerBreast, 0) > 1 && changes < changeLimit && Utils.rand(4) === 0) {
            DisplayText("\n\nA chill runs over your " + BreastDescriptor.describeAllBreasts(player) + " and vanishes.  You stick a hand under your " + player.inventory.equipment.armor.displayName + " and discover that your extra nipples are missing!  You're down to just one per ");
            if (player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating < 1) DisplayText("'breast'.");
            else DisplayText("breast.");
            changes++;
            // Loop through and reset nipples
            for (let index: number = 0; index < player.torso.chest.count; index++) {
                player.torso.chest.get(index).nipples.count = 1;
            }
        }
        // -VAGs
        if (player.torso.vaginas.count > 0 && !player.perks.has(PerkType.Oviposition) && changes < changeLimit && Utils.rand(5) === 0 && RaceScore.lizardScore(player) > 3) {
            DisplayText("\n\nDeep inside yourself there is a change.  It makes you feel a little woozy, but passes quickly.  Beyond that, you aren't sure exactly what just happened, but you are sure it originated from your womb.\n");
            DisplayText("(<b>Perk Gained: Oviposition</b>)");
            player.perks.set(PerkType.Oviposition, PerkFactory.create(PerkType.Oviposition, 0, 0, 0, 0));
            changes++;
        }

        // Physical changes:
        // -Existing horns.amount become draconic, max of 4, max length of 1'
        if (player.torso.neck.head.horns.type !== HornType.DRACONIC_X4_12_INCH_LONG && changes < changeLimit && Utils.rand(5) === 0) {
            // No dragon horns.amount yet.
            if (player.torso.neck.head.horns.type !== HornType.DRACONIC_X2) {
                // Already have horns
                if (player.torso.neck.head.horns.amount > 0) {
                    // High quantity demon horns
                    if (player.torso.neck.head.horns.type === HornType.DEMON && player.torso.neck.head.horns.amount > 4) {
                        DisplayText("\n\nYour horns.amount condense, twisting around each other and merging into larger, pointed protrusions.  By the time they finish you have four draconic-looking horns, each about twelve inches long.");
                        player.torso.neck.head.horns.amount = 12;
                        player.torso.neck.head.horns.type = HornType.DRACONIC_X4_12_INCH_LONG;
                    }
                    else {
                        DisplayText("\n\nYou feel your horns.amount changing and warping, and reach back to touch them.  They have a slight curve and a gradual taper.  They must look something like the horns.amount the dragons in your village's legends always had.");
                        player.torso.neck.head.horns.type = HornType.DRACONIC_X2;
                        if (player.torso.neck.head.horns.amount > 13) {
                            DisplayText("  The change seems to have shrunken the horns, they're about a foot long now.");
                            player.torso.neck.head.horns.amount = 12;
                        }

                    }
                    changes++;
                }
                // No horns
                else {
                    // -If no horns, grow a pair
                    DisplayText("\n\nWith painful pressure, the skin on the sides of your forehead splits around two tiny nub-like horns.  They're angled back in such a way as to resemble those you saw on the dragons in your village's legends.  A few inches of horn sprout from your head before stopping.  <b>You have about four inches of dragon-like horn.</b>");
                    player.torso.neck.head.horns.amount = 4;
                    player.torso.neck.head.horns.type = HornType.DRACONIC_X2;

                    changes++;
                }
            }
            // ALREADY DRAGON
            else {
                if (player.torso.neck.head.horns.type === HornType.DRACONIC_X2) {
                    if (player.torso.neck.head.horns.amount < 12) {
                        if (Utils.rand(2) === 0) {
                            DisplayText("\n\nYou get a headache as an inch of fresh horn escapes from your pounding skull.");
                            player.torso.neck.head.horns.amount += 1;
                        }
                        else {
                            DisplayText("\n\nYour head aches as your horns.amount grow a few inches longer.  They get even thicker about the base, giving you a menacing appearance.");
                            player.torso.neck.head.horns.amount += 2 + Utils.rand(4);
                        }
                        if (player.torso.neck.head.horns.amount >= 12) DisplayText("  <b>Your horns.amount settle down quickly, as if they're reached their full size.</b>");
                        changes++;
                    }
                    // maxxed out, new row
                    else {
                        // --Next horn growth adds second row and brings length up to 12\"
                        DisplayText("\n\nA second row of horns.amount erupts under the first, and though they are narrower, they grow nearly as long as your first row before they stop.  A sense of finality settles over you.  <b>You have as many horns.amount as a lizan can grow.</b>");
                        player.torso.neck.head.horns.type = HornType.DRACONIC_X4_12_INCH_LONG;
                        changes++;
                    }
                }
            }
        }
        // -Hair stops growing!
        if (Flags.list[FlagEnum.HAIR_GROWTH_STOPPED_BECAUSE_LIZARD] === 0 && changes < changeLimit && Utils.rand(4) === 0) {
            DisplayText("\n\nYour scalp tingles oddly.  In a panic, you reach up to your " + HeadDescriptor.describeHair(player) + ", but thankfully it appears unchanged.\n\n");
            DisplayText("(<b>Your hair has stopped growing.</b>)");
            changes++;
            Flags.list[FlagEnum.HAIR_GROWTH_STOPPED_BECAUSE_LIZARD]++;
        }
        // Big physical changes:
        // -Legs - Draconic, clawed feet
        if (player.torso.hips.legs.type !== LegType.LIZARD && changes < changeLimit && Utils.rand(5) === 0) {
            // Hooves -
            if (player.torso.hips.legs.type === LegType.HOOFED) DisplayText("\n\nYou scream in agony as you feel your hooves crack and break apart, beginning to rearrange.  Your legs change to a digitigrade shape while your feet grow claws and shift to have three toes on the front and a smaller toe on the heel.");
            // TAURS -
            else if (player.torso.hips.legs.type === LegType.CENTAUR) DisplayText("\n\nYour lower body is wracked by pain!  Once it passes, you discover that you're standing on digitigrade legs with lizard-like claws.");
            // feet types -
            else if (player.torso.hips.legs.type === LegType.HUMAN || player.torso.hips.legs.type === LegType.DOG || player.torso.hips.legs.type === LegType.DEMONIC_HIGH_HEELS || player.torso.hips.legs.type === LegType.DEMONIC_CLAWS || player.torso.hips.legs.type === LegType.BEE || player.torso.hips.legs.type === LegType.CAT) DisplayText("\n\nYou scream in agony as you feel the bones in your legs break and begin to rearrange. They change to a digitigrade shape while your feet grow claws and shift to have three toes on the front and a smaller toe on the heel.");
            // Else -
            else DisplayText("\n\nPain rips through your " + LegDescriptor.describeLegs(player) + ", morphing and twisting them until the bones rearrange into a digitigrade configuration.  The strange legs have three-toed, clawed feet, complete with a small vestigial claw-toe on the back for added grip.");
            DisplayText("  <b>You have reptilian legs and claws!</b>");
            player.torso.hips.legs.type = LegType.LIZARD;
            changes++;
        }
        // -Tail - sinuous lizard tail
        if (player.torso.tails.filterType(TailType.LIZARD).length > 0 && player.torso.hips.legs.type === LegType.LIZARD && changes < changeLimit && Utils.rand(5) === 0) {
            // No tail
            if (player.torso.tails.count >= 1) DisplayText("\n\nYou drop onto the ground as your spine twists and grows, forcing the flesh above your " + ButtDescriptor.describeButt(player) + " to bulge out.  New bones form, one after another, building a tapered, prehensile tail onto the back of your body.  <b>You now have a reptilian tail!</b>");
            // Yes tail
            else DisplayText("\n\nYou drop to the ground as your tail twists and grows, changing its shape in order to gradually taper to a point.  It flicks back and forth, prehensile and totally under your control.  <b>You now have a reptilian tail.</b>");
            player.torso.tails.clear();
            player.torso.tails.add(new Tail(TailType.LIZARD));
            changes++;
        }
        // Remove odd eyes
        if (changes < changeLimit && Utils.rand(5) === 0 && player.torso.neck.head.face.eyes.type > EyeType.HUMAN) {
            if (player.torso.neck.head.face.eyes.type === EyeType.BLACK_EYES_SAND_TRAP) {
                DisplayText("\n\nYou feel a twinge in your eyes and you blink.  It feels like black cataracts have just fallen away from you, and you know without needing to see your reflection that your eyes have gone back to looking human.");
            }
            else {
                DisplayText("\n\nYou blink and stumble, a wave of vertigo threatening to pull your " + LegDescriptor.describeFeet(player) + " from under you.  As you steady and open your eyes, you realize something seems different.  Your vision is changed somehow.");
                if (player.torso.neck.head.face.eyes.type === EyeType.FOUR_SPIDER_EYES) DisplayText("  Your multiple, arachnid eyes are gone!</b>");
                DisplayText("  <b>You have normal, humanoid eyes again.</b>");
            }
            player.torso.neck.head.face.eyes.type = EyeType.HUMAN;
            changes++;
        }
        // -Ears become smaller nub-like openings?
        if (player.torso.neck.head.ears.type !== EarType.LIZARD && player.torso.tails.filterType(TailType.LIZARD).length >= 1 && player.torso.hips.legs.type === LegType.LIZARD && changes < changeLimit && Utils.rand(5) === 0) {
            DisplayText("\n\nTightness centers on your scalp, pulling your ears down from their normal, fleshy shape into small, scaley bumps with holes in their centers.  <b>You have reptilian ears!</b>");
            player.torso.neck.head.ears.type = EarType.LIZARD;
            changes++;
        }
        // -Scales - color changes to red, green, white, blue, or black.  Rarely: purple or silver.
        if (player.skin.type !== SkinType.SCALES && player.torso.neck.head.ears.type === EarType.LIZARD && player.torso.tails.filterType(TailType.LIZARD).length >= 1 && player.torso.hips.legs.type === LegType.LIZARD && changes < changeLimit && Utils.rand(5) === 0) {
            // (fur)
            if (player.skin.type === SkinType.FUR) {
                // set new skin.tone
                if (Utils.rand(10) === 0) {
                    if (Utils.rand(2) === 0) player.skin.tone = "purple";
                    else player.skin.tone = "silver";
                }
                // non rare skin.tone
                else {
                    const chance: number = Utils.rand(5);
                    if (chance === 0) player.skin.tone = "red";
                    else if (chance === 1) player.skin.tone = "green";
                    else if (chance === 2) player.skin.tone = "white";
                    else if (chance === 3) player.skin.tone = "blue";
                    else player.skin.tone = "black";
                }
                DisplayText("\n\nYou scratch yourself, and come away with a large clump of " + player.torso.neck.head.hair.color + " fur.  Panicked, you look down and realize that your fur is falling out in huge clumps.  It itches like mad, and you scratch your body relentlessly, shedding the remaining fur with alarming speed.  Underneath the fur your skin feels incredibly smooth, and as more and more of the stuff comes off, you discover a seamless layer of " + player.skin.tone + " scales covering most of your body.  The rest of the fur is easy to remove.  <b>You're now covered in scales from head to toe.</b>");
            }
            // (no fur)
            else {
                DisplayText("\n\nYou idly reach back to scratch yourself and nearly jump out of your " + player.inventory.equipment.armor.displayName + " when you hit something hard.  A quick glance down reveals that scales are growing out of your " + player.skin.tone + " skin with alarming speed.  As you watch, the surface of your skin is covered in smooth scales.  They interlink together so well that they may as well be seamless.  You peel back your " + player.inventory.equipment.armor.displayName + " and the transformation has already finished on the rest of your body.  <b>You're covered from head to toe in shiny ");
                // set new skin.tone
                if (Utils.rand(10) === 0) {
                    if (Utils.rand(2) === 0) player.skin.tone = "purple";
                    else player.skin.tone = "silver";
                }
                // non rare skin.tone
                else {
                    const chance: number = Utils.rand(5);
                    if (chance === 0) player.skin.tone = "red";
                    else if (chance === 1) player.skin.tone = "green";
                    else if (chance === 2) player.skin.tone = "white";
                    else if (chance === 3) player.skin.tone = "blue";
                    else player.skin.tone = "black";
                }
                DisplayText(player.skin.tone + " scales.</b>");
            }
            player.skin.type = SkinType.SCALES;
            player.skin.desc = "scales";
            changes++;
        }
        // -Lizard-like face.
        if (player.torso.neck.head.face.type !== FaceType.LIZARD && player.skin.type === SkinType.SCALES && player.torso.neck.head.ears.type === EarType.LIZARD && player.torso.tails.filterType(TailType.LIZARD).length >= 1 && player.torso.hips.legs.type === LegType.LIZARD && changes < changeLimit && Utils.rand(5) === 0) {
            DisplayText("\n\nTerrible agony wracks your " + FaceDescriptor.describeFace(player) + " as bones crack and shift.  Your jawbone rearranges while your cranium shortens.  The changes seem to last forever; once they've finished, no time seems to have passed.  Your fingers brush against your toothy snout as you get used to your new face.  It seems <b>you have a toothy, reptilian visage now.</b>");
            player.torso.neck.head.face.type = FaceType.LIZARD;
        }
        if (Utils.rand(4) === 0 && player.torso.neck.gills && changes < changeLimit) {
            DisplayText("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.");
            player.torso.neck.gills = false;
            changes++;
        }
        // FAILSAFE CHANGE
        if (changes === 0) {
            DisplayText("\n\nInhuman vitality spreads through your body, invigorating you!\n");
            StatModifier.displayCharacterHPChange(player, 50);
            player.stats.lust += 3;
        }
    }
}
