import LearnedSpellAction from './LearnedSpellAction';
import PlayerCombatAction from './PlayerCombatAction';
import Character from '../../Character/Character';
import Player from '../../Player';
import CombatInterface from '../CombatInterface';

export default interface PlayerCombatInterface extends CombatInterface {
    attack(player: Player, monster: Character): void;
    struggle(player: Player, monster: Character): void;
    approach(player: Player, monster: Character): void;
    tease(player: Player, monster: Character): void;
    useItem(player: Player, monster: Character): void;

    spells(player: Player, monster: Character): LearnedSpellAction[];
    run(player: Player, monster: Character, success: boolean): void;
    physicalAttacks(player: Player): PlayerCombatAction[];
    magicAttacks(player: Player): PlayerCombatAction[];
    wait(player: Player, monster: Character): void;
    fantasize(player: Player, monster: Character): void; 
}
