import Character from '../../../Character/Character';
import DisplayText from '../../../display/DisplayText';
import StatusAffectFactory from '../../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../../Effects/StatusAffectType';
import Player from '../../../Player/Player';
import PlayerCombatAction from '../Player/PlayerCombatAction';

export default class Berserk implements PlayerCombatAction {
    public isPossible(player: Player): boolean {
        return player.perks.has("Berzerker");
    }

    public canUse(player: Player): boolean {
        return !player.statusAffects.has("Berzerking");
    }

    public reasonCannotUse(): string {
        return "You're already pretty goddamn mad!";
    }

    public use(player: Player, monster: Character) {
        DisplayText.clear()
        DisplayText.text("You roar and unleash your savage fury, forgetting about defense in order to destroy your foe!\n\n");
        player.statusAffects.add(StatusAffectFactory.create(StatusAffectType.Berzerking, 0, 0, 0, 0));
    }
}
