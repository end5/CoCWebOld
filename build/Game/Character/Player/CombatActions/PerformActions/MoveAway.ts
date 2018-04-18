import CombatAction from '../../../../Combat/Actions/CombatAction';
import { CombatAbilityFlag } from '../../../../Effects/CombatAbilityFlag';
import Character from '../../../Character';

export class MoveAway implements CombatAction {
    public name: string = "MoveAway";
    public reasonCannotUse: string = "";

    public isPossible(character: Character): boolean {
        return character.combat.effects.combatAbilityFlag & CombatAbilityFlag.MoveAway ? true : false;
    }

    public canUse(character: Character, target?: Character): boolean {
        const performActions = character.combat.perform;
        if (target !== undefined) {
            if (performActions.climb.canUse(character, target)) {
                this.name = performActions.climb.name;
            }
            else if (performActions.release.canUse(character, target)) {
                this.name = performActions.release.name;
            }
        }
        else {
            this.name = performActions.run.name;
        }
        return true;
    }

    public use(character: Character, target: Character) {
        const performActions = character.combat.perform;
        if (performActions.climb.canUse(character, target)) {
            performActions.climb.use(character, target);
        }
        else if (performActions.release.canUse(character, target)) {
            performActions.release.use(character, target);
        }
        else {
            performActions.run.use(character, target);
        }
    }
}
