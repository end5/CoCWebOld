import { Character } from '../../Character/Character';
import { CombatEffect } from '../CombatEffect';
import { CombatEffectType } from '../CombatEffectType';
import { CView } from '../../../Engine/Display/ContentView';

export class ThroatPunch extends CombatEffect {
    public update(character: Character) {
        const throatPunchEffect = character.combat.effects.get(CombatEffectType.ThroatPunch)!;
        throatPunchEffect.value1--;
        if (throatPunchEffect.value1 >= 0) {
            CView.text("Thanks to Isabella's wind-pipe crushing hit, you're having trouble breathing and are ");
            CView.text("<b>unable to cast spells as a consequence.</b>");
            CView.text("\n\n");
        }
        else {
            character.combat.effects.remove(CombatEffectType.ThroatPunch);
            CView.text("Your wind-pipe recovers from Isabella's brutal hit.  You'll be able to focus to cast spells again!");
            CView.text("\n\n");
        }
    }
}
