import Item from "./Item";

export default class ItemStack<T extends Item> {
    public static MAX_ITEM_AMOUNT = 5;

    private _item: Item;
    private _quantity: number;
    public constructor(item: T = null, quantity: number = 0) {
        this._item = item;
        this._quantity = quantity;
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
            this._quantity = value;
            if (value == 0) {
                this._item = null;
            }
        }
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
}