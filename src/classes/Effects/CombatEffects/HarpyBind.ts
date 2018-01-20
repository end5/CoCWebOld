import Character from '../../Character/Character';
import DisplayText from '../../display/DisplayText';
import Flags, { FlagEnum } from '../../Game/Flags';
import CombatEffect from '../CombatEffect';

export class HarpyBind extends CombatEffect {
    public update(character: Character) {
        if (Flags.list[FlagEnum.PC_FETISH] >= 2) {
            character.stats.lust += 3;
            DisplayText("The harpies are holding you down and restraining you, making the struggle all the sweeter!");
        }
        else
            DisplayText("You're restrained by the harpies so that they can beat on you with impunity.  You'll need to struggle to break free!");
        DisplayText("\n\n");
    }
}
