import { PhysicalAction } from '../../../Combat/Actions/PhysicalAction';
import { PerkType } from '../../../Effects/PerkType';
import { Character } from '../../Character';
import { ICombatAction } from '../../../Combat/Actions/ICombatAction';
import { CombatAbilityFlag } from '../../../Effects/CombatAbilityFlag';
import { NextScreenChoices } from '../../../ScreenDisplay';

export abstract class PlayerPhysicalAction implements ICombatAction, PhysicalAction {
    public flags: CombatAbilityFlag = CombatAbilityFlag.PhysSpec;
    public abstract name: string;
    public reasonCannotUse: string = "";
    public actions: ICombatAction[] = [];
    public abstract isPossible(character: Character): boolean;
    public abstract canUse(character: Character, enemy: Character): boolean;
    public abstract use(character: Character, enemy: Character): void | NextScreenChoices;

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
