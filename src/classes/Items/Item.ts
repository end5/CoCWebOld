import ItemDesc from './ItemDesc';
import Player from '../Player';

export default abstract class Item extends ItemDesc {
    public static readonly DefaultValue: number = 6;
    constructor(key: string, shortName: string = null, longName: string = null, value: number = Item.DefaultValue, description: string = null) {
        super(key, shortName, longName, value, description);
    }

    abstract canUse(player: Player): boolean;

    abstract use(player: Player);

    abstract useText(player: Player);
}

