import { Character } from '../../Character/Character';
import { NextScreenChoices } from '../../ScreenDisplay';
import { CombatAbilityFlag } from '../../Effects/CombatAbilityFlag';

export interface ICombatAction {
    name: string;
    flags: CombatAbilityFlag;
    reasonCannotUse: string;
    actions: (ICombatAction)[];
    isPossible(character: Character): boolean;
    canUse(character: Character, target: Character): boolean;
    use(character: Character, target: Character): void | NextScreenChoices;
}
