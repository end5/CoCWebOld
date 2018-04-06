import ConsumableName from './ConsumableName';
import Character from '../../Character/Character';
import Item from '../Item';
import ItemDesc from '../ItemDesc';
import ItemType from '../ItemType';

export default class Consumable extends Item {
    private readonly mutationFunc: () => void;
    constructor(key: ConsumableName, itemDesc: ItemDesc, value?: number, mutationFunc: () => void = null) {
        super(key, ItemType.Consumable, itemDesc, value);
        this.mutationFunc = mutationFunc;
    }

    public canUse(character: Character): boolean {
        return true;
    }

    public use(character: Character) {
        this.mutationFunc();
    }

    public useText(character: Character) {

    }
}
