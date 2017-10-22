import Weapon from './Weapon';
import Player from '../../Player';

export default class Fists extends Weapon {
    public constructor() {
        super("Fists  ", "Fists", "fists", "fists", "punch", 0);
    }

    public unequip(player: Player): Weapon {
        return null;
    }
}
