import { DisplayText } from '../../../Engine/display/DisplayText';
import { Character } from '../../Character/Character';
import { CombatEffect } from '../CombatEffect';

export class HarpyBind extends CombatEffect {
    public update(character: Character) {
        if (playerFlags.FETISH >= 2) {
            character.stats.lust += 3;
            DisplayText("The harpies are holding you down and restraining you, making the struggle all the sweeter!");
        }
        else
            DisplayText("You're restrained by the harpies so that they can beat on you with impunity.  You'll need to struggle to break free!");
        DisplayText("\n\n");
    }
}
