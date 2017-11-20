import ButtDescriptor from '../../../Descriptors/ButtDescriptor';
import LowerBodyDescriptor from '../../../Descriptors/LowerBodyDescriptor';
import DisplayText from '../../../display/DisplayText';
import StatusAffectFactory from '../../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../../Effects/StatusAffectType';
import BreastModifier from '../../../Modifiers/BreastModifier';
import Player from '../../../Player/Player';
import Utils from '../../../Utilities/Utils';
import { VaginaLooseness, VaginaWetness } from '../../Vagina';
import IPregnancyEvent from '../IPregnancyEvent';

export default class ImpPreg implements IPregnancyEvent {
    public incubationDisplay(player: Player, incubationTime: number) {
        if (incubationTime == 336) {
            DisplayText.text("\n<b>You realize your belly has gotten slightly larger.  Maybe you need to cut back on the strange food.</b>\n");
        }
        if (incubationTime == 280) {
            DisplayText.text("\n<b>Your belly is getting more noticably distended.   You are probably pregnant.</b>\n");
        }
        if (incubationTime == 216) {
            DisplayText.text("\n<b>The unmistakable bulge of pregnancy is visible in your tummy.  ");
            if (player.stats.cor < 40) DisplayText.text("You are distressed by your unwanted pregnancy, and your inability to force this thing out of you.</b>");
            if (player.stats.cor >= 40 && player.stats.cor < 75) DisplayText.text("Considering the size of the creatures you've fucked, you hope it doesn't hurt when it comes out.</b>");
            if (player.stats.cor >= 75) DisplayText.text("You think dreamily about the monstrous cocks that have recently been fucking you, and hope that your offspring inherit such a pleasure tool.</b>");
            player.stats.spe += -1;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 2;
            DisplayText.text("\n");
        }
        if (incubationTime == 180) {
            DisplayText.text("\n<b>The sudden impact of a kick from inside your womb startles you.</b>\n");
        }
        if (incubationTime == 120) {
            DisplayText.text("\n<b>Your ever-growing belly makes your pregnancy obvious for those around you.</b>\n");
        }
        if (incubationTime == 72) {
            DisplayText.text("\n<b>Your belly is painfully distended, ");
            if (player.stats.cor < 40) DisplayText.text("making it difficult to function.</b>");
            if (player.stats.cor >= 40 && player.stats.cor < 75) DisplayText.text("and you wonder how much longer you have to wait.</b>");
            if (player.stats.cor >= 75) DisplayText.text("and you're eager to give birth, so you can get impregnated again by corrupted or monstrous cum filling out your eager womb.</b>");
            DisplayText.text("\n");
            player.stats.spe += -3;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 4;
        }
        if (incubationTime == 48) {
            DisplayText.text("\n<b>You rub your hands over your bulging belly, lost in the sensations of motherhood.  ");
            if (player.stats.cor < 40) DisplayText.text("Afterwards you feel somewhat disgusted with yourself.</b>\n");
            if (player.stats.cor >= 40 && player.stats.cor < 75) DisplayText.text("You estimate you'll give birth in the next few days.</b>\n");
            if (player.stats.cor >= 75) DisplayText.text("You find yourself daydreaming about birthing demons repeatedly, each time being re-impregnated by your hordes of lusty adolescent children.</b>\n");
        }
    }

    public canBirth(player: Player, incubationTime: number): boolean {
        return incubationTime <= 0;
    }

    public birth(player: Player) {
        DisplayText.text("\n");
        //Add imp birth status - used to control frequency of night imp gangbag
        if (player.statusAffects.has("BirthedImps")) player.statusAffects.get("BirthedImps").value1 = 1;
        else player.statusAffects.add(StatusAffectFactory.create(StatusAffectType.BirthedImps, 1, 0, 0, 0));
        DisplayText.text("A sudden gush of fluids erupts from your vagina - your water just broke.  You grunt painfully as you feel wriggling and squirming inside your belly, muscle contractions forcing it downwards.  ");
        if (player.stats.cor < 50) DisplayText.text("You rue the day you encountered that hateful imp.  ");
        DisplayText.text("The pain begins to subside as your delivery continues... replaced with a building sensation of pleasure.  Arousal spikes through you as the contractions intensify, and as you feel something pass you have a tiny orgasm.\n\nYet you feel more within you, and the contractions spike again, pushing you to orgasm as you pass something else.  It repeats, over and over, nearly a dozen times you birth and orgasm.  After an eternity of procreation and pleasure, you sense your ordeal is over and collapse, unconscious.");


        if (player.lowerBody.vaginaSpot.get(0).vaginalLooseness == VaginaLooseness.TIGHT) player.lowerBody.vaginaSpot.get(0).vaginalLooseness++;
        //50% chance
        if (player.lowerBody.vaginaSpot.get(0).vaginalLooseness < VaginaLooseness.GAPING_WIDE && Utils.rand(2) == 0) {
            player.lowerBody.vaginaSpot.get(0).vaginalLooseness++;
            DisplayText.text("\n\n<b>Your cunt is painfully stretched from the ordeal, permanently enlarged.</b>");
        }

        const mostBreastsPerRow: number = player.upperBody.chest.NumOfBreastsLargest[0].breasts;
        const largestBreastRating: number = player.upperBody.chest.BreastRatingLargest[0].breastRating;
        DisplayText.text("\n\nWhen you wake you find a large number of tiny imp tracks... and a spattering of cum on your clothes and body.  They must be born fully-formed.");
        if (player.upperBody.chest.averageLactation() > 0 && player.upperBody.chest.averageLactation() < 5) {
            DisplayText.text("  Your breasts won't seem to stop dribbling milk, lactating more heavily than before.");
            BreastModifier.boostLactation(player, .5);
        }
        //Lactate if large && not lactating
        if (largestBreastRating >= 3 && mostBreastsPerRow > 1 && player.upperBody.chest.averageLactation() == 0) {
            DisplayText.text("  As you ponder the implications, <b>you realize your breasts have been slowly lactating</b>.  You wonder how much longer it will be before they stop.");
            BreastModifier.boostLactation(player, 1);
        }
        BreastModifier.boostLactation(player, .01);
        //Enlarge if too small for lactation
        if (largestBreastRating == 2 && mostBreastsPerRow > 1) {
            DisplayText.text("  <b>Your breasts have grown to C-cups!</b>");
            BreastModifier.growTopBreastRow(player, 1, 1, false);
        }
        //Enlarge if really small!
        if (largestBreastRating == 1 && mostBreastsPerRow > 1) {
            DisplayText.text("  <b>Your breasts have grown to B-cups!</b>");
            BreastModifier.growTopBreastRow(player, 1, 1, false);
        }
        if (player.lowerBody.vaginaSpot.get(0).vaginalWetness == VaginaWetness.DRY) player.lowerBody.vaginaSpot.get(0).vaginalWetness++;
        player.updateGender();
        player.orgasm();
        player.stats.tou += -2;
        player.stats.spe += 2;
        player.stats.lib += 1;
        player.stats.sens += .5;
        player.stats.cor += 7;
        if (player.lowerBody.butt.buttRating < 10 && Utils.rand(2) == 0) {
            player.lowerBody.butt.buttRating++;
            DisplayText.text("\n\nYou notice your " + ButtDescriptor.describeButt(player) + " feeling larger and plumper after the ordeal.");
        }
        else if (player.lowerBody.hipRating < 10) {
            player.lowerBody.hipRating++;
            DisplayText.text("\n\nAfter the birth your " + player.inventory.armorSlot.equipment.displayName + " fits a bit more snugly about your " + LowerBodyDescriptor.describeHips(player) + ".");
        }
        DisplayText.text("\n");
    }
}