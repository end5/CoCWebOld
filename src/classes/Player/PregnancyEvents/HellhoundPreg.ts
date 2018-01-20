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

export default class HellhoundPreg implements IPregnancyEvent {
    public incubationDisplay(player: Player, incubationTime: number) {
        if (incubationTime === 290) {
            DisplayText("\nYou realize your belly has gotten slightly larger.  Maybe you need to cut back on the strange food.\n").bold();
        }
        if (incubationTime === 240) {
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
            DisplayText("\nThere is a strange heat within your belly, it makes you a little tired.\n").bold();
            player.stats.tou += -1;
        }
        if (incubationTime === 120) {
            DisplayText("\nYour ever-growing belly makes your pregnancy obvious for those around you.  With each day you can feel the heat within you growing.\n").bold();
            player.stats.tou += -1;
        }
        if (incubationTime === 72) {
            DisplayText("\nThe heat within doesn't drain you as much as it used to, instead giving you an odd strength.").bold();
            DisplayText().newline();
            player.stats.str += 1;
            player.stats.tou += 1;
        }
        if (incubationTime === 48) {
            DisplayText("\nYou can feel two large lumps pushing against your womb together ").bold();
            if (player.stats.cor < 40) DisplayText("making it difficult to function.").bold();
            if (player.stats.cor >= 40 && player.stats.cor < 75) DisplayText("and you wonder how much longer you have to wait.").bold();
            if (player.stats.cor >= 75) DisplayText("and you're eager to give birth, so you can get impregnated again by monstrous cocks unloading their corrupted seed directly into your eager womb.").bold();
            DisplayText().newline();
            player.stats.spe += -2;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 4;
        }
        if (incubationTime === 32 || incubationTime === 64 || incubationTime === 85 || incubationTime === 150) {
            GenericPregnancyChanges.lactationIncrease(player);
        }
    }

    public canBirth(player: Player, incubationTime: number): boolean {
        return incubationTime <= 0;
    }

    public birthScene(player: Player) {
        DisplayText("\nYou are suddenly awoken by the heat inside your womb suddenly flaring up rather intensely.  It gives you a sudden charge of energy and you feel a strong need to stand up.  You can feel the two heads moving inside of you and you know that a hellhound will soon be born.  Guided by your instincts, you spread your legs and squat down, but wonder how exactly you are going to pass a creature with two heads?\n\n");
        DisplayText("Hearing a hiss, you look down to see drops of water hitting the ground and instantly turning to steam.  There is unnatural heat filling you, it's hot enough to boil water; but thanks to the creature inside you, you're barely feeling a thing!  More energy fills you and you begin to push down on the child within in earnest.  The process is painful, but satisfying; you feel like you could push out a mountain with the energy you have right now.  Within a minute, you can feel the heads emerge.  The heads are quickly followed by the rest of the body and you catch your hellhound child in your hands and lift it up to look at it.\n\n");
        DisplayText("You can see the distinctive dog heads are wrapped around each other and yipping softly; a hint of flame can sometimes be seen inside their mouths.  Its cute paws are waving in the air looking for purchase, but the rest of its body looks entirely human except for the double dicks, and it even has your skin color.  Its mouths are aching for nutrition, and you realize that your breasts are filled with what this pup needs and pull it to your chest.  Each head quickly finds a nipple and begins to suckle.  Having finished the birthing, you contentedly sit back down and bask in the feeling of giving milk to your child, or is it children?\n\n");
        DisplayText("You sit there in a state of euphoria for some time.  It's not until the child in front of you starts to become uncomfortably hot and heavy, that you are brought back to reality.  You look down to see that the hellhound pup has grown to three times its original size and even sprouted the distinctive layer of tough black fur.  The beast is licking contentedly at your breasts instead of sucking.  It was the now-full flames in its mouth that had broken your reverie, but before you get a real grasp of what had happened, the hellhound pulls away from you and gives you a few quick happy barks before turning around and running off into the wilds, dropping down onto four legs just before disappearing from view.  You feel the unnatural strength you gained during the birth fade away, and you fall into a deep contented sleep.\n\n");
        BreastModifier.boostLactation(player, .01);
        // Main Text here
        if (player.torso.chest.reduce(BreastRow.AverageLactation, 0) > 0 && player.torso.chest.reduce(BreastRow.AverageLactation, 0) < 5) {
            DisplayText("Your breasts won't seem to stop dribbling milk, lactating more heavily than before.  ");
            BreastModifier.boostLactation(player, .5);
        }
        VaginaModifier.displayStretchVagina(player, 60, true);
        if (player.torso.vaginas.get(0).wetness === VaginaWetness.DRY) player.torso.vaginas.get(0).wetness++;
        if (player.gender === 1) player.gender = 3;
        if (player.gender === 0) player.gender = 2;
        player.orgasm();
        player.stats.str += -1;
        player.stats.tou += -1;
        player.stats.spe += 2;
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
