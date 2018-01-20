import ItemStack from './ItemStack';
import Item from '../Items/Item';
import ItemFactory from '../Items/ItemFactory';
import ISerializable from '../Utilities/ISerializable';
import { FilterOption, ReduceOption, SortOption } from '../Utilities/list';
import SerializableList from '../Utilities/SerializableList';

export default class Inventory<T extends Item> implements ISerializable<Inventory<T>> {
    private itemSlots: SerializableList<ItemStack<T>> = new SerializableList(ItemStack);

    public unlock(amount: number = 1) {
        while (amount > 0) {
            this.itemSlots.add(new ItemStack());
        }
    }

    public lock(amount: number = 1) {
        while (amount > 0) {
            this.itemSlots.remove(this.itemSlots.count - 1);
        }
    }

    public get slotCount(): number {
        return this.itemSlots.count;
    }

    public isEmpty(): boolean {
        for (const itemStack of this.itemSlots) {
            if (itemStack.quantity != 0)
                return false;
        }
        return true;
    }

    public has(itemName: string): boolean {
        return this.filterName(itemName).length > 0;
    }

    public get(index: number): ItemStack<T> {
        return this.itemSlots.get(index);
    }

    /**
     * Returns a sorted copy of the list using the provided sort option
     * @param option SortOption
     */
    public sort(option: SortOption<ItemStack<T>>): ItemStack<T>[] {
        return this.itemSlots.sort(option);
    }

    /**
     * Returns a filtered copy of the list using the provided filter option
     * @param option SortOption
     */
    public filter(option: FilterOption<ItemStack<T>>): ItemStack<T>[] {
        return this.itemSlots.filter(option);
    }

    /**
     * Reduces the list using reduce option provided
     * @param option SortOption
     */
    public reduce<U>(option: ReduceOption<ItemStack<T>, U>, initialValue: U): U {
        return this.itemSlots.reduce(option, initialValue);
    }

    public filterName(name: string): ItemStack<T>[] {
        return this.filter((itemStack: ItemStack<T>) => {
            return itemStack.item.name === name;
        });
    }

    public static TotalQuantity: ReduceOption<ItemStack<Item>, number> = (previousValue: number, currentValue: ItemStack<Item>, index: number, array: ItemStack<Item>[]) => {
        return previousValue + currentValue.quantity;
    };

    public static EmptySlot: FilterOption<ItemStack<Item>> = (a: ItemStack<Item>) => {
        if (a.quantity === 0)
            return true;
    };

    public static HighestQuantity: SortOption<ItemStack<Item>> = (a: ItemStack<Item>, b: ItemStack<Item>) => {
        return a.quantity - b.quantity;
    };

    public static LowestQuantity: SortOption<ItemStack<Item>> = (a: ItemStack<Item>, b: ItemStack<Item>) => {
        return b.quantity - a.quantity;
    };

    public consumeItem(itemName: string, amount: number = 1) {
        if (this.filterName(itemName).length >= amount) {
            const lowestItemStacks = this.filterName(itemName).sort(Inventory.LowestQuantity);
            for (const itemStack of lowestItemStacks) {
                if (itemStack.quantity === 0)
                    continue;
                if (amount === 0)
                    break;
                if (amount > itemStack.quantity) {
                    amount -= itemStack.quantity;
                    itemStack.quantity = 0;
                }
                else {
                    itemStack.quantity -= amount;
                    amount = 0;
                }
            }
        }
    }

    public serialize(): string {
        return JSON.stringify({
            itemSlots: this.itemSlots.serialize()
        });
    }

    public deserialize(saveObject: Inventory<T>) {
        this.itemSlots.deserialize(saveObject.itemSlots);
    }
}