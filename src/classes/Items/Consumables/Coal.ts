import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import ButtDescriptor from '../../Descriptors/ButtDescriptor';
import DisplayText from '../../display/DisplayText';
import StatusAffectFactory from '../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import BodyModifier from '../../Modifiers/BodyModifier';
import Player from '../../Player/Player';
import { Utils } from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class Coal extends Consumable {
    public constructor() {
        super(ConsumableName.Coal, new ItemDesc("Coal", "two pieces of coal"));
    }

    public use(player: Player) {
        let changes: number = 0;
        DisplayText().clear();
        DisplayText("You handle the coal rocks experimentally and they crumble to dust in your hands!  You cough as you breathe in the cloud, sputtering and wheezing.  After a minute of terrible coughing, you recover and realize there's no remaining trace of the rocks, not even a sooty stain on your hands!");
        // Try to go into intense heat
        if (BodyModifier.displayGoIntoHeat(player, 2)) {
            changes++;
        }
        // Males go into rut
        else if (BodyModifier.displayGoIntoRut(player)) {
            changes++;
        }
        else {
            // Boost anal capacity without gaping
            if (player.statusAffects.get(StatusAffectType.BonusACapacity).value1 < 80) {
                if (!player.statusAffects.has(StatusAffectType.BonusACapacity))
                    player.statusAffects.add(StatusAffectType.BonusACapacity, 0, 0, 0, 0);
                player.statusAffects.get(StatusAffectType.BonusACapacity).value1 = 5;
                DisplayText("\n\nYou feel... more accommodating somehow.  Your " + ButtDescriptor.describeButthole(player) + " is tingling a bit, and though it doesn't seem to have loosened, it has grown more elastic.");
                changes++;
            }
            else {
                DisplayText("\n\nYour whole body tingles for a moment but it passes.  It doesn't look like the coal can do anything to you at this point.");
            }
        }
    }
}
