import DataMenu from './DataMenu';
import Menus from './Menus';
import SaveDisplayMenu from './SaveDisplayMenu';
import Flags, { FlagEnum } from '../../Game/Flags';
import SaveManager from '../../SaveManager';
import DisplayText from '../DisplayText';
import MainScreen from '../MainScreen';

export default class DeleteMenu extends SaveDisplayMenu {
    public display() {
        DisplayText("Slot,  Race,  Sex,  Game Days Played");
        DisplayText("\n");

        this.displaySaves();
        DisplayText("ONCE DELETED, YOUR SAVE IS GONE FOREVER.").bold();
        this.modifyBottomButtons(this.confirmDelete, Menus.Data.display);
    }

    private confirmDelete(slotNumber: number): void {
        DisplayText().clear();
        DisplayText("You are about to delete the following save: ");
        DisplayText(Flags.list[FlagEnum.TEMP_STORAGE_SAVE_DELETION]).bold();
        DisplayText("Are you sure you want to delete it?");
        MainScreen.displayChoices(["No", "Yes"], [this.display, () => { SaveManager.delete(slotNumber); }]);
    }
}
