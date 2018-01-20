import Character from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import DisplayText from '../../display/DisplayText';
import CombatEffect from '../CombatEffect';

export class Stunned extends CombatEffect {
    public update(character: Character, enemy: Character) {
        if (character.charType !== CharacterType.Player) {
            DisplayText(character.desc.capitalA + character.desc.short + " is still stunned!").bold();
            DisplayText("\n\n");
        }
    }
}
