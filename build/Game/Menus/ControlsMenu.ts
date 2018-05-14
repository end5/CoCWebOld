import { Menus } from './Menus';
import { DisplayText } from '../../Engine/display/DisplayText';
import { ButtonElement } from '../../Engine/Display/Elements/ButtonElement';
import { ListEntryElement } from '../../Engine/Display/Elements/ListItemElement';
import { ParagraphElement } from '../../Engine/display/Elements/ParagraphElement';
import { UnorderedListElement } from '../../Engine/Display/Elements/UnorderedListElement';
import { BindableAction } from '../../Engine/Input/BindableAction';
import { InputManager } from '../../Engine/Input/InputManager';
import { KeyCombination } from '../../Engine/Input/KeyCombination';
import { Character } from '../Character/Character';
import { NextScreenChoices } from '../ScreenDisplay';

export function display(): NextScreenChoices {
    DisplayText().clear();
    DisplayText("<b>Keyboard Control Bindings:</b>\n\n");
    DisplayText("Click a button next to the action you wish to bind to a new key, then hit the key you want to bind the selected action to.\n\n");
    DisplayText("Custom bindings are stored inside your save game files.\n\n");
    DisplayText("Duplicate keys are automatically unbound from their old control action.\n\n");
    DisplayText("<b>Reset Ctrls</b> will reset all of the control bindings to their defaults.\n\n");
    DisplayText("<b>Clear Ctrls</b> will remove all of the current control bindings, leaving everything Unbound.\n\n");

    const bindListElement = new UnorderedListElement();
    DisplayText().appendElement(bindListElement);

    listBindableAction(bindListElement, "Stats", BindableAction.Stats);
    listBindableAction(bindListElement, "Level Up", BindableAction.LevelUp);
    listBindableAction(bindListElement, "Quicksave 1", BindableAction.Quicksave1);
    listBindableAction(bindListElement, "Quicksave 2", BindableAction.Quicksave2);
    listBindableAction(bindListElement, "Quicksave 3", BindableAction.Quicksave3);
    listBindableAction(bindListElement, "Quicksave 4", BindableAction.Quicksave4);
    listBindableAction(bindListElement, "Quicksave 5", BindableAction.Quicksave5);
    listBindableAction(bindListElement, "Quickload 1", BindableAction.Quickload1);
    listBindableAction(bindListElement, "Quickload 2", BindableAction.Quickload2);
    listBindableAction(bindListElement, "Quickload 3", BindableAction.Quickload3);
    listBindableAction(bindListElement, "Quickload 4", BindableAction.Quickload4);
    listBindableAction(bindListElement, "Quickload 5", BindableAction.Quickload5);
    listBindableAction(bindListElement, "Show Menu", BindableAction.MainMenu);
    listBindableAction(bindListElement, "Data Menu", BindableAction.SaveLoad);
    listBindableAction(bindListElement, "Appearance Page", BindableAction.Appearance);
    listBindableAction(bindListElement, "No", BindableAction.No);
    listBindableAction(bindListElement, "Yes", BindableAction.Yes);
    listBindableAction(bindListElement, "Show Perks", BindableAction.Perks);
    listBindableAction(bindListElement, "Continue", BindableAction.Back);
    listBindableAction(bindListElement, "Cycle Background", BindableAction.CycleBackground);
    listBindableAction(bindListElement, "Button 1", BindableAction.Button0);
    listBindableAction(bindListElement, "Button 2", BindableAction.Button1);
    listBindableAction(bindListElement, "Button 3", BindableAction.Button2);
    listBindableAction(bindListElement, "Button 4", BindableAction.Button3);
    listBindableAction(bindListElement, "Button 5", BindableAction.Button4);
    listBindableAction(bindListElement, "Button 6", BindableAction.Button5);
    listBindableAction(bindListElement, "Button 7", BindableAction.Button6);
    listBindableAction(bindListElement, "Button 8", BindableAction.Button7);
    listBindableAction(bindListElement, "Button 9", BindableAction.Button8);
    listBindableAction(bindListElement, "Button 10", BindableAction.Button9);

    return { choices: [["Reset Ctrls", resetControls], ["Clear Ctrls", clearControls]], persistantChoices: [["Back", Menus.Settings]] };
}

function listBindableAction(bindListElement: UnorderedListElement, text: string, bindableAction: BindableAction) {
    const bindElement = new ListEntryElement();
    bindListElement.appendElement(bindElement);
    bindElement.text(text).bold();

    const button1 = new ButtonElement();
    bindElement.appendElement(button1);
    let primaryKeyName = "";
    if (InputManager.get(bindableAction).primaryKey)
        primaryKeyName = InputManager.get(bindableAction).primaryKey.toString();
    button1.modify(primaryKeyName, () => {
        document.addEventListener("keypress", function keyBind(event: KeyboardEvent) {
            const key = new KeyCombination();
            key.keyCode = event.keyCode;
            key.shiftKey = event.shiftKey;
            key.altKey = event.altKey;
            key.ctrlKey = event.ctrlKey;
            key.metaKey = event.metaKey;
            InputManager.get(bindableAction).primaryKey = key;
            display();
            document.removeEventListener("keypress", keyBind);
        });
    });

    const button2 = new ButtonElement();
    bindElement.appendElement(button2);
    let secondaryKeyName = "";
    if (InputManager.get(bindableAction).secondaryKey)
        secondaryKeyName = InputManager.get(bindableAction).secondaryKey.toString();
    button2.modify(secondaryKeyName, () => {
        document.addEventListener("keypress", function keyBind(event: KeyboardEvent) {
            const key = new KeyCombination();
            key.keyCode = event.keyCode;
            key.shiftKey = event.shiftKey;
            key.altKey = event.altKey;
            key.ctrlKey = event.ctrlKey;
            key.metaKey = event.metaKey;
            InputManager.get(bindableAction).secondaryKey = key;
            display();
            document.removeEventListener("keypress", keyBind);
        });
    });

    bindElement.style.height = button1.computedStyle.height;
    bindElement.style.width = "200px";
    button1.style.marginLeft = "200px";
    button2.style.marginLeft = parseFloat(button1.computedStyle.width) + 200 + "px";
}

function resetControls(): NextScreenChoices {
    DisplayText().clear();
    DisplayText("Are you sure you want to reset all of the currently bound controls to their defaults?");

    return { yes: resetControlsYes, no: display };
}

function resetControlsYes(): NextScreenChoices {
    InputManager.resetAll();

    DisplayText().clear();
    DisplayText("Controls have been reset to defaults!");

    return { next: display };
}

function clearControls(): NextScreenChoices {

    DisplayText().clear();
    DisplayText("Are you sure you want to clear all of the currently bound controls?");

    return { yes: clearControlsYes, no: display };
}

function clearControlsYes(): NextScreenChoices {
    InputManager.clearAll();

    DisplayText().clear();
    DisplayText("Controls have been cleared!");

    return { next: display };
}

/*
--Default controls
    Show Stats		S
    Level Up		L
    Quicksave1...5	F1..F5
    Quickload1...5	F6..F10
    Show Menu		backspace
    Data Menu		D
    Appearance Page	A
    No				N
    Yes				Y
    Show Perks		P
    Continue		Enter		Space
    Cycle Background	Home
    Button 1..5		Number 1..5
    Button 6..10	Number 6..0	QWERT

*/
