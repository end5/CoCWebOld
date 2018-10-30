import { ICombatAction } from '../../../../Combat/Actions/ICombatAction';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Character } from '../../../Character';
import { AnemoneSting } from '../PhysicalAttacks/AnemoneSting';
import { Bite } from '../PhysicalAttacks/Bite';
import { NagaBite } from '../PhysicalAttacks/NagaBite';
import { SpiderBite } from '../PhysicalAttacks/SpiderBite';
import { FireBow } from '../PhysicalAttacks/FireBow';
import { Constrict } from '../PhysicalAttacks/Constrict';
import { Kick } from '../PhysicalAttacks/Kick';
import { Gore } from '../PhysicalAttacks/Gore';
import { Kiss } from '../PhysicalAttacks/Kiss';
import { Sting } from '../PhysicalAttacks/Sting';
import { Web } from '../PhysicalAttacks/Web';
import { TailWhip } from '../PhysicalAttacks/TailWhip';
import { randomChoice } from '../../../../../Engine/Utilities/SMath';
import { CombatAbilityFlag } from '../../../../Effects/CombatAbilityFlag';

export class PhysicalSpecials implements ICombatAction {
    public flags: CombatAbilityFlag = CombatAbilityFlag.PhysSpec;
    public name: string = "P. Special";
    public reasonCannotUse: string = "";
    public actions: ICombatAction[] = [
        new AnemoneSting(),
        new Bite(),
        new NagaBite(),
        new SpiderBite(),
        new FireBow(),
        new Constrict(),
        new Kick(),
        new Gore(),
        new Kiss(),
        new Sting(),
        new Web(),
        new TailWhip(),
    ];

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, target: Character): boolean {
        return !!this.actions.find((action) => action.canUse(character, target));
    }

    public use(character: Character, target: Character): void | NextScreenChoices {
        return randomChoice(...this.actions).use(character, target);
        // return showActions(character, PhysicalActionLib.getPossibleActions(character));
    }
}
