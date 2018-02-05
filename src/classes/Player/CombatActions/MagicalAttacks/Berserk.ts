import Character from '../../../Character/Character';
import CombatAction from '../../../Combat/Actions/CombatAction';
import DisplayText from '../../../display/DisplayText';
import { PerkType } from '../../../Effects/PerkType';
import StatusAffectFactory from '../../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../../Effects/StatusAffectType';
import Player from '../../Player';

export class Berserk implements CombatAction {
    public name: string = "Berzerk";
    public reasonCannotUse: string = "You're already pretty goddamn mad!";

    public isPossible(player: Player): boolean {
        return player.perks.has(PerkType.Berzerker);
    }

    public canUse(player: Player): boolean {
        return !player.statusAffects.has(StatusAffectType.Berzerking);
    }

    public use(player: Player, monster: Character) {
        DisplayText().clear();
        DisplayText("You roar and unleash your savage fury, forgetting about defense in order to destroy your foe!\n\n");
        player.statusAffects.add(StatusAffectType.Berzerking, 0, 0, 0, 0);
    }
}
