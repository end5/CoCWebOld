import { ICombatAction } from './ICombatAction';
import { Character } from '../../Character/Character';

export interface SpellAction extends ICombatAction {
    readonly baseCost: number;
    spellCost(character: Character): number;
}
