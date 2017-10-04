import IPregnancyEvent from "./IPregnancyEvent";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";

export default class PregMouse implements IPregnancyEvent {
    public incubationDisplay(player: Player) {
        if (player.pregnancyIncubation == 336) {
            MainScreen.text("\n<b>You realize your belly has gotten slightly larger.  Maybe you need to cut back on the strange food.</b>\n", false);
        }
        if (player.pregnancyIncubation == 280) {
            MainScreen.text("\n<b>Your belly is getting more noticably distended and squirming around.  You are probably pregnant.</b>\n", false);
        }
        if (player.pregnancyIncubation == 216) {
            MainScreen.text("\n<b>The unmistakable bulge of pregnancy is visible in your tummy.  It's feeling heavier by the moment.  ", false);
            if (player.stats.cor < 40) MainScreen.text("You are distressed by your unwanted pregnancy, and your inability to force this thing out of you.</b>", false);
            if (player.stats.cor >= 40 && player.stats.cor < 75) MainScreen.text("Considering the size of the creatures you've fucked, you hope it doesn't hurt when it comes out.</b>", false);
            if (player.stats.cor >= 75) MainScreen.text("You think dreamily about the monstrous cocks that have recently been fucking you, and hope that your offspring inherit such a pleasure tool.</b>", false);
            MainScreen.text("\n", false);
            player.stats.spe += -1;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 2;
        }
        if (player.pregnancyIncubation == 180) {
            MainScreen.text("\n<b>The sudden impact of a tiny kick from inside your distended womb startles you.  Moments later it happens again, making you gasp.</b>\n", false);
        }
        if (player.pregnancyIncubation == 120) {
            MainScreen.text("\n<b>Your ever-growing belly makes your pregnancy obvious for those around you.  It's already as big as the belly of any pregnant woman back home.</b>\n", false);
        }
        if (player.pregnancyIncubation == 72) {
            MainScreen.text("\n<b>Your belly is painfully distended and overswollen with wriggling offspring, ", false);
            if (player.stats.cor < 40) MainScreen.text("making it difficult to function.</b>", false);
            if (player.stats.cor >= 40 && player.stats.cor < 75) MainScreen.text("and you wonder how much longer you have to wait.</b>", false);
            if (player.stats.cor >= 75) MainScreen.text("and you're eager to give birth, so you can get impregnated again by monstrous cocks unloading their corrupted seed directly into your eager womb.</b>", false);
            MainScreen.text("\n", false);
            player.stats.spe += -3;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 4;
        }
        if (player.pregnancyIncubation == 48) {
            MainScreen.text("\n<b>You rub your hands over your bulging belly, lost in the sensations of motherhood.  Whatever is inside your overstretched womb seems to appreciate the attention and stops its incessant squirming.  ", false);
            if (player.stats.cor < 40) MainScreen.text("Afterwards you feel somewhat disgusted with yourself.</b>\n", false);
            if (player.stats.cor >= 40 && player.stats.cor < 75) MainScreen.text("You estimate you'll give birth in the next few days.</b>\n", false);
            if (player.stats.cor >= 75) MainScreen.text("You find yourself daydreaming about birthing hundreds of little babies, and lounging around while they nurse non-stop on your increasingly sensitive breasts.</b>\n", false);
        }
        if (player.pregnancyIncubation == 32 || player.pregnancyIncubation == 64 || player.pregnancyIncubation == 85 || player.pregnancyIncubation == 150) {
            //Increase lactation!
            if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 3 && player.mostBreastsPerRow() > 1 && player.upperBody.chest.LactationMultipierLargest[0].lactationMultiplier >= 1 && player.upperBody.chest.LactationMultipierLargest[0].lactationMultiplier < 2) {
                MainScreen.text("\nYour breasts feel swollen with all the extra milk they're accumulating.  You wonder just what kind of creature they're getting ready to feed.\n", false);
                player.boostLactation(.5);
            }
            if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 3 && player.mostBreastsPerRow() > 1 && player.upperBody.chest.LactationMultipierLargest[0].lactationMultiplier > 0 && player.upperBody.chest.LactationMultipierLargest[0].lactationMultiplier < 1) {
                MainScreen.text("\nDrops of breastmilk escape your nipples as your body prepares for the coming birth.\n", false);
                player.boostLactation(.5);
            }
            //Lactate if large && not lactating
            if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 3 && player.mostBreastsPerRow() > 1 && player.upperBody.chest.LactationMultipierLargest[0].lactationMultiplier == 0) {
                MainScreen.text("\n<b>You realize your breasts feel full, and occasionally lactate</b>.  It must be due to the pregnancy.\n", false);
                player.boostLactation(1);
            }
            //Enlarge if too small for lactation
            if (player.upperBody.chest.BreastRatingLargest[0].breastRating == 2 && player.mostBreastsPerRow() > 1) {
                MainScreen.text("\n<b>Your breasts have swollen to C-cups,</b> in light of your coming pregnancy.\n", false);
                player.growTits(1, 1, false, 3);
            }
            //Enlarge if really small!
            if (player.upperBody.chest.BreastRatingLargest[0].breastRating == 1 && player.mostBreastsPerRow() > 1) {
                MainScreen.text("\n<b>Your breasts have grown to B-cups,</b> likely due to the hormonal changes of your pregnancy.\n", false);
                player.growTits(1, 1, false, 3);
            }
        }
    }

    public birth(player: Player) {
        player.boostLactation(.01);
        MainScreen.text("\nYou wake up suddenly to strong pains and pressures in your gut. As your eyes shoot wide open, you look down to see your belly absurdly full and distended. You can feel movement underneath the skin, and watch as it is pushed out in many places, roiling and squirming in disturbing ways. The feelings you get from inside are just as disconcerting. You count not one, but many little things moving around inside you. There are so many, you can't keep track of them.\n\n", false);
        if (player.lowerBody.vaginaSpot.count() == 0) {
            MainScreen.text("You feel a terrible pressure in your groin... then an incredible pain accompanied by the rending of flesh.  <b>You look down and behold a new vagina</b>.  ", false);
            player.createVagina();
            genderCheck();
        }
        //Main Text here
        MainScreen.text("Pain shoots through you as they pull open your cervix forcefully. You grip the ground and pant and push as the pains of labor overwhelm you. You feel your hips being forceably widened by the collective mass of the creatures moving down your birth canal. You spread your legs wide, laying your head back with groans and cries of agony as little white figures begin to emerge from between the lips of your abused pussy. Large innocent eyes, even larger ears, cute little muzzles, long slender pink tails all appear as the figures emerge. Each could be no larger than six inches tall, but they seem as active and curious as if they were already developed children. \n\n", false);
        MainScreen.text("Two emerge, then four, eight... you lose track. They swarm your body, scrambling for your chest, and take turns suckling at your nipples. Milk does their bodies good, making them grow rapidly, defining their genders as the girls grow cute little breasts and get broader hips and the boys develop their little mouse cocks and feel their balls swell. Each stops suckling when they reach two feet tall, and once every last one of them has departed your sore, abused cunt and drunk their fill of your milk, they give you a few grateful nuzzles, then run off towards the forest, leaving you alone to recover.\n", false);
        player.knockUpForce(); //Clear Pregnancy
        if (player.averageLactation() > 0 && player.averageLactation() < 5) {
            MainScreen.text("Your breasts won't seem to stop dribbling milk, lactating more heavily than before.", false);
            player.boostLactation(.5);
        }
        player.cuntChange(60, true, true, false);
        if (player.lowerBody.vaginaSpot.get(0).vaginalWetness == VaginaWetness.DRY) player.lowerBody.vaginaSpot.get(0).vaginalWetness++;
        if (player.gender == 1) player.gender = 3;
        if (player.gender == 0) player.gender = 2;
        player.orgasm();
        player.stats.str += -1;
        player.stats.tou += -2;
        player.stats.spe += 3;
        player.stats.lib += 1;
        player.stats.sens += .5;
        //Butt increase
        if (player.lowerBody.butt.buttRating < 14 && rand(2) == 0) {
            if (player.lowerBody.butt.buttRating < 10) {
                player.lowerBody.butt.buttRating++;
                MainScreen.text("\n\nYou notice your " + ButtDescriptor.describeButt(player) + " feeling larger and plumper after the ordeal.", false);
            }
            //Big butts grow slower!
            else if (player.lowerBody.butt.buttRating < 14 && rand(2) == 0) {
                player.lowerBody.butt.buttRating++;
                MainScreen.text("\n\nYou notice your " + ButtDescriptor.describeButt(player) + " feeling larger and plumper after the ordeal.", false);
            }
        }
        MainScreen.text("\n", false);
    }
}