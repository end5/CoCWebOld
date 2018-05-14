import { DisplayText } from '../display/DisplayText';
import { AnchorElement } from '../Display/Elements/AnchorElement';
import { MainScreen } from '../Display/MainScreen';

class SaveManager {
    private activatedSlot: number;
    private saveSlots: object[];
    public autoSave: boolean;

    public constructor() {
        this.saveSlots = [];
        this.saveSlots.length = this.saveSlotCount();
        this.autoSave = true;
        this.readSlots();
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
        return this.activatedSlot;
    }

    public has(slot: number): boolean {
        return this.saveSlots[slot] !== undefined;
    }

    public get(slot: number): object {
        return this.saveSlots[slot];
    }

    public delete(slot: number) {
        this.saveSlots[slot] = undefined;
        this.writeSlots();
    }

    public saveSlotCount(): number {
        return MainScreen.NUM_BOT_BUTTONS - 1;
    }

    public autosaveToggle() {
        this.autoSave = !this.autoSave;
    }

    public loadFromSlot(slotNumber: number) {
        this.readSlots();
        return this.saveSlots[slotNumber];
    }

    public loadFromFile(blob: Blob, callback: (obj: object) => void) {
        const fileReader = new FileReader();
        fileReader.readAsBinaryString(blob);
        fileReader.addEventListener("loadend", () => {
            callback(JSON.parse(fileReader.result));
        });
    }

    public saveToSlot(slotNumber: number, save: object) {
        this.saveSlots[slotNumber] = save;
        this.writeSlots();
    }

    public saveToFile(save: object, filename: string) {
        const anchor = new AnchorElement();
        DisplayText().appendElement(anchor);
        anchor.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(save));
        anchor.download = filename;
        anchor.click();
    }
}

const saveManager = new SaveManager();
export { saveManager as SaveManager };
