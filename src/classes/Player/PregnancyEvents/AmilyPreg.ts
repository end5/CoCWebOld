import GenericPregnancyChanges from './GenericPregnancyChanges';
import Vagina, { VaginaWetness } from '../../../Body/Vagina';
import DisplayText, { DisplayTextFlag } from '../../../display/DisplayText';
import Flags, { FlagEnum } from '../../../Game/Flags';
import Game from '../../../Game/Game';
import BreastModifier from '../../../Modifiers/BreastModifier';
import VaginaModifier from '../../../Modifiers/VaginaModifier';
import Player from '../../../Player/Player';
import IPregnancyEvent from '../IPregnancyEvent';

export default class AmilyPreg implements IPregnancyEvent {
    public incubationDisplay(player: Player, incubationTime: number) {
        if (incubationTime == 336) {
            DisplayText.newline();
            DisplayText.textBold("You wake up feeling bloated, and your belly is actually looking a little puffy. At the same time, though, you have the oddest cravings... you could really go for some mixed nuts. And maybe a little cheese, too.\n");
            DisplayText.newline();
        }
        if (incubationTime == 280) {
            DisplayText.newline();
            DisplayText.textBold("Your belly is getting more noticably distended and squirming around.  You are probably pregnant.");
            DisplayText.newline();
        }
        if (incubationTime == 216) {
            DisplayText.newline();
            DisplayText.textBold("There is no question you're pregnant; your belly is already as big as that of any pregnant woman back home.");
            if (Flags.list[FlagEnum.AMILY_FOLLOWER] == 1) {
                DisplayText.textBold("  Amily smiles at you reassuringly. \"");
                DisplayText.text("We do have litters, dear, this is normal.", DisplayTextFlag.Bold | DisplayTextFlag.Italic);
                DisplayText.textBold("\"");
            }
            DisplayText.newline();
            player.stats.spe += -1;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 2;
        }
        if (incubationTime == 180) {
            DisplayText.newline();
            DisplayText.textBold("The sudden impact of a tiny kick from inside your distended womb startles you.  Moments later it happens again, making you gasp.");
            DisplayText.newline();
        }
        if (incubationTime == 120) {
            DisplayText.newline();
            DisplayText.textBold("You feel (and look) hugely pregnant, now, but you feel content. You know the, ah, 'father' of these children loves you, and they will love you in turn.");
            DisplayText.newline();
        }
        if (incubationTime == 72) {
            DisplayText.newline();
            DisplayText.textBold("You jolt from the sensation of squirming inside your swollen stomach. Fortunately, it dies down quickly, but you know for a fact that you felt more than one baby kicking inside you.");
            DisplayText.newline();
            player.stats.spe += -3;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 4;
        }
        if (incubationTime == 48) {
            DisplayText.newline();
            DisplayText.textBold("The children kick and squirm frequently. Your bladder, stomach and lungs all feel very squished. You're glad that they'll be coming out of you soon.");
            DisplayText.newline();
        }
        if (incubationTime == 32 || incubationTime == 64 || incubationTime == 85 || incubationTime == 150) {
            GenericPregnancyChanges.lactationIncrease(player);
        }
    }

    public canBirth(player: Player, incubationTime: number): boolean {
        return incubationTime <= 0;
    }

    public birth(player: Player) {
        BreastModifier.boostLactation(player, .01);
        DisplayText.text("\n");
        if (player.lowerBody.vaginaSpot.count() == 0) {
            DisplayText.text("You feel a terrible pressure in your groin... then an incredible pain accompanied by the rending of flesh.  ");
            DisplayText.textBold("You look down and behold a new vagina.  ");
            player.lowerBody.vaginaSpot.add(new Vagina());
            player.updateGender();
        }
        //FUCKING BIRTH SHIT HERE.
        Game.sceneManager.amilyScene.pcBirthsAmilysKidsQuestVersion();
        VaginaModifier.displayStretchVagina(player, 20, true, true);
        if (player.lowerBody.vaginaSpot.get(0).vaginalWetness == VaginaWetness.DRY) player.lowerBody.vaginaSpot.get(0).vaginalWetness++;
        player.orgasm();
        player.stats.str += -1;
        player.stats.tou += -2;
        player.stats.spe += 3;
        player.stats.lib += 1;
        player.stats.sens += .5;
        DisplayText.text("\n");
    }
}