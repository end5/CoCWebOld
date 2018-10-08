import { Character } from "../../../Character/Character";
import { Womb } from "../Womb";
import { CView } from "../../../../Engine/Display/ContentView";
import { BreastRow } from "../../BreastRow";
import { boostLactation, growTopBreastRow } from "../../../Modifiers/BreastModifier";
import { IPregnancyEvent } from "../IPregnancyEvent";
import { Vagina, VaginaWetness } from "../../Vagina";
import { displayStretchVagina } from "../../../Modifiers/VaginaModifier";
import { pcBirthsAmilysKidsQuestVersion, AmilyFlags } from "../../../Scenes/NPCs/AmilyScene";
import { MousePregEvent } from "./MousePreg";

export class AmilyPregEvent implements IPregnancyEvent {
    public incubationDisplay(player: Character, womb: Womb): void {
        if (womb.pregnancy.incubation === 336) {
            CView.text("\n<b>You wake up feeling bloated, and your belly is actually looking a little puffy. At the same time, though, you have the oddest cravings... you could really go for some mixed nuts. And maybe a little cheese, too.</b>\n");
        }
        if (womb.pregnancy.incubation === 280) {
            CView.text("\n<b>Your belly is getting more noticably distended and squirming around.  You are probably pregnant.</b>\n");
        }
        if (womb.pregnancy.incubation === 216) {
            CView.text("\n<b>There is no question you're pregnant; your belly is already as big as that of any pregnant woman back home.");
            if (AmilyFlags.AMILY_FOLLOWER === 1) CView.text("  Amily smiles at you reassuringly. \"<i>We do have litters, dear, this is normal.</i>\"");
            CView.text("</b>");
            CView.text("\n");
            player.stats.spe += -1;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 2;

        }
        if (womb.pregnancy.incubation === 180) {
            CView.text("\n<b>The sudden impact of a tiny kick from inside your distended womb startles you.  Moments later it happens again, making you gasp.</b>\n");
        }
        if (womb.pregnancy.incubation === 120) {
            CView.text("\n<b>You feel (and look) hugely pregnant, now, but you feel content. You know the, ah, 'father' of these children loves you, and they will love you in turn.</b>\n");
        }
        if (womb.pregnancy.incubation === 72) {
            CView.text("\n<b>You jolt from the sensation of squirming inside your swollen stomach. Fortunately, it dies down quickly, but you know for a fact that you felt more than one baby kicking inside you.</b>\n");
            player.stats.spe += -3;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 4;

        }
        if (womb.pregnancy.incubation === 48) {
            CView.text("\n<b>The children kick and squirm frequently. Your bladder, stomach and lungs all feel very squished. You're glad that they'll be coming out of you soon.</b>\n");
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

    private mousePregEvent = new MousePregEvent();

    public birthScene(player: Character, womb: Womb): void {
        // Amily failsafe - converts PC with pure babies to mouse babies if Amily is corrupted
        if (AmilyFlags.AMILY_FOLLOWER === 2 || AmilyFlags.UNKNOWN_FLAG_NUMBER_00170 > 0) this.mousePregEvent.birthScene(player, womb);

        // Amily failsafe - converts PC with pure babies to mouse babies if Amily is with Urta
        if (AmilyFlags.AMILY_VISITING_URTA === 1 || AmilyFlags.AMILY_VISITING_URTA === 2) this.mousePregEvent.birthScene(player, womb);

        boostLactation(player, .01);
        CView.text("\n");
        if (player.body.vaginas.length === 0) {
            CView.text("You feel a terrible pressure in your groin... then an incredible pain accompanied by the rending of flesh.  <b>You look down and behold a new vagina</b>.  ");
            player.body.vaginas.add(new Vagina());
        }
        // FUCKING BIRTH SHIT HERE.
        pcBirthsAmilysKidsQuestVersion(player);
        displayStretchVagina(player, 60, true, true, false);
        if (player.body.vaginas.get(0).wetness === VaginaWetness.DRY) player.body.vaginas.get(0).wetness++;
        player.orgasm();
        player.stats.str += -1;
        player.stats.tou += -2;
        player.stats.spe += 3;
        player.stats.lib += 1;
        player.stats.sens += .5;

        CView.text("\n");
        womb.clear();
    }
}
