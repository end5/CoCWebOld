import Character from '../../../Character/Character';
import CombatAction from '../../../Combat/Actions/CombatAction';
import { CombatAbilityFlag } from '../../../Effects/CombatAbilityFlag';
import PhysicalActionLib from '../ActionLibs/PhysicalActionLib';

export default class PhysicalSpecials implements CombatAction {
    private static physicalLib: PhysicalActionLib;
    public constructor() {
        if (!PhysicalSpecials.physicalLib)
            PhysicalSpecials.physicalLib = new PhysicalActionLib();
    }

    public name: string = "P. Special";
    public reasonCannotUse: string = "";

    public isPossible(character: Character): boolean {
        return character.combat.effects.combatAbilityFlag & CombatAbilityFlag.PhysSpec ? true : false;
    }

    public canUse(character: Character, monster: Character): boolean {
        return true;
    }

    public use(character: Character, monster: Character) {
        PhysicalSpecials.physicalLib.getPossibleActions(character);
    }
}