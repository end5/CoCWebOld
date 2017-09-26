import Consumable from "./Consumable";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";
import Utils from "../../Utilities/Utils";

export default class IsabellaMilk extends Consumable {
    public constructor() {
        super("IzyMilk", "IzyMilk", "a bottle of Isabella's milk", IsabellaMilk.DefaultValue, "This is a bottle of Isabella's milk.  Isabella seems fairly certain it will invigorate you.");
    }

    public use(player: Player) {
        MainScreen.text("", true);
        MainScreen.text("You swallow down the bottle of Isabella's milk.", false);
        if (player.stats.fatigue > 0) MainScreen.text("  You feel much less tired! (-33 fatigue)", false);
        player.stats.fatigueChange(-33);
    }
}