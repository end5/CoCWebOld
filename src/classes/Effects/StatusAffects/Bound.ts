import Character from '../../Character/Character';
import Flags, { FlagEnum } from '../../Game/Flags';
import StatusAffect from '../StatusAffect';

export class Bound extends StatusAffect {
    public removeOnCombatEnd(): boolean {
        return true;
    }

    public combatUpdate(character: Character): string {
        if (Flags.list[FlagEnum.PC_FETISH] >= 2 && character.inventory.armorSlot.equipment.displayName == "barely-decent bondage straps") {
            character.stats.lust += 3;
            return "The feel of tight leather completely immobilizing you turns you on more and more.  Would it be so bad to just wait and let her play with you like this?\n\n";
        }
    }
}
