import { Useable } from './Useable';

/**
 * Created by aimozg on 09.01.14.
 */
/**
 * An item, that is consumed by player, and disappears after use. Direct subclasses should override "doEffect" method
 * and NOT "useItem" method.
*/
export class Consumable extends Useable {

    public constructor(id: string, shortName: string = null, longName: string = null, value: number = 0, description: string = null) {
        super(id, shortName, longName, value, description);
    }

}