import IPregnancyEvent from "./IPregnancyEvent";
import Player from "../../Player";

export default class PregSandWitch implements IPregnancyEvent {
    public incubationDisplay(player: Player) {
        Game.sceneManager.sandPregUpdate();
    }

    public birth(player: Player) {
        birthAWitch();
        player.knockUpForce(); //Clear Pregnancy
    }
}