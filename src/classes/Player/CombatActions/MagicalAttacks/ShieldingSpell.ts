import Character from '../../../Character/Character';
import DisplayText from '../../../display/DisplayText';
import StatusAffectFactory from '../../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../../Effects/StatusAffectType';
import Player from '../../../Player/Player';
import PlayerCombatAction from '../Player/PlayerCombatAction';

export default class ShieldingSpell implements PlayerCombatAction {
    public isPossible(player: Player): boolean {
        return player.perks.has("ShieldingSpell");
    }

    public canUse(player: Player): boolean {
        return player.statusAffects.has("ShieldingSpell");
    }

    public reasonCannotUse(): string {
        return "";
    }

    public use(player: Player, monster: Character) {
        DisplayText.clear();
        DisplayText.text("You gather energy in your Talisman and unleash the spell contained within.  A barrier of light engulfs you, before turning completely transparent.  Your defense has been increased.\n\n");
        player.statusAffects.add(StatusAffectFactory.create(StatusAffectType.Shielding, 0, 0, 0, 0));
        player.statusAffects.remove("ShieldingSpell");
        arianScene.clearTalisman();
    }
}