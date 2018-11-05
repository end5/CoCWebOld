import { CombatEffectType } from '../../../../Effects/CombatEffectType';
import { Character } from '../../../Character';
import { ICombatAction } from '../../../../Combat/Actions/ICombatAction';
import { CView } from '../../../../../Page/ContentView';
import { CombatActionFlags } from '../../../../Effects/CombatActionFlag';

export class Approach implements ICombatAction {
    public flag: CombatActionFlags = CombatActionFlags.Attack;
    public name: string = "Approach";
    public reasonCannotUse: string = "";
    public subActions: ICombatAction[] = [];

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, target: Character): boolean {
        return character.combat.effects.has(CombatEffectType.KnockedBack);
    }

    public use(character: Character, target: Character): void {
        CView.clear();
        CView.text("You close the distance between you and " + target.desc.a + target.desc.short + " as quickly as possible.\n\n");
        character.combat.effects.remove(CombatEffectType.KnockedBack);
    }
}
