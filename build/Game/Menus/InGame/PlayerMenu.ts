import { MainScreen, TopButton } from '../../../Engine/Display/MainScreen';
import { Character } from '../../Character/Character';
import { CombatManager } from '../../Combat/CombatManager';
import { Scenes } from '../../Scenes/Scenes';
import { NextScreenChoices } from '../../ScreenDisplay';
import { Menus } from '../Menus';

export function display(character: Character): NextScreenChoices {
    // Safe guard against combat breaking
    if (CombatManager.inCombat) {
        return CombatManager.encounter.performTurnEnd();
    }

    // if (Game.state !== GameState.InCombat)
    //     DisplaySprite(SpriteName.None);
    MainScreen.getTopButton(TopButton.MainMenu).modify("Main Menu", Menus.Main);
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
    //     if (inRoomedDungeonResume != undefined) inRoomedDungeonResume();
    //     return;
    // }
    // Flags.list[FlagEnum.PLAYER_PREGGO_WITH_WORMS] = 0;
    return Scenes.camp.display(character);
}
