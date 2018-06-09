import { CommonItem } from './CommonItem';
import { CoC_Settings } from '../CoC_Settings';

/**
 * Created by aimozg on 09.01.14.
 */
/**
 * Represent item that can be used but does not necessarily disappears on use. Direct subclasses should overrride
 * "useItem" method.
 */
export class Useable extends CommonItem {

    public constructor(id: string, shortName: string = null, longName: string = null, value: number = 0, description: string = null) {
        super(id, shortName, longName, value, description);
    }

    public canUse(): boolean { return true; } //If an item cannot be used it should provide some description of why not


    public useItem(): boolean {
        CoC_Settings.errorAMC("Useable", "useItem", this.id);
        return (false);
    }

    public useText(): void { } //Produces any text seen when using or equipping the item normally
}
