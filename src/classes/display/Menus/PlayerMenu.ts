import MainScreen, { TopButton } from "./MainScreen";
import Game, { GameState } from "../Game/Game";
import CharCreationMenu from "./CharCreationMenu";
import CombatMenu from "./CombatMenu";

export default class PlayerMenu {
    public static display(): void {
        if (Game.state != GameState.InCombat)
            spriteSelect(-1);
        MainScreen.setTopButton(TopButton.MainMenu, "New Game", CharCreationMenu.newGameGo);
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
        Flags.set(FlagEnum.PLAYER_PREGGO_WITH_WORMS, 0);
        doCamp();
    }
}