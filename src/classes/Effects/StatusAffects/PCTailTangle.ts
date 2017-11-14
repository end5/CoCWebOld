import Character from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import StatusAffect from '../StatusAffect';

export class PCTailTangle extends StatusAffect {
    public combatUpdate(character: Character, enemy: Character): string {
        if (character.charType == CharacterType.Player) {
        }
        else {
            //when Entwined
            enemy.stats.lust += 5 + enemy.stats.sens / 10;
            return "You are bound tightly in the kitsune's tails.  <b>The only thing you can do is try to struggle free!</b>\n\n" +
            "Stimulated by the coils of fur, you find yourself growing more and more aroused...\n\n";
        }
    }
}
