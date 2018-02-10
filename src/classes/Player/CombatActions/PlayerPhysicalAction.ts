import Character from '../../Character/Character';
import CombatAction from '../../Combat/Actions/CombatAction';
import PhysicalAction from '../../Combat/Actions/PhysicalAction';
import { PerkType } from '../../Effects/PerkType';

export default abstract class PlayerPhysicalAction implements CombatAction, PhysicalAction {
    public abstract name: string;
    public reasonCannotUse: string;
    public abstract isPossible(character: Character): boolean;
    public abstract canUse(character: Character, enemy: Character): boolean;
    public abstract use(character: Character, enemy: Character);

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
