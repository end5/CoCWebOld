import Game from './Game/Game';
import { SerializeInterface } from './SaveInterface';

export default class SaveManager {
    private static _activeSlot: number;
    private static saveSlots: object[];
    private static autoSave: boolean;

    public constructor() {
        SaveManager._activeSlot = -1;
        SaveManager.saveSlots = [];
        SaveManager.saveSlots.length = SaveManager.saveSlotCount();
        SaveManager.autoSave = true;
    }

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

    public static delete(number: number) {
        SaveManager.saveSlots[number] = null;
        SaveManager.write();
    }

    public static saveSlotCount(): number {
        return 9;
    }

    private static write() {
        document.cookie = JSON.stringify(SaveManager.saveSlots);
    }

    private static read() {
        SaveManager.saveSlots = JSON.parse(document.cookie);
    }

    public static autosaveToggle() {
        SaveManager.autoSave = !SaveManager.autoSave;
    }
}