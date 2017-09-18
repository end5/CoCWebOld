import Weapon from "./Weapon";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";

export default class LargeHammer extends Weapon {
    public constructor() {
        super("L.Hammr", "L.Hammr", "large hammer", "Marble's large hammer", "smash", 16, 90, "This two-handed warhammer looks pretty devastating.  You took it from Marble after she refused your advances.", "Large");
    }

    public canUse(player: Player): boolean {
        if (player.tallness >= 60)
            return true;
        MainScreen.text("This hammer is too large for you to wield effectively.  ");
        return false;
    }
}
