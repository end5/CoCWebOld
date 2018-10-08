import { IPregnancyEvent } from "../IPregnancyEvent";
import { BasiliskPregEvent } from "./BasiliskPreg";
import { Character } from "../../../Character/Character";
import { Womb } from "../Womb";
import { Time } from "../../../Utilities/Time";

export class BenoitPregEvent implements IPregnancyEvent {
    private basiliskPregEvent = new BasiliskPregEvent();

    public incubationDisplay(player: Character, womb: Womb): void {
        this.basiliskPregEvent.incubationDisplay(player, womb);
    }

    public canBirth(player: Character, womb: Womb): boolean {
        return womb.pregnancy.incubation <= 2;
    }

    public birthScene(player: Character, womb: Womb): void {
        if (Time.hour !== 5 && Time.hour !== 6) {
            // Make sure eggs are only birthed early in the morning
            womb.pregnancy.incubation += 3;
        }
        else {
            // The womb clear happens before the scene in old code
            // Dunno which way it should be
            popOutBenoitEggs(player);
            womb.clear();
        }
    }
}
