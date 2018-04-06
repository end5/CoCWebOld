import CombatAction from '../../../../Combat/Actions/CombatAction';
import { CombatAbilityFlag } from '../../../../Effects/CombatAbilityFlag';
import Character from '../../../Character';

export default class MoveAway implements CombatAction {
    private selectedAction: CombatAction;
    public name: string = "MoveAway";
    public reasonCannotUse: string = "";

    public isPossible(character: Character): boolean {
        return character.combat.effects.combatAbilityFlag & CombatAbilityFlag.MoveAway ? true : false;
    }

    public canUse(character: Character, monster: Character): boolean {
        const performActions = character.combat.perform;
        if (performActions.climb.canUse(character, monster)) {
            this.name = performActions.climb.name;
            this.selectedAction = performActions.climb;
        }
        else if (performActions.release.canUse(character, monster)) {
            this.name = performActions.release.name;
            this.selectedAction = performActions.release;
        }
        else {
            this.name = performActions.run.name;
            this.selectedAction = performActions.run;
        }
        return true;
    }

    public use(character: Character, monster: Character) {
        this.selectedAction.use(character, monster);
    }
}
