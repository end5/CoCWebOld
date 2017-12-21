import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import BreastDescriptor from '../../Descriptors/BreastDescriptor';
import DisplayText from '../../display/DisplayText';
import BodyModifier from '../../Modifiers/BodyModifier';
import BreastModifier from '../../Modifiers/BreastModifier';
import Player from '../../Player/Player';
import Utils from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class Lactaid extends Consumable {
    public constructor() {
        super(ConsumableName.Lactaid, new ItemDesc("Lactaid", "a pink bottle labelled \"Lactaid\"", "Judging by the name printed on this bottle, 'Lactaid' probably has an effect on the ability to lactate, and you doubt that effect is a reduction."));
    }

    public use(player: Player) {
        player.slimeFeed();
        DisplayText.clear();
        DisplayText.text("You gulp down the bottle of lactaid, easily swallowing the creamy liquid.");
        //Bump up size!
        if (player.upperBody.chest.averageBreastSize() < 8) {
            DisplayText.text("\n\n");
            if (player.upperBody.chest.count() == 1)
                BreastModifier.growSmallestBreastRow(player, (1 + Utils.rand(5)), 1, true);
            else BreastModifier.growSmallestBreastRow(player, 1 + Utils.rand(2), player.upperBody.chest.count(), true);
        }
        // Player doesn't lactate
        if (player.upperBody.chest.LactationMultipierLargest[0].lactationMultiplier < 1) {
            DisplayText.text("\n\n");
            DisplayText.text("You feel your " + BreastDescriptor.describeNipple(player, player.upperBody.chest.get(0)) + "s become tight and engorged.  A single droplet of milk escapes each, rolling down the curves of your breasts.  <b>You are now lactating!</b>");
            for (let index = 0; index < player.upperBody.chest.count(); index++) {
                player.upperBody.chest.get(index).lactationMultiplier += 2;
            }
        }
        //Boost lactation
        else {
            DisplayText.text("\n\n");
            DisplayText.text("Milk leaks from your " + BreastDescriptor.describeNipple(player, player.upperBody.chest.get(0)) + "s in thick streams.  You're lactating even more!");
            for (let index = 0; index < player.upperBody.chest.count(); index++) {
                player.upperBody.chest.get(index).lactationMultiplier += 1 + Utils.rand(10) / 10;
            }
        }
        player.stats.lust += 10;
        if (Utils.rand(3) == 0) {
            DisplayText.text(BodyModifier.displayModFem(player, 95, 1));
        }
    }
}