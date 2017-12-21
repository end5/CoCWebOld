import Item from './Item';
import ItemFactory from './ItemFactory';
import Game from '../Game/Game';
import { SerializeInterface } from '../SerializeInterface';

export default class ItemStack<T extends Item> implements SerializeInterface {
    private _item: Item;
    private _quantity: number;
    private _maxQuantity: number;

    public constructor(item: T = null, quantity: number = 0, maxQuantity: number = 5) {
        this._item = item;
        this._quantity = quantity;
        this._maxQuantity = maxQuantity;
    }

    public get item(): Item {
        return this._item;
    }

    public set item(item: Item) {
        this._item = item == null ? null : item;
    }

    public get quantity(): number {
        return this._quantity;
    }

    public set quantity(value: number) {
        if (this._item != null && value >= 0) {
            this._quantity = value <= this._maxQuantity ? value : this._maxQuantity;
            if (value == 0) {
                this._item = null;
            }
        }
    }

    public get maxQuantity(): number {
        return this._maxQuantity;
    }

    public set(itemStack: ItemStack<T>) {
        this._item = itemStack._item;
        this._quantity = itemStack._quantity;
        this._maxQuantity = itemStack._maxQuantity;
    }

    public split(amount: number): ItemStack<T> {
        if (this.quantity == 0) {
            return null;
        }
        else if (amount > 0) {
            let quantity: number = this.quantity - amount > 0 ? this.quantity - amount : 0;
            let returnItemStack: ItemStack<T> = new ItemStack<Item>(this.item, quantity);
            this.quantity -= quantity;

            return returnItemStack;
        }
    }

    public serialize(): string {
        let saveObject: object = {};
        saveObject["_item"] = this._item.serialize();
        saveObject["_quantity"] = this._quantity;
        saveObject["_maxQuantity"] = this._maxQuantity;
        return JSON.stringify(saveObject);
    }
    public deserialize(saveObject: object) {
        let item = saveObject["_item"] as Item;
        this._item = ItemFactory.create(item.type, item.name);
        this._quantity = saveObject["_quantity"];
        this._maxQuantity = saveObject["_maxQuantity"];
    }
}