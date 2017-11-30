import Character from '../../../Character/Character';
import CombatAction from '../../../Combat/Actions/CombatAction';
import { CombatAbilityFlag } from '../../../Effects/CombatAbilityFlag';
import MagicalActionLib from '../ActionLibs/MagicalActionLib';

export default class MagicalSpecials implements CombatAction {
    private static magicalLib: MagicalActionLib;
    public constructor() {
        if (!MagicalSpecials.magicalLib)
            MagicalSpecials.magicalLib = new MagicalActionLib();
    }
    public name: string = "M. Specials";
    public reasonCannotUse: string = "";

    public isPossible(character: Character): boolean {
        return character.combat.effects.combatAbilityFlag & CombatAbilityFlag.PhysSpec ? true : false;
    }

    public canUse(character: Character, monster: Character): boolean {
        return true;
    }

    public use(character: Character, monster: Character) {
        MagicalSpecials.magicalLib.getPossibleActions(character);
    }
}