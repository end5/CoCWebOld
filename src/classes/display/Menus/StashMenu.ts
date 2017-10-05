import Player from "../Player";
import MainScreen from "./MainScreen";
import Flags, { FlagEnum } from "../Game/Flags";
import Game from "../Game/Game";
import PlayerMenu from "./PlayerMenu";
import Inventory from "../Inventory/Inventory";
import Item from "../Items/Item";

export default class StashMenu {
    public static display(player: Player) {
        MainScreen.clearText();
        spriteSelect(-1);
        MainScreen.hideButtons();
        if (Flags.list[FlagEnum.ANEMONE_KID] > 0) {
            Game.sceneManager.anemoneScene.anemoneBarrelDescription();
            if (model.time.hours >= 6)
                MainScreen.addButton(4, "Anemone", Game.sceneManager.anemoneScene.approachAnemoneBarrel);
        }
        if (player.hasKeyItem("Camp - Chest")) {
            MainScreen.text("You have a large wood and iron chest to help store excess items located near the portal entrance.\n\n");
            MainScreen.addButton(0, "Chest Store", pickItemToTakeFromStorage);
            if (!Game.campStorage.chest.isEmpty())
                MainScreen.addButton(1, "Chest Take", pickItemToTakeFromStorage);
        }
        //Weapon Rack
        if (Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00254] > 0) {
            MainScreen.text("There's a weapon rack set up here, set up to hold up to nine various weapons.");
            MainScreen.addButton(2, "W.Rack Put", pickItemToTakeFromStorage);
            if (!Game.campStorage.weaponRack.isEmpty())
                MainScreen.addButton(3, "W.Rack Take", pickItemToTakeFromStorage);
            MainScreen.text("\n\n");
        }
        //Armor Rack
        if (Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00255] > 0) {
            MainScreen.text("Your camp has an armor rack set up to hold your various sets of gear.  It appears to be able to hold nine different types of armor.");
            MainScreen.addButton(5, "A.Rack Put", pickItemToTakeFromStorage);
            if (!Game.campStorage.armorRack.isEmpty())
                MainScreen.addButton(6, "A.Rack Take", pickItemToTakeFromStorage);
            MainScreen.text("\n\n");
        }
        MainScreen.addButton(9, "Back", PlayerMenu.display);
    }

    private static pickItemToTakeFromStorage() {
        MainScreen.clearText(); //Selects an item from a gear slot. Rewritten so that it no longer needs to use numbered events
        if (!itemAnyInStorage(storage, startSlot, endSlot)) { //If no items are left then return to the camp menu. Can only happen if the player removes the last item.
            playerMenu();
            return;
        }
        MainScreen.text("What " + text + " slot do you wish to take an item from?");
        let button: number = 0;
        MainScreen.hideButtons();
        for (let x: number = startSlot; x < endSlot; x++ , button++) {
            if (storage[x].quantity > 0) MainScreen.addButton(button, (storage[x].itype.shortName + " x" + storage[x].quantity), createCallBackFunction2(pickFrom, storage, x));
        }
        MainScreen.addButton(9, "Back", stash);
    }

}