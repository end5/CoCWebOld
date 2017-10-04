import IPregnancyEvent from "./IPregnancyEvent";
import Player from "../../Player";

export default class PregBenoit implements IPregnancyEvent {
    public incubationDisplay(player: Player) {
        Game.sceneManager.bog.phoukaScene.phoukaPregUpdate();
    }

    public birth(player: Player) {
        if (model.time.hours != 5 && model.time.hours != 6) {
            player.knockUpForce(player.pregnancyType, 3); //Make sure eggs are only birthed early in the morning
        }
        else {
            player.knockUpForce(); //Clear Pregnancy
            bazaar.benoit.popOutBenoitEggs();
        }
    }
}