import { Character } from '../../Character/Character';
import { CombatEffect } from '../CombatEffect';
import { PlayerFlags } from '../../Character/Player/PlayerFlags';
import { CView } from '../../../Engine/Display/ContentView';

export class NagaBind extends CombatEffect {
    public update(character: Character) {
        if (PlayerFlags.FETISH >= 2) {
            character.stats.lust += 5;
            CView.text("Coiled tightly by the naga and utterly immobilized, you can't help but become aroused thanks to your bondage fetish.");
            CView.text("\n\n");
        }
    }
}
