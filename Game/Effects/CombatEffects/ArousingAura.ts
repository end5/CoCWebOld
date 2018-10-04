import { randInt } from '../../../Engine/Utilities/SMath';
import { Character } from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import { CombatEffect } from '../CombatEffect';
import { CView } from '../../../Engine/Display/ContentView';

export class ArousingAura extends CombatEffect {
    public update(character: Character, enemy: Character) {
        if (this.inflictedBy.charType === CharacterType.Player && (enemy.stats.lustVuln > 0 && character.stats.cor >= 70)) {
            enemy.stats.lust += enemy.stats.lustVuln * (2 + randInt(4));
            if (enemy.stats.lust < 50)
                CView.text("Your aura seeps into " + enemy.desc.a + enemy.desc.short + " but does not have any visible effects just yet.\n\n");
            else if (enemy.stats.lust < 60) {
                if (!enemy.desc.plural)
                    CView.text(enemy.desc.capitalA + enemy.desc.short + " starts to squirm a little from your unholy presence.\n\n");
                else
                    CView.text(enemy.desc.capitalA + enemy.desc.short + " start to squirm a little from your unholy presence.\n\n");
            }
            else if (enemy.stats.lust < 75)
                CView.text("Your arousing aura seems to be visibly affecting " + enemy.desc.a + enemy.desc.short + ", making " + enemy.desc.objectivePronoun + " squirm uncomfortably.\n\n");
            else if (enemy.stats.lust < 85) {
                if (!enemy.desc.plural)
                    CView.text(enemy.desc.capitalA + enemy.desc.short + "'s skin colors red as " + enemy.desc.subjectivePronoun + " inadvertantly basks in your presence.\n\n");
                else
                    CView.text(enemy.desc.capitalA + enemy.desc.short + "' skin colors red as " + enemy.desc.subjectivePronoun + " inadvertantly bask in your presence.\n\n");
            }
            else {
                if (!enemy.desc.plural)
                    CView.text("The effects of your aura are quite pronounced on " + enemy.desc.a + enemy.desc.short + " as " + enemy.desc.subjectivePronoun + " begins to shake and steal glances at your body.\n\n");
                else
                    CView.text("The effects of your aura are quite pronounced on " + enemy.desc.a + enemy.desc.short + " as " + enemy.desc.subjectivePronoun + " begin to shake and steal glances at your body.\n\n");
            }
            CView.text("\n\n");
        }
    }
}
