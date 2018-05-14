import { Menus } from './Menus';
import { displaySaves, saveSlotChoices } from './SaveDisplay';
import { DisplayText } from '../../Engine/display/DisplayText';
import { SaveManager } from '../../Engine/Save/SaveManager';
import { NextScreenChoices } from '../ScreenDisplay';

export function display(): NextScreenChoices {
    DisplayText().clear();
    if (SaveManager.activeSlot() !== undefined)
        DisplayText("<b>Last saved or loaded from: " + SaveManager.activeSlot() + "</b>\r\r");
    DisplayText("<b><u>Slot: Sex,  Game Days Played</u></b>\r");

    displaySaves();

    return saveSlotChoices((index: number) => {
        return () => {
            SaveManager.loadFromSlot(index);
            return loaded();
        };
    }, Menus.Data);
}

function loaded(): NextScreenChoices {
    DisplayText().clear();
    DisplayText("Load Successful.");
    return { next: display };
}
