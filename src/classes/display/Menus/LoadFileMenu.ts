import Menus from './Menus';
import SaveManager from '../../SaveManager';
import DisplayText from '../DisplayText';
import TextAreaElement from '../Elements/TextAreaElement';
import MainScreen from '../MainScreen';
import Menu from '../Menus/Menu';

export default class LoadFileMenu implements Menu {
    public display() {
        DisplayText().clear();
        DisplayText("Paste text here.");
        const textAreaElement = new TextAreaElement();
        DisplayText().appendElement(textAreaElement);
        textAreaElement.text(JSON.stringify(SaveManager.saveToFile()));

        MainScreen.displayChoices(["Load", "Back"], [
            () => {
                SaveManager.loadFromFile(JSON.parse(textAreaElement.getText()));
            },
            Menus.Data.display
        ]);
    }
}
