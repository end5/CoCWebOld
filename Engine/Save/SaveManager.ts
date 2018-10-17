import { AnchorElement } from '../Display/Elements/AnchorElement';
import { MainScreen } from '../Display/MainScreen';
import { CView } from '../Display/ContentView';

class SaveManager {
    private activatedSlot: number = -1;
    private saveSlots: (object | undefined)[];
    public autoSave: boolean;

    public constructor() {
        this.saveSlots = [];
        this.saveSlots.length = this.saveSlotCount();
        this.autoSave = true;
        this.readSlots();
    }

    private writeSlots() {
        localStorage.setItem("CoCWeb", JSON.stringify(this.saveSlots));
    }

    private readSlots() {
        try {
            if (localStorage.getItem("CoCWeb"))
                this.saveSlots = JSON.parse(localStorage.getItem("CoCWeb")!);
        }
        catch (e) {
            console.error(e);
        }
    }

    public activeSlot(): number {
        return this.activatedSlot;
    }

    public has(slot: number): boolean {
        return !!this.saveSlots[slot];
    }

    public get(slot: number): object | undefined {
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
            if (typeof fileReader.result === 'string')
                callback(JSON.parse(fileReader.result));
        });
    }

    public saveToSlot(slotNumber: number, save: object) {
        this.saveSlots[slotNumber] = save;
        this.writeSlots();
    }

    public saveToFile(save: object, filename: string) {
        const anchor = new AnchorElement();
        CView.textElement.appendElement(anchor);
        anchor.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(save));
        anchor.download = filename;
        anchor.click();
    }
}

const saveManager = new SaveManager();
export { saveManager as SaveManager };
