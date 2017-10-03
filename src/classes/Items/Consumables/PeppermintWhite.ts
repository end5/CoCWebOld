import Consumable from "./Consumable";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";
import StatChangeDisplay from "../../display/StatChangeDisplay";

export default class PeppermintWhite extends Consumable {
    public constructor() {
        super("PeppWht", "PeppWht", "a vial of peppermint white", 120, "This tightly corked glass bottle gives off a pepperminty smell and reminds you of the winter holidays.  How odd.");
    }

    public use(player: Player) {
        MainScreen.clearText();
        MainScreen.text("You pull the cork off the gift from the mysterious stranger.  The scent of alluring mint fills your nose once again.  You bring the head of the bottle to your lips and tip it back, the creamy white fluid hits your tongue and slips down your throat.  The liquid is surprisingly refreshing, the creamy mint flavor clings to your tongue and mouth, and makes your breath feel cool as you exhale over your lips.  You can feel the liquid drip down to your stomach and fill you with a pleasant warmth and holiday cheer.\n\n");
        //Recovers health and fatigue, adds five to max health, and one to libido.*/
        StatChangeDisplay.HPChange(player, player.stats.maxHP());
        player.stats.fatigueChange(-100);
    }
}