import { Character } from "../../../Character/Character";
import { Womb } from "../Womb";
import { CView } from "../../../../Engine/Display/ContentView";
import { BreastRow } from "../../BreastRow";
import { boostLactation, growTopBreastRow } from "../../../Modifiers/BreastModifier";
import { IPregnancyEvent } from "../IPregnancyEvent";
import { pcPopsOutASharkTot, IzmaFlags } from "../../../Scenes/NPCs/IzmaScene";

export class IzmaPregEvent implements IPregnancyEvent {
    public incubationDisplay(player: Character, womb: Womb): void {
        if (womb.pregnancy.incubation === 275) {
            if (IzmaFlags.UNKNOWN_FLAG_NUMBER_00238 === 1) CView.text("\n<b>You wake up feeling kind of nauseous.  Izma insists that you stay in bed and won't hear a word otherwise, tending to you in your sickened state.  When you finally feel better, she helps you up.  \"<i>You know, " + player.desc.name + "... I think you might be pregnant.</i>\" Izma says, sounding very pleased at the idea. You have to admit, you do seem to have gained some weight...</b>\n");
            else CView.text("\n<b>You wake up feeling bloated, and your belly is actually looking a little puffy. At the same time, though, you have the oddest cravings... you could really go for some fish.</b>\n");
        }
        if (womb.pregnancy.incubation === 250) {
            CView.text("\n<b>Your belly is getting more noticably distended and squirming around.  You are probably pregnant.</b>\n");
        }
        if (womb.pregnancy.incubation === 216) {
            if (IzmaFlags.UNKNOWN_FLAG_NUMBER_00238 === 1) CView.text("\n<b>Your stomach is undeniably swollen now, and you feel thirsty all the time. Izma is always there to bring you water, even anticipating your thirst before you recognize it yourself. She smiles all the time now, and seems to be very pleased with herself.");
            else CView.text("\n<b>There is no question you're pregnant; your belly is getting bigger and for some reason, you feel thirsty ALL the time.");
            CView.text("</b>");
            CView.text("\n");
            player.stats.spe += -1;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 2;

        }
        if (womb.pregnancy.incubation === 180) {
            if (IzmaFlags.UNKNOWN_FLAG_NUMBER_00238 === 1) CView.text("\n<b>There is no denying your pregnancy, and Izma is head-over-heels with your 'beautifully bountiful new body', as she puts it. She is forever finding an excuse to touch your bulging stomach, and does her best to coax you to rest against her. However, when you do sit against her, she invariably starts getting hard underneath you.</b>\n");
            else CView.text("\n<b>There is no denying your pregnancy.  Your belly bulges and occasionally squirms as your growing offspring shifts position.</b>\n");
        }
        if (womb.pregnancy.incubation === 120) {
            if (IzmaFlags.UNKNOWN_FLAG_NUMBER_00238 === 1) CView.text("\n<b>Your stomach is swollen and gravid; you can feel the baby inside you kicking and wriggling. Izma is always on hand now, it seems, and she won't dream of you fetching your own food or picking up anything you've dropped. She's always dropping hints about how you should try going around naked for comfort's sake. While you are unwilling to do so, you find yourself dreaming about sinking into cool, clean water, and take many baths and swims. Whatever is inside you always seems to like it; they get so much more active when you're in the water.</b>\n");
            else CView.text("\n<b>Your stomach is swollen and gravid; you can feel the baby inside you kicking and wriggling.  You find yourself dreaming about sinking into cool, clean water, and take many baths and swims. Whatever is inside you always seems to like it; they get so much more active when you're in the water.</b>\n");
            player.stats.spe += -2;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 4;

        }
        if (womb.pregnancy.incubation === 72) {
            if (IzmaFlags.UNKNOWN_FLAG_NUMBER_00238 === 1) CView.text("\n<b>You dream of the water, of a life under the waves, where it's cool and wet and you are free. You spend as much time in the river as possible now, the baby inside you kicking and squirming impatiently, eager to be free of the confines of your womb and have much greater depths to swim and play in. Izma makes no secret of her pleasure and informs you that you should deliver soon.</b>\n");
            else CView.text("\n<b>You dream of the water, of a life under the waves, where it's cool and wet and you are free. You spend as much time in the river as possible now, the baby inside you kicking and squirming impatiently, eager to be free of the confines of your womb and have much greater depths to swim and play in.  The time for delivery will probably come soon.</b>\n");
        }
        if (womb.pregnancy.incubation === 32 || womb.pregnancy.incubation === 64 || womb.pregnancy.incubation === 85 || womb.pregnancy.incubation === 150) {
            // Increase lactation!
            if (player.body.chest.sort(BreastRow.Largest)[0].rating >= 3 && player.body.chest.length > 1 && player.body.chest.sort(BreastRow.LactationMost)[0].lactationMultiplier >= 1 && player.body.chest.sort(BreastRow.LactationMost)[0].lactationMultiplier < 2) {
                CView.text("\nYour breasts feel swollen with all the extra milk they're accumulating.\n");
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
        pcPopsOutASharkTot(player);
        womb.clear();
    }
}
