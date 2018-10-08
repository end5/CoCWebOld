import { Character } from "../../../Character/Character";
import { ButtWomb } from "../ButtWomb";
import { CView } from "../../../../Engine/Display/ContentView";
import { describeCocksLight } from "../../../Descriptors/CockDescriptor";
import { birthFrogEggsAnal } from "../../../Scenes/Areas/Bog/FrogGirlScene";
import { IPregnancyEvent } from "../IPregnancyEvent";

export class FrogGirlButtPregEvent implements IPregnancyEvent {
    public incubationDisplay(player: Character, buttWomb: ButtWomb): void {
        if (buttWomb.pregnancy.incubation === 8) {
            // Egg Maturing
            CView.text("\nYour gut churns, and with a squelching noise, a torrent of transparent slime gushes from your ass.  You immediately fall to your knees, landing wetly amidst the slime.  The world around briefly flashes with unbelievable colors, and you hear someone giggling.\n\nAfter a moment, you realize that it’s you.");
            // pussy:
            if (player.body.vaginas.length > 0) CView.text("  Against your [vagina], the slime feels warm and cold at the same time, coaxing delightful tremors from your [clit].");
            // [balls:
            else if (player.body.balls.count > 0) CView.text("  Slathered in hallucinogenic frog slime, your balls tingle, sending warm pulses of pleasure all the way up into your brain.");
            // [cock:
            else if (player.body.cocks.length > 0) CView.text("  Splashing against the underside of your " + describeCocksLight(player) + ", the slime leaves a warm, oozy sensation that makes you just want to rub [eachCock] over and over and over again.");
            // genderless:
            else CView.text("  Your asshole begins twitching, aching for something to push through it over and over again.");
            CView.text("  Seated in your own slime, you moan softly, unable to keep your hands off yourself.");
            player.stats.lustNoResist = 100;
        }
    }

    public canBirth(player: Character, buttWomb: ButtWomb): boolean {
        return buttWomb.pregnancy.incubation === 1;
    }

    public birthScene(player: Character, buttWomb: ButtWomb): void {
        birthFrogEggsAnal(player);
        buttWomb.clear();
    }
}
