import Character from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import DisplayText from '../../display/DisplayText';
import CombatEffect from '../CombatEffect';
import { CombatEffectType } from '../CombatEffectType';

export class Shell extends CombatEffect {
    public update(character: Character, enemy: Character) {
        if (character.charType !== CharacterType.Player) {
            if (character.combat.effects.get(CombatEffectType.Shell).value1 >= 0) {
                character.combat.effects.get(CombatEffectType.Shell).value1 -= 1;
                DisplayText("A wall of many hues shimmers around " + character.desc.a + character.desc.short + ".").bold();
            }
            else {
                character.combat.effects.remove(CombatEffectType.Shell);
                DisplayText("The magical barrier " + character.desc.a + character.desc.short + " erected fades away to nothing at last.").bold();
            }
            DisplayText("\n\n");
        }
    }
}
