import GenericPregnancyChanges from './GenericPregnancyChanges';
import ButtDescriptor from '../../Descriptors/ButtDescriptor';
import LowerBodyDescriptor from '../../Descriptors/LowerBodyDescriptor';
import CreatureChanges from '../../display/CreatureChange';
import MainScreen from '../../display/MainScreen';
import Flags, { FlagEnum } from '../../Game/Flags';
import Player from '../../Player';
import Utils from '../../Utilities/Utils';
import IPregnancyEvent from '../IPregnancyEvent';
import { VaginaWetness } from '../Vagina';

export default class MinotaurPreg implements IPregnancyEvent {
    public incubationDisplay(player: Player, incubationTime: number) {
        if (incubationTime == 336) {
            MainScreen.text("\n<b>You realize your belly has gotten slightly larger.  Maybe you need to cut back on the strange food.</b>\n", false);
        }
        if (incubationTime == 280) {
            MainScreen.text("\n<b>Your belly is getting more noticably distended and squirming around.  You are probably pregnant.</b>\n", false);
        }
        if (incubationTime == 216) {
            MainScreen.text("\n<b>The unmistakable bulge of pregnancy is visible in your tummy.  It's feeling heavier by the moment.  ", false);
            if (player.stats.cor < 40) MainScreen.text("You are distressed by your unwanted pregnancy, and your inability to force this thing out of you.</b>", false);
            if (player.stats.cor >= 40 && player.stats.cor < 75) MainScreen.text("Considering the size of the creatures you've fucked, you hope it doesn't hurt when it comes out.</b>", false);
            if (player.stats.cor >= 75) MainScreen.text("You think dreamily about the monstrous cocks that have recently been fucking you, and hope that your offspring inherit such a pleasure tool.</b>", false);
            player.stats.spe += -1;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 2;
            MainScreen.text("\n", false);
        }
        if (incubationTime == 180) {
            MainScreen.text("\n<b>The sudden impact of a kick from inside your distended womb startles you.  Moments later it happens again, making you gasp and stagger.  Whatever is growing inside you is strong.</b>\n", false);
        }
        if (incubationTime == 120) {
            MainScreen.text("\n<b>Your ever-growing belly makes your pregnancy obvious for those around you.  It's already as big as the belly of any pregnant woman back home.</b>\n", false);
        }
        if (incubationTime == 72) {
            MainScreen.text("\n<b>Your belly is painfully distended and overswollen with the offspring of some huge beast, ", false);
            if (player.stats.cor < 40) MainScreen.text("making it difficult to function.</b>", false);
            if (player.stats.cor >= 40 && player.stats.cor < 75) MainScreen.text("and you wonder how much longer you have to wait.</b>", false);
            if (player.stats.cor >= 75) MainScreen.text("and you're eager to give birth, so you can get impregnated again by monstrous cocks unloading their corrupted seed directly into your eager womb.</b>", false);
            MainScreen.text("\n", false);
            player.stats.spe += -3;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 4;
        }
        if (incubationTime == 48) {
            MainScreen.text("\n<b>You rub your hands over your bulging belly, lost in the sensations of motherhood.  Whatever beast is inside your overstretched womb seems to appreciate the attention, and stops its incessant squirming.  ", false);
            if (player.stats.cor < 40) MainScreen.text("Afterwards you feel somewhat disgusted with yourself.</b>\n", false);
            if (player.stats.cor >= 40 && player.stats.cor < 75) MainScreen.text("You estimate you'll give birth in the next few days.</b>\n", false);
            if (player.stats.cor >= 75) MainScreen.text("You find yourself daydreaming about birthing some huge monstrous beast, and raising it to fuck your wet pussy over and over.</b>\n", false);
        }
        if (incubationTime == 32 || incubationTime == 64 || incubationTime == 85 || incubationTime == 150) {
            GenericPregnancyChanges.lactationIncrease(player);
        }
    }

    public canBirth(player: Player, incubationTime: number): boolean {
        return incubationTime <= 0;
    }

    public birth(player: Player) {
        player.boostLactation(.01);
        //Main Text here
        MainScreen.text("\nYou wake up suddenly to strong pains and pressures in your gut. As your eyes shoot wide open, you look down to see your belly absurdly full and distended. You can feel movement underneath the skin, and watch as it bulges and shifts as another living being moves independently inside you. Instinctively, you spread your legs as you feel the creature press outward, parting your cervix.\n\nYou try to push with your vaginal muscles, but you feel the creature moving more of its own volition. Your lips part as a pair of black-furred hands grip your vulva and begin to spread them and pull. You cry out in agony as your hips are widened forcefully by the passing mass of the being exiting your womb. A bovine face appears, mercifully lacking in horns. Shoulders follow, muscles already rippling on the newborn's form. A thick barrel chest follows, narrow, masculine hips and powerful bovine legs and hooves.\n\nFinally the worst is over as the toddler-sized minotaur gets to his feet, apparently already able to stand and walk.  He clops around your legs and over to your upper body, and takes hold of one of your milk-swollen breasts. He wraps his bestial lips around your nipple and begins to suckle, relieving the pressure on the milk-swollen jug.\n\n", false);
        MainScreen.text("He suckles and suckles and suckles, leaving you to wonder just how much milk you were actually holding, but even as you wonder this, your eyes grow wide as the newborn minotaur begins to grow. He gains inches at a time, his horns starting to grow from his skull, his muscles rippling and thickening, his cock lengthening, his balls swelling. He reaches four feet tall, but keeps growing, soon then five feet tall, starting to resemble more and more the monster who sired him. Finally, he pulls off your breasts, and finishes his milk-inspired growth spurt at six feet tall, looking practically full grown. His one gesture of gratitude for being brought into the world is a slobbery lick at your cheek, then he turns and runs off towards the mountain, leaving you to recover from the ordeal.  You swiftly pass out.\n\n", false);
        if (player.upperBody.chest.averageLactation() > 0 && player.upperBody.chest.averageLactation() < 5) {
            MainScreen.text("Your breasts won't seem to stop dribbling milk, lactating more heavily than before.", false);
            player.boostLactation(1);
        }
        CreatureChanges.stretchVagina(player, 120, true, true, false);
        if (player.lowerBody.vaginaSpot.get(0).vaginalWetness == VaginaWetness.DRY) player.lowerBody.vaginaSpot.get(0).vaginalWetness++;
        if (player.gender == 1) player.gender = 3;
        if (player.gender == 0) player.gender = 2;
        player.orgasm();
        player.stats.str += -1;
        player.stats.tou += -2;
        player.stats.spe += 3;
        player.stats.lib += 1;
        player.stats.sens += .5;
        //Hip and butt increase
        if (player.lowerBody.butt.buttRating < 12 && Utils.rand(2) == 0) {
            player.lowerBody.butt.buttRating++;
            MainScreen.text("\n\nYou notice your " + ButtDescriptor.describeButt(player) + " feeling larger and plumper after the ordeal.", false);
        }
        else if (player.lowerBody.hipRating < 15) {
            player.lowerBody.hipRating++;
            MainScreen.text("\n\nAfter the birth your " + player.inventory.armor.displayName + " fits a bit more snugly about your " + LowerBodyDescriptor.describeHips(player) + ".", false);
        }
        MainScreen.text("\n", false);
        //326 Number of sons grown
        //327 Number of sons pending
        //328 growup countdown
        Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00327]++;
        if (Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00328] == 0)
            Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00328] = 150;
    }
}