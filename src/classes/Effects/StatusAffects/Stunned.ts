import Character from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import StatusAffect from '../StatusAffect';

export class Stunned extends StatusAffect {
    public combatUpdate(character: Character, enemy: Character): string {
        if (character.charType == CharacterType.Player) {
        }
        else {
            return "<b>" + character.desc.capitalA + character.desc.short + " is still stunned!</b>\n\n";            
        }
    }
}
