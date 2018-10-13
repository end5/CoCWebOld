import { StatusEffectType } from '../../../../Effects/StatusEffectType';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Character } from '../../../Character';
import { Player } from '../../Player';
import { ICombatAction } from '../../../../Combat/Actions/ICombatAction';
import { CView } from '../../../../../Engine/Display/ContentView';
import { CombatAbilityFlag } from '../../../../Effects/CombatAbilityFlag';

export class ShieldingSpell implements ICombatAction {
    public flags: CombatAbilityFlag = CombatAbilityFlag.MagicSpec;
    public name: string = "Shielding";
    public reasonCannotUse: string = "";
    public actions: ICombatAction[] = [];

    public isPossible(player: Player): boolean {
        return player.effects.has(StatusEffectType.ShieldingSpell);
    }

    public canUse(player: Player): boolean {
        return player.effects.has(StatusEffectType.ShieldingSpell);
    }

    public use(player: Player, monster: Character): void | NextScreenChoices {
        CView.clear();
        CView.text("You gather energy in your Talisman and unleash the spell contained within.  A barrier of light engulfs you, before turning completely transparent.  Your defense has been increased.\n\n");
        player.effects.add(StatusEffectType.Shielding, 0, 0, 0, 0);
        player.effects.remove(StatusEffectType.ShieldingSpell);
        // Scenes.arianScene.clearTalisman();
    }
}
