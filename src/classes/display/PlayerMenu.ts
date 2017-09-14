import MainScreen, { TopButton } from "./MainScreen";
import Game, { GameState } from "../Game/Game";

export default class PlayerMenu {
    public static display(): void {
        if (!inCombat) spriteSelect(-1);
        MainScreen.addTopButton(TopButton.MainMenu, "New Game", charCreation.newGameGo);
        MainScreen.nameBox.visible = false;
        if (Game.state == GameState.InCombat || Game.state == GameState.InCombatGrapple) {
            CombatMenu.display();
            return;
        }
        //Clear restriction on item overlaps if not in combat
        plotFight = false;
        if (inDungeon) {
            DungeonMenu.display();
            return;
        }
        else if (inRoomedDungeon) {
            if (inRoomedDungeonResume != null) inRoomedDungeonResume();
            return;
        }
        flags[FlagEnum.PLAYER_PREGGO_WITH_WORMS] = 0;
        doCamp();
    }
}