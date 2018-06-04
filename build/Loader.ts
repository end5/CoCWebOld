import { CharConstructorLib } from './Game/Character/CharConstructorLib';
import { Menus } from './Game/Menus/Menus';
import { displayNextScreenChoices } from './Game/ScreenDisplay';

// Used to force this module to load before others to prevent circular dependency
CharConstructorLib.has("pc");

displayNextScreenChoices(Menus.Main());

// displayNextScreenChoices(CombatTest());
