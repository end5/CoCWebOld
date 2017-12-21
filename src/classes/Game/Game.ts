import Flags from './Flags';
import Initializer from './Initializer';
import Settings from './Settings';
import TimeManager from './TimeManager';
import Character from '../Character/Character';
import Menus from '../display/Menus/Menus';
import CampStorage from '../Inventory/CampStorage';
import Player from '../Player/Player';
import SaveManager from '../SaveManager';
import SceneManager from '../Scenes/SceneManager';
import Dictionary from '../Utilities/Dictionary';

export enum GameState {
    Normal,
    InCombat,
    InCombatGrapple,
    MainMenu,
    GameOver
}

export default class Game {
    static exgartuan: any;
    static monster: Character;
    static debug: boolean;
    private static instance: object;
    public static flags: Flags;
    public static state: GameState;
    public static player: Player;
    public static saveManager: SaveManager;
    public static time: TimeManager;
    public static sceneManager: SceneManager;
    public static campStorage: CampStorage;
    public static settings: Settings;
    public static npcs: Dictionary<Character>;

    public constructor() {
        new Initializer();
        
        let components: object = {};

        Game.flags = new Flags();

        Game.instance = components;

        Game.saveManager = new SaveManager();
        Game.campStorage = new CampStorage();

        // Time sensitive components
        Game.player = new Player();

        Game.time = new TimeManager();
        Game.sceneManager = new SceneManager();

        Game.settings = new Settings();

        Game.npcs = new Dictionary<Character>();
    }

    public static save(): object {
        throw new Error("Method not implemented.");
    }
    public static load(saveObject: object) {
        throw new Error("Method not implemented.");
    }
    public start(): void {
        Menus.MainMenu.display();
    }

    public static update(hours: number) {
        Game.player.update(hours);
        Game.monster.update(hours);
        Game.time.update(hours);
        Game.sceneManager.update(hours);
    }

    public static get inCombat(): boolean {
        return Game.state == GameState.InCombat || Game.state == GameState.InCombatGrapple;
    }

    public static set inCombat(value: boolean) {
        Game.state = (value ? GameState.InCombat : GameState.Normal);
    }

}