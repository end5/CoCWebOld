import { Character } from '../Character/Character';
import { StatusEffectType } from '../Effects/StatusEffectType';

export function combatCleanup(mainCharacter: Character, allyParty: Character[], enemyParty: Character[]) {
    mainCharacter.combat.effects.clear();
    for (const member of allyParty) {
        member.combat.effects.clear();
    }
    for (const member of enemyParty) {
        member.combat.effects.clear();
    }

    // Really annoying and dont know how to handle or what does
    if (mainCharacter.effects.has(StatusEffectType.TwuWuv)) {
        mainCharacter.stats.int += enemyParty[0].effects.get(StatusEffectType.TwuWuv).value1;
        mainCharacter.effects.remove(StatusEffectType.TwuWuv);
    }
}
