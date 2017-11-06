import Item, { ItemType } from './Item';
import ItemDesc from './ItemDesc';
import MainScreen from '../display/MainScreen';
import Game from '../Game/Game';
import Player from '../Player';

export default class Material extends Item {
    serialize(): string {
        let saveObject = {};
        saveObject["Item"] = super.serialize();
        saveObject["_useText"] = this._useText;
        return JSON.stringify(saveObject);
    }
    deserialize(saveObject: object) {
        if (Game.libraries.materials.has(saveObject["objectKey"]))
            Game.libraries.materials.get(saveObject["objectKey"]);
    }
    private readonly _useText: string;
    constructor(key: string, itemDesc: ItemDesc, useText?: string, value?: number) {
        super(key, ItemType.Material, itemDesc, value);
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