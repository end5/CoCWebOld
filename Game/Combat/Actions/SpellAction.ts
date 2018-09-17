import { CombatAction } from './CombatAction';
import { Character } from '../../Character/Character';

export interface SpellAction extends CombatAction {
    readonly baseCost: number;
    spellCost(character: Character): number;
}
