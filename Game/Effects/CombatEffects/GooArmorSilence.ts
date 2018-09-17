import { DisplayText } from '../../../Engine/display/DisplayText';
import { randInt } from '../../../Engine/Utilities/SMath';
import { Character } from '../../Character/Character';
import { CombatEffect } from '../CombatEffect';
import { CombatEffectType } from '../CombatEffectType';

export class GooArmorSilence extends CombatEffect {
    public update(character: Character) {
        if (character.combat.effects.get(CombatEffectType.GooArmorSilence).value1 >= 2 || randInt(20) + 1 + character.stats.str / 10 >= 15) {
            // if passing str check, output at beginning of turn
            character.combat.effects.remove(CombatEffectType.GooArmorSilence);
            DisplayText("The sticky slop covering your mouth pulls away reluctantly, taking more force than you would expect, but you've managed to free your mouth enough to speak!").bold();
        }
        else {
            character.combat.effects.get(CombatEffectType.GooArmorSilence).value1++;
            DisplayText("Your mouth is obstructed by sticky goo!  You are silenced!").bold();
        }
        DisplayText("\n\n");
    }
}
