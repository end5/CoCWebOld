import Character from '../../../Character/Character';
import CombatAction from '../../../Combat/Actions/CombatAction';
import { CombatEffectType } from '../../../Effects/CombatEffectType';

export default class Release implements CombatAction {
    public name: string = "Release";
    public reasonCannotUse: string = "";

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, monster: Character): boolean {
        return monster.combat.effects.has(CombatEffectType.Constricted);
    }

    public use(character: Character, monster: Character) {
        desert.nagaScene.nagaLeggoMyEggo();
    }
}
