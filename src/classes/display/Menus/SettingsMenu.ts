import MainScreen, { TopButton } from "./MainScreen";
import Flags, { FlagEnum } from "../Game/Flags";
import MainMenu from "./MainMenu";
import ControlsMenu from "./ControlsMenu";

export default class SettingsMenu {
    public static display() {
        MainScreen.showTopButton(TopButton.MainMenu);
        MainScreen.showTopButton(TopButton.Data);

        MainScreen.text("<b>Settings toggles:</b>\n", true);

        if (debug)
            MainScreen.text("Debug mode enabled: <b>Yes</b>\n	Items will not be consumed by use, fleeing always succeeds, and bad-ends can be ignored.");
        else
            MainScreen.text("Debug mode enabled: <b>No</b>\n	Items consumption will occur as normal.");

        MainScreen.text("\n\n");

        if (Flags.list[FlagEnum.SHOW_SPRITES_FLAG] == 0)
            MainScreen.text("Sprites enabled: <b>Yes</b>.\n	You like to look at pretty pictures.");
        else
            MainScreen.text("Sprites enabled: <b>No</b>.\n	There are only words. Nothing else.");

        MainScreen.text("\n\n");

        if (Flags.list[FlagEnum.EASY_MODE_ENABLE_FLAG])
            MainScreen.text("Easy Mode <b>On</b>\n	Bad-ends can be ignored and combat is easier.");
        else
            MainScreen.text("Easy Mode <b>Off</b>\n	Bad-ends can ruin your game and combat is challenging.");

        MainScreen.text("\n\n");

        if (Flags.list[FlagEnum.SILLY_MODE_ENABLE_FLAG])
            MainScreen.text("Silly Mode <b>On</b>\n	Crazy, nonsensical, and possibly hilarious things may occur.");
        else
            MainScreen.text("Silly Mode <b>Off</b>\n	You're an incorrigable stick-in-the-mud with no sense of humor.");

        MainScreen.text("\n\n");
        MainScreen.text("<b>The following flags are not fully implemented yet (e.g. they don't apply in <i>all</i> cases where they could be relevant).</b>\n");
        MainScreen.text("Additional note: You <b>must</b> be <i>in a game session</i> (e.g. load your save, hit \"Main Menu\", change the flag settings, and then hit \"Resume\") to change these flags. They're saved into the saveGame file, so if you load a save, it will clear them to the state in that save.");
        MainScreen.text("\n\n");

        if (Flags.list[FlagEnum.LOW_STANDARDS_FOR_ALL]) {
            MainScreen.text("Low standards Mode <b>On</b>\n	NPCs ignore body type preferences.");
            MainScreen.text("\n	(Not gender preferences though. You still need the right hole.)");
        }
        else
            MainScreen.text("Low standards Mode <b>Off</b>\n	NPCs have body-type preferences.");


        MainScreen.text("\n\n");

        if (Flags.list[FlagEnum.HYPER_HAPPY]) {
            MainScreen.text("Hyper Happy mode <b>On</b>\n	Only reducto and humus shrink endowments.");
            MainScreen.text("\n	Incubus draft doesn't affect breasts, and succubi milk doesn't affect cocks.")
        }
        else
            MainScreen.text("Hyper Happy mode <b>Off</b>\n	Male enhancement potions shrink female endowments, and vice versa.");

        MainScreen.hideButtons();
        MainScreen.addButton(0, "Toggle Debug", SettingsMenu.toggleDebug);
        MainScreen.addButton(1, "Sprite Toggle", SettingsMenu.toggleSpritesFlag);
        MainScreen.addButton(2, "EZ Mode", SettingsMenu.toggleEasyModeFlag);
        MainScreen.addButton(3, "Larger Font", SettingsMenu.incFontSize);
        MainScreen.addButton(4, "Controls", ControlsMenu.display);
        MainScreen.addButton(5, "Hyper Happy", SettingsMenu.toggleHyperHappy);
        MainScreen.addButton(6, "Low Standards", SettingsMenu.toggleStandards);
        MainScreen.addButton(7, "Silly Toggle", SettingsMenu.toggleSillyFlag);
        MainScreen.addButton(8, "Smaller Font", SettingsMenu.decFontSize);
        MainScreen.addButton(9, "Back", MainMenu.display);
    }

    public static incFontSize(): void {
        // increase font size by 1 on main screen
        let fontSize: number;
        Flags.set(FlagEnum.CUSTOM_FONT_SIZE, fontSize);
    }

    public static decFontSize(): void {
        // decrease font size by 1 on main screen
        let fontSize: number;
        Flags.set(FlagEnum.CUSTOM_FONT_SIZE, fontSize);
    }

    public static toggleStandards(): void {
        //toggle debug
        if (Flags.list[FlagEnum.LOW_STANDARDS_FOR_ALL])
            Flags.list[FlagEnum.LOW_STANDARDS_FOR_ALL] = 0;
        else
            Flags.list[FlagEnum.LOW_STANDARDS_FOR_ALL] = 1;
    }

    public static toggleHyperHappy(): void {
        //toggle debug
        if (Flags.list[FlagEnum.HYPER_HAPPY])
            Flags.list[FlagEnum.HYPER_HAPPY] = 0;
        else
            Flags.list[FlagEnum.HYPER_HAPPY] = 1;
    }

    public static toggleDebug(): void {
        //toggle debug
        if (debug)
            debug = false;
        else
            debug = true;
    }

    public static toggleEasyModeFlag(): void {
        if (Flags.list[FlagEnum.EASY_MODE_ENABLE_FLAG] == 0)
            Flags.list[FlagEnum.EASY_MODE_ENABLE_FLAG] = 1;
        else
            Flags.list[FlagEnum.EASY_MODE_ENABLE_FLAG] = 0;
    }

    public static toggleSpritesFlag(): void {
        if (Flags.list[FlagEnum.SHOW_SPRITES_FLAG])
            Flags.list[FlagEnum.SHOW_SPRITES_FLAG] = 0;
        else
            Flags.list[FlagEnum.SHOW_SPRITES_FLAG] = 1;
    }

    public static toggleSillyFlag(): void {

        if (Flags.list[FlagEnum.SILLY_MODE_ENABLE_FLAG])
            Flags.list[FlagEnum.SILLY_MODE_ENABLE_FLAG] = 0;
        else
            Flags.list[FlagEnum.SILLY_MODE_ENABLE_FLAG] = 1;
    }

}