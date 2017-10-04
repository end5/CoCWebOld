import IPregnancyEvent from "./IPregnancyEvent";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";

export default class ButtPregDrider implements IPregnancyEvent {
    public incubationDisplay(player: Player) {
        if (player.buttPregnancyIncubation == 199) {
            MainScreen.text("\n<b>After your session with the drider, you feel so nice and... full.  There is no outward change on your body, aside from the egg-packed bulge of your belly, but your " + ButtDescriptor.describeButthole(player) + " tingles slightly and leaks green goop from time to time. Hopefully it's nothing to be alarmed about.</b>\n", false);
        }
        if (player.buttPregnancyIncubation == 180) {
            MainScreen.text("\n<b>A hot flush works its way through you, and visions of aroused driders quickly come to dominate your thoughts.  You start playing with a nipple while you lose yourself in the fantasy, imagining being tied up in webs and packed completely full of eggs, stuffing your belly completely with burgeoning spheres of love.  You shake free of the fantasy and notice your hands rubbing over your slightly bloated belly.  Perhaps it wouldn't be so bad?</b>\n", false);
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 20;
        }
        if (player.buttPregnancyIncubation == 120) {
            MainScreen.text("\n<b>Your belly is bulging from the size of the eggs growing inside you and gurgling just about any time you walk.  Green goo runs down your " + LowerBodyDescriptor.describeLegs(player) + " frequently, drooling out of your pregnant asshole.</b>\n", false);
        }
        if (player.buttPregnancyIncubation == 72) {
            MainScreen.text("\n<b>The huge size of your pregnant belly constantly impedes your movement, but the constant squirming and shaking of your unborn offspring makes you pretty sure you won't have to carry them much longer.", false);
            MainScreen.text("</b>\n", false);
        }
    }

    public birth(player: Player) {
        swamp.corruptedDriderScene.birthSpiderEggsFromAnusITSBLEEDINGYAYYYYY();
        player.buttKnockUpForce(); //Clear Butt Pregnancy
    }
}