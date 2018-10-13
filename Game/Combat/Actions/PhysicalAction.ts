import { ICombatAction } from './ICombatAction';
import { Character } from '../../Character/Character';

export interface PhysicalAction extends ICombatAction {
    readonly baseCost: number;
    physicalCost(character: Character): number;
}
