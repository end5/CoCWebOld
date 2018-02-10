import GenericPregnancyChanges from './GenericPregnancyChanges';
import BreastRow from '../../Body/BreastRow';
import IPregnancyEvent from '../../Body/Pregnancy/IPregnancyEvent';
import BreastDescriptor from '../../Descriptors/BreastDescriptor';
import LegDescriptor from '../../Descriptors/LegDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import DisplayText from '../../display/DisplayText';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Flags, { FlagEnum } from '../../Game/Flags';
import BreastModifier from '../../Modifiers/BreastModifier';
import VaginaModifier from '../../Modifiers/VaginaModifier';
import { Utils } from '../../Utilities/Utils';
import Player from '../Player';

export default class MarblePreg implements IPregnancyEvent {
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
            DisplayText("\nYour belly is distended and overswollen with your offspring, ").bold();
            if (player.stats.cor < 40) DisplayText("making it difficult to function.").bold();
            if (player.stats.cor >= 40 && player.stats.cor < 75) DisplayText("and you wonder how much longer you have to wait.").bold();
            if (player.stats.cor >= 75) DisplayText("and you're eager to give birth, so you can get fill your womb with a new charge.").bold();
            DisplayText().newline();
            player.stats.spe += -3;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 4;
        }
        if (incubationTime === 48) {
            DisplayText("\nYou rub your hands over your bulging belly, lost in the sensations of motherhood.  Whatever child is inside your overstretched womb seems to appreciate the attention, and stops its incessant squirming.\n").bold();
        }
        if (incubationTime === 32 || incubationTime === 150) {
            GenericPregnancyChanges.lactationIncrease(player);
        }
        if (incubationTime === 85) {
            // a small scene for very late in the pregnancy, its breast growth for the little cowgirl.  This scene should be a few days before birth, so the milk doesn't stop before the cowgirl is born.
            DisplayText("\nYour belly has become heavily pregnant; at the same time, ").bold();
            // If (PC has flat breasts)
            const largestBreastRating: number = player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating;
            if (largestBreastRating <= 0) {
                DisplayText("your chest has begun to feel a bit odd.  Your run your hands over it to find that your breasts have grown to around C-cups at some point when you weren't paying attention!  ").bold();
                player.torso.chest.get(0).rating = 3;
            }
            else if (largestBreastRating <= 1) {
                DisplayText("your breasts feel oddly tight in your top.  You put a hand to them and are startled when you find that they've grown to C-cups!  ").bold();
                player.torso.chest.get(0).rating = 3;
            }
            else if (largestBreastRating <= 10) {
                DisplayText("your breasts feel oddly full.  You grab them with your hands, and after a moment you're able to determine that they've grown about a cup in size.  ").bold();
                player.torso.chest.get(0).rating++;
            }
            else {
                DisplayText("your breasts feel a bit odd.  You put a hand on your chest and start touching them.  ").bold();
            }
            if (player.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier < 1) {
                DisplayText("You gasp slightly in surprise and realize that you've started lactating.").bold();
                BreastModifier.boostLactation(player, player.torso.chest.count);
            }
            else {
                DisplayText("A few drips of milk spill out of your breasts, as expected.  Though, it occurs to you that there is more milk coming out than before.").bold();
                BreastModifier.boostLactation(player, player.torso.chest.count * .25);
            }
            DisplayText().newline();
        }
    }

    public canBirth(player: Player, incubationTime: number): boolean {
        return incubationTime <= 0;
    }

    public birthScene(player: Player) {
        BreastModifier.boostLactation(player, .01);
        // if you like terrible outcomes
        if (Flags.list[FlagEnum.MARBLE_NURSERY_CONSTRUCTION] < 100) {
            DisplayText("\nYou feel a clenching sensation in your belly and something shifts inside.  Your contractions start a few moments later and you realize that it's time for your child to be born.  You cry out mildly in pain and lie down, letting your body start to push the baby out.  Marble doesn't seem to be around right now, so you can do nothing but push.\n\n");

            DisplayText("You push and heave with all your might, little else going through your mind. You somehow register when the head comes out, and soon the shoulders along with the rest of the body follow.  You lean back and pant for a while before feeling a pair of hands grab a hold of you. They slowly and clumsily feel up your body before finding your " + BreastDescriptor.describeChest(player) + " and a mouth quickly closes down on a " + BreastDescriptor.describeNipple(player, player.torso.chest.get(0)) + ".  You sigh softly, and drift off to sleep.");
            VaginaModifier.displayStretchVagina(player, 20, true, true, false);

            DisplayText("\n\nEventually you feel a hand on your face, and open your eyes to see Marble looking down at you.  \"<i>Sweetie, are you all right?  Why aren't you pregnant anymore?  Where is our child?</i>\" You stand up and look around.  There is no sign of the baby you were carrying; the child seems to have left after finishing its drink. You never even got to see its face...\n\n");

            DisplayText("Marble seems to understand what happened, but is really disappointed with you, \"<i>Sweetie, why couldn't you wait until after I'd finished the nursery...?</i>\"");
            // increase PC's hips as per normal, add to birth counter
        }
        else {

            DisplayText("\nYou feel a clenching sensation in your belly and something shifts inside.  Your contractions start a few moments later and you realize that it's time for your child to be born.  You cry out mildly in pain and lie down, letting your body start to push the baby out.  Marble rushes over and sees that it's time for you to give birth, so she picks you up and supports you as you continue pushing the child out of your now-gaping " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + ".");
            // 50% chance of it being a boy if Marble has been purified
            if (Flags.list[FlagEnum.MARBLE_PURIFIED] > 0 && Utils.rand(2) === 0)
            // it's a boy!
            {
                DisplayText("\n\nFor the next few minutes, you can't do much else but squeeze the large form inside your belly out.  Marble tries to help a little, pulling your nether lips open even further to make room for the head.  You gasp as you push the head out, and you hear Marble give a little cry of joy.  \"<i>It's a son of mine!</i>\" she tells you, but you can barely hear her due to the focus you're putting into the task of bringing this child out.");
                DisplayText("\n\nYou give an almighty heave and finally manage to push the shoulders out. The rest is downhill from there.  Once you've pushed the child completely out, Marble lays you down on the ground.  You rest there for a few moments, trying to catch your breath after the relatively difficult birthing.  When you finally have a chance to get up, you see that Marble has a small bull boy cradled in her arms, suckling on her nipple.  You can hardly believe that you managed to push out a boy that big!  Marble seems to understand and tells you that the child is actually a fair bit bigger now than when he came out.");
                DisplayText("\n\nShe helps you stand up and gives you the little boy to suckle for yourself.");
                DisplayText("\n\nYou put the child to your breast and let him drink down your milk.  You sigh in contentment and Marble says, \"<i>See sweetie?  It's a really good feeling, isn't it?</i>\"  You can't help but nod in agreement.  After a minute the little boy has had enough and you put him into the nursery.");

                DisplayText("The little boy is already starting to look like he is a few years old; he�s trotting around on his little hoofs.");
                // increase the size of the PC's hips, as per normal for pregnancies, increase birth counter
                if (player.torso.hips.rating < 10) {
                    player.torso.hips.rating++;
                    DisplayText("After the birth your " + player.inventory.equipment.armor.displayName + " fits a bit more snugly about your " + HipDescriptor.describeHips(player) + ".");
                }
                if (Flags.list[FlagEnum.MARBLE_BOYS] === 0)
                // has Marble had male kids before?
                {
                    DisplayText("You notice that Marble seems to be deep in thought, and you ask her what is wrong.  She starts after a moment and says, \"<i>Oh sweetie, no, it's nothing really.  I just never thought that I'd actually be able to father a son is all.  The thought never occurred to me.");
                }
                // add to marble-kids:
                Flags.list[FlagEnum.MARBLE_KIDS]++;
                Flags.list[FlagEnum.MARBLE_BOYS]++; // increase the number of male kids with Marble
            }
            else // end of new content
            // it's a girl!
            {
                VaginaModifier.displayStretchVagina(player, 20, true, true, false);
                DisplayText("\n\nFor the next few minutes, you can't do much else but squeeze the large form inside your belly out.  Marble tries to help a little, pulling your nether lips open even further to make room for the head.  You gasp as you push the head out, and you hear Marble give a little cry of joy.  \"<i>It's a daughter of mine!</i>\" she tells you, but you can barely hear her due to the focus you're putting into the task of bringing this child out.\n\n");
                DisplayText("You give an almighty heave and finally manage to push the shoulders out. The rest is downhill from there.  Once you've pushed the child completely out, Marble lays you down on the ground.  You rest there for a few moments, trying to catch your breath after the relatively difficult birthing.  When you finally have a chance to get up, you see that Marble has a small cowgirl cradled in her arms, suckling on her nipple.  You can hardly believe that you managed to push out a girl that big!  Marble seems to understand and tells you that the child is actually a fair bit bigger now than when she came out.\n\n");
                DisplayText("She helps you stand up and gives you the little girl to suckle for yourself.  ");
                if (player.statusAffects.get(StatusAffectType.Marble).value4 >= 20) {
                    DisplayText("As the child contentedly drinks from your " + BreastDescriptor.describeNipple(player, player.torso.chest.get(0)) + ", Marble tells you, \"<i>Sweetie, somehow I know that our kids won't have to worry about the addictive milk.  It will only make them healthy and strong.</i>\"  You nod at her and put the child into the nursery.  ");
                }
                else {
                    DisplayText("You put the child to your breast and let her drink down your milk.  You sigh in contentment and Marble says, \"<i>See sweetie?  It's a really good feeling, isn't it?</i>\"  You can't help but nod in agreement.  After a minute the little girl has had enough and you put her into the nursery.\n\n");
                }
                DisplayText("The little girl is already starting to look like she is a few years old; she's trotting around on her little hooves.");
                // add to marble-kids:
                Flags.list[FlagEnum.MARBLE_KIDS]++;
            }
            // increase the size of the PC's hips, as per normal for pregnancies, increase birth counter
            if (player.torso.hips.rating < 10) {
                player.torso.hips.rating++;
                DisplayText("\n\nAfter the birth your " + player.inventory.equipment.armor.displayName + " fits a bit more snugly about your " + HipDescriptor.describeHips(player) + ".");
            }
        }
        DisplayText().newline();
    }
}
