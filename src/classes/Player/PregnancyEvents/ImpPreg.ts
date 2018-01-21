import BreastRow from '../../Body/BreastRow';
import IPregnancyEvent from '../../Body/Pregnancy/IPregnancyEvent';
import { VaginaLooseness, VaginaWetness } from '../../Body/Vagina';
import ButtDescriptor from '../../Descriptors/ButtDescriptor';
import LegDescriptor from '../../Descriptors/LowerBodyDescriptor';
import DisplayText from '../../display/DisplayText';
import StatusAffectFactory from '../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import BreastModifier from '../../Modifiers/BreastModifier';
import { Utils } from '../../Utilities/Utils';
import Player from '../Player';

export default class ImpPreg implements IPregnancyEvent {
    public incubationDisplay(player: Player, incubationTime: number) {
        if (incubationTime === 336) {
            DisplayText("\nYou realize your belly has gotten slightly larger.  Maybe you need to cut back on the strange food.\n").bold();
        }
        if (incubationTime === 280) {
            DisplayText("\nYour belly is getting more noticably distended.   You are probably pregnant.\n").bold();
        }
        if (incubationTime === 216) {
            DisplayText("\nThe unmistakable bulge of pregnancy is visible in your tummy.  ").bold();
            if (player.stats.cor < 40) DisplayText("You are distressed by your unwanted pregnancy, and your inability to force this thing out of you.").bold();
            if (player.stats.cor >= 40 && player.stats.cor < 75) DisplayText("Considering the size of the creatures you've fucked, you hope it doesn't hurt when it comes out.").bold();
            if (player.stats.cor >= 75) DisplayText("You think dreamily about the monstrous cocks that have recently been fucking you, and hope that your offspring inherit such a pleasure tool.").bold();
            player.stats.spe += -1;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 2;
            DisplayText().newline();
        }
        if (incubationTime === 180) {
            DisplayText("\nThe sudden impact of a kick from inside your womb startles you.\n").bold();
        }
        if (incubationTime === 120) {
            DisplayText("\nYour ever-growing belly makes your pregnancy obvious for those around you.\n").bold();
        }
        if (incubationTime === 72) {
            DisplayText("\nYour belly is painfully distended, ").bold();
            if (player.stats.cor < 40) DisplayText("making it difficult to function.").bold();
            if (player.stats.cor >= 40 && player.stats.cor < 75) DisplayText("and you wonder how much longer you have to wait.").bold();
            if (player.stats.cor >= 75) DisplayText("and you're eager to give birth, so you can get impregnated again by corrupted or monstrous cum filling out your eager womb.").bold();
            DisplayText().newline();
            player.stats.spe += -3;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 4;
        }
        if (incubationTime === 48) {
            DisplayText("\nYou rub your hands over your bulging belly, lost in the sensations of motherhood.  ").bold();
            if (player.stats.cor < 40) DisplayText("Afterwards you feel somewhat disgusted with yourself.\n").bold();
            if (player.stats.cor >= 40 && player.stats.cor < 75) DisplayText("You estimate you'll give birth in the next few days.\n").bold();
            if (player.stats.cor >= 75) DisplayText("You find yourself daydreaming about birthing demons repeatedly, each time being re-impregnated by your hordes of lusty adolescent children.\n").bold();
        }
    }

    public canBirth(player: Player, incubationTime: number): boolean {
        return incubationTime <= 0;
    }

    public birthScene(player: Player) {
        DisplayText().newline();
        // Add imp birth status - used to control frequency of night imp gangbag
        if (player.statusAffects.has(StatusAffectType.BirthedImps)) player.statusAffects.get(StatusAffectType.BirthedImps).value1 = 1;
        else player.statusAffects.set(StatusAffectType.BirthedImps, StatusAffectFactory.create(StatusAffectType.BirthedImps, 1, 0, 0, 0));
        DisplayText("A sudden gush of fluids erupts from your vagina - your water just broke.  You grunt painfully as you feel wriggling and squirming inside your belly, muscle contractions forcing it downwards.  ");
        if (player.stats.cor < 50) DisplayText("You rue the day you encountered that hateful imp.  ");
        DisplayText("The pain begins to subside as your delivery continues... replaced with a building sensation of pleasure.  Arousal spikes through you as the contractions intensify, and as you feel something pass you have a tiny orgasm.\n\nYet you feel more within you, and the contractions spike again, pushing you to orgasm as you pass something else.  It repeats, over and over, nearly a dozen times you birth and orgasm.  After an eternity of procreation and pleasure, you sense your ordeal is over and collapse, unconscious.");

        if (player.torso.vaginas.get(0).looseness === VaginaLooseness.TIGHT) player.torso.vaginas.get(0).looseness++;
        // 50% chance
        if (player.torso.vaginas.get(0).looseness < VaginaLooseness.GAPING_WIDE && Utils.rand(2) === 0) {
            player.torso.vaginas.get(0).looseness++;
            DisplayText("\n\nYour cunt is painfully stretched from the ordeal, permanently enlarged.").bold();
        }

        const largestBreastRating: number = player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating;
        DisplayText("\n\nWhen you wake you find a large number of tiny imp tracks... and a spattering of cum on your clothes and body.  They must be born fully-formed.");
        if (player.torso.chest.reduce(BreastRow.AverageLactation, 0) > 0 && player.torso.chest.reduce(BreastRow.AverageLactation, 0) < 5) {
            DisplayText("  Your breasts won't seem to stop dribbling milk, lactating more heavily than before.");
            BreastModifier.boostLactation(player, .5);
        }
        // Lactate if large && not lactating
        if (largestBreastRating >= 3 && player.torso.chest.reduce(BreastRow.AverageLactation, 0) === 0) {
            DisplayText("  As you ponder the implications, ");
            DisplayText("you realize your breasts have been slowly lactating").bold();
            DisplayText(".  You wonder how much longer it will be before they stop.");
            BreastModifier.boostLactation(player, 1);
        }
        BreastModifier.boostLactation(player, .01);
        // Enlarge if too small for lactation
        if (largestBreastRating === 2) {
            DisplayText("  Your breasts have grown to C-cups!").bold();
            BreastModifier.growTopBreastRow(player, 1, 1, false);
        }
        // Enlarge if really small!
        if (largestBreastRating === 1) {
            DisplayText("  Your breasts have grown to B-cups!").bold();
            BreastModifier.growTopBreastRow(player, 1, 1, false);
        }
        if (player.torso.vaginas.get(0).wetness === VaginaWetness.DRY) player.torso.vaginas.get(0).wetness++;
        player.updateGender();
        player.orgasm();
        player.stats.tou += -2;
        player.stats.spe += 2;
        player.stats.lib += 1;
        player.stats.sens += .5;
        player.stats.cor += 7;
        if (player.torso.butt.rating < 10 && Utils.rand(2) === 0) {
            player.torso.butt.rating++;
            DisplayText("\n\nYou notice your " + ButtDescriptor.describeButt(player) + " feeling larger and plumper after the ordeal.");
        }
        else if (player.torso.hips.rating < 10) {
            player.torso.hips.rating++;
            DisplayText("\n\nAfter the birth your " + player.inventory.equipment.armor.displayName + " fits a bit more snugly about your " + LegDescriptor.describeHips(player) + ".");
        }
        DisplayText().newline();
    }
}
