import Item from "./Item";
import ItemStack from "./ItemStack";
import Weapon from "./Weapons/Weapon";
import Armor from "./Armors/Armor";

export default class InventoryManager {
    private itemSlots: ItemStack<Item>[];
    private weapon: Weapon;
    private armor: Armor;
    public armorDescMod: string;

    public constructor() {
        this.itemSlots = [];
        this.armorDescMod = "";
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

    public has(item: Item, minQuantity: number = 1): boolean {
        return this.count(item) >= minQuantity;
    }

    public get length(): number {
        return this.itemSlots.length;
    }

    public count(item: Item): number {
        let count: number = 0;
        for (let index = 0; index < this.itemSlots.length; index++) {
            if (this.itemSlots[index].item == item)
                count += this.itemSlots[index].quantity;
        }
        return count;
    }

    public roomInExistingStack(item: Item): boolean {
    for (let index = 0; index < this.itemSlots.length; index++)
        if (this.itemSlots[index].item == item && this.itemSlots[index].quantity != 0 && this.itemSlots[index].quantity < ItemStack.MAX_ITEM_AMOUNT)
                return true;
        return false;
    }

    public hasEmptySlot(): boolean {
    for (let index = 0; index < this.itemSlots.length; index++)
            if (this.itemSlots[index].quantity <= 0)
                return true;
        return false;
    }

    public getEmptySlot(): number {
    for (let index = 0; index < this.itemSlots.length; index++)
            if (this.itemSlots[index].quantity <= 0)
                return index;
        return -1;
    }


    public destroyItems(item: Item, numOfItemToRemove: number): boolean {
        for (let index = 0; index < this.itemSlots.length; index++)
            if (this.itemSlots[index].item == item)
                while (this.itemSlots[index].quantity > 0 && numOfItemToRemove > 0) {
                    this.itemSlots[index].quantity--;
                    numOfItemToRemove--;
                }
        return numOfItemToRemove <= 0;
    }

    private lowestQuantityItemStack(item: Item): ItemStack<Item>[] {
        return this.itemSlots.filter((itemStack: ItemStack<Item>) => {
            if (itemStack.item == item)
                return itemStack;
        }).sort((a: ItemStack<Item>, b: ItemStack<Item>) => {
                return b.quantity - a.quantity;
        });
    }

    public consumeItem(itemType: Item, amount: number = 1) {
        if (this.count(itemType) >= amount) {
            let lowestItemStacks: ItemStack<Item>[] = this.lowestQuantityItemStack(itemType);
            while (amount > 0) {
                if (lowestItemStacks[0].quantity == 0)
                    lowestItemStacks = this.lowestQuantityItemStack(itemType);

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