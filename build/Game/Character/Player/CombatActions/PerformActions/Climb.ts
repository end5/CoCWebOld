import CombatAction from '../../../../Combat/Actions/CombatAction';
import { CombatEffectType } from '../../../../Effects/CombatEffectType';
import Character from '../../../Character';

export default class Climb implements CombatAction {
    public name: string = "Climb";
    public reasonCannotUse: string = "";

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, monster: Character): boolean {
        return monster.combat.effects.has(CombatEffectType.Level);
    }

    public use(character: Character, monster: Character) {
        // if (monster.combat.effects.has(CombatEffectType.Level)) {
        //     (monster as Sandtrap).sandTrapWait();
        // }
    }
}
