import { DisplayText } from '../../../Engine/display/DisplayText';
import { MainScreen, TopButton } from '../../../Engine/Display/MainScreen';
import { NextScreenChoices } from '../../SceneDisplay';
import { Menus } from '../Menus';

export function display(): NextScreenChoices {
    DisplayText().clear();
    DisplayText("\n\n<b>GAME OVER</b>");
    // return { choices: [["Game Over", "NewGamePlus"], [gameOverMenuOverride, Menus.CharCreation.newGamePlus]] };
    return { choices: [["Game Over", "NewGamePlus"], [gameOverMenuOverride, undefined]] };

    // MainScreen.getBottomButton(0).modify("Game Over", this.gameOverMenuOverride);
    // MainScreen.getBottomButton(3).modify("NewGamePlus", Menus.CharCreation.newGamePlus);
}
/*
public gameOver(clear: boolean = false): void { //Leaves text on screen unless clear is set to true
    if (testingBlockExiting) {
        DisplayText.doNext(Game.camp.returnToCampUseOneHour); //Prevent ChaosMonkah instances from getting stuck
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
function gameOverMenuOverride(): NextScreenChoices { // Game over event; override whatever the fuck has been done to the UI up to this point to force display of the data and new game buttons
    MainScreen.hideTopButtons();
    MainScreen.getTopButton(TopButton.MainMenu).show();
    MainScreen.getTopButton(TopButton.Data).show();
    return Menus.Main();
}
