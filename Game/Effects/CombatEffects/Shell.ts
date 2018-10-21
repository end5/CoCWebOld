import { Character } from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import { CombatEffect } from '../CombatEffect';
import { CombatEffectType } from '../CombatEffectType';
import { CView } from '../../../Engine/Display/ContentView';

export class Shell extends CombatEffect {
    public update(character: Character, enemy: Character) {
        const shellEffect = character.combat.effects.get(CombatEffectType.Shell)!;
        if (character.charType !== CharacterType.Player) {
            if (shellEffect.value1 >= 0) {
                shellEffect.value1 -= 1;
                CView.text("<b>A wall of many hues shimmers around " + character.desc.a + character.desc.short + ".</b>");
            }
            else {
                character.combat.effects.remove(CombatEffectType.Shell);
                CView.text("<b>The magical barrier " + character.desc.a + character.desc.short + " erected fades away to nothing at last.</b>");
            }
            CView.text("\n\n");
        }
    }
}
