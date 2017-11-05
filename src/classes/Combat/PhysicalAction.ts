import CombatAction from './CombatAction';
import Character from '../Character/Character';

export default interface PhysicalAction extends CombatAction {
    readonly baseCost: number;
    physicalCost(character: Character): number;
}
