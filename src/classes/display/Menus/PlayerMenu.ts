import Menu from './Menu';
import Menus from './Menus';
import Character from '../../Character/Character';
import Flags, { FlagEnum } from '../../Game/Flags';
import Game, { GameState } from '../../Game/Game';
import DisplaySprite from '../DisplaySprite';
import MainScreen, { TopButton } from '../MainScreen';

export default class CharacterMenu implements Menu {
    public display(character: Character) {
        if (Game.state !== GameState.InCombat)
            DisplaySprite().hide();
        MainScreen.getTopButton(TopButton.MainMenu).modify("New Game", Menus.CharCreation.display);
        // MainScreen.getStatsPanel().nameBox.visible = false;
        if (Game.state === GameState.InCombat || Game.state === GameState.InCombatGrapple) {
            Menus.Combat.display(character);
            return;
        }
        // Clear restriction on item overlaps if not in combat
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
