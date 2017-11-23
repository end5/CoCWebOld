import Item from '../Items/Item';
import ItemFactory from '../Items/ItemFactory';
import ItemStack from '../Items/ItemStack';
import { SerializeInterface } from '../SerializeInterface';

export default class Inventory<T extends Item> implements SerializeInterface {
    serialize(): string {
        let saveObject: object = {};
        saveObject["length"] = this.itemSlots.length;
        for (let index = 0; index < this.itemSlots.length; index++) {
            saveObject[index] = this.itemSlots[index].serialize();
        }
        return JSON.stringify(saveObject);
    }
    deserialize(saveObject: object) {
        if (!saveObject["length"] || saveObject["length"] < 0) {
            console.error("Inventory amount non zero.");
            return;
        }
        this.itemSlots = [];
        for (let index = 0; index < saveObject["length"]; index++) {
            this.itemSlots.push(new ItemStack());
            this.itemSlots[index].deserialize(saveObject[index]);
        }
    }

    private itemSlots: ItemStack<T>[];

    public constructor() {
        this.itemSlots = [];
    }

    public unlock(amount: number = 1) {
        if (amount > 0) {
            this.itemSlots.length += amount;

            for (let index = 0; index < this.itemSlots.length; index++)
                if (this.itemSlots[index] == undefined)
                    this.itemSlots[index] = new ItemStack();
        }
    }

    public lock(amount: number = 1) {
        if (amount > 0 && this.itemSlots.length - amount >= 0) {
            this.itemSlots.length = amount;
        }
    }

    public get slotCount(): number {
        return this.itemSlots.length;
    }

    public isEmpty(): boolean {
        for (let index = 0; index < this.itemSlots.length; index++) {
            if (this.itemSlots[index].quantity != 0)
                return false;
        }
        return true;
    }

    public has(type: string): boolean {
        for (let index = 0; index < this.itemSlots.length; index++) {
            if (this.itemSlots[index].item.uniqueKey == type)
                return true;
        }
        return false;
    }

    public get(index: number): ItemStack<T> {
        if (index >= 0 && index < this.itemSlots.length) {
            return this.itemSlots[index];
        }
    }

    public countType(type: string): number {
        let count: number = 0;
        for (let index = 0; index < this.itemSlots.length; index++) {
            if (this.itemSlots[index].item.uniqueKey == type)
                count += this.itemSlots[index].quantity;
        }
        return count;
    }

    public hasEmptySlot(): boolean {
        for (let index = 0; index < this.itemSlots.length; index++)
            if (this.itemSlots[index].quantity <= 0)
                return true;
        return false;
    }

    public getEmptySlot(): ItemStack<Item> {
        for (let index = 0; index < this.itemSlots.length; index++)
            if (this.itemSlots[index].quantity <= 0)
                return this.itemSlots[index];
        return null;
    }


    private lowestQuantityItemStack(item: Item): ItemStack<Item>[] {
        return this.itemSlots.filter((itemStack: ItemStack<Item>) => {
            if (itemStack.item == item)
                return itemStack;
        }).sort((a: ItemStack<Item>, b: ItemStack<Item>) => {
            return b.quantity - a.quantity;
        });
    }

    public consumeItem(item: Item, amount: number = 1) {
        if (this.countType(item.uniqueKey) >= amount) {
            let lowestItemStacks: ItemStack<Item>[] = this.lowestQuantityItemStack(item);
            while (amount > 0) {
                if (lowestItemStacks[0].quantity == 0)
                    lowestItemStacks = this.lowestQuantityItemStack(item);

                if (amount > lowestItemStacks[0].quantity) {
                    amount -= lowestItemStacks[0].quantity;
                    lowestItemStacks[0].quantity = 0;
                }
                else {
                    lowestItemStacks[0].quantity -= amount;
                    amount = 0;
                }
            }
        }
    }
}