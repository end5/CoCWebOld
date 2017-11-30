import Character from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import DisplayText from '../../display/DisplayText';
import CombatEffect from '../CombatEffect';

export class Earthshield extends CombatEffect {
    public update(character: Character) {
        if (character.charType != CharacterType.Player) {
            DisplayText.bold(character.desc.capitalA + character.desc.short + " is protected by a shield of rocks!");
            DisplayText.newParagraph();
        }
    }
}
