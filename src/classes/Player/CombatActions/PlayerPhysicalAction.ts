import PlayerCombatAction from './PlayerCombatAction';
import Character from '../../Character/Character';
import PhysicalAction from '../../Combat/Actions/PhysicalAction';
import { PerkType } from '../../Effects/PerkType';
import Player from '../Player';

export default abstract class PlayerPhysicalAction implements PlayerCombatAction, PhysicalAction {
    abstract isPossible(player: Player): boolean;
    abstract canUse(player: Player, enemy: Character): boolean;
    abstract reasonCannotUse(): string;
    abstract use(player: Player, enemy: Character);
    
    abstract readonly baseCost: number;
    
    public physicalCost(character: Character): number {
        let mod: number = this.baseCost;
        let costPercent: number = 100;
        if (character.perks.has(PerkType.IronMan)) 
            costPercent -= 50;
        mod *= costPercent / 100;
        return mod;
    }
}
