import { DisplayText } from '../../../Engine/display/DisplayText';
import { randInt } from '../../../Engine/Utilities/SMath';
import { Character } from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import { CombatEffect } from '../CombatEffect';

export class SuccubusAura extends CombatEffect {
    public update(character: Character, enemy: Character) {
        if (character.charType !== CharacterType.Player) {
            if (character.charType === CharacterType.SecretarialSuccubus || character.charType === CharacterType.MilkySuccubus) {
                enemy.stats.lust += 1 + randInt(8);
                if (enemy.stats.lust < 45)
                    DisplayText("There is something in the air around your opponent that makes you feel warm.");
                if (enemy.stats.lust >= 45 && enemy.stats.lust < 70)
                    DisplayText("You aren't sure why but you have difficulty keeping your eyes off your opponent's lewd form.");
                if (enemy.stats.lust >= 70 && enemy.stats.lust < 90)
                    DisplayText("You blush when you catch yourself staring at your foe's rack, watching it wobble with every step she takes.");
                if (enemy.stats.lust >= 90)
                    DisplayText("You have trouble keeping your greedy hands away from your groin.  It would be so easy to just lay down and masturbate to the sight of your curvy enemy.  The succubus looks at you with a sexy, knowing expression.");
                DisplayText("\n\n");
            }
        }
    }
}
