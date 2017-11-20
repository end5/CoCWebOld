import IPregnancyEvent from '../../Body/Pregnancy/IPregnancyEvent';
import BreastDescriptor from '../../Descriptors/BreastDescriptor';
import ButtDescriptor from '../../Descriptors/ButtDescriptor';
import LowerBodyDescriptor from '../../Descriptors/LowerBodyDescriptor';
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
        if (incubationTime == 800) {
            DisplayText.text("\nYour womb gurgles strangely.\n");
        }
        if (incubationTime == 785) {
            //DisplayText.text("\n<b>An unexpected change occurs, no doubt brought on by the bunny's eggs inside you!</b>");
            new NeonPinkEgg(true).use(player);
            DisplayText.text("\n");
        }
        if (incubationTime == 776) {
            DisplayText.text("\nYour womb feels full and bloated.\n");
        }
        if (incubationTime == 765) {
            //DisplayText.text("\n<b>An unexpected change occurs, no doubt brought on by the bunny's eggs inside you!</b>");
            new NeonPinkEgg(true).use(player);
            DisplayText.text("\n");
        }
        if (incubationTime <= 745 && incubationTime > 400) {
            DisplayText.text("\n<b>After dealing with the discomfort and bodily changes for the past day or so, you finally get the feeling that the eggs in your womb have dissolved.</b>\n");
        }
        //BREAK - REAL PREGNANCY BELOW THIS:
        if (incubationTime == 198) {
            DisplayText.text("\n<b>You realize your belly has gotten slightly larger.  Maybe there's some truth to what the bunny-girl said.</b>\n");
        }
        if (incubationTime == 178) {
            DisplayText.text("\n<b>Your belly is getting more noticably distended.   You are probably pregnant.</b>\n");
        }
        if (incubationTime == 156) {
            DisplayText.text("\n<b>The unmistakable bulge of pregnancy is visible in your tummy.  ");
            if (player.stats.cor < 40) DisplayText.text("You are distressed by your unwanted pregnancy, and your inability to force this thing out of you.</b>");
            if (player.stats.cor >= 40 && player.stats.cor < 75) DisplayText.text("You find yourself wondering what giving birth to bunny-girls is like.</b>");
            if (player.stats.cor >= 75) DisplayText.text("You dreamily wonder if you could find a bunny willing to put more than two eggs inside you at once.</b>");
            player.stats.spe += -1;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 2;
            DisplayText.text("\n");
        }
        if (incubationTime == 140) {
            DisplayText.text("\n<b>The sudden impact of a kick from inside your womb startles you, and it's immediately followed by a second on the other side.</b>\n");
        }
        if (incubationTime == 120) {
            DisplayText.text("\n<b>Your ever-growing belly makes your pregnancy obvious for those around you.</b>\n");
        }
        if (incubationTime == 72) {
            DisplayText.text("\n<b>Your belly is painfully distended, ");
            if (player.stats.cor < 40) DisplayText.text("making it difficult to function.</b>");
            if (player.stats.cor >= 40 && player.stats.cor < 75) DisplayText.text("and you wonder how much longer you have to wait.</b>");
            if (player.stats.cor >= 75) DisplayText.text("and you're eager to give birth so you'll be able to get pregnant again.</b>");
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
            if (player.stats.cor >= 75) DisplayText.text("You find yourself daydreaming about birthing bunnies repeatedly, each time being re-impregnated with dozens of eggs from your lusty adolescent children.</b>\n");
        }
    }

    public canBirth(player: Player, incubationTime: number): boolean {
        return incubationTime <= 0;
    }

    public birth(player: Player) {
        DisplayText.text("\n");
        DisplayText.text("A dangerous rumble comes from your womb, signaling that it's time to birth your body's cargo at last.  Your " + LowerBodyDescriptor.describeLegs(player) + " wobble unsteadily as your strength ebbs with every gush that erupts  from your now-broken water until you collapse on your " + ButtDescriptor.describeButt(player) + ", grunting and groaning.  At first it goes slow � there's just a few small contractions that are more strange than anything else, rippling down your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " and squirting out more of your pregnancy's fluid.  All too soon the tempo kicks up, and you feel something starting to stretch you wider and wider.\n\n");

        DisplayText.text("You heave and push, instinctively driven to flex muscles you didn't even know you had to speed the super human labor you've entered into.  ");
        if (player.vaginalCapacity() < 60) DisplayText.text("It hurts a little as your cervix starts to stretch wide");
        else DisplayText.text("It actually feels kind of nice as your cervix is stretched wide");
        DisplayText.text(", but somehow your body accommodates the forced dilation without too much discomfort.  It's soon forgotten as you feel your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " pushed into a large sphere, stretched around the inhuman form of your child as it squirms and writhes inside you on its path to freedom.  You grunt and flex, watching with disbelief as a tiny, rabbit-eared form slides from your slick canal into the grass, the process leaving your " + BreastDescriptor.describeChest(player) + " heaving with unexpected pleasure.\n\n");

        DisplayText.text("The whole process starts over again � there's another one!  By now your well-stretched pussy is oozing both the birthing fluids and your own lubricants, and the second bunny-child slides down to bump into its sibling with ease.  You shake and shudder, groaning and spasming as you nearly cum from the stimulation, but in the end you're left panting and horny.  The two bunnies look like miniature people except for their ears, tails, and fuzzy legs.  Your children lick themselves clean before hopping up onto your " + BreastDescriptor.describeChest(player) + " and suckling your nipples for a while");
        if (player.lactationQ() > 500) DisplayText.text(", growing fat from all the milk");
        DisplayText.text(".  At last they finish, and with one last nuzzle, your strange bunny-children go hopping off, doubtless to find more of their own kind.\n\n");

        DisplayText.text("You sink into restful unconsciousness, marveling at how stretchy and sensitive your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " feels now.");
        VaginaModifier.displayStretchVagina(player, 60, true, true, false);
        BreastModifier.boostLactation(player, .01);
        //Boost capacity
        if (player.vaginalCapacity() < 300) {
            if (!player.statusAffects.has(StatusAffectType.BonusVCapacity)) player.statusAffects.add(StatusAffectFactory.create(StatusAffectType.BonusVCapacity, 0, 0, 0, 0));
            player.statusAffects.get(StatusAffectType.BonusVCapacity).value1 = 10;
        }
        player.orgasm();
        player.stats.lib += 1;
        player.stats.sens += 10;
        player.stats.cor += -2;
    }
}