import { DisplayText } from '../../../Engine/display/DisplayText';
import { randInt } from '../../../Engine/Utilities/SMath';
import { Character } from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import { CombatEffect } from '../CombatEffect';
import { CombatEffectType } from '../CombatEffectType';

export class IzmaBleed extends CombatEffect {
    public update(character: Character, enemy: Character) {
        if (character.charType === CharacterType.Player) {
            if (character.combat.effects.get(CombatEffectType.IzmaBleed).value1 <= 0) {
                character.combat.effects.remove(CombatEffectType.IzmaBleed);
                DisplayText("You sigh with relief; your bleeding has slowed considerably.").bold();
            }
            // Bleed effect:
            else {
                let bleed: number = (2 + randInt(4)) / 100;
                bleed *= character.combat.stats.HP();
                bleed = character.combat.stats.loseHP(bleed, undefined);
                DisplayText("You gasp and wince in pain, feeling fresh blood pump from your wounds. (" + bleed + ")").bold();
            }
        }
        else { // Bleed on Monster
            // Countdown to heal
            character.combat.effects.get(CombatEffectType.IzmaBleed).value1 -= 1;
            // Heal wounds
            if (character.combat.effects.get(CombatEffectType.IzmaBleed).value1 <= 0) {
                character.combat.effects.remove(CombatEffectType.IzmaBleed);
                DisplayText("The wounds you left on " + character.desc.a + character.desc.short + " stop bleeding so profusely.");
            }
            // Deal damage if still wounded.
            else {
                const hpLoss: number = enemy.combat.stats.loseHP(character.stats.maxHP() * (3 + randInt(4)) / 100, undefined);
                if (character.desc.plural)
                    DisplayText(character.desc.capitalA + character.desc.short + " bleed profusely from the jagged wounds your weapon left behind. (" + hpLoss + ")");
                else
                    DisplayText(character.desc.capitalA + character.desc.short + " bleeds profusely from the jagged wounds your weapon left behind. (" + hpLoss + ")");
            }
        }
        DisplayText("\n\n");
    }
}
