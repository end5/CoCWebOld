import { urtaPregooUpdates, PCGivesBirf } from "../../../Scenes/NPCs/UrtaPregs";
import { Character } from "../../../Character/Character";
import { Womb } from "../Womb";
import { IPregnancyEvent } from "../IPregnancyEvent";

export class UrtaPregEvent implements IPregnancyEvent {
    public incubationDisplay(player: Character, womb: Womb): void {
        urtaPregooUpdates();
    }

    public canBirth(player: Character, womb: Womb): boolean {
        return womb.pregnancy.incubation === 1;
    }

    public birthScene(player: Character, womb: Womb): void {
        PCGivesBirf(player);
        womb.clear();
    }
}
