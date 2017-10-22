import Consumable from './Consumable';
import BreastDescriptor from '../../Descriptors/BreastDescriptor';
import MainScreen from '../../display/MainScreen';
import BreastModifier from '../../Modifiers/BreastModifiers';
import Player from '../../Player';
import Utils from '../../Utilities/Utils';

export default class Lactaid extends Consumable {
    public constructor() {
        super("Lactaid", "Lactaid", "a pink bottle labelled \"Lactaid\"", Lactaid.DefaultValue, "Judging by the name printed on this bottle, 'Lactaid' probably has an effect on the ability to lactate, and you doubt that effect is a reduction.");
    }

    public use(player: Player) {
        player.slimeFeed();
        MainScreen.text("You gulp down the bottle of lactaid, easily swallowing the creamy liquid.", true);
        //Bump up size!
        if (player.upperBody.chest.averageBreastSize() < 8) {
            MainScreen.text("\n\n", false);
            if (player.upperBody.chest.count() == 1)
                BreastModifier.growSmallestBreastRow(player, (1 + Utils.rand(5)), 1, true);
            else BreastModifier.growSmallestBreastRow(player, 1 + Utils.rand(2), player.upperBody.chest.count(), true);
        }
        //Player doesn't lactate
        if (player.upperBody.chest.LactationMultipierLargest[0].lactationMultiplier < 1) {
            MainScreen.text("\n\n", false);
            MainScreen.text("You feel your " + BreastDescriptor.describeNipple(player, player.upperBody.chest.get(0)) + "s become tight and engorged.  A single droplet of milk escapes each, rolling down the curves of your breasts.  <b>You are now lactating!</b>", false);
            for (let index = 0; index < player.upperBody.chest.count(); index++) {
                player.upperBody.chest.get(index).lactationMultiplier += 2;
            }
        }
        //Boost lactation
        else {
            MainScreen.text("\n\n", false);
            MainScreen.text("Milk leaks from your " + BreastDescriptor.describeNipple(player, player.upperBody.chest.get(0)) + "s in thick streams.  You're lactating even more!", false);
            for (let index = 0; index < player.upperBody.chest.count(); index++) {
                player.upperBody.chest.get(index).lactationMultiplier += 1 + Utils.rand(10) / 10;
            }
        }
        player.stats.lust += 10;
        if (Utils.rand(3) == 0) {
            MainScreen.text(player.modFem(95, 1), false);
        }
    }
}