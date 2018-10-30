import { NextScreenChoices } from '../ScreenDisplay';
import { CView } from '../../Engine/Display/ContentView';
import { Menus } from './Menus';

export function creditsMenu(): NextScreenChoices {
    CView.clear();
    CView.text("<b>Credits</b>\n");
    return { next: Menus.Main };
}
