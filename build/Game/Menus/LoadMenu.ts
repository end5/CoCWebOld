import Menus from './Menus';
import { displaySaves, modifyBottomButtons } from './SaveDisplay';
import DisplayText from '../../Engine/display/DisplayText';
import SaveManager from '../../Engine/Save/SaveManager';

function onDisplay() {
    DisplayText().clear();
    if (SaveManager.activeSlot() !== 0)
        DisplayText("<b>Last saved or loaded from: " + SaveManager.activeSlot() + "</b>\r\r");
    DisplayText("<b><u>Slot: Sex,  Game Days Played</u></b>\r");

    displaySaves();

    modifyBottomButtons(SaveManager.loadFromSlot, Menus.Data);
}

const display = () => { onDisplay(); };
export default display;
