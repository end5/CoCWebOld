import { Character } from '../../Character/Character';
import { CombatEffect } from '../CombatEffect';
import { CView } from '../../../Engine/Display/ContentView';

export class UBERWEB extends CombatEffect {
    public update(character: Character) {
        CView.text("<b>You're pinned under a pile of webbing!  You should probably struggle out of it and get back in the fight!</b>");
        CView.text("\n\n");
    }
}
