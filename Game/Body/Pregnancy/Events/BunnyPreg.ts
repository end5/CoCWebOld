import { Character } from "../../../Character/Character";
import { CView } from "../../../../Engine/Display/ContentView";
import { Womb } from "../Womb";
import { IPregnancyEvent } from "../IPregnancyEvent";
import { Vagina } from "../../Vagina";
import { describeLegs } from "../../../Descriptors/LegDescriptor";
import { describeButt } from "../../../Descriptors/ButtDescriptor";
import { describeVagina } from "../../../Descriptors/VaginaDescriptor";
import { describeChest } from "../../../Descriptors/BreastDescriptor";
import { displayStretchVagina } from "../../../Modifiers/VaginaModifier";
import { boostLactation } from "../../../Modifiers/BreastModifier";
import { StatusEffectType } from "../../../Effects/StatusEffectType";

export class BunnyPregEvent implements IPregnancyEvent {
    public incubationDisplay(player: Character, womb: Womb): void {
        if (womb.pregnancy.incubation === 800) {
            CView.text("\nYour womb gurgles strangely.\n");
        }
        if (womb.pregnancy.incubation === 785) {
            // CView.text("\n<b>An unexpected change occurs, no doubt brought on by the bunny's eggs inside you!</b>");
            neonPinkEgg(true, player);
            CView.text("\n");
        }
        if (womb.pregnancy.incubation === 776) {
            CView.text("\nYour womb feels full and bloated.\n");
        }
        if (womb.pregnancy.incubation === 765) {
            // CView.text("\n<b>An unexpected change occurs, no doubt brought on by the bunny's eggs inside you!</b>");
            neonPinkEgg(true, player);
            CView.text("\n");
        }
        if (womb.pregnancy.incubation <= 745 && womb.pregnancy.incubation > 400) {
            CView.text("\n<b>After dealing with the discomfort and bodily changes for the past day or so, you finally get the feeling that the eggs in your womb have dissolved.</b>\n");
            womb.clear(); // Clear Pregnancy
        }
        // BREAK - REAL PREGNANCY BELOW THIS:
        if (womb.pregnancy.incubation === 198) {
            CView.text("\n<b>You realize your belly has gotten slightly larger.  Maybe there's some truth to what the bunny-girl said.</b>\n");
        }
        if (womb.pregnancy.incubation === 178) {
            CView.text("\n<b>Your belly is getting more noticably distended.   You are probably pregnant.</b>\n");
        }
        if (womb.pregnancy.incubation === 156) {
            CView.text("\n<b>The unmistakable bulge of pregnancy is visible in your tummy.  ");
            if (player.stats.cor < 40) CView.text("You are distressed by your unwanted pregnancy, and your inability to force this thing out of you.</b>");
            if (player.stats.cor >= 40 && player.stats.cor < 75) CView.text("You find yourself wondering what giving birth to bunny-girls is like.</b>");
            if (player.stats.cor >= 75) CView.text("You dreamily wonder if you could find a bunny willing to put more than two eggs inside you at once.</b>");
            player.stats.spe += -1;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 2;

            CView.text("\n");
        }
        if (womb.pregnancy.incubation === 140) {
            CView.text("\n<b>The sudden impact of a kick from inside your womb startles you, and it's immediately followed by a second on the other side.</b>\n");
        }
        if (womb.pregnancy.incubation === 120) {
            CView.text("\n<b>Your ever-growing belly makes your pregnancy obvious for those around you.</b>\n");
        }
        if (womb.pregnancy.incubation === 72) {
            CView.text("\n<b>Your belly is painfully distended, ");
            if (player.stats.cor < 40) CView.text("making it difficult to function.</b>");
            if (player.stats.cor >= 40 && player.stats.cor < 75) CView.text("and you wonder how much longer you have to wait.</b>");
            if (player.stats.cor >= 75) CView.text("and you're eager to give birth so you'll be able to get pregnant again.</b>");
            CView.text("\n");
            player.stats.spe += -3;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 4;

        }
        if (womb.pregnancy.incubation === 48) {
            CView.text("\n<b>You rub your hands over your bulging belly, lost in the sensations of motherhood.  ");
            if (player.stats.cor < 40) CView.text("Afterwards you feel somewhat disgusted with yourself.</b>\n");
            if (player.stats.cor >= 40 && player.stats.cor < 75) CView.text("You estimate you'll give birth in the next few days.</b>\n");
            if (player.stats.cor >= 75) CView.text("You find yourself daydreaming about birthing bunnies repeatedly, each time being re-impregnated with dozens of eggs from your lusty adolescent children.</b>\n");
        }
    }

    public canBirth(player: Character, womb: Womb): boolean {
        return womb.pregnancy.incubation === 1;
    }

    public birthScene(player: Character, womb: Womb): void {
        CView.text("\n");
        if (player.body.vaginas.length === 0) {
            CView.text("You feel a terrible pressure in your groin... then an incredible pain accompanied by the rending of flesh.  You look down and behold a vagina.  ");
            player.body.vaginas.add(new Vagina());
        }
        CView.text("A dangerous rumble comes from your womb, signaling that it's time to birth your body's cargo at last.  Your " + describeLegs(player) + " wobble unsteadily as your strength ebbs with every gush that erupts  from your now-broken water until you collapse on your " + describeButt(player) + ", grunting and groaning.  At first it goes slow – there's just a few small contractions that are more strange than anything else, rippling down your " + describeVagina(player, player.body.vaginas.get(0)) + " and squirting out more of your pregnancy's fluid.  All too soon the tempo kicks up, and you feel something starting to stretch you wider and wider.\n\n");

        CView.text("You heave and push, instinctively driven to flex muscles you didn't even know you had to speed the super human labor you've entered into.  ");
        if (player.vaginalCapacity() < 60) CView.text("It hurts a little as your cervix starts to stretch wide");
        else CView.text("It actually feels kind of nice as your cervix is stretched wide");
        CView.text(", but somehow your body accommodates the forced dilation without too much discomfort.  It's soon forgotten as you feel your " + describeVagina(player, player.body.vaginas.get(0)) + " pushed into a large sphere, stretched around the inhuman form of your child as it squirms and writhes inside you on its path to freedom.  You grunt and flex, watching with disbelief as a tiny, rabbit-eared form slides from your slick canal into the grass, the process leaving your " + describeChest(player) + " heaving with unexpected pleasure.\n\n");

        CView.text("The whole process starts over again – there's another one!  By now your well-stretched pussy is oozing both the birthing fluids and your own lubricants, and the second bunny-child slides down to bump into its sibling with ease.  You shake and shudder, groaning and spasming as you nearly cum from the stimulation, but in the end you're left panting and horny.  The two bunnies look like miniature people except for their ears, tails, and fuzzy legs.  Your children lick themselves clean before hopping up onto your " + describeChest(player) + " and suckling your nipples for a while");
        if (player.lactationQ() > 500) CView.text(", growing fat from all the milk");
        CView.text(".  At last they finish, and with one last nuzzle, your strange bunny-children go hopping off, doubtless to find more of their own kind.\n\n");

        CView.text("You sink into restful unconsciousness, marveling at how stretchy and sensitive your " + describeVagina(player, player.body.vaginas.get(0)) + " feels now.");
        displayStretchVagina(player, 60, true, true, false);
        boostLactation(player, .01);
        // Boost capacity
        if (player.vaginalCapacity() < 300) {
            if (!player.effects.has(StatusEffectType.BonusVCapacity)) player.effects.add(StatusEffectType.BonusVCapacity, 0, 0, 0, 0);
            player.effects.get(StatusEffectType.BonusVCapacity).value1 += 10;
        }
        womb.clear();
        player.orgasm();
        player.stats.lib += 1;
        player.stats.sens += 10;
        player.stats.cor += -2;
    }
}
