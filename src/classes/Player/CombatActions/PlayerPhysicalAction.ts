import Character from '../../Character/Character';
import CombatAction from '../../Combat/Actions/CombatAction';
import PhysicalAction from '../../Combat/Actions/PhysicalAction';
import { PerkType } from '../../Effects/PerkType';
import Player from '../Player';

export default abstract class PlayerPhysicalAction implements CombatAction, PhysicalAction {
    abstract name: string;
    public reasonCannotUse: string;
    abstract isPossible(player: Player): boolean;
    abstract canUse(player: Player, enemy: Character): boolean;
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
