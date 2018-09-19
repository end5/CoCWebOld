import { DisplayText } from '../../../../../Engine/display/DisplayText';
import { randInt } from '../../../../../Engine/Utilities/SMath';
import { CombatAction } from '../../../../Combat/Actions/CombatAction';
import { StatusEffectType } from '../../../../Effects/StatusEffectType';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Character } from '../../../Character';

export class ImmolationSpell implements CombatAction {
    public name: string = "Immolation";
    public reasonCannotUse: string = "";

    public isPossible(character: Character): boolean {
        return character.statusAffects.has(StatusEffectType.ImmolationSpell);
    }

    public canUse(character: Character): boolean {
        return character.statusAffects.has(StatusEffectType.ImmolationSpell);
    }

    public use(character: Character, monster: Character): NextScreenChoices {
        DisplayText().clear();
        DisplayText("You gather energy in your Talisman and unleash the spell contained within.  A wave of burning flames gathers around " + monster.desc.a + monster.desc.short + ", slowly burning " + monster.desc.objectivePronoun + ".");
        let damage: number = Math.floor(75 + (character.stats.int / 3 + randInt(character.stats.int / 2)) * character.combat.stats.spellMod());
        damage = monster.combat.stats.loseHP(damage, character);
        DisplayText(" (" + damage + ")\n\n");
        character.statusAffects.remove(StatusEffectType.ImmolationSpell);
        // Scenes.arianScene.clearTalisman();
        return;
    }
}
