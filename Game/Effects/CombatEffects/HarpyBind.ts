import { Character } from '../../Character/Character';
import { CombatEffect } from '../CombatEffect';
import { PlayerFlags } from '../../Character/Player/PlayerFlags';
import { CView } from '../../../Engine/Display/ContentView';

export class HarpyBind extends CombatEffect {
    public update(character: Character) {
        if (PlayerFlags.FETISH >= 2) {
            character.stats.lust += 3;
            CView.text("The harpies are holding you down and restraining you, making the struggle all the sweeter!");
        }
        else
            CView.text("You're restrained by the harpies so that they can beat on you with impunity.  You'll need to struggle to break free!");
        CView.text("\n\n");
    }
}
