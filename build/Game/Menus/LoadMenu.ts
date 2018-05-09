import { Menus } from './Menus';
import { displaySaves, saveSlotChoices } from './SaveDisplay';
import { DisplayText } from '../../Engine/display/DisplayText';
import { SaveManager } from '../../Engine/Save/SaveManager';
import { NextScreenChoices } from '../SceneDisplay';

export function display(): NextScreenChoices {
    DisplayText().clear();
    if (SaveManager.activeSlot() !== 0)
        DisplayText("<b>Last saved or loaded from: " + SaveManager.activeSlot() + "</b>\r\r");
    DisplayText("<b><u>Slot: Sex,  Game Days Played</u></b>\r");

    displaySaves();

    return saveSlotChoices(SaveManager.loadFromSlot, Menus.Data);
}
