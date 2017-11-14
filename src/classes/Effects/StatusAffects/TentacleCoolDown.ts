import Character from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import StatusAffect from '../StatusAffect';
import { StatusAffectType } from '../StatusAffectType';

export class TentacleCoolDown extends StatusAffect {
    public combatUpdate(character: Character, enemy: Character): string {
        if (character.charType == CharacterType.Player) {
        }
        else {
            character.statusAffects.get(StatusAffectType.TentacleCoolDown).value1 -= 1;
            if (character.statusAffects.get(StatusAffectType.TentacleCoolDown).value1 == 0) {
                character.statusAffects.remove(StatusAffectType.TentacleCoolDown);
            }
        }
        return "";
    }
}
