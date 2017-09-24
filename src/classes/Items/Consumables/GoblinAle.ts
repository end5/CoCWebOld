import Consumable from "./Consumable";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";
import Utils from "../../Utilities/Utils";

export default class GoblinAle extends Consumable {
    public constructor() {
        super("Smart T", "Scholars T.", "a cup of scholar's tea", 0, "This powerful brew supposedly has mind-strengthening effects.");
    }

    public use(player: Player) {
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
            MainScreen.text("\n\nAs you down the potent ale, your head begins to feel heavier - and not just from the alcohol!  Reaching up, you notice your tentacles becoming soft and somewhat fibrous.  Pulling one down reveals that it feels smooth, silky, and fibrous; you watch as it dissolves into many thin, hair-like stUtils.Utils.rands.  <b>Your hair is now back to normal!</b>", false);
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
        else if (player.lowerBody.cockSpot.count() == 1 && Utils.rand(2) == 0 && changes < changeLimit && !Flags.get(FlagEnum.HYPER_HAPPY)) {
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
}