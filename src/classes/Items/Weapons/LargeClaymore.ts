import Weapon from "./Weapon";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";
export default class LargeClaymore extends Weapon {
    public constructor() {
        super("Claymor", "L.Claymore", "large claymore", "a large claymore", "cleaving sword-slash", 15, 1000, "A massive sword that a very strong warrior might use.  Requires 40 strength to use.  (ATK: 15) (Cost: 1000)", "Large");
    }

    public canUse(player: Player): boolean {
        if (player.stats.str >= 40)
            return true;
        MainScreen.text("You aren't strong enough to handle such a heavy weapon!  ");
        return false;
    }
}
