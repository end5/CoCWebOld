import IPregnancyEvent from "./IPregnancyEvent";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";

export default class ButtPregFrogGirl implements IPregnancyEvent {
    public incubationDisplay(player: Player) {
        if (player.buttPregnancyIncubation == 8) {
            //Egg Maturing
            MainScreen.text("\nYour gut churns, and with a squelching noise, a torrent of transparent slime gushes from your ass.  You immediately fall to your knees, landing wetly amidst the slime.  The world around briefly flashes with unbelievable colors, and you hear someone giggling.\n\nAfter a moment, you realize that it’s you.");
            //pussy:
            if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text("  Against your [vagina], the slime feels warm and cold at the same time, coaxing delightful tremors from your [clit].");
            //[balls:
            else if (player.lowerBody.balls > 0) MainScreen.text("  Slathered in hallucinogenic frog slime, your balls tingle, sending warm pulses of pleasure all the way up into your brain.");
            //[cock:
            else if (player.lowerBody.cockSpot.hasCock()) MainScreen.text("  Splashing against the underside of your " + player.CockDescriptor.describeMultiCockShort(player) + ", the slime leaves a warm, oozy sensation that makes you just want to rub [eachCock] over and over and over again.");
            //genderless: 
            else MainScreen.text("  Your asshole begins twitching, aching for something to push through it over and over again.");
            MainScreen.text("  Seated in your own slime, you moan softly, unable to keep your hands off yourself.");
            dynStats("lus=", 100, "resisted", false);
        }
    }

    public birth(player: Player) {
        bog.frogGirlScene.birthFrogEggsAnal();
        player.buttKnockUpForce(); //Clear Butt Pregnancy
    }
}