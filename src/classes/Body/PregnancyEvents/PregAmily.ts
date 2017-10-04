import IPregnancyEvent from "./IPregnancyEvent";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";

export default class PregAmily implements IPregnancyEvent {
    public incubationDisplay(player: Player) {
        if (player.pregnancyIncubation == 336) {
            MainScreen.text("\n<b>You wake up feeling bloated, and your belly is actually looking a little puffy. At the same time, though, you have the oddest cravings... you could really go for some mixed nuts. And maybe a little cheese, too.</b>\n", false);
        }
        if (player.pregnancyIncubation == 280) {
            MainScreen.text("\n<b>Your belly is getting more noticably distended and squirming around.  You are probably pregnant.</b>\n", false);
        }
        if (player.pregnancyIncubation == 216) {
            MainScreen.text("\n<b>There is no question you're pregnant; your belly is already as big as that of any pregnant woman back home.", false);
            if (flags[FlagEnum.AMILY_FOLLOWER] == 1) MainScreen.text("  Amily smiles at you reassuringly. \"<i>We do have litters, dear, this is normal.</i>\"", false);
            MainScreen.text("</b>", false);
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
            MainScreen.text("\n<b>You feel (and look) hugely pregnant, now, but you feel content. You know the, ah, 'father' of these children loves you, and they will love you in turn.</b>\n", false);
        }
        if (player.pregnancyIncubation == 72) {
            MainScreen.text("\n<b>You jolt from the sensation of squirming inside your swollen stomach. Fortunately, it dies down quickly, but you know for a fact that you felt more than one baby kicking inside you.</b>\n", false);
            player.stats.spe += -3;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 4;
        }
        if (player.pregnancyIncubation == 48) {
            MainScreen.text("\n<b>The children kick and squirm frequently. Your bladder, stomach and lungs all feel very squished. You're glad that they'll be coming out of you soon.</b>\n", false);
        }
        if (player.pregnancyIncubation == 32 || player.pregnancyIncubation == 64 || player.pregnancyIncubation == 85 || player.pregnancyIncubation == 150) {
            //Increase lactation!
            if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 3 && player.mostBreastsPerRow() > 1 && player.upperBody.chest.LactationMultipierLargest[0].lactationMultiplier >= 1 && player.upperBody.chest.LactationMultipierLargest[0].lactationMultiplier < 2) {
                MainScreen.text("\nYour breasts feel swollen with all the extra milk they're accumulating.\n", false);
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
        MainScreen.text("\n", false);
        if (player.lowerBody.vaginaSpot.count() == 0) {
            MainScreen.text("You feel a terrible pressure in your groin... then an incredible pain accompanied by the rending of flesh.  <b>You look down and behold a new vagina</b>.  ", false);
            player.createVagina();
            genderCheck();
        }
        //FUCKING BIRTH SHIT HERE.
        amilyScene.pcBirthsAmilysKidsQuestVersion();
        player.cuntChange(60, true, true, false);
        if (player.lowerBody.vaginaSpot.get(0).vaginalWetness == VaginaWetness.DRY) player.lowerBody.vaginaSpot.get(0).vaginalWetness++;
        player.orgasm();
        player.stats.str += -1;
        player.stats.tou += -2;
        player.stats.spe += 3;
        player.stats.lib += 1;
        player.stats.sens += .5;
        MainScreen.text("\n", false);
        player.knockUpForce(); //Clear Pregnancy
    }
}