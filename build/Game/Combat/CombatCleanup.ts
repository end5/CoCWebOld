import { Character } from '../Character/Character';
import { StatusAffectType } from '../Effects/StatusAffectType';

export class CombatCleanup {
    public static performCleanup(mainCharacter: Character, allyParty: Character[], enemyParty: Character[]) {
        mainCharacter.combat.effects.clear();
        for (const member of allyParty) {
            member.combat.effects.clear();
        }
        for (const member of enemyParty) {
            member.combat.effects.clear();
        }

        // Really annoying and dont know how to handle or what does
        if (mainCharacter.statusAffects.has(StatusAffectType.TwuWuv)) {
            mainCharacter.stats.int += enemyParty[0].statusAffects.get(StatusAffectType.TwuWuv).value1;
            mainCharacter.statusAffects.remove(StatusAffectType.TwuWuv);
        }
    }
}
