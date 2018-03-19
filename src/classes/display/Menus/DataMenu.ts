import Menu from './Menu';
import Menus from './Menus';
import Character from '../../Character/Character';
import Game, { GameState } from '../../Game/Game';
import SaveManager from '../../SaveManager';
import DisplayText from '../DisplayText';
import MainScreen from '../MainScreen';

export default class DataMenu implements Menu {
    private displayInfo() {
        DisplayText().clear();
        DisplayText("<b>Where are my saves located?</b>\n");
        DisplayText("<i>In Windows Vista/7 (IE/FireFox/Other): <pre>Users/{username}/Appdata/Roaming/Macromedia/Flash Character/#Shared Objects/{GIBBERISH}/</pre>\n\n");
        DisplayText("In Windows Vista/7 (Chrome): <pre>Users/{username}/AppData/Local/Google/Chrome/User Data/Default/Pepper Data/Shockwave Flash/WritableRoot/#SharedObjects/{GIBBERISH}/</pre>\n\n");
        DisplayText("Inside that folder it will saved in a folder corresponding to where it was played from.  If you saved the CoC.swf to your HDD, then it will be in a folder called localhost.  If you played from my website, it will be in fenoxo.com.  The save files will be labelled CoC_1.sol, CoC_2.sol, CoC_3.sol, etc.</i>\n\n");
        DisplayText("<b>Why do my saves disappear all the time?</b>\n<i>There are numerous things that will wipe out flash local shared files.  If your browser or character is set to delete flash cookies or data, that will do it.  CCleaner will also remove them.  CoC or its updates will never remove your savegames - if they disappear something else is wiping them out.</i>\n\n");
        DisplayText("<b>When I play from my HDD I have one set of saves, and when I play off your site I have a different set of saves.  Why?</b>\n<i>Flash stores saved data relative to where it was accessed from.  Playing from your HDD will store things in a different location than fenoxo.com or FurAffinity.</i>\n");
        DisplayText("<i>If you want to be absolutely sure you don't lose a character, copy the .sol file for that slot out and back it up! <b>For more information, google flash shared objects.</b></i>\n\n");
        DisplayText("<b>Why does the Save File and Load File option not work?</b>\n");
        DisplayText("<i>Save File and Load File are limited by the security settings imposed upon CoC by Flash. These options will only work if you have downloaded the game from the website, and are running it from your HDD. Additionally, they can only correctly save files to and load files from the directory where you have the game saved.</i>");
    }

    public display(character: Character) {
        this.displayInfo();

        const text = ["Save", "Load", "AutoSav: ON", "Delete", "Save File", "Load File"];
        const func = [Menus.Save.display, Menus.Load.display, SaveManager.autosaveToggle, Menus.Delete.display, Menus.SaveFile.display, Menus.LoadFile.display];

        if (Game.state === GameState.GameOver || character.stats.str === 0 || inDungeon) {
            func[0] = undefined;
            func[4] = undefined;
        }

        if (!SaveManager.autoSave) {
            text[2] = "AutoSav: OFF";
        }

        let backFunc;

        if (Game.state === GameState.GameOver)
            backFunc = Menus.GameOver.display;
        else if (character.stats.str === 0)
            backFunc = Menus.MainMenu.display;
        else
            backFunc = Menus.Player.display;

        MainScreen.displayChoices(text, func, ["Back"], [backFunc]);
    }
}
