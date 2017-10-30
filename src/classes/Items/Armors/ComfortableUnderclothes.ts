import Armor from './Armor';
import ItemDesc from '../ItemDesc';

export default class ComfortableUnderclothes extends Armor {
    public constructor() {
        super("c.under", new ItemDesc("c.under", "comfortable underclothes", "comfortable underclothes"), "comfortable underclothes", 0, 0, "");
    }

    public playerRemove(): Armor {
        return null; //Player never picks up their underclothes
    }
}
