import Character from '../../../Character/Character';
import { StatusAffectType } from '../../../Effects/StatusAffectType';
import Player from '../../Player';
import PlayerCombatAction from '../PlayerCombatAction';

export class Infest implements PlayerCombatAction {
    public isPossible(player: Player): boolean {
        return player.statusAffects.has(StatusAffectType.Infested) && player.statusAffects.get(StatusAffectType.Infested).value1 == 5 && player.lowerBody.cockSpot.hasCock();
    }

    public canUse(player: Player): boolean {
        return true;
    }

    public reasonCannotUse(): string {
        return "";
    }

    public use(player: Player, monster: Character) {
        this.playerInfest();
    }
}
