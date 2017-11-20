import Character from '../../Character/Character';
import Player from '../../Player/Player';
import PhysicalAction from '../PhysicalAction';
import PlayerCombatAction from ../Player/PlayerCombatAction';

export default abstract class PlayerPhysicalAction implements PlayerCombatAction, PhysicalAction {
    abstract isPossible(player: Player): boolean;
    abstract canUse(player: Player, enemy: Character): boolean;
    abstract reasonCannotUse(): string;
    abstract use(player: Player, enemy: Character);
    
    abstract readonly baseCost: number;
    
    public physicalCost(character: Character): number {
        let mod: number = this.baseCost;
        let costPercent: number = 100;
        if (character.perks.has("IronMan")) 
            costPercent -= 50;
        mod *= costPercent / 100;
        return mod;
    }
}
