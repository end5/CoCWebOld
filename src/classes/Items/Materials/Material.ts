import MaterialName from './MaterialName';
import DisplayText from '../../display/DisplayText';
import Player from '../../Player/Player';
import Item, { ItemType } from '../Item';
import ItemDesc from '../ItemDesc';

export default class Material extends Item {
    private readonly _useText: string;
    constructor(name: MaterialName, desc: ItemDesc, useText?: string, value?: number) {
        super(name, ItemType.Material, desc, value);
        this._useText = useText;
    }

    public canUse(player: Player): boolean {
        return true;
    }

    public use(player: Player) { }

    public useText(player: Player) {
        DisplayText.text(this._useText);
    }

    public serialize(): string {
        let saveObject = super.serialize();
        saveObject["_useText"] = this._useText;
        return JSON.stringify(saveObject);
    }
}