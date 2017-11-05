import Creature from '../../Body/Creature';
import Character from '../../Character/Character';
import Player from '../../Player';
import CombatAction from '../CombatAction';

export default interface PlayerCombatAction extends CombatAction {
    canUse(player: Player, monster: Character): boolean;
    reasonCannotUse(): string;
    use(player: Player, monster: Character);    
}

export function hasSpells(player: Player): boolean {
    return spellCount(player) > 0;
}

export function spellCount(player: Player): number {
    return ["KnowsArouse", "KnowsHeal", "KnowsMight", "KnowsCharge", "KnowsBlind", "KnowsWhitefire"]
        .filter((name: string) => {
            return player.statusAffects.has(name);
        })
        .length;
}
