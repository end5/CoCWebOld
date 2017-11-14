import Character from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import StatusAffect from '../StatusAffect';

export class Earthshield extends StatusAffect {
    public combatUpdate(character: Character, enemy: Character): string {
        if (character.charType == CharacterType.Player) {
        }
        else {
            return "<b>" + character.desc.capitalA + character.desc.short + " is protected by a shield of rocks!</b>\n\n";
        }
    }
}
