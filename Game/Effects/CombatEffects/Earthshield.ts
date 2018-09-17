import { DisplayText } from '../../../Engine/display/DisplayText';
import { Character } from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import { CombatEffect } from '../CombatEffect';

export class Earthshield extends CombatEffect {
    public update(character: Character) {
        if (character.charType !== CharacterType.Player) {
            DisplayText(character.desc.capitalA + character.desc.short + " is protected by a shield of rocks!").bold();
            DisplayText("\n\n");
        }
    }
}
