import Item, { ItemType } from './Item';
import ItemDesc from './ItemDesc';
import DisplayText from '../display/DisplayText';
import Game from '../Game/Game';
import Player from '../Player/Player';

export default class Material extends Item {
    serialize(): string {
        let saveObject = super.serialize();
        saveObject["_useText"] = this._useText;
        return JSON.stringify(saveObject);
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
        DisplayText.text(this._useText);
    }
}