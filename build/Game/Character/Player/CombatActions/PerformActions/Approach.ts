import DisplayText from '../../../../../Engine/display/DisplayText';
import MainScreen from '../../../../../Engine/Display/MainScreen';
import CombatAction from '../../../../Combat/Actions/CombatAction';
import CombatManager from '../../../../Combat/CombatManager';
import { CombatEffectType } from '../../../../Effects/CombatEffectType';
import Character from '../../../Character';

export class Approach implements CombatAction {
    public name: string = "Approach";
    public reasonCannotUse: string = "";

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, target?: Character): boolean {
        return character.combat.effects.has(CombatEffectType.KnockedBack);
    }

    public use(character: Character, target: Character) {
        DisplayText().clear();
        DisplayText("You close the distance between you and " + target.desc.a + target.desc.short + " as quickly as possible.\n\n");
        character.combat.effects.remove(CombatEffectType.KnockedBack);
        MainScreen.doNext(CombatManager.nextRound);
    }
}
