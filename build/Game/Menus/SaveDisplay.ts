import DisplayText from '../../Engine/display/DisplayText';
import { ClickFunction } from '../../Engine/Display/Elements/ButtonElement';
import ListEntryElement from '../../Engine/Display/Elements/ListItemElement';
import UnorderedListElement from '../../Engine/Display/Elements/UnorderedListElement';
import MainScreen from '../../Engine/Display/MainScreen';
import SaveFile from '../../Engine/Save/SaveFile';
import SaveManager from '../../Engine/Save/SaveManager';
import { Gender } from '../Body/GenderIdentity';

export function modifyBottomButtons(saveSlotFunc: (index: number) => void, prevMenu: ClickFunction) {
    const text = [];
    const func = [];
    MainScreen.hideBottomButtons();
    for (let index: number = 0; index < SaveManager.saveSlotCount(); index++) {
        if (SaveManager.has(index)) {
            text.push("Slot " + index.toString());
            func.push(() => { saveSlotFunc(index); });
        }
    }
    MainScreen.displayChoices(text, func, ["Back"], [prevMenu]);
}

export function displaySaves() {
    const saveListElement = new UnorderedListElement();
    DisplayText().appendElement(saveListElement);

    for (let index: number = 0; index < SaveManager.saveSlotCount(); index++) {
        const saveElement = new ListEntryElement();
        saveListElement.appendElement(saveElement);
        saveInfo(SaveManager.get(index) as SaveFile, (index + 1).toString(), saveElement);
    }
}

export function saveInfo(saveFile: SaveFile, slotName: string, element: ListEntryElement) {
    element.text(slotName + ":  ");
    if (saveFile) {
        element.text(saveFile.name).bold();
        element.text(" - ");
        if (saveFile.notes)
            element.text(saveFile.notes).italic();
        else
            element.text("No notes available.");
        element.newline();
        element.text("Days - " + saveFile.days + "  Gender - ");
        if (saveFile.gender === Gender.NONE)
            element.text("U");
        if (saveFile.gender === Gender.MALE)
            element.text("M");
        if (saveFile.gender === Gender.FEMALE)
            element.text("F");
        if (saveFile.gender === Gender.HERM)
            element.text("H");
        element.newline();
    }
    else {
        element.text("EMPTY").bold();
        element.text("\n\n");
    }
}
