import { DisplayText } from '../../../../../Engine/display/DisplayText';
import { CombatAction } from '../../../../Combat/Actions/CombatAction';
import { StatusAffectType } from '../../../../Effects/StatusAffectType';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Character } from '../../../Character';

export class Recover implements CombatAction {
    public name: string = "Recover";
    public reasonCannotUse: string = "";

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, target?: Character): boolean {
        return character.statusAffects.has(StatusAffectType.IsabellaStunned) ||
            character.statusAffects.has(StatusAffectType.Stunned) ||
            character.statusAffects.has(StatusAffectType.Whispered) ||
            character.statusAffects.has(StatusAffectType.Confusion);
    }

    public use(character: Character, target: Character): NextScreenChoices {
        if (character.statusAffects.has(StatusAffectType.IsabellaStunned) || character.statusAffects.has(StatusAffectType.Stunned)) {
            DisplayText("\n<b>You're too stunned to attack!</b>  All you can do is wait and try to recover!");
            // MainScreen.getBottomButton(0).modify("Recover", wait);
        }
        else if (character.statusAffects.has(StatusAffectType.Whispered)) {
            DisplayText("\n<b>Your mind is too addled to focus on combat!</b>  All you can do is try and recover!");
            // MainScreen.getBottomButton(0).modify("Recover", wait);
        }
        else if (character.statusAffects.has(StatusAffectType.Confusion)) {
            DisplayText("\nYou're too confused about who you are to try to attack!");
            // MainScreen.getBottomButton(0).modify("Recover", wait);
        }
        return;
    }
}
