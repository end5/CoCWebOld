import IPregnancyEvent from "./IPregnancyEvent";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";

export default class PregFrogGirl implements IPregnancyEvent {
    public incubationDisplay(player: Player) {
        if (player.pregnancyIncubation == 8) {
            //Egg Maturing
            if (player.lowerBody.vaginaSpot.hasVagina()) {
                MainScreen.text("\nYour gut churns, and with a squelching noise, a torrent of transparent slime gushes from your [vagina].  You immediately fall to your knees, landing wetly amidst the slime.  The world around briefly flashes with unbelievable colors, and you hear someone giggling.\n\nAfter a moment, you realize that it’s you.");
                //pussy:
                if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text("  Against your [vagina], the slime feels warm and cold at the same time, coaxing delightful tremors from your [clit].");
                //[balls:
                else if (player.lowerBody.balls > 0) MainScreen.text("  Slathered in hallucinogenic frog slime, your balls tingle, sending warm pulses of pleasure all the way up into your brain.");
                //genderless: 
                else MainScreen.text("  Your [vagina] begins twitching, aching for something to push through it over and over again.");
                MainScreen.text("  Seated in your own slime, you moan softly, unable to keep your hands off yourself.");
                dynStats("lus=", 100, "resisted", false);
            }
            else {
                MainScreen.text("\nYour gut churns, but after a moment it settles. Your belly does seem a bit bigger and more gravid afterward, like you're filling up with fluid without any possible vent. You suddenly wonder if losing your pussy was such a great idea.");
            }
        }
    }

    public birth(player: Player) {
        bog.frogGirlScene.layFrogEggs();
        player.knockUpForce(); //Clear Pregnancy
    }
}