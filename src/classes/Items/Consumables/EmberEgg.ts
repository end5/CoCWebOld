import Consumable from "./Consumable";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";
import Utils from "../../Utilities/Utils";

export default class EmberEgg extends Consumable {
    public constructor() {
        super("Smart T", "Scholars T.", "a cup of scholar's tea", 0, "This powerful brew supposedly has mind-strengthening effects.");
    }

    public use(player: Player) {
        MainScreen.clearText();
        //Effect:
        //Boosts the special effect of Dragonbreath by 20% for 1 use. ie: if Tainted's breath weapon has a 80% chance to stun on hit, +20% equals 100% chance to stun.
        MainScreen.text("You crack the shell easily and swallow the large yolk and the copious amounts of albumen - the yolk is blue, while the rest is crimson-tinted.  It tastes like... well, it tastes mostly of spiced mint, you think.");
        if (player.perks.has("Dragonfire")) {
            if (player.statusAffects.has("DragonBreathCooldown")) player.statusAffects.remove("DragonBreathCooldown");
            else {
                if (player.findStatusAffect(StatusAffects.DragonBreathBoost) < 0) player.statusAffects.add(new StatusAffect("DragonBreathBoost", 0, 0, 0, 0)));
            }
            //(if PC has breath weapon)
            MainScreen.text("\n\nA sudden surge of energy fills your being and you feel like you could blast anything to atoms with a single breath, like the mighty dragons of legends.");
        }
        fatigue(-20);
    }
}