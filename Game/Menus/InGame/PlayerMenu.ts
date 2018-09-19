import { MainScreen, TopButton } from '../../../Engine/Display/MainScreen';
import { Character } from '../../Character/Character';
import { CombatManager } from '../../Combat/CombatManager';
import { Scenes } from '../../Scenes/Scenes';
import { clickFuncWrapper, NextScreenChoices } from '../../ScreenDisplay';
import { mainMenu } from '../MainMenu';

export function campMenu(character: Character): NextScreenChoices {
    // Safe guard against combat breaking
    if (CombatManager.inCombat) {
        return CombatManager.encounter.performTurnEnd();
    }

    // if (Game.state !== GameState.InCombat)
    //     DisplaySprite(SpriteName.None);
    MainScreen.getTopButton(TopButton.MainMenu).modify("Main Menu", clickFuncWrapper(mainMenu));
    // MainScreen.getStatsPanel().nameBox.visible = false;
    // if (Game.state === GameState.InCombat || Game.state === GameState.InCombatGrapple) {
    //     Combat.display(character);
    //     return;
    // }
    // Clear restriction on item overlaps if not in combat
    // plotFight = false;
    // if (inDungeon) {
    //     Dungeon.display();
    //     return;
    // }
    // else if (inRoomedDungeon) {
    //     if (inRoomedDungeonResume != undefined) inRoomedDungeonResume();
    //     return;
    // }
    // Flags.list[FlagEnum.PLAYER_PREGGO_WITH_WORMS] = 0;
    return Scenes.camp.display(character);
}
