import { ICombatAction } from '../../../../Combat/Actions/ICombatAction';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Character } from '../../../Character';
import { Climb } from './Climb';
import { Release } from './Release';
import { Run } from './Run';
import { CombatAbilityFlag } from '../../../../Effects/CombatAbilityFlag';

export class MoveAway implements ICombatAction {
    public flags: CombatAbilityFlag = CombatAbilityFlag.MoveAway;
    public name: string = "MoveAway";
    public reasonCannotUse: string = "";
    public actions: ICombatAction[] = [];

    private climb = new Climb();
    private release = new Release();
    private run = new Run();

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, target?: Character): boolean {
        if (target) {
            if (this.climb.canUse(character, target)) {
                this.name = this.climb.name;
            }
            else if (this.release.canUse(character, target)) {
                this.name = this.release.name;
            }
        }
        else {
            this.name = this.run.name;
        }
        return true;
    }

    public use(character: Character, target: Character): void | NextScreenChoices {
        if (this.climb.canUse(character, target)) {
            return this.climb.use(character, target);
        }
        else if (this.release.canUse(character, target)) {
            return this.release.use(character, target);
        }
        else {
            return this.run.use(character, target);
        }
    }
}
