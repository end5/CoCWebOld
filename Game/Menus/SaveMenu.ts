import { displaySaves, saveSlotChoices } from './SaveDisplay';
import { DisplayText } from '../../Engine/display/DisplayText';
import { InputTextElement } from '../../Engine/Display/Elements/InputTextElement';
import { SaveManager } from '../../Engine/Save/SaveManager';
import { generateSave, SaveFile } from '../SaveFile';
import { ClickOption, NextScreenChoices } from '../ScreenDisplay';
import { dataMenu } from './DataMenu';

export function saveMenu(): NextScreenChoices {
    DisplayText().clear();
    if (SaveManager.activeSlot())
        DisplayText("Last saved or loaded from: " + SaveManager.activeSlot()).bold();
    DisplayText("Slot: Sex,  Game Days Played").bold().underscore();

    displaySaves();

    DisplayText("Leave the notes box blank if you don't wish to change notes.").bold();
    DisplayText("NOTES:").bold().underscore();

    const notesInputElement = new InputTextElement();
    DisplayText().appendElement(notesInputElement);
    notesInputElement.style.position = "fixed";

    return saveSlotChoices(createSaveFuncCallback(generateSave(notesInputElement.text)), dataMenu);
}

function createSaveFuncCallback(save: SaveFile): (index: number) => ClickOption {
    return (index: number) => {
        return () => {
            if (SaveManager.has(index))
                return confirmOverwrite(index, save);
            else {
                SaveManager.saveToSlot(index, save);
                return { next: saveMenu };
            }
        };
    };
}

function confirmOverwrite(slotNumber: number, save: SaveFile): NextScreenChoices {
    DisplayText().clear();
    DisplayText("You are about to overwrite the following save: <b>");
    // DisplayText(Flags.list[FlagEnum.TEMP_STORAGE_SAVE_DELETION]).bold();
    DisplayText("\n\n");
    DisplayText("Are you sure you want to delete it?");
    return {
        choices: [["No", saveMenu], ["Yes", () => {
            SaveManager.saveToSlot(slotNumber, save);
            return saveMenu();
        }]]
    };
}