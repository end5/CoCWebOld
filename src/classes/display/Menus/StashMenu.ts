import Menu from './Menu';
import Menus from './Menus';
import Flags, { FlagEnum } from '../../Game/Flags';
import Game from '../../Game/Game';
import Player from '../../Player/Player';
import DisplaySprite from '../DisplaySprite';
import DisplayText from '../DisplayText';
import SpriteName from '../Images/SpriteName';
import InventoryDisplay from '../InventoryDisplay';
import MainScreen from '../MainScreen';

export default class StashMenu implements Menu {
    public display(player: Player) {
        DisplayText().clear();
        DisplaySprite(SpriteName.None);
        const text = [];
        const func = [];
        MainScreen.hideBottomButtons();
        if (Flags.list[FlagEnum.ANEMONE_KID] > 0) {
            Game.scenes.anemoneScene.anemoneBarrelDescription();
            if (Game.time.hour >= 6) {
                text[4] = "Anemone";
                func[4] = Game.scenes.anemoneScene.approachAnemoneBarrel;
            }
        }
        if (player.inventory.keyItems.has("Camp - Chest")) {
            DisplayText("You have a large wood and iron chest to help store excess items located near the portal entrance.");
            text[0] = "Chest";
            func[0] = () => {
                InventoryDisplay.inventoryTake(Game.campStorage.chest, player, this.display);
            };
            DisplayText("\n\n");
        }
        // Weapon Rack
        if (Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00254] > 0) {
            DisplayText("There's a weapon rack set up here, set up to hold up to nine various weapons.");
            text[1] = "W.Rack";
            func[1] = () => {
                InventoryDisplay.inventoryTake(Game.campStorage.weaponRack, player, this.display);
            };
            DisplayText("\n\n");
        }
        // Armor Rack
        if (Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00255] > 0) {
            DisplayText("Your camp has an armor rack set up to hold your various sets of gear.  It appears to be able to hold nine different types of armor.");
            text[2] = "A.Rack";
            func[2] = () => {
                InventoryDisplay.inventoryTake(Game.campStorage.armorRack, player, this.display);
            };
            DisplayText("\n\n");
        }
        MainScreen.addBackButton("Back", Menus.Player.display);
    }
}
