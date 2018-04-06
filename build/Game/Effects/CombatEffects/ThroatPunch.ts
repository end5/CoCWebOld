import DisplayText from '../../../Engine/display/DisplayText';
import Character from '../../Character/Character';
import CombatEffect from '../CombatEffect';
import { CombatEffectType } from '../CombatEffectType';

export class ThroatPunch extends CombatEffect {
    public update(character: Character) {
        character.combat.effects.get(CombatEffectType.ThroatPunch).value1--;
        if (character.combat.effects.get(CombatEffectType.ThroatPunch).value1 >= 0) {
            DisplayText("Thanks to Isabella's wind-pipe crushing hit, you're having trouble breathing and are ");
            DisplayText("unable to cast spells as a consequence.").bold();
            DisplayText("\n\n");
        }
        else {
            character.combat.effects.remove(CombatEffectType.ThroatPunch);
            DisplayText("Your wind-pipe recovers from Isabella's brutal hit.  You'll be able to focus to cast spells again!");
            DisplayText("\n\n");
        }
    }
}
