import { ISerializable } from '../Engine/Utilities/ISerializable';

export class Settings implements ISerializable<Settings> {
    public customFontSize: number = 16;
    public lowStandards: boolean = false;
    public hyperHappy: boolean = false;
    public debug: boolean = false;
    public easyMode: boolean = false;
    public showSprites: boolean = false;
    public sillyMode: boolean = false;

    public silly(): boolean {
        return this.sillyMode;
    }

    public serialize(): object | undefined {
        return {
            customFontSize: this.customFontSize,
            lowStandards: this.lowStandards,
            hyperHappy: this.hyperHappy,
            debug: this.debug,
            easyMode: this.easyMode,
            showSprites: this.showSprites,
            sillyMode: this.sillyMode
        };
    }

    public deserialize(saveObject: Settings) {
        this.customFontSize = saveObject.customFontSize;
        this.lowStandards = saveObject.lowStandards;
        this.hyperHappy = saveObject.hyperHappy;
        this.debug = saveObject.debug;
        this.easyMode = saveObject.easyMode;
        this.showSprites = saveObject.showSprites;
        this.sillyMode = saveObject.sillyMode;
    }
}
