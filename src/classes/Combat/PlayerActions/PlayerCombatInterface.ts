import PlayerCombatAction from './PlayerCombatAction';
import Character from '../../Character/Character';
import Player from '../../Player';
import CombatInterface from '../CombatInterface';

export default interface PlayerCombatInterface extends CombatInterface {
    attack(player: Player, monster: Character): number;
    struggle(player: Player, monster: Character): number;
    tease(player: Player, monster: Character);
    useItem(player: Player, monster: Character);

    spells(monster: Character);
    run(success: boolean);
    physicalAttacks(): PlayerCombatAction[];
    magicAttacks(): PlayerCombatAction[];
    wait();
    fantasize(); 
}
