import Menu from './Menu';
import Menus from './Menus';
import BindableAction from '../../Input/BindableAction';
import InputManager from '../../Input/InputManager';
import Player from '../../Player/Player';
import DisplayText from '../DisplayText';
import ButtonElement, { ClickFunction } from '../Elements/ButtonElement';
import ListItemElement from '../Elements/ListItemElement';
import UnorderedListElement from '../Elements/UnorderedListElement';
import MainScreen from '../MainScreen';

export default class ControlsMenu implements Menu {
    public display() {
        DisplayText().clear();
        DisplayText("<b>Keyboard Control Bindings:</b>\n\n");
        DisplayText("Click a button next to the action you wish to bind to a new key, then hit the key you want to bind the selected action to.\n\n");
        DisplayText("Custom bindings are stored inside your save game files.\n\n");
        DisplayText("Duplicate keys are automatically unbound from their old control action.\n\n");
        DisplayText("<b>Reset Ctrls</b> will reset all of the control bindings to their defaults.\n\n");
        DisplayText("<b>Clear Ctrls</b> will remove all of the current control bindings, leaving everything Unbound.\n\n");

        const bindListElement = new UnorderedListElement();
        DisplayText().appendElement(bindListElement);

        this.listBindableAction(bindListElement, "Stats", BindableAction.Stats);
        this.listBindableAction(bindListElement, "Level Up", BindableAction.LevelUp);
        this.listBindableAction(bindListElement, "Quicksave 1", BindableAction.Quicksave1);
        this.listBindableAction(bindListElement, "Quicksave 2", BindableAction.Quicksave2);
        this.listBindableAction(bindListElement, "Quicksave 3", BindableAction.Quicksave3);
        this.listBindableAction(bindListElement, "Quicksave 4", BindableAction.Quicksave4);
        this.listBindableAction(bindListElement, "Quicksave 5", BindableAction.Quicksave5);
        this.listBindableAction(bindListElement, "Quickload 1", BindableAction.Quickload1);
        this.listBindableAction(bindListElement, "Quickload 2", BindableAction.Quickload2);
        this.listBindableAction(bindListElement, "Quickload 3", BindableAction.Quickload3);
        this.listBindableAction(bindListElement, "Quickload 4", BindableAction.Quickload4);
        this.listBindableAction(bindListElement, "Quickload 5", BindableAction.Quickload5);
        this.listBindableAction(bindListElement, "Show Menu", BindableAction.MainMenu);
        this.listBindableAction(bindListElement, "Data Menu", BindableAction.SaveLoad);
        this.listBindableAction(bindListElement, "Appearance Page", BindableAction.Appearance);
        this.listBindableAction(bindListElement, "No", BindableAction.No);
        this.listBindableAction(bindListElement, "Yes", BindableAction.Yes);
        this.listBindableAction(bindListElement, "Show Perks", BindableAction.Perks);
        this.listBindableAction(bindListElement, "Continue", BindableAction.Back);
        this.listBindableAction(bindListElement, "Cycle Background", BindableAction.CycleBackground);
        this.listBindableAction(bindListElement, "Button 1", BindableAction.Button0);
        this.listBindableAction(bindListElement, "Button 2", BindableAction.Button1);
        this.listBindableAction(bindListElement, "Button 3", BindableAction.Button2);
        this.listBindableAction(bindListElement, "Button 4", BindableAction.Button3);
        this.listBindableAction(bindListElement, "Button 5", BindableAction.Button4);
        this.listBindableAction(bindListElement, "Button 6", BindableAction.Button5);
        this.listBindableAction(bindListElement, "Button 7", BindableAction.Button6);
        this.listBindableAction(bindListElement, "Button 8", BindableAction.Button7);
        this.listBindableAction(bindListElement, "Button 9", BindableAction.Button8);
        this.listBindableAction(bindListElement, "Button 10", BindableAction.Button9);

        MainScreen.hideBottomButtons();
        MainScreen.getBottomButton(0).modify("Reset Ctrls", this.resetControls);
        MainScreen.getBottomButton(1).modify("Clear Ctrls", this.clearControls);
        MainScreen.addBackButton("Back", Menus.Settings.display);
    }

    private listBindableAction(bindListElement: UnorderedListElement, text: string, bindableAction: BindableAction) {
        const bindElement = new ListItemElement();
        bindListElement.appendElement(bindElement);
        bindElement.text(text).bold();

        const button1 = new ButtonElement();
        bindElement.appendElement(button1);
        button1.modify(InputManager.get(bindableAction).primaryKey.toString(), (player: Player, event: KeyboardEvent) => {
            const key = InputManager.get(bindableAction).primaryKey;
            key.keyCode = event.keyCode;
            key.shiftKey = event.shiftKey;
            key.altKey = event.altKey;
            key.ctrlKey = event.ctrlKey;
            key.metaKey = event.metaKey;
        });

        const button2 = new ButtonElement();
        bindElement.appendElement(button2);
        button2.modify(InputManager.get(bindableAction).secondaryKey.toString(), (player: Player, event: KeyboardEvent) => {
            const key = InputManager.get(bindableAction).secondaryKey;
            key.keyCode = event.keyCode;
            key.shiftKey = event.shiftKey;
            key.altKey = event.altKey;
            key.ctrlKey = event.ctrlKey;
            key.metaKey = event.metaKey;
        });
    }

    public resetControls() {
        DisplayText().clear();
        DisplayText("Are you sure you want to reset all of the currently bound controls to their defaults?");

        MainScreen.doYesNo(this.resetControlsYes, this.display);
    }

    public resetControlsYes(): void {
        InputManager.resetAll();

        DisplayText().clear();
        DisplayText("Controls have been reset to defaults!");

        MainScreen.doNext(this.display);
    }

    public clearControls(): void {

        DisplayText().clear();
        DisplayText("Are you sure you want to clear all of the currently bound controls?");

        MainScreen.doYesNo(this.clearControlsYes, this.display);
    }

    public clearControlsYes(): void {
        InputManager.clearAll();

        DisplayText().clear();
        DisplayText("Controls have been cleared!");

        MainScreen.doNext(this.display);
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
}
