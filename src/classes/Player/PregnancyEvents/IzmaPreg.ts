import GenericPregnancyChanges from './GenericPregnancyChanges';
import IPregnancyEvent from '../../Body/Pregnancy/IPregnancyEvent';
import DisplayText from '../../display/DisplayText';
import Flags, { FlagEnum } from '../../Game/Flags';
import Player from '../Player';

export default class IzmaPreg implements IPregnancyEvent {
    public incubationDisplay(player: Player, incubationTime: number) {
        if (incubationTime === 275) {
            if (Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00238] === 1) DisplayText("\nYou wake up feeling kind of nauseous.  Izma insists that you stay in bed and won't hear a word otherwise, tending to you in your sickened state.  When you finally feel better, she helps you up.  \"<i>You know, " + player.desc.short + "... I think you might be pregnant.</i>\" Izma says, sounding very pleased at the idea. You have to admit, you do seem to have gained some weight...\n").bold();
            else DisplayText("\nYou wake up feeling bloated, and your belly is actually looking a little puffy. At the same time, though, you have the oddest cravings... you could really go for some fish.\n").bold();
        }
        if (incubationTime === 250) {
            DisplayText("\nYour belly is getting more noticably distended and squirming around.  You are probably pregnant.\n".bold());
        }
        if (incubationTime === 216) {
            if (Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00238] === 1) DisplayText("\nYour stomach is undeniably swollen now, and you feel thirsty all the time. Izma is always there to bring you water, even anticipating your thirst before you recognize it yourself. She smiles all the time now, and seems to be very pleased with herself.").bold();
            else DisplayText("\nThere is no question you're pregnant; your belly is getting bigger and for some reason, you feel thirsty ALL the time.").bold();
            DisplayText().newline();
            player.stats.spe += -1;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 2;
        }
        if (incubationTime === 180) {
            if (Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00238] === 1) DisplayText("\nThere is no denying your pregnancy, and Izma is head-over-heels with your 'beautifully bountiful new body', as she puts it. She is forever finding an excuse to touch your bulging stomach, and does her best to coax you to rest against her. However, when you do sit against her, she invariably starts getting hard underneath you.\n").bold();
            else DisplayText("\nThere is no denying your pregnancy.  Your belly bulges and occasionally squirms as your growing offspring shifts position.\n").bold();
        }
        if (incubationTime === 120) {
            if (Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00238] === 1) DisplayText("\nYour stomach is swollen and gravid; you can feel the baby inside you kicking and wriggling. Izma is always on hand now, it seems, and she won't dream of you fetching your own food or picking up anything you've dropped. She's always dropping hints about how you should try going around naked for comfort's sake. While you are unwilling to do so, you find yourself dreaming about sinking into cool, clean water, and take many baths and swims. Whatever is inside you always seems to like it; they get so much more active when you're in the water.\n").bold();
            else DisplayText("\nYour stomach is swollen and gravid; you can feel the baby inside you kicking and wriggling.  You find yourself dreaming about sinking into cool, clean water, and take many baths and swims. Whatever is inside you always seems to like it; they get so much more active when you're in the water.\n").bold();
            player.stats.spe += -2;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 4;
        }
        if (incubationTime === 72) {
            if (Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00238] === 1) DisplayText("\nYou dream of the water, of a life under the waves, where it's cool and wet and you are free. You spend as much time in the river as possible now, the baby inside you kicking and squirming impatiently, eager to be free of the confines of your womb and have much greater depths to swim and play in. Izma makes no secret of her pleasure and informs you that you should deliver soon.\n").bold();
            else DisplayText("\nYou dream of the water, of a life under the waves, where it's cool and wet and you are free. You spend as much time in the river as possible now, the baby inside you kicking and squirming impatiently, eager to be free of the confines of your womb and have much greater depths to swim and play in.  The time for delivery will probably come soon.\n").bold();
        }
        if (incubationTime === 32 || incubationTime === 64 || incubationTime === 85 || incubationTime === 150) {
            GenericPregnancyChanges.lactationIncrease(player);
        }
    }

    public canBirth(player: Player, incubationTime: number): boolean {
        return incubationTime <= 0;
    }

    public birthScene(player: Player) {
        izmaScene.pcPopsOutASharkTot();
    }
}
