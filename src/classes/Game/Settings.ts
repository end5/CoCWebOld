import { SerializeInterface } from '../SerializeInterface';

export default class Settings implements SerializeInterface {
    public customFontSize: number = 10;
    public lowStandards: boolean = false;
    public hyperHappy: boolean = false;
    public debug: boolean = false;
    public easyMode: boolean = false;
    public showSprites: boolean = false;
    public sillyMode: boolean = false;

    public serialize(): string {
        return JSON.stringify(this);
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