import Character from '../../../../Character/Character';
import CombatAction from '../../../../Combat/Actions/CombatAction';
import { StatusAffectType } from '../../../../Effects/StatusAffectType';
import Player from '../../Player';

export class Infest implements CombatAction {
    public name: string = "Infest";
    public reasonCannotUse: string = "";

    public isPossible(player: Player): boolean {
        return player.statusAffects.has(StatusAffectType.Infested) && player.statusAffects.get(StatusAffectType.Infested).value1 === 5 && player.torso.cocks.count > 0;
    }

    public canUse(player: Player): boolean {
        return true;
    }

    public use(player: Player, monster: Character) {
        // this.playerInfest();
    }
}
