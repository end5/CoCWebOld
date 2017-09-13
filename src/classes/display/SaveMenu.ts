import MainScreen from "../Game/Render";
import SaveManager from "../SaveManager";

export default class SaveMenu {
    public static display(): void {
        // need alternative for notes
        /*mainView.nameBox.x = 210;
        mainView.nameBox.y = 620;
        mainView.nameBox.width = 550;
        mainView.nameBox.text = "";
        mainView.nameBox.visible = true;*/

        // let test; // Disabling this variable because it seems to be unused.

        MainScreen.text("", true);
        if (SaveManager.activeSlot() != 0)
            MainScreen.text("<b>Last saved or loaded from: " + SaveManager.activeSlot() + "</b>\r\r", false);
        MainScreen.text("<b><u>Slot: Sex,  Game Days Played</u></b>\r", false);

        let saveFuncs: Array = [];


        for (let i: number = 0; i < saveFileNames.length; i += 1) {
            let test: Object = SharedObject.getLocal(saveFileNames[i], "/");
            MainScreen.text(loadSaveDisplay(test, String(i + 1)), false);
            trace("Creating function with indice = ", i);
            (function (i: number): void		// messy hack to work around closures. See: http://en.wikipedia.org/wiki/Immediately-invoked_function_expression
            {
                saveFuncs[i] = function (): void 		// Anonymous functions FTW
                {
                    trace("Saving game with name", saveFileNames[i], "at index", i);
                    saveGame(saveFileNames[i]);
                }
            })(i);

        }


        if (player.slotName == "VOID")
            MainScreen.text("\r\r", false);

        MainScreen.text("<b>Leave the notes box blank if you don't wish to change notes.\r<u>NOTES:</u></b>", false);
        choices("Slot 1", saveFuncs[0],
            "Slot 2", saveFuncs[1],
            "Slot 3", saveFuncs[2],
            "Slot 4", saveFuncs[3],
            "Slot 5", saveFuncs[4],
            "Slot 6", saveFuncs[5],
            "Slot 7", saveFuncs[6],
            "Slot 8", saveFuncs[7],
            "Slot 9", saveFuncs[8],
            "Back", returnToSaveMenu);
    }


}