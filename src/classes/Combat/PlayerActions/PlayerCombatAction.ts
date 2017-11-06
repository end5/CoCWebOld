import Creature from '../../Body/Creature';
import Character from '../../Character/Character';
import Player from '../../Player';
import KeyObject from '../../Utilities/KeyObject';
import CombatAction from '../CombatAction';

export default interface PlayerCombatAction extends CombatAction {
    isPossible(player: Player): boolean;
    canUse(player: Player, monster: Character): boolean;
    reasonCannotUse(): string;
    use(player: Player, monster: Character);    
}
