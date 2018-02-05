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

        DisplayText().clear();
        DisplayText("<b>Settings toggles:</b>\n");

        if (Game.settings.debug)
            DisplayText("Debug mode enabled: <b>Yes</b>\n	Items will not be consumed by use, fleeing always succeeds, and bad-ends can be ignored.");
        else
            DisplayText("Debug mode enabled: <b>No</b>\n	Items consumption will occur as normal.");

        DisplayText("\n\n");

        if (Flags.list[FlagEnum.SHOW_SPRITES_FLAG] === 0)
            DisplayText("Sprites enabled: <b>Yes</b>.\n	You like to look at pretty pictures.");
        else
            DisplayText("Sprites enabled: <b>No</b>.\n	There are only words. Nothing else.");

        DisplayText("\n\n");

        if (Flags.list[FlagEnum.EASY_MODE_ENABLE_FLAG])
            DisplayText("Easy Mode <b>On</b>\n	Bad-ends can be ignored and combat is easier.");
        else
            DisplayText("Easy Mode <b>Off</b>\n	Bad-ends can ruin your game and combat is challenging.");

        DisplayText("\n\n");

        if (Flags.list[FlagEnum.SILLY_MODE_ENABLE_FLAG])
            DisplayText("Silly Mode <b>On</b>\n	Crazy, nonsensical, and possibly hilarious things may occur.");
        else
            DisplayText("Silly Mode <b>Off</b>\n	You're an incorrigable stick-in-the-mud with no sense of humor.");

        DisplayText("\n\n");
        DisplayText("<b>The following flags are not fully implemented yet (e.g. they don't apply in <i>all</i> cases where they could be relevant).</b>\n");
        DisplayText("Additional note: You <b>must</b> be <i>in a game session</i> (e.g. load your save, hit \"Main Menu\", change the flag settings, and then hit \"Resume\") to change these flags. They're saved into the saveGame file, so if you load a save, it will clear them to the state in that save.");
        DisplayText("\n\n");

        if (Flags.list[FlagEnum.LOW_STANDARDS_FOR_ALL]) {
            DisplayText("Low standards Mode <b>On</b>\n	NPCs ignore body type preferences.");
            DisplayText("\n	(Not gender preferences though. You still need the right hole.)");
        }
        else
            DisplayText("Low standards Mode <b>Off</b>\n	NPCs have body-type preferences.");

        DisplayText("\n\n");

        if (Flags.list[FlagEnum.HYPER_HAPPY]) {
            DisplayText("Hyper Happy mode <b>On</b>\n	Only reducto and humus shrink endowments.");
            DisplayText("\n	Incubus draft doesn't affect breasts, and succubi milk doesn't affect cocks.");
        }
        else
            DisplayText("Hyper Happy mode <b>Off</b>\n	Male enhancement potions shrink female endowments, and vice versa.");

        MainScreen.hideBottomButtons();
        MainScreen.getBottomButton(0).modify("Toggle Debug", this.toggleDebug);
        MainScreen.getBottomButton(1).modify("Sprite Toggle", this.toggleSpritesFlag);
        MainScreen.getBottomButton(2).modify("EZ Mode", this.toggleEasyModeFlag);
        MainScreen.getBottomButton(3).modify("Larger Font", this.incFontSize);
        MainScreen.getBottomButton(4).modify("Controls", Menus.Controls.display);
        MainScreen.getBottomButton(5).modify("Hyper Happy", this.toggleHyperHappy);
        MainScreen.getBottomButton(6).modify("Low Standards", this.toggleStandards);
        MainScreen.getBottomButton(7).modify("Silly Toggle", this.toggleSillyFlag);
        MainScreen.getBottomButton(8).modify("Smaller Font", this.decFontSize);
        MainScreen.getBottomButton(9).modify("Back", Menus.MainMenu.display);
    }

    public incFontSize(): void {
        Game.settings.customFontSize++;
    }

    public decFontSize(): void {
        Game.settings.customFontSize--;
    }

    public toggleStandards(): void {
        Game.settings.lowStandards = !Game.settings.lowStandards;
    }

    public toggleHyperHappy(): void {
        Game.settings.hyperHappy = !Game.settings.hyperHappy;
    }

    public toggleDebug(): void {
        Game.settings.debug = !Game.settings.debug;
    }

    public toggleEasyModeFlag(): void {
        Game.settings.easyMode = !Game.settings.easyMode;
    }

    public toggleSpritesFlag(): void {
        Game.settings.showSprites = !Game.settings.showSprites;
    }

    public toggleSillyFlag(): void {
        Game.settings.sillyMode = !Game.settings.sillyMode;
    }
}
