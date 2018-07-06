import { CombatAction } from '../../../../Combat/Actions/CombatAction';
import { CombatEffectType } from '../../../../Effects/CombatEffectType';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Character } from '../../../Character';
import { DisplayText } from '../../../../../Engine/display/DisplayText';
import { StatusAffectType } from '../../../../Effects/StatusAffectType';

export class Release implements CombatAction {
    public name: string = "Release";
    public reasonCannotUse: string = "";

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, target?: Character): boolean {
        return !!target && target.combat.effects.has(CombatEffectType.Constricted);
    }

    public use(character: Character, target: Character): NextScreenChoices {
        DisplayText().clear();
        DisplayText("You release " + target.desc.a + target.desc.short + " from " + target.desc.possessivePronoun + " bonds, and " + target.desc.subjectivePronoun + " drops to the ground, catching " + target.desc.possessivePronoun + " breath before " + target.desc.subjectivePronoun + " stands back up, apparently prepared to fight some more.");
        DisplayText("\n\n");
        target.statusAffects.remove(StatusAffectType.Constricted);
        return;
    }
}
