import GenericPregnancyChanges from './GenericPregnancyChanges';
import DisplayText from '../../../display/DisplayText';
import Player from '../../../Player/Player';
import IPregnancyEvent from '../IPregnancyEvent';

export default class CottonPreg implements IPregnancyEvent {
    public incubationDisplay(player: Player, incubationTime: number) {
        if (incubationTime == 320) {
            DisplayText.text("\n<b>You realize your belly has gotten bigger. Maybe you should cut back on all the strange food.  Though you do have odd cravings for oats and grain.</b>\n");
        }
        else if (incubationTime == 280) {
            DisplayText.text("\n<b>Your belly is getting more noticeably distended. You are probably pregnant. The strong hankerings for oats and grains give you a very obvious clue as to who the 'father' might be.</b>\n");
        }
        else if (incubationTime == 225) {
            DisplayText.text("\n<b>The unmistakable bulge of pregnancy is visible in your tummy.  You stroke the orb and wonder with a half-grin if you'll have a daughter who takes after her 'daddy'.</b>\n");
        }
        else if (incubationTime == 165) {
            DisplayText.text("\n<b>The sudden impact of a tiny kick from inside your womb startles you.  Moments later it happens again, making you gasp.  The baby inside you really must be equine in nature; she's already got quite a wicked kick on her.</b>\n");
        }
        else if (incubationTime == 105) {
            DisplayText.text("\n<b>You're already as big as any pregnant woman back home. Considering that what you're carrying is technically a foal, you wonder just how much bigger you're going to get...</b>\n");
        }
        else if (incubationTime == 80) {
            DisplayText.text("\n<b>Your swollen stomach would bring queries about the possibility of twins back in Ingnam.  However, you can only feel one strong heart beating away inside your stretched midriff.  Cotton's foal is definitely growing up healthy...\n\nYou're glad, but a little worried about giving birth.</b>\n");
        }
        else if (incubationTime == 50) {
            DisplayText.text("\n<b>Your belly is painfully distended and swollen; you feel like you're going to burst before you get much bigger.  You find yourself pacing around restlessly in the night, like the expectant mares back in the village.  You're anxious to finally give birth, as much to get this heavy baby out of you as to finally be able to cuddle your child.</b>\n");
        }
        //Tits
        if (incubationTime == 32 || incubationTime == 64 || incubationTime == 85 || incubationTime == 150) {
            GenericPregnancyChanges.lactationIncrease(player);
        }
    }

    public canBirth(player: Player, incubationTime: number): boolean {
        return incubationTime <= 0;
    }

    public birth(player: Player) {
        telAdre.cotton.birthingCottonsKids();
    }
}