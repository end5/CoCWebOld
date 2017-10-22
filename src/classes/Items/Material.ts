import Item from './Item';
import MainScreen from '../display/MainScreen';
import Player from '../Player';

export default class Material extends Item {
    private readonly _useText: string;
    constructor(key: string, shortName: string = null, longName: string = null, value: number = 0, description: string = null, useText: string) {
        super(key, shortName, longName, value, description);
        this._useText = useText;
    }

    public canUse(player: Player): boolean {
        return true;
    }

    public use(player: Player) {
    }

    public useText(player: Player) {
        MainScreen.text(this._useText);
    }
}