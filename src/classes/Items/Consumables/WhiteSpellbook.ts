import Consumable from "./Consumable";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";
import Utils from "../../Utilities/Utils";

export default class WhiteSpellbook extends Consumable {
    public constructor() {
        super("Smart T", "Scholars T.", "a cup of scholar's tea", 0, "This powerful brew supposedly has mind-strengthening effects.");
    }

    public use(player: Player) {
        MainScreen.text("You open the white tome, and discover it to be an instructional book on the use of white magic.  Most of it is filled with generic information about white magic - how it is drawn for mental focus, is difficult to use when tired or aroused, and can be used to create and control energy.  In no time at all you've read the whole thing, but it disappears into thin air before you can put it away.", true);
        if (player.stats.int < 30) {
            MainScreen.text("\n\nYou feel greatly enlightened by your time spent reading.", false);
            dynStats("int", 4);
        }
        else if (player.stats.int < 60) {
            MainScreen.text("\n\nSpending some time reading was probably good for you, and you definitely feel smarter for it.", false);
            dynStats("int", 2);
        }
        else if (player.stats.int < 80) {
            MainScreen.text("\n\nAfter reading the small tome your already quick mind feels invigorated.", false);
            dynStats("int", 1);
        }
        else {
            MainScreen.text("\n\nThe contents of the book did little for your already considerable intellect.", false);
            dynStats("int", .6);
        }
        //Smart enough for arouse and doesnt have it
        if (player.stats.int >= 25 && player.findStatusAffect(StatusAffects.KnowsCharge) < 0) {
            MainScreen.text("\n\nYou blink in surprise, assaulted by the knowledge of a <b>new spell: Charge Weapon.</b>", false);
            player.statusAffects.add(new StatusAffect("KnowsCharge", 0, 0, 0, 0)));
            return;
        }
        //Smart enough for arouse and doesnt have it
        if (player.stats.int >= 30 && player.findStatusAffect(StatusAffects.KnowsBlind) < 0) {
            MainScreen.text("\n\nYou blink in surprise, assaulted by the knowledge of a <b>new spell: Blind.</b>", false);
            player.statusAffects.add(new StatusAffect("KnowsBlind", 0, 0, 0, 0)));
            return;
        }
        //Smart enough for arouse and doesnt have it
        if (player.stats.int >= 40 && player.findStatusAffect(StatusAffects.KnowsWhitefire) < 0) {
            MainScreen.text("\n\nYou blink in surprise, assaulted by the knowledge of a <b>new spell: Whitefire.</b>", false);
            player.statusAffects.add(new StatusAffect("KnowsWhitefire", 0, 0, 0, 0)));
        }
    }
}