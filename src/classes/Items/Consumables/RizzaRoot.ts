import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import HeadDescriptor from '../../Descriptors/HeadDescriptor';
import DisplayText from '../../display/DisplayText';
import { PerkType } from '../../Effects/PerkType';
import Player from '../../Player/Player';
import { Utils } from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class RizzaRoot extends Consumable {
    public constructor() {
        super(ConsumableName.RizzaRoot, new ItemDesc("Rizza Root", "a tube of rizza root stUtils.rands", "A small ceramic tube full of fine red root stUtils.rands.  They smell something like citrus fruit."), 10);
    }

    public canUse(player: Player): boolean {
        return true;
    }

    public use(player: Player) {
        DisplayText().clear();
        let changes: number = 0;
        let changeLimit: number = 1;
        if (Utils.rand(2) === 0) changeLimit++;
        if (Utils.rand(3) === 0) changeLimit++;
        if (Utils.rand(4) === 0) changeLimit++;
        if (player.perks.has(PerkType.HistoryAlchemist)) changeLimit++;
        DisplayText("You chew on the thin red roots.  They have a rubbery texture and the taste is something like lemons and oranges mixed together.  The roots dry out your mouth as you chew them but at the same time they cause a cooling and numbing sensation that’s rather pleasant.");
        if ((changes < changeLimit) && (player.skin.type !== 0) && (Utils.rand(6) === 0)) {
            if (player.skin.type === 1)
                DisplayText("\n\nYour fur itches incessantly, so you start scratching it.  It starts coming off in big clumps before the whole mess begins sloughing off your body.  In seconds, your skin is hairless, or nearly so. <b>You've lost your fur!</b>");
            else if (player.skin.type === 2)
                DisplayText("\n\nYour scales itch incessantly, so you scratch at them.  They start falling off wholesale, leaving you standing in a pile of scales after only a few moments. <b>You've lost your scales!</b>");
            else if (player.skin.type > 2)
                DisplayText("\n\nYour " + player.skin.desc + " itches incessantly, and as you scratch it shifts and changes, becoming normal human-like skin. <b>Your skin is once again normal!</b>");
            player.skin.desc = "skin";
            player.skin.type = 0;
            changes += 2;
        }
        if ((changes < changeLimit) && (player.torso.neck.head.ears.type !== 4) && (Utils.rand(4) === 0)) {
            player.torso.neck.head.ears.type = 4;
            changes++;
            DisplayText("\n\nA weird tingling runs through your scalp as your " + HeadDescriptor.describeHair(player) + " shifts slightly.  You reach up and your hand bumps against <b>your new pointed elfin ears</b>.  You bet they look cute!");
        }
        if ((changes < changeLimit) && (player.tallness < 108)) {
            player.tallness += changeLimit - changes + Utils.rand(2); // Add remaining changes as additional height
            if (player.tallness > 108) player.tallness = 108;
            DisplayText("\n\nA shiver runs down your spine.  You realize that it, along with the rest of your frame, is now a bit taller.");
        }
        else if (player.tallness >= 108) {
            DisplayText("\n\nYou don’t feel anything happening along your spine.  Perhaps this is as tall as the rizza root can make you.");
        }
    }

}
