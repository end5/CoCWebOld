import { Character } from '../../Character/Character';
import { CombatEffect } from '../CombatEffect';
import { CView } from '../../../Engine/Display/ContentView';

export class BasiliskCompulsion extends CombatEffect {
    public update(character: Character) {
        // Basilisk.basiliskSpeed(character, 15);
        // Continuing effect text:
        CView.text("<b>You still feel the spell of those grey eyes, making your movements slow and difficult, the remembered words tempting you to look into its eyes again. You need to finish this fight as fast as your heavy limbs will allow.</b>");
        CView.text("\n\n");
    }
}
