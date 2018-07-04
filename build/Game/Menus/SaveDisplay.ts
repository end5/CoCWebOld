import { Menus } from './Menus';
import { DisplayText } from '../../Engine/display/DisplayText';
import { InputTextElement } from '../../Engine/Display/Elements/InputTextElement';
import { ListEntryElement } from '../../Engine/Display/Elements/ListItemElement';
import { UnorderedListElement } from '../../Engine/Display/Elements/UnorderedListElement';
import { SaveManager } from '../../Engine/Save/SaveManager';
import { Gender } from '../Body/GenderIdentity';
import { SaveFile } from '../SaveFile';
import { ClickOption, NextScreenChoices } from '../ScreenDisplay';

export function saveSlotChoices(saveSlotCallback: (index: number) => ClickOption, prevMenu: ClickOption): NextScreenChoices {
    const choices = [];
    for (let index: number = 0; index < SaveManager.saveSlotCount(); index++) {
        choices.push(["Slot " + index.toString(), saveSlotCallback(index)]);
    }
    return { choices, persistantChoices: [["Back", prevMenu]] };
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
        element.endline();
        element.text("Days - " + saveFile.days).endline();
        element.text("  Gender - ");
        if (saveFile.gender === Gender.NONE)
            element.text("U");
        if (saveFile.gender === Gender.MALE)
            element.text("M");
        if (saveFile.gender === Gender.FEMALE)
            element.text("F");
        if (saveFile.gender === Gender.HERM)
            element.text("H");
        element.endline();
    }
    else {
        element.text("EMPTY").bold();
        element.text("\n\n");
    }
}
