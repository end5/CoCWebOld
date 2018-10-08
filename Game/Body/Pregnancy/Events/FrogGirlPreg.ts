import { Character } from "../../../Character/Character";
import { Womb } from "../Womb";
import { CView } from "../../../../Engine/Display/ContentView";
import { IPregnancyEvent } from "../IPregnancyEvent";

export class FrogGirlPregEvent implements IPregnancyEvent {
    public incubationDisplay(player: Character, womb: Womb): void {
        if (womb.pregnancy.incubation === 8) {
            // Egg Maturing
            if (player.body.vaginas.length > 0) {
                CView.text("\nYour gut churns, and with a squelching noise, a torrent of transparent slime gushes from your [vagina].  You immediately fall to your knees, landing wetly amidst the slime.  The world around briefly flashes with unbelievable colors, and you hear someone giggling.\n\nAfter a moment, you realize that it’s you.");
                // pussy:
                if (player.body.vaginas.length > 0) CView.text("  Against your [vagina], the slime feels warm and cold at the same time, coaxing delightful tremors from your [clit].");
                // [balls:
                else if (player.body.balls.count > 0) CView.text("  Slathered in hallucinogenic frog slime, your balls tingle, sending warm pulses of pleasure all the way up into your brain.");
                // genderless:
                else CView.text("  Your [vagina] begins twitching, aching for something to push through it over and over again.");
                CView.text("  Seated in your own slime, you moan softly, unable to keep your hands off yourself.");
                player.stats.lustNoResist = 100;
            }
            else {
                CView.text("\nYour gut churns, but after a moment it settles. Your belly does seem a bit bigger and more gravid afterward, like you're filling up with fluid without any possible vent. You suddenly wonder if losing your pussy was such a great idea.");
            }
        }
    }

    public canBirth(player: Character, womb: Womb): boolean {
        return womb.pregnancy.incubation === 1;
    }

    public birthScene(player: Character, womb: Womb): void {
        layFrogEggs(player);
        womb.clear();
    }
}
