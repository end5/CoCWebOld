import Character from '../../Character/Character';
import Flags, { FlagEnum } from '../../Game/Flags';
import StatusAffect from '../StatusAffect';

export class HarpyBind extends StatusAffect {
    public removeOnCombatEnd(): boolean {
        return true;
    }

    public combatUpdate(character: Character): string {
        if (Flags.list[FlagEnum.PC_FETISH] >= 2) {
            character.stats.lust += 3;
            return "The harpies are holding you down and restraining you, making the struggle all the sweeter!\n\n";
        }
        else return "You're restrained by the harpies so that they can beat on you with impunity.  You'll need to struggle to break free!\n\n";
    }
}
