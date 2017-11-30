import Character from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import DisplayText from '../../display/DisplayText';
import Utils from '../../Utilities/Utils';
import CombatEffect from '../CombatEffect';
import CombatEffectFactory from '../CombatEffectFactory';
import { CombatEffectType } from '../CombatEffectType';

export class Sandstorm extends CombatEffect {
    public update(character: Character, enemy: Character) {
        if (character.charType != CharacterType.Player) {
            this.value1 += 1;
            //Blinded:
            if (enemy.combat.effects.has(CombatEffectType.Blind)) {
                enemy.combat.effects.remove(CombatEffectType.Blind);
                DisplayText.bold("You blink the sand from your eyes, but you're sure that more will get you if you don't end it soon!");
            }
            else {
                if (enemy.combat.effects.get(CombatEffectType.Sandstorm).value1 == 0 || enemy.combat.effects.get(CombatEffectType.Sandstorm).value1 % 4 == 0) {
                    enemy.combat.effects.add(CombatEffectFactory.create(CombatEffectType.Blind, 0, 0, 0, 0));
                    DisplayText.bold("The sand is in your eyes!  You're blinded this turn!");
                }
                else {
                    DisplayText.bold("The grainy mess cuts at any exposed flesh and gets into every crack and crevice of your armor. (" + enemy.combat.stats.loseHP(1 + Utils.rand(2), null) + ")");
                }
            }
            DisplayText.newParagraph();
        }
    }
}
