import ConsumableName from './ConsumableName';
import Player from '../../Player/Player';
import Item from '../Item';
import ItemDesc from '../ItemDesc';
import ItemType from '../ItemType';

export default class Consumable extends Item {
    private readonly mutationFunc: () => void;
    constructor(key: ConsumableName, itemDesc: ItemDesc, value?: number, mutationFunc: () => void = null) {
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
