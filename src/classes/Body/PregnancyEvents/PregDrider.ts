import IPregnancyEvent from "./IPregnancyEvent";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";

export default class PregDrider implements IPregnancyEvent {
    public incubationDisplay(player: Player) {
        Game.sceneManager.bog.phoukaScene.phoukaPregUpdate();
    }

    public birth(player: Player) {
        player.knockUpForce(); //Clear Pregnancy
        swamp.corruptedDriderScene.driderPregVagBirth();
    }
}