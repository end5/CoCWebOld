import IPregnancyEvent from "./IPregnancyEvent";
import Player from "../../Player";

export default class PregUrta implements IPregnancyEvent {
    public incubationDisplay(player: Player) {
        Game.sceneManager.urtaPregs.urtaPregooUpdates();
    }

    public birth(player: Player) {
        urtaPregs.PCGivesBirf();
        player.knockUpForce(); //Clear Pregnancy
    }
}