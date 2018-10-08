import { ButtWomb } from "../ButtWomb";
import { Character } from "../../../Character/Character";
import { CView } from "../../../../Engine/Display/ContentView";
import { IPregnancyEvent } from "../IPregnancyEvent";

export class BunnyButtPregEvent implements IPregnancyEvent {
    public incubationDisplay(player: Character, buttWomb: ButtWomb): void {
        if (buttWomb.pregnancy.incubation === 800) {
            CView.text("\nYour gut gurgles strangely.\n");
        }
        if (buttWomb.pregnancy.incubation === 785) {
            neonPinkEgg(true, player);
            CView.text("\n");
        }
        if (buttWomb.pregnancy.incubation === 776) {
            CView.text("\nYour gut feels full and bloated.\n");
        }
        if (buttWomb.pregnancy.incubation === 765) {
            neonPinkEgg(true, player);
            CView.text("\n");
        }
        if (buttWomb.pregnancy.incubation === 745) {
            CView.text("\n<b>After dealing with the discomfort and bodily changes for the past day or so, you finally get the feeling that the eggs in your ass have dissolved.</b>\n");
            buttWomb.clear();
        }
    }

    public canBirth(player: Character, buttWomb: ButtWomb): boolean {
        return buttWomb.pregnancy.incubation === 1;
    }

    public birthScene(player: Character, buttWomb: ButtWomb): void {
        buttWomb.clear();
    }
}
