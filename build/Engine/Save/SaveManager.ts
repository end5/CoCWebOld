import SaveFile from './SaveFile';
import MainScreen from '../Display/MainScreen';

class SaveManager {
    private activedSlot: number;
    private saveSlots: object[];
    public autoSave: boolean;

    public constructor() {
        this.activedSlot = -1;
        this.saveSlots = [];
        this.saveSlots.length = this.saveSlotCount();
        this.autoSave = true;
        this.readSlots();
    }

    private save(notes?: string): object {
        const saveFile = {} as SaveFile;
        // saveFile.days = Game.time.day;
        // saveFile.name = Game.player.desc.short;
        // saveFile.game = Game.save();
        // saveFile.gender = Game.player.gender;
        // saveFile.notes = notes;
        return saveFile;
    }

    private load(save: object) {
        // Game.load(save);
    }

    private writeSlots() {
        document.cookie = JSON.stringify(this.saveSlots);
    }

    private readSlots() {
        if (document.cookie !== "")
        try {
            this.saveSlots = JSON.parse(document.cookie);
        }
        catch (e) {
            console.error(e);
        }
    }

    public activeSlot(): number {
        return this.activedSlot;
    }

    public has(slot: number): boolean {
        return this.saveSlots[slot] !== undefined;
    }

    public get(slot: number): object {
        return this.saveSlots[slot];
    }

    public delete(slot: number) {
        this.saveSlots[slot] = null;
        this.writeSlots();
    }

    public saveSlotCount(): number {
        return MainScreen.NUM_BOT_BUTTONS;
    }

    public autosaveToggle() {
        this.autoSave = !this.autoSave;
    }

    public loadFromSlot(slotNumber: number) {
        this.readSlots();
        this.load(this.saveSlots[slotNumber]);
    }

    public loadFromFile(save: object) {
        this.load(save);
    }

    public saveToSlot(slotNumber: number, notes?: string) {
        this.saveSlots[slotNumber] = this.save(notes);
        this.writeSlots();
    }

    public saveToFile(notes?: string): object {
        return this.save(notes);
    }
}

const saveManager = new SaveManager();
export default saveManager as SaveManager;
