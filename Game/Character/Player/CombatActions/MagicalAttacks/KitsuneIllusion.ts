import { randInt } from '../../../../../Engine/Utilities/SMath';
import { PerkType } from '../../../../Effects/PerkType';
import { StatusEffectType } from '../../../../Effects/StatusEffectType';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Character } from '../../../Character';
import { PlayerSpellAction } from '../PlayerSpellAction';
import { CView } from '../../../../../Engine/Display/ContentView';
import { CombatAbilityFlag } from '../../../../Effects/CombatAbilityFlag';

export class KitsuneIllusion extends PlayerSpellAction {
    public flags: CombatAbilityFlag = CombatAbilityFlag.MagicSpec;
    public name: string = "Illusion";
    public readonly baseCost: number = 25;

    public isPossible(character: Character): boolean {
        return character.perks.has(PerkType.EnlightenedNinetails);
    }

    public canUse(character: Character): boolean {
        if (!character.perks.has(PerkType.BloodMage) && character.stats.fatigue + this.spellCost(character) > 100) {
            this.reasonCannotUse = "You are too tired to use this ability.";
            return false;
        }
        if (character.effects.has(StatusEffectType.ThroatPunch) || character.effects.has(StatusEffectType.WebSilence)) {
            this.reasonCannotUse = "You cannot focus to use this ability while you're having so much difficult breathing.";
            return false;
        }
        return true;
    }

    public use(character: Character, monster: Character): void | NextScreenChoices {
        CView.clear();
        if (monster.desc.short === "pod" || monster.stats.int === 0) {
            CView.text("In the tight confines of this pod, there's no use making such an attack!\n\n");
            character.stats.fatigue++;
            return;
        }

        character.stats.fatigueMagic(this.baseCost);
        if (monster.effects.has(StatusEffectType.Shell)) {
            CView.text("As soon as your magic touches the multicolored shell around " + monster.desc.a + monster.desc.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            return;
        }
        // Decrease enemy speed and increase their susceptibility to lust attacks if already 110% or more
        CView.text("The world begins to twist and distort around you as reality bends to your will, " + monster.desc.a + monster.desc.short + "'s mind blanketed in the thick fog of your illusions.");
        // Check for success rate. Maximum 100% with over 90 Intelligence difference between PC and monster.
        if (character.stats.int / 10 + randInt(20) > monster.stats.int / 10 + 9) {
            // Reduce speed down to -20. Um, are there many monsters with 110% lust vulnerability?
            CView.text("  They stumble humorously to and fro, unable to keep pace with the shifting illusions that cloud their perceptions.\n\n");
            if (monster.stats.spe >= 0) monster.stats.spe -= 20;
            if (monster.stats.lustVuln >= 1.1) monster.stats.lustVuln += .1;
        }
        else
            CView.text("  Like the snapping of a rubber band, reality falls back into its rightful place as they resist your illusory conjurations.\n\n");
    }
}
