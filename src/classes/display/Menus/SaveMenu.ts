import Menus from './Menus';
import SaveDisplayMenu from './SaveDisplayMenu';
import Flags, { FlagEnum } from '../../Game/Flags';
import SaveManager from '../../SaveManager';
import DisplayText from '../DisplayText';
import InputTextElement from '../Elements/InputTextElement';
import MainScreen from '../MainScreen';

export default class SaveMenu extends SaveDisplayMenu {
    public display() {
        DisplayText().clear();
        if (SaveManager.activeSlot() !== 0)
            DisplayText("Last saved or loaded from: " + SaveManager.activeSlot()).bold();
        DisplayText("Slot: Sex,  Game Days Played").bold().underscore();

        this.displaySaves();

        DisplayText("Leave the notes box blank if you don't wish to change notes.").bold();
        DisplayText("NOTES:").bold().underscore();

        const notesInputElement = new InputTextElement();
        DisplayText().appendElement(notesInputElement);
        notesInputElement.style.position = "fixed";

        this.modifyBottomButtons(this.confirmOverwrite, Menus.Data.display);
    }

    private confirmOverwrite(slotNumber: number) {
        DisplayText("You are about to overwrite the following save: <b>");
        DisplayText(Flags.list[FlagEnum.TEMP_STORAGE_SAVE_DELETION]).bold();
        DisplayText("\n\n");
        DisplayText("Are you sure you want to delete it?");
        MainScreen.displayChoices(["No", "Yes"], [Menus.Save.display, () => { SaveManager.saveToSlot(slotNumber); }]);
    }
}
