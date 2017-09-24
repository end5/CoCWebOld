import Consumable from "./Consumable";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";
import Utils from "../../Utilities/Utils";

export default class HairDye extends Consumable {
    public constructor() {
        super("Smart T", "Scholars T.", "a cup of scholar's tea", 0, "This powerful brew supposedly has mind-strengthening effects.");
    }

    public use(player: Player) {
        if (player.hairColor.indexOf("rubbery") != -1 || player.hairColor.indexOf("latex-textured") != -1) {
            MainScreen.text("You massage the dye into your " + hairDescript() + " but the dye cannot penetrate the impermeable material your hair is composed of.", true);
            return;
        }
        if (player.hairLength == 0) {
            MainScreen.text("You rub the dye into your bald head, but it has no effect.", true);
            return;
        }
        MainScreen.text("You rub the dye into your " + hairDescript() + ", then use a bucket of cool lakewater to rinse clean a few minutes later.  ", true);
        player.hairColor = color;
        MainScreen.text("You now have " + hairDescript() + ".", false);
        if (player.lust > 50) {
            MainScreen.text("\n\nThe cool water calms your urges somewhat, letting you think more clearly.", false);
            dynStats("lus", -15);
        }
    }
}