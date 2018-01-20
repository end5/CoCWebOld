import Character from '../../../Character/Character';
import CombatAction from '../../../Combat/Actions/CombatAction';
import { CombatAbilityFlag } from '../../../Effects/CombatAbilityFlag';
import { StatusAffectType } from '../../../Effects/StatusAffectType';
import Player from '../../Player';
import SpellActionLib from '../ActionLibs/SpellActionLib';

export default class Spells implements CombatAction {
    private static spellsLib: SpellActionLib;
    public constructor() {
        if (!Spells.spellsLib)
            Spells.spellsLib = new SpellActionLib();
    }

    public name: string = "Spells";
    public reasonCannotUse: string = "";

    public isPossible(character: Character): boolean {
        return character.combat.effects.combatAbilityFlag & CombatAbilityFlag.Spells ? true : false;
    }

    public canUse(character: Character, monster: Character): boolean {
        return true;
    }

    public use(character: Character, monster: Character) {
        Spells.spellsLib.getPossibleActions(character);
    }
}
