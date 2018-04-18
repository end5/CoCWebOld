import CombatAction from '../../../../Combat/Actions/CombatAction';
import { CombatAbilityFlag } from '../../../../Effects/CombatAbilityFlag';
import Character from '../../../Character';
import SpellActionLib from '../ActionLibs/SpellActionLib';

export class Spells implements CombatAction {
    public name: string = "Spells";
    public reasonCannotUse: string = "";

    public isPossible(character: Character): boolean {
        return character.combat.effects.combatAbilityFlag & CombatAbilityFlag.Spells ? true : false;
    }

    public canUse(character: Character, target?: Character): boolean {
        return SpellActionLib.getPossibleActions(character).length > 0;
    }

    public use(character: Character, target: Character) {
        SpellActionLib.getPossibleActions(character);
    }
}
