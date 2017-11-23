import DisplayText from './DisplayText';
import { ClickFunction } from './Elements/ButtonElement';
import MainScreen from './MainScreen';
import PlayerInventoryMenu from './Menus/PlayerInventoryMenu';
import Game from '../Game/Game';
import Inventory from '../Inventory/Inventory';
import Item from '../Items/Item';
import ItemStack from '../Items/ItemStack';
import Player from '../Player/Player';

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
type ItemCallback = (player: Player, itemSlot: ItemStack<Item>) => void;

export default class InventoryDisplay {
    private static prevMenu: ClickFunction;
    private static reverseActionFunc: Function;
    private static floorItems: ItemStack<Item>[] = [];
    private static heldItem: ItemStack<Item>;

    public static isHoldingItem(): boolean {
        return InventoryDisplay.heldItem != null;
    }

    public static addItem(item: Item) {
        InventoryDisplay.floorItems.push(new ItemStack(item, 1));
        if (!InventoryDisplay.heldItem) {
            InventoryDisplay.heldItem = InventoryDisplay.floorItems.shift();
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
            DisplayText.text("There is no room for " + InventoryDisplay.heldItem.item.desc.longName + " in your inventory.  You may replace the contents of a pouch with " + InventoryDisplay.heldItem.item.desc.longName + " or abandon it.");
            InventoryDisplay.displayInventoryButtons(player, player.inventory.items, InventoryDisplay.putHeldItemIntoInventory, function () {
                MainScreen.doNext(InventoryDisplay.prevMenu);
            });
            MainScreen.getBottomButton(7).modify("Put Back", function () {
                InventoryDisplay.reverseActionFunc();
                InventoryDisplay.reverseActionFunc = null;
                MainScreen.doNext(InventoryDisplay.prevMenu);
            });
            MainScreen.getBottomButton(8).modify("Use Now", function () {
                if (InventoryDisplay.heldItem.item.canUse(player)) {
                    InventoryDisplay.heldItem.item.use(player);
                    InventoryDisplay.heldItem.item.useText(player);
                    InventoryDisplay.heldItem = InventoryDisplay.floorItems.shift();
                    InventoryDisplay.reverseActionFunc = null;
                    MainScreen.doNext(InventoryDisplay.prevMenu);
                }
            });
            MainScreen.getBottomButton(9).modify("Abandon", function () {
                InventoryDisplay.heldItem = InventoryDisplay.floorItems.shift();
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
            InventoryDisplay.heldItem = new ItemStack(player.inventory.weaponSlot.equipment, 1);
            player.inventory.weaponSlot.equipment.unequipText();
            player.inventory.weaponSlot.equipment.unequip(player);
            PlayerInventoryMenu.display(player);
        };
    }

    private static useItem(player: Player, itemSlot: ItemStack<Item>) {
        if (itemSlot && itemSlot.item.canUse(player)) {
            InventoryDisplay.createReverseAction(itemSlot);
            itemSlot = itemSlot.split(1);
            itemSlot.item.use(player);
            itemSlot.item.useText(player);
        }
    }

    private static putHeldItemIntoInventory(player: Player, itemSlot: ItemStack<Item>) {
        if (itemSlot.item == InventoryDisplay.heldItem.item)
            DisplayText.text("You discard " + InventoryDisplay.heldItem.item.desc.longName + " from the stack to make room for the new one.");
        else if (itemSlot.quantity == 1)
            DisplayText.text("You throw away " + itemSlot.item.desc.longName + " and replace it with " + InventoryDisplay.heldItem.item.desc.longName + ".");
        else
            DisplayText.text("You throw away " + itemSlot.item.desc.longName + "(x" + itemSlot.quantity + ") and replace it with " + InventoryDisplay.heldItem.item.desc.longName + ".");
        itemSlot.item = InventoryDisplay.heldItem.item;
        itemSlot.quantity = InventoryDisplay.heldItem.quantity;
        InventoryDisplay.heldItem = null;
    }

    private static putHeldItemInPlayerEmptySlot(player: Player, itemSlot: ItemStack<Item>) {
        InventoryDisplay.putHeldItemIntoInventory(player, player.inventory.items.getEmptySlot());
    }

    private static holdItem(player: Player, itemSlot: ItemStack<Item>) {
        InventoryDisplay.heldItem = itemSlot.split(1);
        InventoryDisplay.createReverseAction(itemSlot);
    }

    private static createReverseAction (itemSlot: ItemStack<Item>) {
        InventoryDisplay.reverseActionFunc = function () {
            if (itemSlot.quantity == 0) {
                itemSlot.item = InventoryDisplay.heldItem.item;
                itemSlot.quantity = InventoryDisplay.heldItem.quantity;
            }
            else
                itemSlot.quantity += InventoryDisplay.heldItem.quantity;
            InventoryDisplay.heldItem = null;
        }
    }

    public static reverseAction() {
        InventoryDisplay.reverseActionFunc();
    }

    private static displayInventoryButtons(player: Player, displayedInv: Inventory<Item>, itemCallback: ItemCallback, clickFunction: ClickFunction) {
        MainScreen.hideBottomButtons();
        for (let index = 0; index < displayedInv.slotCount; index++) {
            if (displayedInv.get(index).quantity > 0) {
                MainScreen.getBottomButton(index).modify(displayedInv.get(index).item.desc.shortName + " x" + displayedInv.get(index).quantity, function () {
                    itemCallback(player, displayedInv.get(index));
                    clickFunction(player);
                });
            }
        }
    }
}