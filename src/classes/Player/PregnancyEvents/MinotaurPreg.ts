import GenericPregnancyChanges from './GenericPregnancyChanges';
import BreastRow from '../../Body/BreastRow';
import IPregnancyEvent from '../../Body/Pregnancy/IPregnancyEvent';
import { VaginaWetness } from '../../Body/Vagina';
import ButtDescriptor from '../../Descriptors/ButtDescriptor';
import LegDescriptor from '../../Descriptors/LowerBodyDescriptor';
import DisplayText from '../../display/DisplayText';
import Flags, { FlagEnum } from '../../Game/Flags';
import BreastModifier from '../../Modifiers/BreastModifier';
import VaginaModifier from '../../Modifiers/VaginaModifier';
import { Utils } from '../../Utilities/Utils';
import Player from '../Player';

export default class MinotaurPreg implements IPregnancyEvent {
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
            player.stats.spe += -1;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 2;
            DisplayText().newline();
        }
        if (incubationTime === 180) {
            DisplayText("\nThe sudden impact of a kick from inside your distended womb startles you.  Moments later it happens again, making you gasp and stagger.  Whatever is growing inside you is strong.\n").bold();
        }
        if (incubationTime === 120) {
            DisplayText("\nYour ever-growing belly makes your pregnancy obvious for those around you.  It's already as big as the belly of any pregnant woman back home.\n").bold();
        }
        if (incubationTime === 72) {
            DisplayText("\nYour belly is painfully distended and overswollen with the offspring of some huge beast, ").bold();
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
            DisplayText("\nYou rub your hands over your bulging belly, lost in the sensations of motherhood.  Whatever beast is inside your overstretched womb seems to appreciate the attention, and stops its incessant squirming.  ").bold();
            if (player.stats.cor < 40) DisplayText("Afterwards you feel somewhat disgusted with yourself.\n").bold();
            if (player.stats.cor >= 40 && player.stats.cor < 75) DisplayText("You estimate you'll give birth in the next few days.\n").bold();
            if (player.stats.cor >= 75) DisplayText("You find yourself daydreaming about birthing some huge monstrous beast, and raising it to fuck your wet pussy over and over.\n").bold();
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
        // Main Text here
        DisplayText("\nYou wake up suddenly to strong pains and pressures in your gut. As your eyes shoot wide open, you look down to see your belly absurdly full and distended. You can feel movement underneath the skin, and watch as it bulges and shifts as another living being moves independently inside you. Instinctively, you spread your legs as you feel the creature press outward, parting your cervix.\n\nYou try to push with your vaginal muscles, but you feel the creature moving more of its own volition. Your lips part as a pair of black-furred hands grip your vulva and begin to spread them and pull. You cry out in agony as your hips are widened forcefully by the passing mass of the being exiting your womb. A bovine face appears, mercifully lacking in horns. Shoulders follow, muscles already rippling on the newborn's form. A thick barrel chest follows, narrow, masculine hips and powerful bovine legs and hooves.\n\nFinally the worst is over as the toddler-sized minotaur gets to his feet, apparently already able to stand and walk.  He clops around your legs and over to your upper body, and takes hold of one of your milk-swollen breasts. He wraps his bestial lips around your nipple and begins to suckle, relieving the pressure on the milk-swollen jug.\n\n");
        DisplayText("He suckles and suckles and suckles, leaving you to wonder just how much milk you were actually holding, but even as you wonder this, your eyes grow wide as the newborn minotaur begins to grow. He gains inches at a time, his horns starting to grow from his skull, his muscles rippling and thickening, his cock lengthening, his balls swelling. He reaches four feet tall, but keeps growing, soon then five feet tall, starting to resemble more and more the monster who sired him. Finally, he pulls off your breasts, and finishes his milk-inspired growth spurt at six feet tall, looking practically full grown. His one gesture of gratitude for being brought into the world is a slobbery lick at your cheek, then he turns and runs off towards the mountain, leaving you to recover from the ordeal.  You swiftly pass out.\n\n");
        if (player.torso.chest.reduce(BreastRow.AverageLactation, 0) > 0 && player.torso.chest.reduce(BreastRow.AverageLactation, 0) < 5) {
            DisplayText("Your breasts won't seem to stop dribbling milk, lactating more heavily than before.");
            BreastModifier.boostLactation(player, 1);
        }
        VaginaModifier.displayStretchVagina(player, 120, true, true, false);
        if (player.torso.vaginas.get(0).wetness === VaginaWetness.DRY) player.torso.vaginas.get(0).wetness++;
        if (player.gender === 1) player.gender = 3;
        if (player.gender === 0) player.gender = 2;
        player.orgasm();
        player.stats.str += -1;
        player.stats.tou += -2;
        player.stats.spe += 3;
        player.stats.lib += 1;
        player.stats.sens += .5;
        // Hip and butt increase
        if (player.torso.butt.rating < 12 && Utils.rand(2) === 0) {
            player.torso.butt.rating++;
            DisplayText("\n\nYou notice your " + ButtDescriptor.describeButt(player) + " feeling larger and plumper after the ordeal.");
        }
        else if (player.torso.hips.rating < 15) {
            player.torso.hips.rating++;
            DisplayText("\n\nAfter the birth your " + player.inventory.equipment.armor.displayName + " fits a bit more snugly about your " + LegDescriptor.describeHips(player) + ".");
        }
        DisplayText().newline();
        // 326 Number of sons grown
        // 327 Number of sons pending
        // 328 growup countdown
        Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00327]++;
        if (Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00328] === 0)
            Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00328] = 150;
    }
}
