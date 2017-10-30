import Weapon from './Weapon';
import Player from '../../Player';
import ItemDesc from '../ItemDesc';

export default class Fists extends Weapon {
    public constructor() {
        super("Fists  ", new ItemDesc("Fists", "fists"), "fists", "punch", 0);
    }

    public unequip(player: Player): Weapon {
        return null;
    }
}
