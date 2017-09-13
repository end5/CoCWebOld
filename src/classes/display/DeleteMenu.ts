import MainScreen from "./MainScreen";
import SaveManager from "../SaveManager";

export default class DeleteMenu {
    public display(): void {
        MainScreen.text("Slot,  Race,  Sex,  Game Days Played\n", true);

        MainScreen.clearButtons();

        for (let index: number = 0; index < SaveManager.count(); index++) {
            let test: object = SaveManager.get();
            MainScreen.text(loadSaveDisplay(test, String(index + 1)), false);
            MainScreen.addButton(index, "Slot " + index.toString(), DeleteMenu.confirmDelete, false, index);
        }

        MainScreen.text("\n<b>ONCE DELETED, YOUR SAVE IS GONE FOREVER.</b>", false);
    }

    private static confirmDelete(slotNumber: number): void {
        MainScreen.text("You are about to delete the following save: <b>" + flags[FlagEnum.TEMP_STORAGE_SAVE_DELETION] + "</b>\n\nAre you sure you want to delete it?", true);
        simpleChoices("No", deleteScreen, "Yes", purgeTheMutant, "", null, "", null, "", null);
    }

}