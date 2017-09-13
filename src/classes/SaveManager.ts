import { SaveInterface } from "./SaveInterface";
import Game from "./Game/Game";

export default class SaveManager {
    private static _activeSlot: number;
    private static saveSlots: object[];

    public static activeSlot(): number {
        return SaveManager._activeSlot;
    }

    public static has(number: number): boolean {
        return SaveManager.saveSlots[number] != undefined;
    }

    public static get(number: number): object {
        return SaveManager.saveSlots[number];
    }

    public static save(number: number) {
        SaveManager.saveSlots[number] = Game.save();
        SaveManager.write();
    }

    public static load(number: number) {
        SaveManager.read();
        Game.load(SaveManager.saveSlots[number]);
    }

    public static count(): number {
        return SaveManager.saveSlots.length;
    }

    public static write() {
        document.cookie = JSON.stringify(SaveManager.saveSlots);
    }

    public static read() {
        SaveManager.saveSlots = JSON.parse(document.cookie);
    }
}