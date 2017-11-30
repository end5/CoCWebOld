import Character from '../../../Character/Character';
import CombatAction from '../../../Combat/Actions/CombatAction';
import DisplayText from '../../../display/DisplayText';
import { PerkType } from '../../../Effects/PerkType';
import { StatusAffectType } from '../../../Effects/StatusAffectType';
import Utils from '../../../Utilities/Utils';
import Player from '../../Player';

export class ImmolationSpell implements CombatAction {
    public name: string = "Immolation";
    public reasonCannotUse: string = "";

    public isPossible(player: Player): boolean {
        return player.statusAffects.has(StatusAffectType.ImmolationSpell);
    }

    public canUse(player: Player): boolean {
        return player.statusAffects.has(StatusAffectType.ImmolationSpell);
    }
    
    public use(player: Player, monster: Character) {
        DisplayText.clear();
        DisplayText.text("You gather energy in your Talisman and unleash the spell contained within.  A wave of burning flames gathers around " + monster.desc.a+ monster.desc.short + ", slowly burning " + monster.desc.objectivePronoun + ".");
        let damage: number = Math.floor(75 + (player.stats.int / 3 + Utils.rand(player.stats.int / 2)) * player.combat.stats.spellMod());
        damage = monster.combat.stats.loseHP(damage, player);
        DisplayText.text(" (" + damage + ")\n\n");
        player.statusAffects.remove(StatusAffectType.ImmolationSpell);
        arianScene.clearTalisman();
    }
}
