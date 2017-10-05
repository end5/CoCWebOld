export default class GameOverMenu {
    public gameOver(clear: boolean = false): void { //Leaves text on screen unless clear is set to true
        if (testingBlockExiting) {
            MainScreen.doNext(camp.returnToCampUseOneHour); //Prevent ChaosMonkah instances from getting stuck
        }
        else {
            if (clear) MainScreen.clearText();
            MainScreen.text("\n\n<b>GAME OVER</b>");
            MainScreen.hideButtons();
            MainScreen.addButton(0, "Game Over", gameOverMenuOverride);
            MainScreen.addButton(3, "NewGamePlus", charCreation.newGamePlus);
            if (Flags.list[FlagEnum.EASY_MODE_ENABLE_FLAG] == 1 || debug) MainScreen.addButton(4, "Debug Cheat", playerMenu);
            gameOverMenuOverride();

        }
        inCombat = false;
        dungeonLoc = 0; //Replaces inDungeon = false;
    }

    private gameOverMenuOverride(): void { //Game over event; override whatever the fuck has been done to the UI up to this point to force display of the data and new game buttons
        mainView.showMenuButton(MainView.MENU_NEW_MAIN);
        mainView.showMenuButton(MainView.MENU_DATA);
        mainView.hideMenuButton(MainView.MENU_APPEARANCE);
        mainView.hideMenuButton(MainView.MENU_LEVEL);
        mainView.hideMenuButton(MainView.MENU_PERKS);
    }


}