import Character from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import Utils from '../../Utilities/Utils';
import StatusAffect from '../StatusAffect';

export class SuccubusAura extends StatusAffect {
    public combatUpdate(character: Character, enemy: Character): string {
        if (character.charType == CharacterType.Player) {
        }
        else {
            if (character.charType == CharacterType.SecretarialSuccubus || character.charType == CharacterType.MilkySuccubus) {
                let out: string = "";
                if (enemy.stats.lust < 45) out += "There is something in the air around your opponent that makes you feel warm.\n\n";
                if (enemy.stats.lust >= 45 && enemy.stats.lust < 70) out += "You aren't sure why but you have difficulty keeping your eyes off your opponent's lewd form.\n\n";
                if (enemy.stats.lust >= 70 && enemy.stats.lust < 90) out += "You blush when you catch yourself staring at your foe's rack, watching it wobble with every step she takes.\n\n";
                if (enemy.stats.lust >= 90) out += "You have trouble keeping your greedy hands away from your groin.  It would be so easy to just lay down and masturbate to the sight of your curvy enemy.  The succubus looks at you with a sexy, knowing expression.\n\n";
                enemy.stats.lust += 1 + Utils.rand(8);
                return out;
            }
        }
    }
}
