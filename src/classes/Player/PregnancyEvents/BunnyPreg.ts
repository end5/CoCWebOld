import IPregnancyEvent from '../../Body/Pregnancy/IPregnancyEvent';
import BreastDescriptor from '../../Descriptors/BreastDescriptor';
import ButtDescriptor from '../../Descriptors/ButtDescriptor';
import LegDescriptor from '../../Descriptors/LowerBodyDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import DisplayText from '../../display/DisplayText';
import StatusAffectFactory from '../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import NeonPinkEgg from '../../Items/Consumables/NeonPinkEgg';
import BreastModifier from '../../Modifiers/BreastModifier';
import VaginaModifier from '../../Modifiers/VaginaModifier';
import Player from '../Player';

export default class BunnyPreg implements IPregnancyEvent {
    public incubationDisplay(player: Player, incubationTime: number) {
        if (incubationTime === 800) {
            DisplayText("\nYour womb gurgles strangely.\n");
        }
        if (incubationTime === 785) {
            // DisplayText("\nAn unexpected change occurs, no doubt brought on by the bunny's eggs inside you!").bold();
            new NeonPinkEgg(true).use(player);
            DisplayText().newline();
        }
        if (incubationTime === 776) {
            DisplayText("\nYour womb feels full and bloated.\n");
        }
        if (incubationTime === 765) {
            // DisplayText("\nAn unexpected change occurs, no doubt brought on by the bunny's eggs inside you!").bold();
            new NeonPinkEgg(true).use(player);
            DisplayText().newline();
        }
        if (incubationTime <= 745 && incubationTime > 400) {
            DisplayText("\nAfter dealing with the discomfort and bodily changes for the past day or so, you finally get the feeling that the eggs in your womb have dissolved.\n").bold();
        }
        // BREAK - REAL PREGNANCY BELOW THIS:
        if (incubationTime === 198) {
            DisplayText("\nYou realize your belly has gotten slightly larger.  Maybe there's some truth to what the bunny-girl said.\n").bold();
        }
        if (incubationTime === 178) {
            DisplayText("\nYour belly is getting more noticably distended.   You are probably pregnant.\n").bold();
        }
        if (incubationTime === 156) {
            DisplayText("\nThe unmistakable bulge of pregnancy is visible in your tummy.  ").bold();
            if (player.stats.cor < 40) DisplayText("You are distressed by your unwanted pregnancy, and your inability to force this thing out of you.");
            if (player.stats.cor >= 40 && player.stats.cor < 75) DisplayText("You find yourself wondering what giving birth to bunny-girls is like.").bold();
            if (player.stats.cor >= 75) DisplayText("You dreamily wonder if you could find a bunny willing to put more than two eggs inside you at once.").bold();
            player.stats.spe += -1;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 2;
            DisplayText().newline();
        }
        if (incubationTime === 140) {
            DisplayText("\nThe sudden impact of a kick from inside your womb startles you, and it's immediately followed by a second on the other side.\n").bold();
        }
        if (incubationTime === 120) {
            DisplayText("\nYour ever-growing belly makes your pregnancy obvious for those around you.\n").bold();
        }
        if (incubationTime === 72) {
            DisplayText("\nYour belly is painfully distended, ").bold();
            if (player.stats.cor < 40) DisplayText("making it difficult to function.");
            if (player.stats.cor >= 40 && player.stats.cor < 75) DisplayText("and you wonder how much longer you have to wait.").bold();
            if (player.stats.cor >= 75) DisplayText("and you're eager to give birth so you'll be able to get pregnant again.").bold();
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
            if (player.stats.cor >= 75) DisplayText("You find yourself daydreaming about birthing bunnies repeatedly, each time being re-impregnated with dozens of eggs from your lusty adolescent children.\n").bold();
        }
    }

    public canBirth(player: Player, incubationTime: number): boolean {
        return incubationTime <= 0;
    }

    public birthScene(player: Player) {
        DisplayText().newline();
        DisplayText("A dangerous rumble comes from your womb, signaling that it's time to birth your body's cargo at last.  Your " + LegDescriptor.describeLegs(player) + " wobble unsteadily as your strength ebbs with every gush that erupts  from your now-broken water until you collapse on your " + ButtDescriptor.describeButt(player) + ", grunting and groaning.  At first it goes slow, there's just a few small contractions that are more strange than anything else, rippling down your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + " and squirting out more of your pregnancy's fluid.  All too soon the tempo kicks up, and you feel something starting to stretch you wider and wider.\n\n");

        DisplayText("You heave and push, instinctively driven to flex muscles you didn't even know you had to speed the super human labor you've entered into.  ");
        if (player.vaginalCapacity() < 60) DisplayText("It hurts a little as your cervix starts to stretch wide");
        else DisplayText("It actually feels kind of nice as your cervix is stretched wide");
        DisplayText(", but somehow your body accommodates the forced dilation without too much discomfort.  It's soon forgotten as you feel your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + " pushed into a large sphere, stretched around the inhuman form of your child as it squirms and writhes inside you on its path to freedom.  You grunt and flex, watching with disbelief as a tiny, rabbit-eared form slides from your slick canal into the grass, the process leaving your " + BreastDescriptor.describeChest(player) + " heaving with unexpected pleasure.\n\n");

        DisplayText("The whole process starts over again, there's another one!  By now your well-stretched pussy is oozing both the birthing fluids and your own lubricants, and the second bunny-child slides down to bump into its sibling with ease.  You shake and shudder, groaning and spasming as you nearly cum from the stimulation, but in the end you're left panting and horny.  The two bunnies look like miniature people except for their ears, tails, and fuzzy legs.  Your children lick themselves clean before hopping up onto your " + BreastDescriptor.describeChest(player) + " and suckling your nipples for a while");
        if (player.lactationQ() > 500) DisplayText(", growing fat from all the milk");
        DisplayText(".  At last they finish, and with one last nuzzle, your strange bunny-children go hopping off, doubtless to find more of their own kind.\n\n");

        DisplayText("You sink into restful unconsciousness, marveling at how stretchy and sensitive your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + " feels now.");
        VaginaModifier.displayStretchVagina(player, 60, true, true, false);
        BreastModifier.boostLactation(player, .01);
        // Boost capacity
        if (player.vaginalCapacity() < 300) {
            if (!player.statusAffects.has(StatusAffectType.BonusVCapacity))
                player.statusAffects.add(StatusAffectType.BonusVCapacity, 0, 0, 0, 0);
            player.statusAffects.get(StatusAffectType.BonusVCapacity).value1 = 10;
        }
        player.orgasm();
        player.stats.lib += 1;
        player.stats.sens += 10;
        player.stats.cor += -2;
    }
}
