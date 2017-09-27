import Libraries from "./Libraries";
import Flags from "./Flags";
import SaveManager from "../SaveManager";
import Player from "../Player";
import MainMenu from "../display/MainMenu";
import TimeManager from "./TimeManager";
import CampStorage from "../Inventory/CampStorage";

export enum GameState {
    Normal,
    InCombat,
    InCombatGrapple,
    MainMenu,
    GameOver
}

export default class Game {
    static exgartuan: any;
    static monster: Monster;
    static debug: boolean;
    private static instance: object;
    public static libraries: Libraries;
    public static flags: Flags;
    public static state: GameState;
    public static saveManager: SaveManager;
    public static player: Player;
    public static timeManager: TimeManager;
    public static campStorage: CampStorage;

    public constructor() {
        let components: object = {};

        Game.libraries = new Libraries();
        Game.flags = new Flags();

        Game.instance = components;

        Game.saveManager = new SaveManager();

        Game.player = new Player();

        Game.timeManager = new TimeManager();

        Game.campStorage = new CampStorage();
    }

    public static save(): object {
        throw new Error("Method not implemented.");
    }
    public static load(saveObject: object) {
        throw new Error("Method not implemented.");
    }
    public run(): void {
        MainMenu.display();
    }

    public static get inCombat(): boolean {
        return Game.state == GameState.InCombat || Game.state == GameState.InCombatGrapple;
    }

    public static set inCombat(value: boolean) {
        Game.state = (value ? GameState.InCombat : GameState.Normal);
    }

}