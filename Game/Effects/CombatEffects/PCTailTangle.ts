import { Character } from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import { CombatEffect } from '../CombatEffect';
import { CView } from '../../../Engine/Display/ContentView';

export class PCTailTangle extends CombatEffect {
    public update(character: Character, enemy: Character) {
        if (character.charType !== CharacterType.Player) {
            // when Entwined
            enemy.stats.lust += 5 + enemy.stats.sens / 10;
            CView.text("You are bound tightly in the kitsune's tails.  ");
            CView.text("<b>The only thing you can do is try to struggle free!</b>");
            CView.text("\n\n");
            CView.text("Stimulated by the coils of fur, you find yourself growing more and more aroused...");
            CView.text("\n\n");
        }
    }
}
