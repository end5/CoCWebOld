import { Character } from '../../Character/Character';
import { CombatActionFlags } from '../../Effects/CombatActionFlag';

export interface ICombatAction {
    name: string;
    flag: CombatActionFlags;
    reasonCannotUse: string;
    subActions: (ICombatAction)[];
    isPossible(character: Character): boolean;
    canUse(character: Character, target: Character): boolean;
    use(character: Character, target: Character): void;
}
}
