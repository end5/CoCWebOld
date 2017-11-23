import CombatAction from './Actions/CombatAction';
import Character from '../Character/Character';

export default interface ActionPerform {
    attack(player: Character, monster: Character): void;
    tease(player: Character, monster: Character): void;
    useItem(player: Character, monster: Character): void;
    physicalAttacks(player: Character): CombatAction[];
    magicAttacks(player: Character): CombatAction[];
}
