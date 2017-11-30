import Character from '../../Character/Character';
import DisplayText from '../../display/DisplayText';
import Utils from '../../Utilities/Utils';
import CombatEffect from '../CombatEffect';
import { CombatEffectType } from '../CombatEffectType';

export class GooArmorSilence extends CombatEffect {
    public update(character: Character) {
        if (character.combat.effects.get(CombatEffectType.GooArmorSilence).value1 >= 2 || Utils.rand(20) + 1 + character.stats.str / 10 >= 15) {
            //if passing str check, output at beginning of turn
            character.combat.effects.remove(CombatEffectType.GooArmorSilence);
            DisplayText.bold("The sticky slop covering your mouth pulls away reluctantly, taking more force than you would expect, but you've managed to free your mouth enough to speak!");
        }
        else {
            character.combat.effects.get(CombatEffectType.GooArmorSilence).value1++;
            DisplayText.bold("Your mouth is obstructed by sticky goo!  You are silenced!");
        }
        DisplayText.newParagraph();
    }
}
