import { DisplayText } from '../../../../../Engine/display/DisplayText';
import { CombatAction } from '../../../../Combat/Actions/CombatAction';
import { StatusEffectType } from '../../../../Effects/StatusEffectType';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Character } from '../../../Character';
import { Player } from '../../Player';

export class ShieldingSpell implements CombatAction {
    public name: string = "Shielding";
    public reasonCannotUse: string = "";

    public isPossible(player: Player): boolean {
        return player.statusAffects.has(StatusEffectType.ShieldingSpell);
    }

    public canUse(player: Player): boolean {
        return player.statusAffects.has(StatusEffectType.ShieldingSpell);
    }

    public use(player: Player, monster: Character): NextScreenChoices {
        DisplayText().clear();
        DisplayText("You gather energy in your Talisman and unleash the spell contained within.  A barrier of light engulfs you, before turning completely transparent.  Your defense has been increased.\n\n");
        player.statusAffects.add(StatusEffectType.Shielding, 0, 0, 0, 0);
        player.statusAffects.remove(StatusEffectType.ShieldingSpell);
        // Scenes.arianScene.clearTalisman();
        return;
    }
}
