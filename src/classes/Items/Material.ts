import Item from "./Item";
import Player from "../Player";
import MainScreen from "../display/MainScreen";

export default class Material extends Item {
    private readonly useText: string;
    constructor(key: string, shortName: string = null, longName: string = null, value: number = 0, description: string = null, useText: string) {
        super(key, shortName, longName, value, description);
        this.useText = useText;
    }

    public canUse(player: Player): boolean {
        return true;
    }

    public use(player: Player) {
        MainScreen.text(this.useText);
    }
}