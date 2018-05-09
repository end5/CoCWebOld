import { DisplayText } from '../../../Engine/display/DisplayText';
import { Character } from '../../Character/Character';
import { PlayerFlags } from '../../Character/Player/PlayerFlags';
import { User } from '../../User';
import { CombatEffect } from '../CombatEffect';

export class GooArmorBind extends CombatEffect {
    public update(character: Character) {
        if ((User.flags.get("Player") as PlayerFlags).FETISH >= 2) {
            character.stats.lust += 3;
            DisplayText("The feel of the all-encapsulating goo immobilizing your helpless body turns you on more and more.  Maybe you should just wait for it to completely immobilize you and have you at its mercy.");
        }
        else
            DisplayText("You're utterly immobilized by the goo flowing around you.  You'll have to struggle free!");
        DisplayText("\n\n");
    }
}
