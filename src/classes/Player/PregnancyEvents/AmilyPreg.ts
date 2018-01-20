import GenericPregnancyChanges from './GenericPregnancyChanges';
import IPregnancyEvent from '../../Body/Pregnancy/IPregnancyEvent';
import Vagina, { VaginaWetness } from '../../Body/Vagina';
import DisplayText from '../../display/DisplayText';
import Flags, { FlagEnum } from '../../Game/Flags';
import Game from '../../Game/Game';
import BreastModifier from '../../Modifiers/BreastModifier';
import VaginaModifier from '../../Modifiers/VaginaModifier';
import Player from '../Player';

export default class AmilyPreg implements IPregnancyEvent {
    public incubationDisplay(player: Player, incubationTime: number) {
        if (incubationTime === 336) {
            DisplayText("\nYou wake up feeling bloated, and your belly is actually looking a little puffy. At the same time, though, you have the oddest cravings... you could really go for some mixed nuts. And maybe a little cheese, too.\n").bold();
        }
        if (incubationTime === 280) {
            DisplayText("\nYour belly is getting more noticably distended and squirming around.  You are probably pregnant.\n").bold();
        }
        if (incubationTime === 216) {
            DisplayText("\nThere is no question you're pregnant; your belly is already as big as that of any pregnant woman back home.").bold();
            if (Flags.list[FlagEnum.AMILY_FOLLOWER] === 1) {
                DisplayText("  Amily smiles at you reassuringly. \"We do have litters, dear, this is normal.\"\n").bold();
            }
            player.stats.spe += -1;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 2;
        }
        if (incubationTime === 180) {
            DisplayText("\nThe sudden impact of a tiny kick from inside your distended womb startles you.  Moments later it happens again, making you gasp.\n").bold();
        }
        if (incubationTime === 120) {
            DisplayText("\nYou feel (and look) hugely pregnant, now, but you feel content. You know the, ah, 'father' of these children loves you, and they will love you in turn.\n").bold();
        }
        if (incubationTime === 72) {
            DisplayText("\nYou jolt from the sensation of squirming inside your swollen stomach. Fortunately, it dies down quickly, but you know for a fact that you felt more than one baby kicking inside you.\n").bold();
            player.stats.spe += -3;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 4;
        }
        if (incubationTime === 48) {
            DisplayText("\nThe children kick and squirm frequently. Your bladder, stomach and lungs all feel very squished. You're glad that they'll be coming out of you soon.\n").bold();
        }
        if (incubationTime === 32 || incubationTime === 64 || incubationTime === 85 || incubationTime === 150) {
            GenericPregnancyChanges.lactationIncrease(player);
        }
    }

    public canBirth(player: Player, incubationTime: number): boolean {
        return incubationTime <= 0;
    }

    public birthScene(player: Player) {
        BreastModifier.boostLactation(player, .01);
        DisplayText().newline();
        if (player.torso.vaginas.count === 0) {
            DisplayText("You feel a terrible pressure in your groin... then an incredible pain accompanied by the rending of flesh.  ");
            DisplayText("You look down and behold a new vagina.  ").bold();
            player.torso.vaginas.add(new Vagina());
            player.updateGender();
        }
        // FUCKING BIRTH SHIT HERE.
        Game.sceneManager.amilyScene.pcBirthsAmilysKidsQuestVersion();
        VaginaModifier.displayStretchVagina(player, 20, true, true);
        if (player.torso.vaginas.get(0).wetness === VaginaWetness.DRY) player.torso.vaginas.get(0).wetness++;
        player.orgasm();
        player.stats.str += -1;
        player.stats.tou += -2;
        player.stats.spe += 3;
        player.stats.lib += 1;
        player.stats.sens += .5;
        DisplayText().newline();
    }
}
