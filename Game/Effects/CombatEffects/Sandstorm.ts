import { randInt } from '../../../Engine/Utilities/SMath';
import { Character } from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import { CombatEffect } from '../CombatEffect';
import { CombatEffectFactory } from '../CombatEffectFactory';
import { CombatEffectType } from '../CombatEffectType';
import { CView } from '../../../Engine/Display/ContentView';

export class Sandstorm extends CombatEffect {
    public update(character: Character, enemy: Character) {
        if (character.charType !== CharacterType.Player) {
            this.value1 += 1;
            // Blinded:
            if (enemy.combat.effects.has(CombatEffectType.Blind)) {
                enemy.combat.effects.remove(CombatEffectType.Blind);
                CView.text("<b>You blink the sand from your eyes, but you're sure that more will get you if you don't end it soon!</b>");
            }
            else {
                if (enemy.combat.effects.get(CombatEffectType.Sandstorm).value1 === 0 || enemy.combat.effects.get(CombatEffectType.Sandstorm).value1 % 4 === 0) {
                    enemy.combat.effects.set(CombatEffectType.Blind, CombatEffectFactory.create(CombatEffectType.Blind, 0, 0, 0, 0));
                    CView.text("<b>The sand is in your eyes!  You're blinded this turn!</b>");
                }
                else {
                    CView.text("<b>The grainy mess cuts at any exposed flesh and gets into every crack and crevice of your armor. (" + enemy.combat.stats.loseHP(1 + randInt(2), character) + ")</b>");
                }
            }
            CView.text("\n\n");
        }
    }
}
