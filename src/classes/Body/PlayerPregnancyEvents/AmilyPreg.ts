import GenericPregnancyChanges from './GenericPregnancyChanges';
import Vagina, { VaginaWetness } from '../../Body/Vagina';
import CreatureChange from '../../display/CreatureChange';
import MainScreen from '../../display/MainScreen';
import Flags, { FlagEnum } from '../../Game/Flags';
import Game from '../../Game/Game';
import BreastModifier from '../../Modifiers/BreastModifiers';
import Player from '../../Player';
import IPregnancyEvent from '../IPregnancyEvent';

export default class AmilyPreg implements IPregnancyEvent {
    public incubationDisplay(player: Player, incubationTime: number) {
        if (incubationTime == 336) {
            MainScreen.text("\n<b>You wake up feeling bloated, and your belly is actually looking a little puffy. At the same time, though, you have the oddest cravings... you could really go for some mixed nuts. And maybe a little cheese, too.</b>\n", false);
        }
        if (incubationTime == 280) {
            MainScreen.text("\n<b>Your belly is getting more noticably distended and squirming around.  You are probably pregnant.</b>\n", false);
        }
        if (incubationTime == 216) {
            MainScreen.text("\n<b>There is no question you're pregnant; your belly is already as big as that of any pregnant woman back home.", false);
            if (Flags.list[FlagEnum.AMILY_FOLLOWER] == 1)
                MainScreen.text("  Amily smiles at you reassuringly. \"<i>We do have litters, dear, this is normal.</i>\"", false);
            MainScreen.text("</b>", false);
            MainScreen.text("\n", false);
            player.stats.spe += -1;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 2;
        }
        if (incubationTime == 180) {
            MainScreen.text("\n<b>The sudden impact of a tiny kick from inside your distended womb startles you.  Moments later it happens again, making you gasp.</b>\n", false);
        }
        if (incubationTime == 120) {
            MainScreen.text("\n<b>You feel (and look) hugely pregnant, now, but you feel content. You know the, ah, 'father' of these children loves you, and they will love you in turn.</b>\n", false);
        }
        if (incubationTime == 72) {
            MainScreen.text("\n<b>You jolt from the sensation of squirming inside your swollen stomach. Fortunately, it dies down quickly, but you know for a fact that you felt more than one baby kicking inside you.</b>\n", false);
            player.stats.spe += -3;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 4;
        }
        if (incubationTime == 48) {
            MainScreen.text("\n<b>The children kick and squirm frequently. Your bladder, stomach and lungs all feel very squished. You're glad that they'll be coming out of you soon.</b>\n", false);
        }
        if (incubationTime == 32 || incubationTime == 64 || incubationTime == 85 || incubationTime == 150) {
            GenericPregnancyChanges.lactationIncrease(player);
        }
    }

    public canBirth(player: Player, incubationTime: number): boolean {
        return incubationTime <= 0;
    }

    public birth(player: Player) {
        player.boostLactation(.01);
        MainScreen.text("\n", false);
        if (player.lowerBody.vaginaSpot.count() == 0) {
            MainScreen.text("You feel a terrible pressure in your groin... then an incredible pain accompanied by the rending of flesh.  <b>You look down and behold a new vagina</b>.  ", false);
            player.lowerBody.vaginaSpot.add(new Vagina());
            player.updateGender();
        }
        //FUCKING BIRTH SHIT HERE.
        Game.sceneManager.amilyScene.pcBirthsAmilysKidsQuestVersion();
        CreatureChange.stretchVagina(player, 60, true, true, false);
        if (player.lowerBody.vaginaSpot.get(0).vaginalWetness == VaginaWetness.DRY) player.lowerBody.vaginaSpot.get(0).vaginalWetness++;
        player.orgasm();
        player.stats.str += -1;
        player.stats.tou += -2;
        player.stats.spe += 3;
        player.stats.lib += 1;
        player.stats.sens += .5;
        MainScreen.text("\n", false);
    }
}