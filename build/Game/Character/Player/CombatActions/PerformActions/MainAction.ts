import CombatAction from '../../../../Combat/Actions/CombatAction';
import NoAction from '../../../../Combat/Actions/NoAction';
import { CombatAbilityFlag } from '../../../../Effects/CombatAbilityFlag';
import Character from '../../../Character';

export class MainAction implements CombatAction {
    public name: string = "MainAction";
    public reasonCannotUse: string = "";

    public isPossible(character: Character): boolean {
        return character.combat.effects.combatAbilityFlag & CombatAbilityFlag.MainAction ? true : false;
    }

    public canUse(character: Character, target?: Character): boolean {
        const performActions = character.combat.perform;
        if (performActions.approach.canUse(character)) {
            this.name = performActions.approach.name;
        }
        else if (performActions.recover.canUse(character)) {
            this.name = performActions.recover.name;
        }
        else if (performActions.squeeze.canUse(character)) {
            this.name = performActions.squeeze.name;
        }
        else if (performActions.struggle.canUse(character)) {
            this.name = performActions.struggle.name;
        }
        else {
            this.name = performActions.attack.name;
        }
        return true;
    }

    public use(character: Character, target: Character) {
        const performActions = character.combat.perform;
        if (performActions.approach.canUse(character)) {
            performActions.approach.use(character, target);
        }
        else if (performActions.recover.canUse(character)) {
            performActions.recover.use(character, target);
        }
        else if (performActions.squeeze.canUse(character)) {
            performActions.squeeze.use(character, target);
        }
        else if (performActions.struggle.canUse(character)) {
            performActions.struggle.use(character, target);
        }
        else {
            performActions.attack.use(character, target);
        }
    }
}
