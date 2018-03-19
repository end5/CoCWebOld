import Menus from './Menus';
import SaveManager from '../../SaveManager';
import DisplayText from '../DisplayText';
import TextAreaElement from '../Elements/TextAreaElement';
import MainScreen from '../MainScreen';
import Menu from '../Menus/Menu';

export default class LoadFileMenu implements Menu {
    public display() {
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
            Menus.Data.display
        ]);
    }
}
