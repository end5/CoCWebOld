import ItemDesc from './ItemDesc';
import ItemType from './ItemType';
import Character from '../Character/Character';
import ISerializable from '../Utilities/ISerializable';

export default abstract class Item implements ISerializable<Item> {
    public static readonly DefaultValue: number = 6;
    public readonly name: string;
    public readonly type: ItemType;
    public readonly value: number;
    public readonly desc: ItemDesc;

    constructor(name: string, type: ItemType, desc: ItemDesc, value: number = Item.DefaultValue) {
        this.name = name;
        this.type = type;
        this.value = value;
        this.desc = desc;
    }

    public abstract canUse(character: Character): boolean;

    public abstract use(character: Character);

    public abstract useText(character: Character);

    public describe(): string {
        return this.desc.description + " (Cost: " + this.value + ")";
    }

    public serialize(): string {
        return JSON.stringify({
            name: this.name,
            type: this.type
        });
    }

    public deserialize(saveObject: Item) { }
}
