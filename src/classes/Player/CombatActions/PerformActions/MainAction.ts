import Character from '../../../Character/Character';
import CombatAction from '../../../Combat/Actions/CombatAction';
import { CombatAbilityFlag } from '../../../Effects/CombatAbilityFlag';

export default class MainAction implements CombatAction {
    private selectedAction: CombatAction;
    public name: string = "MainAction";
    public reasonCannotUse: string = "";

    public isPossible(character: Character): boolean {
        return character.combat.effects.combatAbilityFlag & CombatAbilityFlag.MainAction ? true : false;
    }

    public canUse(character: Character, monster: Character): boolean {
        const performActions = character.combat.perform;
        if (performActions.approach.canUse(character)) {
            this.name = performActions.approach.name;
            this.selectedAction = performActions.approach;
        }
        else if (performActions.recover.canUse(character)) {
            this.name = performActions.recover.name;
            this.selectedAction = performActions.recover;
        }
        else if (performActions.squeeze.canUse(character)) {
            this.name = performActions.squeeze.name;
            this.selectedAction = performActions.squeeze;
        }
        else if (performActions.struggle.canUse(character)) {
            this.name = performActions.struggle.name;
            this.selectedAction = performActions.struggle;
        }
        else {
            this.name = performActions.attack.name;
            this.selectedAction = performActions.attack;
        }
        return true;
    }

    public use(character: Character, monster: Character) {
        this.selectedAction.use(character, monster);
    }
}
