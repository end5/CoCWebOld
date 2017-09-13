import Libraries from "./Libraries";
import Flags from "./Flags";
import SaveManager from "../SaveManager";

export enum GameState {
//0 = normal
//1 = in combat
//2 = in combat in grapple
//3 = at start or game over screen
//GameState 4 eliminated			//4 = at giacomo
//GameState 5 eliminated			//5 = getting succubi potion
//GameState 6 eliminated			//6 = at alchemist choices.
//GameState 7 eliminated			//7 = item duuuuump
//GameState 8 eliminated			//8 = worked at farm
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

    public constructor() {
        let components: object = {};

        Game.libraries = new Libraries();
        Game.flags = new Flags();

        Game.instance = components;

        SaveManager.load(document.cookie);
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