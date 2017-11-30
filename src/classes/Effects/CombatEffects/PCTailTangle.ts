import Character from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import DisplayText from '../../display/DisplayText';
import CombatEffect from '../CombatEffect';

export class PCTailTangle extends CombatEffect {
    public update(character: Character, enemy: Character) {
        if (character.charType != CharacterType.Player) {
            //when Entwined
            enemy.stats.lust += 5 + enemy.stats.sens / 10;
            DisplayText.text("You are bound tightly in the kitsune's tails.  ");
            DisplayText.bold("The only thing you can do is try to struggle free!");
            DisplayText.newParagraph();
            DisplayText.text("Stimulated by the coils of fur, you find yourself growing more and more aroused...");
            DisplayText.newParagraph();            
        }
    }
}
