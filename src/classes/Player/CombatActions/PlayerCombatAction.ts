import Creature from '../../Body/Creature';
import Character from '../../Character/Character';
import CombatAction from '../../Combat/Actions/CombatAction';
import LibraryEntry from '../../Utilities/LibraryEntry';
import Player from '../Player';

export default interface PlayerCombatAction extends CombatAction {
    isPossible(player: Player): boolean;
    canUse(player: Player, monster: Character): boolean;
    reasonCannotUse(): string;
    use(player: Player, monster: Character);    
}
