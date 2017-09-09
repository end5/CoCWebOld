import ItemType from "./ItemType";

export default class ItemStack {
    public static MAX_ITEM_AMOUNT = 5;

    private _itemType: ItemType;
    private _quantity: number;
    public constructor(itemType: ItemType = ItemType.Nothing, quantity: number = 0) {
        this._itemType = itemType;
        this._quantity = quantity;
    }

    public get itemType(): ItemType {
        return this._itemType;
    }

    public set itemType(itemType: ItemType) {
        this._itemType = itemType == null ? ItemType.Nothing : itemType;
    }

    public get quantity(): number {
        return this._quantity;
    }

    public set quantity(value: number) {
        if (this._itemType != ItemType.Nothing && value >= 0) {
            this._quantity = value;
            if (value == 0) {
                this._itemType = ItemType.Nothing;
            }
        }
    }


}