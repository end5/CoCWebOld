import { Character } from "../../../Character/Character";
import { Womb } from "../Womb";
import { IPregnancyEvent } from "../IPregnancyEvent";

export class SandWitchPregEvent implements IPregnancyEvent {
    public incubationDisplay(player: Character, womb: Womb): void {
        sandPregUpdate();
    }

    public canBirth(player: Character, womb: Womb): boolean {
        return womb.pregnancy.incubation === 1;
    }

    public birthScene(player: Character, womb: Womb): void {
        birthAWitch(player);
        womb.clear();
    }
}
