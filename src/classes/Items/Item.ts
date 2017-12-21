import ArmorName from './Armors/ArmorName';
import ConsumableName from './Consumables/ConsumableName';
import ItemDesc from './ItemDesc';
import MaterialName from './Materials/MaterialName';
import WeaponName from './Weapons/WeaponName';
import Game from '../Game/Game';
import Player from '../Player/Player';
import { SerializeInterface } from '../SerializeInterface';
import LibraryEntry from '../Utilities/LibraryEntry';

export enum ItemType {
    Material,
    KeyItem,
    Weapon,
    Armor,
    Consumable
}

export type ItemName = WeaponName | ArmorName | ConsumableName | MaterialName;

export default abstract class Item implements SerializeInterface {
    public static readonly DefaultValue: number = 6;
    public readonly name: ItemName;
    public readonly type: ItemType;
    public readonly value: number;
    public readonly desc: ItemDesc;
    
    constructor(name: ItemName, type: ItemType, desc: ItemDesc, value: number = Item.DefaultValue) {
        this.name = name;
        this.type = type;
        this.value = value;
        this.desc = desc;
    }

    abstract canUse(player: Player): boolean;

    abstract use(player: Player);

    abstract useText(player: Player);

    public describe(): string {
        return this.desc.description + " (Cost: " + this.value + ")";
    }
    
    public serialize(): string {
        return JSON.stringify({
            name: this.name,
            type: this.type
        });
    }
    
    public deserialize(saveObject: object) { };
}

