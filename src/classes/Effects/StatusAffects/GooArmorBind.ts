import Character from '../../Character/Character';
import Flags, { FlagEnum } from '../../Game/Flags';
import StatusAffect from '../StatusAffect';

export class GooArmorBind extends StatusAffect {
    public removeOnCombatEnd(): boolean {
        return true;
    }

    public combatUpdate(character: Character): string {
        if (Flags.list[FlagEnum.PC_FETISH] >= 2) {
            character.stats.lust += 3;
            return "The feel of the all-encapsulating goo immobilizing your helpless body turns you on more and more.  Maybe you should just wait for it to completely immobilize you and have you at its mercy.\n\n";
        }
        else return "You're utterly immobilized by the goo flowing around you.  You'll have to struggle free!\n\n";
    }
}
