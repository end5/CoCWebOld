import { phoukaPregUpdate, phoukaPregBirth } from "../../../Scenes/Areas/Bog/PhoukaScene";
import { Character } from "../../../Character/Character";
import { Womb } from "../Womb";
import { IPregnancyEvent } from "../IPregnancyEvent";

export class FaeriePregEvent implements IPregnancyEvent {
    public incubationDisplay(player: Character, womb: Womb): void {
        phoukaPregUpdate(player);
    }

    public canBirth(player: Character, womb: Womb): boolean {
        return womb.pregnancy.incubation === 1;
    }

    public birthScene(player: Character, womb: Womb): void {
        phoukaPregBirth(player);
        womb.clear();
    }
}
