import IPregnancyEvent from "./IPregnancyEvent";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";

export default class PregImp implements IPregnancyEvent {
    public incubationDisplay(player: Player) {
        if (player.pregnancyIncubation == 336) {
            MainScreen.text("\n<b>You realize your belly has gotten slightly larger.  Maybe you need to cut back on the strange food.</b>\n", false);
        }
        if (player.pregnancyIncubation == 280) {
            MainScreen.text("\n<b>Your belly is getting more noticably distended.   You are probably pregnant.</b>\n", false);
        }
        if (player.pregnancyIncubation == 216) {
            MainScreen.text("\n<b>The unmistakable bulge of pregnancy is visible in your tummy.  ", false);
            if (player.stats.cor < 40) MainScreen.text("You are distressed by your unwanted pregnancy, and your inability to force this thing out of you.</b>", false);
            if (player.stats.cor >= 40 && player.stats.cor < 75) MainScreen.text("Considering the size of the creatures you've fucked, you hope it doesn't hurt when it comes out.</b>", false);
            if (player.stats.cor >= 75) MainScreen.text("You think dreamily about the monstrous cocks that have recently been fucking you, and hope that your offspring inherit such a pleasure tool.</b>", false);
            player.stats.spe += -1;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 2;
            MainScreen.text("\n", false);
        }
        if (player.pregnancyIncubation == 180) {
            MainScreen.text("\n<b>The sudden impact of a kick from inside your womb startles you.</b>\n", false);
        }
        if (player.pregnancyIncubation == 120) {
            MainScreen.text("\n<b>Your ever-growing belly makes your pregnancy obvious for those around you.</b>\n", false);
        }
        if (player.pregnancyIncubation == 72) {
            MainScreen.text("\n<b>Your belly is painfully distended, ", false);
            if (player.stats.cor < 40) MainScreen.text("making it difficult to function.</b>", false);
            if (player.stats.cor >= 40 && player.stats.cor < 75) MainScreen.text("and you wonder how much longer you have to wait.</b>", false);
            if (player.stats.cor >= 75) MainScreen.text("and you're eager to give birth, so you can get impregnated again by corrupted or monstrous cum filling out your eager womb.</b>", false);
            MainScreen.text("\n", false);
            player.stats.spe += -3;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 4;
        }
        if (player.pregnancyIncubation == 48) {
            MainScreen.text("\n<b>You rub your hands over your bulging belly, lost in the sensations of motherhood.  ", false);
            if (player.stats.cor < 40) MainScreen.text("Afterwards you feel somewhat disgusted with yourself.</b>\n", false);
            if (player.stats.cor >= 40 && player.stats.cor < 75) MainScreen.text("You estimate you'll give birth in the next few days.</b>\n", false);
            if (player.stats.cor >= 75) MainScreen.text("You find yourself daydreaming about birthing demons repeatedly, each time being re-impregnated by your hordes of lusty adolescent children.</b>\n", false);
        }
    }

    public birth(player: Player) {
        MainScreen.text("\n", false);
        //Add imp birth status - used to control frequency of night imp gangbag
        if (player.statusAffects.has("BirthedImps")) player.addStatusValue(StatusAffects.BirthedImps, 1, 1);
        else player.statusAffects.add(new StatusAffect("BirthedImps", 1, 0, 0, 0)));
        if (player.lowerBody.vaginaSpot.count() == 0) {
            MainScreen.text("You feel a terrible pressure in your groin... then an incredible pain accompanied by the rending of flesh.  You look down and behold a vagina.  ", false);
            player.createVagina();
            genderCheck();
        }
        MainScreen.text("A sudden gush of fluids erupts from your vagina - your water just broke.  You grunt painfully as you feel wriggling and squirming inside your belly, muscle contractions forcing it downwards.  ", false);
        if (player.stats.cor < 50) MainScreen.text("You rue the day you encountered that hateful imp.  ", false);
        MainScreen.text("The pain begins to subside as your delivery continues... replaced with a building sensation of pleasure.  Arousal spikes through you as the contractions intensify, and as you feel something pass you have a tiny orgasm.\n\nYet you feel more within you, and the contractions spike again, pushing you to orgasm as you pass something else.  It repeats, over and over, nearly a dozen times you birth and orgasm.  After an eternity of procreation and pleasure, you sense your ordeal is over and collapse, unconscious.", false);


        if (player.lowerBody.vaginaSpot.get(0).vaginalLooseness == VaginaLooseness.TIGHT) player.lowerBody.vaginaSpot.get(0).vaginalLooseness++;
        //50% chance
        if (player.lowerBody.vaginaSpot.get(0).vaginalLooseness < VaginaLooseness.GAPING_WIDE && rand(2) == 0) {
            player.lowerBody.vaginaSpot.get(0).vaginalLooseness++;
            MainScreen.text("\n\n<b>Your cunt is painfully stretched from the ordeal, permanently enlarged.</b>", false);
        }

        player.knockUpForce(); //Clear Pregnancy
        MainScreen.text("\n\nWhen you wake you find a large number of tiny imp tracks... and a spattering of cum on your clothes and body.  They must be born fully-formed.", false);
        if (player.averageLactation() > 0 && player.averageLactation() < 5) {
            MainScreen.text("  Your breasts won't seem to stop dribbling milk, lactating more heavily than before.", false);
            player.boostLactation(.5);
        }
        //Lactate if large && not lactating
        if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 3 && player.mostBreastsPerRow() > 1 && player.averageLactation() == 0) {
            MainScreen.text("  As you ponder the implications, <b>you realize your breasts have been slowly lactating</b>.  You wonder how much longer it will be before they stop.", false);
            player.boostLactation(1);
        }
        player.boostLactation(.01);
        //Enlarge if too small for lactation
        if (player.upperBody.chest.BreastRatingLargest[0].breastRating == 2 && player.mostBreastsPerRow() > 1) {
            MainScreen.text("  <b>Your breasts have grown to C-cups!</b>", false);
            player.growTits(1, 1, false, 3);
        }
        //Enlarge if really small!
        if (player.upperBody.chest.BreastRatingLargest[0].breastRating == 1 && player.mostBreastsPerRow() > 1) {
            MainScreen.text("  <b>Your breasts have grown to B-cups!</b>", false);
            player.growTits(1, 1, false, 3);
        }
        if (player.lowerBody.vaginaSpot.get(0).vaginalWetness == VaginaWetness.DRY) player.lowerBody.vaginaSpot.get(0).vaginalWetness++;
        if (player.gender == 1) player.gender = 3;
        if (player.gender == 0) player.gender = 2;
        player.orgasm();
        player.stats.tou += -2;
        player.stats.spe += 2;
        player.stats.lib += 1;
        player.stats.sens += .5;
        player.stats.cor += 7;
        if (player.lowerBody.butt.buttRating < 10 && rand(2) == 0) {
            player.lowerBody.butt.buttRating++;
            MainScreen.text("\n\nYou notice your " + ButtDescriptor.describeButt(player) + " feeling larger and plumper after the ordeal.", false);
        }
        else if (player.lowerBody.hipRating < 10) {
            player.lowerBody.hipRating++;
            MainScreen.text("\n\nAfter the birth your " + player.inventory.armor.displayName + " fits a bit more snugly about your " + hipDescript() + ".", false);
        }
        MainScreen.text("\n", false);
    }
}