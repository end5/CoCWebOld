import Menu from './Menu';
import Menus from './Menus';
import Flags, { FlagEnum } from '../../Game/Flags';
import Game, { GameState } from '../../Game/Game';
import DateUtils from '../../Utilities/DateUtils';
import DisplayText from '../DisplayText';
import MainScreen, { TopButton } from '../MainScreen';

export default class MainMenu implements Menu {
    // MainMenu - kicks player out to the main menu
    public display() {
        MainScreen.getStatsPanel().hide();
        // Reset newgame buttons
        MainScreen.hideTopButtons();
        MainScreen.getTopButton(TopButton.MainMenu).modify("New Game", Menus.CharCreation.display);
        MainScreen.getTopButton(TopButton.Data).show();

        Game.state = GameState.MainMenu;

        DisplayText().clear();
        DisplayText("Corruption of Champions (" + VersionInfo.version + ")").bold();
        DisplayText(VersionInfo.build);

        DisplayText(`<![CDATA[
        <br>(Formerly Unnamed Text Game)
        <u>Created by: Fenoxo</u>

        Edited By:<br>
        &nbsp; &nbsp; &nbsp; Ashi, SoS, Prisoner416, Zeikfried, et al

        Open-source contributions by:<br>
        &nbsp; &nbsp; &nbsp; aimozg, Amygdala, Cmacleod42, Enterprise2001, Fake-Name, Gedan, Yoffy, et al

        Source Code: <u><a href='https://github.com/herp-a-derp/Corruption-of-Champions'>https://github.com/herp-a-derp/Corruption-of-Champions</a></u>

        Bug Tracker: <u><a href='https://github.com/herp-a-derp/Corruption-of-Champions/issues'>https://github.com/herp-a-derp/Corruption-of-Champions/issues</a></u>  
        (requires an account, unfortunately)

        **<u>DISCLAIMER</u>**
        <br>- **There are many strange and odd fetishes contained in this flash.  Peruse at own risk.**
        <br>- **Please be 18 or the legal age to view porn before playing.**
        <br>- **Try to keep your keyboard clean.  Think of the children!**


        For more information see Fenoxo's Blog at <b><u><a href='http://www.fenoxo.com/'>fenoxo.com</a></u></b>.

        Also go play <u><a href='http://www.furaffinity.net/view/9830293/'>Nimin</a></u> by Xadera on furaffinity.

	    ]]>`);

        if (debug)
            DisplayText("\n\n<b>DEBUG MODE ENABLED:  ITEMS WILL NOT BE CONSUMED BY USE.</b>");
        if (Flags.list[FlagEnum.SHOW_SPRITES_FLAG])
            DisplayText("\n\n<b>Sprites disabled.</b>");
        if (Flags.list[FlagEnum.EASY_MODE_ENABLE_FLAG])
            DisplayText("\n\n<b>Easy Mode On:  Bad-ends can be ignored.</b>");
        if (Flags.list[FlagEnum.SILLY_MODE_ENABLE_FLAG])
            DisplayText("\n\n<b>SILLY MODE ENGAGED: Crazy, nonsensical, and possibly hilarious things may occur.</b>");
        if (DateUtils.isEaster())
            DisplayText("\n\n<b>It's Easter!  Enjoy the eggs!</b>");
        if (DateUtils.isValentine())
            DisplayText("\n\n<b>It's Valentine's!</b>");
        if (helFollower.isHeliaBirthday())
            DisplayText("\n\n<b>It's Helia's Birthday Month!</b>");

        let resume;
        if (Game.player.stats.str > 0)  // we're in a game, allow resume.
            resume = Menus.Player.display;

        MainScreen.displayChoices(["Image Credits", "Credits", "Instructions", "Debug Info", "Settings", "Resume"],
            [null, Menus.Credits.display, Menus.Instructions.display, null, Menus.Settings.display, resume]);
    }
}
