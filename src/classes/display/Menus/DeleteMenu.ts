import DataMenu from './DataMenu';
import MainScreen from './MainScreen';
import SaveDisplay from './SaveDisplay';
import Flags, { FlagEnum } from '../Game/Flags';
import SaveManager from '../SaveManager';

export default class DeleteMenu {
    public static display(): void {
        MainScreen.text("Slot,  Race,  Sex,  Game Days Played\n", true);

        SaveDisplay.displaySaves();
        MainScreen.text("\n<b>ONCE DELETED, YOUR SAVE IS GONE FOREVER.</b>", false);



        MainScreen.hideButtons();
        for (let index: number = 0; index < SaveManager.saveSlotCount(); index++) {
            if (SaveManager.has(index)) {
                MainScreen.addButton(index, "Slot " + index.toString(), function () { DeleteMenu.confirmDelete(index) }, false);
            }
        }
        MainScreen.addButton(SaveManager.saveSlotCount(), "Back", DataMenu.display);
    }

    private static confirmDelete(slotNumber: number): void {
        MainScreen.text("You are about to delete the following save: <b>" + Flags.list[FlagEnum.TEMP_STORAGE_SAVE_DELETION] + "</b>\n\nAre you sure you want to delete it?", true);
        MainScreen.displayChoices(["No", "Yes"], [DeleteMenu.display, function () { SaveManager.delete(slotNumber) }]);
    }

}