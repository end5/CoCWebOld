import Consumable from "./Consumable";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";
import Utils from "../../Utilities/Utils";

export default class Lactaid extends Consumable {
    public constructor() {
        super("Smart T", "Scholars T.", "a cup of scholar's tea", 0, "This powerful brew supposedly has mind-strengthening effects.");
    }

    public use(player: Player) {
        player.slimeFeed();
        let i: number = 0;
        MainScreen.text("You gulp down the bottle of lactaid, easily swallowing the creamy liquid.", true);
        //Bump up size!
        if (player.averageBreastSize() < 8) {
            MainScreen.text("\n\n", false);
            if (player.upperBody.chest.count() == 1) player.growTits((1 + Utils.rand(5)), 1, true, 1);
            else player.growTits(1 + Utils.rand(2), player.upperBody.chest.count(), true, 1);
        }
        //Player doesn't lactate
        if (player.biggestLactation() < 1) {
            MainScreen.text("\n\n", false);
            MainScreen.text("You feel your " + nippleDescript(0) + "s become tight and engorged.  A single droplet of milk escapes each, rolling down the curves of your breasts.  <b>You are now lactating!</b>", false);
            for (i = 0; i < player.upperBody.chest.count(); i++) {
                player.upperBody.chest.list[i].lactationMultiplier += 2;
            }
        }
        //Boost lactation
        else {
            MainScreen.text("\n\n", false);
            MainScreen.text("Milk leaks from your " + nippleDescript(0) + "s in thick streams.  You're lactating even more!", false);
            for (i = 0; i < player.upperBody.chest.count(); i++) {
                player.upperBody.chest.list[i].lactationMultiplier += 1 + Utils.rand(10) / 10;
            }
        }
        dynStats("lus", 10);
        if (Utils.rand(3) == 0) {
            MainScreen.text(player.modFem(95, 1), false);
        }
    }
}