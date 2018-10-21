import { randInt } from '../../../Engine/Utilities/SMath';
import { Character } from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import { CombatEffect } from '../CombatEffect';
import { CombatEffectType } from '../CombatEffectType';
import { CView } from '../../../Engine/Display/ContentView';

export class IzmaBleed extends CombatEffect {
    public update(character: Character, enemy: Character) {
        const izmaBleedEffect = character.combat.effects.get(CombatEffectType.IzmaBleed)!;
        if (character.charType === CharacterType.Player) {
            if (izmaBleedEffect.value1 <= 0) {
                character.combat.effects.remove(CombatEffectType.IzmaBleed);
                CView.text("<b>You sigh with relief; your bleeding has slowed considerably.</b>");
            }
            // Bleed effect:
            else {
                let bleed: number = (2 + randInt(4)) / 100;
                bleed *= character.combat.stats.HP();
                bleed = character.combat.stats.loseHP(bleed, this.inflictedBy);
                CView.text("<b>You gasp and wince in pain, feeling fresh blood pump from your wounds. (" + bleed + ")</b>");
            }
        }
        else { // Bleed on Monster
            // Countdown to heal
            izmaBleedEffect.value1 -= 1;
            // Heal wounds
            if (izmaBleedEffect.value1 <= 0) {
                character.combat.effects.remove(CombatEffectType.IzmaBleed);
                CView.text("The wounds you left on " + character.desc.a + character.desc.short + " stop bleeding so profusely.");
            }
            // Deal damage if still wounded.
            else {
                const hpLoss: number = enemy.combat.stats.loseHP(character.stats.maxHP() * (3 + randInt(4)) / 100, character);
                if (character.desc.plural)
                    CView.text(character.desc.capitalA + character.desc.short + " bleed profusely from the jagged wounds your weapon left behind. (" + hpLoss + ")");
                else
                    CView.text(character.desc.capitalA + character.desc.short + " bleeds profusely from the jagged wounds your weapon left behind. (" + hpLoss + ")");
            }
        }
        CView.text("\n\n");
    }
}
