import Libraries from "./Libraries";
import Flags from "./Flags";
import SaveManager from "../SaveManager";
import Player from "../Player";

export enum GameState {
    Normal,
    InCombat,
    InCombatGrapple,
    MainMenu,
    GameOver
}

export default class Game{
    private static instance: object;
    public static libraries: Libraries;
    public static flags: Flags;
    public static state: GameState;
    public static saveManager: SaveManager;
    public static player: Player;

    public constructor() {
        let components: object = {};

        Game.libraries = new Libraries();
        Game.flags = new Flags();

        Game.instance = components;

        Game.saveManager = new SaveManager();

        Game.player = new Player();
    }

    public static save(): object {
        throw new Error("Method not implemented.");
    }
    public static load(saveObject: object) {
        throw new Error("Method not implemented.");
    }
    public run(): void {
        mainMenu();
    }
}