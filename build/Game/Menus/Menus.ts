import { display as ControlsMenu } from './ControlsMenu';
import { display as CreditsMenu } from './CreditsMenu';
import { display as DataMenu } from './DataMenu';
import { display as DeleteMenu } from './DeleteMenu';
import { display as CharCreationMenu } from './InGame/CharCreationMenu';
import { display as GameOverMenu } from './InGame/GameOverMenu';
import { display as LevelUpMenu } from './InGame/LevelUpMenu';
import { display as PerkUpMenu } from './InGame/PerkUpMenu';
import { display as PlayerAppearanceMenu } from './InGame/PlayerAppearanceMenu';
import { display as PlayerCombatMenu } from './InGame/PlayerCombatMenu';
import { display as PlayerInventoryMenu } from './InGame/PlayerInventoryMenu';
import { display as PlayerMenu } from './InGame/PlayerMenu';
import { display as StatsMenu } from './InGame/StatsMenu';
import { display as InstructionsMenu } from './InstructionsMenu';
import { display as LoadFileMenu } from './LoadFileMenu';
import { display as LoadMenu } from './LoadMenu';
import { display as MainMenu } from './MainMenu';
import { display as SaveFileMenu } from './SaveFileMenu';
import { display as SaveMenu } from './SaveMenu';
import { display as SettingsMenu } from './SettingsMenu';
import { ClickFunction, NextScreenChoices } from '../ScreenDisplay';

export const Menus = {
    Controls: ControlsMenu,
    Credits: CreditsMenu,
    Data: DataMenu,
    Delete: DeleteMenu,
    CharCreation: CharCreationMenu,
    GameOver: GameOverMenu,
    LevelUp: LevelUpMenu,
    PerkUp: PerkUpMenu,
    // PlayerAppearance: PlayerAppearanceMenu,
    // PlayerCombat: PlayerCombatMenu,
    // PlayerInventory: PlayerInventoryMenu,
    Appearance: PlayerAppearanceMenu,
    Combat: PlayerCombatMenu,
    Inventory: PlayerInventoryMenu,
    Player: PlayerMenu,
    Stats: StatsMenu,
    Instructions: InstructionsMenu,
    LoadFile: LoadFileMenu,
    Load: LoadMenu,
    Main: MainMenu,
    SaveFile: SaveFileMenu,
    Save: SaveMenu,
    Settings: SettingsMenu,
};
