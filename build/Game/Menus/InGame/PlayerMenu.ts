import MainScreen, { TopButton } from '../../../Engine/Display/MainScreen';
import Character from '../../Character/Character';
import { doCamp } from '../../Scenes/Camp';
import Menus from '../Menus';

export default function display(character: Character) {
    // if (Game.state !== GameState.InCombat)
    //     DisplaySprite(SpriteName.None);
    MainScreen.getTopButton(TopButton.MainMenu).modify("New Game", Menus.CharCreation);
    // MainScreen.getStatsPanel().nameBox.visible = false;
    // if (Game.state === GameState.InCombat || Game.state === GameState.InCombatGrapple) {
    //     Menus.Combat.display(character);
    //     return;
    // }
    // Clear restriction on item overlaps if not in combat
    // plotFight = false;
    // if (inDungeon) {
    //     Menus.Dungeon.display();
    //     return;
    // }
    // else if (inRoomedDungeon) {
    //     if (inRoomedDungeonResume != null) inRoomedDungeonResume();
    //     return;
    // }
    // Flags.list[FlagEnum.PLAYER_PREGGO_WITH_WORMS] = 0;
    doCamp(character);
}
