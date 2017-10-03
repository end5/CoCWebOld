import Consumable from "./Consumable";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";
import Utils from "../../Utilities/Utils";
import StatusAffect from "../../Effects/StatusAffect";

export default class SensitivityDraft extends Consumable {
    public constructor() {
        super("SensDrf", "Sens. Draft", "a bottle of sensitivity draft", 15, "This carefully labelled potion is a 'Sensitivity Draft', and if the diagrams are any indication, it will make your body more sensitive.");
    }

    public use(player: Player) {
        MainScreen.text("", true);
        MainScreen.text("You pop the cork on this small vial and drink down the clear liquid.  It makes your lips and tongue tingle strangely, letting you feel each globule of spit in your mouth and each breath of air as it slides past your lips.", false);

        if (player.statusAffects.has("Dys")) {
            MainScreen.text("\n\nThankfully, the draft invigorates your groin, replacing the numbness with waves of raw sensation.  It seems your crotch is back to normal and <b>you can masturbate again!</b>", false);
            player.statusAffects.remove("Dys");
        }
        if (Utils.rand(4) == 0 && !player.statusAffects.has("LustyTongue")) {
            MainScreen.text("The constant tingling in your mouth grows and grows, particularly around your lips, until they feel as sensitive as ", false);
            if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text("your", false);
            else MainScreen.text("a woman's", false);
            MainScreen.text(" lower lips.  You'll have to be careful not to lick them!", false);
            //(Lustytongue status)
            player.statusAffects.add(new StatusAffect("LustyTongue", 25, 0, 0, 0));
        }
        MainScreen.text("\n\nAfter the wave of sensation passes, your " + player.skinDesc + " feels a little more receptive to touch.  ", false);
        if (player.stats.lust > 70 || player.stats.lib > 70) {
            MainScreen.text("You shiver and think of how much better it'll make sex and masturbation.", false);
        }
        else MainScreen.text("You worry it'll make it harder to resist the attentions of a demon.", false);
        player.stats.sens += 10;
        player.stats.lust += 5;
    }
}