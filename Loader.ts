import { CharConstructorLib } from './Game/Character/CharConstructorLib';
import { displayNextScreenChoices } from './Game/ScreenDisplay';
import { mainMenu } from './Game/Menus/MainMenu';

// Used to force this module to load before others to prevent circular dependency
CharConstructorLib.has("pc");

displayNextScreenChoices(mainMenu());

// displayNextScreenChoices(CombatTest());
