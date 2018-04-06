import Menus from './Menus';
import DisplayText from '../../Engine/display/DisplayText';
import TextAreaElement from '../../Engine/Display/Elements/TextAreaElement';
import MainScreen from '../../Engine/Display/MainScreen';
import SaveManager from '../../Engine/Save/SaveManager';

export default function display() {
    DisplayText().clear();
    DisplayText("Copy this text into a file.");
    const textAreaElement = new TextAreaElement();
    DisplayText().appendElement(textAreaElement);
    textAreaElement.text(JSON.stringify(SaveManager.saveToFile()));

    MainScreen.displayChoices(["Copy", "Back"], [
        () => {
            textAreaElement.select();
            document.execCommand("Copy");
        },
        Menus.Data
    ]);
}
