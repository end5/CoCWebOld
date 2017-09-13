import MainScreen from "./MainScreen";
import SaveManager from "../SaveManager";
import SaveDisplay from "./SaveDisplay";
import DataMenu from "./DataMenu";

export default class LoadMenu {
    public static display(): void {
        MainScreen.text("", true);
        if (SaveManager.activeSlot() != 0)
            MainScreen.text("<b>Last saved or loaded from: " + SaveManager.activeSlot() + "</b>\r\r", false);
        MainScreen.text("<b><u>Slot: Sex,  Game Days Played</u></b>\r", false);

        SaveDisplay.displaySaves();



        MainScreen.hideButtons();
        for (let index: number = 0; index < SaveManager.saveSlotCount(); index++) {
            if (SaveManager.has(index)) {
                MainScreen.addButton(index, "Slot " + index.toString(), function () { SaveManager.load(index) }, false);
            }
        }
        MainScreen.addButton(SaveManager.saveSlotCount(), "Back", DataMenu.display);
    }
}