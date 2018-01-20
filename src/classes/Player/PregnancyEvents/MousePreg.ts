import GenericPregnancyChanges from './GenericPregnancyChanges';
import BreastRow from '../../Body/BreastRow';
import IPregnancyEvent from '../../Body/Pregnancy/IPregnancyEvent';
import { VaginaWetness } from '../../Body/Vagina';
import ButtDescriptor from '../../Descriptors/ButtDescriptor';
import DisplayText from '../../display/DisplayText';
import BreastModifier from '../../Modifiers/BreastModifier';
import VaginaModifier from '../../Modifiers/VaginaModifier';
import { Utils } from '../../Utilities/Utils';
import Player from '../Player';

export default class MousePreg implements IPregnancyEvent {
    public incubationDisplay(player: Player, incubationTime: number) {
        if (incubationTime === 336) {
            DisplayText("\nYou realize your belly has gotten slightly larger.  Maybe you need to cut back on the strange food.\n").bold();
        }
        if (incubationTime === 280) {
            DisplayText("\nYour belly is getting more noticably distended and squirming around.  You are probably pregnant.\n").bold();
        }
        if (incubationTime === 216) {
            DisplayText("\nThe unmistakable bulge of pregnancy is visible in your tummy.  It's feeling heavier by the moment.  ").bold();
            if (player.stats.cor < 40) DisplayText("You are distressed by your unwanted pregnancy, and your inability to force this thing out of you.").bold();
            if (player.stats.cor >= 40 && player.stats.cor < 75) DisplayText("Considering the size of the creatures you've fucked, you hope it doesn't hurt when it comes out.").bold();
            if (player.stats.cor >= 75) DisplayText("You think dreamily about the monstrous cocks that have recently been fucking you, and hope that your offspring inherit such a pleasure tool.").bold();
            DisplayText().newline();
            player.stats.spe += -1;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 2;
        }
        if (incubationTime === 180) {
            DisplayText("\nThe sudden impact of a tiny kick from inside your distended womb startles you.  Moments later it happens again, making you gasp.\n").bold();
        }
        if (incubationTime === 120) {
            DisplayText("\nYour ever-growing belly makes your pregnancy obvious for those around you.  It's already as big as the belly of any pregnant woman back home.\n").bold();
        }
        if (incubationTime === 72) {
            DisplayText("\nYour belly is painfully distended and overswollen with wriggling offspring, ").bold();
            if (player.stats.cor < 40) DisplayText("making it difficult to function.").bold();
            if (player.stats.cor >= 40 && player.stats.cor < 75) DisplayText("and you wonder how much longer you have to wait.").bold();
            if (player.stats.cor >= 75) DisplayText("and you're eager to give birth, so you can get impregnated again by monstrous cocks unloading their corrupted seed directly into your eager womb.").bold();
            DisplayText().newline();
            player.stats.spe += -3;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 4;
        }
        if (incubationTime === 48) {
            DisplayText("\nYou rub your hands over your bulging belly, lost in the sensations of motherhood.  Whatever is inside your overstretched womb seems to appreciate the attention and stops its incessant squirming.  ").bold();
            if (player.stats.cor < 40) DisplayText("Afterwards you feel somewhat disgusted with yourself.\n").bold();
            if (player.stats.cor >= 40 && player.stats.cor < 75) DisplayText("You estimate you'll give birth in the next few days.\n").bold();
            if (player.stats.cor >= 75) DisplayText("You find yourself daydreaming about birthing hundreds of little babies, and lounging around while they nurse non-stop on your increasingly sensitive breasts.\n").bold();
        }
        if (incubationTime === 32 || incubationTime === 64 || incubationTime === 85 || incubationTime === 150) {
            GenericPregnancyChanges.lactationIncrease(player);
        }
    }

    public canBirth(player: Player, incubationTime: number): boolean {
        return incubationTime <= 0;
    }

    public birthScene(player: Player) {
        BreastModifier.boostLactation(player, .01);
        DisplayText("\nYou wake up suddenly to strong pains and pressures in your gut. As your eyes shoot wide open, you look down to see your belly absurdly full and distended. You can feel movement underneath the skin, and watch as it is pushed out in many places, roiling and squirming in disturbing ways. The feelings you get from inside are just as disconcerting. You count not one, but many little things moving around inside you. There are so many, you can't keep track of them.\n\n");
        // Main Text here
        DisplayText("Pain shoots through you as they pull open your cervix forcefully. You grip the ground and pant and push as the pains of labor overwhelm you. You feel your hips being forceably widened by the collective mass of the creatures moving down your birth canal. You spread your legs wide, laying your head back with groans and cries of agony as little white figures begin to emerge from between the lips of your abused pussy. Large innocent eyes, even larger ears, cute little muzzles, long slender pink tails all appear as the figures emerge. Each could be no larger than six inches tall, but they seem as active and curious as if they were already developed children. \n\n");
        DisplayText("Two emerge, then four, eight... you lose track. They swarm your body, scrambling for your chest, and take turns suckling at your nipples. Milk does their bodies good, making them grow rapidly, defining their genders as the girls grow cute little breasts and get broader hips and the boys develop their little mouse cocks and feel their balls swell. Each stops suckling when they reach two feet tall, and once every last one of them has departed your sore, abused cunt and drunk their fill of your milk, they give you a few grateful nuzzles, then run off towards the forest, leaving you alone to recover.\n");
        if (player.torso.chest.reduce(BreastRow.AverageLactation, 0) > 0 && player.torso.chest.reduce(BreastRow.AverageLactation, 0) < 5) {
            DisplayText("Your breasts won't seem to stop dribbling milk, lactating more heavily than before.");
            BreastModifier.boostLactation(player, .5);
        }
        VaginaModifier.displayStretchVagina(player, 60, true, true, false);
        if (player.torso.vaginas.get(0).wetness === VaginaWetness.DRY) player.torso.vaginas.get(0).wetness++;
        if (player.gender === 1) player.gender = 3;
        if (player.gender === 0) player.gender = 2;
        player.orgasm();
        player.stats.str += -1;
        player.stats.tou += -2;
        player.stats.spe += 3;
        player.stats.lib += 1;
        player.stats.sens += .5;
        // Butt increase
        if (player.torso.butt.rating < 14 && Utils.rand(2) === 0) {
            if (player.torso.butt.rating < 10) {
                player.torso.butt.rating++;
                DisplayText("\n\nYou notice your " + ButtDescriptor.describeButt(player) + " feeling larger and plumper after the ordeal.");
            }
            // Big butts grow slower!
            else if (player.torso.butt.rating < 14 && Utils.rand(2) === 0) {
                player.torso.butt.rating++;
                DisplayText("\n\nYou notice your " + ButtDescriptor.describeButt(player) + " feeling larger and plumper after the ordeal.");
            }
        }
        DisplayText().newline();
    }
}
