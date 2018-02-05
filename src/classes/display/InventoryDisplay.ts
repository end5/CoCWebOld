import DisplayText from './DisplayText';
import { ClickFunction } from './Elements/ButtonElement';
import MainScreen from './MainScreen';
import Character from '../Character/Character';
import Inventory from '../Inventory/Inventory';
import ItemStack from '../Inventory/ItemStack';
import Item from '../Items/Item';

/* better inventory system
    other inv = null
    helditem = null
    page = 0

    buttons
    0	1	2	3	4
    5	6	7	8	9

    players inv
        9 = back
        8 = swap - unavailable in combat
        7 = unequip weapon

    swap menu - chests and racks open this menu
        click = pick up itemstack
        9 = back
        if (other inv)
            8 = swap
        7 = abandon

    if (inv.length > 7)
        6 = next page
    if (page == 2)
        6 = prev page
*/
type ItemCallback<T extends Item> = (itemStack: ItemStack<T>, pickedUpItem?: ItemStack<T>) => void;
type ReverseAction = () => void;

interface AddItemsRequest<T extends Item> {
    character: Character;
    itemList: ItemStack<T>[];
    menuToDisplayUponFinish: ClickFunction;
    otherInventory: Inventory<T>;
    reverseActionFunc: ReverseAction;
}

export default class InventoryDisplay {
    /**
     * Displays character's item inventory.
     * @param character
     * @param prevMenu The menu to go to when the back button is pressed.
     */
    public static inventoryCharacter(character: Character, prevMenu: ClickFunction) {
        const buttonText = [];
        const buttonFunc = [];
        const inventory = character.inventory.items;
        for (let index = 0; index < inventory.slotCount; index++) {
            const itemSlot = inventory.get(index);
            if (itemSlot.quantity > 0) {
                buttonText.push(itemSlot.item.desc.shortName + " x" + itemSlot.quantity);
                buttonFunc.push(() => {
                    itemSlot.quantity--;
                    itemSlot.item.use(character);
                    itemSlot.item.useText(character);
                });
            }
        }

        MainScreen.displayChoices(buttonText, buttonFunc, ["Back"], [prevMenu]);
    }

    /**
     * Inspect an inventory and take items from it.
     * @param inventory The inventory to inspect.
     * @param character The character inspecting the inventory.
     * @param prevMenu The menu to return to by pressing Back.
     */
    public static inventoryInspect<T extends Item>(inventory: Inventory<T>, character: Character, prevMenu: ClickFunction) {
        const buttonText = [];
        const buttonFunc = [];
        const charInv = character.inventory.items;
        for (let index = 0; index < inventory.slotCount; index++) {
            const itemSlot = inventory.get(index);
            if (itemSlot.quantity > 0) {
                buttonText.push(itemSlot.item.desc.shortName + " x" + itemSlot.quantity);
                buttonFunc.push(() => {
                    const pickedUpItem = itemSlot.split(1);
                    const itemsCannotAdd = character.inventory.items.addItems([pickedUpItem]);
                    if (itemsCannotAdd.length > 0) {
                        const request = InventoryDisplay.createAddItemsRequest(character, itemsCannotAdd, () => {
                            InventoryDisplay.inventoryInspect(inventory, character, prevMenu);
                        }, inventory);
                        request.reverseActionFunc = InventoryDisplay.createReverseAction(itemSlot, pickedUpItem);
                        InventoryDisplay.invFull(request);
                    }
                });
            }
        }
        MainScreen.displayChoices(buttonText, buttonFunc, ["Back"], [prevMenu]);
    }

    private static createReverseAction<T extends Item>(itemSlot: ItemStack<T>, pickedUpItem: ItemStack<T>): ReverseAction {
        return () => {
            if (itemSlot.quantity === 0) {
                itemSlot.item = pickedUpItem.item;
                itemSlot.quantity += pickedUpItem.quantity;
            }
            else
                itemSlot.quantity += pickedUpItem.quantity;
        };
    }

    /**
     * The characters inventory is full and the user must decide what to do with the items.
     * @param character The character that has no room in its inventory.
     * @param itemsToAdd The items that cannot be added to the characters inventory.
     * @param nextMenu The menu to go to once the decision is made.
     */
    public static inventoryFull<T extends Item>(character: Character, itemsToAdd: ItemStack<T>[], nextMenu: ClickFunction) {
        const request = InventoryDisplay.createAddItemsRequest(character, itemsToAdd, nextMenu);
        InventoryDisplay.invFull(request);
    }

    private static invFull<T extends Item>(request: AddItemsRequest<T>) {
        const buttonText = [];
        const buttonFunc = [];
        const inventory = request.character.inventory.items;
        const itemToAdd = request.itemList[0];
        for (let index = 0; index < inventory.slotCount; index++) {
            const itemSlot = inventory.get(index);
            if (itemSlot.quantity > 0) {
                buttonText.push(itemSlot.item.desc.shortName + " x" + itemSlot.quantity);
                buttonFunc.push(InventoryDisplay.discardFromInventory(itemSlot, itemToAdd));
            }
        }
        if (request.itemList.length > 0) {
            DisplayText("There is no room for " + itemToAdd.item.desc.longName + " in your inventory.  You may replace the contents of a pouch with " + itemToAdd.item.desc.longName + " or abandon it.");
            const fixedTextList = [];
            const fixedFuncList = [];
            if (request.reverseActionFunc !== undefined) {
                fixedTextList.push("Put Back");
                fixedFuncList.push(InventoryDisplay.putBack(request));
            }
            fixedTextList.push("Use Now");
            fixedFuncList.push(InventoryDisplay.useNow(request));
            fixedTextList.push("Abandon");
            fixedFuncList.push(InventoryDisplay.abandon(request));
            MainScreen.displayChoices(buttonText, buttonFunc, ["Back"], [request.menuToDisplayUponFinish]);
        }

    }

    private static discardFromInventory<T extends Item>(slotInInv: ItemStack<T>, itemToAdd: ItemStack<T>): ClickFunction {
        return () => {
            if (slotInInv.item === itemToAdd.item)
                DisplayText("You discard " + itemToAdd.item.desc.longName + " from the stack to make room for the new one.");
            else if (slotInInv.quantity === 1)
                DisplayText("You throw away " + slotInInv.item.desc.longName + " and replace it with " + itemToAdd.item.desc.longName + ".");
            else
                DisplayText("You throw away " + slotInInv.item.desc.longName + "(x" + slotInInv.quantity + ") and replace it with " + itemToAdd.item.desc.longName + ".");
            slotInInv.item = itemToAdd.item;
            slotInInv.quantity = itemToAdd.quantity;
        };
    }

    private static createAddItemsRequest<T extends Item>(character: Character, itemStackList: ItemStack<T>[], prevMenu: ClickFunction, otherInventory?: Inventory<T>): AddItemsRequest<T> {
        return {
            character,
            itemList: itemStackList,
            menuToDisplayUponFinish: prevMenu,
            otherInventory,
            reverseActionFunc: undefined
        };
    }

    private static putBack<T extends Item>(request: AddItemsRequest<T>): ClickFunction {
        return () => {
            request.reverseActionFunc();
            request.reverseActionFunc = null;
            InventoryDisplay.inventoryInspect(request.otherInventory, request.character, request.menuToDisplayUponFinish);
        };
    }

    private static useNow<T extends Item>(request: AddItemsRequest<T>): ClickFunction {
        return () => {
            const itemToAdd = request.itemList[0];
            if (itemToAdd.item.canUse(request.character)) {
                itemToAdd.item.use(request.character);
                itemToAdd.item.useText(request.character);
                request.reverseActionFunc = null;
                InventoryDisplay.destroyItem(request);
            }
        };
    }

    private static abandon<T extends Item>(request: AddItemsRequest<T>): ClickFunction {
        return () => {
            InventoryDisplay.destroyItem(request);
        };
    }

    private static destroyItem<T extends Item>(request: AddItemsRequest<T>) {
        const itemToDestroy = request.itemList[0];
        itemToDestroy.quantity--;
        if (itemToDestroy.quantity <= 0)
            request.itemList.shift();
        if (request.itemList.length > 0)
            InventoryDisplay.invFull(request);
        else
            MainScreen.doNext(request.menuToDisplayUponFinish);
    }
}
