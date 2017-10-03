import Consumable from "./Consumable";
import Player from "../../Player";
import Game from "../../Game/Game";

export default class BlackCatBeer extends Consumable {
    public constructor() {
        super("BC Beer", "BC Beer", "a mug of Black Cat Beer", 1, "A capped mug containing an alcoholic drink secreted from the breasts of Niamh.  It smells tasty.");
    }

    public use(player: Player) {
        Game.sceneManager.telAdre.niamh.blackCatBeerEffects(player);
    }
}