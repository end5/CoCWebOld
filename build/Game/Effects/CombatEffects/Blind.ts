import DisplayText from '../../../Engine/display/DisplayText';
import Character from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import CombatEffect from '../CombatEffect';
import { CombatEffectType } from '../CombatEffectType';

export class Blind extends CombatEffect {
    public update(character: Character, enemy: Character) {
        if (character.charType === CharacterType.Player) {
            if (character.combat.effects.has(CombatEffectType.Blind) && !enemy.combat.effects.has(CombatEffectType.Sandstorm)) {
                if (character.combat.effects.has(CombatEffectType.SheilaOil)) {
                    if (character.combat.effects.get(CombatEffectType.Blind).value1 <= 0) {
                        character.combat.effects.remove(CombatEffectType.Blind);
                        DisplayText("You finish wiping the demon's tainted oils away from your eyes; though the smell lingers, you can at least see.  Sheila actually seems happy to once again be under your gaze.").bold();
                    }
                    else {
                        character.combat.effects.get(CombatEffectType.Blind).value1--;
                        DisplayText("You scrub at the oily secretion with the back of your hand and wipe some of it away, but only smear the remainder out more thinly.  You can hear the demon giggling at your discomfort.").bold();
                    }
                }
                else {
                    // Remove blind if countdown to 0
                    if (character.combat.effects.get(CombatEffectType.Blind).value1 === 0) {
                        character.combat.effects.remove(CombatEffectType.Blind);
                        // Alert PC that blind is gone if no more stacks are there.
                        if (!character.combat.effects.has(CombatEffectType.Blind)) {
                            DisplayText("Your eyes have cleared and you are no longer blind!").bold();
                        }
                        else
                            DisplayText("You are blind, and many physical attacks will miss much more often.").bold();
                    }
                    else {
                        character.combat.effects.get(CombatEffectType.Blind).value1--;
                        DisplayText("You are blind, and many physical attacks will miss much more often.").bold();
                    }
                }
            }
        }
        else {
            character.combat.effects.get(CombatEffectType.Blind).value1 -= 1;
            if (character.combat.effects.get(CombatEffectType.Blind).value1 <= 0) {
                character.combat.effects.remove(CombatEffectType.Blind);
                DisplayText(character.desc.capitalA + character.desc.short + (character.desc.plural ? " are" : " is") + " no longer blind!").bold();
            }
            else
                DisplayText(character.desc.capitalA + character.desc.short + (character.desc.plural ? " are" : " is") + " currently blind!").bold();
        }
        DisplayText("\n\n");
    }
}
