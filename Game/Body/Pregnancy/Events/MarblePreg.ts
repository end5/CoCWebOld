import { Character } from "../../../Character/Character";
import { Womb } from "../Womb";
import { CView } from "../../../../Engine/Display/ContentView";
import { BreastRow } from "../../BreastRow";
import { boostLactation, growTopBreastRow } from "../../../Modifiers/BreastModifier";
import { IPregnancyEvent } from "../IPregnancyEvent";
import { Vagina } from "../../Vagina";
import { describeChest, describeNipple } from "../../../Descriptors/BreastDescriptor";
import { displayStretchVagina } from "../../../Modifiers/VaginaModifier";
import { describeVagina } from "../../../Descriptors/VaginaDescriptor";
import { randInt } from "../../../../Engine/Utilities/SMath";
import { describeHips } from "../../../Descriptors/HipDescriptor";
import { StatusEffectType } from "../../../Effects/StatusEffectType";
import { MarbleFlags } from "../../../Scenes/NPCs/MarbleScene";

export class MarblePregEvent implements IPregnancyEvent {
    public incubationDisplay(player: Character, womb: Womb): void {
        if (womb.pregnancy.incubation === 336) {
            CView.text("\n<b>You realize your belly has gotten slightly larger.  Maybe you need to cut back on the strange food.</b>\n");
        }
        if (womb.pregnancy.incubation === 280) {
            CView.text("\n<b>Your belly is getting more noticably distended and squirming around.  You are probably pregnant.</b>\n");
        }
        if (womb.pregnancy.incubation === 216) {
            CView.text("\n<b>The unmistakable bulge of pregnancy is visible in your tummy.  It's feeling heavier by the moment.  ");
            if (player.stats.cor < 40) CView.text("You are distressed by your unwanted pregnancy, and your inability to force this thing out of you.</b>");
            if (player.stats.cor >= 40 && player.stats.cor < 75) CView.text("Considering the size of the creatures you've fucked, you hope it doesn't hurt when it comes out.</b>");
            if (player.stats.cor >= 75) CView.text("You think dreamily about the monstrous cocks that have recently been fucking you, and hope that your offspring inherit such a pleasure tool.</b>");
            player.stats.spe += -1;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 2;

            CView.text("\n");
        }
        if (womb.pregnancy.incubation === 180) {
            CView.text("\n<b>The sudden impact of a kick from inside your distended womb startles you.  Moments later it happens again, making you gasp and stagger.  Whatever is growing inside you is strong.</b>\n");
        }
        if (womb.pregnancy.incubation === 120) {
            CView.text("\n<b>Your ever-growing belly makes your pregnancy obvious for those around you.  It's already as big as the belly of any pregnant woman back home.</b>\n");
        }
        if (womb.pregnancy.incubation === 72) {
            CView.text("\n<b>Your belly is distended and overswollen with your offspring, ");
            if (player.stats.cor < 40) CView.text("making it difficult to function.</b>");
            if (player.stats.cor >= 40 && player.stats.cor < 75) CView.text("and you wonder how much longer you have to wait.</b>");
            if (player.stats.cor >= 75) CView.text("and you're eager to give birth, so you can get fill your womb with a new charge.</b>");
            CView.text("\n");
            player.stats.spe += -3;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 4;

        }
        if (womb.pregnancy.incubation === 48) {
            CView.text("\n<b>You rub your hands over your bulging belly, lost in the sensations of motherhood.  Whatever child is inside your overstretched womb seems to appreciate the attention, and stops its incessant squirming.\n");
        }
        if (womb.pregnancy.incubation === 32 || womb.pregnancy.incubation === 150) {
            // Increase lactation!
            if (player.body.chest.sort(BreastRow.Largest)[0].rating >= 3 && player.body.chest.length > 1 && player.body.chest.sort(BreastRow.LactationMost)[0].lactationMultiplier >= 1 && player.body.chest.sort(BreastRow.LactationMost)[0].lactationMultiplier < 2) {
                CView.text("\nYour breasts feel swollen with all the extra milk they're accumulating.  You wonder just what kind of creature they're getting ready to feed.\n");
                boostLactation(player, .5);
            }
            if (player.body.chest.sort(BreastRow.Largest)[0].rating >= 3 && player.body.chest.length > 1 && player.body.chest.sort(BreastRow.LactationMost)[0].lactationMultiplier > 0 && player.body.chest.sort(BreastRow.LactationMost)[0].lactationMultiplier < 1) {
                CView.text("\nDrops of breastmilk escape your nipples as your body prepares for the coming birth.\n");
                boostLactation(player, .5);
            }
            // Lactate if large && not lactating
            if (player.body.chest.sort(BreastRow.Largest)[0].rating >= 3 && player.body.chest.length > 1 && player.body.chest.sort(BreastRow.LactationMost)[0].lactationMultiplier === 0) {
                CView.text("\n<b>You realize your breasts feel full, and occasionally lactate</b>.  It must be due to the pregnancy.\n");
                boostLactation(player, 1);
            }
            // Enlarge if too small for lactation
            if (player.body.chest.sort(BreastRow.Largest)[0].rating === 2 && player.body.chest.length > 1) {
                CView.text("\n<b>Your breasts have swollen to C-cups,</b> in light of your coming pregnancy.\n");
                growTopBreastRow(player, 1, 1, false);
            }
            // Enlarge if really small!
            if (player.body.chest.sort(BreastRow.Largest)[0].rating === 1 && player.body.chest.length > 1) {
                CView.text("\n<b>Your breasts have grown to B-cups,</b> likely due to the hormonal changes of your pregnancy.\n");
                growTopBreastRow(player, 1, 1, false);
            }
        }
        if (womb.pregnancy.incubation === 85) {
            // A small scene for very late in the pregnancy, its breast growth for the little cowgirl.  This scene should be a few days before birth, so the milk doesn't stop before the cowgirl is born.
            CView.text("\n<b>Your belly has become heavily pregnant; at the same time, ");
            // If (PC has flat breasts)
            if (player.body.chest.sort(BreastRow.Largest)[0].rating <= 0) {
                CView.text("your chest has begun to feel a bit odd.  Your run your hands over it to find that your breasts have grown to around C-cups at some point when you weren't paying attention!  ");
                player.body.chest.get(0).rating = 3;
            }
            else if (player.body.chest.sort(BreastRow.Largest)[0].rating <= 1) {
                CView.text("your breasts feel oddly tight in your top.  You put a hand to them and are startled when you find that they've grown to C-cups!  ");
                player.body.chest.get(0).rating = 3;
            }
            else if (player.body.chest.sort(BreastRow.Largest)[0].rating <= 10) {
                CView.text("your breasts feel oddly full.  You grab them with your hands, and after a moment you're able to determine that they've grown about a cup in size.  ");
                player.body.chest.get(0).rating++;
            }
            else {
                CView.text("your breasts feel a bit odd.  You put a hand on your chest and start touching them.  ");
            }
            if (player.body.chest.sort(BreastRow.LactationMost)[0].lactationMultiplier < 1) {
                CView.text("You gasp slightly in surprise and realize that you've started lactating.");
                boostLactation(player, player.body.chest.length);
            }
            else {
                CView.text("A few drips of milk spill out of your breasts, as expected.  Though, it occurs to you that there is more milk coming out than before.");
                boostLactation(player, player.body.chest.length * .25);
            }
            CView.text("</b>\n");
        }
    }

    public canBirth(player: Character, womb: Womb): boolean {
        return womb.pregnancy.incubation === 1;
    }

    public birthScene(player: Character, womb: Womb): void {
        womb.clear();
        boostLactation(player, .01);
        if (player.body.vaginas.length === 0) {
            CView.text("\nYou feel a terrible pressure in your groin... then an incredible pain accompanied by the rending of flesh.  You look down and behold a vagina.\n");
            player.body.vaginas.add(new Vagina());
        }
        // If you like terrible outcomes
        if (MarbleFlags.MARBLE_NURSERY_CONSTRUCTION < 100) {
            CView.text("\nYou feel a clenching sensation in your belly and something shifts inside.  Your contractions start a few moments later and you realize that it's time for your child to be born.  You cry out mildly in pain and lie down, letting your body start to push the baby out.  Marble doesn't seem to be around right now, so you can do nothing but push.\n\n");

            CView.text("You push and heave with all your might, little else going through your mind. You somehow register when the head comes out, and soon the shoulders along with the rest of the body follow.  You lean back and pant for a while before feeling a pair of hands grab a hold of you. They slowly and clumsily feel up your body before finding your " + describeChest(player) + " and a mouth quickly closes down on a " + describeNipple(player, player.body.chest.get(0)) + ".  You sigh softly, and drift off to sleep.");
            displayStretchVagina(player, 20, true, true, false);

            CView.text("\n\nEventually you feel a hand on your face, and open your eyes to see Marble looking down at you.  \"<i>Sweetie, are you all right?  Why aren't you pregnant anymore?  Where is our child?</i>\" You stand up and look around.  There is no sign of the baby you were carrying; the child seems to have left after finishing its drink. You never even got to see its face...\n\n");

            CView.text("Marble seems to understand what happened, but is really disappointed with you, \"<i>Sweetie, why couldn't you wait until after I'd finished the nursery...?</i>\"");
            // Increase PC's hips as per normal, add to birth counter
        }
        else {

            CView.text("\nYou feel a clenching sensation in your belly and something shifts inside.  Your contractions start a few moments later and you realize that it's time for your child to be born.  You cry out mildly in pain and lie down, letting your body start to push the baby out.  Marble rushes over and sees that it's time for you to give birth, so she picks you up and supports you as you continue pushing the child out of your now-gaping " + describeVagina(player, player.body.vaginas.get(0)) + ".");
            // 50% chance of it being a boy if Marble has been purified
            if (MarbleFlags.MARBLE_PURIFIED > 0 && randInt(2) === 0)
            // it's a boy!
            {
                CView.text("\n\nFor the next few minutes, you can’t do much else but squeeze the large form inside your belly out.  Marble tries to help a little, pulling your nether lips open even further to make room for the head.  You gasp as you push the head out, and you hear Marble give a little cry of joy.  \"<i>It’s a son of mine!</i>\" she tells you, but you can barely hear her due to the focus you’re putting into the task of bringing this child out.");
                CView.text("\n\nYou give an almighty heave and finally manage to push the shoulders out. The rest is downhill from there.  Once you’ve pushed the child completely out, Marble lays you down on the ground.  You rest there for a few moments, trying to catch your breath after the relatively difficult birthing.  When you finally have a chance to get up, you see that Marble has a small bull boy cradled in her arms, suckling on her nipple.  You can hardly believe that you managed to push out a boy that big!  Marble seems to understand and tells you that the child is actually a fair bit bigger now than when he came out.");
                CView.text("\n\nShe helps you stand up and gives you the little boy to suckle for yourself.");
                CView.text("\n\nYou put the child to your breast and let him drink down your milk.  You sigh in contentment and Marble says, \"<i>See sweetie?  It’s a really good feeling, isn’t it?</i>\"  You can’t help but nod in agreement.  After a minute the little boy has had enough and you put him into the nursery.");

                CView.text("The little boy is already starting to look like he is a few years old; he’s trotting around on his little hoofs.");
                // Increase the size of the PC’s hips, as per normal for pregnancies, increase birth counter
                if (player.body.hips.rating < 10) {
                    player.body.hips.rating++;
                    CView.text("After the birth your " + player.inventory.equipment.armor.displayName + " fits a bit more snugly about your " + describeHips(player) + ".");
                }
                if (MarbleFlags.MARBLE_BOYS === 0)
                // has Marble had male kids before?
                {
                    CView.text("You notice that Marble seems to be deep in thought, and you ask her what is wrong.  She starts after a moment and says, \"<i>Oh sweetie, no, it's nothing really.  I just never thought that I'd actually be able to father a son is all.  The thought never occurred to me.");
                }
                // Add to marble-kids:
                MarbleFlags.MARBLE_KIDS++;
                MarbleFlags.MARBLE_BOYS++; // increase the number of male kids with Marble
            }
            else // end of new content
            // it's a girl!
            {
                displayStretchVagina(player, 20, true, true, false);
                CView.text("\n\nFor the next few minutes, you can't do much else but squeeze the large form inside your belly out.  Marble tries to help a little, pulling your nether lips open even further to make room for the head.  You gasp as you push the head out, and you hear Marble give a little cry of joy.  \"<i>It's a daughter of mine!</i>\" she tells you, but you can barely hear her due to the focus you're putting into the task of bringing this child out.\n\n");
                CView.text("You give an almighty heave and finally manage to push the shoulders out. The rest is downhill from there.  Once you've pushed the child completely out, Marble lays you down on the ground.  You rest there for a few moments, trying to catch your breath after the relatively difficult birthing.  When you finally have a chance to get up, you see that Marble has a small cowgirl cradled in her arms, suckling on her nipple.  You can hardly believe that you managed to push out a girl that big!  Marble seems to understand and tells you that the child is actually a fair bit bigger now than when she came out.\n\n");
                CView.text("She helps you stand up and gives you the little girl to suckle for yourself.  ");
                if (player.effects.get(StatusEffectType.Marble).value4 >= 20) {
                    CView.text("As the child contentedly drinks from your " + describeNipple(player, player.body.chest.get(0)) + ", Marble tells you, \"<i>Sweetie, somehow I know that our kids won't have to worry about the addictive milk.  It will only make them healthy and strong.</i>\"  You nod at her and put the child into the nursery.  ");
                }
                else {
                    CView.text("You put the child to your breast and let her drink down your milk.  You sigh in contentment and Marble says, \"<i>See sweetie?  It's a really good feeling, isn't it?</i>\"  You can't help but nod in agreement.  After a minute the little girl has had enough and you put her into the nursery.\n\n");
                }
                CView.text("The little girl is already starting to look like she is a few years old; she's trotting around on her little hooves.");
                // Add to marble-kids:
                MarbleFlags.MARBLE_KIDS++;
            }
            // Increase the size of the PC's hips, as per normal for pregnancies, increase birth counter
            if (player.body.hips.rating < 10) {
                player.body.hips.rating++;
                CView.text("\n\nAfter the birth your " + player.inventory.equipment.armor.displayName + " fits a bit more snugly about your " + describeHips(player) + ".");
            }
        }
        CView.text("\n");
    }
}
