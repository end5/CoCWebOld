import Player from "../Player";
import Inventory from "../Inventory/Inventory";
import Item from "../Items/Item";
import MainScreen, { ClickFunction } from "./MainScreen";
import Game from "../Game/Game";
import ItemStack from "../Items/ItemStack";
import CombatMenu from "./CombatMenu";
import PlayerMenu from "./PlayerMenu";
import PlayerInventoryMenu from "./PlayerInventoryMenu";

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
            8 = 
        7 = abandon

    if (inv.length > 7)
        6 = next page
    if (page == 2)
        6 = prev page
*/
type ItemCallback = (player: Player, inventory: Inventory<Item>, itemSlot: number) => void;

export default class InventoryDisplay {
    private static prevMenu: ClickFunction;
    private static reverseActionFunc: Function;
    private static heldItem: ItemStack<Item>;
    public static isHoldingItem(): boolean {
        return InventoryDisplay.heldItem != null;
    }

    public static addItem(item: Item) {
        if (!InventoryDisplay.heldItem) {
            InventoryDisplay.heldItem = new ItemStack(item, 1);
        }
    }

    /**
        if not holding item
            useItem(player, inv, itemslot)
                if (inv.get(itemSlot).canUse)
                    item = inv.remove(itemslot, 1)
                    item.use
                    item.useText
            display player inventory
        else
            replaceItem(player, inv, itemslot)
                inv.get(itemslot) = helditem
            putback
                reverseAction
                reverseAction = null
                display other inventory
            use now
                helditem.use
                helditem.useText
                reverseAction = null
                display other inventory
            abandon
                helditem = null
                reverseAction = null
                display other inventory
    */
    public static displayPlayersInventory(player: Player) {
        if (!InventoryDisplay.isHoldingItem()) {
            InventoryDisplay.displayInventoryButtons(player, player.inventory.items, InventoryDisplay.useItem, PlayerInventoryMenu.display);
        }
        else {
            MainScreen.text("There is no room for " + InventoryDisplay.heldItem.item.longName + " in your inventory.  You may replace the contents of a pouch with " + InventoryDisplay.heldItem.item.longName + " or abandon it.");
            InventoryDisplay.displayInventoryButtons(player, player.inventory.items, InventoryDisplay.putHeldItemIntoInventory, function () {
                MainScreen.doNext(InventoryDisplay.prevMenu);
            });
            MainScreen.addButton(7, "Put Back", function () {
                InventoryDisplay.reverseActionFunc();
                InventoryDisplay.reverseActionFunc = null;
                MainScreen.doNext(InventoryDisplay.prevMenu);
            });
            MainScreen.addButton(8, "Use Now", function () {
                if (InventoryDisplay.heldItem.item.canUse(player)) {
                    InventoryDisplay.heldItem.item.use(player);
                    InventoryDisplay.heldItem.item.useText(player);
                    InventoryDisplay.heldItem = null;
                    InventoryDisplay.reverseActionFunc = null;
                    MainScreen.doNext(InventoryDisplay.prevMenu);
                }
            });
            MainScreen.addButton(9, "Abandon", function () {
                InventoryDisplay.heldItem = null;
                InventoryDisplay.reverseActionFunc = null;
                MainScreen.doNext(InventoryDisplay.prevMenu);
            });
        }

    }

    /*
        if room in players inventory
            putItemInPlayerEmptySlot(player, inv, itemslot)
                emptyslot = player.getemptyslot()
                emptyslot = helditem
            display other inv
        else
            holdItem(player, inv, itemslot)
                helditem = inv.remove(itemslot, 1)
                reverseAction = function()
                    itemstack = inv.get(itemslot)
                    if (itemstack.quantity == 0)
                        itemstack = helditem
                    else
                        itemstack.quantity += helditem.quantity
                        helditem = null
            display players inv
    */
    public static displayOtherInventory(player: Player, otherInventory: Inventory<Item>) {
        if (player.inventory.items.hasEmptySlot()) {
            InventoryDisplay.displayInventoryButtons(player, otherInventory, InventoryDisplay.putHeldItemInPlayerEmptySlot, function () {
                MainScreen.doNext(InventoryDisplay.prevMenu);
            });
        }
        else {
            InventoryDisplay.displayInventoryButtons(player, otherInventory, InventoryDisplay.holdItem, function () {
                MainScreen.doNext(PlayerInventoryMenu.display);
            });
        }
    }

    public static unequipFunction(player: Player): ClickFunction {
        return function () {
            player.inventory.weapon.removeText();
            InventoryDisplay.heldItem = new ItemStack(player.inventory.weapon.unequip(player), 1);
            PlayerInventoryMenu.display(player);
        };
    }

    private static useItem(player: Player, inventory: Inventory<Item>, itemSlot: number) {
        let itemStack = inventory.get(itemSlot);
        if (itemStack && itemStack.item.canUse(player)) {
            InventoryDisplay.createReverseAction(inventory, itemSlot);
            itemStack = itemStack.split(1);
            itemStack.item.use(player);
            itemStack.item.useText(player);
        }
    }

    private static putHeldItemIntoInventory(player: Player, inventory: Inventory<Item>, itemSlot: number) {

        if (inventory.get(itemSlot).item == InventoryDisplay.heldItem.item)
            MainScreen.text("You discard " + InventoryDisplay.heldItem.item.longName + " from the stack to make room for the new one.");
        else if (inventory.get(itemSlot).quantity == 1)
            MainScreen.text("You throw away " + inventory.get(itemSlot).item.longName + " and replace it with " + InventoryDisplay.heldItem.item.longName + ".");
        else
            MainScreen.text("You throw away " + inventory.get(itemSlot).item.longName + "(x" + inventory.get(itemSlot).quantity + ") and replace it with " + InventoryDisplay.heldItem.item.longName + ".");
        inventory.set(itemSlot, InventoryDisplay.heldItem);
        InventoryDisplay.heldItem = null;
    }

    private static putHeldItemInPlayerEmptySlot(player: Player, inventory: Inventory<Item>, itemSlot: number) {
        InventoryDisplay.putHeldItemIntoInventory(player, player.inventory.items, player.inventory.items.getEmptySlotIndex());
    }

    private static holdItem(player: Player, inventory: Inventory<Item>, itemSlot: number) {
        InventoryDisplay.heldItem = inventory.get(itemSlot).split(1);
        InventoryDisplay.createReverseAction(inventory, itemSlot);
    }

    private static createReverseAction(inventory: Inventory<Item>, itemSlot: number) {
        InventoryDisplay.reverseActionFunc = function () {
            let itemStack = inventory.get(itemSlot);
            if (itemStack.quantity == 0)
                inventory.set(itemSlot, InventoryDisplay.heldItem);
            else
                itemStack.quantity += InventoryDisplay.heldItem.quantity;
            InventoryDisplay.heldItem = null;
        }
    }

    public static reverseAction() {
        InventoryDisplay.reverseActionFunc();
    }

    private static displayInventoryButtons(player: Player, displayedInv: Inventory<Item>, itemCallback: ItemCallback, clickFunction: ClickFunction) {
        MainScreen.hideButtons();
        for (let index = 0; index < displayedInv.length; index++) {
            if (displayedInv.get(index).quantity > 0) {
                MainScreen.addButton(index, (displayedInv.get(index).item.shortName + " x" + displayedInv.get(index).quantity), function () {
                    itemCallback(player, displayedInv, index);
                    clickFunction(player);
                });
            }
        }
    }
}