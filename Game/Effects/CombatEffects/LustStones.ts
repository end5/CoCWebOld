import { DisplayText } from '../../../Engine/display/DisplayText';
import { Character } from '../../Character/Character';
import { CombatEffect } from '../CombatEffect';
import { CombatEffectType } from '../CombatEffectType';

export class LustStones extends CombatEffect {
    public update(character: Character) {
        character.stats.lust += character.combat.effects.get(CombatEffectType.LustStones).value1 + 4;
        // [When witches activate the stones for goo bodies]
        if (character.body.legs.isGoo()) {
            DisplayText("The stones start vibrating again, making your liquid body ripple with pleasure.  The witches snicker at the odd sight you are right now.").bold();
        }
        // [When witches activate the stones for solid bodies]
        else {
            DisplayText("The smooth stones start vibrating again, sending another wave of teasing bliss throughout your body.  The witches snicker at you as you try to withstand their attack.").bold();
        }
        DisplayText("\n\n");
    }
}
