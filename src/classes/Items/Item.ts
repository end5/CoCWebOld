import ItemDesc from './ItemDesc';
import Game from '../Game/Game';
import Player from '../Player';
import { SerializeInterface } from '../SerializeInterface';
import KeyObject from '../Utilities/KeyObject';

export enum ItemType {
    Material,
    KeyItem,
    Weapon,
    Armor,
    Consumable
}

export default abstract class Item extends KeyObject implements SerializeInterface {
    serialize(): string {
        let saveObject: object = {};
        saveObject["uniqueKey"] = this.uniqueKey;
        saveObject["itemType"] = this.itemType;
        return JSON.stringify(saveObject);
    }
    deserialize(saveObject: object) { };
    
    public static readonly DefaultValue: number = 6;
    public readonly itemType: ItemType;
    public readonly value: number;
    public readonly desc: ItemDesc;
    
    constructor(key: string, itemType: ItemType, itemDesc: ItemDesc, value: number = Item.DefaultValue) {
        super(key);
        this.itemType = itemType;
        this.value = value;
        this.desc = itemDesc;
    }

    abstract canUse(player: Player): boolean;

    abstract use(player: Player);

    abstract useText(player: Player);
}

