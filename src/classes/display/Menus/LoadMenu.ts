import DataMenu from './DataMenu';
import Menus from './Menus';
import SaveDisplayMenu from './SaveDisplayMenu';
import SaveManager from '../../SaveManager';
import DisplayText from '../DisplayText';
import MainScreen from '../MainScreen';

export default class LoadMenu extends SaveDisplayMenu {
    public display() {
        DisplayText().clear();
        if (SaveManager.activeSlot() !== 0)
            DisplayText("<b>Last saved or loaded from: " + SaveManager.activeSlot() + "</b>\r\r");
        DisplayText("<b><u>Slot: Sex,  Game Days Played</u></b>\r");

        this.displaySaves();

        this.modifyBottomButtons(SaveManager.loadFromSlot, Menus.Data.display);
    }
}
