import Consumable from './Consumable';
import Cock, { CockType } from '../../Body/Cock';
import { SkinType } from '../../Body/Creature';
import { EyeType, FaceType } from '../../Body/Face';
import { EarType, HornType } from '../../Body/Head';
import { LowerBodyType, TailType } from '../../Body/LowerBody';
import BreastDescriptor from '../../Descriptors/BreastDescriptor';
import ButtDescriptor from '../../Descriptors/ButtDescriptor';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import HeadDescriptor from '../../Descriptors/HeadDescriptor';
import LowerBodyDescriptor from '../../Descriptors/LowerBodyDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import CreatureChange from '../../display/CreatureChange';
import MainScreen from '../../display/MainScreen';
import Perk from '../../Effects/Perk';
import Flags, { FlagEnum } from '../../Game/Flags';
import Player from '../../Player';
import RaceScore from '../../RaceScore';
import Utils from '../../Utilities/Utils';

export default class Reptilum extends Consumable {
    public constructor() {
        super("Reptlum", "Reptlum", "a vial of Reptilum", Reptilum.DefaultValue, "This is a rounded bottle with a small label that reads, \"<i>Reptilum</i>\".  It is likely this potion is tied to reptiles in some way.");
    }

    private getFirstNonLizzyCock(player: Player): Cock {
        for (let index: number = 0; index < player.lowerBody.cockSpot.count(); index++) {
            if (player.lowerBody.cockSpot.get(index).cockType != CockType.LIZARD) {
                return player.lowerBody.cockSpot.get(index);
            }
        }
    }

    public use(player: Player) {
        player.slimeFeed();
        //init variables
        let changes: number = 0;
        let changeLimit: number = 1;
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
            player.stats.spe += -1;
            changes++;
        }
        //-Reduces sensitivity.
        if (player.stats.sens > 20 && changes < changeLimit && Utils.rand(3) == 0) {
            MainScreen.text("\n\nThe sensation of prickly pins and needles moves over your body, leaving your senses a little dulled in its wake.", false);
            player.stats.sens += -1;
            changes++;
        }
        //Raises libido greatly to 50, then somewhat to 75, then slowly to 100.
        if (player.stats.lib < 100 && changes < changeLimit && Utils.rand(3) == 0) {
            MainScreen.text("\n\nA knot of fire in your gut doubles you over but passes after a few moments.  As you straighten you can feel the heat seeping into you, ", false);
            //(DICK)
            if (player.lowerBody.cockSpot.count() > 0 && (player.gender != 3 || Utils.rand(2) == 0)) {
                MainScreen.text("filling ", false);
                if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("each of ", false);
                MainScreen.text("your " + CockDescriptor.describeMultiCockShort(player) + " with the desire to breed.  You get a bit hornier when you realize your sex-drive has gotten a boost.", false);
            }
            //(COOCH)
            else if (player.lowerBody.vaginaSpot.hasVagina())
                MainScreen.text("puddling in your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + ".  An instinctive desire to mate and lay eggs spreads through you, increasing your lust and boosting your sex-drive.", false);
            //(TARDS)
            else MainScreen.text("puddling in your featureless crotch for a split-second before it slides into your " + ButtDescriptor.describeButt(player) + ".  You want to be fucked, filled, and perhaps even gain a proper gender again.  Through the lust you realize your sex-drive has been permanently increased.", false);
            //+3 lib if less than 50
            if (player.stats.lib < 50) player.stats.lib += 1;
            //+2 lib if less than 75
            if (player.stats.lib < 75) player.stats.lib += 1;
            //+1 if above 75.
            player.stats.lib += 1;
            changes++;
        }
        //-Raises toughness to 70
        //(+3 to 40, +2 to 55, +1 to 70)
        if (player.stats.tou < 70 && changes < changeLimit && Utils.rand(3) == 0) {
            //(+3)
            if (player.stats.tou < 40) {
                MainScreen.text("\n\nYour body and skin both thicken noticeably.  You pinch your " + player.skinDesc + " experimentally and marvel at how much tougher your hide has gotten.", false);
                player.stats.tou += 3;
            }
            //(+2)
            else if (player.stats.tou < 55) {
                MainScreen.text("\n\nYou grin as you feel your form getting a little more solid.  It seems like your whole body is toughening up quite nicely, and by the time the sensation goes away, you feel ready to take a hit.", false);
                player.stats.tou += 2;
            }
            //(+1)
            else {
                MainScreen.text("\n\nYou snarl happily as you feel yourself getting even tougher.  It's a barely discernible difference, but you can feel your " + player.skinDesc + " getting tough enough to make you feel invincible.", false);
                player.stats.tou += 1;
            }
            changes++;
        }

        //Sexual Changes:
        //-Lizard dick - first one
        if (!player.lowerBody.cockSpot.hasCockType(CockType.LIZARD) && player.lowerBody.cockSpot.hasCock() && changes < changeLimit && Utils.rand(4) == 0) {
            //Find the first non-lizzy dick
            let nonLizzyDick: Cock = this.getFirstNonLizzyCock(player);
            MainScreen.text("\n\nA slow tingle warms your groin.  Before it can progress any further, you yank back your " + player.inventory.armor.displayName + " to investigate.  Your " + CockDescriptor.describeCock(player, nonLizzyDick) + " is changing!  It ripples loosely from ", false);
            if (player.lowerBody.cockSpot.hasSheath()) MainScreen.text("sheath ", false);
            else MainScreen.text("base ", false);
            MainScreen.text("to tip, undulating and convulsing as its color lightens, darkens, and finally settles on a purplish hue.  Your " + CockDescriptor.nounCock(CockType.HUMAN) + " resolves itself into a bulbous form, with a slightly pointed tip.  The 'bulbs' throughout its shape look like they would provide an interesting ride for your sexual partners, but the perverse, alien pecker ", false);
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
                nonLizzyDick.cockType = CockType.LIZARD;
                if (!player.lowerBody.cockSpot.hasSheath())
                    MainScreen.text("\n\nYour sheath tightens and starts to smooth out, revealing ever greater amounts of your " + CockDescriptor.describeCock(player, nonLizzyDick) + "'s lower portions.  After a few moments <b>your groin is no longer so animalistic � the sheath is gone.</b>", false);
            }
            else nonLizzyDick.cockType = CockType.LIZARD;
            changes++;
            player.stats.lib += 3;
            player.stats.lust += 10;
        }
        //(CHANGE OTHER DICK)
        //Requires 1 lizard cock, multiple cocks
        if (player.lowerBody.cockSpot.count() > 1 && player.lowerBody.cockSpot.countType(CockType.LIZARD) > 0 && player.lowerBody.cockSpot.count() > player.lowerBody.cockSpot.countType(CockType.LIZARD) && Utils.rand(4) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nA familiar tingle starts in your crotch, and before you can miss the show, you pull open your " + player.inventory.armor.displayName + ".  As if operating on a cue, ", false);
            let nonLizzyDick: Cock = this.getFirstNonLizzyCock(player);
            if (player.lowerBody.cockSpot.count() == 2) MainScreen.text("your other dick", false);
            else MainScreen.text("another one of your dicks", false);
            MainScreen.text(" starts to change into the strange reptilian shape you've grown familiar with.  It warps visibly, trembling and radiating pleasurable feelings back to you as the transformation progresses.  ", false);
            if (player.cumQ() < 50) MainScreen.text("pre-cum oozes from the tip", false);
            else if (player.cumQ() < 700) MainScreen.text("Thick pre-cum rains from the tip", false);
            else MainScreen.text("A wave of pre-cum splatters on the ground", false);
            MainScreen.text(" from the pleasure of the change.  In moments <b>you have a bulbous, lizard-like cock.</b>", false);
            //(REMOVE SHEATH IF NECESSARY)
            if (player.lowerBody.cockSpot.hasSheath()) {
                nonLizzyDick.cockType = CockType.LIZARD;
                if (!player.lowerBody.cockSpot.hasSheath())
                    MainScreen.text("\n\nYour sheath tightens and starts to smooth out, revealing ever greater amounts of your " + CockDescriptor.describeCock(player, nonLizzyDick) + "'s lower portions.  After a few moments <b>your groin is no longer so animalistic � the sheath is gone.</b>", false);
            }
            else nonLizzyDick.cockType = CockType.LIZARD;
            changes++;
            player.stats.lib += 3;
            player.stats.lust += 10;
        }
        //-Grows second lizard dick if only 1 dick
        if (player.lowerBody.cockSpot.countType(CockType.LIZARD) == 1 && player.lowerBody.cockSpot.count() == 1 && Utils.rand(4) == 0 && changes < changeLimit) {
            const firstCock = player.lowerBody.cockSpot.get(0);
            MainScreen.text("\n\nA knot of pressure forms in your groin, forcing you off your " + LowerBodyDescriptor.describeFeet(player) + " as you try to endure it.  You examine the affected area and see a lump starting to bulge under your " + player.skinDesc + ", adjacent to your " + CockDescriptor.describeCock(player, firstCock) + ".  The flesh darkens, turning purple", false);
            if (player.skinType == SkinType.FUR || player.skinType == SkinType.SCALES)
                MainScreen.text(" and shedding " + player.skinDesc, false);
            MainScreen.text(" as the bulge lengthens, pushing out from your body.  Too surprised to react, you can only pant in pain and watch as the fleshy lump starts to take on a penis-like appearance.  <b>You're growing a second lizard-cock!</b>  It doesn't stop growing until it's just as long as its brother and the same shade of shiny purple.  A dribble of cum oozes from its tip, and you feel relief at last.", false);

            let newCock = new Cock();
            newCock.cockType = CockType.LIZARD;
            newCock.cockLength = firstCock.cockLength;
            newCock.cockThickness = firstCock.cockThickness;
            player.lowerBody.cockSpot.add(newCock);
            changes++;
            player.stats.lib += 3;
            player.stats.lust += 10;
        }
        //--Worms leave if 100% lizard dicks?
        //Require mammals?
        if (player.lowerBody.cockSpot.countType(CockType.LIZARD) == player.lowerBody.cockSpot.count() && changes < changeLimit && player.statusAffects.has("Infested")) {
            MainScreen.text("\n\nLike rats from a sinking ship, worms escape from your body in a steady stream.  Surprisingly, the sensation is remarkably pleasant, similar to the pleasure of sexual release in a way.  Though they seem inexhaustible, the tiny, cum-slimed invertebrates slow to a trickle.  The larger worm-kin inside you stirs as if disturbed from a nap, coming loose from whatever moorings it had attached itself to in the interior of your form.  It slowly works its way up your urethra, stretching to an almost painful degree with every lurching motion.  Your dick bloats out around the base, stretched like the ovipositor on a bee-girl in order to handle the parasitic creature, but thankfully, the ordeal is a brief one.", false);
            if (player.lowerBody.balls > 1) MainScreen.text("  The remaining " + Utils.numToCardinalText(player.lowerBody.balls - 1) + " slither out the pre-stretched holes with ease, though the last one hangs from your tip for a moment before dropping to the ground.", false);
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
            //(BOTH � no new PG)
            MainScreen.text("  With the change in weight and gravity, you find it's gotten much easier to move about.", false);
            //Loop through behind the scenes and adjust all tits.
            for (let index: number = 0; index < player.upperBody.chest.count(); index++) {
                let breasts = player.upperBody.chest.get(index);
                if (breasts.breastRating > 8)
                    breasts.breastRating /= 2;
                else 
                    breasts.breastRating = 0;
            }
            //(+2 speed)
            player.stats.lib += 2;
            changes++;
        }
        //-Lactation stoppage.
        if (player.upperBody.chest.LactationMultipierLargest[0].lactationMultiplier >= 1 && changes < changeLimit && Utils.rand(4) == 0) {
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
            for (let index: number = 0; index < player.upperBody.chest.count(); index++) {
                player.upperBody.chest.get(index).lactationMultiplier = 0;
            }
        }
        //-Nipples reduction to 1 per tit.
        if (player.upperBody.chest.averageNipplesPerBreast() > 1 && changes < changeLimit && Utils.rand(4) == 0) {
            MainScreen.text("\n\nA chill runs over your " + BreastDescriptor.describeAllBreasts(player) + " and vanishes.  You stick a hand under your " + player.inventory.armor.displayName + " and discover that your extra nipples are missing!  You're down to just one per ", false);
            if (player.upperBody.chest.BreastRatingLargest[0].breastRating < 1) MainScreen.text("'breast'.", false);
            else MainScreen.text("breast.", false);
            changes++;
            //Loop through and reset nipples
            for (let index: number = 0; index < player.upperBody.chest.count(); index++) {
                player.upperBody.chest.get(index).nipplesPerBreast = 1;
            }
        }
        //-VAGs
        if (player.lowerBody.vaginaSpot.hasVagina() && !player.perks.has("Oviposition") && changes < changeLimit && Utils.rand(5) == 0 && RaceScore.lizardScore(player) > 3) {
            MainScreen.text("\n\nDeep inside yourself there is a change.  It makes you feel a little woozy, but passes quickly.  Beyond that, you aren't sure exactly what just happened, but you are sure it originated from your womb.\n", false);
            MainScreen.text("(<b>Perk Gained: Oviposition</b>)", false);
            player.perks.add(new Perk("Oviposition", 0, 0, 0, 0));
            changes++;
        }

        //Physical changes:
        //-Existing horns become draconic, max of 4, max length of 1'
        if (player.upperBody.head.hornType != HornType.DRACONIC_X4_12_INCH_LONG && changes < changeLimit && Utils.rand(5) == 0) {
            //No dragon horns yet.
            if (player.upperBody.head.hornType != HornType.DRACONIC_X2) {
                //Already have horns
                if (player.upperBody.head.horns > 0) {
                    //High quantity demon horns
                    if (player.upperBody.head.hornType == HornType.DEMON && player.upperBody.head.horns > 4) {
                        MainScreen.text("\n\nYour horns condense, twisting around each other and merging into larger, pointed protrusions.  By the time they finish you have four draconic-looking horns, each about twelve inches long.", false);
                        player.upperBody.head.horns = 12;
                        player.upperBody.head.hornType = HornType.DRACONIC_X4_12_INCH_LONG;
                    }
                    else {
                        MainScreen.text("\n\nYou feel your horns changing and warping, and reach back to touch them.  They have a slight curve and a gradual taper.  They must look something like the horns the dragons in your village's legends always had.", false);
                        player.upperBody.head.hornType = HornType.DRACONIC_X2;
                        if (player.upperBody.head.horns > 13) {
                            MainScreen.text("  The change seems to have shrunken the horns, they're about a foot long now.", false);
                            player.upperBody.head.horns = 12;
                        }

                    }
                    changes++;
                }
                //No horns
                else {
                    //-If no horns, grow a pair
                    MainScreen.text("\n\nWith painful pressure, the skin on the sides of your forehead splits around two tiny nub-like horns.  They're angled back in such a way as to resemble those you saw on the dragons in your village's legends.  A few inches of horn sprout from your head before stopping.  <b>You have about four inches of dragon-like horn.</b>", false);
                    player.upperBody.head.horns = 4;
                    player.upperBody.head.hornType = HornType.DRACONIC_X2;

                    changes++;
                }
            }
            //ALREADY DRAGON
            else {
                if (player.upperBody.head.hornType == HornType.DRACONIC_X2) {
                    if (player.upperBody.head.horns < 12) {
                        if (Utils.rand(2) == 0) {
                            MainScreen.text("\n\nYou get a headache as an inch of fresh horn escapes from your pounding skull.", false);
                            player.upperBody.head.horns += 1;
                        }
                        else {
                            MainScreen.text("\n\nYour head aches as your horns grow a few inches longer.  They get even thicker about the base, giving you a menacing appearance.", false);
                            player.upperBody.head.horns += 2 + Utils.rand(4);
                        }
                        if (player.upperBody.head.horns >= 12) MainScreen.text("  <b>Your horns settle down quickly, as if they're reached their full size.</b>", false);
                        changes++;
                    }
                    //maxxed out, new row
                    else {
                        //--Next horn growth adds second row and brings length up to 12\"
                        MainScreen.text("\n\nA second row of horns erupts under the first, and though they are narrower, they grow nearly as long as your first row before they stop.  A sense of finality settles over you.  <b>You have as many horns as a lizan can grow.</b>", false);
                        player.upperBody.head.hornType = HornType.DRACONIC_X4_12_INCH_LONG;
                        changes++;
                    }
                }
            }
        }
        //-Hair stops growing!
        if (Flags.list[FlagEnum.HAIR_GROWTH_STOPPED_BECAUSE_LIZARD] == 0 && changes < changeLimit && Utils.rand(4) == 0) {
            MainScreen.text("\n\nYour scalp tingles oddly.  In a panic, you reach up to your " + HeadDescriptor.describeHair(player) + ", but thankfully it appears unchanged.\n\n", false);
            MainScreen.text("(<b>Your hair has stopped growing.</b>)", false);
            changes++;
            Flags.list[FlagEnum.HAIR_GROWTH_STOPPED_BECAUSE_LIZARD]++;
        }
        //Big physical changes:
        //-Legs � Draconic, clawed feet
        if (player.lowerBody.type != LowerBodyType.LIZARD && changes < changeLimit && Utils.rand(5) == 0) {
            //Hooves -
            if (player.lowerBody.type == LowerBodyType.HOOFED) MainScreen.text("\n\nYou scream in agony as you feel your hooves crack and break apart, beginning to rearrange.  Your legs change to a digitigrade shape while your feet grow claws and shift to have three toes on the front and a smaller toe on the heel.", false);
            //TAURS -
            else if (player.lowerBody.type == LowerBodyType.CENTAUR) MainScreen.text("\n\nYour lower body is wracked by pain!  Once it passes, you discover that you're standing on digitigrade legs with lizard-like claws.", false);
            //feet types -
            else if (player.lowerBody.type == LowerBodyType.HUMAN || player.lowerBody.type == LowerBodyType.DOG || player.lowerBody.type == LowerBodyType.DEMONIC_HIGH_HEELS || player.lowerBody.type == LowerBodyType.DEMONIC_CLAWS || player.lowerBody.type == LowerBodyType.BEE || player.lowerBody.type == LowerBodyType.CAT) MainScreen.text("\n\nYou scream in agony as you feel the bones in your legs break and begin to rearrange. They change to a digitigrade shape while your feet grow claws and shift to have three toes on the front and a smaller toe on the heel.", false);
            //Else �
            else MainScreen.text("\n\nPain rips through your " + LowerBodyDescriptor.describeLegs(player) + ", morphing and twisting them until the bones rearrange into a digitigrade configuration.  The strange legs have three-toed, clawed feet, complete with a small vestigial claw-toe on the back for added grip.", false);
            MainScreen.text("  <b>You have reptilian legs and claws!</b>", false);
            player.lowerBody.type = LowerBodyType.LIZARD;
            changes++;
        }
        //-Tail � sinuous lizard tail
        if (player.lowerBody.tailType != TailType.LIZARD && player.lowerBody.type == LowerBodyType.LIZARD && changes < changeLimit && Utils.rand(5) == 0) {
            //No tail
            if (player.lowerBody.tailType == TailType.NONE) MainScreen.text("\n\nYou drop onto the ground as your spine twists and grows, forcing the flesh above your " + ButtDescriptor.describeButt(player) + " to bulge out.  New bones form, one after another, building a tapered, prehensile tail onto the back of your body.  <b>You now have a reptilian tail!</b>", false);
            //Yes tail
            else MainScreen.text("\n\nYou drop to the ground as your tail twists and grows, changing its shape in order to gradually taper to a point.  It flicks back and forth, prehensile and totally under your control.  <b>You now have a reptilian tail.</b>", false);
            player.lowerBody.tailType = TailType.LIZARD;
            changes++;
        }
        //Remove odd eyes
        if (changes < changeLimit && Utils.rand(5) == 0 && player.upperBody.head.face.eyeType > EyeType.HUMAN) {
            if (player.upperBody.head.face.eyeType == EyeType.BLACK_EYES_SAND_TRAP) {
                MainScreen.text("\n\nYou feel a twinge in your eyes and you blink.  It feels like black cataracts have just fallen away from you, and you know without needing to see your reflection that your eyes have gone back to looking human.");
            }
            else {
                MainScreen.text("\n\nYou blink and stumble, a wave of vertigo threatening to pull your " + LowerBodyDescriptor.describeFeet(player) + " from under you.  As you steady and open your eyes, you realize something seems different.  Your vision is changed somehow.", false);
                if (player.upperBody.head.face.eyeType == EyeType.FOUR_SPIDER_EYES) MainScreen.text("  Your multiple, arachnid eyes are gone!</b>", false);
                MainScreen.text("  <b>You have normal, humanoid eyes again.</b>", false);
            }
            player.upperBody.head.face.eyeType = EyeType.HUMAN;
            changes++;
        }
        //-Ears become smaller nub-like openings?
        if (player.upperBody.head.earType != EarType.LIZARD && player.lowerBody.tailType == TailType.LIZARD && player.lowerBody.type == LowerBodyType.LIZARD && changes < changeLimit && Utils.rand(5) == 0) {
            MainScreen.text("\n\nTightness centers on your scalp, pulling your ears down from their normal, fleshy shape into small, scaley bumps with holes in their centers.  <b>You have reptilian ears!</b>", false);
            player.upperBody.head.earType = EarType.LIZARD;
            changes++;
        }
        //-Scales � color changes to red, green, white, blue, or black.  Rarely: purple or silver.
        if (player.skinType != SkinType.SCALES && player.upperBody.head.earType == EarType.LIZARD && player.lowerBody.tailType == TailType.LIZARD && player.lowerBody.type == LowerBodyType.LIZARD && changes < changeLimit && Utils.rand(5) == 0) {
            //(fur)
            if (player.skinType == SkinType.FUR) {
                //set new skinTone
                if (Utils.rand(10) == 0) {
                    if (Utils.rand(2) == 0) player.skinTone = "purple";
                    else player.skinTone = "silver";
                }
                //non rare skinTone
                else {
                    const chance: number = Utils.rand(5);
                    if (chance == 0) player.skinTone = "red";
                    else if (chance == 1) player.skinTone = "green";
                    else if (chance == 2) player.skinTone = "white";
                    else if (chance == 3) player.skinTone = "blue";
                    else player.skinTone = "black";
                }
                MainScreen.text("\n\nYou scratch yourself, and come away with a large clump of " + player.upperBody.head.hairColor + " fur.  Panicked, you look down and realize that your fur is falling out in huge clumps.  It itches like mad, and you scratch your body relentlessly, shedding the remaining fur with alarming speed.  Underneath the fur your skin feels incredibly smooth, and as more and more of the stuff comes off, you discover a seamless layer of " + player.skinTone + " scales covering most of your body.  The rest of the fur is easy to remove.  <b>You're now covered in scales from head to toe.</b>", false);
            }
            //(no fur)
            else {
                MainScreen.text("\n\nYou idly reach back to scratch yourself and nearly jump out of your " + player.inventory.armor.displayName + " when you hit something hard.  A quick glance down reveals that scales are growing out of your " + player.skinTone + " skin with alarming speed.  As you watch, the surface of your skin is covered in smooth scales.  They interlink together so well that they may as well be seamless.  You peel back your " + player.inventory.armor.displayName + " and the transformation has already finished on the rest of your body.  <b>You're covered from head to toe in shiny ", false);
                //set new skinTone
                if (Utils.rand(10) == 0) {
                    if (Utils.rand(2) == 0) player.skinTone = "purple";
                    else player.skinTone = "silver";
                }
                //non rare skinTone
                else {
                    const chance: number = Utils.rand(5);
                    if (chance == 0) player.skinTone = "red";
                    else if (chance == 1) player.skinTone = "green";
                    else if (chance == 2) player.skinTone = "white";
                    else if (chance == 3) player.skinTone = "blue";
                    else player.skinTone = "black";
                }
                MainScreen.text(player.skinTone + " scales.</b>", false);
            }
            player.skinType = SkinType.SCALES;
            player.skinDesc = "scales";
            changes++;
        }
        //-Lizard-like face.
        if (player.upperBody.head.face.faceType != FaceType.LIZARD && player.skinType == SkinType.SCALES && player.upperBody.head.earType == EarType.LIZARD && player.lowerBody.tailType == TailType.LIZARD && player.lowerBody.type == LowerBodyType.LIZARD && changes < changeLimit && Utils.rand(5) == 0) {
            MainScreen.text("\n\nTerrible agony wracks your " + HeadDescriptor.describeFace(player) + " as bones crack and shift.  Your jawbone rearranges while your cranium shortens.  The changes seem to last forever; once they've finished, no time seems to have passed.  Your fingers brush against your toothy snout as you get used to your new face.  It seems <b>you have a toothy, reptilian visage now.</b>", false);
            player.upperBody.head.face.faceType = FaceType.LIZARD;
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
    }
}