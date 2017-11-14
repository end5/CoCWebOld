import Character from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import StatusAffect from '../StatusAffect';

export class Timer extends StatusAffect {
    public combatUpdate(character: Character, enemy: Character): string {
        if (character.charType == CharacterType.Player) {
        }
        else {
            if (character.statusAffects.get("Timer").value1 <= 0)
                character.statusAffects.remove("Timer");
            character.statusAffects.get("Timer").value1 -= 1;
        }
        return "";
    }
}
