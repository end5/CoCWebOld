import DisplayText from '../../../Engine/display/DisplayText';
import Character from '../../Character/Character';
import PlayerFlags from '../../Character/Player/PlayerFlags';
import User from '../../User';
import CombatEffect from '../CombatEffect';

export class TentacleBind extends CombatEffect {
    public update(character: Character) {
        if ((User.flags.get("Player") as PlayerFlags).FETISH >= 2) {
            character.stats.lust += 3;
            DisplayText("Wrapped tightly in the tentacles, you find it hard to resist becoming more and more aroused...");
            DisplayText("\n\n");
        }
        DisplayText("You are firmly trapped in the tentacle's coils.  ");
        DisplayText("The only thing you can try to do is struggle free!").bold();
        DisplayText("\n\n");
    }
}
