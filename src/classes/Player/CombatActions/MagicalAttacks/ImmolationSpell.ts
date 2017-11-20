import Character from '../../../Character/Character';
import DisplayText from '../../../display/DisplayText';
import { PerkType } from '../../../Effects/PerkType';
import { StatusAffectType } from '../../../Effects/StatusAffectType';
import Utils from '../../../Utilities/Utils';
import Player from '../../Player';
import PlayerCombatAction from '../PlayerCombatAction';

export class ImmolationSpell implements PlayerCombatAction {
    public isPossible(player: Player): boolean {
        return player.statusAffects.has(StatusAffectType.ImmolationSpell);
    }

    public canUse(player: Player): boolean {
        return player.statusAffects.has(StatusAffectType.ImmolationSpell);
    }

    public reasonCannotUse(): string {
        return "";
    }

    public use(player: Player, monster: Character) {
        DisplayText.clear();
        DisplayText.text("You gather energy in your Talisman and unleash the spell contained within.  A wave of burning flames gathers around " + monster.desc.a+ monster.desc.short + ", slowly burning " + monster.desc.objectivePronoun + ".");
        let damage: number = Math.floor(75 + (player.stats.int / 3 + Utils.rand(player.stats.int / 2)) * this.spellMod(player));
        damage = monster.combat.loseHP(damage, player);
        DisplayText.text(" (" + damage + ")\n\n");
        player.statusAffects.remove(StatusAffectType.ImmolationSpell);
        arianScene.clearTalisman();
    }
}
