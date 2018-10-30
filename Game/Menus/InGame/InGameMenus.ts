import { charCreationMenu } from "./CharCreationMenu";
import { gameOverMenu } from "./GameOverMenu";
import { inventoryMenu } from "./PlayerInventoryMenu";
import { levelUpMenu } from "./LevelUpMenu";
import { perksMenu } from "./PerksMenu";
import { perkUpMenu } from "./PerkUpMenu";
import { combatMenu } from "./PlayerCombatMenu";
import { playerMenu } from "./PlayerMenu";
import { statsMenu } from "./StatsMenu";

export class InGameMenus {
    public static CharCreation = charCreationMenu;
    public static GameOver = gameOverMenu;
    public static Inventory = inventoryMenu;
    public static LevelUp = levelUpMenu;
    public static Perks = perksMenu;
    public static PerkUp = perkUpMenu;
    public static Combat = combatMenu;
    public static Player = playerMenu;
    public static Stats = statsMenu;
}
