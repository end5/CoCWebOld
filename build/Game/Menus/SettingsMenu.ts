import Menus from './Menus';
import DisplayText from '../../Engine/display/DisplayText';
import MainScreen, { TopButton } from '../../Engine/Display/MainScreen';
import Settings from '../Settings';

function onDisplay() {
    MainScreen.getTopButton(TopButton.MainMenu).show();
    MainScreen.getTopButton(TopButton.Data).show();

    DisplayText().clear();
    DisplayText("<b>Settings toggles:</b>\n");

    if (Settings.debug)
        DisplayText("Debug mode enabled: <b>Yes</b>\n	Items will not be consumed by use, fleeing always succeeds, and bad-ends can be ignored.");
    else
        DisplayText("Debug mode enabled: <b>No</b>\n	Items consumption will occur as normal.");

    DisplayText("\n\n");

    if (Settings.showSprites)
        DisplayText("Sprites enabled: <b>Yes</b>.\n	You like to look at pretty pictures.");
    else
        DisplayText("Sprites enabled: <b>No</b>.\n	There are only words. Nothing else.");

    DisplayText("\n\n");

    if (Settings.easyMode)
        DisplayText("Easy Mode <b>On</b>\n	Bad-ends can be ignored and combat is easier.");
    else
        DisplayText("Easy Mode <b>Off</b>\n	Bad-ends can ruin your game and combat is challenging.");

    DisplayText("\n\n");

    if (Settings.sillyMode)
        DisplayText("Silly Mode <b>On</b>\n	Crazy, nonsensical, and possibly hilarious things may occur.");
    else
        DisplayText("Silly Mode <b>Off</b>\n	You're an incorrigable stick-in-the-mud with no sense of humor.");

    DisplayText("\n\n");
    DisplayText("<b>The following flags are not fully implemented yet (e.g. they don't apply in <i>all</i> cases where they could be relevant).</b>\n");
    DisplayText("Additional note: You <b>must</b> be <i>in a game session</i> (e.g. load your save, hit \"Main Menu\", change the flag settings, and then hit \"Resume\") to change these flags. They're saved into the saveGame file, so if you load a save, it will clear them to the state in that save.");
    DisplayText("\n\n");

    if (Settings.lowStandards) {
        DisplayText("Low standards Mode <b>On</b>\n	NPCs ignore body type preferences.");
        DisplayText("\n	(Not gender preferences though. You still need the right hole.)");
    }
    else
        DisplayText("Low standards Mode <b>Off</b>\n	NPCs have body-type preferences.");

    DisplayText("\n\n");

    if (Settings.hyperHappy) {
        DisplayText("Hyper Happy mode <b>On</b>\n	Only reducto and humus shrink endowments.");
        DisplayText("\n	Incubus draft doesn't affect breasts, and succubi milk doesn't affect cocks.");
    }
    else
        DisplayText("Hyper Happy mode <b>Off</b>\n	Male enhancement potions shrink female endowments, and vice versa.");

    MainScreen.displayChoices(
        ["Toggle Debug", "Sprite Toggle", "EZ Mode", "Larger Font", "Controls", "Hyper Happy", "Low Standards", "Silly Toggle", "Smaller Font"],
        [toggleDebug, toggleSpritesFlag, toggleEasyModeFlag, incFontSize, Menus.Controls, toggleHyperHappy, toggleStandards, toggleSillyFlag, decFontSize],
        ["Back"],
        [Menus.Main]
    );
}

function incFontSize() {
    Settings.customFontSize++;
    DisplayText().style.fontSize = Settings.customFontSize + "px";
    onDisplay();
}

function decFontSize() {
    Settings.customFontSize--;
    DisplayText().style.fontSize = Settings.customFontSize + "px";
    onDisplay();
}

function toggleStandards() {
    Settings.lowStandards = !Settings.lowStandards;
    onDisplay();
}

function toggleHyperHappy() {
    Settings.hyperHappy = !Settings.hyperHappy;
    onDisplay();
}

function toggleDebug() {
    Settings.debug = !Settings.debug;
    onDisplay();
}

function toggleEasyModeFlag() {
    Settings.easyMode = !Settings.easyMode;
    onDisplay();
}

function toggleSpritesFlag() {
    Settings.showSprites = !Settings.showSprites;
    onDisplay();
}

function toggleSillyFlag() {
    Settings.sillyMode = !Settings.sillyMode;
    onDisplay();
}

const display = () => { onDisplay(); };
export default display;
