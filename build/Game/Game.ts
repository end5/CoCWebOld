// import Flags from './Flags';
// import Initializer from './Initializer';
// import Settings from './Settings';
// import TimeManager from './TimeManager';
// import Character from '../Character/Character';
// import Menus from '../display/Menus/Menus';
// import CampStorage from '../Inventory/CampStorage';
// import Player from '../Player/Player';
// import SaveManager from '../SaveManager';
// import SceneManager from '../Scenes/SceneManager';
// import Dictionary from '../Utilities/Dictionary';

// export enum GameState {
//     Normal,
//     InCombat,
//     InCombatGrapple,
//     MainMenu,
//     GameOver
// }

// export default class Game {
//     private static instance: object;
//     public static flags: Flags;
//     public static state: GameState;
//     public static player: Player;
//     public static saveManager: SaveManager;
//     public static time: TimeManager;
//     public static scenes: SceneManager;
//     public static campStorage: CampStorage;
//     public static settings: Settings;
//     public static persistentChars: Dictionary<Character>;
//     public static characterData: Dictionary<object>;

//     public constructor() {
//         new Initializer();

//         const components: object = {};

//         Game.flags = new Flags();

//         Game.instance = components;

//         Game.saveManager = new SaveManager();
//         Game.campStorage = new CampStorage();

//         // Time sensitive components
//         User.char = new Player();

//         Time = new TimeManager();
//         Scenes = new SceneManager();

//         Game.settings = new Settings();

//         Game.persistentChars = new Dictionary<Character>();
//     }

//     public static save(): object {
//         throw new Error("Method not implemented.");
//     }
//     public static load(saveObject: object) {
//         throw new Error("Method not implemented.");
//     }
//     public start(): void {
//         Menus.MainMenu();
//     }

//     public static update(hours: number) {
//         User.char.update(hours);
//         Time.update(hours);
//         Scenes.update(hours);
//     }

//     public static get inCombat(): boolean {
//         return Game.state === GameState.InCombat || Game.state === GameState.InCombatGrapple;
//     }

//     public static set inCombat(value: boolean) {
//         Game.state = (value ? GameState.InCombat : GameState.Normal);
//     }

//     public static gameOver() {
//         Menus.GameOver();
//     }
// }
