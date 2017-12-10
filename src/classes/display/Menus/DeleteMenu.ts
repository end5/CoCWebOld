import DataMenu from './DataMenu';
import Menus from './Menus';
import SaveDisplayMenu from './SaveDisplayMenu';
import Flags, { FlagEnum } from '../../Game/Flags';
import SaveManager from '../../SaveManager';
import DisplayText from '../DisplayText';
import MainScreen from '../MainScreen';

export default class DeleteMenu extends SaveDisplayMenu {
    public display() {
        DisplayText.text("Slot,  Race,  Sex,  Game Days Played");
        DisplayText.newline();

        this.displaySaves();
        DisplayText.bold("ONCE DELETED, YOUR SAVE IS GONE FOREVER.");
        this.modifyBottomButtons(this.confirmDelete, Menus.Data.display)
    }

    private confirmDelete(slotNumber: number): void {
        DisplayText.clear();
        DisplayText.text("You are about to delete the following save: ");
        DisplayText.bold(Flags.list[FlagEnum.TEMP_STORAGE_SAVE_DELETION]);
        DisplayText.text("Are you sure you want to delete it?");
        MainScreen.displayChoices(["No", "Yes"], [this.display, function () { SaveManager.delete(slotNumber) }]);
    }
}