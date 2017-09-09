import ItemType from "./ItemType";
import Player from "../Player";

export default abstract class Useable extends ItemType {
    constructor(id: string, shortName: string = null, longName: string = null, value: number = 0, description: string = null) {
        super(id, shortName, longName, value, description);
    }

    abstract canUse(player: Player): boolean;

    abstract use(player: Player);
}

