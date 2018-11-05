import { ICombatAction } from '../../../../Combat/Actions/ICombatAction';
import { Character } from '../../../Character';
import { AnemoneSting } from '../PhysicalAttacks/AnemoneSting';
import { Bite } from '../PhysicalAttacks/Bite';
import { NagaBite } from '../PhysicalAttacks/NagaBite';
import { SpiderBite } from '../PhysicalAttacks/SpiderBite';
import { Constrict } from '../PhysicalAttacks/Constrict';
import { Kick } from '../PhysicalAttacks/Kick';
import { Gore } from '../PhysicalAttacks/Gore';
import { Kiss } from '../PhysicalAttacks/Kiss';
import { Sting } from '../PhysicalAttacks/Sting';
import { Web } from '../PhysicalAttacks/Web';
import { TailWhip } from '../PhysicalAttacks/TailWhip';
import { randomChoice } from '../../../../../Engine/Utilities/SMath';
import { CombatActionFlags } from '../../../../Effects/CombatActionFlag';

export class PhysicalSpecials implements ICombatAction {
    public flag: CombatActionFlags = CombatActionFlags.PhysSpec;
    public name: string = "P. Special";
    public reasonCannotUse: string = "";
    public subActions: ICombatAction[] = [
        new AnemoneSting(),
        new Bite(),
        new NagaBite(),
        new SpiderBite(),
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
        return !!this.subActions.find((action) => action.canUse(character, target));
    }

    public use(character: Character, target: Character): void {
        randomChoice(...this.subActions).use(character, target);
        // return showActions(character, PhysicalActionLib.getPossibleActions(character));
    }
}
