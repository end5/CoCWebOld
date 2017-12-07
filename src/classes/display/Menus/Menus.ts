import CreditsMenu from './CreditsMenu';
import GameOverMenu from './GameOverMenu';
import InstructionsMenu from './InstructionsMenu';
import MainMenu from './MainMenu';
import PerkUpMenu from './PerkUpMenu';
import PlayerAppearanceMenu from './PlayerAppearanceMenu';
import PlayerCombatMenu from './PlayerCombatMenu';
import PlayerInventoryMenu from './PlayerInventoryMenu';
import PlayerMenu from './PlayerMenu';
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
}