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

    public canUse(character: Character, target?: Character): boolean {
        if (this.approach.canUse(character)) {
            this.name = this.approach.name;
        }
        else if (this.recover.canUse(character)) {
            this.name = this.recover.name;
        }
        else if (this.squeeze.canUse(character)) {
            this.name = this.squeeze.name;
        }
        else if (this.struggle.canUse(character)) {
            this.name = this.struggle.name;
        }
        else {
            this.name = this.attack.name;
        }
        return true;
    }

    public use(character: Character, target: Character): void | NextScreenChoices {
        if (this.approach.canUse(character)) {
            return this.approach.use(character, target);
        }
        else if (this.recover.canUse(character)) {
            return this.recover.use(character, target);
        }
        else if (this.squeeze.canUse(character)) {
            return this.squeeze.use(character, target);
        }
        else if (this.struggle.canUse(character)) {
            return this.struggle.use(character, target);
        }
        else {
            return this.attack.use(character, target);
        }
    }
}
