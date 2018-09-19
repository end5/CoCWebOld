import { DisplayText } from '../../../Engine/display/DisplayText';
import { Character } from '../../Character/Character';
import { CombatEffect } from '../CombatEffect';

export class NagaBind extends CombatEffect {
    public update(character: Character) {
        if (playerFlags.FETISH >= 2) {
            character.stats.lust += 5;
            DisplayText("Coiled tightly by the naga and utterly immobilized, you can't help but become aroused thanks to your bondage fetish.");
            DisplayText("\n\n");
        }
    }
}
