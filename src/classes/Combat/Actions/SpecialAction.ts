import Creature from '../Body/Creature';
import Monster from '../Monster';
import Player from '../Player';

export default interface SpecialAction {
    canUse(player: Player, monster: Monster): boolean;
    reasonCannotUse(): string;
    use(player: Player, monster: Monster);
}



export function hasSpells(creature: Creature): boolean {
    return spellCount(creature) > 0;
}

export function spellCount(creature: Creature): number {
    return ["KnowsArouse", "KnowsHeal", "KnowsMight", "KnowsCharge", "KnowsBlind", "KnowsWhitefire"]
        .filter((name: string) => {
            return creature.statusAffects.has(name);
        })
        .length;
}

