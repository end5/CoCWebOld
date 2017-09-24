import Consumable from "./Consumable";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";
import Utils from "../../Utilities/Utils";

export default class Reptilum extends Consumable {
    public constructor() {
        super("Smart T", "Scholars T.", "a cup of scholar's tea", 0, "This powerful brew supposedly has mind-strengthening effects.");
    }

    public use(player: Player) {
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
        if (Flags.get(FlagEnum.HAIR.GROWTH_STOPPED_BECAUSE_LIZARD) == 0 && changes < changeLimit && Utils.rand(4) == 0) {
            MainScreen.text("\n\nYour scalp tingles oddly.  In a panic, you reach up to your " + hairDescript() + ", but thankfully it appears unchanged.\n\n", false);
            MainScreen.text("(<b>Your hair has stopped growing.</b>)", false);
            changes++;
            Flags.get(FlagEnum.HAIR.GROWTH_STOPPED_BECAUSE_LIZARD)++;
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
}