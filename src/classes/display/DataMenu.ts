import MainScreen from "../Game/Render";
import Game, { GameState } from "../Game/Game";
import SaveMenu from "./SaveMenu";

export default class DataMenu {
    private autosave: boolean;

    //
    // TODO: Redo Data menu. Remove menus save, load, delete. 
    //

    private static displayInfo() {
        MainScreen.text("", true);
        MainScreen.text("<b>Where are my saves located?</b>\n", false);
        MainScreen.text("<i>In Windows Vista/7 (IE/FireFox/Other): <pre>Users/{username}/Appdata/Roaming/Macromedia/Flash Player/#Shared Objects/{GIBBERISH}/</pre>\n\n", false);
        MainScreen.text("In Windows Vista/7 (Chrome): <pre>Users/{username}/AppData/Local/Google/Chrome/User Data/Default/Pepper Data/Shockwave Flash/WritableRoot/#SharedObjects/{GIBBERISH}/</pre>\n\n", false);
        MainScreen.text("Inside that folder it will saved in a folder corresponding to where it was played from.  If you saved the CoC.swf to your HDD, then it will be in a folder called localhost.  If you played from my website, it will be in fenoxo.com.  The save files will be labelled CoC_1.sol, CoC_2.sol, CoC_3.sol, etc.</i>\n\n", false);
        MainScreen.text("<b>Why do my saves disappear all the time?</b>\n<i>There are numerous things that will wipe out flash local shared files.  If your browser or player is set to delete flash cookies or data, that will do it.  CCleaner will also remove them.  CoC or its updates will never remove your savegames - if they disappear something else is wiping them out.</i>\n\n", false);
        MainScreen.text("<b>When I play from my HDD I have one set of saves, and when I play off your site I have a different set of saves.  Why?</b>\n<i>Flash stores saved data relative to where it was accessed from.  Playing from your HDD will store things in a different location than fenoxo.com or FurAffinity.</i>\n", false);
        MainScreen.text("<i>If you want to be absolutely sure you don't lose a character, copy the .sol file for that slot out and back it up! <b>For more information, google flash shared objects.</b></i>\n\n", false);
        MainScreen.text("<b>Why does the Save File and Load File option not work?</b>\n");
        MainScreen.text("<i>Save File and Load File are limited by the security settings imposed upon CoC by Flash. These options will only work if you have downloaded the game from the website, and are running it from your HDD. Additionally, they can only correctly save files to and load files from the directory where you have the game saved.</i>");
    }

    public static display(): void {
        DataMenu.displayInfo();
        //This is to clear the 'game over' block from stopping simpleChoices from working.  Loading games supercede's game over.

        if (Game.state == GameState.GameOver || player.str == 0 || inDungeon) {
            MainScreen.addButton(0, "Save", SaveMenu.display, true);
            MainScreen.addButton(5, "Save File", DataMenu.saveToFile, true);
        }
        else {
            MainScreen.addButton(0, "Save", SaveMenu.display);
            MainScreen.addButton(5, "Save File", DataMenu.saveToFile);
        }

        MainScreen.addButton(1, "Load", LoadMenu.display);
        if (DataMenu.autosave)
            MainScreen.addButton(2, "AutoSav: ON", DataMenu.autosaveToggle);
        else
            MainScreen.addButton(2, "AutoSav: ON", DataMenu.autosaveToggle);

        MainScreen.addButton(3, "Delete", DeleteMenu.display);
        MainScreen.addButton(6, "Load File", loadFromFile);

        if (Game.state == GameState.GameOver)
            MainScreen.addButton(9, "Back", GameOverMenu.display);
        if (player.str == 0)
            MainScreen.addButton(9, "Back", MainMenu.display);
        else
            MainScreen.addButton(9, "Back", PlayerMenu.display);
    }


    private static saveToFile(): void {
        saveGameObject(null, true);
    }

    private static loadFromFile(): void {
        openSave();
        showStats();
        statScreenRefresh();
    }

    private static autosaveToggle(): void {
        player.autoSave = !player.autoSave;
        saveLoad();
    }

}