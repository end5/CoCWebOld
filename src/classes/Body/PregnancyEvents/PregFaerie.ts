import IPregnancyEvent from "./IPregnancyEvent";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";

export default class PregFaerie implements IPregnancyEvent {
    public incubationDisplay(player: Player) {
        Game.sceneManager.bog.phoukaScene.phoukaPregUpdate();
    }

    public birth(player: Player) {
        Game.sceneManager.bog.phoukaScene.phoukaPregBirth();
        player.pregnancy.knockUp(); //Clear Pregnancy
    }
}