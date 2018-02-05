import Character from '../Character/Character';
import { StatusAffectType } from '../Effects/StatusAffectType';
import Player from '../Player/Player';

export default class CombatCleanup {
    public static performCleanup(player: Player, playerParty: Character[], monsterParty: Character[]) {
        player.combat.effects.clear();
        for (const member of playerParty) {
            member.combat.effects.clear();
        }
        for (const member of monsterParty) {
            member.combat.effects.clear();
        }

        // Really annoying and dont know how to handle or what does
        if (player.statusAffects.has(StatusAffectType.TwuWuv)) {
            player.stats.int += monsterParty[0].statusAffects.get(StatusAffectType.TwuWuv).value1;
            player.statusAffects.remove(StatusAffectType.TwuWuv);
        }
    }
}
