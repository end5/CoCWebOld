import Item, { ItemName } from '../Items/Item';
import ItemFactory from '../Items/ItemFactory';
import ItemStack from '../Items/ItemStack';
import { SerializeInterface } from '../SerializeInterface';

export default class Inventory<T extends Item> implements SerializeInterface {
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

    public has(itemName: ItemName): boolean {
        for (let index = 0; index < this.itemSlots.length; index++) {
            if (this.itemSlots[index].item.name == itemName)
                return true;
        }
        return false;
    }

    public get(index: number): ItemStack<T> {
        if (index >= 0 && index < this.itemSlots.length) {
            return this.itemSlots[index];
        }
    }

    public countName(itemName: ItemName): number {
        let count: number = 0;
        for (let index = 0; index < this.itemSlots.length; index++) {
            if (this.itemSlots[index].item.name == itemName)
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

    private lowestQuantityItemStack(itemName: ItemName): ItemStack<Item>[] {
        return this.itemSlots.filter((itemStack: ItemStack<Item>) => {
            if (itemStack.item.name == itemName)
                return itemStack;
        }).sort((a: ItemStack<Item>, b: ItemStack<Item>) => {
            return b.quantity - a.quantity;
        });
    }

    public consumeItem(itemName: ItemName, amount: number = 1) {
        if (this.countName(itemName) >= amount) {
            let lowestItemStacks: ItemStack<Item>[] = this.lowestQuantityItemStack(itemName);
            while (amount > 0) {
                if (lowestItemStacks[0].quantity == 0)
                    lowestItemStacks = this.lowestQuantityItemStack(itemName);

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

    public serialize(): string {
        let saveObject: object = {};
        saveObject["length"] = this.itemSlots.length;
        for (let index = 0; index < this.itemSlots.length; index++) {
            saveObject[index] = this.itemSlots[index].serialize();
        }
        return JSON.stringify(saveObject);
    }
    public deserialize(saveObject: object) {
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
}