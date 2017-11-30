import Character from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import CombatEffect from '../CombatEffect';

export class MilkyUrta extends CombatEffect {
    public update(character: Character) {
        if (character.charType != CharacterType.Player) {
            Game.sceneManager.urtaQuest.milkyUrtaTic();
        }
    }
}
