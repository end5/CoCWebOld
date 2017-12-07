import Character from '../../Character/Character';
import DisplayText from '../../display/DisplayText';
import CombatEffect from '../CombatEffect';
import { CombatEffectType } from '../CombatEffectType';

export class LustStones extends CombatEffect {
    public update(character: Character) {
        character.stats.lust += character.combat.effects.get(CombatEffectType.LustStones).value1 + 4;
        //[When witches activate the stones for goo bodies]
        if (character.lowerBody.isGoo()) {
            DisplayText.bold("The stones start vibrating again, making your liquid body ripple with pleasure.  The witches snicker at the odd sight you are right now.");
        }
        //[When witches activate the stones for solid bodies]
        else {
            DisplayText.bold("The smooth stones start vibrating again, sending another wave of teasing bliss throughout your body.  The witches snicker at you as you try to withstand their attack.");
        }
        DisplayText.newParagraph();
    }
}