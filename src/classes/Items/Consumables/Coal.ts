import Consumable from './Consumable';
import ButtDescriptor from '../../Descriptors/ButtDescriptor';
import MainScreen from '../../display/MainScreen';
import StatusAffect from '../../Effects/StatusAffect';
import BodyModifier from '../../Modifiers/BodyModifier';
import Player from '../../Player';
import Utils from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class Coal extends Consumable {
    public constructor() {
        super("Coal   ", new ItemDesc("Coal", "two pieces of coal"));
    }

    public use(player: Player) {
        let changes: number = 0;
        MainScreen.text("", true);
        MainScreen.text("You handle the coal rocks experimentally and they crumble to dust in your hands!  You cough as you breathe in the cloud, sputtering and wheezing.  After a minute of terrible coughing, you recover and realize there's no remaining trace of the rocks, not even a sooty stain on your hands!", false);
        //Try to go into intense heat
        if (BodyModifier.displayGoIntoHeat(player, 2)) {
            changes++;
        }
        //Males go into rut
        else if (BodyModifier.displayGoIntoRut(player)) {
            changes++;
        }
        else {
            //Boost anal capacity without gaping
            if (player.statusAffects.get("BonusACapacity").value1 < 80) {
                if (!player.statusAffects.has("BonusACapacity"))
                    player.statusAffects.add(new StatusAffect("BonusACapacity", 0, 0, 0, 0));
                player.statusAffects.get("BonusACapacity").value1 = 5;
                MainScreen.text("\n\nYou feel... more accommodating somehow.  Your " + ButtDescriptor.describeButthole(player) + " is tingling a bit, and though it doesn't seem to have loosened, it has grown more elastic.", false);
                changes++;
            }
            else {
                MainScreen.text("\n\nYour whole body tingles for a moment but it passes.  It doesn't look like the coal can do anything to you at this point.", false);
            }
        }
    }
}