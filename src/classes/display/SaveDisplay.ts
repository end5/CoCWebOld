import MainScreen from "../Game/Render";

export default class SaveDisplay {
    private static loadSaveDisplay(saveFile: SaveFile, slotName: string): string {
        let holding: string = "";
        if (saveFile.data.exists && saveFile.data.flags[2066] == undefined) {
            if (saveFile.data.notes == undefined) {
                saveFile.data.notes = "No notes available.";
            }
            holding = slotName;
            holding += ":  <b>";
            holding += saveFile.data.short;
            holding += "</b> - <i>" + saveFile.data.notes + "</i>\r";
            holding += "Days - " + saveFile.data.days + "  Gender - ";
            if (saveFile.data.gender == 0)
                holding += "U";
            if (saveFile.data.gender == 1)
                holding += "M";
            if (saveFile.data.gender == 2)
                holding += "F";
            if (saveFile.data.gender == 3)
                holding += "H";
            holding += "\r";
            return holding;
        }
        else if (saveFile.data.exists && saveFile.data.flags[2066] != undefined) {
            return slotName + ":  <b>UNSUPPORTED</b>\rThis is a save file that has been created in a modified version of CoC.\r";
        }
        else {
            return slotName + ":  <b>EMPTY</b>\r     \r";
        }
    }

    public static displaySaves() {
        let slots: Array = new Array(saveFileNames.length);

        MainScreen.text("<b><u>Slot: Sex,  Game Days Played</u></b>\r", true);

        for (let i: number = 0; i < saveFileNames.length; i += 1) {
            let test: Object = SharedObject.getLocal(saveFileNames[i], "/");
            MainScreen.text(SaveDisplay.loadSaveDisplay(test, String(i + 1)), false);
            if (test.data.exists && test.data.flags[2066] == undefined) {
                //trace("Creating function with indice = ", i);
                (function (i: number): void		// messy hack to work around closures. See: http://en.wikipedia.org/wiki/Immediately-invoked_function_expression
                {
                    slots[i] = function (): void 		// Anonymous functions FTW
                    {
                        trace("Loading save with name", saveFileNames[i], "at index", i);
                        if (loadGame(saveFileNames[i])) {
                            doNext(playerMenu);
                            showStats();
                            statScreenRefresh();
                            MainScreen.text("Slot " + i + " Loaded!", true);
                        }
                    }
                })(i);
            }
            else {
                slots[i] = null;		// You have to set the parameter to 0 to disable the button
            }
        }

        choices("Slot 1", slots[0],
            "Slot 2", slots[1],
            "Slot 3", slots[2],
            "Slot 4", slots[3],
            "Slot 5", slots[4],
            "Slot 6", slots[5],
            "Slot 7", slots[6],
            "Slot 8", slots[7],
            "Slot 9", slots[8],
            "Back", returnToSaveMenu);
    }


}