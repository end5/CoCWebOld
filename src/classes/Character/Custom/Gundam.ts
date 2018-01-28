import DisplayText from '../../display/DisplayText';
import Player from '../../Player/Player';
import { Utils } from '../../Utilities/Utils';

export default function customGundam(player: Player): void {
    DisplayText("You're fabulously rich, thanks to a rather well-placed bet on who would be the champion.  Hopefully you can buy yourself out of any trouble you might get in.");
    player.inventory.gems = 1500 + Utils.rand(1000);
    // for my custom character profile i want the name to be gundam all i want is to start out with around 1000-2500 gems like as a gift from the elder or something to help me out.
}
