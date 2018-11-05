import { StatusEffectType } from '../../../../Effects/StatusEffectType';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Character } from '../../../Character';
import { ICombatAction } from '../../../../Combat/Actions/ICombatAction';
import { CView } from '../../../../../Page/ContentView';
import { CombatActionFlags } from '../../../../Effects/CombatActionFlag';
import { CombatEffectType } from '../../../../Effects/CombatEffectType';

export class ShieldingSpell implements ICombatAction {
    public flag: CombatActionFlags = CombatActionFlags.MagicSpec;
    public name: string = "Shielding";
    public reasonCannotUse: string = "";
    public subActions: ICombatAction[] = [];

    public isPossible(character: Character): boolean {
        return character.effects.has(StatusEffectType.ShieldingSpell);
    }

    public canUse(character: Character): boolean {
        return character.effects.has(StatusEffectType.ShieldingSpell);
    }

    public use(character: Character, monster: Character): void | NextScreenChoices {
        CView.clear();
        CView.text("You gather energy in your Talisman and unleash the spell contained within.  A barrier of light engulfs you, before turning completely transparent.  Your defense has been increased.\n\n");
        character.combat.effects.add(CombatEffectType.Shielding, character);
        character.effects.remove(StatusEffectType.ShieldingSpell);
    }
}
