import { Character } from '../../Character/Character';
import { CombatEffect } from '../CombatEffect';
import { CombatEffectType } from '../CombatEffectType';
import { CView } from '../../../Engine/Display/ContentView';

export class Sealed extends CombatEffect {
    public update(character: Character) {
        const sealedEffect = character.combat.effects.get(CombatEffectType.Sealed)!;
        // Countdown and remove as necessary
        if (sealedEffect.value1 > 0) {
            sealedEffect.value1--;
            if (sealedEffect.value1 <= 0)
                character.combat.effects.remove(CombatEffectType.Sealed);
            else {
                CView.text("<b>One of your combat abilities is currently sealed by magic!</b>");
                CView.text("\n\n");
            }
        }
    }
}
