import Menu from './Menu';
import Menus from './Menus';
import { Gender } from '../../Body/Creature';
import Flags, { FlagEnum } from '../../Game/Flags';
import SaveFile from '../../SaveFile';
import SaveManager from '../../SaveManager';
import DisplayText from '../DisplayText';
import InputTextElement from '../Elements/InputTextElement';
import ListItemElement from '../Elements/ListItemElement';
import { TextFlag } from '../Elements/TextElement';
import UnorderedListElement from '../Elements/UnorderedListElement';
import MainDisplay from '../MainDisplay';
import MainScreen from '../MainScreen';

export default class SaveMenu implements Menu {
    public display() {
        DisplayText.clear();

        const notesInputElement = new InputTextElement();
        MainScreen.screen.mainDisplay.appendElement(notesInputElement);

        if (SaveManager.activeSlot() != 0)
            DisplayText.bold("Last saved or loaded from: " + SaveManager.activeSlot());
        DisplayText.text("Slot: Sex,  Game Days Played", TextFlag.Bold | TextFlag.Underscore);

        this.displaySaves();

        DisplayText.bold("Leave the notes box blank if you don't wish to change notes.");
        DisplayText.text("NOTES:", TextFlag.Bold | TextFlag.Underscore);


        MainScreen.hideBottomButtons();
        for (let index: number = 0; index < SaveManager.saveSlotCount(); index++) {
            if (SaveManager.has(index)) {
                MainScreen.getBottomButton(index).modify("Slot " + index.toString(), function () { this.confirmOverwrite(index) });
            }
        }
        MainScreen.getBottomButton(SaveManager.saveSlotCount()).modify("Back", Menus.Data.display);
    }

    private confirmOverwrite(slotNumber: number) {
        DisplayText.text("You are about to overwrite the following save: <b>");
        DisplayText.bold(Flags.list[FlagEnum.TEMP_STORAGE_SAVE_DELETION]);
        DisplayText.newParagraph();
        DisplayText.text("Are you sure you want to delete it?");
        MainScreen.displayChoices(["No", "Yes"], [Menus.Save.display, function () { SaveManager.save(slotNumber) }]);
    }

    public displaySaves() {
        const saveListElement = new UnorderedListElement();
        MainScreen.screen.mainDisplay.appendElement(saveListElement);

        for (let index: number = 0; index < SaveManager.saveSlotCount(); index++) {
            const saveElement = new ListItemElement();
            saveListElement.appendElement(saveElement);
            this.saveInfo(<SaveFile>SaveManager.get(index), (index + 1).toString(), saveElement);
        }
    }

    private saveInfo(saveFile: SaveFile, slotName: string, element: ListItemElement) {
        element.text(slotName + ":  ");
        if (saveFile) {
            element.bold(saveFile.desc);
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