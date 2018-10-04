import { Character } from '../../Character/Character';
import { CombatEffect } from '../CombatEffect';
import { PlayerFlags } from '../../Character/Player/PlayerFlags';
import { CView } from '../../../Engine/Display/ContentView';

export class TentacleBind extends CombatEffect {
    public update(character: Character) {
        if (PlayerFlags.FETISH >= 2) {
            character.stats.lust += 3;
            CView.text("Wrapped tightly in the tentacles, you find it hard to resist becoming more and more aroused...");
            CView.text("\n\n");
        }
        CView.text("You are firmly trapped in the tentacle's coils.  ");
        CView.text("<b>The only thing you can try to do is struggle free!</b>");
        CView.text("\n\n");
    }
}
