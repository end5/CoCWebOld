import { Character } from '../../Character/Character';
import { CombatEffect } from '../CombatEffect';
import { CView } from '../../../Engine/Display/ContentView';

export class HolliConstrict extends CombatEffect {
    public update(character: Character) {
        CView.text("<b>You're tangled up in Holli's verdant limbs!  All you can do is try to struggle free...</b>");
        CView.text("\n\n");
    }
}
