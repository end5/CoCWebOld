import { DisplayText } from '../../Engine/display/DisplayText';
import { MainScreen, TopButton } from '../../Engine/Display/MainScreen';
import { NextScreenChoices } from '../ScreenDisplay';
import { User } from '../User';
import { mainMenu } from './MainMenu';
import { controlsMenu } from './ControlsMenu';

export function settingsMenu(): NextScreenChoices {
    MainScreen.getTopButton(TopButton.MainMenu).show();
    MainScreen.getTopButton(TopButton.Data).show();

    DisplayText().clear();
    DisplayText("<b>Settings toggles:</b>\n");

    if (User.settings.debug)
        DisplayText("Debug mode enabled: <b>Yes</b>\n	Items will not be consumed by use, fleeing always succeeds, and bad-ends can be ignored.");
    else
        DisplayText("Debug mode enabled: <b>No</b>\n	Items consumption will occur as normal.");

    DisplayText("\n\n");

    if (User.settings.showSprites)
        DisplayText("Sprites enabled: <b>Yes</b>.\n	You like to look at pretty pictures.");
    else
        DisplayText("Sprites enabled: <b>No</b>.\n	There are only words. Nothing else.");

    DisplayText("\n\n");

    if (User.settings.easyMode)
        DisplayText("Easy Mode <b>On</b>\n	Bad-ends can be ignored and combat is easier.");
    else
        DisplayText("Easy Mode <b>Off</b>\n	Bad-ends can ruin your game and combat is challenging.");

    DisplayText("\n\n");

    if (User.settings.sillyMode)
        DisplayText("Silly Mode <b>On</b>\n	Crazy, nonsensical, and possibly hilarious things may occur.");
    else
        DisplayText("Silly Mode <b>Off</b>\n	You're an incorrigable stick-in-the-mud with no sense of humor.");

    DisplayText("\n\n");
    DisplayText("<b>The following flags are not fully implemented yet (e.g. they don't apply in <i>all</i> cases where they could be relevant).</b>\n");
    DisplayText("Additional note: You <b>must</b> be <i>in a game session</i> (e.g. load your save, hit \"Main Menu\", change the flag settings, and then hit \"Resume\") to change these flags. They're saved into the saveGame file, so if you load a save, it will clear them to the state in that save.");
    DisplayText("\n\n");

    if (User.settings.lowStandards) {
        DisplayText("Low standards Mode <b>On</b>\n	NPCs ignore body type preferences.");
        DisplayText("\n	(Not gender preferences though. You still need the right hole.)");
    }
    else
        DisplayText("Low standards Mode <b>Off</b>\n	NPCs have body-type preferences.");

    DisplayText("\n\n");

    if (User.settings.hyperHappy) {
        DisplayText("Hyper Happy mode <b>On</b>\n	Only reducto and humus shrink endowments.");
        DisplayText("\n	Incubus draft doesn't affect breasts, and succubi milk doesn't affect cocks.");
    }
    else
        DisplayText("Hyper Happy mode <b>Off</b>\n	Male enhancement potions shrink female endowments, and vice versa.");

    return {
        choices: [
                ["Toggle Debug", toggleDebug],
                ["Sprite Toggle", toggleSpritesFlag],
                ["EZ Mode", toggleEasyModeFlag],
                ["Larger Font", incFontSize],
                ["Controls", controlsMenu],
                ["Hyper Happy", toggleHyperHappy],
                ["Low Standards", toggleStandards],
                ["Silly Toggle", toggleSillyFlag],
                ["Smaller Font", decFontSize],
        ],
        persistantChoices: [
            ["Back", mainMenu]
        ]
    };
}

function incFontSize(): NextScreenChoices {
    User.settings.customFontSize++;
    DisplayText().style.fontSize = User.settings.customFontSize + "px";
    return settingsMenu();
}

function decFontSize(): NextScreenChoices {
    User.settings.customFontSize--;
    DisplayText().style.fontSize = User.settings.customFontSize + "px";
    return settingsMenu();
}

function toggleStandards(): NextScreenChoices {
    User.settings.lowStandards = !User.settings.lowStandards;
    return settingsMenu();
}

function toggleHyperHappy(): NextScreenChoices {
    User.settings.hyperHappy = !User.settings.hyperHappy;
    return settingsMenu();
}

function toggleDebug(): NextScreenChoices {
    User.settings.debug = !User.settings.debug;
    return settingsMenu();
}

function toggleEasyModeFlag(): NextScreenChoices {
    User.settings.easyMode = !User.settings.easyMode;
    return settingsMenu();
}

function toggleSpritesFlag(): NextScreenChoices {
    User.settings.showSprites = !User.settings.showSprites;
    return settingsMenu();
}

function toggleSillyFlag(): NextScreenChoices {
    User.settings.sillyMode = !User.settings.sillyMode;
    return settingsMenu();
}
