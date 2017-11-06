import CombatAction from './CombatAction';
import Character from '../Character/Character';

export default interface CombatInterface {
    attack(player: Character, monster: Character): void;
    tease(player: Character, monster: Character): void;
    useItem(player: Character, monster: Character): void;
    physicalAttacks(player: Character): CombatAction[];
    magicAttacks(player: Character): CombatAction[];
}