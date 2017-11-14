import Character from '../../Character/Character';
import StatusAffect from '../StatusAffect';

export class Sealed extends StatusAffect {
    public removeOnCombatEnd(): boolean {
        return true;
    }

    public combatUpdate(character: Character): string {
        //Countdown and remove as necessary
        if (character.statusAffects.get("Sealed").value1 > 0) {
            character.statusAffects.get("Sealed").value1--;
            if (character.statusAffects.get("Sealed").value1 <= 0)
                character.statusAffects.remove("Sealed");
            else
                return "<b>One of your combat abilities is currently sealed by magic!</b>\n\n";
        }
    }
}
