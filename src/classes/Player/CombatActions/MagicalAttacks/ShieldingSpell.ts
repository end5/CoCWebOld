import Character from '../../../Character/Character';
import CombatAction from '../../../Combat/Actions/CombatAction';
import DisplayText from '../../../display/DisplayText';
import { PerkType } from '../../../Effects/PerkType';
import StatusAffectFactory from '../../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../../Effects/StatusAffectType';
import Player from '../../Player';

export class ShieldingSpell implements CombatAction {
    public name: string = "Shielding";
    public reasonCannotUse: string = "";

    public isPossible(player: Player): boolean {
        return player.statusAffects.has(StatusAffectType.ShieldingSpell);
    }

    public canUse(player: Player): boolean {
        return player.statusAffects.has(StatusAffectType.ShieldingSpell);
    }

    public use(player: Player, monster: Character) {
        DisplayText().clear();
        DisplayText("You gather energy in your Talisman and unleash the spell contained within.  A barrier of light engulfs you, before turning completely transparent.  Your defense has been increased.\n\n");
        player.statusAffects.set(StatusAffectType.Shielding, StatusAffectFactory.create(StatusAffectType.Shielding, 0, 0, 0, 0));
        player.statusAffects.remove(StatusAffectType.ShieldingSpell);
        arianScene.clearTalisman();
    }
}
