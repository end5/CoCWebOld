import { displaySaves, saveSlotChoices } from './SaveDisplay';
import { DisplayText } from '../../Engine/display/DisplayText';
import { SaveManager } from '../../Engine/Save/SaveManager';
import { loadFromSave, SaveFile } from '../SaveFile';
import { NextScreenChoices } from '../ScreenDisplay';
import { dataMenu } from './DataMenu';
import { campMenu } from './InGame/PlayerMenu';

export function loadMenu(): NextScreenChoices {
    DisplayText().clear();
    if (SaveManager.activeSlot())
        DisplayText("<b>Last saved or loaded from: " + SaveManager.activeSlot() + "</b>\r\r");
    DisplayText("<b><u>Slot: Sex,  Game Days Played</u></b>\r");

    displaySaves();

    return saveSlotChoices((index: number) => {
        return () => {
            loadFromSave(SaveManager.loadFromSlot(index) as SaveFile);
            return loaded();
        };
    }, dataMenu);
}

function loaded(): NextScreenChoices {
    DisplayText().clear();
    DisplayText("Load Successful.");
    return { next: campMenu };
}
