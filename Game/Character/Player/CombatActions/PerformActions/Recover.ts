import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Character } from '../../../Character';
import { ICombatAction } from '../../../../Combat/Actions/ICombatAction';
import { CView } from '../../../../../Engine/Display/ContentView';
import { CombatAbilityFlag } from '../../../../Effects/CombatAbilityFlag';
import { CombatEffectType } from '../../../../Effects/CombatEffectType';

export class Recover implements ICombatAction {
    public flags: CombatAbilityFlag = CombatAbilityFlag.MainAction;
    public name: string = "Recover";
    public reasonCannotUse: string = "";
    public actions: ICombatAction[] = [];

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, target: Character): boolean {
        return character.combat.effects.has(CombatEffectType.IsabellaStunned) ||
            character.combat.effects.has(CombatEffectType.Stunned) ||
            character.combat.effects.has(CombatEffectType.Whispered) ||
            character.combat.effects.has(CombatEffectType.Confusion);
    }

    public use(character: Character, target: Character): void | NextScreenChoices {
        if (character.combat.effects.has(CombatEffectType.IsabellaStunned) || character.combat.effects.has(CombatEffectType.Stunned)) {
            CView.text("\n<b>You're too stunned to attack!</b>  All you can do is wait and try to recover!");
            // MainScreen.getBottomButton(0).modify("Recover", wait);
        }
        else if (character.combat.effects.has(CombatEffectType.Whispered)) {
            CView.text("\n<b>Your mind is too addled to focus on combat!</b>  All you can do is try and recover!");
            // MainScreen.getBottomButton(0).modify("Recover", wait);
        }
        else if (character.combat.effects.has(CombatEffectType.Confusion)) {
            CView.text("\nYou're too confused about who you are to try to attack!");
            // MainScreen.getBottomButton(0).modify("Recover", wait);
        }
    }
}
