import Creature from '../../Body/Creature';
import Character from '../../Character/Character';
import Player from '../../Player';

export default interface SpecialAction {
    canUse(player: Player, monster: Character): boolean;
    reasonCannotUse(): string;
    use(player: Player, monster: Character);
}

export function hasSpells(character: Character): boolean {
    return spellCount(character) > 0;
}

export function spellCount(character: Character): number {
    return ["KnowsArouse", "KnowsHeal", "KnowsMight", "KnowsCharge", "KnowsBlind", "KnowsWhitefire"]
        .filter((name: string) => {
            return character.statusAffects.has(name);
        })
        .length;
}

