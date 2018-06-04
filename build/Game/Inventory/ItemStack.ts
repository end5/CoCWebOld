import { ISerializable } from '../../Engine/Utilities/ISerializable';
import { Item } from '../Items/Item';
import { ItemFactory } from '../Items/ItemFactory';

export class ItemStack<T extends Item> implements ISerializable<ItemStack<T>> {
    public item: Item;
    private amount: number;
    private maxAmount: number;

    public constructor(item?: T, quantity: number = 0, maxQuantity: number = 5) {
        this.item = item;
        this.amount = quantity;
        this.maxAmount = maxQuantity;
    }

    public get quantity(): number {
        return this.amount;
    }

    public set quantity(value: number) {
        if (this.item && value >= 0) {
            this.amount = value <= this.maxAmount ? value : this.maxAmount;
            if (value === 0) {
                this.item = undefined;
            }
        }
    }

    public get maxQuantity(): number {
        return this.maxAmount;
    }

    public set(itemStack: ItemStack<T>) {
        this.item = itemStack.item;
        this.amount = itemStack.amount;
        this.maxAmount = itemStack.maxAmount;
    }

    public split(amount: number): ItemStack<T> {
        if (this.quantity === 0) {
            return undefined;
        }
        else if (amount > 0) {
            const quantity: number = this.quantity - amount > 0 ? this.quantity - amount : 0;
            const returnItemStack: ItemStack<T> = new ItemStack<Item>(this.item, quantity);
            this.quantity -= quantity;

            return returnItemStack;
        }
    }

    public serialize(): object | undefined {
        return this.item ? {
            item: this.item.serialize(),
            amount: this.amount,
            maxAmount: this.maxAmount
        } : undefined;
    }

    public deserialize(saveObject: ItemStack<T>) {
        if (saveObject) {
            this.item = ItemFactory.get(saveObject.item.type, saveObject.item.name);
            this.amount = saveObject.amount;
            this.maxAmount = saveObject.maxAmount;
        }
    }
}
