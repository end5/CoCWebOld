import Consumable from "./Consumable";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";
import Utils from "../../Utilities/Utils";

export default class PurityPeach extends Consumable {
    public constructor() {
        super("PurPeac", "PurPeac", "a pure peach", 10, "This is a peach from Minerva's spring, yellowy-orange with red stripes all over it.");
    }

    public use(player: Player) {
        MainScreen.clearText();
        MainScreen.text("You bite into the sweet, juicy peach, feeling a sensation of energy sweeping through your limbs and your mind.  You feel revitalized, refreshed, and somehow cleansed.");
        player.stats.fatigueChange(-15);
        player.stats.HPChange(Math.round(player.stats.maxHP() * 0.25));
    }
}