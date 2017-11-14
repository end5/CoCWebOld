import Character from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import StatusAffect from '../StatusAffect';

export class MilkyUrta extends StatusAffect {
    public combatUpdate(character: Character, enemy: Character): string {
        if (character.charType == CharacterType.Player) {
        }
        else {
            return Game.sceneManager.urtaQuest.milkyUrtaTic();
        }
    }
}
