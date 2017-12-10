import Menu from './Menu';
import Menus from './Menus';
import { Gender } from '../../Body/Creature';
import Player from '../../Player/Player';
import SaveFile from '../../SaveFile';
import SaveManager from '../../SaveManager';
import DisplayText from '../DisplayText';
import { ClickFunction } from '../Elements/ButtonElement';
import ListItemElement from '../Elements/ListItemElement';
import UnorderedListElement from '../Elements/UnorderedListElement';
import MainScreen from '../MainScreen';

export default abstract class SaveDisplayMenu implements Menu {
    abstract display(player?: Player, prevMenu?: ClickFunction);

    protected modifyBottomButtons(saveSlotFunc: (index: number) => void, prevMenu: ClickFunction) {
        MainScreen.hideBottomButtons();
        for (let index: number = 0; index < SaveManager.saveSlotCount(); index++) {
            if (SaveManager.has(index)) {
                MainScreen.getBottomButton(index).modify("Slot " + index.toString(), function () { saveSlotFunc(index) });
            }
        }
        MainScreen.getBottomButton(SaveManager.saveSlotCount()).modify("Back", prevMenu);
    }

    protected displaySaves() {
        const saveListElement = new UnorderedListElement();
        DisplayText.appendElement(saveListElement);

        for (let index: number = 0; index < SaveManager.saveSlotCount(); index++) {
            const saveElement = new ListItemElement();
            saveListElement.appendElement(saveElement);
            this.saveInfo(<SaveFile>SaveManager.get(index), (index + 1).toString(), saveElement);
        }
    }

    private saveInfo(saveFile: SaveFile, slotName: string, element: ListItemElement) {
        element.text(slotName + ":  ");
        if (saveFile) {
            element.bold(saveFile.name);
            element.text(" - ");
            if (saveFile.notes)
                element.italic(saveFile.notes);
            else
                element.text("No notes available.");
            element.newline();
            element.text("Days - " + saveFile.days + "  Gender - ");
            if (saveFile.gender == Gender.NONE)
                element.text("U");
            if (saveFile.gender == Gender.MALE)
                element.text("M");
            if (saveFile.gender == Gender.FEMALE)
                element.text("F");
            if (saveFile.gender == Gender.HERM)
                element.text("H");
            element.newline();
        }
        else {
            element.bold("EMPTY");
            element.newline(2);
        }
    }

}