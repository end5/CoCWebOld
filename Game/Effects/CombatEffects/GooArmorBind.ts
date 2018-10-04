import { Character } from '../../Character/Character';
import { CombatEffect } from '../CombatEffect';
import { PlayerFlags } from '../../Character/Player/PlayerFlags';
import { CView } from '../../../Engine/Display/ContentView';

export class GooArmorBind extends CombatEffect {
    public update(character: Character) {
        if (PlayerFlags.FETISH >= 2) {
            character.stats.lust += 3;
            CView.text("The feel of the all-encapsulating goo immobilizing your helpless body turns you on more and more.  Maybe you should just wait for it to completely immobilize you and have you at its mercy.");
        }
        else
            CView.text("You're utterly immobilized by the goo flowing around you.  You'll have to struggle free!");
        CView.text("\n\n");
    }
}
