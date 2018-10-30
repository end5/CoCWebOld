import { ICombatAction } from '../../../../Combat/Actions/ICombatAction';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Character } from '../../../Character';
import { Approach } from './Approach';
import { Recover } from './Recover';
import { Squeeze } from './Squeeze';
import { Struggle } from './Struggle';
import { Attack } from './Attack';
import { CombatAbilityFlag } from '../../../../Effects/CombatAbilityFlag';

export class MainAction implements ICombatAction {
    public flags: CombatAbilityFlag = CombatAbilityFlag.MainAction;
    public name: string = "MainAction";
    public reasonCannotUse: string = "";
    public actions: ICombatAction[] = [];

    private approach = new Approach();
    private recover = new Recover();
    private squeeze = new Squeeze();
    private struggle = new Struggle();
    private attack = new Attack();

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, target: Character): boolean {
        if (this.approach.canUse(character, target)) {
            this.name = this.approach.name;
        }
        else if (this.recover.canUse(character, target)) {
            this.name = this.recover.name;
        }
        else if (this.squeeze.canUse(character, target)) {
            this.name = this.squeeze.name;
        }
        else if (this.struggle.canUse(character, target)) {
            this.name = this.struggle.name;
        }
        else {
            this.name = this.attack.name;
        }
        return true;
    }

    public use(character: Character, target: Character): void | NextScreenChoices {
        if (this.approach.canUse(character, target)) {
            return this.approach.use(character, target);
        }
        else if (this.recover.canUse(character, target)) {
            return this.recover.use(character, target);
        }
        else if (this.squeeze.canUse(character, target)) {
            return this.squeeze.use(character, target);
        }
        else if (this.struggle.canUse(character, target)) {
            return this.struggle.use(character, target);
        }
        else {
            return this.attack.use(character, target);
        }
    }
}
