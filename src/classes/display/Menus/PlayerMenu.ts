import CharCreationMenu from './CharCreationMenu';
import Menu from './Menu';
import Menus from './Menus';
import Flags, { FlagEnum } from '../../Game/Flags';
import Game, { GameState } from '../../Game/Game';
import Player from '../../Player/Player';
import DisplaySprite from '../DisplaySprite';
import MainScreen, { TopButton } from '../MainScreen';

export default class PlayerMenu implements Menu {
    public display(player: Player) {
        if (Game.state != GameState.InCombat)
            DisplaySprite.hide();
        MainScreen.getTopButton(TopButton.MainMenu).modify("New Game", CharCreationMenu.display);
        //MainScreen.getStatsPanel()..nameBox.visible = false;
        if (Game.state == GameState.InCombat || Game.state == GameState.InCombatGrapple) {
            Menus.Combat.display(player);
            return;
        }
        //Clear restriction on item overlaps if not in combat
        plotFight = false;
        if (inDungeon) {
            Menus.Dungeon.display();
            return;
        }
        else if (inRoomedDungeon) {
            if (inRoomedDungeonResume != null) inRoomedDungeonResume();
            return;
        }
        Flags.list[FlagEnum.PLAYER_PREGGO_WITH_WORMS] = 0;
        doCamp();
    }
}