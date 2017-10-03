import Consumable from "./Consumable";
import Utils from "../../Utilities/Utils";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";
import HeadDescriptor from "../../Descriptors/HeadDescriptor";

export default class RizzaRoot extends Consumable {
    public constructor() {
        super("RizzaRt", "Rizza Root", "a tube of rizza root stUtils.rands", 10, "A small ceramic tube full of fine red root stUtils.rands.  They smell something like citrus fruit.");
    }

    public canUse(player: Player): boolean {
        return true;
    }

    public use(player: Player) {
        MainScreen.clearText();
        let changes: number = 0;
        let changeLimit: number = 1;
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(3) == 0) changeLimit++;
        if (Utils.rand(4) == 0) changeLimit++;
        if (player.perks.has("HistoryAlchemist")) changeLimit++;
        MainScreen.text("You chew on the thin red roots.  They have a rubbery texture and the taste is something like lemons and oranges mixed together.  The roots dry out your mouth as you chew them but at the same time they cause a cooling and numbing sensation that’s rather pleasant.");
        if ((changes < changeLimit) && (player.skinType != 0) && (Utils.rand(6) == 0)) {
            if (player.skinType == 1)
                MainScreen.text("\n\nYour fur itches incessantly, so you start scratching it.  It starts coming off in big clumps before the whole mess begins sloughing off your body.  In seconds, your skin is hairless, or nearly so. <b>You've lost your fur!</b>");
            else if (player.skinType == 2)
                MainScreen.text("\n\nYour scales itch incessantly, so you scratch at them.  They start falling off wholesale, leaving you standing in a pile of scales after only a few moments. <b>You've lost your scales!</b>");
            else if (player.skinType > 2)
                MainScreen.text("\n\nYour " + player.skinDesc + " itches incessantly, and as you scratch it shifts and changes, becoming normal human-like skin. <b>Your skin is once again normal!</b>");
            player.skinDesc = "skin";
            player.skinType = 0;
            changes += 2;
        }
        if ((changes < changeLimit) && (player.upperBody.head.earType != 4) && (Utils.rand(4) == 0)) {
            player.upperBody.head.earType = 4;
            changes++;
            MainScreen.text("\n\nA weird tingling runs through your scalp as your " + HeadDescriptor.describeHair(player) + " shifts slightly.  You reach up and your hand bumps against <b>your new pointed elfin ears</b>.  You bet they look cute!");
        }
        if ((changes < changeLimit) && (player.tallness < 108)) {
            player.tallness += changeLimit - changes + Utils.rand(2); //Add remaining changes as additional height
            if (player.tallness > 108) player.tallness = 108;
            MainScreen.text("\n\nA shiver runs down your spine.  You realize that it, along with the rest of your frame, is now a bit taller.");
        }
        else if (player.tallness >= 108) {
            MainScreen.text("\n\nYou don’t feel anything happening along your spine.  Perhaps this is as tall as the rizza root can make you.");
        }
    }

}

