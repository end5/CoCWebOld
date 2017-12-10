import Menus from './Menus';
import SaveDisplayMenu from './SaveDisplayMenu';
import Flags, { FlagEnum } from '../../Game/Flags';
import SaveManager from '../../SaveManager';
import DisplayText from '../DisplayText';
import InputTextElement from '../Elements/InputTextElement';
import { TextFlag } from '../Elements/TextElement';
import MainScreen from '../MainScreen';

export default class SaveMenu extends SaveDisplayMenu {
    public display() {
        DisplayText.clear();
        if (SaveManager.activeSlot() != 0)
            DisplayText.bold("Last saved or loaded from: " + SaveManager.activeSlot());
        DisplayText.text("Slot: Sex,  Game Days Played", TextFlag.Bold | TextFlag.Underscore);

        this.displaySaves();

        DisplayText.bold("Leave the notes box blank if you don't wish to change notes.");
        DisplayText.text("NOTES:", TextFlag.Bold | TextFlag.Underscore);

        const notesInputElement = new InputTextElement();
        DisplayText.appendElement(notesInputElement);
        notesInputElement.style.position = "fixed";

        this.modifyBottomButtons(this.confirmOverwrite, Menus.Data.display);
    }

    private confirmOverwrite(slotNumber: number) {
        DisplayText.text("You are about to overwrite the following save: <b>");
        DisplayText.bold(Flags.list[FlagEnum.TEMP_STORAGE_SAVE_DELETION]);
        DisplayText.newParagraph();
        DisplayText.text("Are you sure you want to delete it?");
        MainScreen.displayChoices(["No", "Yes"], [Menus.Save.display, function () { SaveManager.saveToSlot(slotNumber) }]);
    }
}