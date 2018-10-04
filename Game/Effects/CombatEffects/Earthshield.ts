import { Character } from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import { CombatEffect } from '../CombatEffect';
import { CView } from '../../../Engine/Display/ContentView';

export class Earthshield extends CombatEffect {
    public update(character: Character) {
        if (character.charType !== CharacterType.Player) {
            CView.text("<b>" + character.desc.capitalA + character.desc.short + " is protected by a shield of rocks!</b>");
            CView.text("\n\n");
        }
    }
}
