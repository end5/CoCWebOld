import { Character } from '../Character/Character';
import { StatusEffectType } from '../Effects/StatusEffectType';

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
        if (mainCharacter.statusAffects.has(StatusEffectType.TwuWuv)) {
            mainCharacter.stats.int += enemyParty[0].statusAffects.get(StatusEffectType.TwuWuv).value1;
            mainCharacter.statusAffects.remove(StatusEffectType.TwuWuv);
        }
    }
}
