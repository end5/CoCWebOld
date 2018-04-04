import Menus from './Menus';
import { displaySaves, modifyBottomButtons } from './SaveDisplay';
import DisplayText from '../../Engine/display/DisplayText';
import MainScreen from '../../Engine/Display/MainScreen';
import SaveManager from '../../Engine/Save/SaveManager';

function onDisplay() {
    DisplayText("Slot,  Race,  Sex,  Game Days Played");
    DisplayText("\n");

    displaySaves();
    DisplayText("ONCE DELETED, YOUR SAVE IS GONE FOREVER.").bold();
    modifyBottomButtons(confirmDelete, Menus.Data);
}

function confirmDelete(slotNumber: number): void {
    DisplayText().clear();
    DisplayText("You are about to delete the following save: ");
    // DisplayText(Flags.list[FlagEnum.TEMP_STORAGE_SAVE_DELETION]).bold();
    DisplayText("Are you sure you want to delete it?");
    MainScreen.displayChoices(["No", "Yes"], [display, () => { SaveManager.delete(slotNumber); }]);
}

const display = () => { onDisplay(); };
export default display;
