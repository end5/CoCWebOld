import { PhysicalAction } from '../../../Combat/Actions/PhysicalAction';
import { PerkType } from '../../../Effects/PerkType';
import { Character } from '../../Character';
import { ICombatAction } from '../../../Combat/Actions/ICombatAction';
import { CombatActionFlags } from '../../../Effects/CombatActionFlag';

export abstract class PlayerPhysicalAction implements ICombatAction, PhysicalAction {
    public flag: CombatActionFlags = CombatActionFlags.PhysSpec;
    public abstract name: string;
    public reasonCannotUse: string = "";
    public subActions: ICombatAction[] = [];
    public abstract isPossible(character: Character): boolean;
    public abstract canUse(character: Character, enemy: Character): boolean;
    public abstract use(character: Character, enemy: Character): void;

    public abstract readonly baseCost: number;

    public physicalCost(character: Character): number {
        let mod: number = this.baseCost;
        let costPercent: number = 100;
        if (character.perks.has(PerkType.IronMan))
            costPercent -= 50;
        mod *= costPercent / 100;
        return mod;
    }
}
