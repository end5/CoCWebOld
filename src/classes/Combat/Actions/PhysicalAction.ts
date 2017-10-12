import SpecialAction from './SpecialAction';
import Creature from '../../Body/Creature';
import Monster from '../../Monster';
import Player from '../../Player';

export abstract class PhysicalAction implements SpecialAction {
    abstract canUse(player: Player, monster: Monster): boolean;
    abstract reasonCannotUse(): string;
    abstract use(player: Player, monster: Monster);
    
    public readonly baseCost: number;
    public physicalCost(creature: Creature): number {
        let mod: number = this.baseCost;
        let costPercent: number = 100;
        if (creature.perks.has("IronMan")) 
            costPercent -= 50;
        mod *= costPercent / 100;
        return mod;
    }
}
