import { Menus } from './Menus';
import { DisplayText } from '../../Engine/display/DisplayText';
import { TextAreaElement } from '../../Engine/Display/Elements/TextAreaElement';
import { SaveManager } from '../../Engine/Save/SaveManager';
import { NextScreenChoices } from '../ScreenDisplay';

export function display(): NextScreenChoices {
    DisplayText().clear();
    DisplayText("Paste text here.");
    const textAreaElement = new TextAreaElement();
    DisplayText().appendElement(textAreaElement);
    textAreaElement.text(JSON.stringify(SaveManager.saveToFile()));

    return {
        choices: [["Load", "Back"], [
            () => {
                SaveManager.loadFromFile(JSON.parse(textAreaElement.getText()));
                return display();
            },
            Menus.Data
        ]]
    };
}
