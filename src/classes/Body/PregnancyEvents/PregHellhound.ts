import IPregnancyEvent from "./IPregnancyEvent";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";

export default class PregHellhound implements IPregnancyEvent {
    public incubationDisplay(player: Player) {
        if (player.pregnancyIncubation == 290) {
            MainScreen.text("\n<b>You realize your belly has gotten slightly larger.  Maybe you need to cut back on the strange food.</b>\n", false);
        }
        if (player.pregnancyIncubation == 240) {
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
            MainScreen.text("\n<b>There is a strange heat within your belly, it makes you a little tired.</b>\n", false);
            player.stats.tou += -1;
        }
        if (player.pregnancyIncubation == 120) {
            MainScreen.text("\n<b>Your ever-growing belly makes your pregnancy obvious for those around you.  With each day you can feel the heat within you growing.</b>\n", false);
            player.stats.tou += -1;
        }
        if (player.pregnancyIncubation == 72) {
            MainScreen.text("\n<b>The heat within doesn't drain you as much as it used to, instead giving you an odd strength.</b>", false);
            MainScreen.text("\n", false);
            player.stats.str += 1;
            player.stats.tou += 1;
        }
        if (player.pregnancyIncubation == 48) {
            MainScreen.text("\n<b>You can feel two large lumps pushing against your womb together ", false);
            if (player.stats.cor < 40) MainScreen.text("making it difficult to function.</b>", false);
            if (player.stats.cor >= 40 && player.stats.cor < 75) MainScreen.text("and you wonder how much longer you have to wait.</b>", false);
            if (player.stats.cor >= 75) MainScreen.text("and you're eager to give birth, so you can get impregnated again by monstrous cocks unloading their corrupted seed directly into your eager womb.</b>", false);
            MainScreen.text("\n", false);
            player.stats.spe += -2;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 4;
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
        MainScreen.text("\nYou are suddenly awoken by the heat inside your womb suddenly flaring up rather intensely.  It gives you a sudden charge of energy and you feel a strong need to stand up.  You can feel the two heads moving inside of you and you know that a hellhound will soon be born.  Guided by your instincts, you spread your legs and squat down, but wonder how exactly you are going to pass a creature with two heads?\n\n", false);
        if (player.lowerBody.vaginaSpot.count() == 0) {
            MainScreen.text("You feel a terrible pressure in your groin... then an incredible pain accompanied by the rending of flesh.  <b>You look down and behold a new vagina</b>.\n\n", false);
            player.createVagina();
            genderCheck();
        }
        MainScreen.text("Hearing a hiss, you look down to see drops of water hitting the ground and instantly turning to steam.  There is unnatural heat filling you, it's hot enough to boil water; but thanks to the creature inside you, you're barely feeling a thing!  More energy fills you and you begin to push down on the child within in earnest.  The process is painful, but satisfying; you feel like you could push out a mountain with the energy you have right now.  Within a minute, you can feel the heads emerge.  The heads are quickly followed by the rest of the body and you catch your hellhound child in your hands and lift it up to look at it.\n\n", false);
        MainScreen.text("You can see the distinctive dog heads are wrapped around each other and yipping softly; a hint of flame can sometimes be seen inside their mouths.  Its cute paws are waving in the air looking for purchase, but the rest of its body looks entirely human except for the double dicks, and it even has your skin color.  Its mouths are aching for nutrition, and you realize that your breasts are filled with what this pup needs and pull it to your chest.  Each head quickly finds a nipple and begins to suckle.  Having finished the birthing, you contentedly sit back down and bask in the feeling of giving milk to your child, or is it children?\n\n", false);
        MainScreen.text("You sit there in a state of euphoria for some time.  It's not until the child in front of you starts to become uncomfortably hot and heavy, that you are brought back to reality.  You look down to see that the hellhound pup has grown to three times its original size and even sprouted the distinctive layer of tough black fur.  The beast is licking contentedly at your breasts instead of sucking.  It was the now-full flames in its mouth that had broken your reverie, but before you get a real grasp of what had happened, the hellhound pulls away from you and gives you a few quick happy barks before turning around and running off into the wilds, dropping down onto four legs just before disappearing from view.  You feel the unnatural strength you gained during the birth fade away, and you fall into a deep contented sleep.\n\n", false);
        player.boostLactation(.01);
        //Main Text here
        player.knockUpForce(); //Clear Pregnancy
        if (player.averageLactation() > 0 && player.averageLactation() < 5) {
            MainScreen.text("Your breasts won't seem to stop dribbling milk, lactating more heavily than before.  ", false);
            player.boostLactation(.5);
        }
        player.cuntChange(60, true);
        if (player.lowerBody.vaginaSpot.get(0).vaginalWetness == VaginaWetness.DRY) player.lowerBody.vaginaSpot.get(0).vaginalWetness++;
        if (player.gender == 1) player.gender = 3;
        if (player.gender == 0) player.gender = 2;
        player.orgasm();
        player.stats.str += -1;
        player.stats.tou += -1;
        player.stats.spe += 2;
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