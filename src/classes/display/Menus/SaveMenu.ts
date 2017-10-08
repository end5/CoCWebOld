import DataMenu from './DataMenu';
import MainScreen from './MainScreen';
import SaveDisplay from './SaveDisplay';
import Flags, { FlagEnum } from '../Game/Flags';
import SaveManager from '../SaveManager';

export default class SaveMenu {
    public static display(): void {
        MainScreen.text("", true);
        if (SaveManager.activeSlot() != 0)
            MainScreen.text("<b>Last saved or loaded from: " + SaveManager.activeSlot() + "</b>\r\r", false);
        MainScreen.text("<b><u>Slot: Sex,  Game Days Played</u></b>\r", false);

        SaveDisplay.displaySaves();

        //if (player.slotName == "VOID")
        //    MainScreen.text("\r\r", false);

        MainScreen.text("<b>Leave the notes box blank if you don't wish to change notes.\r<u>NOTES:</u></b>", false);



        MainScreen.hideButtons();
        for (let index: number = 0; index < SaveManager.saveSlotCount(); index++) {
            if (SaveManager.has(index)) {
                MainScreen.addButton(index, "Slot " + index.toString(), function () { SaveMenu.confirmOverwrite(index) }, false);
            }
        }
        MainScreen.addButton(SaveManager.saveSlotCount(), "Back", DataMenu.display);
    }

    private static confirmOverwrite(slotNumber: number) {
        MainScreen.text("You are about to overwrite the following save: <b>" + Flags.list[FlagEnum.TEMP_STORAGE_SAVE_DELETION] + "</b>\n\nAre you sure you want to delete it?", true);
        MainScreen.displayChoices(["No", "Yes"], [SaveMenu.display, function () { SaveManager.save(slotNumber) }]);
    }
}