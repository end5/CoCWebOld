import { DisplayText } from '../../../Engine/display/DisplayText';
import { Character } from '../../Character/Character';
import { CombatEffect } from '../CombatEffect';

export class HolliConstrict extends CombatEffect {
    public update(character: Character) {
        DisplayText("You're tangled up in Holli's verdant limbs!  All you can do is try to struggle free...").bold();
        DisplayText("\n\n");
    }
}
