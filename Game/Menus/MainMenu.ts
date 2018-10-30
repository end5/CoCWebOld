import { MainScreen, TopButton } from '../../Engine/Display/MainScreen';
import { clickFuncWrapper, NextScreenChoices } from '../ScreenDisplay';
import { isEaster, isValentine } from '../Utilities/Dates';
import { CView } from '../../Engine/Display/ContentView';
import { CharDict } from '../CharList';
import { Settings } from '../Settings';
import { Menus } from './Menus';
import { InGameMenus } from './InGame/InGameMenus';

export function mainMenu(): NextScreenChoices {
    if (!CharDict.player)
        MainScreen.getStatsPanel().hide();

    MainScreen.getTopButton(TopButton.Stats).modify("Stats", clickFuncWrapper(InGameMenus.Stats));
    MainScreen.getTopButton(TopButton.PerkUp).modify("Perk Up", clickFuncWrapper(InGameMenus.PerkUp));
    MainScreen.getTopButton(TopButton.Perks).modify("Perks", clickFuncWrapper(InGameMenus.Perks));
    MainScreen.getTopButton(TopButton.Appearance).modify("Appearance", undefined);
    MainScreen.hideTopButtons();
    MainScreen.getTopButton(TopButton.MainMenu).modify("New Game", clickFuncWrapper(InGameMenus.Player));
    MainScreen.getTopButton(TopButton.Data).modify("Data", clickFuncWrapper(Menus.Data));

    CView.clear();
    CView.text("<b>Corruption of Champions Web Edition Framework Test</b>\n");

    if (Settings.debug)
        CView.text("\n\n<b>DEBUG MODE ENABLED:  ITEMS WILL NOT BE CONSUMED BY USE.</b>");
    if (Settings.showSprites)
        CView.text("\n\n<b>Sprites disabled.</b>");
    if (Settings.easyMode)
        CView.text("\n\n<b>Easy Mode On:  Bad-ends can be ignored.</b>");
    if (Settings.sillyMode)
        CView.text("\n\n<b>SILLY MODE ENGAGED: Crazy, nonsensical, and possibly hilarious things may occur.</b>");
    if (isEaster())
        CView.text("\n\n<b>It's Easter!  Enjoy the eggs!</b>");
    if (isValentine())
        CView.text("\n\n<b>It's Valentine's!</b>");

    return {
        choices: [
            ["Settings", Menus.Settings], ["Resume", CharDict.player ? InGameMenus.Player : undefined]
        ]
    };
}
