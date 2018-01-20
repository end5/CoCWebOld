import Character from '../../../Character/Character';
import CombatAction from '../../../Combat/Actions/CombatAction';
import DisplayText from '../../../display/DisplayText';
import { CombatEffectType } from '../../../Effects/CombatEffectType';

export default class Approach implements CombatAction {
    public name: string = "Approach";
    public reasonCannotUse: string = "";

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, monster: Character): boolean {
        return character.combat.effects.has(CombatEffectType.KnockedBack);
    }

    public use(character: Character, monster: Character) {
        DisplayText().clear();
        DisplayText("You close the distance between you and " + monster.desc.a + monster.desc.short + " as quickly as possible.\n\n");
        character.combat.effects.remove(CombatEffectType.KnockedBack);
    }
}
