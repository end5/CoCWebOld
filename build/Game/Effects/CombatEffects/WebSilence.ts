import DisplayText from '../../../Engine/display/DisplayText';
import { randInt } from '../../../Engine/Utilities/SMath';
import Character from '../../Character/Character';
import CombatEffect from '../CombatEffect';
import { CombatEffectType } from '../CombatEffectType';

export class WebSilence extends CombatEffect {
    public update(character: Character) {
        if (character.combat.effects.get(CombatEffectType.WebSilence).value1 >= 2 || randInt(20) + 1 + character.stats.str / 10 >= 15) {
            character.combat.effects.remove(CombatEffectType.WebSilence);
            DisplayText("You rip off the webbing that covers your mouth with a cry of pain, finally able to breathe normally again!  Now you can cast spells!");
            DisplayText("\n\n");
        }
        else {
            character.combat.effects.get(CombatEffectType.WebSilence).value1++;
            DisplayText("Your mouth and nose are obstructed by sticky webbing, making it difficult to breathe and impossible to focus on casting spells.  You try to pull it off, but it just won't work!").bold();
            DisplayText("\n\n");
        }
    }
}
