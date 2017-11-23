import Character from '../../../Character/Character';
import DisplayText from '../../../display/DisplayText';
import { PerkType } from '../../../Effects/PerkType';
import StatusAffectFactory from '../../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../../Effects/StatusAffectType';
import Player from '../../Player';
import PlayerCombatAction from '../PlayerCombatAction';

export class ShieldingSpell implements PlayerCombatAction {
    public isPossible(player: Player): boolean {
        return player.statusAffects.has(StatusAffectType.ShieldingSpell);
    }

    public canUse(player: Player): boolean {
        return player.statusAffects.has(StatusAffectType.ShieldingSpell);
    }

    public reasonCannotUse(): string {
        return "";
    }

    public use(player: Player, monster: Character) {
        DisplayText.clear();
        DisplayText.text("You gather energy in your Talisman and unleash the spell contained within.  A barrier of light engulfs you, before turning completely transparent.  Your defense has been increased.\n\n");
        player.statusAffects.add(StatusAffectFactory.create(StatusAffectType.Shielding, 0, 0, 0, 0));
        player.statusAffects.remove(StatusAffectType.ShieldingSpell);
        arianScene.clearTalisman();
    }
}