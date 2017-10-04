import MainScreen from "./MainScreen";
import InputManager from "../InputManager";

export default class ControlsMenu {
    public static display() {

        MainScreen.clearText();
        MainScreen.text("<b>Keyboard Control Bindings:</b>\n\n");
        MainScreen.text("Click a button next to the action you wish to bind to a new key, then hit the key you want to bind the selected action to.\n\n");
        MainScreen.text("Custom bindings are stored inside your save game files.\n\n");
        MainScreen.text("Duplicate keys are automatically unbound from their old control action.\n\n");
        MainScreen.text("<b>Reset Ctrls</b> will reset all of the control bindings to their defaults.\n\n");
        MainScreen.text("<b>Clear Ctrls</b> will remove all of the current control bindings, leaving everything Unbound.\n\n");

        // create buttons here

        //

        MainScreen.hideButtons();
        MainScreen.addButton(0, "Reset Ctrls", ControlsMenu.resetControls);
        MainScreen.addButton(1, "Clear Ctrls", ControlsMenu.clearControls);
        MainScreen.addButton(9, "Back", ControlsMenu.hideControls);

    }

    public static hideControls(): void {
        InputManager.HideBindingPane();

        settingsScreen();
    }

    public static resetControls(): void {
        InputManager.HideBindingPane();

        MainScreen.text("Are you sure you want to reset all of the currently bound controls to their defaults?", true);

        MainScreen.doYesNo(ControlsMenu.resetControlsYes, ControlsMenu.display);
    }

    public static resetControlsYes(): void {
        InputManager.ResetToDefaults();

        MainScreen.text("Controls have been reset to defaults!\n\n", true);

        MainScreen.doNext(ControlsMenu.display);
    }

    public static clearControls(): void {
        InputManager.HideBindingPane();

        MainScreen.text("Are you sure you want to clear all of the currently bound controls?", true);

        MainScreen.doYesNo(ControlsMenu.clearControlsYes, ControlsMenu.display);
    }

    public static clearControlsYes(): void {
        InputManager.ClearAllBinds();

        MainScreen.text("Controls have been cleared!", true);

        MainScreen.doNext(ControlsMenu.display);
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