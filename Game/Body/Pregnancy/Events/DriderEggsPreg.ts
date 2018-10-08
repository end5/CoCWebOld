import { IPregnancyEvent } from "../IPregnancyEvent";
import { Character } from "../../../Character/Character";
import { Womb } from "../Womb";
import { SpiderPregEvent } from "./SpiderPreg";

export class DriderEggsPregEvent implements IPregnancyEvent {
    private spiderPregEvent = new SpiderPregEvent();

    public incubationDisplay(player: Character, womb: Womb): void {
        this.spiderPregEvent.incubationDisplay(player, womb);
    }

    public canBirth(player: Character, womb: Womb): boolean {
        return womb.pregnancy.incubation === 1;
    }

    public birthScene(player: Character, womb: Womb): void {
        // The womb clear happens before the scene in old code
        // Dunno which way it should be
        womb.clear();
        driderPregVagBirth(player);
    }
}
