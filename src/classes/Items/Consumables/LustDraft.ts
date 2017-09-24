import Consumable from "./Consumable";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";
import Utils from "../../Utilities/Utils";

export default class LustDraft extends Consumable {
    public constructor() {
        super("Smart T", "Scholars T.", "a cup of scholar's tea", 0, "This powerful brew supposedly has mind-strengthening effects.");
    }

    public use(player: Player) {
        player.slimeFeed();
        MainScreen.text("You drink the ", true);
        if (fuck) MainScreen.text("red", false);
        else MainScreen.text("pink", false);
        MainScreen.text(" potion, and its unnatural warmth immediately flows to your groin.", false);
        dynStats("lus", (30 + Utils.rand(player.stats.lib / 10)), "resisted", false);

        //Heat/Rut for those that can have them if "fuck draft"
        if (fuck) {
            //Try to go into intense heat.
            player.goIntoHeat(true, 2);
            //Males go into rut
            player.goIntoRut(true);
        }
        //ORGAZMO
        if (player.lust >= 100 && !kGAMECLASS.inCombat) {
            MainScreen.text("\n\nThe arousal from the potion overwhelms your senses and causes you to spontaneously orgasm.  You rip off your " + player.armorName + " and look down as your ", false);
            if (player.lowerBody.cockSpot.count() > 0) {
                MainScreen.text(multiCockDescriptLight() + " erupts in front of you, liberally spraying the ground around you.  ", false);
            }
            if (player.lowerBody.cockSpot.count() > 0 && player.lowerBody.vaginaSpot.count() > 0) {
                MainScreen.text("At the same time your ", false);
            }
            if (player.lowerBody.vaginaSpot.count() > 0) {
                MainScreen.text(vaginaDescript(0) + " soaks your thighs.  ", false);
            }
            if (player.gender == 0) MainScreen.text("body begins to quiver with orgasmic bliss.  ", false);
            MainScreen.text("Once you've had a chance to calm down, you notice that the explosion of pleasure you just experienced has rocked you to your core.  You are a little hornier than you were before.", false);
            //increase player libido, and maybe sensitivity too?
            player.orgasm();
            dynStats("lib", 2, "sen", 1);
        }
        if (player.lust > 100) player.lust = 100;
        MainScreen.text("\n\n", false);
    }
}