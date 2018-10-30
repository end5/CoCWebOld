import { MainScreen, TopButton } from '../../../Engine/Display/MainScreen';
import { Character } from '../../Character/Character';
import { CombatManager } from '../../Combat/CombatManager';
import { clickFuncWrapper, NextScreenChoices, ClickFunction } from '../../ScreenDisplay';
import { townSquare } from '../../Scenes/TownSquare';
import { Menus } from '../Menus';

export function playerMenu(character: Character): NextScreenChoices {
    // Safe guard against combat breaking
    if (CombatManager.inCombat && CombatManager.encounter && CombatManager.encounter.performTurnEnd) {
        return CombatManager.encounter.performTurnEnd();
    }

    MainScreen.getTopButton(TopButton.MainMenu).modify("Main Menu", clickFuncWrapper(Menus.Main));

    return townSquare();
}

export function timePass(num: number): ClickFunction {

    return playerMenu;
}
