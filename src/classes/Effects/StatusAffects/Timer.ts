import Character from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import StatusAffect from '../StatusAffect';
import { StatusAffectType } from '../StatusAffectType';

export class Timer extends StatusAffect {
    public combatUpdate(character: Character, enemy: Character): string {
        if (character.charType == CharacterType.Player) {
        }
        else {
            if (character.statusAffects.get(StatusAffectType.Timer).value1 <= 0)
                character.statusAffects.remove(StatusAffectType.Timer);
            character.statusAffects.get(StatusAffectType.Timer).value1 -= 1;
        }
        return "";
    }
}
