import Character from '../../../Character/Character';
import DisplayText from '../../../display/DisplayText';
import Player from '../../../Player/Player';
import Utils from '../../../Utilities/Utils';
import PlayerCombatAction from '../Player/PlayerCombatAction';

export default class ImmolationSpell implements PlayerCombatAction {
    public isPossible(player: Player): boolean {
        return player.perks.has("ImmolationSpell");
    }

    public canUse(player: Player): boolean {
        return player.statusAffects.has("ImmolationSpell");
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
        player.statusAffects.remove("ImmolationSpell");
        arianScene.clearTalisman();
    }
}
