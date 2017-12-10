import CreditsMenu from './CreditsMenu';
import DataMenu from './DataMenu';
import GameOverMenu from './GameOverMenu';
import InstructionsMenu from './InstructionsMenu';
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
    public static Settings = new SettingsMenu();
    public static Credits = new CreditsMenu();
    public static GameOver = new GameOverMenu();
    public static MainMenu = new MainMenu();
    public static Instructions = new InstructionsMenu();
    public static Player = new PlayerMenu();
    public static Combat = new PlayerCombatMenu();
    public static Inventory = new PlayerInventoryMenu();
    public static Appearance = new PlayerAppearanceMenu();
    public static PerkUp = new PerkUpMenu();
    public static Stats = new StatsMenu();

    public static Data = new DataMenu()
    public static Save = new SaveMenu();
    public static Load = new LoadMenu();
    public static SaveFile = new SaveFileMenu();
    public static LoadFile = new LoadFileMenu();
}