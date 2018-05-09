import { Menus } from './Menus';
import { DisplayText } from '../../Engine/display/DisplayText';
import { TextAreaElement } from '../../Engine/Display/Elements/TextAreaElement';
import { SaveManager } from '../../Engine/Save/SaveManager';
import { NextScreenChoices } from '../SceneDisplay';

export function display(): NextScreenChoices {
    DisplayText().clear();
    DisplayText("Copy this text into a file.");
    const textAreaElement = new TextAreaElement();
    DisplayText().appendElement(textAreaElement);
    textAreaElement.text(JSON.stringify(SaveManager.saveToFile()));

    return {
        choices: [["Copy", "Back"], [
            () => {
                textAreaElement.select();
                document.execCommand("Copy");
                return display();
            },
            Menus.Data
        ]]
    };
}
