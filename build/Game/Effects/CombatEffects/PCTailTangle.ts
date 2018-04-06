import DisplayText from '../../../Engine/display/DisplayText';
import Character from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import CombatEffect from '../CombatEffect';

export class PCTailTangle extends CombatEffect {
    public update(character: Character, enemy: Character) {
        if (character.charType !== CharacterType.Player) {
            // when Entwined
            enemy.stats.lust += 5 + enemy.stats.sens / 10;
            DisplayText("You are bound tightly in the kitsune's tails.  ");
            DisplayText("The only thing you can do is try to struggle free!").bold();
            DisplayText("\n\n");
            DisplayText("Stimulated by the coils of fur, you find yourself growing more and more aroused...");
            DisplayText("\n\n");
        }
    }
}
