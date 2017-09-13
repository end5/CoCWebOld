import MainScreen from "./MainScreen";
import SaveManager from "../SaveManager";

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
        MainScreen.text("<b><u>Slot: Sex,  Game Days Played</u></b>\r", true);

        for (let index: number = 0; index < SaveManager.saveSlotCount(); index++) {
            let saveSlot: object = SaveManager.get(index);
            MainScreen.text(SaveDisplay.loadSaveDisplay(saveSlot, (index + 1).toString()), false);
        }
    }


}