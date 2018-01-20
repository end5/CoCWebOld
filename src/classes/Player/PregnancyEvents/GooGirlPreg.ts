import GenericPregnancyChanges from './GenericPregnancyChanges';
import IPregnancyEvent from '../../Body/Pregnancy/IPregnancyEvent';
import DisplayText from '../../display/DisplayText';
import Player from '../Player';

export default class GooGirlPreg implements IPregnancyEvent {
    public incubationDisplay(player: Player, incubationTime: number) {
        if (incubationTime === 72) {
            DisplayText("\nThe huge size of your pregnant belly constantly impedes your movement, but the constant squirming and shaking of your slime-packed belly is reassuring in its own way.  You can't wait to see how it feels to have the slime flowing and gushing through your lips, stroking you intimately as you birth new life into this world.").bold();
            if (player.stats.cor < 50) DisplayText("  You shudder and shake your head, wondering why you're thinking such unusual things.").bold();
            DisplayText().newline();
        }
        if (incubationTime === 32 || incubationTime === 64 || incubationTime === 82 || incubationTime === 16) {
            GenericPregnancyChanges.lactationIncrease(player);
        }
    }

    public canBirth(player: Player, incubationTime: number): boolean {
        return incubationTime <= 0;
    }

    public birthScene(player: Player) {
        lake.gooGirlScene.gooPregVagBirth();
    }
}
