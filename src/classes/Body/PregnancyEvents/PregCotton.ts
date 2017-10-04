import IPregnancyEvent from "./IPregnancyEvent";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";

export default class PregCotton implements IPregnancyEvent {
    public incubationDisplay(player: Player) {
        if (player.pregnancyIncubation == 320) {
            MainScreen.text("\n<b>You realize your belly has gotten bigger. Maybe you should cut back on all the strange food.  Though you do have odd cravings for oats and grain.</b>\n", false);
        }
        else if (player.pregnancyIncubation == 280) {
            MainScreen.text("\n<b>Your belly is getting more noticeably distended. You are probably pregnant. The strong hankerings for oats and grains give you a very obvious clue as to who the 'father' might be.</b>\n", false);
        }
        else if (player.pregnancyIncubation == 225) {
            MainScreen.text("\n<b>The unmistakable bulge of pregnancy is visible in your tummy.  You stroke the orb and wonder with a half-grin if you'll have a daughter who takes after her 'daddy'.</b>\n");
        }
        else if (player.pregnancyIncubation == 165) {
            MainScreen.text("\n<b>The sudden impact of a tiny kick from inside your womb startles you.  Moments later it happens again, making you gasp.  The baby inside you really must be equine in nature; she's already got quite a wicked kick on her.</b>\n");
        }
        else if (player.pregnancyIncubation == 105) {
            MainScreen.text("\n<b>You're already as big as any pregnant woman back home. Considering that what you're carrying is technically a foal, you wonder just how much bigger you're going to get...</b>\n");
        }
        else if (player.pregnancyIncubation == 80) {
            MainScreen.text("\n<b>Your swollen stomach would bring queries about the possibility of twins back in Ingnam.  However, you can only feel one strong heart beating away inside your stretched midriff.  Cotton's foal is definitely growing up healthy...\n\nYou're glad, but a little worried about giving birth.</b>\n");
        }
        else if (player.pregnancyIncubation == 50) {
            MainScreen.text("\n<b>Your belly is painfully distended and swollen; you feel like you're going to burst before you get much bigger.  You find yourself pacing around restlessly in the night, like the expectant mares back in the village.  You're anxious to finally give birth, as much to get this heavy baby out of you as to finally be able to cuddle your child.</b>\n");
        }
        //Tits
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
        player.knockUpForce(); //Clear Pregnancy
        telAdre.cotton.birthingCottonsKids();
    }
}