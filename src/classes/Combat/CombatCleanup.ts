import Character from '../Character/Character';
import DisplayText from '../display/DisplayText';
import StatusAffect from '../Effects/StatusAffect';
import { StatusAffectType } from '../Effects/StatusAffectType';
import Flags, { FlagEnum } from '../Game/Flags';
import Game from '../Game/Game';
import Player from '../Player/Player';

export default class CombatCleanup {
    private static clearCombatEffects(character: Character) {
        let effects = character.combat.effects;
        while (character.combat.effects.count() > 0) {
            effects.remove(effects.at(0).type);
        }
    }

    public static performCleanup(player: Player, playerParty: Character[], monsterParty: Character[]) {
        CombatCleanup.clearCombatEffects(player);
        for (let index = 0; index < playerParty.length; index++) {
            CombatCleanup.clearCombatEffects(playerParty[index]);
        }
        for (let index = 0; index < monsterParty.length; index++) {
            CombatCleanup.clearCombatEffects(monsterParty[index]);
        }
        

        // Really annoying and dont know how to handle or what does
        if (player.statusAffects.has(StatusAffectType.TwuWuv)) {
            player.stats.int += monsterParty[0].statusAffects.get(StatusAffectType.TwuWuv).value1;
            player.statusAffects.remove(StatusAffectType.TwuWuv);
        }
    }
}