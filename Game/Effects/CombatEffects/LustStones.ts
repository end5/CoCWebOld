import { Character } from '../../Character/Character';
import { CombatEffect } from '../CombatEffect';
import { CombatEffectType } from '../CombatEffectType';
import { CView } from '../../../Engine/Display/ContentView';

export class LustStones extends CombatEffect {
    public update(character: Character) {
        character.stats.lust += character.combat.effects.get(CombatEffectType.LustStones)!.value1 + 4;
        // [When witches activate the stones for goo bodies]
        if (character.body.legs.isGoo()) {
            CView.text("<b>The stones start vibrating again, making your liquid body ripple with pleasure.  The witches snicker at the odd sight you are right now.</b>");
        }
        // [When witches activate the stones for solid bodies]
        else {
            CView.text("<b>The smooth stones start vibrating again, sending another wave of teasing bliss throughout your body.  The witches snicker at you as you try to withstand their attack.</b>");
        }
        CView.text("\n\n");
    }
}
