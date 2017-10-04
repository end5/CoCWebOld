import IPregnancyEvent from "./IPregnancyEvent";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";

export default class ButtPregBunny implements IPregnancyEvent {
    public incubationDisplay(player: Player) {
        if (player.buttPregnancyIncubation == 800) {
            MainScreen.text("\nYour gut gurgles strangely.\n", false);
        }
        if (player.buttPregnancyIncubation == 785) {
            mutations.neonPinkEgg(true, player);
            MainScreen.text("\n", false);
        }
        if (player.buttPregnancyIncubation == 776) {
            MainScreen.text("\nYour gut feels full and bloated.\n", false);
        }
        if (player.buttPregnancyIncubation == 765) {
            mutations.neonPinkEgg(true, player);
            MainScreen.text("\n", false);
        }
        if (player.buttPregnancyIncubation == 745) {
            MainScreen.text("\n<b>After dealing with the discomfort and bodily changes for the past day or so, you finally get the feeling that the eggs in your ass have dissolved.</b>\n", false);
            player.buttKnockUpForce(); //Clear Butt Pregnancy
        }
    }

    public birth(player: Player) {
    }
}