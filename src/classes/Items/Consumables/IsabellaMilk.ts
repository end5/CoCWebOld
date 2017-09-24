import Consumable from "./Consumable";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";
import Utils from "../../Utilities/Utils";

export default class IsabellaMilk extends Consumable {
    public constructor() {
        super("Smart T", "Scholars T.", "a cup of scholar's tea", 0, "This powerful brew supposedly has mind-strengthening effects.");
    }

    public use(player: Player) {
        MainScreen.text("", true);
        MainScreen.text("You swallow down the bottle of Isabella's milk.", false);
        if (player.fatigue > 0) MainScreen.text("  You feel much less tired! (-33 fatigue)", false);
        fatigue(-33);
    }
}