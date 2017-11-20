import Character from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import StatusAffect from '../StatusAffect';
import { StatusAffectType } from '../StatusAffectType';

export class Shell extends StatusAffect {
    public combatUpdate(character: Character, enemy: Character): string {
        if (character.charType == CharacterType.Player) {
        }
        else {
            if (character.statusAffects.get(StatusAffectType.Shell).value1 >= 0) {
                character.statusAffects.get(StatusAffectType.Shell).value1 -= 1;
                return "<b>A wall of many hues shimmers around " + character.desc.a + character.desc.short + ".</b>\n\n";
            }
            else {
                character.statusAffects.remove(StatusAffectType.Shell);
                return "<b>The magical barrier " + character.desc.a + character.desc.short + " erected fades away to nothing at last.</b>\n\n";
            }
        }
    }
}
