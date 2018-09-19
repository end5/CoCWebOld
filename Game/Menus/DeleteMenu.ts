import { displaySaves, saveSlotChoices } from './SaveDisplay';
import { DisplayText } from '../../Engine/display/DisplayText';
import { SaveManager } from '../../Engine/Save/SaveManager';
import { NextScreenChoices, ClickFunction } from '../ScreenDisplay';
import { dataMenu } from './DataMenu';

export function deleteMenu(): NextScreenChoices {
    DisplayText("Slot,  Race,  Sex,  Game Days Played");
    DisplayText("\n");

    displaySaves();
    DisplayText("ONCE DELETED, YOUR SAVE IS GONE FOREVER.").bold();
    return saveSlotChoices(confirmDelete, dataMenu);
}

function confirmDelete(slotNumber: number): ClickFunction {
    return () => {
        DisplayText().clear();
        DisplayText("You are about to delete the following save: ");
        // DisplayText(Flags.list[FlagEnum.TEMP_STORAGE_SAVE_DELETION]).bold();
        DisplayText("Are you sure you want to delete it?");
        return {
            choices: [
                ["No", deleteMenu],
                ["Yes", () => {
                    SaveManager.delete(slotNumber);
                    return deleteMenu();
                }]
            ]
        };
    };
}
