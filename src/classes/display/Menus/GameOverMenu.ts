import Menu from './Menu';
import Menus from './Menus';
import DisplayText from '../DisplayText';
import MainScreen, { TopButton } from '../MainScreen';

export default class GameOverMenu implements Menu {
    public display() {
        DisplayText().clear();
        DisplayText("\n\n<b>GAME OVER</b>");
        MainScreen.hideBottomButtons();
        MainScreen.getBottomButton(0).modify("Game Over", this.gameOverMenuOverride);
        MainScreen.getBottomButton(3).modify("NewGamePlus", Menus.CharCreation.newGamePlus);
    }
    /*
    public gameOver(clear: boolean = false): void { //Leaves text on screen unless clear is set to true
        if (testingBlockExiting) {
            DisplayText.doNext(camp.returnToCampUseOneHour); //Prevent ChaosMonkah instances from getting stuck
        }
        else {
            if (clear) DisplayText().clear();
            DisplayText("\n\n<b>GAME OVER</b>");
            MainScreen.hideBottomButtons();
            MainScreen.getBottomButton(0).modify("Game Over", gameOverMenuOverride);
            MainScreen.getBottomButton(3).modify("NewGamePlus", charCreation.newGamePlus);
            if (Flags.list[FlagEnum.EASY_MODE_ENABLE_FLAG] == 1 || debug) DisplayText.getBottomButton(4).modify("Debug Cheat", playerMenu);
            gameOverMenuOverride();

        }
        inCombat = false;
        dungeonLoc = 0; //Replaces inDungeon = false;
    }
    */
    private gameOverMenuOverride() { // Game over event; override whatever the fuck has been done to the UI up to this point to force display of the data and new game buttons
        MainScreen.hideTopButtons();
        MainScreen.getTopButton(TopButton.MainMenu).show();
        MainScreen.getTopButton(TopButton.Data).show();
    }
}
