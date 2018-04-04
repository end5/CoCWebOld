import Menus from './Menus';
import { displaySaves, modifyBottomButtons } from './SaveDisplay';
import DisplayText from '../../Engine/display/DisplayText';
import InputTextElement from '../../Engine/Display/Elements/InputTextElement';
import MainScreen from '../../Engine/Display/MainScreen';
import SaveManager from '../../Engine/Save/SaveManager';

function onDisplay() {
    DisplayText().clear();
    if (SaveManager.activeSlot() !== 0)
        DisplayText("Last saved or loaded from: " + SaveManager.activeSlot()).bold();
    DisplayText("Slot: Sex,  Game Days Played").bold().underscore();

    displaySaves();

    DisplayText("Leave the notes box blank if you don't wish to change notes.").bold();
    DisplayText("NOTES:").bold().underscore();

    const notesInputElement = new InputTextElement();
    DisplayText().appendElement(notesInputElement);
    notesInputElement.style.position = "fixed";

    modifyBottomButtons(confirmOverwrite, Menus.Data);
}

function confirmOverwrite(slotNumber: number) {
    DisplayText("You are about to overwrite the following save: <b>");
    // DisplayText(Flags.list[FlagEnum.TEMP_STORAGE_SAVE_DELETION]).bold();
    DisplayText("\n\n");
    DisplayText("Are you sure you want to delete it?");
    MainScreen.displayChoices(["No", "Yes"], [Menus.Save, () => { SaveManager.saveToSlot(slotNumber); }]);
}

const display = () => { onDisplay(); };
export default display;
