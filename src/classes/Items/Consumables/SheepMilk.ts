import Consumable from "./Consumable";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";
import Utils from "../../Utilities/Utils";

export default class SheepMilk extends Consumable {
    public constructor() {
        super("Smart T", "Scholars T.", "a cup of scholar's tea", 0, "This powerful brew supposedly has mind-strengthening effects.");
    }

    public use(player: Player) {
        MainScreen.text("You gulp the bottle's contents, and its sweet taste immediately invigorates you, making you feel calm and concentrated", true);
        //-30 fatigue, -2 libido, -10 lust]
        fatigue(-30);
        dynStats("lib", -.25, "lus", -10, "cor", -0.5);
    }
}