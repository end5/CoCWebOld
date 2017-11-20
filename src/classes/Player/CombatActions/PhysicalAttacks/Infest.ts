import Character from '../../../Character/Character';
import Player from '../../../Player/Player';
import PlayerCombatAction from '../Player/PlayerCombatAction';

export default class Infest implements PlayerCombatAction {
    public isPossible(player: Player): boolean {
        return player.statusAffects.has("Infested") && player.statusAffects.get("Infested").value1 == 5 && player.lowerBody.cockSpot.hasCock();
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
