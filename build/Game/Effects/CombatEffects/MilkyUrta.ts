import Character from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import Scenes from '../../Scenes/Scenes';
import CombatEffect from '../CombatEffect';

export class MilkyUrta extends CombatEffect {
    public update(character: Character) {
        if (character.charType !== CharacterType.Player) {
            // Scenes.urtaQuest.milkyUrtaTic();
        }
    }
}
