﻿import Libraries from "./Libraries";
import Flags from "./Flags";
import SaveManager from "../SaveManager";
import Player from "../Player";
import MainMenu from "../display/MainMenu";
import TimeManager from "./TimeManager";
import CampStorage from "../Inventory/CampStorage";
import SceneManager from "../Scenes/SceneManager";
import Monster from "../Monster";

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
    public static player: Player;
    public static saveManager: SaveManager;
    public static timeManager: TimeManager;
    public static sceneManager: SceneManager;
    public static campStorage: CampStorage;

    public constructor() {
        let components: object = {};

        Game.libraries = new Libraries();
        Game.flags = new Flags();

        Game.instance = components;

        Game.saveManager = new SaveManager();
        Game.campStorage = new CampStorage();

        // Time sensitive components
        Game.player = new Player();
        Game.monster = null;

        Game.timeManager = new TimeManager();
        Game.sceneManager = new SceneManager();
    }

    public static save(): object {
        throw new Error("Method not implemented.");
    }
    public static load(saveObject: object) {
        throw new Error("Method not implemented.");
    }
    public start(): void {
        MainMenu.display();
    }

    public static update(hours: number) {
        Game.player.update(hours);
        Game.monster.update(hours);
        Game.timeManager.update(hours);
        Game.sceneManager.update(hours);
    }

    public static get inCombat(): boolean {
        return Game.state == GameState.InCombat || Game.state == GameState.InCombatGrapple;
    }

    public static set inCombat(value: boolean) {
        Game.state = (value ? GameState.InCombat : GameState.Normal);
    }

}