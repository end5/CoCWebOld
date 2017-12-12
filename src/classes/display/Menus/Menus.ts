import ControlsMenu from './ControlsMenu';
import CreditsMenu from './CreditsMenu';
import DataMenu from './DataMenu';
import DeleteMenu from './DeleteMenu';
import GameOverMenu from './GameOverMenu';
import InstructionsMenu from './InstructionsMenu';
import LevelUpMenu from './LevelUpMenu';
import LoadFileMenu from './LoadFileMenu';
import LoadMenu from './LoadMenu';
import MainMenu from './MainMenu';
import PerkUpMenu from './PerkUpMenu';
import PlayerAppearanceMenu from './PlayerAppearanceMenu';
import PlayerCombatMenu from './PlayerCombatMenu';
import PlayerInventoryMenu from './PlayerInventoryMenu';
import PlayerMenu from './PlayerMenu';
import SaveFileMenu from './SaveFileMenu';
import SaveMenu from './SaveMenu';
import SettingsMenu from './SettingsMenu';
import StatsMenu from './StatsMenu';

export default class Menus {
    public static MainMenu = new MainMenu();
    public static Settings = new SettingsMenu();
    public static Controls = new ControlsMenu();
    public static Credits = new CreditsMenu();
    public static Instructions = new InstructionsMenu();
    
    public static GameOver = new GameOverMenu();
    
    public static Player = new PlayerMenu();
    public static Combat = new PlayerCombatMenu();
    public static Inventory = new PlayerInventoryMenu();
    public static Appearance = new PlayerAppearanceMenu();
    public static PerkUp = new PerkUpMenu();
    public static LevelUp = new LevelUpMenu();
    public static Stats = new StatsMenu();

    public static Data = new DataMenu();
    public static Delete = new DeleteMenu();
    public static Save = new SaveMenu();
    public static Load = new LoadMenu();
    public static SaveFile = new SaveFileMenu();
    public static LoadFile = new LoadFileMenu();

}