import MainScreen from './display/MainScreen';
import Game from './Game/Game';
import SaveFile from './SaveFile';
import { SerializeInterface } from './SerializeInterface';

export default class SaveManager {
    private static _activeSlot: number;
    private static saveSlots: object[];
    public static autoSave: boolean;

    public constructor() {
        SaveManager._activeSlot = -1;
        SaveManager.saveSlots = [];
        SaveManager.saveSlots.length = SaveManager.saveSlotCount();
        SaveManager.autoSave = true;
        SaveManager.read();
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

    public static save(number: number, notes?: string) {
        const saveFile = <SaveFile>SaveManager.saveSlots[number];
        saveFile.days = Game.days;
        saveFile.name = Game.player.desc.short;
        saveFile.game = Game.save();
        saveFile.gender = Game.player.gender;
        saveFile.notes = notes;
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
        return MainScreen.NUM_BOT_BUTTONS;
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