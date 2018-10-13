import { randInt } from '../../../../../Engine/Utilities/SMath';
import { StatusEffectType } from '../../../../Effects/StatusEffectType';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Character } from '../../../Character';
import { ICombatAction } from '../../../../Combat/Actions/ICombatAction';
import { CView } from '../../../../../Engine/Display/ContentView';
import { CombatAbilityFlag } from '../../../../Effects/CombatAbilityFlag';

export class ImmolationSpell implements ICombatAction {
    public flags: CombatAbilityFlag = CombatAbilityFlag.MagicSpec;
    public name: string = "Immolation";
    public reasonCannotUse: string = "";
    public actions: ICombatAction[] = [];

    public isPossible(character: Character): boolean {
        return character.effects.has(StatusEffectType.ImmolationSpell);
    }

    public canUse(character: Character): boolean {
        return character.effects.has(StatusEffectType.ImmolationSpell);
    }

    public use(character: Character, monster: Character): void | NextScreenChoices {
        CView.clear();
        CView.text("You gather energy in your Talisman and unleash the spell contained within.  A wave of burning flames gathers around " + monster.desc.a + monster.desc.short + ", slowly burning " + monster.desc.objectivePronoun + ".");
        let damage: number = Math.floor(75 + (character.stats.int / 3 + randInt(character.stats.int / 2)) * character.combat.stats.spellMod());
        damage = monster.combat.stats.loseHP(damage, character);
        CView.text(" (" + damage + ")\n\n");
        character.effects.remove(StatusEffectType.ImmolationSpell);
        // Scenes.arianScene.clearTalisman();
    }
}
