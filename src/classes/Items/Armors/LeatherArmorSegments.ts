import Armor from "./Armor";
import MainScreen from "../../display/MainScreen";
import Player from "../../Player";
import Game from "../../Game/Game";

export default class LeatherArmorSegments extends Armor {
    public constructor() {
        super("UrtaLta", "UrtaLta", "leather armor segments", "leather armor segments", 5, 76, null, "Light", true);
    }

    public removeText(): void {
        MainScreen.text("You have your old set of " + Game.libraries.armor.get("LeathrA").longName + " left over.  ");
    }

    public unequip(player: Player): Armor {
        super.unequip(player);
        return Game.libraries.armor.get("LeathrA");
    }
}

