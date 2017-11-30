import Character from '../../Character/Character';
import DisplayText from '../../display/DisplayText';
import CombatEffect from '../CombatEffect';
import { CombatEffectType } from '../CombatEffectType';

export class ThroatPunch extends CombatEffect {
    public update(character: Character) {
        character.combat.effects.get(CombatEffectType.ThroatPunch).value1--;
        if (character.combat.effects.get(CombatEffectType.ThroatPunch).value1 >= 0) {
            DisplayText.text("Thanks to Isabella's wind-pipe crushing hit, you're having trouble breathing and are ");
            DisplayText.bold("unable to cast spells as a consequence.");
            DisplayText.newParagraph();
        }
        else {
            character.combat.effects.remove(CombatEffectType.ThroatPunch);
            DisplayText.text("Your wind-pipe recovers from Isabella's brutal hit.  You'll be able to focus to cast spells again!");
            DisplayText.newParagraph();
        }
    }
}
