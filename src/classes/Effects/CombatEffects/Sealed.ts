import Character from '../../Character/Character';
import DisplayText from '../../display/DisplayText';
import CombatEffect from '../CombatEffect';
import { CombatEffectType } from '../CombatEffectType';

export class Sealed extends CombatEffect {
    public update(character: Character) {
        //Countdown and remove as necessary
        if (character.combat.effects.get(CombatEffectType.Sealed).value1 > 0) {
            character.combat.effects.get(CombatEffectType.Sealed).value1--;
            if (character.combat.effects.get(CombatEffectType.Sealed).value1 <= 0)
                character.combat.effects.remove(CombatEffectType.Sealed);
            else {
                DisplayText.bold("One of your combat abilities is currently sealed by magic!");
                DisplayText.newParagraph();
            }
        }
    }
}