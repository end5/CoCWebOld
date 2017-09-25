import Consumable from "./Consumable";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";
import Utils from "../../Utilities/Utils";

export default class FerretFruit extends Consumable {
    public constructor() {
        super("Smart T", "Scholars T.", "a cup of scholar's tea", 0, "This powerful brew supposedly has mind-strengthening effects.");
    }

    public use(player: Player) {
        //CoC Ferret TF (Ferret Fruit)
        //Finding Ferret Fruit
        //- Ferret Fruit may be Utils.randomly found while exploring the plains.
        //- Upon finding Ferret Fruit: �While searching the plains, you find an odd little tree with a curved trunk. The shape of its fruit appears to mimic that of the tree. A few of the fruits seem to have fallen off. You brush the dirt off of one of the fruits before placing in in your (x) pouch. (if there is no room in your inventory, you get the generic option to use now or abandon)
        //- If you hover over the fruit in your inventory, this is its description:  �This fruit is curved oddly, just like the tree it came from.  The skin is fuzzy and brown, like the skin of a peach.�
        //-Upon eating the fruit:
        MainScreen.clearText();
        MainScreen.text("Feeling parched, you gobble down the fruit without much hesitation. Despite the skin being fuzzy like a peach, the inside is relatively hard, and its taste reminds you of that of an apple.  It even has a core like an apple. Finished, you toss the core aside.");

        //BAD END:
        if (player.ferretScore() >= 6) {
            //Get warned!
            if (Flags.get(FlagEnum.FERRET_BAD_END_WARNING) == 0) {
                MainScreen.text("\n\nYou find yourself staring off into the distance, dreaming idly of chasing rabbits through a warren.  You shake your head, returning to reality.  <b>Perhaps you should cut back on all the Ferret Fruit?</b>");
                player.stats.int -= 5 + Utils.rand(3);
                if (player.stats.int < 5) player.stats.int = 5;
                Flags.get(FlagEnum.FERRET_BAD_END_WARNING) = 1;
            }
            //BEEN WARNED! BAD END! DUN DUN DUN
            else if (Utils.rand(3) == 0) {
                //-If you fail to heed the warning, it�s game over:
                MainScreen.text("\n\nAs you down the fruit, you begin to feel all warm and fuzzy inside.  You flop over on your back, eagerly removing your clothes.  You laugh giddily, wanting nothing more than to roll about happily in the grass.  Finally finished, you attempt to get up, but something feels...  different.  Try as you may, you find yourself completely unable to stand upright for a long period of time.  You only manage to move about comfortably on all fours.  Your body now resembles that of a regular ferret.  That can�t be good!  As you attempt to comprehend your situation, you find yourself less and less able to focus on the problem.  Your attention eventually drifts to a rabbit in the distance.  You lick your lips. Nevermind that, you have warrens to raid!");
                getGame().gameOver();
                return;
            }
        }
        //Reset the warning if ferret score drops.
        else {
            Flags.get(FlagEnum.FERRET_BAD_END_WARNING) = 0;
        }

        let changes: number = 0;
        let changeLimit: number = 1;
        let temp: number = 0;
        let x: number = 0;
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(3) == 0) changeLimit++;

        //Ferret Fruit Effects
        //- + Thin:
        if (player.thickness > 15 && changes < changeLimit && Utils.rand(3) == 0) {
            MainScreen.text("\n\nEach movement feels a tiny bit easier than the last.  Did you just lose a little weight!? (+2 thin)");
            player.thickness -= 2;
            changes++;
        }
        //- If speed is > 80, increase speed:
        if (player.stats.spe < 80 && Utils.rand(3) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYour muscles begin to twitch rapidly, but the feeling is not entirely unpleasant.  In fact, you feel like running.");
            dynStats("spe", 1);
            changes++;
        }
        //- If male with a hip rating >4 or a female/herm with a hip rating >6:
        if (((!player.lowerBody.cockSpot.hasCock() && player.lowerBody.hipRating > 6) || (player.lowerBody.cockSpot.hasCock() && player.lowerBody.hipRating > 4)) && Utils.rand(3) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nA warm, tingling sensation arises in your [hips].  Immediately, you reach down to them, concerned.  You can feel a small portion of your [hips] dwindling away under your hands.");
            player.lowerBody.hipRating--;
            if (player.lowerBody.hipRating > 10) player.lowerBody.hipRating--;
            if (player.lowerBody.hipRating > 15) player.lowerBody.hipRating--;
            if (player.lowerBody.hipRating > 20) player.lowerBody.hipRating--;
            if (player.lowerBody.hipRating > 23) player.lowerBody.hipRating--;
            changes++;
        }
        //- If butt rating is greater than �petite�:
        if (player.lowerBody.butt.buttRating >= 8 && Utils.rand(3) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYou cringe as your [butt] begins to feel uncomfortably tight.  Once the sensation passes, you look over your shoulder, inspecting yourself.  It would appear that your ass has become smaller!");
            player.lowerBody.butt.buttRating--;
            if (player.lowerBody.butt.buttRating > 10) player.lowerBody.butt.buttRating--;
            if (player.lowerBody.butt.buttRating > 15) player.lowerBody.butt.buttRating--;
            if (player.lowerBody.butt.buttRating > 20) player.lowerBody.butt.buttRating--;
            if (player.lowerBody.butt.buttRating > 23) player.lowerBody.butt.buttRating--;
            changes++;
        }

        //-If male with breasts or female/herm with breasts > B cup:
        if (!Flags.get(FlagEnum.HYPER_HAPPY) && (player.upperBody.chest.BreastRatingLargest[0].breastRating > 2 || (player.lowerBody.cockSpot.hasCock() && player.upperBody.chest.BreastRatingLargest[0].breastRating >= 1)) && Utils.rand(2) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYou cup your tits as they begin to tingle strangely.  You can actually feel them getting smaller in your hands!");
            for (x = 0; x < player.bRows(); x++) {
                if (player.upperBody.chest.list[x].breastRating > 2 || (player.lowerBody.cockSpot.hasCock() && player.upperBody.chest.list[x].breastRating >= 1)) {
                    player.upperBody.chest.list[x].breastRating--;
                }
            }
            changes++;
            //(this will occur incrementally until they become flat, manly breasts for males, or until they are A or B cups for females/herms)
        }
        //-If penis size is > 6 inches:
        if (player.lowerBody.cockSpot.hasCock()) {
            //Find longest cock
            temp = -1;
            for (x = 0; x < player.lowerBody.cockSpot.count(); x++) {
                if (temp == -1 || player.lowerBody.cockSpot.list[x].cockLength > player.lowerBody.cockSpot.list[temp].cockLength) temp = x;
            }
            if (temp >= 0 && Utils.rand(2) == 0 && changes < changeLimit) {
                if (player.lowerBody.cockSpot.list[temp].cockLength > 6 && !Flags.get(FlagEnum.HYPER_HAPPY)) {
                    MainScreen.text("\n\nA pinching sensation racks the entire length of your " + cockDescript(temp) + ".  Within moments, the sensation is gone, but it appears to have become smaller.");
                    player.lowerBody.cockSpot.list[temp].cockLength--;
                    if (Utils.rand(2) == 0) player.lowerBody.cockSpot.list[temp].cockLength--;
                    if (player.lowerBody.cockSpot.list[temp].cockLength >= 9) player.lowerBody.cockSpot.list[temp].cockLength -= Utils.rand(3) + 1;
                    if (player.lowerBody.cockSpot.list[temp].cockLength / 6 >= player.lowerBody.cockSpot.list[temp].cockThickness) {
                        MainScreen.text("  Luckily, it doen�t seem to have lost its previous thickness.");
                    }
                    else {
                        player.lowerBody.cockSpot.list[temp].cockThickness = player.lowerBody.cockSpot.list[temp].cockLength / 6;
                    }
                    changes++;
                }
            }
        }
        //-If the PC has quad nipples:
        if (player.averageNipplesPerBreast() > 1 && Utils.rand(4) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nA tightness arises in your nipples as three out of four on each breast recede completely, the leftover nipples migrating to the middle of your breasts.  <b>You are left with only one nipple on each breast.</b>");
            for (x = 0; x < player.bRows(); x++) {
                player.upperBody.chest.list[x].nipplesPerBreast = 1;
            }
            changes++;
        }
        //If the PC has gills:
        if (player.upperBody.gills && Utils.rand(4) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYou grit your teeth as a stinging sensation arises in your gills.  Within moments, the sensation passes, and <b>your gills are gone!</b>");
            player.upperBody.gills = false;
            changes++;
        }
        //If the PC has tentacle hair:
        if (player.upperBody.head.hairType == HAIR.ANEMONE && Utils.rand(4) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYour head feels strange as the tentacles you have for hair begin to recede back into your scalp, eventually leaving you with a bald head.  Your head is not left bald for long, though.  Within moments, a full head of hair sprouts from the skin of your scalp.  <b>Your hair is normal again!</b>");
            //Turn hair growth on.
            Flags.get(FlagEnum.HAIR.GROWTH_STOPPED_BECAUSE_LIZARD) = 0;
            player.upperBody.head.hairType = 0;
            changes++;
        }
        //If the PC has goo hair:
        if (player.upperBody.head.hairType == HAIR.GOO && Utils.rand(3) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYour gooey hair begins to fall out in globs, eventually leaving you with a bald head.  Your head is not left bald for long, though.  Within moments, a full head of hair sprouts from the skin of your scalp.  <b>Your hair is normal again!</b>");
            //Turn hair growth on.
            Flags.get(FlagEnum.HAIR.GROWTH_STOPPED_BECAUSE_LIZARD) = 0;
            player.upperBody.head.hairType = 0;
            changes++;
        }
        //If the PC has four eyes:
        if (player.eyeType == EYES.FOUR_SPIDER_EYES && Utils.rand(3) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYour two forehead eyes start throbbing painfully, your sight in them eventually going dark.  You touch your forehead to inspect your eyes, only to find out that they have disappeared.  <b>You only have two eyes now!</b>");
            player.eyeType = 0;
            changes++;
        }
        //Go into heat
        if (Utils.rand(3) == 0 && changes < changeLimit) {
            if (player.goIntoHeat(true)) {
                changes++;
            }
        }
        //Turn ferret mask to full furface.
        if (player.faceType == FACE.FERRET_MASK && player.skinType == SKIN.FUR && player.upperBody.head.earType == EARS.FERRET && player.tailType == TAIL.FERRET && player.lowerBody == LOWER_BODY.FERRET && Utils.rand(4) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYou cry out in pain as the bones in your face begin to break and rearrange.  You rub your face furiously in an attempt to ease the pain, but to no avail.  As the sensations pass, you examine your face in a nearby puddle.  <b>You nearly gasp in shock at the sight of your new ferret face!</b>");
            player.faceType = FACE.FERRET;
            changes++;
        }
        //If face is human:
        if (player.faceType == 0 && Utils.rand(3) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nA horrible itching begins to encompass the area around your eyes.  You grunt annoyedly, rubbing furiously at the afflicted area.  Once the feeling passes, you make your way to the nearest reflective surface to see if anything has changed.  Your suspicions are confirmed.  The [skinFurScales] around your eyes has darkened.  <b>You now have a ferret mask!</b>");
            player.faceType = FACE.FERRET_MASK;
            changes++;
        }
        //If face is not ferret, has ferret ears, tail, and legs:
        if (player.faceType != FACE.HUMAN && player.faceType != FACE.FERRET_MASK && player.faceType != FACE.FERRET && Utils.rand(3) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYou groan uncomfortably as the bones in your [face] begin to rearrange.  You grab your head with both hands, rubbing at your temples in an attempt to ease the pain.  As the shifting stops, you frantically feel at your face.  The familiar feeling is unmistakable.  <b>Your face is human again!</b>");
            player.faceType = 0;
            changes++;
        }
        //No fur, has ferret ears, tail, and legs:
        if (player.skinType != SKIN.FUR && player.upperBody.head.earType == EARS.FERRET && player.tailType == TAIL.FERRET && player.lowerBody == LOWER_BODY.FERRET && Utils.rand(4) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYour skin starts to itch like crazy as a thick coat of fur sprouts out of your skin.");
            //If hair was not sandy brown, silver, white, or brown
            if (player.hairColor != "sandy brown" && player.hairColor != "silver" && player.hairColor != "white" && player.hairColor != "brown") {
                MainScreen.text("\n\nOdder still, all of your hair changes to ");
                if (Utils.rand(4) == 0) player.hairColor = "sandy brown";
                else if (Utils.rand(3) == 0) player.hairColor = "silver";
                else if (Utils.rand(2) == 0) player.hairColor = "white";
                else player.hairColor = "brown";
                MainScreen.text(".");
            }
            MainScreen.text("  <b>You now have " + player.hairColor + " fur!</b>");
            player.skinType = SKIN.FUR;
            changes++;
        }
        //Tail TFs!
        if (player.tailType != TAIL.FERRET && player.upperBody.head.earType == EARS.FERRET && Utils.rand(3) == 0 && changes < changeLimit) {
            //If ears are ferret, no tail:
            if (player.tailType == 0) {
                MainScreen.text("\n\nYou slump to the ground as you feel your spine lengthening and twisting, sprouting fur as it finishes growing.  Luckily the new growth does not seem to have ruined your [armor].  <b>You now have a ferret tail!</b>");
            }
            //Placeholder for any future TFs that will need to be made compatible with this one
            //centaur, has ferret ears:
            else if (player.tailType == TAIL.HORSE && player.isTaur()) MainScreen.text("\n\nYou shiver as the wind gets to your tail, all of its shiny bristles having fallen out.  Your tail then begins to lengthen, warming back up as it sprouts a new, shaggier coat of fur.  This new, mismatched tail looks a bit odd on your horse lower body.  <b>You now have a ferret tail!</b>");
            //If tail is harpy, has ferret ears:
            else if (player.tailType == TAIL.HARPY) MainScreen.text("\n\nYou feel a soft tingle as your tail feathers fall out one by one.  The little stump that once held the feathers down begins to twist and lengthen before sprouting soft, fluffy fur.  <b>You now have a ferret tail!</b>");
            //If tail is bunny, has ferret ears:
            else if (player.tailType == TAIL.RABBIT) MainScreen.text("\n\nYou feel a pressure at the base of your tiny, poofy bunny tail as it begins to lengthen, gaining at least another foot in length.  <b>You now have a ferret tail!</b>");
            //If tail is reptilian/draconic, has ferret ears:
            else if (player.tailType == TAIL.DRACONIC || player.tailType == TAIL.LIZARD) MainScreen.text("\n\nYou reach a hand behind yourself to rub at your backside as your tail begins to twist and warp, becoming much thinner than before.  It then sprouts a thick coat of fur.  <b>You now have a ferret tail!</b>");
            //If tail is cow, has ferret ears:
            else if (player.tailType == TAIL.COW) MainScreen.text("\n\nYour tail begins to itch slightly as the poof at the end of your tail begins to spread across its entire surface, making all of its fur much more dense than it was before. It also loses a tiny bit of its former length. <b>You now have a ferret tail!</b>");
            //If tail is cat, has ferret ears:
            else if (player.tailType == TAIL.CAT) MainScreen.text("\n\nYour tail begins to itch as its fur becomes much denser than it was before.  It also loses a tiny bit of its former length.  <b>You now have a ferret tail!</b>");
            //If tail is dog, has ferret ears:
            else if (player.tailType == TAIL.DOG) MainScreen.text("\n\nSomething about your tail feels... different.  You reach behind yourself, feeling it.  It feels a bit floppier than it was before, and the fur seems to have become a little more dense.  <b>You now have a ferret tail!</b>");
            //If tail is kangaroo, has ferret ears:
            else if (player.tailType == TAIL.KANGAROO) MainScreen.text("\n\nYour tail becomes uncomfortably tight as the entirety of its length begins to lose a lot of its former thickness.  The general shape remains tapered, but its fur has become much more dense and shaggy.  <b>You now have a ferret tail!</b>");
            //If tail is fox, has ferret ears:
            else if (player.tailType == TAIL.FOX) MainScreen.text("\n\nYour tail begins to itch as its fur loses a lot of its former density.  It also appears to have lost a bit of length.  <b>You now have a ferret tail!</b>");
            //If tail is raccoon, has ferret ears:
            else if (player.tailType == TAIL.RACCOON) MainScreen.text("\n\nYour tail begins to itch as its fur loses a lot of its former density, losing its trademark ring pattern as well.  It also appears to have lost a bit of length.  <b>You now have a ferret tail!</b>");
            //If tail is horse, has ferret ears:
            else if (player.tailType == TAIL.HORSE) MainScreen.text("\n\nYou shiver as the wind gets to your tail, all of its shiny bristles having fallen out.  Your tail then begins to lengthen, warming back up as it sprouts a new, shaggier coat of fur.  <b>You now have a ferret tail!</b>");
            //If tail is mouse, has ferret ears:
            else if (player.tailType == TAIL.MOUSE) MainScreen.text("\n\nYour tail begins to itch as its bald surface begins to sprout a thick layer of fur.  It also appears to have lost a bit of its former length.  <b>You now have a ferret tail!</b>");
            else MainScreen.text("\n\nYour tail begins to itch a moment before it starts writhing, your back muscles spasming as it changes shape. Before you know it, <b>your tail has reformed into a narrow, ferret's tail.</b>");
            player.tailType = TAIL.FERRET;
            changes++;
        }
        //If naga, has ferret ears:
        //(NOTE: this is the only exception to the legs coming after the tail, as the ferret tail will only go away right after it appears because of your snake lower half)
        else if (player.isNaga() && player.upperBody.head.earType == EARS.FERRET && Utils.rand(4) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYou scream in agony as a horrible pain racks the entire length of your snake-like coils.  Unable to take it anymore, you pass out.  When you wake up, you�re shocked to find that you no longer have the lower body of a snake.  Instead, you have soft, furry legs that resemble that of a ferret�s.  <b>You now have ferret legs!</b>");
            changes++;
            player.lowerBody = LOWER_BODY.FERRET;
        }
        //If legs are not ferret, has ferret ears and tail
        if (player.lowerBody != LOWER_BODY.FERRET && player.upperBody.head.earType == EARS.FERRET && player.tailType == TAIL.FERRET && Utils.rand(4) == 0 && changes < changeLimit) {
            //-If centaur, has ferret ears and tail:
            if (player.isTaur()) MainScreen.text("\n\nYou scream in agony as a horrible pain racks your entire horse lower half.  Unable to take it anymore, you pass out.  When you wake up, you�re shocked to find that you no longer have the lower body of a horse.  Instead, you have soft, furry legs that resemble that of a ferret�s.  <b>You now have ferret legs!</b>");

            MainScreen.text("\n\nYou scream in agony as the bones in your legs begin to break and rearrange.  Even as the pain passes, an uncomfortable combination of heat and throbbing continues even after the transformation is over.  You rest for a moment, allowing the sensations to subside.  Now feeling more comfortable, <b>you stand up, ready to try out your new ferret legs!</b>");
            changes++;
            player.lowerBody = LOWER_BODY.FERRET;
        }
        //If ears are not ferret:
        if (player.upperBody.head.earType != EARS.FERRET && Utils.rand(4) == 0 && changes < changeLimit && Utils.rand(2.5) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYou squint as you feel a change in your ears.  Inspecting your reflection in a nearby puddle you find that <b>your ears have become small, fuzzy, and rounded, just like a ferret�s!</b>");
            player.upperBody.head.earType = EARS.FERRET;
            changes++;
        }
        //If no other effect occurred, fatigue decreases:
        if (changes == 0) {
            MainScreen.text("\n\nYour eyes widen.  With the consumption of the fruit, you feel much more energetic.  You�re wide awake now!");
            changes++;
            fatigue(-10);
        }
    }
}