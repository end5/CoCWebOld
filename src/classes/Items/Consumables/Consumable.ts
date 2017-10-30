import Player from '../../Player';
import Item, { ItemType } from '../Item';
import ItemDesc from '../ItemDesc';

export default class Consumable extends Item {
    private readonly mutationFunc: Function;
    constructor(key: string, itemDesc: ItemDesc, value?: number, mutationFunc: Function = null) {
        super(key, ItemType.Consumable, itemDesc, value);
        this.mutationFunc = mutationFunc;
    }

    public canUse(player: Player): boolean {
        return true;
    }
    public use(player: Player) {
        this.mutationFunc();
    }
    public useText(player: Player) {
        
    }
}

