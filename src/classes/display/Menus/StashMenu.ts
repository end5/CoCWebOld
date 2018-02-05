import Menu from './Menu';
import Menus from './Menus';
import Flags, { FlagEnum } from '../../Game/Flags';
import Game from '../../Game/Game';
import Player from '../../Player/Player';
import DisplaySprite from '../DisplaySprite';
import DisplayText from '../DisplayText';
import MainScreen from '../MainScreen';

export default class StashMenu implements Menu {
    public display(player: Player) {
        DisplayText().clear();
        DisplaySprite.hide();
        MainScreen.hideBottomButtons();
        if (Flags.list[FlagEnum.ANEMONE_KID] > 0) {
            Game.sceneManager.anemoneScene.anemoneBarrelDescription();
            if (Game.time.hour >= 6)
            MainScreen.getBottomButton(4).modify("Anemone", Game.sceneManager.anemoneScene.approachAnemoneBarrel);
        }
        if (player.hasKeyItem("Camp - Chest")) {
            DisplayText("You have a large wood and iron chest to help store excess items located near the portal entrance.\n\n");
            MainScreen.getBottomButton(0).modify("Chest Store", this.pickItemToTakeFromStorage);
            if (!Game.campStorage.chest.isEmpty())
            MainScreen.getBottomButton(1).modify("Chest Take", this.pickItemToTakeFromStorage);
        }
        // Weapon Rack
        if (Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00254] > 0) {
            DisplayText("There's a weapon rack set up here, set up to hold up to nine various weapons.");
            MainScreen.getBottomButton(2).modify("W.Rack Put", this.pickItemToTakeFromStorage);
            if (!Game.campStorage.weaponRack.isEmpty())
            MainScreen.getBottomButton(3).modify("W.Rack Take", this.pickItemToTakeFromStorage);
            DisplayText("\n\n");
        }
        // Armor Rack
        if (Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00255] > 0) {
            DisplayText("Your camp has an armor rack set up to hold your various sets of gear.  It appears to be able to hold nine different types of armor.");
            MainScreen.getBottomButton(5).modify("A.Rack Put", this.pickItemToTakeFromStorage);
            if (!Game.campStorage.armorRack.isEmpty())
            MainScreen.getBottomButton(6).modify("A.Rack Take", this.pickItemToTakeFromStorage);
            DisplayText("\n\n");
        }
        MainScreen.addBackButton("Back", Menus.Player.display);
    }

    private pickItemToTakeFromStorage() {
        DisplayText().clear(); // Selects an item from a gear slot. Rewritten so that it no longer needs to use numbered events
        if (!itemAnyInStorage(storage, startSlot, endSlot)) { // If no items are left then return to the camp menu. Can only happen if the player removes the last item.
            playerMenu();
            return;
        }
        DisplayText("What " + text + " slot do you wish to take an item from?");
        let button: number = 0;
        MainScreen.hideBottomButtons();
        for (let x: number = startSlot; x < endSlot; x++ , button++) {
            if (storage[x].quantity > 0)
            MainScreen.getBottomButton(button).modify((storage[x].itype.shortName + " x" + storage[x].quantity), createCallBackFunction2(pickFrom, storage, x));
        }
        MainScreen.addBackButton("Back", this.display);
    }

}
