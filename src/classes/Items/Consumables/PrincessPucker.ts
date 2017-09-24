import Consumable from "./Consumable";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";
import Utils from "../../Utilities/Utils";

export default class PrincessPucker extends Consumable {
    public constructor() {
        super("Smart T", "Scholars T.", "a cup of scholar's tea", 0, "This powerful brew supposedly has mind-strengthening effects.");
    }

    public use(player: Player) {
        MainScreen.clearText();

        MainScreen.text("You uncork the bottle, and sniff it experimentally.  The fluid is slightly pink, full of flecks of gold, and smelling vaguely of raspberries.  Princess Gwynn said it was drinkable.\n\n");

        MainScreen.text("You down the bottle, hiccuping a bit at the syrupy-sweet raspberry flavor.  Immediately following the sweet is a bite of sour, like sharp lime.  You pucker your lips, and feel your head clear a bit from the intensity of flavor.  You wonder what Gwynn makes this out of.\n\n");

        MainScreen.text("Echoing the sensation in your head is an answering tingle in your body.  The sudden shock of citrusy sour has left you slightly less inclined to fuck, a little more focused on your priorities.\n\n");

        if (Utils.rand(2) == 0) {
            dynStats("lus-", 20, "lib-", 2);
        }
        else {
            dynStats("lus-", 20, "sen-", 2);
        }

        if (player.hairColor != "pink") {
            if (Utils.rand(5) == 0) {
                MainScreen.text("A slight tingle across your scalp draws your attention to your hair.  It seems your " + player.hairColor + " is rapidly gaining a distinctly pink hue, growing in from the roots!\n\n");
                player.hairColor = "pink";
            }
        }
    }
}