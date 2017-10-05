import MainScreen, { TopButton } from "./MainScreen";
import CreditsMenu from "./CreditsMenu";
import InstructionsMenu from "./InstructionsMenu";
import SettingsMenu from "./SettingsMenu";
import PlayerMenu from "./PlayerMenu";
import Game, { GameState } from "../Game/Game";
import Flags, { FlagEnum } from "../Game/Flags";
import VersionInfo from "../Game/VersionInfo";
import CharCreationMenu from "./CharCreationMenu";

export default class MainMenu {
    //MainMenu - kicks player out to the main menu
    public static display() {
        MainScreen.hideStatsPanel();
        //Reset newgame buttons
        MainScreen.hideTopButtons();
        MainScreen.setTopButton(TopButton.MainMenu, "New Game", CharCreationMenu.display);
        MainScreen.showButton(TopButton.Data);

        Game.state = GameState.MainMenu;

        MainScreen.text("<b>Corruption of Champions (" + VersionInfo.version + ")</b>", true);
        MainScreen.text(VersionInfo.build);

        MainScreen.text(`<![CDATA[
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

	]]>`, false, true);

        if (debug)
            MainScreen.text("\n\n<b>DEBUG MODE ENABLED:  ITEMS WILL NOT BE CONSUMED BY USE.</b>");
        if (Flags.list[FlagEnum.SHOW_SPRITES_FLAG])
            MainScreen.text("\n\n<b>Sprites disabled.</b>");
        if (Flags.list[FlagEnum.EASY_MODE_ENABLE_FLAG])
            MainScreen.text("\n\n<b>Easy Mode On:  Bad-ends can be ignored.</b>");
        if (Flags.list[FlagEnum.SILLY_MODE_ENABLE_FLAG])
            MainScreen.text("\n\n<b>SILLY MODE ENGAGED: Crazy, nonsensical, and possibly hilarious things may occur.</b>");
        if (isEaster())
            MainScreen.text("\n\n<b>It's Easter!  Enjoy the eggs!</b>");
        if (isValentine())
            MainScreen.text("\n\n<b>It's Valentine's!</b>");
        if (helFollower.isHeliaBirthday())
            MainScreen.text("\n\n<b>It's Helia's Birthday Month!</b>");


        let resume: () => void = null;
        if (Game.player.stats.str > 0)  //we're in a game, allow resume.
            resume = PlayerMenu.display;


        MainScreen.displayChoices(["Image Credits", "Credits", "Instructions", "Debug Info", "Settings", "Resume"],
            [null, CreditsMenu.display, InstructionsMenu.display, null, SettingsMenu.display, resume]);
    }
}