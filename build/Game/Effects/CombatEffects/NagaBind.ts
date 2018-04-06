import DisplayText from '../../../Engine/display/DisplayText';
import Character from '../../Character/Character';
import PlayerFlags from '../../Character/Player/PlayerFlags';
import User from '../../User';
import CombatEffect from '../CombatEffect';

export class NagaBind extends CombatEffect {
    public update(character: Character) {
        if ((User.flags.get("Player") as PlayerFlags).FETISH >= 2) {
            character.stats.lust += 5;
            DisplayText("Coiled tightly by the naga and utterly immobilized, you can't help but become aroused thanks to your bondage fetish.");
            DisplayText("\n\n");
        }
    }
}
