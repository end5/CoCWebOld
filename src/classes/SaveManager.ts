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
        SaveManager.readSlots();
    }

    private static save(notes?: string): object {
        const saveFile = <SaveFile>{};
        saveFile.days = Game.days;
        saveFile.name = Game.player.desc.short;
        saveFile.game = Game.save();
        saveFile.gender = Game.player.gender;
        saveFile.notes = notes;
        return saveFile;
    }

    private static load(save: object) {
        Game.load(save);
    }

    private static writeSlots() {
        document.cookie = JSON.stringify(SaveManager.saveSlots);
    }

    private static readSlots() {
        SaveManager.saveSlots = JSON.parse(document.cookie);
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

    public static delete(number: number) {
        SaveManager.saveSlots[number] = null;
        SaveManager.writeSlots();
    }

    public static saveSlotCount(): number {
        return MainScreen.NUM_BOT_BUTTONS;
    }

    public static autosaveToggle() {
        SaveManager.autoSave = !SaveManager.autoSave;
    }

    public static loadFromSlot(slotNumber: number) {
        SaveManager.readSlots();
        SaveManager.load(SaveManager.saveSlots[slotNumber]);
    }

    public static loadFromFile(save: object) {
        SaveManager.load(save);
    }

    public static saveToSlot(slotNumber: number, notes?: string) {
        SaveManager.saveSlots[slotNumber] = SaveManager.save(notes);
        SaveManager.writeSlots();
    }

    public static saveToFile(notes?: string): object {
        return SaveManager.save(notes);
    }
}