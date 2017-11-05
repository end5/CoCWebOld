import CombatAction from './CombatAction';
import Character from '../Character/Character';

export default interface CombatInterface {
    attack(player: Character, monster: Character): number;
    tease(player: Character, monster: Character);
    useItem(player: Character, monster: Character);
    physicalAttacks(): CombatAction[];
    magicAttacks(): CombatAction[];
}