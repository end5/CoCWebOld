import Character from '../../../Character/Character';
import CombatAction from '../../../Combat/Actions/CombatAction';
import DisplayText from '../../../display/DisplayText';
import { StatusAffectType } from '../../../Effects/StatusAffectType';
import { Utils } from '../../../Utilities/Utils';

export class ImmolationSpell implements CombatAction {
    public name: string = "Immolation";
    public reasonCannotUse: string = "";

    public isPossible(character: Character): boolean {
        return character.statusAffects.has(StatusAffectType.ImmolationSpell);
    }

    public canUse(character: Character): boolean {
        return character.statusAffects.has(StatusAffectType.ImmolationSpell);
    }

    public use(character: Character, monster: Character) {
        DisplayText().clear();
        DisplayText("You gather energy in your Talisman and unleash the spell contained within.  A wave of burning flames gathers around " + monster.desc.a+ monster.desc.short + ", slowly burning " + monster.desc.objectivePronoun + ".");
        let damage: number = Math.floor(75 + (character.stats.int / 3 + Utils.rand(character.stats.int / 2)) * character.combat.stats.spellMod());
        damage = monster.combat.stats.loseHP(damage, character);
        DisplayText(" (" + damage + ")\n\n");
        character.statusAffects.remove(StatusAffectType.ImmolationSpell);
        arianScene.clearTalisman();
    }
}
