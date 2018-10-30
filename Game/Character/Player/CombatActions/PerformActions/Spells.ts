import { ICombatAction } from '../../../../Combat/Actions/ICombatAction';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Character } from '../../../Character';
import { Arouse } from '../Spells/Arouse';
import { Blind } from '../Spells/Blind';
import { ChargeWeapon } from '../Spells/ChargeWeapon';
import { CleansingPalm } from '../Spells/CleansingPalm';
import { Heal } from '../Spells/Heal';
import { Might } from '../Spells/Might';
import { Whitefire } from '../Spells/Whitefire';
import { randomChoice } from '../../../../../Engine/Utilities/SMath';
import { CombatAbilityFlag } from '../../../../Effects/CombatAbilityFlag';

export class Spells implements ICombatAction {
    public flags: CombatAbilityFlag = CombatAbilityFlag.Spells;
    public name: string = "Spells";
    public reasonCannotUse: string = "";
    public actions: ICombatAction[] = [
        new Arouse(),
        new Blind(),
        new ChargeWeapon(),
        new CleansingPalm(),
        new Heal(),
        new Might(),
        new Whitefire(),
    ];

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, target: Character): boolean {
        return !!this.actions.find((action) => action.canUse(character, target));
    }

    public use(character: Character, target: Character): void | NextScreenChoices {
        return randomChoice(...this.actions).use(character, target);
        // return showActions(character, SpellActionLib.getPossibleActions(character));
    }
}
