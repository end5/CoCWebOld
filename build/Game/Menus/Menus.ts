import ControlsMenu from './ControlsMenu';
import CreditsMenu from './CreditsMenu';
import DataMenu from './DataMenu';
import DeleteMenu from './DeleteMenu';
import InstructionsMenu from './InstructionsMenu';
import LoadFileMenu from './LoadFileMenu';
import LoadMenu from './LoadMenu';
import MainMenu from './MainMenu';
import SaveFileMenu from './SaveFileMenu';
import SaveMenu from './SaveMenu';
import SettingsMenu from './SettingsMenu';
import { ClickFunction } from '../../Engine/Display/Elements/ButtonElement';

class Menus {
    public readonly Main: ClickFunction = MainMenu;
    public readonly Settings: ClickFunction = SettingsMenu;
    public readonly Controls: ClickFunction = ControlsMenu;
    public readonly Credits: ClickFunction = CreditsMenu;
    public readonly Instructions: ClickFunction = InstructionsMenu;

    // public readonly GameOver = new GameOverMenu();

    // public readonly Player = new PlayerMenu();
    // public readonly Combat = new PlayerCombatMenu();
    // public readonly Inventory = new PlayerInventoryMenu();
    // public readonly Appearance = new PlayerAppearanceMenu();
    // public readonly PerkUp = new PerkUpMenu();
    // public readonly LevelUp = new LevelUpMenu();
    // public readonly Stats = new StatsMenu();

    public readonly Data: ClickFunction = DataMenu;
    public readonly Delete: ClickFunction = DeleteMenu;
    public readonly Save: ClickFunction = SaveMenu;
    public readonly Load: ClickFunction = LoadMenu;
    public readonly SaveFile: ClickFunction = SaveFileMenu;
    public readonly LoadFile: ClickFunction = LoadFileMenu;

    // public readonly CharCreation = new CharCreationMenu();
}

const menus = new Menus();
export default menus as Menus;
