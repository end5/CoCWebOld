import Character from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import Utils from '../../Utilities/Utils';
import StatusAffect from '../StatusAffect';
import StatusAffectFactory from '../StatusAffectFactory';
import { StatusAffectType } from '../StatusAffectType';

export class Sandstorm extends StatusAffect {
    public removeOnCombatEnd(): boolean {
        return true;
    }

    public combatUpdate(character: Character, enemy: Character): string {
        if (character.charType == CharacterType.Player) {
        }
        else {
            character.statusAffects.get(StatusAffectType.Sandstorm).value1 += 1;
            //Blinded:
            if (enemy.statusAffects.has(StatusAffectType.Blind)) {
                enemy.statusAffects.remove(StatusAffectType.Blind);
                return "<b>You blink the sand from your eyes, but you're sure that more will get you if you don't end it soon!</b>\n\n";
            }
            else {
                if (character.statusAffects.get(StatusAffectType.Sandstorm).value1 == 0 || character.statusAffects.get(StatusAffectType.Sandstorm).value1 % 4 == 0) {
                    enemy.statusAffects.add(StatusAffectFactory.create(StatusAffectType.Blind, 0, 0, 0, 0));
                    return "<b>The sand is in your eyes!  You're blinded this turn!</b>\n\n";
                }
                else {
                    return "<b>The grainy mess cuts at any exposed flesh and gets into every crack and crevice of your armor. (" + enemy.combat.loseHP(1 + Utils.rand(2), null) + ")</b>\n\n";
                }
            }
        }
    }
}
