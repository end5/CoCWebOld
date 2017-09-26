import Consumable from "./Consumable";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";
import Utils from "../../Utilities/Utils";
import StatusAffect from "../../Effects/StatusAffect";

export default class HerbalContraceptive extends Consumable {
    public constructor() {
        super("HrblCnt", "HrblCnt", "a bundle of verdant green leaves", HerbalContraceptive.DefaultValue, "A small bundle of verdant green leaves.");
    }

    public use(player: Player) {
        MainScreen.clearText();

        // Placeholder, sue me
        MainScreen.text("You chew on the frankly awfully bitter leaves as quickly as possible before swallowing them down.");

        player.statusAffects.add(new StatusAffect("Contraceptives", 1, 48, 0, 0));
    }
}