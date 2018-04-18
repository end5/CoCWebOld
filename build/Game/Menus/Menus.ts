import ControlsMenu from './ControlsMenu';
import CreditsMenu from './CreditsMenu';
import DataMenu from './DataMenu';
import DeleteMenu from './DeleteMenu';
import CharCreationMenu from './InGame/CharCreationMenu';
import GameOverMenu from './InGame/GameOverMenu';
import LevelUpMenu from './InGame/LevelUpMenu';
import PerkUpMenu from './InGame/PerkUpMenu';
import PlayerAppearanceMenu from './InGame/PlayerAppearanceMenu';
import PlayerCombatMenu from './InGame/PlayerCombatMenu';
import PlayerInventoryMenu from './InGame/PlayerInventoryMenu';
import PlayerMenu from './InGame/PlayerMenu';
import StatsMenu from './InGame/StatsMenu';
import InstructionsMenu from './InstructionsMenu';
import LoadFileMenu from './LoadFileMenu';
import LoadMenu from './LoadMenu';
import MainMenu from './MainMenu';
import SaveFileMenu from './SaveFileMenu';
import SaveMenu from './SaveMenu';
import SettingsMenu from './SettingsMenu';
import { ClickFunction } from '../../Engine/Display/MainScreen';

class Menus {
    public readonly Main: ClickFunction = MainMenu;
    public readonly Settings: ClickFunction = SettingsMenu;
    public readonly Controls: ClickFunction = ControlsMenu;
    public readonly Credits: ClickFunction = CreditsMenu;
    public readonly Instructions: ClickFunction = InstructionsMenu;

    public readonly GameOver: ClickFunction = GameOverMenu;

    public readonly Player: ClickFunction = PlayerMenu;
    public readonly Combat: ClickFunction = PlayerCombatMenu;
    public readonly Inventory: ClickFunction = PlayerInventoryMenu;
    public readonly Appearance: ClickFunction = PlayerAppearanceMenu;
    public readonly PerkUp: ClickFunction = PerkUpMenu;
    public readonly LevelUp: ClickFunction = LevelUpMenu;
    public readonly Stats: ClickFunction = StatsMenu;

    public readonly Data: ClickFunction = DataMenu;
    public readonly Delete: ClickFunction = DeleteMenu;
    public readonly Save: ClickFunction = SaveMenu;
    public readonly Load: ClickFunction = LoadMenu;
    public readonly SaveFile: ClickFunction = SaveFileMenu;
    public readonly LoadFile: ClickFunction = LoadFileMenu;

    public readonly CharCreation: ClickFunction = CharCreationMenu;
}

const menus = new Menus();
export default menus as Menus;
