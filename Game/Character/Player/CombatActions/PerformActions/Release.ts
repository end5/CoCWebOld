import { ICombatAction } from '../../../../Combat/Actions/ICombatAction';
import { CombatEffectType } from '../../../../Effects/CombatEffectType';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Character } from '../../../Character';
import { StatusEffectType } from '../../../../Effects/StatusEffectType';
import { CView } from '../../../../../Engine/Display/ContentView';
import { CombatAbilityFlag } from '../../../../Effects/CombatAbilityFlag';

export class Release implements ICombatAction {
    public flags: CombatAbilityFlag = CombatAbilityFlag.MoveAway;
    public name: string = "Release";
    public reasonCannotUse: string = "";
    public actions: ICombatAction[] = [];

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, target?: Character): boolean {
        return !!target && target.combat.effects.has(CombatEffectType.Constricted);
    }

    public use(character: Character, target: Character): void | NextScreenChoices {
        CView.clear();
        CView.text("You release " + target.desc.a + target.desc.short + " from " + target.desc.possessivePronoun + " bonds, and " + target.desc.subjectivePronoun + " drops to the ground, catching " + target.desc.possessivePronoun + " breath before " + target.desc.subjectivePronoun + " stands back up, apparently prepared to fight some more.");
        CView.text("\n\n");
        target.effects.remove(StatusEffectType.Constricted);
    }
}
