import ItemDesc from "./ItemDesc";
import Player from "../Player";

export default abstract class Item extends ItemDesc {
    constructor(key: string, shortName: string = null, longName: string = null, value: number = 0, description: string = null) {
        super(key, shortName, longName, value, description);
    }

    abstract canUse(player: Player): boolean;

    abstract use(player: Player);
}
