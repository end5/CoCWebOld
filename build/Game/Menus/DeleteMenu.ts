import { Menus } from './Menus';
import { displaySaves, saveSlotChoices } from './SaveDisplay';
import { DisplayText } from '../../Engine/display/DisplayText';
import { SaveManager } from '../../Engine/Save/SaveManager';
import { NextScreenChoices } from '../ScreenDisplay';

export function display(): NextScreenChoices {
    DisplayText("Slot,  Race,  Sex,  Game Days Played");
    DisplayText("\n");

    displaySaves();
    DisplayText("ONCE DELETED, YOUR SAVE IS GONE FOREVER.").bold();
    return saveSlotChoices(confirmDelete, Menus.Data);
}

function confirmDelete(slotNumber: number): NextScreenChoices {
    DisplayText().clear();
    DisplayText("You are about to delete the following save: ");
    // DisplayText(Flags.list[FlagEnum.TEMP_STORAGE_SAVE_DELETION]).bold();
    DisplayText("Are you sure you want to delete it?");
    return {
        choices: [["No", "Yes"], [display, () => {
            SaveManager.delete(slotNumber);
            return display();
        }]]
    };
}
