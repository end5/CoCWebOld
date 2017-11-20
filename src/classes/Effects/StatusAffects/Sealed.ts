import Character from '../../Character/Character';
import StatusAffect from '../StatusAffect';
import { StatusAffectType } from '../StatusAffectType';

export class Sealed extends StatusAffect {
    public removeOnCombatEnd(): boolean {
        return true;
    }

    public combatUpdate(character: Character): string {
        //Countdown and remove as necessary
        if (character.statusAffects.get(StatusAffectType.Sealed).value1 > 0) {
            character.statusAffects.get(StatusAffectType.Sealed).value1--;
            if (character.statusAffects.get(StatusAffectType.Sealed).value1 <= 0)
                character.statusAffects.remove(StatusAffectType.Sealed);
            else
                return "<b>One of your combat abilities is currently sealed by magic!</b>\n\n";
        }
    }
}
