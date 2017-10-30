import Consumable from './Consumable';
import Game from '../../Game/Game';
import Player from '../../Player';
import ItemDesc from '../ItemDesc';

export default class BlackCatBeer extends Consumable {
    public constructor() {
        super("BC Beer", new ItemDesc("BC Beer", "a mug of Black Cat Beer", "A capped mug containing an alcoholic drink secreted from the breasts of Niamh.  It smells tasty."), 1);
    }

    public use(player: Player) {
        Game.sceneManager.telAdre.niamh.blackCatBeerEffects(player);
    }
}