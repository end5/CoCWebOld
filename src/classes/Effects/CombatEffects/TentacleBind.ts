import Character from '../../Character/Character';
import DisplayText from '../../display/DisplayText';
import Flags, { FlagEnum } from '../../Game/Flags';
import CombatEffect from '../CombatEffect';

export class TentacleBind extends CombatEffect {
    public update(character: Character) {
        if (Flags.list[FlagEnum.PC_FETISH] >= 2) {
            character.stats.lust += 3;
            DisplayText.text("Wrapped tightly in the tentacles, you find it hard to resist becoming more and more aroused...");
            DisplayText.newParagraph();
        }
        DisplayText.text("You are firmly trapped in the tentacle's coils.  ");
        DisplayText.bold("The only thing you can try to do is struggle free!");
        DisplayText.newParagraph();
    }
}
