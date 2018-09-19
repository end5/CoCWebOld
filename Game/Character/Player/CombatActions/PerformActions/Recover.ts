import { DisplayText } from '../../../../../Engine/display/DisplayText';
import { CombatAction } from '../../../../Combat/Actions/CombatAction';
import { StatusEffectType } from '../../../../Effects/StatusEffectType';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Character } from '../../../Character';

export class Recover implements CombatAction {
    public name: string = "Recover";
    public reasonCannotUse: string = "";

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, target?: Character): boolean {
        return character.statusAffects.has(StatusEffectType.IsabellaStunned) ||
            character.statusAffects.has(StatusEffectType.Stunned) ||
            character.statusAffects.has(StatusEffectType.Whispered) ||
            character.statusAffects.has(StatusEffectType.Confusion);
    }

    public use(character: Character, target: Character): NextScreenChoices {
        if (character.statusAffects.has(StatusEffectType.IsabellaStunned) || character.statusAffects.has(StatusEffectType.Stunned)) {
            DisplayText("\n<b>You're too stunned to attack!</b>  All you can do is wait and try to recover!");
            // MainScreen.getBottomButton(0).modify("Recover", wait);
        }
        else if (character.statusAffects.has(StatusEffectType.Whispered)) {
            DisplayText("\n<b>Your mind is too addled to focus on combat!</b>  All you can do is try and recover!");
            // MainScreen.getBottomButton(0).modify("Recover", wait);
        }
        else if (character.statusAffects.has(StatusEffectType.Confusion)) {
            DisplayText("\nYou're too confused about who you are to try to attack!");
            // MainScreen.getBottomButton(0).modify("Recover", wait);
        }
        return;
    }
}
