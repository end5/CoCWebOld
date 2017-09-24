import Consumable from "./Consumable";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";
import Utils from "../../Utilities/Utils";

export default class PurpleFruit extends Consumable {
    public constructor() {
        super("Smart T", "Scholars T.", "a cup of scholar's tea", 0, "This powerful brew supposedly has mind-strengthening effects.");
    }

    public use(player: Player) {
        MainScreen.clearText();
        MainScreen.text("You bite into the fruit Essrayle gave you with little hesitation.  It's amazingly sweet, with a texture that's rather gummy.  The juice is a candied grape syrup that fills your cheeks and flows down your throat with far more fluid than the size of the plant should allow.  You hastily devour the entire thing, unable to stop yourself once you've started.");
        MainScreen.text("\n\nA tingling warmth shifts to a roaring inferno in your veins, your heart-rate spiking abruptly.  The intensity of it almost makes your body feel molten!  But, as quickly as it came, the sensation fades into merely a pleasing warmth that settles in your chest.");
        if (player.averageNipplesPerBreast() < 4) {
            MainScreen.text("  At first you think nothing has changed, but a second look confirms that your breasts now sport the same quartet of cow-like nipples the bovine plant-girl bears.");
            if (player.upperBody.chest.BreastRatingLargest[0].nippleLength < 4) player.upperBody.chest.BreastRatingLargest[0].nippleLength = 4;
            temp = player.bRows();
            while (temp > 0) {
                temp--;
                player.upperBody.chest.list[temp].nipplesPerBreast = 4;
            }
        }
        //[Player gains quad nipples, milk production and libido way up]
        dynStats("lib", 5);
        player.boostLactation(3 * player.bRows());
    }
}