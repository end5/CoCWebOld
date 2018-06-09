import { Weapon } from '../Weapon';

/**
 * Created by aimozg on 09.01.14.
 */
export class Fists extends Weapon {

    public constructor() {
        super("Fists  ", "Fists", "fists", "fists", "punch", 0);
    }

    public useText(): void { } //No text for equipping fists

    public playerRemove(): Weapon {
        return null;
    }
}
