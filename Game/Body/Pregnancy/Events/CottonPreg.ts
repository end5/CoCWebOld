import { Character } from "../../../Character/Character";
import { CView } from "../../../../Engine/Display/ContentView";
import { BreastRow } from "../../BreastRow";
import { boostLactation, growTopBreastRow } from "../../../Modifiers/BreastModifier";
import { Womb } from "../Womb";
import { IPregnancyEvent } from "../IPregnancyEvent";

export class CottonPregEvent implements IPregnancyEvent {
    public incubationDisplay(player: Character, womb: Womb): void {
        if (womb.pregnancy.incubation === 320) {
            CView.text("\n<b>You realize your belly has gotten bigger. Maybe you should cut back on all the strange food.  Though you do have odd cravings for oats and grain.</b>\n");
        }
        else if (womb.pregnancy.incubation === 280) {
            CView.text("\n<b>Your belly is getting more noticeably distended. You are probably pregnant. The strong hankerings for oats and grains give you a very obvious clue as to who the 'father' might be.</b>\n");
        }
        else if (womb.pregnancy.incubation === 225) {
            CView.text("\n<b>The unmistakable bulge of pregnancy is visible in your tummy.  You stroke the orb and wonder with a half-grin if you'll have a daughter who takes after her 'daddy'.</b>\n");
        }
        else if (womb.pregnancy.incubation === 165) {
            CView.text("\n<b>The sudden impact of a tiny kick from inside your womb startles you.  Moments later it happens again, making you gasp.  The baby inside you really must be equine in nature; she's already got quite a wicked kick on her.</b>\n");
        }
        else if (womb.pregnancy.incubation === 105) {
            CView.text("\n<b>You're already as big as any pregnant woman back home. Considering that what you're carrying is technically a foal, you wonder just how much bigger you're going to get...</b>\n");
        }
        else if (womb.pregnancy.incubation === 80) {
            CView.text("\n<b>Your swollen stomach would bring queries about the possibility of twins back in Ingnam.  However, you can only feel one strong heart beating away inside your stretched midriff.  Cotton's foal is definitely growing up healthy...\n\nYou're glad, but a little worried about giving birth.</b>\n");
        }
        else if (womb.pregnancy.incubation === 50) {
            CView.text("\n<b>Your belly is painfully distended and swollen; you feel like you're going to burst before you get much bigger.  You find yourself pacing around restlessly in the night, like the expectant mares back in the village.  You're anxious to finally give birth, as much to get this heavy baby out of you as to finally be able to cuddle your child.</b>\n");
        }
        // Tits
        if (womb.pregnancy.incubation === 32 || womb.pregnancy.incubation === 64 || womb.pregnancy.incubation === 85 || womb.pregnancy.incubation === 150) {
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
    }

    public canBirth(player: Character, womb: Womb): boolean {
        return womb.pregnancy.incubation === 1;
    }

    public birthScene(player: Character, womb: Womb): void {
        // The womb clear happens before the scene in old code
        // Dunno which way it should be
        birthingCottonsKids(player);
        womb.clear();
    }
}
