import Consumable from "./Consumable";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";
import Utils from "../../Utilities/Utils";

export default class MarbleMilk extends Consumable {
    public constructor() {
        super("Smart T", "Scholars T.", "a cup of scholar's tea", 0, "This powerful brew supposedly has mind-strengthening effects.");
    }

    public use(player: Player) {
        player.slimeFeed();
        //Bottle of Marble's milk - item
        //Description: "A clear bottle of milk from Marble's breasts.  It smells delicious.  "
        MainScreen.text("", true);
        //Text for when the player uses the bottle:
        //[before the player is addicted, Addiction < 30]
        if (player.statusAffects.get("Marble").value2 < 30 && player.statusAffects.get("$1").value3 == 0) MainScreen.text("You gulp down the bottle's contents; Marble makes some good tasting milk.\n\n", false);
        //[before the player is addicted, Addiction < 50]
        else if (player.statusAffects.get("$1").value3 <= 0) MainScreen.text("You gulp down the bottle's contents; Marble makes some really good tasting milk.\n\n", false);
        else if (player.statusAffects.get("$1").value3 > 0) {
            //[player is completely addicted]
            if (player.perks.has("MarblesMilk")) MainScreen.text("You gulp down the bottle's contents; it's no substitute for the real thing, but it's a nice pick me up.\n\n", false);
            else {
                //[player is no longer addicted]
                if (player.perks.has("MarbleResistant")) MainScreen.text("You gulp down the bottle's contents; you're careful not to get too attached to the taste.\n\n", false);
                //[player is addicted]
                else MainScreen.text("You gulp down the bottle's contents; you really needed that.\n\n", false);
            }
        }
        //Increases addiction by 5, up to a max of 50 before the player becomes addicted, no max after the player is addicted.
        kGAMECLASS.marbleScene.marbleStatusChange(0, 5);
        //Does not apply the 'Marble's Milk' effect
        //Purge withdrawl
        if (player.statusAffects.has("MarbleWithdrawl")) {
            player.statusAffects.remove("MarbleWithdrawl");
            dynStats("tou", 5, "int", 5);
            MainScreen.text("You no longer feel the symptoms of withdrawal.\n\n", false);
        }
        //Heals the player 70-100 health
        HPChange(70 + Utils.rand(31), true);
        //Restores a portion of fatigue (once implemented)
        kGAMECLASS.changeFatigue(-25);
        //If the player is addicted, this item negates the withdrawal effects for a few hours (suggest 6), there will need to be a check here to make sure the withdrawal effect doesn't reactivate while the player is under the effect of 'Marble's Milk'.
        if (player.statusAffects.has("BottledMilk")) {
            player.statusAffects.get("BottledMilk").value1 = (6 + Utils.rand(6));
        }
        else player.statusAffects.add(new StatusAffect("BottledMilk", 12, 0, 0, 0)));
    }
}