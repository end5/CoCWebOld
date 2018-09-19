import { DisplayText } from '../../Engine/display/DisplayText';
import { MainScreen, TopButton } from '../../Engine/Display/MainScreen';
import { clickFuncWrapper, NextScreenChoices } from '../ScreenDisplay';
import { User } from '../User';
import { isEaster, isValentine } from '../Utilities/Dates';
import { VersionInfo } from '../VersionInfo';
import { statsMenu } from './InGame/StatsMenu';
import { perkUpMenu } from './InGame/PerkUpMenu';
import { appearanceMenu } from './InGame/PlayerAppearanceMenu';
import { charCreationMenu } from './InGame/CharCreationMenu';
import { dataMenu } from './DataMenu';
import { creditsMenu } from './CreditsMenu';
import { settingsMenu } from './SettingsMenu';
import { campMenu } from './InGame/PlayerMenu';

export function mainMenu(): NextScreenChoices {
    if (!User.char)
        MainScreen.getStatsPanel().hide();
    // Reset newgame buttons
    MainScreen.getTopButton(TopButton.Stats).modify("Stats", clickFuncWrapper(statsMenu));
    MainScreen.getTopButton(TopButton.PerkUp).modify("Perk Up", clickFuncWrapper(perkUpMenu));
    MainScreen.getTopButton(TopButton.Perks).modify("Perks", clickFuncWrapper(perkUpMenu));
    MainScreen.getTopButton(TopButton.Appearance).modify("Appearance", clickFuncWrapper(appearanceMenu));
    MainScreen.hideTopButtons();
    MainScreen.getTopButton(TopButton.MainMenu).modify("New Game", clickFuncWrapper(charCreationMenu));
    MainScreen.getTopButton(TopButton.Data).modify("Data", clickFuncWrapper(dataMenu));

    DisplayText().clear();
    DisplayText("Corruption of Champions Web Edition v" + VersionInfo.number).bold().endline();
    DisplayText(VersionInfo.stability + " Build").endline();

    DisplayText(`
        This is a port of the original Corruption of Champions (0.9.4c) by end5.
        <br>
        <br>Original Version Credits:
        <br><u>Created by: Fenoxo</u>
        <br>
        <br>Edited By:
        <br>Ashi, SoS, Prisoner416, Zeikfried, et al
        <br>
        <br>Open-source contributions by:
        <br>aimozg, Amygdala, Cmacleod42, Enterprise2001, Fake-Name, Gedan, Yoffy, et al
        <br>
        <br>Source Code: <u><a href='https://github.com/herp-a-derp/Corruption-of-Champions'>https://github.com/herp-a-derp/Corruption-of-Champions</a></u>
        <br>
        <br>Bug Tracker: <u><a href='https://github.com/herp-a-derp/Corruption-of-Champions/issues'>https://github.com/herp-a-derp/Corruption-of-Champions/issues</a></u>
        (requires an account, unfortunately)
        <br>
        <br>**<u>DISCLAIMER</u>**
        <br>- **There are many strange and odd fetishes contained in this flash.  Peruse at own risk.**
        <br>- **Please be 18 or the legal age to view porn before playing.**
        <br>- **Try to keep your keyboard clean.  Think of the children!**
        <br>
        <br>
        <br>For more information see Fenoxo's Blog at <b><u><a href='http://www.fenoxo.com/'>fenoxo.com</a></u></b>.
        <br>
        <br>Also go play <u><a href='http://www.furaffinity.net/view/9830293/'>Nimin</a></u> by Xadera on furaffinity.

	    `);

    if (User.settings.debug)
        DisplayText("\n\n<b>DEBUG MODE ENABLED:  ITEMS WILL NOT BE CONSUMED BY USE.</b>");
    if (User.settings.showSprites)
        DisplayText("\n\n<b>Sprites disabled.</b>");
    if (User.settings.easyMode)
        DisplayText("\n\n<b>Easy Mode On:  Bad-ends can be ignored.</b>");
    if (User.settings.sillyMode)
        DisplayText("\n\n<b>SILLY MODE ENGAGED: Crazy, nonsensical, and possibly hilarious things may occur.</b>");
    if (isEaster())
        DisplayText("\n\n<b>It's Easter!  Enjoy the eggs!</b>");
    if (isValentine())
        DisplayText("\n\n<b>It's Valentine's!</b>");
    // if (Scenes.helFollower.isHeliaBirthday())
    //     DisplayText("\n\n<b>It's Helia's Birthday Month!</b>");

    // const resume = Player;
    // if (User.char.stats.str > 0)  // we're in a game, allow resume.
    //     resume = Player;

    // MainScreen.displayChoices(
    //     ["Image Credits", "Credits", "Instructions", "Debug Info", "Settings", "Resume"],
    //     [undefined, Credits, Instructions, undefined, Settings, resume]
    // );
    return {
        choices: [
            ["Image Credits", undefined], ["Credits", creditsMenu], ["Instructions", statsMenu], ["Debug Info", undefined], ["Settings", settingsMenu], ["Resume", User.char ? campMenu : undefined]
        ]
    };
}
