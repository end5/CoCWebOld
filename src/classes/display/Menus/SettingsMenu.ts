import ControlsMenu from './ControlsMenu';
import MainMenu from './MainMenu';
import Menu from './Menu';
import Menus from './Menus';
import Flags, { FlagEnum } from '../../Game/Flags';
import Game from '../../Game/Game';
import DisplayText from '../DisplayText';
import MainScreen, { TopButton } from '../MainScreen';

export default class SettingsMenu implements Menu {
    public display() {
        MainScreen.getTopButton(TopButton.MainMenu).show();
        MainScreen.getTopButton(TopButton.Data).show();

        DisplayText.clear();
        DisplayText.text("<b>Settings toggles:</b>\n");

        if (Game.settings.debug)
            DisplayText.text("Debug mode enabled: <b>Yes</b>\n	Items will not be consumed by use, fleeing always succeeds, and bad-ends can be ignored.");
        else
            DisplayText.text("Debug mode enabled: <b>No</b>\n	Items consumption will occur as normal.");

        DisplayText.text("\n\n");

        if (Flags.list[FlagEnum.SHOW_SPRITES_FLAG] == 0)
            DisplayText.text("Sprites enabled: <b>Yes</b>.\n	You like to look at pretty pictures.");
        else
            DisplayText.text("Sprites enabled: <b>No</b>.\n	There are only words. Nothing else.");

        DisplayText.text("\n\n");

        if (Flags.list[FlagEnum.EASY_MODE_ENABLE_FLAG])
            DisplayText.text("Easy Mode <b>On</b>\n	Bad-ends can be ignored and combat is easier.");
        else
            DisplayText.text("Easy Mode <b>Off</b>\n	Bad-ends can ruin your game and combat is challenging.");

        DisplayText.text("\n\n");

        if (Flags.list[FlagEnum.SILLY_MODE_ENABLE_FLAG])
            DisplayText.text("Silly Mode <b>On</b>\n	Crazy, nonsensical, and possibly hilarious things may occur.");
        else
            DisplayText.text("Silly Mode <b>Off</b>\n	You're an incorrigable stick-in-the-mud with no sense of humor.");

        DisplayText.text("\n\n");
        DisplayText.text("<b>The following flags are not fully implemented yet (e.g. they don't apply in <i>all</i> cases where they could be relevant).</b>\n");
        DisplayText.text("Additional note: You <b>must</b> be <i>in a game session</i> (e.g. load your save, hit \"Main Menu\", change the flag settings, and then hit \"Resume\") to change these flags. They're saved into the saveGame file, so if you load a save, it will clear them to the state in that save.");
        DisplayText.text("\n\n");

        if (Flags.list[FlagEnum.LOW_STANDARDS_FOR_ALL]) {
            DisplayText.text("Low standards Mode <b>On</b>\n	NPCs ignore body type preferences.");
            DisplayText.text("\n	(Not gender preferences though. You still need the right hole.)");
        }
        else
            DisplayText.text("Low standards Mode <b>Off</b>\n	NPCs have body-type preferences.");


        DisplayText.text("\n\n");

        if (Flags.list[FlagEnum.HYPER_HAPPY]) {
            DisplayText.text("Hyper Happy mode <b>On</b>\n	Only reducto and humus shrink endowments.");
            DisplayText.text("\n	Incubus draft doesn't affect breasts, and succubi milk doesn't affect cocks.")
        }
        else
            DisplayText.text("Hyper Happy mode <b>Off</b>\n	Male enhancement potions shrink female endowments, and vice versa.");

        MainScreen.hideBottomButtons();
        MainScreen.getBottomButton(0).modify("Toggle Debug", SettingsMenu.toggleDebug);
        MainScreen.getBottomButton(1).modify("Sprite Toggle", SettingsMenu.toggleSpritesFlag);
        MainScreen.getBottomButton(2).modify("EZ Mode", SettingsMenu.toggleEasyModeFlag);
        MainScreen.getBottomButton(3).modify("Larger Font", SettingsMenu.incFontSize);
        MainScreen.getBottomButton(4).modify("Controls", ControlsMenu.display);
        MainScreen.getBottomButton(5).modify("Hyper Happy", SettingsMenu.toggleHyperHappy);
        MainScreen.getBottomButton(6).modify("Low Standards", SettingsMenu.toggleStandards);
        MainScreen.getBottomButton(7).modify("Silly Toggle", SettingsMenu.toggleSillyFlag);
        MainScreen.getBottomButton(8).modify("Smaller Font", SettingsMenu.decFontSize);
        MainScreen.getBottomButton(9).modify("Back", Menus.MainMenu.display);
    }

    public static incFontSize(): void {
        Game.settings.customFontSize++;
    }

    public static decFontSize(): void {
        Game.settings.customFontSize--;
    }

    public static toggleStandards(): void {
        Game.settings.lowStandards = !Game.settings.lowStandards;
    }

    public static toggleHyperHappy(): void {
        Game.settings.hyperHappy = !Game.settings.hyperHappy;
    }

    public static toggleDebug(): void {
        Game.settings.debug = !Game.settings.debug;
    }

    public static toggleEasyModeFlag(): void {
        Game.settings.easyMode = !Game.settings.easyMode;
    }

    public static toggleSpritesFlag(): void {
        Game.settings.showSprites = !Game.settings.showSprites;
    }

    public static toggleSillyFlag(): void {
        Game.settings.sillyMode = !Game.settings.sillyMode;
    }
}